/** 标签 Chip。高度 28vp，选中态背景 brand_primary_light、文字 brand_primary。 */
@ComponentV2
export struct TagChip {
  @Param text: string = '';
  @Param selected: boolean = false;
  @Event onTap: () => void = () => {};

  build() {
    Text(this.text)
      .fontSize($r('app.float.font_body_sm'))
      .fontColor(this.selected ? $r('app.color.brand_primary') : $r('app.color.text_secondary'))
      .fontWeight(this.selected ? FontWeight.Medium : FontWeight.Normal)
      .height($r('app.float.chip_height'))
      .padding({ left: $r('app.float.space_md'), right: $r('app.float.space_md') })
      .borderRadius($r('app.float.radius_sm'))
      .backgroundColor(this.selected ? $r('app.color.brand_primary_light') : $r('app.color.bg_sunken'))
      .textAlign(TextAlign.Center)
      .maxLines(1)
      .onClick(() => this.onTap())
  }
}

/** 小号只读标签，用于详情页菜名下方、卡片上的"可选"标记 */
@ComponentV2
export struct MiniTag {
  @Param text: ResourceStr = '';
  @Param bgColor: ResourceColor = $r('app.color.bg_sunken');
  @Param textColor: ResourceColor = $r('app.color.text_tertiary');

  build() {
    Text(this.text)
      .fontSize($r('app.float.font_caption'))
      .fontColor(this.textColor)
      .padding({ left: 6, right: 6, top: 2, bottom: 2 })
      .borderRadius($r('app.float.radius_sm'))
      .backgroundColor(this.bgColor)
  }
}
