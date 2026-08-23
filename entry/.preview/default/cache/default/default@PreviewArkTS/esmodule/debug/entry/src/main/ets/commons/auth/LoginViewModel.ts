import type common from "@ohos:app.ability.common";
import { LoginMode } from "@bundle:com.eatapp.recipe/entry/ets/commons/model/User";
import type { AuthResult } from "@bundle:com.eatapp.recipe/entry/ets/commons/model/User";
import { readableMessage } from "@bundle:com.eatapp.recipe/entry/ets/commons/network/Errors";
import { Toast } from "@bundle:com.eatapp.recipe/entry/ets/commons/uikit/Toast";
import { Formatter } from "@bundle:com.eatapp.recipe/entry/ets/commons/utils/Formatter";
import { Logger } from "@bundle:com.eatapp.recipe/entry/ets/commons/utils/Logger";
import { AuthRepository } from "@bundle:com.eatapp.recipe/entry/ets/commons/auth/AuthRepository";
import { AuthService } from "@bundle:com.eatapp.recipe/entry/ets/commons/auth/AuthService";
import { HuaweiAuth } from "@bundle:com.eatapp.recipe/entry/ets/commons/auth/HuaweiAuth";
const TAG: string = 'LoginViewModel';
const COUNTDOWN_SECONDS: number = 60;
/**
 * 登录表单的状态与业务动作。
 * 半屏 LoginSheet 与全屏 LoginPage 共用同一个 ViewModel，两处只是外壳不同。
 */
@ObservedV2
export class LoginViewModel {
    @Trace
    mode: LoginMode = LoginMode.SMS;
    @Trace
    phone: string = '';
    @Trace
    email: string = '';
    @Trace
    account: string = '';
    @Trace
    password: string = '';
    @Trace
    code: string = '';
    /** 协议勾选。未勾选不可登录——应用市场硬性要求，不是可选项。 */
    @Trace
    agreed: boolean = false;
    @Trace
    submitting: boolean = false;
    @Trace
    codeCountdown: number = 0;
    private timerId: number = -1;
    get canSubmit(): boolean {
        if (!this.agreed || this.submitting) {
            return false;
        }
        if (this.mode === LoginMode.SMS) {
            return this.phone.length > 0 && this.code.length > 0;
        }
        if (this.mode === LoginMode.EMAIL) {
            return this.email.length > 0 && this.code.length > 0;
        }
        return this.account.length > 0 && this.password.length > 0;
    }
    switchMode(mode: LoginMode): void {
        this.mode = mode;
        this.code = '';
        this.password = '';
    }
    /** 未勾选协议时统一在这里提示，各个入口不必各写一遍 */
    private checkAgreement(): boolean {
        if (!this.agreed) {
            Toast.show({ "id": 16777355, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            return false;
        }
        return true;
    }
    async sendCode(): Promise<void> {
        if (this.codeCountdown > 0) {
            return;
        }
        if (!this.checkAgreement()) {
            return;
        }
        try {
            if (this.mode === LoginMode.SMS) {
                if (!Formatter.isPhone(this.phone)) {
                    Toast.show({ "id": 16777367, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                    return;
                }
                await AuthRepository.sendSmsCode(this.phone);
            }
            else {
                if (!Formatter.isEmail(this.email)) {
                    Toast.show({ "id": 16777360, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                    return;
                }
                await AuthRepository.sendEmailCode(this.email);
            }
            Toast.show({ "id": 16777359, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            this.startCountdown();
        }
        catch (e) {
            Logger.e(TAG, 'sendCode failed', e as Object);
            Toast.show(readableMessage(e as Object));
        }
    }
    async submit(): Promise<void> {
        if (!this.checkAgreement() || this.submitting) {
            return;
        }
        if (!this.validate()) {
            return;
        }
        this.submitting = true;
        try {
            const result: AuthResult = await this.doLogin();
            await AuthService.get().onLoginSuccess(result);
            Toast.show({ "id": 16777372, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
        }
        catch (e) {
            Logger.e(TAG, 'login failed', e as Object);
            Toast.show(readableMessage(e as Object));
        }
        finally {
            this.submitting = false;
        }
    }
    /** 华为账号一键登录：先换 authCode，再交给后端 */
    async loginByHuawei(context: common.UIAbilityContext): Promise<void> {
        if (!this.checkAgreement() || this.submitting) {
            return;
        }
        this.submitting = true;
        try {
            const authCode: string = await HuaweiAuth.getAuthCode(context);
            if (authCode.length === 0) {
                Toast.show({ "id": 16777363, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                return;
            }
            const result: AuthResult = await AuthRepository.loginByHuawei(authCode);
            await AuthService.get().onLoginSuccess(result);
            Toast.show({ "id": 16777372, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
        }
        catch (e) {
            Logger.e(TAG, 'huawei login failed', e as Object);
            Toast.show(readableMessage(e as Object));
        }
        finally {
            this.submitting = false;
        }
    }
    /** 页面销毁时务必调用，否则倒计时定时器会一直跑 */
    dispose(): void {
        this.stopCountdown();
    }
    private async doLogin(): Promise<AuthResult> {
        if (this.mode === LoginMode.SMS) {
            return AuthRepository.loginBySms(this.phone, this.code);
        }
        if (this.mode === LoginMode.EMAIL) {
            return AuthRepository.loginByEmail(this.email, this.code);
        }
        return AuthRepository.loginByPassword(this.account, this.password);
    }
    private validate(): boolean {
        if (this.mode === LoginMode.SMS) {
            if (!Formatter.isPhone(this.phone)) {
                Toast.show({ "id": 16777367, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                return false;
            }
            if (this.code.length === 0) {
                Toast.show({ "id": 16777357, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                return false;
            }
            return true;
        }
        if (this.mode === LoginMode.EMAIL) {
            if (!Formatter.isEmail(this.email)) {
                Toast.show({ "id": 16777360, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                return false;
            }
            if (this.code.length === 0) {
                Toast.show({ "id": 16777357, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                return false;
            }
            return true;
        }
        if (this.account.length === 0) {
            Toast.show({ "id": 16777351, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            return false;
        }
        if (this.password.length === 0) {
            Toast.show({ "id": 16777365, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            return false;
        }
        return true;
    }
    private startCountdown(): void {
        this.stopCountdown();
        this.codeCountdown = COUNTDOWN_SECONDS;
        this.timerId = setInterval(() => {
            this.codeCountdown -= 1;
            if (this.codeCountdown <= 0) {
                this.stopCountdown();
            }
        }, 1000);
    }
    private stopCountdown(): void {
        if (this.timerId !== -1) {
            clearInterval(this.timerId);
            this.timerId = -1;
        }
        this.codeCountdown = 0;
    }
}
