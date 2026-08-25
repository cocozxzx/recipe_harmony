import { AuthService } from '../../../commons/auth/AuthService';
import { HuaweiLoginButton } from '../../../commons/auth/HuaweiLoginButton';
import { LoginForm } from '../../../commons/auth/LoginForm';
import { LoginViewModel } from '../../../commons/auth/LoginViewModel';
import { NavUtil } from '../../../commons/router/NavUtil';

@ComponentV2
export struct LoginPage {
  @Local auth: AuthService = AuthService.get();
  @Local vm: LoginViewModel = new LoginViewModel();

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
      this.titleBar()

      Scroll() {
        Column({ space: 24 }) {
          this.headerSection()

          HuaweiLoginButton({ vm: this.vm })

          LoginForm({ vm: this.vm })
        }
        .width('100%')
        .padding({ left: $r('app.float.space_xl'), right: $r('app.float.space_xl') })
      }
      .scrollBar(BarState.Off)
      .edgeEffect(EdgeEffect.Spring)
      .layoutWeight(1)
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
      Image($r('app.media.app_icon'))
        .width(72)
        .height(72)
        .borderRadius($r('app.float.radius_xl'))
        .backgroundColor($r('app.color.bg_surface'))
        .clip(true)

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
    .alignItems(HorizontalAlign.Center)
    .padding({ top: $r('app.float.space_xl'), bottom: $r('app.float.space_xl') })
  }
}
