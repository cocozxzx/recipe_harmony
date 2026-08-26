import { curves } from '@kit.ArkUI';
import { RecipeListItem, RecipeSort, RecipeTag } from '../../../commons/model/Recipe';
import { NavUtil } from '../../../commons/router/NavUtil';
import { RecipeDetailParam, RouteNames } from '../../../commons/router/RouteNames';
import { LoadMoreFooter } from '../../../commons/uikit/LoadMoreFooter';
import { RecipeCard } from '../../../commons/uikit/RecipeCard';
import { TagChip } from '../../../commons/uikit/TagChip';
import { StateView } from '../../../commons/uikit/StateView';
import { Strings } from '../../../commons/utils/Strings';
import { FilterPanel } from '../components/FilterPanel';
import { CategoryViewModel } from '../viewmodel/CategoryViewModel';

/**
 * 分类页：标签横滑栏 + 排序筛选栏 + 双列瀑布流。
 * 食谱是图片主导内容，双列的信息密度明显优于单列。
 */
@ComponentV2
export struct CategoryPage {
  @Local vm: CategoryViewModel = new CategoryViewModel();
  private scroller: Scroller = new Scroller();

  aboutToAppear(): void {
    this.vm.init();
  }

  /** 切换标签 / 排序 / 筛选后列表要回到顶部，否则用户会停在上一份数据的滚动位置 */
  @Monitor('vm.resetScrollToken')
  onListReset(): void {
    this.scroller.scrollEdge(Edge.Top);
  }

  build() {
    Column() {
      this.tagBar()
      this.sortBar()
      if (this.vm.filterExpanded) {
        FilterPanel({ vm: this.vm })
          .margin({ left: $r('app.float.space_lg'), right: $r('app.float.space_lg') })
          .transition(
            TransitionEffect.SLIDE.combine(TransitionEffect.OPACITY)
              .animation({ curve: curves.springMotion(0.55, 0.825) })
          )
      }

      StateView({
        status: this.vm.state.status,
        errorMessage: this.vm.state.errorMessage,
        emptyText: $r('app.string.category_empty'),
        onRetry: () => this.vm.reload(),
        content: () => { this.waterFlow() }
      })
        .layoutWeight(1)
    }
    .width('100%')
    .height('100%')
    .backgroundColor($r('app.color.bg_page'))
    .expandSafeArea([SafeAreaType.SYSTEM], [SafeAreaEdge.TOP, SafeAreaEdge.BOTTOM])
  }

  @Builder
  tagBar() {
    Scroll() {
      Row({ space: 8 }) {
        TagChip({
          text: Strings.get($r('app.string.category_all')),
          selected: this.vm.tagId === '',
          onTap: () => this.vm.selectTag('')
        })
        ForEach(this.vm.tags, (tag: RecipeTag) => {
          TagChip({
            text: tag.name,
            selected: this.vm.tagId === tag.id,
            onTap: () => this.vm.selectTag(tag.id)
          })
        }, (tag: RecipeTag) => tag.id)
      }
      .padding({ left: $r('app.float.space_lg'), right: $r('app.float.space_lg') })
    }
    .scrollable(ScrollDirection.Horizontal)
    .scrollBar(BarState.Off)
    .edgeEffect(EdgeEffect.Spring)
    .width('100%')
    .padding({ top: $r('app.float.space_md'), bottom: $r('app.float.space_md') })
    .align(Alignment.Start)
  }

  @Builder
  sortBar() {
    Row() {
      Row({ space: 16 }) {
        this.sortItem($r('app.string.category_sort_latest'), RecipeSort.LATEST)
        this.sortItem($r('app.string.category_sort_favorite'), RecipeSort.FAVORITE)
        this.sortItem($r('app.string.category_sort_like'), RecipeSort.LIKE)
      }
      .layoutWeight(1)

      Row({ space: 4 }) {
        Text($r('app.string.category_filter'))
          .fontSize($r('app.float.font_body_sm'))
          .fontColor(this.hasFilter() ? $r('app.color.brand_primary') : $r('app.color.text_secondary'))
        Image($r('app.media.ic_more'))
          .width($r('app.float.icon_sm'))
          .height($r('app.float.icon_sm'))
          .rotate({ angle: this.vm.filterExpanded ? -90 : 90 })
          .animation({ curve: curves.springMotion(0.3, 0.6) })
          .fillColor(this.hasFilter() ? $r('app.color.brand_primary') : $r('app.color.text_tertiary'))
      }
      .accessibilityText('筛选')
      .onClick(() => this.vm.toggleFilter())
    }
    .width('100%')
    .padding({
      left: $r('app.float.space_lg'),
      right: $r('app.float.space_lg'),
      bottom: $r('app.float.space_md')
    })
  }

  @Builder
  sortItem(label: ResourceStr, value: RecipeSort) {
    Text(label)
      .fontSize($r('app.float.font_body_sm'))
      .fontWeight(this.vm.sort === value ? FontWeight.Medium : FontWeight.Normal)
      .fontColor(this.vm.sort === value ? $r('app.color.brand_primary') : $r('app.color.text_secondary'))
      .onClick(() => this.vm.selectSort(value))
  }

  @Builder
  waterFlow() {
    Column() {
      WaterFlow({ scroller: this.scroller, footer: () => { this.footer() } }) {
        LazyForEach(this.vm.recipes, (item: RecipeListItem) => {
          FlowItem() {
            RecipeCard({
              item: item,
              onTap: (target: RecipeListItem) => {
                const param: RecipeDetailParam = { recipeId: target.id };
                NavUtil.push(RouteNames.RECIPE_DETAIL, param);
              }
            })
          }
          .width('100%')
        }, (item: RecipeListItem) => item.id)
      }
      .columnsTemplate('1fr 1fr')
      .columnsGap($r('app.float.space_md'))
      .rowsGap($r('app.float.space_md'))
      .width('100%')
      .height('100%')
      .padding({ left: $r('app.float.space_lg'), right: $r('app.float.space_lg') })
      .scrollBar(BarState.Off)
      .cachedCount(3)
      .onReachEnd(() => this.vm.loadMore())
    }
    .width('100%')
    .height('100%')
  }

  @Builder
  footer() {
    LoadMoreFooter({
      status: this.vm.loadMoreStatus,
      onRetry: () => this.vm.loadMore()
    })
  }

  private hasFilter(): boolean {
    return this.vm.difficulties.length > 0 || this.vm.maxCookTime > 0;
  }
}
