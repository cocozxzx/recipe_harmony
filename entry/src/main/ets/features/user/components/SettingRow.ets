/** "我的"里的设置项行：标题 + 可选右侧说明 + 箭头 */
@ComponentV2
export struct SettingRow {
  @Param title: ResourceStr = '';
  @Param value: string = '';
  @Param showArrow: boolean = true;
  @Param showDivider: boolean = true;
  @Param danger: boolean = false;
  @Event onTap: () => void = () => {};

  build() {
    Column() {
      Row({ space: 8 }) {
        Text(this.title)
          .fontSize($r('app.float.font_body'))
          .fontColor(this.danger ? $r('app.color.state_error') : $r('app.color.text_primary'))
          .layoutWeight(1)

        if (this.value.length > 0) {
          Text(this.value)
            .fontSize($r('app.float.font_body_sm'))
            .fontColor($r('app.color.text_tertiary'))
        }

        if (this.showArrow) {
          Image($r('app.media.ic_arrow_right'))
            .width($r('app.float.icon_sm'))
            .height($r('app.float.icon_sm'))
            .fillColor($r('app.color.text_tertiary'))
        }
      }
      .width('100%')
      .height(52)
      .alignItems(VerticalAlign.Center)

      if (this.showDivider) {
        Divider().color($r('app.color.divider')).strokeWidth(1)
      }
    }
    .width('100%')
    .padding({ left: $r('app.float.space_lg'), right: $r('app.float.space_lg') })
    .onClick(() => this.onTap())
  }
}

/** 分组容器：白底圆角卡片 */
@ComponentV2
export struct SettingGroup {
  @Param title: ResourceStr = '';
  @BuilderParam content: () => void;

  build() {
    Column({ space: 8 }) {
      if (this.title !== '') {
        Text(this.title)
          .fontSize($r('app.float.font_body_sm'))
          .fontColor($r('app.color.text_secondary'))
          .width('100%')
          .padding({ left: $r('app.float.space_lg') })
      }
      Column() {
        this.content()
      }
      .width('100%')
      .backgroundColor($r('app.color.bg_surface'))
      .borderRadius($r('app.float.radius_lg'))
    }
    .width('100%')
  }
}
