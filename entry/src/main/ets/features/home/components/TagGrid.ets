import { RecipeTag } from '../../../commons/model/Recipe';

/**
 * 首页标签宫格：4 列 2 行，最后一格固定为"更多"。
 * 取关联食谱数最多的 8 个标签，由后端在 /home 里算好——
 * 前端不做排序，避免和分类页的口径不一致。
 */
@ComponentV2
export struct TagGrid {
  @Param tags: RecipeTag[] = [];
  @Event onTagTap: (tag: RecipeTag) => void = () => {};
  @Event onMoreTap: () => void = () => {};

  build() {
    Grid() {
      ForEach(this.tags.slice(0, 7), (tag: RecipeTag) => {
        GridItem() {
          this.cell(tag.name, false)
        }
        .onClick(() => this.onTagTap(tag))
      }, (tag: RecipeTag) => tag.id)

      GridItem() {
        this.cell($r('app.string.common_more'), true)
      }
      .onClick(() => this.onMoreTap())
    }
    .columnsTemplate('1fr 1fr 1fr 1fr')
    .rowsGap($r('app.float.space_md'))
    .columnsGap($r('app.float.space_sm'))
    .width('100%')
    .height(this.tags.length > 3 ? 152 : 76)
  }

  @Builder
  cell(label: ResourceStr, highlight: boolean) {
    Column({ space: 6 }) {
      Row()
        .width(44)
        .height(44)
        .borderRadius($r('app.float.radius_md'))
        .backgroundColor(highlight ? $r('app.color.accent_light') : $r('app.color.brand_primary_light'))
      Text(label)
        .fontSize($r('app.float.font_caption'))
        .fontColor($r('app.color.text_secondary'))
        .maxLines(1)
        .textOverflow({ overflow: TextOverflow.Ellipsis })
    }
    .width('100%')
    .justifyContent(FlexAlign.Center)
  }
}
