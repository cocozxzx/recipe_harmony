import { LoginWithHuaweiIDButton, loginComponentManager } from '@kit.AccountKit';
import { BusinessError } from '@kit.BasicServicesKit';
import { LoginViewModel } from './LoginViewModel';

/**
 * 按钮高度。UX 规范允许 28vp ~ 60vp，这里取与 app.float.button_height 一致的 48vp，
 * 让它和下方"登录"按钮在同一条视觉基线上。
 */
const BUTTON_HEIGHT: number = 48;

/**
 * 圆角。规范默认全圆角，但同时允许"当页面有多个登录按钮时调整圆角以保证界面一致性"。
 * 本页另有一个 12vp 圆角的主按钮，故统一取 12。
 */
const BUTTON_RADIUS: number = 12;

/**
 * 华为账号登录按钮（Account Kit 官方组件）。
 *
 * 规范要求这颗按钮必须由 Account Kit 提供、不可自绘：文案、内边距、深浅色、
 * loading 态都由组件内部保证，应用只能改高度/圆角/字重/位置。
 * 因此这里不再手动调 authentication 接口换 authCode，authCode 由按钮回调直接给出。
 */
@ComponentV2
export struct HuaweiLoginButton {
  @Param vm: LoginViewModel = new LoginViewModel();

  /**
   * 协议未勾选时置为 NOT_ACCEPTED，此时点击按钮不会拉起授权，
   * 而是回调 1005300001，由 vm 统一提示"请先同意协议"。
   */
  private controller: loginComponentManager.LoginWithHuaweiIDButtonController =
    new loginComponentManager.LoginWithHuaweiIDButtonController()
      .setAgreementStatus(loginComponentManager.AgreementStatus.NOT_ACCEPTED)
      .onClickLoginWithHuaweiIDButton(
        (error: BusinessError, response: loginComponentManager.HuaweiIDCredential) => {
          if (error) {
            this.vm.onHuaweiError(error);
            return;
          }
          this.vm.onHuaweiCredential(response.authorizationCode);
        });

  @Monitor('vm.agreed')
  onAgreedChanged(): void {
    this.controller.setAgreementStatus(this.vm.agreed
      ? loginComponentManager.AgreementStatus.ACCEPTED
      : loginComponentManager.AgreementStatus.NOT_ACCEPTED);
  }

  build() {
    // 官方示例即是「外层容器定高、组件自身填满」的用法，不要直接给组件加尺寸属性
    Column() {
      LoginWithHuaweiIDButton({
        params: {
          style: loginComponentManager.Style.BUTTON_RED,
          extraStyle: {
            buttonStyle: new loginComponentManager.ButtonStyle().loadingStyle({
              show: this.vm.submitting
            })
          },
          borderRadius: BUTTON_RADIUS,
          // ID：应用有自己的登录页，用「华为账号登录」按钮换 Authorization Code
          loginType: loginComponentManager.LoginType.ID,
          supportDarkMode: true
        },
        controller: this.controller
      })
    }
    .width('100%')
    .height(BUTTON_HEIGHT)
  }
}
