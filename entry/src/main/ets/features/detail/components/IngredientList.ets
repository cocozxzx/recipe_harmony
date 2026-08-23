import { displayAmount, RecipeIngredient } from '../../../commons/model/Recipe';
import { MiniTag } from '../../../commons/uikit/TagChip';
import { Formatter } from '../../../commons/utils/Formatter';

/**
 * 食材列表。每行 "食材名 ———— 用量 单位"。
 * 用量随份数换算，`isConvertible = false` 的食材（盐、油等"适量"类）保持原值。
 */
@ComponentV2
export struct IngredientList {
  @Param ingredients: RecipeIngredient[] = [];
  @Param servings: number = 1;
  @Param baseServings: number = 1;

  build() {
    Column() {
      ForEach(this.ingredients, (item: RecipeIngredient, index: number) => {
        Column({ space: 2 }) {
          Row({ space: 8 }) {
            Text(item.name)
              .fontSize($r('app.float.font_body'))
              .fontColor($r('app.color.text_primary'))
            if (item.isOptional) {
              MiniTag({ text: $r('app.string.common_optional') })
            }
            Row().layoutWeight(1)
            Text(this.amountText(item))
              .fontSize($r('app.float.font_body'))
              .fontColor($r('app.color.text_secondary'))
          }
          .width('100%')
          .alignItems(VerticalAlign.Center)

          if (item.remark.length > 0) {
            Text(item.remark)
              .fontSize($r('app.float.font_caption'))
              .fontColor($r('app.color.text_tertiary'))
              .width('100%')
          }
        }
        .width('100%')
        .padding({ top: $r('app.float.space_sm'), bottom: $r('app.float.space_sm') })

        if (index < this.ingredients.length - 1) {
          Divider().color($r('app.color.divider')).strokeWidth(1)
        }
      }, (item: RecipeIngredient) => item.id)
    }
    .width('100%')
    .padding({ left: $r('app.float.space_md'), right: $r('app.float.space_md') })
    .backgroundColor($r('app.color.bg_surface'))
    .borderRadius($r('app.float.radius_md'))
  }

  private amountText(item: RecipeIngredient): string {
    const value: number = displayAmount(item, this.servings, this.baseServings);
    return `${Formatter.amount(value)}${item.unit}`;
  }
}
