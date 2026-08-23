import { common } from '@kit.AbilityKit';
import BuildProfile from 'BuildProfile';
import { RecipeDetail } from '../../../commons/model/Recipe';
import { NavUtil } from '../../../commons/router/NavUtil';
import { RecipeDetailParam } from '../../../commons/router/RouteNames';
import { CookTimeLabel } from '../../../commons/uikit/CookTimeLabel';
import { DifficultyStars } from '../../../commons/uikit/DifficultyStars';
import { NetImage } from '../../../commons/uikit/NetImage';
import { SectionHeader } from '../../../commons/uikit/SectionHeader';
import { StateView } from '../../../commons/uikit/StateView';
import { MiniTag } from '../../../commons/uikit/TagChip';
import { Motion, Shadows } from '../../../commons/uikit/Theme';
import { Formatter } from '../../../commons/utils/Formatter';
import { IngredientList } from '../components/IngredientList';
import { ServingsStepper } from '../components/ServingsStepper';
import { ShareHelper } from '../components/ShareHelper';
import { StepList } from '../components/StepList';
import { TipsCard } from '../components/TipsCard';
import { DetailViewModel } from '../viewmodel/DetailViewModel';

/**
 * 食谱详情页。
 * 自上而下：封面大图 / 标题区 / 简介 / 份数切换器 / 食材 / 步骤 / 提示 / 底部操作栏。
 */
@ComponentV2
export struct DetailPage {
  @Param param: RecipeDetailParam = { recipeId: '' };
  @Local vm: DetailViewModel = new DetailViewModel();

  aboutToAppear(): void {
    this.vm.load(this.param.recipeId);
  }

  build() {
    Stack({ alignContent: Alignment.TopStart }) {
      StateView({
        status: this.vm.state.status,
        errorMessage: this.vm.state.errorMessage,
        onRetry: () => this.vm.load(this.param.recipeId),
        content: () => { this.contentView() }
      })
        .width('100%')
        .height('100%')

      // 返回按钮浮于封面之上，避免通栏大图被标题栏切掉
      Image($r('app.media.ic_back'))
        .width($r('app.float.icon_lg'))
        .height($r('app.float.icon_lg'))
        .fillColor($r('app.color.bg_surface'))
        .margin({ left: $r('app.float.space_lg'), top: $r('app.float.space_lg') })
        .onClick(() => NavUtil.pop())
    }
    .width('100%')
    .height('100%')
    .backgroundColor($r('app.color.bg_page'))
  }

  @Builder
  contentView() {
    Column() {
      Scroll() {
        Column({ space: 24 }) {
          NetImage({
            url: this.detail().coverImage,
            imgWidth: '100%',
            imgHeight: $r('app.float.cover_height'),
            fit: ImageFit.Cover
          })

          Column({ space: 24 }) {
            this.titleSection()
            this.summarySection()

            ServingsStepper({
              servings: this.vm.servings,
              canDecrease: this.vm.canDecrease(),
              canIncrease: this.vm.canIncrease(),
              onDecrease: () => this.vm.decreaseServings(),
              onIncrease: () => this.vm.increaseServings()
            })

            Column({ space: 12 }) {
              SectionHeader({ title: $r('app.string.detail_ingredients') })
              IngredientList({
                ingredients: this.detail().ingredients,
                servings: this.vm.servings,
                baseServings: this.detail().baseServings
              })
            }

            Column({ space: 12 }) {
              SectionHeader({ title: $r('app.string.detail_steps') })
              StepList({ steps: this.detail().steps })
            }

            if (this.detail().tips.length > 0) {
              Column({ space: 12 }) {
                SectionHeader({ title: $r('app.string.detail_tips') })
                TipsCard({ tips: this.detail().tips })
              }
            }
          }
          .width('100%')
          .padding({ left: $r('app.float.space_lg'), right: $r('app.float.space_lg') })
        }
        .width('100%')
        .padding({ bottom: 96 })
      }
      .scrollBar(BarState.Off)
      .layoutWeight(1)
      .align(Alignment.Top)

      this.actionBar()
    }
    .width('100%')
    .height('100%')
  }

  @Builder
  titleSection() {
    Column({ space: 10 }) {
      Text(this.detail().name)
        .fontSize($r('app.float.font_title_lg'))
        .fontWeight(FontWeight.Bold)
        .fontColor($r('app.color.text_primary'))
        .width('100%')

      Row({ space: 8 }) {
        if (this.detail().tagName.length > 0) {
          MiniTag({
            text: this.detail().tagName,
            bgColor: $r('app.color.brand_primary_light'),
            textColor: $r('app.color.brand_primary')
          })
        }
        DifficultyStars({ value: this.detail().difficulty })
        CookTimeLabel({ minutes: this.detail().cookTime, withIcon: true })
      }
      .width('100%')

      // 每份热量不随份数变化：总热量按比例变，每份是恒定的
      Row({ space: 4 }) {
        Text($r('app.string.detail_calorie_per_serving'))
          .fontSize($r('app.float.font_caption'))
          .fontColor($r('app.color.text_tertiary'))
        Text() {
          Span(Formatter.caloriePerServing(this.detail().calorie, this.detail().baseServings).toString())
          Span($r('app.string.detail_kcal'))
        }
        .fontSize($r('app.float.font_caption'))
        .fontColor($r('app.color.accent'))
      }
      .width('100%')
    }
    .width('100%')
  }

  @Builder
  summarySection() {
    if (this.detail().summary.length > 0) {
      Text(this.detail().summary)
        .fontSize($r('app.float.font_body_sm'))
        .fontColor($r('app.color.text_secondary'))
        .lineHeight(22)
        .width('100%')
    }
  }

  @Builder
  actionBar() {
    Row() {
      this.actionItem(
        this.vm.favorited ? $r('app.media.ic_favorite_fill') : $r('app.media.ic_favorite'),
        this.vm.favorited ? $r('app.color.action_favorite') : $r('app.color.text_tertiary'),
        Formatter.count(this.vm.favoriteCount),
        this.vm.favoriteBounce,
        () => this.vm.toggleFavorite()
      )
      this.actionItem(
        this.vm.liked ? $r('app.media.ic_like_fill') : $r('app.media.ic_like'),
        this.vm.liked ? $r('app.color.action_like') : $r('app.color.text_tertiary'),
        Formatter.count(this.vm.likeCount),
        this.vm.likeBounce,
        () => this.vm.toggleLike()
      )
      this.actionItem(
        $r('app.media.ic_share'),
        $r('app.color.text_tertiary'),
        '',
        0,
        () => this.share()
      )
    }
    .width('100%')
    .height(64)
    .padding({ left: $r('app.float.space_xl'), right: $r('app.float.space_xl') })
    .backgroundColor($r('app.color.bg_surface'))
    .shadow(Shadows.float)
    .justifyContent(FlexAlign.SpaceAround)
    .alignItems(VerticalAlign.Center)
  }

  @Builder
  actionItem(icon: Resource, color: ResourceColor, label: string, bounceToken: number, action: () => void) {
    Row({ space: 6 }) {
      Image(icon)
        .width($r('app.float.icon_lg'))
        .height($r('app.float.icon_lg'))
        .fillColor(color)
        .scale({ x: 1, y: 1 })
        .animation({ duration: Motion.bounceDuration, curve: Curve.EaseOut })
      if (label.length > 0) {
        Text(label)
          .fontSize($r('app.float.font_caption'))
          .fontColor($r('app.color.text_secondary'))
      }
    }
    .padding($r('app.float.space_sm'))
    .onClick(() => action())
  }

  /** detail 在 SUCCESS 态下必然非空；这里收敛一次判空，避免每处都写 ?. */
  private detail(): RecipeDetail {
    const fallback: RecipeDetail = {
      id: '', name: '', coverImage: '', summary: '',
      difficulty: 0, calorie: 0, cookTime: 0, baseServings: 0,
      tagId: '', tagName: '', favoriteCount: 0, likeCount: 0,
      favorited: false, liked: false,
      ingredients: [], steps: [], tips: []
    };
    return this.vm.detail ?? fallback;
  }

  private share(): void {
    const detail: RecipeDetail = this.detail();
    const context: common.UIAbilityContext = getContext(this) as common.UIAbilityContext;
    const link: string = `${BuildProfile.SHARE_BASE_URL as string}${detail.id}`;
    ShareHelper.share(context, detail.name, detail.summary, link);
  }
}
