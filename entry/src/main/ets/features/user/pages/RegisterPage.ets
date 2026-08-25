import { AgreementRow, AuthCodeField, AuthFieldDivider, AuthInput } from '../../../commons/auth/AuthWidgets';
import { AuthService } from '../../../commons/auth/AuthService';
import { RegisterViewModel } from '../../../commons/auth/RegisterViewModel';
import { NavUtil } from '../../../commons/router/NavUtil';
import { PrimaryButton } from '../../../commons/uikit/Buttons';
import { TopBar } from '../../../commons/uikit/TopBar';

/**
 * 手机号注册页。
 *
 * 手机号是唯一必填的身份信息：注册完这个号既是密码登录的账号，
 * 也是短信验证码登录的凭证，用户不用再单独绑一次。
 * 注册成功后端直接下发登录态，所以这里和登录页一样监听 isLogin 退回上一页。
 */
@ComponentV2
export struct RegisterPage {
  @Local vm: RegisterViewModel = new RegisterViewModel();
  @Local auth: AuthService = AuthService.get();

  aboutToDisappear(): void {
    this.vm.dispose();
  }

  @Monitor('auth.isLogin')
  onLoginStateChanged(): void {
    if (this.auth.isLogin) {
      NavUtil.pop();
    }
  }

  build() {
    Column() {
      TopBar({ title: '' })

      Scroll() {
        Column({ space: 24 }) {
          this.header()
          this.formSection()
          AgreementRow({
            agreed: this.vm.agreed,
            onAgreedChange: (checked: boolean) => { this.vm.agreed = checked; }
          })
          this.loginEntry()
        }
        .width('100%')
        .alignItems(HorizontalAlign.Start)
        .padding({
          left: $r('app.float.space_lg'),
          right: $r('app.float.space_lg'),
          bottom: $r('app.float.space_xxl')
        })
      }
      .scrollBar(BarState.Off)
      .align(Alignment.Top)
      .layoutWeight(1)
    }
    .width('100%')
    .height('100%')
    .backgroundColor($r('app.color.bg_page'))
  }

  @Builder
  header() {
    Column({ space: 8 }) {
      Text($r('app.string.register_title'))
        .fontSize($r('app.float.font_display'))
        .fontWeight(FontWeight.Bold)
        .fontColor($r('app.color.text_primary'))
        .width('100%')
      Text($r('app.string.register_subtitle'))
        .fontSize($r('app.float.font_body_sm'))
        .fontColor($r('app.color.text_secondary'))
        .width('100%')
    }
    .width('100%')
    .padding({ top: $r('app.float.space_xl') })
  }

  @Builder
  formSection() {
    Column({ space: 16 }) {
      Column() {
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
        AuthFieldDivider()
        AuthInput({
          placeholder: $r('app.string.register_password_placeholder'),
          value: this.vm.password,
          inputType: InputType.Password,
          maxLength: 20,
          onValueChange: (v: string) => { this.vm.password = v; }
        })
        AuthFieldDivider()
        AuthInput({
          placeholder: $r('app.string.register_confirm_placeholder'),
          value: this.vm.confirmPassword,
          inputType: InputType.Password,
          maxLength: 20,
          onValueChange: (v: string) => { this.vm.confirmPassword = v; }
        })
        AuthFieldDivider()
        AuthInput({
          placeholder: $r('app.string.register_nickname_placeholder'),
          value: this.vm.nickname,
          maxLength: 20,
          onValueChange: (v: string) => { this.vm.nickname = v; }
        })
      }
      .width('100%')
      .borderRadius($r('app.float.radius_md'))
      .backgroundColor($r('app.color.bg_sunken'))
      .clip(true)

      PrimaryButton({
        text: $r('app.string.register_submit'),
        btnEnabled: this.vm.canSubmit,
        loading: this.vm.submitting,
        onTap: () => this.vm.submit()
      })
    }
    .width('100%')
  }

  @Builder
  loginEntry() {
    Row({ space: 4 }) {
      Text($r('app.string.register_has_account'))
        .fontSize($r('app.float.font_body_sm'))
        .fontColor($r('app.color.text_secondary'))
      Text($r('app.string.register_go_login'))
        .fontSize($r('app.float.font_body_sm'))
        .fontWeight(FontWeight.Medium)
        .fontColor($r('app.color.brand_primary'))
        .onClick(() => NavUtil.pop())
    }
    .width('100%')
    .justifyContent(FlexAlign.Center)
  }
}
