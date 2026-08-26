/**
 * "20 分钟" 这类耗时标签。
 * 单位来自 string.json，数字与单位拼接放在组件里，避免各页面硬编码"分钟"。
 */
@ComponentV2
export struct CookTimeLabel {
  @Param minutes: number = 0;
  @Param withIcon: boolean = false;
  @Param fontSize: Length = $r('app.float.font_caption');
  @Param fontColor: ResourceColor = $r('app.color.text_tertiary');

  build() {
    Row({ space: 4 }) {
      if (this.withIcon) {
        Image($r('app.media.ic_clock'))
          .width($r('app.float.icon_sm'))
          .height($r('app.float.icon_sm'))
          .fillColor(this.fontColor)
          .objectFit(ImageFit.Contain)
      }
      Text() {
        Span(this.minutes.toString())
        Span($r('app.string.common_minutes'))
      }
      .fontSize(this.fontSize)
      .fontColor(this.fontColor)
    }
  }
}
