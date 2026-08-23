import { PreferenceUtil, PrefKeys } from './PreferenceUtil';
import { Logger } from '../utils/Logger';

const TAG: string = 'TokenManager';

/**
 * Token 读写。内存缓存 + preferences 持久化。
 *
 * 拦截器在每个请求的同步路径上读 token，所以必须有内存副本——
 * 不能每次都 await preferences。App 启动时 `restore()` 一次即可。
 */
export class TokenManager {
  private static token: string = '';
  private static refreshToken: string = '';

  /** App 启动时调用一次，把落盘的 token 载入内存 */
  static async restore(): Promise<void> {
    TokenManager.token = await PreferenceUtil.getString(PrefKeys.TOKEN);
    TokenManager.refreshToken = await PreferenceUtil.getString(PrefKeys.REFRESH_TOKEN);
    Logger.i(TAG, `restored, hasToken=${TokenManager.token.length > 0}`);
  }

  static getToken(): string {
    return TokenManager.token;
  }

  static getRefreshToken(): string {
    return TokenManager.refreshToken;
  }

  static hasToken(): boolean {
    return TokenManager.token.length > 0;
  }

  static async save(token: string, refreshToken: string): Promise<void> {
    TokenManager.token = token;
    TokenManager.refreshToken = refreshToken;
    await PreferenceUtil.putString(PrefKeys.TOKEN, token);
    await PreferenceUtil.putString(PrefKeys.REFRESH_TOKEN, refreshToken);
  }

  static async clear(): Promise<void> {
    TokenManager.token = '';
    TokenManager.refreshToken = '';
    await PreferenceUtil.delete(PrefKeys.TOKEN);
    await PreferenceUtil.delete(PrefKeys.REFRESH_TOKEN);
    await PreferenceUtil.delete(PrefKeys.USER_INFO);
    Logger.i(TAG, 'cleared');
  }
}
