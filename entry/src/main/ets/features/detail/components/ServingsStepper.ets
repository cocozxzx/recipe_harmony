/**
 * 份数切换器： - [2份] +
 * 加减时食材用量实时联动换算，不可换算的食材保持不变。
 */
@ComponentV2
export struct ServingsStepper {
  @Param servings: number = 1;
  @Param canDecrease: boolean = true;
  @Param canIncrease: boolean = true;
  @Event onDecrease: () => void = () => {};
  @Event onIncrease: () => void = () => {};

  build() {
    Row() {
      Text($r('app.string.detail_servings'))
        .fontSize($r('app.float.font_body'))
        .fontColor($r('app.color.text_primary'))
        .layoutWeight(1)

      Row({ space: 12 }) {
        this.stepButton($r('app.media.ic_minus'), this.canDecrease, () => this.onDecrease(), '减少份数')

        Text() {
          Span(this.servings.toString())
          Span($r('app.string.common_servings_unit'))
        }
        .fontSize($r('app.float.font_body'))
        .fontWeight(FontWeight.Medium)
        .fontColor($r('app.color.text_primary'))
        .constraintSize({ minWidth: 44 })
        .textAlign(TextAlign.Center)

        this.stepButton($r('app.media.ic_plus'), this.canIncrease, () => this.onIncrease(), '增加份数')
      }
      .alignItems(VerticalAlign.Center)
    }
    .width('100%')
    .padding($r('app.float.space_md'))
    .backgroundColor($r('app.color.bg_surface'))
    .borderRadius($r('app.float.radius_md'))
    .clip(true)
  }

  @Builder
  stepButton(icon: Resource, enabled: boolean, action: () => void, accessibilityLabel: string) {
    Image(icon)
      .width($r('app.float.icon_md'))
      .height($r('app.float.icon_md'))
      .fillColor(enabled ? $r('app.color.brand_primary') : $r('app.color.text_disabled'))
      .padding(6)
      .borderRadius($r('app.float.radius_sm'))
      .backgroundColor($r('app.color.bg_sunken'))
      .accessibilityText(accessibilityLabel)
      .enabled(enabled)
      .onClick(() => action())
  }
}
