import { AuthResult } from '../model/User';
import { readableMessage } from '../network/Errors';
import { SCENE_REGISTER } from '../network/dto/Requests';
import { Toast } from '../uikit/Toast';
import { Formatter } from '../utils/Formatter';
import { Logger } from '../utils/Logger';
import { AuthRepository } from './AuthRepository';
import { AuthService } from './AuthService';

const TAG: string = 'RegisterViewModel';
const COUNTDOWN_SECONDS: number = 60;
const PASSWORD_MIN: number = 6;
const PASSWORD_MAX: number = 20;

/**
 * 手机号注册。
 *
 * 手机号是必填的，注册完这个号就同时是密码登录的账号和短信登录的凭证，
 * 用户不用再单独绑一次。注册成功后端直接下发登录态，这里不再跳回登录页。
 */
@ObservedV2
export class RegisterViewModel {
  @Trace phone: string = '';
  @Trace code: string = '';
  @Trace password: string = '';
  @Trace confirmPassword: string = '';
  @Trace nickname: string = '';
  @Trace agreed: boolean = false;
  @Trace submitting: boolean = false;
  @Trace codeCountdown: number = 0;

  private timerId: number = -1;

  get canSubmit(): boolean {
    return this.agreed && !this.submitting
      && this.phone.length > 0 && this.code.length > 0
      && this.password.length > 0 && this.confirmPassword.length > 0;
  }

  async sendCode(): Promise<void> {
    if (this.codeCountdown > 0) {
      return;
    }
    if (!this.checkAgreement()) {
      return;
    }
    if (!Formatter.isPhone(this.phone)) {
      Toast.show($r('app.string.login_phone_invalid'));
      return;
    }
    try {
      // 注册场景的码换不来登录，后端会顺手告诉我们这个号是不是已经注册过
      await AuthRepository.sendSmsCode(this.phone, SCENE_REGISTER);
      Toast.show($r('app.string.login_code_sent'));
      this.startCountdown();
    } catch (e) {
      Logger.e(TAG, 'sendCode failed', e);
      Toast.show(readableMessage(e));
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
      const result: AuthResult =
        await AuthRepository.register(this.phone, this.code, this.password, this.nickname.trim());
      await AuthService.get().onLoginSuccess(result);
      Toast.show($r('app.string.register_success'));
    } catch (e) {
      Logger.e(TAG, 'register failed', e);
      Toast.show(readableMessage(e));
    } finally {
      this.submitting = false;
    }
  }

  /** 页面销毁时务必调用，否则倒计时定时器会一直跑 */
  dispose(): void {
    this.stopCountdown();
  }

  private checkAgreement(): boolean {
    if (!this.agreed) {
      Toast.show($r('app.string.login_agreement_required'));
      return false;
    }
    return true;
  }

  private validate(): boolean {
    if (!Formatter.isPhone(this.phone)) {
      Toast.show($r('app.string.login_phone_invalid'));
      return false;
    }
    if (this.code.length === 0) {
      Toast.show($r('app.string.login_code_invalid'));
      return false;
    }
    if (this.password.length < PASSWORD_MIN || this.password.length > PASSWORD_MAX) {
      Toast.show($r('app.string.register_password_rule'));
      return false;
    }
    if (this.password !== this.confirmPassword) {
      Toast.show($r('app.string.register_password_mismatch'));
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
