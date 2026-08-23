/**
 * 首页 AI 引导卡。
 *
 * 产品上 AI 是本 App 的差异点（"冰箱里有这几样东西，能做什么菜"），
 * 所以除了独占一个 Tab，首页还要给它一张显眼卡片——藏起来等于白做。
 */
@ComponentV2
export struct AiEntryCard {
  @Event onTap: () => void = () => {};

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
        .width(40)
        .height(40)
        .fillColor($r('app.color.brand_primary'))
    }
    .width('100%')
    .padding($r('app.float.space_lg'))
    .backgroundColor($r('app.color.brand_primary_light'))
    .borderRadius($r('app.float.radius_lg'))
    .onClick(() => this.onTap())
  }
}
