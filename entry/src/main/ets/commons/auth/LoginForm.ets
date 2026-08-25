import { RouteNames } from '../router/RouteNames';
import { AuthService } from './AuthService';
import { NavUtil } from '../router/NavUtil';
import { PrimaryButton } from '../uikit/Buttons';
import { AgreementRow, AuthCodeField, AuthFieldDivider, AuthInput } from './AuthWidgets';
import { HuaweiLoginButton } from './HuaweiLoginButton';
import { LoginMode, LoginViewModel } from './LoginViewModel';

/** 图形验证码图片尺寸。后端画布是 120x44，这里等比缩一点 */
const CAPTCHA_WIDTH: number = 100;
const CAPTCHA_HEIGHT: number = 36;

/**
 * 登录操作区。半屏 LoginSheet 与全屏 LoginPage 共用。
 *
 * 布局遵循华为账号开放登录 UX 规范：
 * ④ 华为账号登录按钮必须是首个登录选项，且用官方组件，不可自绘；
 * ⑤ 其他方式登录（手机验证码 / 账号密码）必须排在它下方，视觉权重更低；
 * ⑥ 协议区必须含《华为账号用户认证协议》并可查看详情。
 */
@ComponentV2
export struct LoginForm {
  @Param vm: LoginViewModel = new LoginViewModel();

  build() {
    Column({ space: 20 }) {
      HuaweiLoginButton({ vm: this.vm })
      this.otherWaysDivider()
      this.modeTabs()
      this.formSection()
      AgreementRow({
        agreed: this.vm.agreed,
        onAgreedChange: (checked: boolean) => { this.vm.agreed = checked; }
      })
      this.registerEntry()
    }
    .width('100%')
    .alignItems(HorizontalAlign.Start)
  }

  @Builder
  otherWaysDivider() {
    Row({ space: 12 }) {
      Divider().color($r('app.color.divider')).strokeWidth(1).layoutWeight(1)
      Text($r('app.string.login_other_ways'))
        .fontSize($r('app.float.font_caption'))
        .fontColor($r('app.color.text_tertiary'))
      Divider().color($r('app.color.divider')).strokeWidth(1).layoutWeight(1)
    }
    .width('100%')
    .alignItems(VerticalAlign.Center)
  }

  /** 两种表单登录方式做成分段切换，比一排文字链更容易看出当前在哪一档 */
  @Builder
  modeTabs() {
    Row() {
      this.modeTab($r('app.string.login_switch_sms'), LoginMode.SMS)
      this.modeTab($r('app.string.login_switch_password'), LoginMode.PASSWORD)
    }
    .width('100%')
    .padding(4)
    .borderRadius($r('app.float.radius_md'))
    .backgroundColor($r('app.color.bg_sunken'))
  }

  @Builder
  modeTab(text: ResourceStr, mode: LoginMode) {
    Text(text)
      .textAlign(TextAlign.Center)
      .layoutWeight(1)
      .height($r('app.float.chip_height'))
      .fontSize($r('app.float.font_body_sm'))
      .fontWeight(this.vm.mode === mode ? FontWeight.Medium : FontWeight.Normal)
      .fontColor(this.vm.mode === mode ? $r('app.color.brand_primary') : $r('app.color.text_secondary'))
      .backgroundColor(this.vm.mode === mode ? $r('app.color.bg_surface') : $r('app.color.transparent'))
      .borderRadius($r('app.float.radius_sm'))
      .onClick(() => this.vm.switchMode(mode))
  }

  @Builder
  formSection() {
    Column({ space: 16 }) {
      Column() {
        if (this.vm.mode === LoginMode.SMS) {
          AuthInput({
            placeholder: $r('app.string.login_phone_placeholder'),
            value: this.vm.phone,
            inputType: InputType.PhoneNumber,
            maxLength: 11,
            onValueChange: (v: string) => { this.vm.phone = v; }
          })
          AuthFieldDivider()
          AuthCodeField({
            value: this.vm.code,
            countdown: this.vm.codeCountdown,
            onValueChange: (v: string) => { this.vm.code = v; },
            onSend: () => this.vm.sendCode()
          })
        } else {
          AuthInput({
            placeholder: $r('app.string.login_account_placeholder'),
            value: this.vm.account,
            onValueChange: (v: string) => { this.vm.account = v; }
          })
          AuthFieldDivider()
          AuthInput({
            placeholder: $r('app.string.login_password_placeholder'),
            value: this.vm.password,
            inputType: InputType.Password,
            onValueChange: (v: string) => { this.vm.password = v; }
          })
          AuthFieldDivider()
          this.captchaField()
        }
      }
      .width('100%')
      .borderRadius($r('app.float.radius_md'))
      .backgroundColor($r('app.color.bg_sunken'))
      .clip(true)

      PrimaryButton({
        text: $r('app.string.login_submit'),
        btnEnabled: this.vm.canSubmit,
        loading: this.vm.submitting,
        onTap: () => this.vm.submit()
      })
    }
    .width('100%')
  }

  /** 图形验证码：只有账号密码登录这条路要，点图换一张 */
  @Builder
  captchaField() {
    Row({ space: 8 }) {
      AuthInput({
        placeholder: $r('app.string.login_captcha_placeholder'),
        value: this.vm.captchaCode,
        maxLength: 4,
        onValueChange: (v: string) => { this.vm.captchaCode = v; }
      })
        .layoutWeight(1)

      if (this.vm.captchaImage.length > 0) {
        Image(this.vm.captchaImage)
          .width(CAPTCHA_WIDTH)
          .height(CAPTCHA_HEIGHT)
          .objectFit(ImageFit.Contain)
          .borderRadius($r('app.float.radius_sm'))
          .onClick(() => this.vm.refreshCaptcha())
      } else {
        Text($r('app.string.login_captcha_reload'))
          .fontSize($r('app.float.font_body_sm'))
          .fontColor($r('app.color.brand_primary'))
          .onClick(() => this.vm.refreshCaptcha())
      }
    }
    .width('100%')
    .padding({ right: $r('app.float.space_md') })
    .alignItems(VerticalAlign.Center)
  }

  /** 半屏登录里跳注册要先收起弹窗，否则注册页会被压在弹窗底下 */
  private goRegister(): void {
    AuthService.get().dismissSheetForNavigation();
    NavUtil.push(RouteNames.REGISTER);
  }

  @Builder
  registerEntry() {
    Row({ space: 4 }) {
      Text($r('app.string.login_no_account'))
        .fontSize($r('app.float.font_body_sm'))
        .fontColor($r('app.color.text_secondary'))
      Text($r('app.string.login_go_register'))
        .fontSize($r('app.float.font_body_sm'))
        .fontWeight(FontWeight.Medium)
        .fontColor($r('app.color.brand_primary'))
        .onClick(() => this.goRegister())
    }
    .width('100%')
    .justifyContent(FlexAlign.Center)
  }
}
