import { curves } from '@kit.ArkUI';
import { RecipeListItem } from '../model/Recipe';
import { Formatter } from '../utils/Formatter';
import { CookTimeLabel } from './CookTimeLabel';
import { DifficultyStars } from './DifficultyStars';
import { NetImage } from './NetImage';

/**
 * 横向列表项：左图右文。用于首页"最新发布"、搜索结果、我的收藏。
 * 列表项之间用 divider 分隔线，不加阴影——阴影只留给卡片和浮起元素。
 */
@ComponentV2
export struct RecipeRow {
  @Param item: RecipeListItem = new RecipeListItem();
  @Param showDivider: boolean = true;
  @Local pressScale: number = 1.0;
  @Event onTap: (item: RecipeListItem) => void = () => {};

  build() {
    Column() {
      Row({ space: 12 }) {
        NetImage({
          url: this.item.coverImage,
          imgWidth: $r('app.float.img_list_w'),
          imgHeight: $r('app.float.img_list_h'),
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

          Row({ space: 12 }) {
            this.countItem($r('app.media.ic_favorite'), this.item.favoriteCount)
            this.countItem($r('app.media.ic_like'), this.item.likeCount)
          }
        }
        .alignItems(HorizontalAlign.Start)
        .justifyContent(FlexAlign.Center)
        .layoutWeight(1)
        .height($r('app.float.img_list_h'))
      }
      .width('100%')
      .alignItems(VerticalAlign.Top)

      if (this.showDivider) {
        Divider()
          .color($r('app.color.divider'))
          .strokeWidth(1)
          .margin({ top: $r('app.float.space_md') })
      }
    }
    .width('100%')
    .padding({ top: $r('app.float.space_md'), bottom: this.showDivider ? 0 : $r('app.float.space_md') })
    .accessibilityText('食谱')
    .scale({ x: this.pressScale, y: this.pressScale })
    .animation({ curve: curves.responsiveSpringMotion(0.55, 0.825) })
    .onTouch((event?: TouchEvent) => {
      if (event) {
        if (event.type === TouchType.Down) {
          this.pressScale = 0.97;
        } else if (event.type === TouchType.Up || event.type === TouchType.Cancel) {
          this.pressScale = 1.0;
        }
      }
    })
    .onClick(() => this.onTap(this.item))
  }

  @Builder
  countItem(icon: Resource, count: number) {
    Row({ space: 4 }) {
      Image(icon)
        .width($r('app.float.icon_sm'))
        .height($r('app.float.icon_sm'))
        .fillColor($r('app.color.text_tertiary'))
        .objectFit(ImageFit.Contain)
      Text(Formatter.count(count))
        .fontSize($r('app.float.font_caption'))
        .fontColor($r('app.color.text_tertiary'))
    }
  }
}
