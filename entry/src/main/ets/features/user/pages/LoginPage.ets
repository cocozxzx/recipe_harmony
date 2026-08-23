import { AuthService } from '../../../commons/auth/AuthService';
import { LoginForm } from '../../../commons/auth/LoginForm';
import { LoginViewModel } from '../../../commons/auth/LoginViewModel';
import { NavUtil } from '../../../commons/router/NavUtil';
import { TopBar } from '../../../commons/uikit/TopBar';

/**
 * 全屏登录页，从"我的"进入。
 * 与半屏 LoginSheet 共用 LoginForm 与 LoginViewModel，只是外壳不同。
 */
@ComponentV2
export struct LoginPage {
  @Local vm: LoginViewModel = new LoginViewModel();
  @Local auth: AuthService = AuthService.get();

  aboutToDisappear(): void {
    this.vm.dispose();
  }

  /** 登录成功后自动退回上一页 */
  @Monitor('auth.isLogin')
  onLoginStateChanged(): void {
    if (this.auth.isLogin) {
      NavUtil.pop();
    }
  }

  build() {
    Column() {
      TopBar({ title: '' })

      Column({ space: 24 }) {
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

        LoginForm({ vm: this.vm })
      }
      .width('100%')
      .padding($r('app.float.space_lg'))
    }
    .width('100%')
    .height('100%')
    .backgroundColor($r('app.color.bg_page'))
  }
}
