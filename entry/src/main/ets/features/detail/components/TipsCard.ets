import { RecipeTip } from '../../../commons/model/Recipe';

/**
 * 附加提示。
 *
 * 注意：这里同时承载了后台"AI 生成技巧提示"的产出——
 * 运营在后台点按钮生成、人工过滤后写入 recipe_tip，前台不单独做"AI 总结"模块。
 * 这样避免详情页出现两块内容雷同的区域，AI 的价值落在降低编辑录入成本上。
 */
@ComponentV2
export struct TipsCard {
  @Param tips: RecipeTip[] = [];

  build() {
    Column({ space: 10 }) {
      ForEach(this.tips, (tip: RecipeTip, index: number) => {
        Row({ space: 8 }) {
          Text('·')
            .fontSize($r('app.float.font_body'))
            .fontColor($r('app.color.accent'))
          Text(tip.content)
            .fontSize($r('app.float.font_body_sm'))
            .fontColor($r('app.color.text_secondary'))
            .lineHeight(22)
            .layoutWeight(1)
        }
        .width('100%')
        .alignItems(VerticalAlign.Top)
      }, (tip: RecipeTip) => tip.id)
    }
    .width('100%')
    .padding($r('app.float.space_lg'))
    .backgroundColor($r('app.color.accent_light'))
    .borderRadius($r('app.float.radius_md'))
  }
}
