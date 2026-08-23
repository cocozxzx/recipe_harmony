import { Strings } from '../utils/Strings';

/**
 * 网络层错误类型。UI 层只需读 `message`（已是用户可读文案），
 * 需要特殊处理的场景才判断 `code`。原始异常一律不外抛到 View。
 */

/** 后端业务错误码，code !== 0 时抛出 */
export class BizError extends Error {
  readonly code: number;

  constructor(code: number, message: string) {
    super(message);
    this.name = 'BizError';
    this.code = code;
  }
}

export enum NetErrorKind {
  OFFLINE,
  TIMEOUT,
  SERVER,
  UNAUTHORIZED,
  UNKNOWN
}

/** 传输层异常：断网、超时、5xx，转成用户可读文案 */
export class NetError extends Error {
  readonly kind: NetErrorKind;

  constructor(kind: NetErrorKind, message: string) {
    super(message);
    this.name = 'NetError';
    this.kind = kind;
  }

  static offline(): NetError {
    return new NetError(NetErrorKind.OFFLINE, Strings.get($r('app.string.net_error_offline'), '网络似乎断开了'));
  }

  static timeout(): NetError {
    return new NetError(NetErrorKind.TIMEOUT, Strings.get($r('app.string.net_error_timeout'), '请求超时了'));
  }

  static server(): NetError {
    return new NetError(NetErrorKind.SERVER, Strings.get($r('app.string.net_error_server'), '服务开小差了'));
  }

  static unauthorized(): NetError {
    return new NetError(NetErrorKind.UNAUTHORIZED, Strings.get($r('app.string.net_error_unknown'), '登录已失效'));
  }

  static unknown(): NetError {
    return new NetError(NetErrorKind.UNKNOWN, Strings.get($r('app.string.net_error_unknown'), '出了点问题'));
  }
}

/** 业务码约定 */
export class BizCode {
  static readonly SUCCESS: number = 0;
  static readonly UNAUTHORIZED: number = 401;
  static readonly FORBIDDEN: number = 403;
  static readonly NOT_FOUND: number = 404;
}

/**
 * 把任意异常转成用户可读文案。
 * ViewModel 设置错误态时统一用这个，不要自己拼文案。
 */
export function readableMessage(err: Object): string {
  if (err instanceof BizError) {
    const biz: BizError = err as BizError;
    if (biz.message.length > 0) {
      return biz.message;
    }
  } else if (err instanceof NetError) {
    return (err as NetError).message;
  }
  return Strings.get($r('app.string.net_error_unknown'), '出了点问题，请稍后重试');
}
