import { common } from '@kit.AbilityKit';
import BuildProfile from 'BuildProfile';
import { AuthResult, LoginMode } from '../model/User';
import { readableMessage } from '../network/Errors';
import { Toast } from '../uikit/Toast';
import { Formatter } from '../utils/Formatter';
import { Logger } from '../utils/Logger';
import { AuthRepository } from './AuthRepository';
import { AuthService } from './AuthService';
import { HuaweiAuth, HuaweiAuthResult } from './HuaweiAuth';

const TAG: string = 'LoginViewModel';
const COUNTDOWN_SECONDS: number = 60;

/**
 * 登录表单的状态与业务动作。
 * 半屏 LoginSheet 与全屏 LoginPage 共用同一个 ViewModel，两处只是外壳不同。
 */
@ObservedV2
export class LoginViewModel {
  @Trace mode: LoginMode = LoginMode.SMS;
  @Trace phone: string = '';
  @Trace email: string = '';
  @Trace account: string = '';
  @Trace password: string = '';
  @Trace code: string = '';
  /** 协议勾选。未勾选不可登录——应用市场硬性要求，不是可选项。 */
  @Trace agreed: boolean = false;
  @Trace submitting: boolean = false;
  @Trace codeCountdown: number = 0;

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
      Toast.show($r('app.string.login_agreement_required'));
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
          Toast.show($r('app.string.login_phone_invalid'));
          return;
        }
        await AuthRepository.sendSmsCode(this.phone);
      } else {
        if (!Formatter.isEmail(this.email)) {
          Toast.show($r('app.string.login_email_invalid'));
          return;
        }
        await AuthRepository.sendEmailCode(this.email);
      }
      Toast.show($r('app.string.login_code_sent'));
      this.startCountdown();
    } catch (e) {
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
      Toast.show($r('app.string.login_success'));
    } catch (e) {
      Logger.e(TAG, 'login failed', e as Object);
      Toast.show(readableMessage(e as Object));
    } finally {
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
      const auth: HuaweiAuthResult = await HuaweiAuth.getAuthCode(context);
      if (auth.authCode.length === 0) {
        // debug 包直接把 Account Kit 的错误码显示出来，否则真机上无从排查
        if (BuildProfile.LOG_ENABLED as boolean) {
          Toast.show(`华为登录失败 code=${auth.errCode} ${auth.errMsg}`, 4000);
        } else {
          Toast.show($r('app.string.login_huawei_failed'));
        }
        return;
      }
      const result: AuthResult = await AuthRepository.loginByHuawei(auth.authCode);
      await AuthService.get().onLoginSuccess(result);
      Toast.show($r('app.string.login_success'));
    } catch (e) {
      Logger.e(TAG, 'huawei login failed', e as Object);
      Toast.show(readableMessage(e as Object));
    } finally {
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
        Toast.show($r('app.string.login_phone_invalid'));
        return false;
      }
      if (this.code.length === 0) {
        Toast.show($r('app.string.login_code_invalid'));
        return false;
      }
      return true;
    }
    if (this.mode === LoginMode.EMAIL) {
      if (!Formatter.isEmail(this.email)) {
        Toast.show($r('app.string.login_email_invalid'));
        return false;
      }
      if (this.code.length === 0) {
        Toast.show($r('app.string.login_code_invalid'));
        return false;
      }
      return true;
    }
    if (this.account.length === 0) {
      Toast.show($r('app.string.login_account_placeholder'));
      return false;
    }
    if (this.password.length === 0) {
      Toast.show($r('app.string.login_password_empty'));
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
