import { common } from '@kit.AbilityKit';
import { AuthService } from '../../../commons/auth/AuthService';
import { AuthRepository } from '../../../commons/auth/AuthRepository';
import { HuaweiAuth, HuaweiAuthResult } from '../../../commons/auth/HuaweiAuth';
import { AuthResult, LoginMode } from '../../../commons/model/User';
import { DOC_AGREEMENT, DOC_PRIVACY, RouteNames, WebDocParam } from '../../../commons/router/RouteNames';
import { NavUtil } from '../../../commons/router/NavUtil';
import { Toast } from '../../../commons/uikit/Toast';
import { Formatter } from '../../../commons/utils/Formatter';
import { Strings } from '../../../commons/utils/Strings';
import BuildProfile from 'BuildProfile';

const COUNTDOWN_SECONDS: number = 60;

<<<<<<< HEAD
/** 应用图标尺寸。规范①用应用图标/品牌标志凸显品牌特性。 */
const BRAND_ICON_SIZE: number = 72;

/**
 * 全屏登录页，从"我的"进入。
 * 与半屏 LoginSheet 共用 LoginForm 与 LoginViewModel，只是外壳不同。
 *
 * 版式按华为账号开放登录 UX 规范的推荐登录页布局：
 * 上方品牌区（图标 + 应用名 + 用途说明），下方操作区（华为账号登录 → 其他方式 → 协议）。
 * TopBar 保留返回入口，对应规范"用户应当有拒绝登录的权利"。
 */
=======
>>>>>>> c0f86ffaaf593cb9523e796d6367f3ff98cd0bdf
@ComponentV2
export struct LoginPage {
  @Local currentMode: LoginMode = LoginMode.SMS;
  @Local phone: string = '';
  @Local email: string = '';
  @Local account: string = '';
  @Local password: string = '';
  @Local code: string = '';
  @Local agreed: boolean = false;
  @Local submitting: boolean = false;
  @Local codeCountdown: number = 0;
  @Local auth: AuthService = AuthService.get();

  private timerId: number = -1;

  aboutToDisappear(): void {
    this.stopCountdown();
  }

  @Monitor('auth.isLogin')
  onLoginStateChanged(): void {
    if (this.auth.isLogin) {
      NavUtil.pop();
    }
  }

  get canSubmit(): boolean {
    if (!this.agreed || this.submitting) {
      return false;
    }
    if (this.currentMode === LoginMode.SMS) {
      return this.phone.length > 0 && this.code.length > 0;
    }
    if (this.currentMode === LoginMode.EMAIL) {
      return this.email.length > 0 && this.code.length > 0;
    }
    return this.account.length > 0 && this.password.length > 0;
  }

  private checkAgreement(): boolean {
    if (!this.agreed) {
      Toast.show($r('app.string.login_agreement_required'));
      return false;
    }
    return true;
  }

  private validate(): boolean {
    if (this.currentMode === LoginMode.SMS) {
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
    if (this.currentMode === LoginMode.EMAIL) {
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

  private async doLogin(): Promise<AuthResult> {
    if (this.currentMode === LoginMode.SMS) {
      return AuthRepository.loginBySms(this.phone, this.code);
    }
    if (this.currentMode === LoginMode.EMAIL) {
      return AuthRepository.loginByEmail(this.email, this.code);
    }
    return AuthRepository.loginByPassword(this.account, this.password);
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
      Toast.show((e as Error).message ?? $r('app.string.login_huawei_failed'));
    } finally {
      this.submitting = false;
    }
  }

  async loginByHuawei(): Promise<void> {
    if (!this.checkAgreement() || this.submitting) {
      return;
    }
    this.submitting = true;
    try {
      const context: common.UIAbilityContext = getContext(this) as common.UIAbilityContext;
      const authResult: HuaweiAuthResult = await HuaweiAuth.getAuthCode(context);
      if (authResult.authCode.length === 0) {
        if (BuildProfile.LOG_ENABLED as boolean) {
          Toast.show(`华为登录失败 code=${authResult.errCode} ${authResult.errMsg}`, 4000);
        } else {
          Toast.show($r('app.string.login_huawei_failed'));
        }
        return;
      }
      const result: AuthResult = await AuthRepository.loginByHuawei(authResult.authCode);
      await AuthService.get().onLoginSuccess(result);
      Toast.show($r('app.string.login_success'));
    } catch (e) {
      Toast.show((e as Error).message ?? $r('app.string.login_huawei_failed'));
    } finally {
      this.submitting = false;
    }
  }

  async sendCode(): Promise<void> {
    if (this.codeCountdown > 0) {
      return;
    }
    if (!this.checkAgreement()) {
      return;
    }
    try {
      if (this.currentMode === LoginMode.SMS) {
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
      Toast.show((e as Error).message ?? $r('app.string.login_huawei_failed'));
    }
  }

  switchMode(mode: LoginMode): void {
    this.currentMode = mode;
    this.code = '';
    this.password = '';
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

  private openDoc(docKey: string, title: Resource): void {
    const param: WebDocParam = { title: Strings.get(title), docKey: docKey };
    NavUtil.push(RouteNames.WEB_DOC, param);
  }

  private countdownText(): ResourceStr {
    if (this.codeCountdown === 0) {
      return $r('app.string.login_send_code');
    }
    return `${this.codeCountdown}s`;
  }

  build() {
    Column() {
<<<<<<< HEAD
      TopBar({ title: '' })

      Scroll() {
        Column() {
          this.brandSection()
          LoginForm({ vm: this.vm })
        }
        .width('100%')
        // 左右 16vp 已满足规范"按钮与屏幕安全间距最小 16vp"
        .padding({
          left: $r('app.float.space_lg'),
          right: $r('app.float.space_lg'),
          bottom: $r('app.float.space_xxl')
        })
      }
      .scrollBar(BarState.Off)
      .align(Alignment.Top)
      .layoutWeight(1)
=======
      this.titleBar()
      Scroll() {
        Column({ space: 24 }) {
          this.headerSection()
          this.huaweiLoginButton()
          this.dividerSection()
          this.formSection()
          this.switchModeSection()
          this.agreementSection()
        }
        .width('100%')
        .padding({ left: $r('app.float.space_xl'), right: $r('app.float.space_xl') })
      }
      .scrollBar(BarState.Off)
      .edgeEffect(EdgeEffect.Spring)
      .layoutWeight(1)
      // .expandSafeArea([SafeAreaType.KEYBOARD], [SafeAreaEdge.BOTTOM])
>>>>>>> c0f86ffaaf593cb9523e796d6367f3ff98cd0bdf
    }
    .width('100%')
    .height('100%')
    .backgroundColor($r('app.color.bg_page'))
    .expandSafeArea([SafeAreaType.KEYBOARD], [SafeAreaEdge.BOTTOM])
  }

  @Builder
  titleBar() {
    Row() {
      Image($r('app.media.ic_back'))
        .width($r('app.float.icon_lg'))
        .height($r('app.float.icon_lg'))
        .fillColor($r('app.color.text_primary'))
        .onClick(() => NavUtil.pop())
      Row().width($r('app.float.icon_lg'))
    }
    .width('100%')
    .height($r('app.float.bar_height'))
    .padding({ left: $r('app.float.space_lg'), right: $r('app.float.space_lg') })
    .alignItems(VerticalAlign.Center)
  }

  @Builder
  headerSection() {
    Column({ space: 8 }) {
      Text($r('app.string.login_title'))
        .fontSize($r('app.float.font_display'))
        .fontWeight(FontWeight.Bold)
        .fontColor($r('app.color.text_primary'))
        .width('100%')
      Text($r('app.string.login_subtitle'))
        .fontSize($r('app.float.font_body_sm'))
        .fontColor($r('app.color.text_secondary'))
        .width('100%')
    }
    .width('100%')
    .alignItems(HorizontalAlign.Start)
  }

  @Builder
  huaweiLoginButton() {
    Button({ stateEffect: !this.submitting }) {
      Row({ space: 8 }) {
        if (this.submitting) {
          LoadingProgress()
            .width($r('app.float.icon_md'))
            .height($r('app.float.icon_md'))
            .color($r('app.color.text_on_brand'))
        }
        Text($r('app.string.login_huawei'))
          .fontSize($r('app.float.font_title_sm'))
          .fontWeight(FontWeight.Medium)
          .fontColor($r('app.color.text_on_brand'))
      }
    }
    .type(ButtonType.Normal)
    .width('100%')
    .height($r('app.float.button_height'))
    .borderRadius($r('app.float.radius_md'))
    .backgroundColor($r('app.color.brand_primary'))
    .enabled(!this.submitting)
    .onClick(() => this.loginByHuawei())
  }

  @Builder
  dividerSection() {
    Row({ space: 12 }) {
      Divider()
        .color($r('app.color.divider'))
        .strokeWidth(1)
        .layoutWeight(1)
      Text($r('app.string.login_other_ways'))
        .fontSize($r('app.float.font_caption'))
        .fontColor($r('app.color.text_tertiary'))
      Divider()
        .color($r('app.color.divider'))
        .strokeWidth(1)
        .layoutWeight(1)
    }
    .width('100%')
    .alignItems(VerticalAlign.Center)
  }

  @Builder
  formSection() {
    Column({ space: 12 }) {
      if (this.currentMode === LoginMode.SMS) {
        TextInput({ placeholder: $r('app.string.login_phone_placeholder'), text: this.phone })
          .type(InputType.PhoneNumber)
          .inputFilter('[0-9]')
          .maxLength(11)
          .enterKeyType(EnterKeyType.Next)
          .width('100%')
          .height($r('app.float.button_height'))
          .borderRadius($r('app.float.radius_md'))
          .backgroundColor($r('app.color.bg_sunken'))
          .padding({ left: $r('app.float.space_lg'), right: $r('app.float.space_lg') })
          .fontSize($r('app.float.font_body'))
          .fontColor($r('app.color.text_primary'))
          .placeholderColor($r('app.color.text_tertiary'))
          .caretColor($r('app.color.brand_primary'))
          .onChange((value: string) => { this.phone = value; })

        Row({ space: 8 }) {
          TextInput({ placeholder: $r('app.string.login_code_placeholder'), text: this.code })
            .type(InputType.Number)
            .maxLength(6)
            .enterKeyType(EnterKeyType.Done)
            .layoutWeight(1)
            .height($r('app.float.button_height'))
            .borderRadius($r('app.float.radius_md'))
            .backgroundColor($r('app.color.bg_sunken'))
            .padding({ left: $r('app.float.space_lg'), right: $r('app.float.space_lg') })
            .fontSize($r('app.float.font_body'))
            .fontColor($r('app.color.text_primary'))
            .placeholderColor($r('app.color.text_tertiary'))
            .caretColor($r('app.color.brand_primary'))
            .onChange((value: string) => { this.code = value; })

          Button(this.countdownText())
            .type(ButtonType.Normal)
            .height($r('app.float.button_height'))
            .constraintSize({ minWidth: 108 })
            .borderRadius($r('app.float.radius_md'))
            .backgroundColor($r('app.color.brand_primary_light'))
            .fontColor(this.codeCountdown > 0 ? $r('app.color.text_tertiary') : $r('app.color.brand_primary'))
            .fontSize($r('app.float.font_body_sm'))
            .enabled(this.codeCountdown === 0)
            .onClick(() => this.sendCode())
        }
        .width('100%')
      } else if (this.currentMode === LoginMode.EMAIL) {
        TextInput({ placeholder: $r('app.string.login_email_placeholder'), text: this.email })
          .type(InputType.Email)
          .enterKeyType(EnterKeyType.Next)
          .width('100%')
          .height($r('app.float.button_height'))
          .borderRadius($r('app.float.radius_md'))
          .backgroundColor($r('app.color.bg_sunken'))
          .padding({ left: $r('app.float.space_lg'), right: $r('app.float.space_lg') })
          .fontSize($r('app.float.font_body'))
          .fontColor($r('app.color.text_primary'))
          .placeholderColor($r('app.color.text_tertiary'))
          .caretColor($r('app.color.brand_primary'))
          .onChange((value: string) => { this.email = value; })

        Row({ space: 8 }) {
          TextInput({ placeholder: $r('app.string.login_code_placeholder'), text: this.code })
            .type(InputType.Number)
            .maxLength(6)
            .enterKeyType(EnterKeyType.Done)
            .layoutWeight(1)
            .height($r('app.float.button_height'))
            .borderRadius($r('app.float.radius_md'))
            .backgroundColor($r('app.color.bg_sunken'))
            .padding({ left: $r('app.float.space_lg'), right: $r('app.float.space_lg') })
            .fontSize($r('app.float.font_body'))
            .fontColor($r('app.color.text_primary'))
            .placeholderColor($r('app.color.text_tertiary'))
            .caretColor($r('app.color.brand_primary'))
            .onChange((value: string) => { this.code = value; })

          Button(this.countdownText())
            .type(ButtonType.Normal)
            .height($r('app.float.button_height'))
            .constraintSize({ minWidth: 108 })
            .borderRadius($r('app.float.radius_md'))
            .backgroundColor($r('app.color.brand_primary_light'))
            .fontColor(this.codeCountdown > 0 ? $r('app.color.text_tertiary') : $r('app.color.brand_primary'))
            .fontSize($r('app.float.font_body_sm'))
            .enabled(this.codeCountdown === 0)
            .onClick(() => this.sendCode())
        }
        .width('100%')
      } else {
        TextInput({ placeholder: $r('app.string.login_account_placeholder'), text: this.account })
          .type(InputType.Normal)
          .enterKeyType(EnterKeyType.Next)
          .width('100%')
          .height($r('app.float.button_height'))
          .borderRadius($r('app.float.radius_md'))
          .backgroundColor($r('app.color.bg_sunken'))
          .padding({ left: $r('app.float.space_lg'), right: $r('app.float.space_lg') })
          .fontSize($r('app.float.font_body'))
          .fontColor($r('app.color.text_primary'))
          .placeholderColor($r('app.color.text_tertiary'))
          .caretColor($r('app.color.brand_primary'))
          .onChange((value: string) => { this.account = value; })

        TextInput({ placeholder: $r('app.string.login_password_placeholder'), text: this.password })
          .type(InputType.Password)
          .enterKeyType(EnterKeyType.Done)
          .width('100%')
          .height($r('app.float.button_height'))
          .borderRadius($r('app.float.radius_md'))
          .backgroundColor($r('app.color.bg_sunken'))
          .padding({ left: $r('app.float.space_lg'), right: $r('app.float.space_lg') })
          .fontSize($r('app.float.font_body'))
          .fontColor($r('app.color.text_primary'))
          .placeholderColor($r('app.color.text_tertiary'))
          .caretColor($r('app.color.brand_primary'))
          .onChange((value: string) => { this.password = value; })
      }

      Button($r('app.string.login_submit'))
        .type(ButtonType.Normal)
        .width('100%')
        .height($r('app.float.button_height'))
        .borderRadius($r('app.float.radius_md'))
        .backgroundColor(this.canSubmit ? $r('app.color.brand_primary') : $r('app.color.text_disabled'))
        .fontColor($r('app.color.text_on_brand'))
        .fontSize($r('app.float.font_title_sm'))
        .fontWeight(FontWeight.Medium)
        .enabled(this.canSubmit && !this.submitting)
        .onClick(() => this.submit())
    }
    .width('100%')
  }

  @Builder
  switchModeSection() {
    Row({ space: 16 }) {
      if (this.currentMode !== LoginMode.SMS) {
        Text($r('app.string.login_switch_sms'))
          .fontSize($r('app.float.font_body_sm'))
          .fontColor($r('app.color.brand_primary'))
          .fontWeight(FontWeight.Medium)
          .padding({ left: $r('app.float.space_sm'), right: $r('app.float.space_sm'), top: 4, bottom: 4 })
          .onClick(() => this.switchMode(LoginMode.SMS))
      }
      if (this.currentMode !== LoginMode.PASSWORD) {
        Text($r('app.string.login_switch_password'))
          .fontSize($r('app.float.font_body_sm'))
          .fontColor($r('app.color.brand_primary'))
          .fontWeight(FontWeight.Medium)
          .padding({ left: $r('app.float.space_sm'), right: $r('app.float.space_sm'), top: 4, bottom: 4 })
          .onClick(() => this.switchMode(LoginMode.PASSWORD))
      }
      if (this.currentMode !== LoginMode.EMAIL) {
        Text($r('app.string.login_switch_email'))
          .fontSize($r('app.float.font_body_sm'))
          .fontColor($r('app.color.brand_primary'))
          .fontWeight(FontWeight.Medium)
          .padding({ left: $r('app.float.space_sm'), right: $r('app.float.space_sm'), top: 4, bottom: 4 })
          .onClick(() => this.switchMode(LoginMode.EMAIL))
      }
    }
    .width('100%')
    .justifyContent(FlexAlign.Center)
  }

  @Builder
  agreementSection() {
    Row({ space: 8 }) {
      Checkbox()
        .select(this.agreed)
        .selectedColor($r('app.color.brand_primary'))
        .shape(CheckBoxShape.ROUNDED_SQUARE)
        .width($r('app.float.icon_md'))
        .height($r('app.float.icon_md'))
        .onChange((checked: boolean) => { this.agreed = checked; })

      Text() {
        Span($r('app.string.login_agreement_prefix'))
        Span($r('app.string.login_agreement_user'))
          .fontColor($r('app.color.brand_primary'))
          .onClick(() => this.openDoc(DOC_AGREEMENT, $r('app.string.mine_agreement')))
        Span($r('app.string.login_agreement_and'))
        Span($r('app.string.login_agreement_privacy'))
          .fontColor($r('app.color.brand_primary'))
          .onClick(() => this.openDoc(DOC_PRIVACY, $r('app.string.mine_privacy')))
      }
      .fontSize($r('app.float.font_caption'))
      .fontColor($r('app.color.text_secondary'))
      .layoutWeight(1)
    }
    .width('100%')
    .alignItems(VerticalAlign.Center)
  }

  @Builder
  brandSection() {
    Column({ space: 12 }) {
      Image($r('app.media.app_icon'))
        .width(BRAND_ICON_SIZE)
        .height(BRAND_ICON_SIZE)
        .borderRadius($r('app.float.radius_xl'))
        .backgroundColor($r('app.color.bg_surface'))
        .clip(true)

      Text($r('app.string.login_title'))
        .fontSize($r('app.float.font_display'))
        .fontWeight(FontWeight.Bold)
        .fontColor($r('app.color.text_primary'))

      Text($r('app.string.login_subtitle'))
        .fontSize($r('app.float.font_body_sm'))
        .fontColor($r('app.color.text_secondary'))
        .textAlign(TextAlign.Center)
    }
    .width('100%')
    .alignItems(HorizontalAlign.Center)
    .padding({ top: $r('app.float.space_xxl'), bottom: $r('app.float.space_xxl') })
  }
}
