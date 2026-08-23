import { rcp } from '@kit.RemoteCommunicationKit';
import BuildProfile from 'BuildProfile';
import { Logger } from '../utils/Logger';
import { ApiResponseDto } from './dto/Common';
import { BizCode, BizError, NetError } from './Errors';
import { AuthInterceptor, LogInterceptor } from './Interceptors';

const TAG: string = 'HttpClient';
const TIMEOUT_CONNECT_MS: number = 10000;
const TIMEOUT_TRANSFER_MS: number = 15000;

/** 本地接口：用于构建 multipart 文件字段，绕过 SDK 类型属性名差异 */
interface MultipartFileField {
  contentType: string;
  remoteFileName: string;
  filePath: string;
}

/** 查询参数容器。ArkTS 不支持动态属性访问，用显式 append 构建。 */
export class QueryParams {
  private parts: string[] = [];

  put(key: string, value: string): QueryParams {
    if (value.length > 0) {
      this.parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
    }
    return this;
  }

  putNumber(key: string, value: number): QueryParams {
    this.parts.push(`${encodeURIComponent(key)}=${value}`);
    return this;
  }

  /** 值为 0 视为未设置，用于 maxCookTime 这类"0 表示不限"的可选参数 */
  putPositive(key: string, value: number): QueryParams {
    if (value > 0) {
      this.parts.push(`${encodeURIComponent(key)}=${value}`);
    }
    return this;
  }

  toString(): string {
    return this.parts.length === 0 ? '' : `?${this.parts.join('&')}`;
  }
}

/**
 * 全局 HTTP 客户端。
 *
 * - 单例 rcp.Session，复用连接
 * - 泛型方法返回已解包的 `data`，调用方拿到的直接是业务数据
 * - code !== 0 抛 BizError；传输异常抛 NetError
 * - View 层禁止直接调用，必须经 Repository → ViewModel
 */
export class HttpClient {
  private static session: rcp.Session | null = null;

  private static getSession(): rcp.Session {
    if (HttpClient.session === null) {
      HttpClient.session = rcp.createSession({
        requestConfiguration: {
          transfer: {
            autoRedirect: true,
            timeout: {
              connectMs: TIMEOUT_CONNECT_MS,
              transferMs: TIMEOUT_TRANSFER_MS
            }
          },
          processing: {}
        },
        headers: {
          'content-type': 'application/json',
          'accept': 'application/json',
          'x-client': 'harmony'
        },
        interceptors: [new AuthInterceptor(), new LogInterceptor()]
      });
    }
    return HttpClient.session;
  }

  private static url(path: string): string {
    return `${BuildProfile.API_BASE_URL as string}${path}`;
  }

  static async get<T>(path: string, params?: QueryParams): Promise<T> {
    const suffix: string = params !== undefined ? params.toString() : '';
    return HttpClient.execute<T>(() => HttpClient.getSession().get(HttpClient.url(path) + suffix));
  }

  static async post<T>(path: string, body?: Object): Promise<T> {
    const payload: string = body !== undefined ? JSON.stringify(body) : '{}';
    return HttpClient.execute<T>(() => HttpClient.getSession().post(HttpClient.url(path), payload));
  }

  static async put<T>(path: string, body?: Object): Promise<T> {
    const payload: string = body !== undefined ? JSON.stringify(body) : '{}';
    return HttpClient.execute<T>(() => HttpClient.getSession().put(HttpClient.url(path), payload));
  }

  static async del<T>(path: string): Promise<T> {
    return HttpClient.execute<T>(() => HttpClient.getSession().delete(HttpClient.url(path)));
  }

  /** multipart 上传，目前只用于头像 */
  static async upload<T>(path: string, filePath: string, fieldName: string = 'file'): Promise<T> {
    const form: rcp.MultipartForm = new rcp.MultipartForm({});
    const field: MultipartFileField = {
      contentType: 'application/octet-stream',
      remoteFileName: 'avatar.jpg',
      filePath: filePath
    };
    form.fields[fieldName] = field as object as rcp.MultipartFormFieldValue;
    return HttpClient.execute<T>(() => HttpClient.getSession().post(HttpClient.url(path), form));
  }

  private static async execute<T>(call: () => Promise<rcp.Response>): Promise<T> {
    let response: rcp.Response;
    try {
      response = await call();
    } catch (e) {
      throw HttpClient.toNetError(e as Object);
    }
    return HttpClient.unwrap<T>(response);
  }

  /** 解包统一响应体 `{ code, message, data }` */
  private static unwrap<T>(response: rcp.Response): T {
    const status: number = response.statusCode ?? 0;
    if (status >= 500) {
      throw NetError.server();
    }
    if (status === 401) {
      // 走到这里说明拦截器刷新失败，登录态已被清除
      throw NetError.unauthorized();
    }
    const text: string = response.toString() ?? '';
    if (text.length === 0) {
      throw NetError.unknown();
    }
    let parsed: ApiResponseDto<T>;
    try {
      parsed = JSON.parse(text) as ApiResponseDto<T>;
    } catch (e) {
      Logger.e(TAG, 'parse response failed', e as Object);
      throw NetError.unknown();
    }
    if (parsed.code !== BizCode.SUCCESS) {
      throw new BizError(parsed.code, parsed.message ?? '');
    }
    return parsed.data;
  }

  /**
   * RCP 传输异常 → 用户可读文案。
   * 断网与超时的错误码区间见 RCP 文档；无法归类的一律 unknown，不把原始异常抛给 UI。
   */
  private static toNetError(err: Object): NetError {
    const e: BusinessError = err as BusinessError;
    const code: number = e.code ?? 0;
    Logger.w(TAG, `transport error code=${code} message=${e.message ?? ''}`);
    // 1007900028 超时；1007900005/1007900006 解析/连接失败
    if (code === 1007900028) {
      return NetError.timeout();
    }
    if (code === 1007900005 || code === 1007900006 || code === 1007900016) {
      return NetError.offline();
    }
    return NetError.unknown();
  }
}

interface BusinessError {
  code: number;
  message: string;
}
