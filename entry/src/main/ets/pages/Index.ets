import { AuthService } from '../commons/auth/AuthService';
import { LoginSheet } from '../commons/auth/LoginSheet';
import { AppNavState, AppTab, NavUtil } from '../commons/router/NavUtil';
import { ConfirmDialog } from '../commons/uikit/ConfirmDialog';
import { Motion } from '../commons/uikit/Theme';
import { AiPage } from '../features/ai/pages/AiPage';
import { CategoryPage } from '../features/category/pages/CategoryPage';
import { HomePage } from '../features/home/pages/HomePage';
import { MinePage } from '../features/user/pages/MinePage';
import { routeMap } from '../router/RouteMap';

/**
 * 应用根容器：Navigation 作为路由堆栈根，内含底部四个 Tab。
 *
 * - `NavigationMode.Auto`：窗口宽度 ≥ 600vp 时自动变为"左列表 + 右详情"分栏。
 *   现在写好，以后上平板/折叠屏不用改架构（第一期 deviceTypes 仍只声明 phone）。
 * - 半屏登录挂在这里，由 AuthService.sheetVisible 驱动，全应用共用一处。
 * - AI 单独占一个 Tab：本产品的差异点是"冰箱里有这几样，能做什么菜"，
 *   藏在首页卡片或搜索框里用户发现不了，等于白做。
 */
@Entry
@ComponentV2
struct Index {
  @Local stack: NavPathStack = new NavPathStack();
  @Local nav: AppNavState = AppNavState.get();
  @Local auth: AuthService = AuthService.get();
  private tabsController: TabsController = new TabsController();

  aboutToAppear(): void {
    NavUtil.bind(this.stack);
    ConfirmDialog.init(this.getUIContext());
  }

  /** 其他页面通过 NavUtil.switchTab 改状态，这里负责真正切 Tab */
  @Monitor('nav.tabIndex')
  onTabIndexChanged(): void {
    this.tabsController.changeIndex(this.nav.tabIndex);
  }

  build() {
    Navigation(this.stack) {
      Tabs({ barPosition: BarPosition.End, controller: this.tabsController }) {
        TabContent() {
          HomePage()
        }
        .tabBar(this.tabBar(AppTab.HOME, $r('app.string.tab_home'),
          $r('app.media.tab_home'), $r('app.media.tab_home_fill')))

        TabContent() {
          CategoryPage()
        }
        .tabBar(this.tabBar(AppTab.CATEGORY, $r('app.string.tab_category'),
          $r('app.media.tab_category'), $r('app.media.tab_category_fill')))

        TabContent() {
          AiPage()
        }
        .tabBar(this.tabBar(AppTab.AI, $r('app.string.tab_ai'),
          $r('app.media.tab_ai'), $r('app.media.tab_ai_fill')))

        TabContent() {
          MinePage()
        }
        .tabBar(this.tabBar(AppTab.MINE, $r('app.string.tab_mine'),
          $r('app.media.tab_mine'), $r('app.media.tab_mine_fill')))
      }
      .barMode(BarMode.Fixed)
      .scrollable(false)
      .animationDuration(Motion.duration)
      .barBackgroundColor($r('app.color.bg_surface'))
      .divider({ strokeWidth: 1, color: $r('app.color.divider') })
      .width('100%')
      .height('100%')
      .onChange((index: number) => {
        this.nav.tabIndex = index;
        // AI 需登录：切到该 Tab 时直接半屏拉起登录，不让用户先看到一个空页面再去找入口
        if (index === AppTab.AI && !this.auth.isLogin) {
          this.auth.requireLogin(() => {});
        }
      })
    }
    .mode(NavigationMode.Auto)
    .hideTitleBar(true)
    .navDestination(routeMap)
    .backgroundColor($r('app.color.bg_page'))
    // 半屏登录：触发受限动作时弹出，登录成功后自动继续原动作
    .bindSheet($$this.auth.sheetVisible, this.loginSheet(), {
      detents: [SheetSize.MEDIUM, SheetSize.LARGE],
      showClose: false,
      dragBar: true,
      backgroundColor: $r('app.color.bg_surface'),
      onDisappear: () => {
        // 下滑关闭也要走取消流程，否则 pending action 会残留到下次登录
        if (!this.auth.isLogin) {
          this.auth.onLoginCancelled();
        }
      }
    })
  }

  @Builder
  tabBar(index: AppTab, label: ResourceStr, icon: Resource, iconSelected: Resource) {
    Column({ space: 4 }) {
      Image(this.nav.tabIndex === index ? iconSelected : icon)
        .width($r('app.float.icon_lg'))
        .height($r('app.float.icon_lg'))
        .fillColor(this.nav.tabIndex === index ? $r('app.color.brand_primary') : $r('app.color.text_tertiary'))
        .objectFit(ImageFit.Contain)
      Text(label)
        .fontSize($r('app.float.font_caption'))
        .fontColor(this.nav.tabIndex === index ? $r('app.color.brand_primary') : $r('app.color.text_tertiary'))
    }
    .width('100%')
    .height('100%')
    .justifyContent(FlexAlign.Center)
  }

  @Builder
  loginSheet() {
    LoginSheet()
  }
}
