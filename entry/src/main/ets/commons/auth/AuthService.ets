import { AppStorageV2 } from '@kit.ArkUI';
import { AuthResult, UserInfo } from '../model/User';
import { setOnSessionExpired } from '../network/Interceptors';
import { PreferenceUtil, PrefKeys } from '../storage/PreferenceUtil';
import { TokenManager } from '../storage/TokenManager';
import { Logger } from '../utils/Logger';
import { AuthRepository } from './AuthRepository';

const TAG: string = 'AuthService';

/**
 * 全局登录态。
 *
 * 不做启动强制登录：App 直接进首页，用户触发受限动作时才半屏拉起登录，
 * 登录成功后自动继续原动作（点收藏 → 登录 → 收藏成功）。
 *
 * 登录弹窗本身是 UI，Service 不直接持有它——只置 `sheetVisible` 标志位，
 * 由 Index.ets 上挂载的 bindSheet 响应。这样 commons 不依赖任何具体页面。
 */
@ObservedV2
export class AuthService {
  @Trace isLogin: boolean = false;
  @Trace user: UserInfo | null = null;

  getUserOrDefault(): UserInfo {
    return this.user ?? new UserInfo();
  }
  /** 由 Index.ets 监听：true 时弹出半屏登录 */
  @Trace sheetVisible: boolean = false;

  /** 登录成功后要继续执行的动作。登录被取消时丢弃。 */
  private pendingAction: (() => void) | null = null;

  static get(): AuthService {
    return AppStorageV2.connect(AuthService, 'AuthService', () => new AuthService())!;
  }

  /** App 启动时调用：恢复本地登录态，并在后台拉一次最新用户信息 */
  static async bootstrap(): Promise<void> {
    const service: AuthService = AuthService.get();
    setOnSessionExpired(() => {
      Logger.w(TAG, 'session expired, force logout');
      service.applyLoggedOut();
    });

    await TokenManager.restore();
    if (!TokenManager.hasToken()) {
      return;
    }
    const cached: string = await PreferenceUtil.getString(PrefKeys.USER_INFO);
    if (cached.length > 0) {
      try {
        const parsed: Record<string, Object> = JSON.parse(cached);
        service.user = UserInfo.fromJson(parsed);
        service.isLogin = true;
      } catch (err) {
        Logger.e(TAG, 'parse cached user failed', err);
      }
    } else {
      service.isLogin = true;
    }
    await service.refreshUser();
  }

  /**
   * 登录拦截。已登录直接执行；未登录先拉起半屏登录，成功后再执行。
   * 收藏、点赞、AI Tab、我的 Tab 都走这里。
   */
  requireLogin(action: () => void): void {
    if (this.isLogin) {
      action();
      return;
    }
    this.pendingAction = action;
    this.sheetVisible = true;
  }

  /** 登录成功：存 token → 更新状态 → 关弹窗 → 执行 pending action */
  async onLoginSuccess(result: AuthResult): Promise<void> {
    const user: UserInfo = result.user;
    await TokenManager.save(result.token, result.refreshToken);
    await this.cacheUser(user);
    this.user = user;
    this.isLogin = true;
    this.sheetVisible = false;
    Logger.i(TAG, 'login success: ' + user.id);
    this.runPending();
  }

  /**
   * 从半屏登录里跳去别的页面（注册、协议）之前收起弹窗。
   *
   * 和 onLoginCancelled 的区别是保留 pendingAction：用户是绕路去注册，
   * 不是放弃登录，注册成功后原来那个动作（比如收藏）还得继续。
   * 全屏登录页调用它是空操作，所以调用方不必分辨自己在哪个外壳里。
   */
  dismissSheetForNavigation(): void {
    this.sheetVisible = false;
  }

  /** 用户主动关闭登录弹窗：丢弃 pending action，不要在下次登录时莫名其妙地执行 */
  onLoginCancelled(): void {
    this.pendingAction = null;
    this.sheetVisible = false;
  }

  async refreshUser(): Promise<void> {
    if (!TokenManager.hasToken()) {
      return;
    }
    try {
      const info: UserInfo = await AuthRepository.getMe();
      this.user = info;
      this.isLogin = true;
      await this.cacheUser(info);
    } catch (e) {
      Logger.w(TAG, 'refreshUser failed', e);
    }
  }

  /** 本地更新用户信息，用于资料编辑后立即回显 */
  async setUser(info: UserInfo): Promise<void> {
    this.user = info;
    await this.cacheUser(info);
  }

  async logout(): Promise<void> {
    try {
      await AuthRepository.logout();
    } catch (err) {
      Logger.w(TAG, 'server logout failed, clear locally anyway', err);
    }
    this.applyLoggedOut();
  }

  async deleteAccount(): Promise<void> {
    await AuthRepository.deleteAccount();
    this.applyLoggedOut();
  }

  /** 清空本地登录态。token 失效、退出登录、注销账号三条路径共用。 */
  applyLoggedOut(): void {
    this.isLogin = false;
    this.user = null;
    this.pendingAction = null;
    TokenManager.clear();
  }

  private runPending(): void {
    const action: (() => void) | null = this.pendingAction;
    this.pendingAction = null;
    if (action !== null) {
      action();
    }
  }

  private async cacheUser(info: UserInfo): Promise<void> {
    await PreferenceUtil.putString(PrefKeys.USER_INFO, JSON.stringify(info));
  }
}
