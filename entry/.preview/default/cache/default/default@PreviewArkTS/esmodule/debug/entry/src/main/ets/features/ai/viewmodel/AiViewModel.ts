import { AiMessage, AiResultType, AiRole, AiScene } from "@bundle:com.eatapp.recipe/entry/ets/commons/model/Ai";
import type { AiGeneratedRecipe } from "@bundle:com.eatapp.recipe/entry/ets/commons/model/Ai";
import { readableMessage } from "@bundle:com.eatapp.recipe/entry/ets/commons/network/Errors";
import type { SseClient, SseEvent, SseHandler } from '../../../commons/network/SseClient';
import { AiEventName } from "@bundle:com.eatapp.recipe/entry/ets/commons/network/dto/AiDto";
import type { AiErrorEventDto, AiGeneratedEventDto, AiGeneratingEventDto, AiIntentEventDto, AiRecipesEventDto } from "@bundle:com.eatapp.recipe/entry/ets/commons/network/dto/AiDto";
import { Toast } from "@bundle:com.eatapp.recipe/entry/ets/commons/uikit/Toast";
import { Logger } from "@bundle:com.eatapp.recipe/entry/ets/commons/utils/Logger";
import { Strings } from "@bundle:com.eatapp.recipe/entry/ets/commons/utils/Strings";
import { AiRepository } from "@bundle:com.eatapp.recipe/entry/ets/features/ai/repository/AiRepository";
const TAG: string = 'AiViewModel';
/**
 * AI 对话状态机。
 *
 * 两个场景在同一入口自然分流——用户不需要先选"我要用哪个功能"，
 * 意图由后端判定并通过第一个 `intent` 事件告知前端。
 *
 * SSE 事件 → 消息状态的映射全部收在这里，View 只负责按 resultType 渲染。
 */
@ObservedV2
export class AiViewModel {
    @Trace
    messages: AiMessage[] = [];
    @Trace
    input: string = '';
    @Trace
    streaming: boolean = false;
    private client: SseClient | null = null;
    private current: AiMessage | null = null;
    private seq: number = 0;
    get canSend(): boolean {
        return this.input.trim().length > 0 && !this.streaming;
    }
    /** 从首页 / 搜索空结果跳过来时带的预填文案 */
    prefill(text: string): void {
        if (text.length > 0) {
            this.input = text;
        }
    }
    send(text: string): void {
        const message: string = text.trim();
        if (message.length === 0 || this.streaming) {
            return;
        }
        this.input = '';
        this.seq += 1;
        const userMessage: AiMessage = AiMessage.user(`u${this.seq}`, message);
        this.seq += 1;
        const assistant: AiMessage = AiMessage.assistant(`a${this.seq}`);
        assistant.hint = Strings.get({ "id": 16777295, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
        this.messages = this.messages.concat([userMessage, assistant]);
        this.current = assistant;
        this.streaming = true;
        const handler: SseHandler = {
            onEvent: (event: SseEvent) => this.onEvent(event),
            onError: (msg: string) => this.onStreamError(msg),
            onComplete: () => this.onComplete()
        };
        this.client = AiRepository.chat(message, handler);
    }
    /** 用户点"停止生成"。已经流出来的内容保留，不回滚。 */
    stop(): void {
        this.client?.cancel();
        this.client = null;
        this.finishCurrent();
    }
    /** 页面销毁时必须调用，否则流会在后台继续跑 */
    dispose(): void {
        this.client?.cancel();
        this.client = null;
    }
    retryLast(): void {
        const list: AiMessage[] = this.messages;
        for (let i = list.length - 1; i >= 0; i--) {
            if (list[i].role === AiRole.USER) {
                this.send(list[i].text);
                return;
            }
        }
    }
    private onEvent(event: SseEvent): void {
        const message: AiMessage | null = this.current;
        if (message === null) {
            return;
        }
        try {
            if (event.event === AiEventName.INTENT) {
                const dto: AiIntentEventDto = JSON.parse(event.data) as AiIntentEventDto;
                message.hint = this.hintForScene(dto.scene);
            }
            else if (event.event === AiEventName.RECIPES) {
                const dto: AiRecipesEventDto = JSON.parse(event.data) as AiRecipesEventDto;
                message.recipes = dto.matches;
                message.resultType = AiResultType.RECIPES;
                message.hint = '';
            }
            else if (event.event === AiEventName.GENERATING) {
                const dto: AiGeneratingEventDto = JSON.parse(event.data) as AiGeneratingEventDto;
                message.text += dto.delta;
                message.hint = '';
            }
            else if (event.event === AiEventName.GENERATED) {
                const dto: AiGeneratedEventDto = JSON.parse(event.data) as AiGeneratedEventDto;
                message.generated = dto.recipe;
                message.resultType = AiResultType.GENERATED;
                message.hint = '';
            }
            else if (event.event === AiEventName.ERROR) {
                const dto: AiErrorEventDto = JSON.parse(event.data) as AiErrorEventDto;
                this.onStreamError(dto.message);
            }
            else if (event.event === AiEventName.DONE) {
                this.finishCurrent();
            }
        }
        catch (e) {
            Logger.e(TAG, `parse event ${event.event} failed`, e as Object);
        }
    }
    private onStreamError(message: string): void {
        const current: AiMessage | null = this.current;
        if (current !== null) {
            current.failed = true;
            current.streaming = false;
            current.hint = '';
            if (current.text.length === 0) {
                current.text = message;
            }
        }
        this.current = null;
        this.client = null;
        this.streaming = false;
    }
    private onComplete(): void {
        this.finishCurrent();
    }
    private finishCurrent(): void {
        const current: AiMessage | null = this.current;
        if (current !== null) {
            current.streaming = false;
            current.hint = '';
        }
        this.current = null;
        this.streaming = false;
    }
    private hintForScene(scene: string): string {
        if (scene === AiScene.FALLBACK_GENERATE as string) {
            return Strings.get({ "id": 16777283, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
        }
        return Strings.get({ "id": 16777292, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
    }
    /** 收藏 AI 生成的食谱。它不进 recipe 表、不计入榜单，单独存一份收藏关系。 */
    async toggleGeneratedFavorite(message: AiMessage): Promise<void> {
        const recipe: AiGeneratedRecipe | null = message.generated;
        if (recipe === null) {
            return;
        }
        const target: boolean = !recipe.favorited;
        recipe.favorited = target;
        // 重新赋值以触发 @Trace 的引用变更通知
        message.generated = recipe;
        try {
            if (target) {
                await AiRepository.favorite(recipe.id);
            }
            else {
                await AiRepository.unfavorite(recipe.id);
            }
            Toast.show(target ? { "id": 16777337, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" } : { "id": 16777338, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
        }
        catch (e) {
            Logger.e(TAG, 'toggle ai favorite failed', e as Object);
            recipe.favorited = !target;
            message.generated = recipe;
            Toast.show(readableMessage(e as Object));
        }
    }
}
