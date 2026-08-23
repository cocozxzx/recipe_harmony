import { rcp } from '@kit.RemoteCommunicationKit';
import BuildProfile from 'BuildProfile';
import { TokenManager } from '../storage/TokenManager';
import { Logger } from '../utils/Logger';
import { ApiPaths } from './ApiPaths';
import { ApiResponseDto, RefreshResultDto } from './dto/Common';
import { RefreshReq } from './dto/Requests';
import { BizCode } from './Errors';

const TAG: string = 'Interceptors';

/** 刷新失败（refreshToken 也过期）时通知上层登出。由 AuthService 注册。 */
type SessionExpiredHandler = () => void;

let sessionExpiredHandler: SessionExpiredHandler | null = null;

export function setOnSessionExpired(handler: SessionExpiredHandler): void {
  sessionExpiredHandler = handler;
}

/**
 * ⚠️ 单飞（single-flight）锁。
 * 并发请求同时收到 401 时只允许一个 refresh 请求发出，其余挂起等待同一个 Promise。
 * 否则多次刷新会互相顶掉——后到的刷新结果覆盖先到的，先到的那批重放请求全部再次 401。
 */
let refreshingPromise: Promise<boolean> | null = null;

/** 刷新用的裸 session：不挂拦截器，避免刷新请求自身再触发 401 处理形成死循环 */
let refreshSession: rcp.Session | null = null;

function getRefreshSession(): rcp.Session {
  if (refreshSession === null) {
    refreshSession = rcp.createSession({
      requestConfiguration: {
        transfer: {
          timeout: { connectMs: 10000, transferMs: 15000 }
        }
      }
    });
  }
  return refreshSession;
}

async function doRefresh(): Promise<boolean> {
  const refreshToken: string = TokenManager.getRefreshToken();
  if (refreshToken.length === 0) {
    return false;
  }
  try {
    const body: RefreshReq = { refreshToken: refreshToken };
    const url: string = `${BuildProfile.API_BASE_URL as string}${ApiPaths.AUTH_REFRESH}`;
    const resp: rcp.Response = await getRefreshSession().post(url, JSON.stringify(body), {
      headers: { 'content-type': 'application/json' }
    });
    const text: string = resp.toString() ?? '';
    const parsed: ApiResponseDto<RefreshResultDto> = JSON.parse(text) as ApiResponseDto<RefreshResultDto>;
    if (parsed.code !== BizCode.SUCCESS || parsed.data === null || parsed.data === undefined) {
      Logger.w(TAG, `refresh rejected: code=${parsed.code}`);
      return false;
    }
    await TokenManager.save(parsed.data.token, parsed.data.refreshToken);
    Logger.i(TAG, 'token refreshed');
    return true;
  } catch (e) {
    Logger.e(TAG, 'refresh failed', e as Object);
    return false;
  }
}

/**
 * 并发安全的刷新入口：无论多少个 401 同时进来，只会真正发出一次刷新请求。
 */
export async function refreshTokenOnce(): Promise<boolean> {
  const inflight: Promise<boolean> | null = refreshingPromise;
  if (inflight !== null) {
    Logger.d(TAG, 'join in-flight refresh');
    return inflight;
  }
  const task: Promise<boolean> = doRefresh();
  refreshingPromise = task;
  let ok: boolean = false;
  try {
    ok = await task;
  } finally {
    refreshingPromise = null;
  }
  if (!ok) {
    await TokenManager.clear();
    if (sessionExpiredHandler !== null) {
      sessionExpiredHandler();
    }
  }
  return ok;
}

/**
 * 请求拦截：注入 Authorization。
 * 响应为 401 时刷新 token 并重放一次原请求（只重放一次，避免无限循环）。
 */
export class AuthInterceptor implements rcp.Interceptor {
  async intercept(context: rcp.RequestContext, next: rcp.RequestHandler): Promise<rcp.Response> {
    this.applyToken(context);
    const response: rcp.Response = await next.handle(context);
    if (response.statusCode !== 401) {
      return response;
    }
    Logger.i(TAG, `401 on ${context.request.url}, try refresh`);
    const refreshed: boolean = await refreshTokenOnce();
    if (!refreshed) {
      return response;
    }
    this.applyToken(context);
    return next.handle(context);
  }

  private applyToken(context: rcp.RequestContext): void {
    const token: string = TokenManager.getToken();
    if (token.length === 0) {
      return;
    }
    const headers: rcp.RequestHeaders = context.request.headers ?? {};
    headers['authorization'] = `Bearer ${token}`;
    context.request.headers = headers;
  }
}

/** 请求日志拦截，仅 dev 生效 */
export class LogInterceptor implements rcp.Interceptor {
  async intercept(context: rcp.RequestContext, next: rcp.RequestHandler): Promise<rcp.Response> {
    const start: number = Date.now();
    const url: string = context.request.url.toString();
    try {
      const response: rcp.Response = await next.handle(context);
      Logger.d(TAG, `${context.request.method} ${url} -> ${response.statusCode} (${Date.now() - start}ms)`);
      return response;
    } catch (e) {
      Logger.e(TAG, `${context.request.method} ${url} failed (${Date.now() - start}ms)`, e as Object);
      throw e as Error;
    }
  }
}
