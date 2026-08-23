import { RecipeListItem } from '../model/Recipe';
import { DifficultyStars } from './DifficultyStars';
import { NetImage } from './NetImage';

/**
 * 横滑卡片，固定宽 140vp。用于首页"今日推荐""热门榜单"。
 * 固定宽高是为了让横滑列表在图片加载前就有稳定布局，不抖。
 */
@ComponentV2
export struct RecipeCardH {
  @Param item: RecipeListItem = {} as RecipeListItem;
  @Event onTap: (item: RecipeListItem) => void = () => {};

  build() {
    Column({ space: 8 }) {
      NetImage({
        url: this.item.coverImage,
        imgWidth: '100%',
        imgHeight: 104,
        radius: $r('app.float.radius_md')
      })
      Text(this.item.name)
        .fontSize($r('app.float.font_body'))
        .fontWeight(FontWeight.Medium)
        .fontColor($r('app.color.text_primary'))
        .maxLines(1)
        .textOverflow({ overflow: TextOverflow.Ellipsis })
        .width('100%')
      DifficultyStars({ value: this.item.difficulty })
    }
    .alignItems(HorizontalAlign.Start)
    .width($r('app.float.card_h_width'))
    .onClick(() => this.onTap(this.item))
  }
}
