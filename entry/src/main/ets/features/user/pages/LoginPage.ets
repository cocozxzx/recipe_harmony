import { AuthService } from '../../../commons/auth/AuthService';
import { LoginForm } from '../../../commons/auth/LoginForm';
import { LoginViewModel } from '../../../commons/auth/LoginViewModel';
import { NavUtil } from '../../../commons/router/NavUtil';
import { TopBar } from '../../../commons/uikit/TopBar';

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
    }
    .width('100%')
    .height('100%')
    .backgroundColor($r('app.color.bg_page'))
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
