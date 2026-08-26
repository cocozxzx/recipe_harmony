import { LengthMetrics } from '@kit.ArkUI';
import { AuthService } from '../../../commons/auth/AuthService';
import { AiMessage } from '../../../commons/model/Ai';
import { AppNavState } from '../../../commons/router/NavUtil';
import { Strings } from '../../../commons/utils/Strings';
import { AiMessageItem } from '../components/AiMessageItem';
import { AiViewModel } from '../viewmodel/AiViewModel';

/**
 * AI 对话页。
 *
 * 之所以让 AI 独占一个 Tab：食谱 App 同质化严重，本产品真正的差异点是
 * "我冰箱里有这几样东西，能做什么菜"。藏在首页卡片或搜索框里用户发现不了。
 *
 * 需登录：未登录时展示引导，点击拉起半屏登录。
 */
@ComponentV2
export struct AiPage {
  @Local vm: AiViewModel = new AiViewModel();
  @Local auth: AuthService = AuthService.get();
  @Local nav: AppNavState = AppNavState.get();
  private scroller: Scroller = new Scroller();

  private readonly samples: ResourceStr[] = [
    $r('app.string.ai_sample_1'),
    $r('app.string.ai_sample_2'),
    $r('app.string.ai_sample_3')
  ];

  aboutToAppear(): void {
    this.consumePrefill();
  }

  aboutToDisappear(): void {
    this.vm.dispose();
  }

  /** 首页 AI 卡片 / 搜索空结果跳过来时会带一句预填文案，消费后立刻清空 */
  @Monitor('nav.aiPrefill')
  onPrefillChanged(): void {
    this.consumePrefill();
  }

  @Monitor('vm.messages')
  onMessagesChanged(): void {
    this.scroller.scrollEdge(Edge.Bottom);
  }

  private consumePrefill(): void {
    const text: string = this.nav.aiPrefill;
    if (text.length > 0) {
      this.vm.prefill(text);
      this.nav.aiPrefill = '';
    }
  }

  build() {
    Column() {
      Row() {
        Text($r('app.string.ai_title'))
          .fontSize($r('app.float.font_title'))
          .fontWeight(FontWeight.Medium)
          .fontColor($r('app.color.text_primary'))
      }
      .width('100%')
      .height($r('app.float.bar_height'))
      .padding({ left: $r('app.float.space_lg'), right: $r('app.float.space_lg') })
      .alignItems(VerticalAlign.Center)

      if (!this.auth.isLogin) {
        this.loginGuide()
      } else {
        this.chatView()
        this.inputBar()
      }
    }
    .width('100%')
    .height('100%')
    .backgroundColor($r('app.color.bg_page'))
    .expandSafeArea([SafeAreaType.SYSTEM], [SafeAreaEdge.TOP, SafeAreaEdge.BOTTOM])
  }

  @Builder
  loginGuide() {
    Column({ space: 16 }) {
      Image($r('app.media.ic_ai'))
        .width($r('app.float.icon_app'))
        .height($r('app.float.icon_app'))
        .fillColor($r('app.color.brand_primary'))
        .accessibilityText('AI助手')
        .objectFit(ImageFit.Contain)
      Text($r('app.string.ai_login_required'))
        .fontSize($r('app.float.font_body'))
        .fontColor($r('app.color.text_secondary'))
      Button($r('app.string.mine_login_register'))
        .type(ButtonType.Normal)
        .height($r('app.float.button_height'))
        .constraintSize({ minWidth: $r('app.float.login_btn_w') })
        .borderRadius($r('app.float.radius_md'))
        .backgroundColor($r('app.color.brand_primary'))
        .fontColor($r('app.color.text_on_brand'))
        .fontSize($r('app.float.font_title_sm'))
        .onClick(() => this.auth.requireLogin(() => {}))
    }
    .width('100%')
    .layoutWeight(1)
    .justifyContent(FlexAlign.Center)
  }

  @Builder
  chatView() {
    Scroll(this.scroller) {
      Column({ space: 16 }) {
        this.welcome()
        ForEach(this.vm.messages, (message: AiMessage) => {
          AiMessageItem({
            message: message,
            onRetry: () => this.vm.retryLast(),
            onToggleFavorite: () => this.vm.toggleGeneratedFavorite(message)
          })
        }, (message: AiMessage) => message.id)
      }
      .width('100%')
      .padding($r('app.float.space_lg'))
    }
    .scrollBar(BarState.Off)
    .edgeEffect(EdgeEffect.Spring)
    .layoutWeight(1)
    .align(Alignment.Top)
  }

  @Builder
  welcome() {
    if (this.vm.messages.length === 0) {
      Column({ space: 12 }) {
        Text($r('app.string.ai_welcome'))
          .fontSize($r('app.float.font_body'))
          .fontColor($r('app.color.text_primary'))
          .lineHeight(24)
          .padding($r('app.float.space_md'))
          .backgroundColor($r('app.color.bg_surface'))
          .borderRadius($r('app.float.radius_md'))
          .width('100%')

        Flex({ wrap: FlexWrap.Wrap, space: { main: LengthMetrics.vp(8), cross: LengthMetrics.vp(8) } }) {
          ForEach(this.samples, (sample: ResourceStr) => {
            Text(sample)
              .fontSize($r('app.float.font_body_sm'))
              .fontColor($r('app.color.brand_primary'))
              .padding({
                left: $r('app.float.space_md'),
                right: $r('app.float.space_md'),
                top: $r('app.float.space_sm'),
                bottom: $r('app.float.space_sm')
              })
              .backgroundColor($r('app.color.brand_primary_light'))
              .borderRadius($r('app.float.radius_sm'))
              .onClick(() => {
                 if (typeof sample === 'string') {
                   this.vm.send(sample);
                 } else {
                   this.vm.send(Strings.get(sample));
                 }
                })
          }, (sample: ResourceStr, index: number) => index.toString())
        }
        .width('100%')
      }
      .width('100%')
    }
  }

  @Builder
  inputBar() {
    Row({ space: 8 }) {
      TextInput({ text: this.vm.input, placeholder: $r('app.string.ai_input_placeholder') })
        .layoutWeight(1)
        .height($r('app.float.button_height'))
        .borderRadius($r('app.float.radius_md'))
        .backgroundColor($r('app.color.bg_sunken'))
        .padding({ left: $r('app.float.space_lg'), right: $r('app.float.space_lg') })
        .fontSize($r('app.float.font_body'))
        .fontColor($r('app.color.text_primary'))
        .placeholderColor($r('app.color.text_tertiary'))
        .enterKeyType(EnterKeyType.Send)
        .onChange((value: string) => { this.vm.input = value; })
        .onSubmit(() => this.vm.send(this.vm.input))

      Button(this.vm.streaming ? $r('app.string.ai_stop') : $r('app.string.ai_send'))
        .type(ButtonType.Normal)
        .height($r('app.float.button_height'))
        .constraintSize({ minWidth: $r('app.float.input_min_w') })
        .borderRadius($r('app.float.radius_md'))
        .backgroundColor(this.vm.streaming ? $r('app.color.bg_sunken') : $r('app.color.brand_primary'))
        .fontColor(this.vm.streaming ? $r('app.color.text_secondary') : $r('app.color.text_on_brand'))
        .fontSize($r('app.float.font_title_sm'))
        .enabled(this.vm.streaming || this.vm.canSend)
        .onClick(() => {
          if (this.vm.streaming) {
            this.vm.stop();
          } else {
            this.vm.send(this.vm.input);
          }
        })
    }
    .width('100%')
    .padding($r('app.float.space_lg'))
    .backgroundColor($r('app.color.bg_surface'))
  }
}
