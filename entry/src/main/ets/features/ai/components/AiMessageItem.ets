import { AiMessage, AiRecipeMatch, AiResultType, AiRole } from '../../../commons/model/Ai';
import { RecipeListItem } from '../../../commons/model/Recipe';
import { NavUtil } from '../../../commons/router/NavUtil';
import { RecipeDetailParam, RouteNames } from '../../../commons/router/RouteNames';
import { RecipeRow } from '../../../commons/uikit/RecipeRow';
import { Strings } from '../../../commons/utils/Strings';
import { MiniTag } from '../../../commons/uikit/TagChip';
import { AiGeneratedCard } from './AiGeneratedCard';

/**
 * 单条对话消息。
 * 用户消息右对齐、AI 消息左对齐；AI 消息按 resultType 分三种渲染：
 * TEXT（纯文本，流式中带光标）/ RECIPES（食谱卡片列表）/ GENERATED（AI 生成食谱卡片）。
 */
@ComponentV2
export struct AiMessageItem {
  @Param message: AiMessage = new AiMessage();
  @Event onRetry: () => void = () => {};
  @Event onToggleFavorite: () => void = () => {};

  build() {
    Row() {
      if (this.message.role === AiRole.USER) {
        Row().layoutWeight(1)
        Text(this.message.text)
          .fontSize($r('app.float.font_body'))
          .fontColor($r('app.color.text_on_brand'))
          .padding($r('app.float.space_md'))
          .backgroundColor($r('app.color.brand_primary'))
          .borderRadius($r('app.float.radius_md'))
          .constraintSize({ maxWidth: '76%' })
      } else {
        Column({ space: 12 }) {
          if (this.message.hint.length > 0) {
            Row({ space: 8 }) {
              LoadingProgress()
                .width($r('app.float.icon_md'))
                .height($r('app.float.icon_md'))
                .color($r('app.color.text_tertiary'))
              Text(this.message.hint)
                .fontSize($r('app.float.font_body_sm'))
                .fontColor($r('app.color.text_tertiary'))
            }
          }

          if (this.message.text.length > 0) {
            Text(this.streamText())
              .fontSize($r('app.float.font_body'))
              .fontColor($r('app.color.text_primary'))
              .lineHeight(24)
              .padding($r('app.float.space_md'))
              .backgroundColor($r('app.color.bg_surface'))
              .borderRadius($r('app.float.radius_md'))
              .width('100%')
          }

          if (this.message.resultType === AiResultType.RECIPES) {
            this.recipeMatches()
          }

          if (this.message.resultType === AiResultType.GENERATED && this.message.generated !== null) {
            AiGeneratedCard({
              recipe: this.message.generated,
              onToggleFavorite: () => this.onToggleFavorite()
            })
          }

          if (this.message.failed) {
            Text($r('app.string.ai_failed'))
              .fontSize($r('app.float.font_body_sm'))
              .fontColor($r('app.color.state_error'))
              .onClick(() => this.onRetry())
          }
        }
        .alignItems(HorizontalAlign.Start)
        .constraintSize({ maxWidth: '92%' })
        Row().layoutWeight(1)
      }
    }
    .width('100%')
    .alignItems(VerticalAlign.Top)
  }

  @Builder
  recipeMatches() {
    Column() {
      ForEach(this.message.recipes, (match: AiRecipeMatch) => {
        Column({ space: 6 }) {
          RecipeRow({
            item: match.recipe,
            showDivider: false,
            onTap: (item: RecipeListItem) => {
              const param: RecipeDetailParam = { recipeId: item.id };
              NavUtil.push(RouteNames.RECIPE_DETAIL, param);
            }
          })

          Row({ space: 8 }) {
            MiniTag({
              text: match.matchRate.toString() + '%',
              bgColor: $r('app.color.brand_primary_light'),
              textColor: $r('app.color.brand_primary')
            })
            if (match.missingIngredients.length > 0) {
              Text(this.missingText(match))
                .fontSize($r('app.float.font_caption'))
                .fontColor($r('app.color.text_tertiary'))
                .maxLines(1)
                .textOverflow({ overflow: TextOverflow.Ellipsis })
                .layoutWeight(1)
            }
          }
          .width('100%')
        }
        .width('100%')
      }, (match: AiRecipeMatch) => match.recipe.id)
    }
    .width('100%')
    .padding({ left: $r('app.float.space_md'), right: $r('app.float.space_md') })
    .backgroundColor($r('app.color.bg_surface'))
    .borderRadius($r('app.float.radius_md'))
  }

  /** 流式中在末尾补一个光标字符，比单独叠一个动画层简单且不引起重排 */
  private streamText(): string {
    return this.message.streaming ? this.message.text + '▌' : this.message.text;
  }

  private missingText(match: AiRecipeMatch): string {
    return Strings.get($r('app.string.ai_missing_prefix')) + match.missingIngredients.join('、');
  }
}
