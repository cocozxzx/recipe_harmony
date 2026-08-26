import { AuthService } from './AuthService';
import { LoginForm } from './LoginForm';
import { LoginViewModel } from './LoginViewModel';

/** 半屏里的品牌标志比全屏小一号，避免挤压操作区 */
const BRAND_ICON_SIZE: number = 40;

/**
 * 半屏登录内容。由 Index.ets 通过 bindSheet 挂载，
 * 显隐受 AuthService.sheetVisible 驱动。
 *
 * 为什么不做启动强制登录：强制登录会大幅降低留存，
 * 且"未提供必要功能前强制登录"本身就是应用市场审核的敏感项，
 * 也与华为账号登录规范"用户应当有拒绝登录的权利"冲突——右上角关闭必须一直可用。
 */
@ComponentV2
export struct LoginSheet {
  @Local vm: LoginViewModel = new LoginViewModel();

  aboutToDisappear(): void {
    this.vm.dispose();
  }

  build() {
    Column({ space: 24 }) {
      Row({ space: 12 }) {
        Image($r('app.media.app_icon'))
          .width(BRAND_ICON_SIZE)
          .height(BRAND_ICON_SIZE)
          .borderRadius($r('app.float.radius_md'))
          .backgroundColor($r('app.color.bg_sunken'))
          .clip(true)

        Column({ space: 4 }) {
          Text($r('app.string.login_title'))
            .fontSize($r('app.float.font_title_lg'))
            .fontWeight(FontWeight.Bold)
            .fontColor($r('app.color.text_primary'))
          Text($r('app.string.login_subtitle'))
            .fontSize($r('app.float.font_body_sm'))
            .fontColor($r('app.color.text_secondary'))
        }
        .alignItems(HorizontalAlign.Start)
        .layoutWeight(1)

        Image($r('app.media.ic_close'))
          .width($r('app.float.icon_lg'))
          .height($r('app.float.icon_lg'))
          .fillColor($r('app.color.text_tertiary'))
          .objectFit(ImageFit.Contain)
          .onClick(() => AuthService.get().onLoginCancelled())
      }
      .width('100%')
      .alignItems(VerticalAlign.Top)

      LoginForm({ vm: this.vm })
    }
    .width('100%')
    .padding($r('app.float.space_lg'))
    .backgroundColor($r('app.color.bg_surface'))
  }
}
