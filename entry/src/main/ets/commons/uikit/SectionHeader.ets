/** 区块标题 + 可选"更多"入口。首页各段落统一用它开头。 */
@ComponentV2
export struct SectionHeader {
  @Param title: ResourceStr = '';
  @Param actionText: ResourceStr = '';
  @Event onAction: () => void = () => {};

  build() {
    Row() {
      Text(this.title)
        .fontSize($r('app.float.font_title'))
        .fontWeight(FontWeight.Medium)
        .fontColor($r('app.color.text_primary'))
        .layoutWeight(1)

      if (this.actionText !== '') {
        Row({ space: 2 }) {
          Text(this.actionText)
            .fontSize($r('app.float.font_body_sm'))
            .fontColor($r('app.color.text_secondary'))
          Image($r('app.media.ic_arrow_right'))
            .width($r('app.float.icon_sm'))
            .height($r('app.float.icon_sm'))
            .fillColor($r('app.color.text_tertiary'))
        }
        .onClick(() => this.onAction())
      }
    }
    .width('100%')
    .alignItems(VerticalAlign.Center)
  }
}
