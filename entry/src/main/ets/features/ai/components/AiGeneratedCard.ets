import { AiGeneratedRecipe } from '../../../commons/model/Ai';
import { displayAmount, RecipeIngredient, RecipeStep, RecipeTip } from '../../../commons/model/Recipe';
import { CookTimeLabel } from '../../../commons/uikit/CookTimeLabel';
import { DifficultyStars } from '../../../commons/uikit/DifficultyStars';
import { MiniTag } from '../../../commons/uikit/TagChip';
import { Shadows } from '../../../commons/uikit/Theme';
import { Formatter } from '../../../commons/utils/Formatter';

/**
 * AI 兜底生成的食谱卡片。
 *
 * 必须带"AI 生成"标识与正式食谱区分——它不进 recipe 表、不计入榜单。
 * 收藏后存入 ai_generated_recipe_favorite，在"我的 AI 食谱"里查看。
 */
@ComponentV2
export struct AiGeneratedCard {
  @Param recipe: AiGeneratedRecipe = {
    id: '',
    name: '',
    summary: '',
    difficulty: 0,
    calorie: 0,
    cookTime: 0,
    baseServings: 0,
    ingredients: [],
    steps: [],
    tips: [],
    favorited: false,
    createTime: ''
  };
  @Param expandable: boolean = true;
  @Local expanded: boolean = false;
  @Event onToggleFavorite: () => void = () => {};

  build() {
    Column({ space: 12 }) {
      Row({ space: 8 }) {
        Text(this.recipe.name)
          .fontSize($r('app.float.font_title_sm'))
          .fontWeight(FontWeight.Medium)
          .fontColor($r('app.color.text_primary'))
          .layoutWeight(1)
        MiniTag({
          text: $r('app.string.ai_generated_badge'),
          bgColor: $r('app.color.accent_light'),
          textColor: $r('app.color.accent')
        })
      }
      .width('100%')

      if (this.recipe.summary.length > 0) {
        Text(this.recipe.summary)
          .fontSize($r('app.float.font_body_sm'))
          .fontColor($r('app.color.text_secondary'))
          .lineHeight(22)
          .width('100%')
      }

      Row({ space: 12 }) {
        DifficultyStars({ value: this.recipe.difficulty })
        CookTimeLabel({ minutes: this.recipe.cookTime })
        Text() {
          Span(Formatter.caloriePerServing(this.recipe.calorie, this.recipe.baseServings).toString())
          Span($r('app.string.detail_kcal'))
        }
        .fontSize($r('app.float.font_caption'))
        .fontColor($r('app.color.text_tertiary'))
      }
      .width('100%')

      if (this.expanded || !this.expandable) {
        this.details()
      }

      Row({ space: 16 }) {
        if (this.expandable) {
          Text(this.expanded ? $r('app.string.common_back') : $r('app.string.common_more'))
            .fontSize($r('app.float.font_body_sm'))
            .fontColor($r('app.color.brand_primary'))
            .onClick(() => { this.expanded = !this.expanded; })
        }
        Row().layoutWeight(1)
        Image(this.recipe.favorited ? $r('app.media.ic_favorite_fill') : $r('app.media.ic_favorite'))
          .width($r('app.float.icon_md'))
          .height($r('app.float.icon_md'))
          .fillColor(this.recipe.favorited ? $r('app.color.action_favorite') : $r('app.color.text_tertiary'))
          .onClick(() => this.onToggleFavorite())
      }
      .width('100%')
      .alignItems(VerticalAlign.Center)
    }
    .width('100%')
    .padding($r('app.float.space_md'))
    .backgroundColor($r('app.color.bg_surface'))
    .borderRadius($r('app.float.radius_lg'))
    .shadow(Shadows.card)
  }

  @Builder
  details() {
    Column({ space: 12 }) {
      Divider().color($r('app.color.divider')).strokeWidth(1)

      Text($r('app.string.detail_ingredients'))
        .fontSize($r('app.float.font_body'))
        .fontWeight(FontWeight.Medium)
        .fontColor($r('app.color.text_primary'))
        .width('100%')
      ForEach(this.recipe.ingredients, (item: RecipeIngredient) => {
        Row() {
          Text(item.name)
            .fontSize($r('app.float.font_body_sm'))
            .fontColor($r('app.color.text_primary'))
            .layoutWeight(1)
          Text(`${Formatter.amount(displayAmount(item, this.recipe.baseServings, this.recipe.baseServings))}${item.unit}`)
            .fontSize($r('app.float.font_body_sm'))
            .fontColor($r('app.color.text_secondary'))
        }
        .width('100%')
      }, (item: RecipeIngredient) => item.id)

      Text($r('app.string.detail_steps'))
        .fontSize($r('app.float.font_body'))
        .fontWeight(FontWeight.Medium)
        .fontColor($r('app.color.text_primary'))
        .width('100%')
      ForEach(this.recipe.steps, (step: RecipeStep, index: number) => {
        Text(`${index + 1}. ${step.content}`)
          .fontSize($r('app.float.font_body_sm'))
          .fontColor($r('app.color.text_secondary'))
          .lineHeight(22)
          .width('100%')
      }, (step: RecipeStep) => step.id)

      if (this.recipe.tips.length > 0) {
        Text($r('app.string.detail_tips'))
          .fontSize($r('app.float.font_body'))
          .fontWeight(FontWeight.Medium)
          .fontColor($r('app.color.text_primary'))
          .width('100%')
        ForEach(this.recipe.tips, (tip: RecipeTip) => {
          Text(tip.content)
            .fontSize($r('app.float.font_body_sm'))
            .fontColor($r('app.color.text_secondary'))
            .lineHeight(22)
            .width('100%')
        }, (tip: RecipeTip) => tip.id)
      }
    }
    .width('100%')
  }
}
