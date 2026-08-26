import { curves } from '@kit.ArkUI';

@ComponentV2
export struct AiEntryCard {
  @Event onTap: () => void = () => {};
  @Local pressScale: number = 1.0;

  build() {
    Row({ space: 12 }) {
      Column({ space: 4 }) {
        Text($r('app.string.home_ai_card_title'))
          .fontSize($r('app.float.font_title_sm'))
          .fontWeight(FontWeight.Medium)
          .fontColor($r('app.color.text_primary'))
        Text($r('app.string.home_ai_card_desc'))
          .fontSize($r('app.float.font_body_sm'))
          .fontColor($r('app.color.text_secondary'))
      }
      .alignItems(HorizontalAlign.Start)
      .layoutWeight(1)

      Image($r('app.media.ic_ai'))
        .width($r('app.float.icon_xl'))
        .height($r('app.float.icon_xl'))
        .fillColor($r('app.color.brand_primary'))
        .objectFit(ImageFit.Contain)
    }
    .width('100%')
    .padding($r('app.float.space_lg'))
    .backgroundColor($r('app.color.brand_primary_light'))
    .borderRadius($r('app.float.radius_lg'))
    .clip(true)
    .accessibilityText('AI智能推荐')
    .scale({ x: this.pressScale, y: this.pressScale })
    .animation({ curve: curves.responsiveSpringMotion(0.55, 0.825) })
    .onTouch((event?: TouchEvent) => {
      if (event) {
        if (event.type === TouchType.Down) {
          this.pressScale = 0.97;
        } else if (event.type === TouchType.Up || event.type === TouchType.Cancel) {
          this.pressScale = 1.0;
        }
      }
    })
    .onClick(() => this.onTap())
  }
}
