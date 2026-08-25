import { BusinessError } from '@kit.BasicServicesKit';
import BuildProfile from 'BuildProfile';
import { AuthResult, CaptchaInfo } from '../model/User';
import { readableMessage } from '../network/Errors';
import { SCENE_LOGIN } from '../network/dto/Requests';
import { Toast } from '../uikit/Toast';
import { Formatter } from '../utils/Formatter';
import { Logger } from '../utils/Logger';
import { AuthRepository } from './AuthRepository';
import { AuthService } from './AuthService';

const TAG: string = 'LoginViewModel';
const COUNTDOWN_SECONDS: number = 60;

/** 表单登录方式。华为账号不在其中——它是独立的官方按钮，不参与切换。 */
export enum LoginMode {
  SMS,
  PASSWORD
}

/**
 * Account Kit 登录按钮回调的错误码。
 * 取值见「使用华为账号登录按钮登录」文档，登录涉及 UI 交互时必须按码分别提示。
 */
enum HuaweiErrorCode {
  /** 设备未登录华为账号 */
  LOGIN_OUT = 1001502001,
  NETWORK = 1001502005,
  INTERNAL = 1001502009,
  USER_CANCEL = 1001502012,
  SYSTEM_SERVICE = 12300001,
  /** 重复请求，应用无需处理 */
  REQUEST_REFUSE = 1001500002,
  /** 未同意协议，即按钮的 AgreementStatus 仍是 NOT_ACCEPTED */
  AGREEMENT_NOT_ACCEPTED = 1005300001
}

/**
 * 登录表单的状态与业务动作。
 * 半屏 LoginSheet 与全屏 LoginPage 共用同一个 ViewModel，两处只是外壳不同。
 *
 * 三种登录方式：华为账号（官方按钮）、手机验证码、账号密码。
 * 账号密码这条额外要过图形验证码——它是唯一能被脚本反复重放的入口。
 */
@ObservedV2
export class LoginViewModel {
  @Trace mode: LoginMode = LoginMode.SMS;
  @Trace phone: string = '';
  @Trace code: string = '';
  @Trace account: string = '';
  @Trace password: string = '';
  @Trace captchaCode: string = '';
  /** 图形验证码图片，PNG 的 data URI */
  @Trace captchaImage: string = '';
  /** 协议勾选。未勾选不可登录——应用市场硬性要求，不是可选项。 */
  @Trace agreed: boolean = false;
  @Trace submitting: boolean = false;
  @Trace codeCountdown: number = 0;

  private captchaKey: string = '';
  private timerId: number = -1;

  get canSubmit(): boolean {
    if (!this.agreed || this.submitting) {
      return false;
    }
    if (this.mode === LoginMode.SMS) {
      return this.phone.length > 0 && this.code.length > 0;
    }
    return this.account.length > 0 && this.password.length > 0 && this.captchaCode.length > 0;
  }

  switchMode(mode: LoginMode): void {
    this.mode = mode;
    this.code = '';
    this.password = '';
    this.captchaCode = '';
    // 切到密码登录才去取图，一进页面就取的话验证码可能先于用户操作过期
    if (mode === LoginMode.PASSWORD && this.captchaImage.length === 0) {
      this.refreshCaptcha();
    }
  }

  /** 拉一张新的图形验证码。答错、过期、切到密码登录时都要调 */
  async refreshCaptcha(): Promise<void> {
    try {
      const captcha: CaptchaInfo = await AuthRepository.getCaptcha();
      this.captchaKey = captcha.captchaKey;
      this.captchaImage = captcha.image;
      this.captchaCode = '';
    } catch (e) {
      Logger.e(TAG, 'load captcha failed', e as Object);
      Toast.show(readableMessage(e as Object));
    }
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
      await AuthRepository.sendSmsCode(this.phone, SCENE_LOGIN);
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
      // 图形验证码是一次性的，这次请求已经把它消费掉了，无论因为什么失败都得换一张
      if (this.mode === LoginMode.PASSWORD) {
        await this.refreshCaptcha();
      }
    } finally {
      this.submitting = false;
    }
  }

  /**
   * 华为账号登录按钮回调成功：拿到 Authorization Code 后交给后端换正式 token。
   * 用户资料与 openId 的获取都在后端完成，避免把 Client Secret 放进客户端。
   */
  async onHuaweiCredential(authorizationCode: string): Promise<void> {
    if (this.submitting) {
      return;
    }
    if (authorizationCode.length === 0) {
      Toast.show($r('app.string.login_huawei_failed'));
      return;
    }
    this.submitting = true;
    try {
      const result: AuthResult = await AuthRepository.loginByHuawei(authorizationCode);
      await AuthService.get().onLoginSuccess(result);
      Toast.show($r('app.string.login_success'));
    } catch (e) {
      Logger.e(TAG, 'huawei login failed', e as Object);
      Toast.show(readableMessage(e as Object));
    } finally {
      this.submitting = false;
    }
  }

  /** 华为账号登录按钮回调失败：按错误码给出可操作的提示，不要一律"登录失败" */
  onHuaweiError(error: BusinessError): void {
    const code: number = error.code;
    Logger.e(TAG, `huawei button failed, code=${code}, msg=${error.message}`);
    if (code === HuaweiErrorCode.REQUEST_REFUSE || code === HuaweiErrorCode.USER_CANCEL) {
      return;
    }
    if (code === HuaweiErrorCode.AGREEMENT_NOT_ACCEPTED) {
      Toast.show($r('app.string.login_agreement_required'));
      return;
    }
    if (code === HuaweiErrorCode.LOGIN_OUT) {
      Toast.show($r('app.string.login_huawei_not_login'));
      return;
    }
    if (code === HuaweiErrorCode.NETWORK) {
      Toast.show($r('app.string.login_huawei_network'));
      return;
    }
    if (code === HuaweiErrorCode.SYSTEM_SERVICE) {
      Toast.show($r('app.string.login_huawei_system'));
      return;
    }
    // debug 包直接把原始错误码显示出来，否则真机上除了「登录失败」什么都看不到
    if (BuildProfile.LOG_ENABLED as boolean) {
      Toast.show(`华为登录失败 code=${code} ${error.message}`, 4000);
      return;
    }
    Toast.show($r('app.string.login_huawei_failed'));
  }

  /** 页面销毁时务必调用，否则倒计时定时器会一直跑 */
  dispose(): void {
    this.stopCountdown();
  }

  private async doLogin(): Promise<AuthResult> {
    if (this.mode === LoginMode.SMS) {
      return AuthRepository.loginBySms(this.phone, this.code);
    }
    return AuthRepository.loginByPassword(this.account, this.password, this.captchaKey, this.captchaCode);
  }

  /** 未勾选协议时统一在这里提示，各个入口不必各写一遍 */
  private checkAgreement(): boolean {
    if (!this.agreed) {
      Toast.show($r('app.string.login_agreement_required'));
      return false;
    }
    return true;
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
    if (this.account.length === 0) {
      Toast.show($r('app.string.login_account_placeholder'));
      return false;
    }
    if (this.password.length === 0) {
      Toast.show($r('app.string.login_password_empty'));
      return false;
    }
    if (this.captchaCode.length === 0) {
      Toast.show($r('app.string.login_captcha_empty'));
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
