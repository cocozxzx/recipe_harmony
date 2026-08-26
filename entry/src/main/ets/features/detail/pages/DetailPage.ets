import { curves } from '@kit.ArkUI';
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
  @Local favoriteScale: number = 1.0;
  @Local likeScale: number = 1.0;

  aboutToAppear(): void {
    this.vm.load(this.param.recipeId);
  }

  @Monitor('vm.favoriteBounce')
  onFavoriteBounce(): void {
    this.favoriteScale = 1.3;
    animateTo(Motion.bounce(), () => {
      this.favoriteScale = 1.0;
    });
  }

  @Monitor('vm.likeBounce')
  onLikeBounce(): void {
    this.likeScale = 1.3;
    animateTo(Motion.bounce(), () => {
      this.likeScale = 1.0;
    });
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
        .accessibilityText('返回')
        .onClick(() => NavUtil.pop())
    }
    .width('100%')
    .height('100%')
    .backgroundColor($r('app.color.bg_page'))
    .expandSafeArea([SafeAreaType.SYSTEM], [SafeAreaEdge.TOP, SafeAreaEdge.BOTTOM])
  }

  @Builder
  contentView() {
    Column() {
      Scroll() {
        Column({ space: 24 }) {
          NetImage({
            url: this.vm.getDetail().coverImage,
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
                ingredients: this.vm.getDetail().ingredients,
                servings: this.vm.servings,
                baseServings: this.vm.getDetail().baseServings
              })
            }

            Column({ space: 12 }) {
              SectionHeader({ title: $r('app.string.detail_steps') })
              StepList({ steps: this.vm.getDetail().steps })
            }

            if (this.vm.getDetail().tips.length > 0) {
              Column({ space: 12 }) {
                SectionHeader({ title: $r('app.string.detail_tips') })
                TipsCard({ tips: this.vm.getDetail().tips })
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
      .edgeEffect(EdgeEffect.Spring)
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
      Text(this.vm.getDetail().name)
        .fontSize($r('app.float.font_title_lg'))
        .fontWeight(FontWeight.Bold)
        .fontColor($r('app.color.text_primary'))
        .width('100%')

      Row({ space: 8 }) {
        if (this.vm.getDetail().tagName.length > 0) {
          MiniTag({
            text: this.vm.getDetail().tagName,
            bgColor: $r('app.color.brand_primary_light'),
            textColor: $r('app.color.brand_primary')
          })
        }
        DifficultyStars({ value: this.vm.getDetail().difficulty })
        CookTimeLabel({ minutes: this.vm.getDetail().cookTime, withIcon: true })
      }
      .width('100%')

      // 每份热量不随份数变化：总热量按比例变，每份是恒定的
      Row({ space: 4 }) {
        Text($r('app.string.detail_calorie_per_serving'))
          .fontSize($r('app.float.font_caption'))
          .fontColor($r('app.color.text_tertiary'))
        Text() {
          Span(Formatter.caloriePerServing(this.vm.getDetail().calorie, this.vm.getDetail().baseServings).toString())
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
    if (this.vm.getDetail().summary.length > 0) {
      Text(this.vm.getDetail().summary)
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
        this.favoriteScale,
        () => this.vm.toggleFavorite(),
        '收藏'
      )
      this.actionItem(
        this.vm.liked ? $r('app.media.ic_like_fill') : $r('app.media.ic_like'),
        this.vm.liked ? $r('app.color.action_like') : $r('app.color.text_tertiary'),
        Formatter.count(this.vm.likeCount),
        this.likeScale,
        () => this.vm.toggleLike(),
        '点赞'
      )
      this.actionItem(
        $r('app.media.ic_share'),
        $r('app.color.text_tertiary'),
        '',
        1.0,
        () => this.share(),
        '分享'
      )
    }
    .width('100%')
    .constraintSize({ minHeight: $r('app.float.action_bar_h') })
    .padding({ left: $r('app.float.space_xl'), right: $r('app.float.space_xl') })
    .backgroundColor($r('app.color.bg_surface'))
    .shadow(Shadows.float)
    .justifyContent(FlexAlign.SpaceAround)
    .alignItems(VerticalAlign.Center)
  }

  @Builder
  actionItem(icon: Resource, color: ResourceColor, label: string, bounceToken: number, action: () => void, accessibilityLabel: string) {
    Row({ space: 6 }) {
      Image(icon)
        .width($r('app.float.icon_lg'))
        .height($r('app.float.icon_lg'))
        .fillColor(color)
        .scale({ x: bounceToken, y: bounceToken })
        .animation({ curve: curves.springMotion(0.3, 0.6) })
      if (label.length > 0) {
        Text(label)
          .fontSize($r('app.float.font_caption'))
          .fontColor($r('app.color.text_secondary'))
      }
    }
    .padding($r('app.float.space_sm'))
    .accessibilityText(accessibilityLabel)
    .onClick(() => action())
  }

  private share(): void {
    const detail: RecipeDetail = this.vm.getDetail();
    const context: common.UIAbilityContext = getContext(this) as common.UIAbilityContext;
    const link: string = BuildProfile.SHARE_BASE_URL + detail.id;
    ShareHelper.share(context, detail.name, detail.summary, link);
  }
}
