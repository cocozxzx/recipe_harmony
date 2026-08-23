import { RecipeListItem } from '../model/Recipe';
import { Formatter } from '../utils/Formatter';
import { CookTimeLabel } from './CookTimeLabel';
import { DifficultyStars } from './DifficultyStars';
import { NetImage } from './NetImage';
import { Shadows } from './Theme';

/**
 * 双列瀑布流卡片。
 * 字段取舍见需求文档第五节：耗时对下班做饭的用户比难度更有决策价值，必须露出。
 */
@ComponentV2
export struct RecipeCard {
  @Param item: RecipeListItem = {
    id: '',
    name: '',
    coverImage: '',
    difficulty: 0,
    cookTime: 0,
    favoriteCount: 0,
    likeCount: 0,
    tagName: ''
  };
  @Param imageHeight: Length = 140;
  @Event onTap: (item: RecipeListItem) => void = () => {};

  build() {
    Column({ space: 8 }) {
      NetImage({
        url: this.item.coverImage,
        imgWidth: '100%',
        imgHeight: this.imageHeight,
        radius: $r('app.float.radius_md')
      })

      Column({ space: 6 }) {
        Text(this.item.name)
          .fontSize($r('app.float.font_body'))
          .fontWeight(FontWeight.Medium)
          .fontColor($r('app.color.text_primary'))
          .maxLines(2)
          .textOverflow({ overflow: TextOverflow.Ellipsis })
          .width('100%')

        Row({ space: 8 }) {
          DifficultyStars({ value: this.item.difficulty })
          CookTimeLabel({ minutes: this.item.cookTime })
        }
        .width('100%')

        Row({ space: 12 }) {
          this.countItem($r('app.media.ic_favorite'), this.item.favoriteCount)
          this.countItem($r('app.media.ic_like'), this.item.likeCount)
        }
        .width('100%')
      }
      .alignItems(HorizontalAlign.Start)
      .width('100%')
    }
    .width('100%')
    .padding($r('app.float.space_md'))
    .backgroundColor($r('app.color.bg_surface'))
    .borderRadius($r('app.float.radius_lg'))
    .shadow(Shadows.card)
    .onClick(() => this.onTap(this.item))
  }

  @Builder
  countItem(icon: Resource, count: number) {
    Row({ space: 4 }) {
      Image(icon)
        .width($r('app.float.icon_sm'))
        .height($r('app.float.icon_sm'))
        .fillColor($r('app.color.text_tertiary'))
      Text(Formatter.count(count))
        .fontSize($r('app.float.font_caption'))
        .fontColor($r('app.color.text_tertiary'))
    }
  }
}
