import { common } from '@kit.AbilityKit';
import { AuthService } from './AuthService';
import { BusinessError } from '@kit.BasicServicesKit';
import { DOC_AGREEMENT, DOC_PRIVACY, RouteNames, WebDocParam } from '../router/RouteNames';
import { NavUtil } from '../router/NavUtil';
import { Strings } from '../utils/Strings';
import { Logger } from '../utils/Logger';

const TAG: string = 'AuthWidgets';

/** 《华为账号用户认证协议》。华为登录规范要求必须展示且可查看详情。 */
const HUAWEI_AGREEMENT_URL: string =
  'https://privacy.consumer.huawei.com/legal/id/authentication-terms.htm?code=CN&language=zh-CN';

/**
 * 登录页与注册页共用的表单零件。
 *
 * 两个页面的输入框、验证码倒计时、协议区长得一模一样，
 * 抽出来一份，改样式时不用两边同步。
 */

/** 表单卡片里的一行输入。背景透明，由外层的卡片统一给底色和圆角。 */
@ComponentV2
export struct AuthInput {
  @Param placeholder: ResourceStr = '';
  @Param value: string = '';
  @Param inputType: InputType = InputType.Normal;
  @Param maxLength: number = 64;
  @Event onValueChange: (v: string) => void = () => {};

  build() {
    TextInput({ text: this.value, placeholder: this.placeholder })
      .type(this.inputType)
      .maxLength(this.maxLength)
      .width('100%')
      .height($r('app.float.button_height'))
      .borderRadius(0)
      .backgroundColor($r('app.color.transparent'))
      .padding({ left: $r('app.float.space_lg'), right: $r('app.float.space_lg') })
      .fontSize($r('app.float.font_body'))
      .fontColor($r('app.color.text_primary'))
      .placeholderColor($r('app.color.text_tertiary'))
      .onChange((v: string) => this.onValueChange(v))
  }
}

/** 短信验证码行：输入框 + 倒计时按钮 */
@ComponentV2
export struct AuthCodeField {
  @Param value: string = '';
  @Param countdown: number = 0;
  @Event onValueChange: (v: string) => void = () => {};
  @Event onSend: () => void = () => {};

  build() {
    Row() {
      AuthInput({
        placeholder: $r('app.string.login_code_placeholder'),
        value: this.value,
        inputType: InputType.Number,
        maxLength: 6,
        onValueChange: (v: string) => this.onValueChange(v)
      })
        .layoutWeight(1)

      Text(this.countdown > 0 ? `${this.countdown}s` : $r('app.string.login_send_code'))
        .fontSize($r('app.float.font_body_sm'))
        .fontWeight(FontWeight.Medium)
        .fontColor(this.countdown > 0 ? $r('app.color.text_tertiary') : $r('app.color.brand_primary'))
        .padding({ left: $r('app.float.space_lg'), right: $r('app.float.space_lg') })
        .onClick(() => {
          if (this.countdown === 0) {
            this.onSend();
          }
        })
    }
    .width('100%')
    .alignItems(VerticalAlign.Center)
  }
}

/** 表单卡片里，输入行之间的分隔线 */
@ComponentV2
export struct AuthFieldDivider {
  build() {
    Divider()
      .color($r('app.color.divider'))
      .strokeWidth(1)
      .margin({ left: $r('app.float.space_lg'), right: $r('app.float.space_lg') })
  }
}

/**
 * 协议勾选区。
 *
 * 三份协议缺一不可：《华为账号用户认证协议》是华为登录规范的必选项，
 * 另外两份是应用市场对 C 端应用的硬性要求。
 */
@ComponentV2
export struct AgreementRow {
  @Param agreed: boolean = false;
  @Event onAgreedChange: (checked: boolean) => void = () => {};

  build() {
    Row({ space: 8 }) {
      Checkbox()
        .select(this.agreed)
        .selectedColor($r('app.color.brand_primary'))
        .width($r('app.float.icon_md'))
        .height($r('app.float.icon_md'))
        .onChange((checked: boolean) => this.onAgreedChange(checked))

      Text() {
        Span($r('app.string.login_agreement_prefix'))
        Span($r('app.string.login_agreement_user'))
          .fontColor($r('app.color.brand_primary'))
          .onClick(() => this.openDoc(DOC_AGREEMENT, $r('app.string.mine_agreement')))
        Span($r('app.string.login_agreement_sep'))
        Span($r('app.string.login_agreement_privacy'))
          .fontColor($r('app.color.brand_primary'))
          .onClick(() => this.openDoc(DOC_PRIVACY, $r('app.string.mine_privacy')))
        Span($r('app.string.login_agreement_and'))
        Span($r('app.string.login_agreement_huawei'))
          .fontColor($r('app.color.brand_primary'))
          .onClick(() => this.openHuaweiAgreement())
      }
      .fontSize($r('app.float.font_caption'))
      .fontColor($r('app.color.text_secondary'))
      .lineHeight(18)
      .layoutWeight(1)
    }
    .width('100%')
    .alignItems(VerticalAlign.Top)
  }

  private openDoc(docKey: string, title: Resource): void {
    // 半屏登录里跳页要先收起弹窗，否则新页面会被压在弹窗底下
    AuthService.get().dismissSheetForNavigation();
    const param: WebDocParam = { title: Strings.get(title), docKey: docKey };
    NavUtil.push(RouteNames.WEB_DOC, param);
  }

  /** 华为的协议只有线上版本，随包内置会过期，因此交给系统浏览器 */
  private openHuaweiAgreement(): void {
    const context: common.UIAbilityContext = getContext(this) as common.UIAbilityContext;
    context.openLink(HUAWEI_AGREEMENT_URL, { appLinkingOnly: false })
      .catch((e: BusinessError) => Logger.e(TAG, 'open huawei agreement failed', e));
  }
}
