import http from "@ohos:net.http";
import util from "@ohos:util";
import BuildProfile from "@bundle:com.eatapp.recipe/entry/.preview/default/generated/profile/default/BuildProfile";
import { TokenManager } from "@bundle:com.eatapp.recipe/entry/ets/commons/storage/TokenManager";
import { Logger } from "@bundle:com.eatapp.recipe/entry/ets/commons/utils/Logger";
import { Strings } from "@bundle:com.eatapp.recipe/entry/ets/commons/utils/Strings";
const TAG: string = 'SseClient';
/** 一个完整的 SSE 事件 */
export interface SseEvent {
    event: string;
    data: string;
}
export interface SseHandler {
    onEvent: (event: SseEvent) => void;
    onError: (message: string) => void;
    onComplete: () => void;
}
/**
 * SSE 流式接收。
 *
 * 鸿蒙没有现成的 EventSource 封装，这里用 NetworkKit 的 requestInStream 手接字节流。
 * RCP 不适合此场景——它面向"完整响应"，拿不到增量数据。
 *
 * 关键点：
 * 1. 分片边界。一个 dataReceive 回调收到的 chunk 不保证是完整事件，
 *    甚至可能把 "data: xxx" 从中间劈开。因此维护 buffer，按 "\n\n" 切完整事件，
 *    最后一段不完整的留在 buffer 里等下一片。
 * 2. UTF-8 多字节字符也可能跨分片，TextDecoder 用 stream 模式解码。
 * 3. 取消后置 aborted 标志位，忽略所有后续回调（destroy 不保证立刻停止回调）。
 * 4. 无论成功失败，最后都 off() 解绑并 destroy()，否则连接泄漏。
 */
export class SseClient {
    private request: http.HttpRequest | null = null;
    private buffer: string = '';
    private aborted: boolean = false;
    private finished: boolean = false;
    private decoder: util.TextDecoder = util.TextDecoder.create('utf-8', { ignoreBOM: true });
    private handler: SseHandler;
    constructor(handler: SseHandler) {
        this.handler = handler;
    }
    /** 发起流式请求。path 为 ApiPaths 中的相对路径。 */
    start(path: string, body: Object): void {
        const url: string = `${BuildProfile.API_BASE_URL as string}${path}`;
        const request: http.HttpRequest = http.createHttp();
        this.request = request;
        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            'Accept': 'text/event-stream'
        };
        const token: string = TokenManager.getToken();
        if (token.length > 0) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        request.on('headersReceive', (rawHeaders: Object) => {
            Logger.d(TAG, 'headers received');
        });
        request.on('dataReceive', (chunk: ArrayBuffer) => {
            if (this.aborted) {
                return;
            }
            this.consume(chunk);
        });
        request.on('dataEnd', () => {
            if (this.aborted) {
                return;
            }
            this.flushRemaining();
            this.finish();
        });
        request.requestInStream(url, {
            method: http.RequestMethod.POST,
            header: headers,
            extraData: JSON.stringify(body),
            expectDataType: http.HttpDataType.ARRAY_BUFFER,
            connectTimeout: 15000,
            readTimeout: 120000
        }, (err: Error | null, statusCode: number) => {
            if (this.aborted) {
                return;
            }
            if (err !== null && err !== undefined) {
                Logger.e(TAG, 'stream request failed', err as Object);
                this.fail(Strings.get({ "id": 16777405, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }, '连接失败，请稍后重试'));
                return;
            }
            if (statusCode !== 200) {
                Logger.w(TAG, `stream http status=${statusCode}`);
                const message: string = statusCode >= 500
                    ? Strings.get({ "id": 16777403, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }, '服务开小差了')
                    : Strings.get({ "id": 16777405, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }, '出了点问题');
                this.fail(message);
                return;
            }
            // 200 时不在这里结束——dataEnd 才是流真正结束的信号
        });
    }
    /** 用户点"停止生成"或页面销毁时调用 */
    cancel(): void {
        if (this.finished) {
            return;
        }
        this.aborted = true;
        Logger.i(TAG, 'stream cancelled');
        this.release();
    }
    private consume(chunk: ArrayBuffer): void {
        // stream: true —— 允许 UTF-8 多字节字符跨分片
        const text: string = this.decoder.decodeToString(new Uint8Array(chunk), { stream: true });
        if (text.length === 0) {
            return;
        }
        // 统一换行符，兼容服务端可能发出的 CRLF
        this.buffer += text.replace(/\r\n/g, '\n');
        let boundary: number = this.buffer.indexOf('\n\n');
        while (boundary >= 0) {
            const raw: string = this.buffer.substring(0, boundary);
            this.buffer = this.buffer.substring(boundary + 2);
            this.dispatch(raw);
            boundary = this.buffer.indexOf('\n\n');
        }
    }
    /** 流结束时 buffer 里可能还剩一个没有以空行收尾的事件 */
    private flushRemaining(): void {
        const rest: string = this.buffer.trim();
        this.buffer = '';
        if (rest.length > 0) {
            this.dispatch(rest);
        }
    }
    /** 解析单个事件块："event: xxx\ndata: {...}"，data 可能有多行 */
    private dispatch(raw: string): void {
        const lines: string[] = raw.split('\n');
        let eventName: string = 'message';
        const dataLines: string[] = [];
        for (const line of lines) {
            if (line.length === 0 || line.startsWith(':')) {
                continue; // 空行与注释行（心跳）忽略
            }
            if (line.startsWith('event:')) {
                eventName = line.substring(6).trim();
            }
            else if (line.startsWith('data:')) {
                dataLines.push(line.substring(5).trim());
            }
        }
        if (dataLines.length === 0) {
            return;
        }
        const event: SseEvent = { event: eventName, data: dataLines.join('\n') };
        try {
            this.handler.onEvent(event);
        }
        catch (e) {
            Logger.e(TAG, `handler threw on event=${eventName}`, e as Object);
        }
    }
    private fail(message: string): void {
        if (this.finished) {
            return;
        }
        this.finished = true;
        this.handler.onError(message);
        this.release();
    }
    private finish(): void {
        if (this.finished) {
            return;
        }
        this.finished = true;
        this.handler.onComplete();
        this.release();
    }
    private release(): void {
        const request: http.HttpRequest | null = this.request;
        if (request === null) {
            return;
        }
        this.request = null;
        try {
            request.off('headersReceive');
            request.off('dataReceive');
            request.off('dataEnd');
            request.destroy();
        }
        catch (e) {
            Logger.w(TAG, 'release failed', e as Object);
        }
    }
}
