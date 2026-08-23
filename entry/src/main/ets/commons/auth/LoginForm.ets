import { common } from '@kit.AbilityKit';
import { LoginMode } from '../model/User';
import { DOC_AGREEMENT, DOC_PRIVACY, RouteNames, WebDocParam } from '../router/RouteNames';
import { NavUtil } from '../router/NavUtil';
import { PrimaryButton, TextButton } from '../uikit/Buttons';
import { Strings } from '../utils/Strings';
import { LoginViewModel } from './LoginViewModel';

/**
 * 登录表单主体。半屏 LoginSheet 与全屏 LoginPage 共用。
 *
 * 顺序刻意如此：华为账号一键登录在最上方且是主按钮（鸿蒙上的标配体验，
 * 也是应用市场加分项），其余方式收在"其他方式登录"分割线之下。
 */
@ComponentV2
export struct LoginForm {
  @Param vm: LoginViewModel = new LoginViewModel();
  @Event onClose: () => void = () => {};

  build() {
    Column({ space: 16 }) {
      this.huaweiSection()
      this.divider()
      this.formSection()
      this.switchSection()
      this.agreementSection()
    }
    .width('100%')
    .alignItems(HorizontalAlign.Start)
  }

  @Builder
  huaweiSection() {
    PrimaryButton({
      text: $r('app.string.login_huawei'),
      loading: this.vm.submitting,
      onTap: () => {
        const context: common.UIAbilityContext = getContext(this) as common.UIAbilityContext;
        this.vm.loginByHuawei(context);
      }
    })
  }

  @Builder
  divider() {
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

  @Builder
  formSection() {
    Column({ space: 12 }) {
      if (this.vm.mode === LoginMode.SMS) {
        this.inputField($r('app.string.login_phone_placeholder'), this.vm.phone, InputType.PhoneNumber,
          (v: string) => { this.vm.phone = v; })
        this.codeField()
      } else if (this.vm.mode === LoginMode.EMAIL) {
        this.inputField($r('app.string.login_email_placeholder'), this.vm.email, InputType.Email,
          (v: string) => { this.vm.email = v; })
        this.codeField()
      } else {
        this.inputField($r('app.string.login_account_placeholder'), this.vm.account, InputType.Normal,
          (v: string) => { this.vm.account = v; })
        this.inputField($r('app.string.login_password_placeholder'), this.vm.password, InputType.Password,
          (v: string) => { this.vm.password = v; })
      }

      PrimaryButton({
        text: $r('app.string.login_submit'),
        enabled: this.vm.canSubmit,
        loading: this.vm.submitting,
        onTap: () => this.vm.submit()
      })
    }
    .width('100%')
  }

  @Builder
  inputField(placeholder: ResourceStr, value: string, type: InputType, onChange: (v: string) => void) {
    TextInput({ text: value, placeholder: placeholder })
      .type(type)
      .width('100%')
      .height($r('app.float.button_height'))
      .borderRadius($r('app.float.radius_md'))
      .backgroundColor($r('app.color.bg_sunken'))
      .padding({ left: $r('app.float.space_lg'), right: $r('app.float.space_lg') })
      .fontSize($r('app.float.font_body'))
      .fontColor($r('app.color.text_primary'))
      .placeholderColor($r('app.color.text_tertiary'))
      .onChange((v: string) => onChange(v))
  }

  @Builder
  codeField() {
    Row({ space: 8 }) {
      TextInput({ text: this.vm.code, placeholder: $r('app.string.login_code_placeholder') })
        .type(InputType.Number)
        .layoutWeight(1)
        .height($r('app.float.button_height'))
        .borderRadius($r('app.float.radius_md'))
        .backgroundColor($r('app.color.bg_sunken'))
        .padding({ left: $r('app.float.space_lg'), right: $r('app.float.space_lg') })
        .fontSize($r('app.float.font_body'))
        .fontColor($r('app.color.text_primary'))
        .placeholderColor($r('app.color.text_tertiary'))
        .onChange((v: string) => { this.vm.code = v; })

      Button(this.countdownText())
        .type(ButtonType.Normal)
        .height($r('app.float.button_height'))
        .constraintSize({ minWidth: 108 })
        .borderRadius($r('app.float.radius_md'))
        .backgroundColor($r('app.color.brand_primary_light'))
        .fontColor(this.vm.codeCountdown > 0 ? $r('app.color.text_tertiary') : $r('app.color.brand_primary'))
        .fontSize($r('app.float.font_body_sm'))
        .enabled(this.vm.codeCountdown === 0)
        .onClick(() => this.vm.sendCode())
    }
    .width('100%')
  }

  @Builder
  switchSection() {
    Row({ space: 16 }) {
      if (this.vm.mode !== LoginMode.SMS) {
        TextButton({
          text: $r('app.string.login_switch_sms'),
          size: $r('app.float.font_body_sm'),
          onTap: () => this.vm.switchMode(LoginMode.SMS)
        })
      }
      if (this.vm.mode !== LoginMode.PASSWORD) {
        TextButton({
          text: $r('app.string.login_switch_password'),
          size: $r('app.float.font_body_sm'),
          onTap: () => this.vm.switchMode(LoginMode.PASSWORD)
        })
      }
      if (this.vm.mode !== LoginMode.EMAIL) {
        TextButton({
          text: $r('app.string.login_switch_email'),
          size: $r('app.float.font_body_sm'),
          onTap: () => this.vm.switchMode(LoginMode.EMAIL)
        })
      }
    }
    .width('100%')
    .justifyContent(FlexAlign.Center)
  }

  @Builder
  agreementSection() {
    Row({ space: 8 }) {
      Checkbox()
        .select(this.vm.agreed)
        .selectedColor($r('app.color.brand_primary'))
        .width($r('app.float.icon_md'))
        .height($r('app.float.icon_md'))
        .onChange((checked: boolean) => { this.vm.agreed = checked; })

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

  private countdownText(): ResourceStr {
    if (this.vm.codeCountdown === 0) {
      return $r('app.string.login_send_code');
    }
    return `${this.vm.codeCountdown}s`;
  }

  private openDoc(docKey: string, title: Resource): void {
    const param: WebDocParam = { title: Strings.get(title), docKey: docKey };
    NavUtil.push(RouteNames.WEB_DOC, param);
  }
}
