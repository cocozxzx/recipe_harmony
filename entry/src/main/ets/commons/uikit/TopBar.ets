import { NavUtil } from '../router/NavUtil';

/**
 * 二级页统一标题栏。
 * Navigation 的默认标题栏被关掉（hideTitleBar），各页自绘以便控制留白与配色。
 */
@ComponentV2
export struct TopBar {
  @Param title: ResourceStr = '';
  @Param showBack: boolean = true;
  @Param actionIcon: Resource | null = null;
  @Event onAction: () => void = () => {};

  build() {
    Row() {
      if (this.showBack) {
        Image($r('app.media.ic_back'))
          .width($r('app.float.icon_lg'))
          .height($r('app.float.icon_lg'))
          .fillColor($r('app.color.text_primary'))
          .onClick(() => NavUtil.pop())
      } else {
        Row().width($r('app.float.icon_lg'))
      }

      Text(this.title)
        .fontSize($r('app.float.font_title'))
        .fontWeight(FontWeight.Medium)
        .fontColor($r('app.color.text_primary'))
        .maxLines(1)
        .textOverflow({ overflow: TextOverflow.Ellipsis })
        .textAlign(TextAlign.Center)
        .layoutWeight(1)

      if (this.actionIcon !== null) {
        Image(this.actionIcon)
          .width($r('app.float.icon_lg'))
          .height($r('app.float.icon_lg'))
          .fillColor($r('app.color.text_secondary'))
          .onClick(() => this.onAction())
      } else {
        Row().width($r('app.float.icon_lg'))
      }
    }
    .width('100%')
    .height($r('app.float.bar_height'))
    .padding({ left: $r('app.float.space_lg'), right: $r('app.float.space_lg') })
    .backgroundColor($r('app.color.bg_page'))
    .alignItems(VerticalAlign.Center)
  }
}
