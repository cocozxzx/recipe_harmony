import { AppStorageV2 } from "@ohos:arkui.StateManagement";
import type { AuthResult, UserInfo } from '../model/User';
import { setOnSessionExpired } from "@bundle:com.eatapp.recipe/entry/ets/commons/network/Interceptors";
import { PreferenceUtil, PrefKeys } from "@bundle:com.eatapp.recipe/entry/ets/commons/storage/PreferenceUtil";
import { TokenManager } from "@bundle:com.eatapp.recipe/entry/ets/commons/storage/TokenManager";
import { Logger } from "@bundle:com.eatapp.recipe/entry/ets/commons/utils/Logger";
import { AuthRepository } from "@bundle:com.eatapp.recipe/entry/ets/commons/auth/AuthRepository";
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
    @Trace
    isLogin: boolean = false;
    @Trace
    user: UserInfo | null = null;
    /** 由 Index.ets 监听：true 时弹出半屏登录 */
    @Trace
    sheetVisible: boolean = false;
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
                service.user = JSON.parse(cached) as UserInfo;
                service.isLogin = true;
            }
            catch (e) {
                Logger.e(TAG, 'parse cached user failed', e as Object);
            }
        }
        else {
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
        await TokenManager.save(result.token, result.refreshToken);
        await this.cacheUser(result.user);
        this.user = result.user;
        this.isLogin = true;
        this.sheetVisible = false;
        Logger.i(TAG, `login success: ${result.user.id}`);
        this.runPending();
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
        }
        catch (e) {
            // 拉取失败不影响已有登录态；若是 401，拦截器已经走过登出流程
            Logger.w(TAG, 'refreshUser failed', e as Object);
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
        }
        catch (e) {
            // 后端登出失败不阻塞本地登出，否则用户会被困在已登录状态
            Logger.w(TAG, 'server logout failed, clear locally anyway', e as Object);
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
