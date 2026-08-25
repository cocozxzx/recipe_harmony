import { RecipeListItem, RecipeSort } from '../../../commons/model/Recipe';
import { NavUtil } from '../../../commons/router/NavUtil';
import { RecipeDetailParam, RecipeListParam, RouteNames } from '../../../commons/router/RouteNames';
import { LoadMoreFooter } from '../../../commons/uikit/LoadMoreFooter';
import { RecipeCard } from '../../../commons/uikit/RecipeCard';
import { StateView } from '../../../commons/uikit/StateView';
import { TopBar } from '../../../commons/uikit/TopBar';
import { CategoryViewModel } from '../viewmodel/CategoryViewModel';

function parseSort(value: string): RecipeSort {
  if (value === RecipeSort.FAVORITE) {
    return RecipeSort.FAVORITE;
  }
  if (value === RecipeSort.LIKE) {
    return RecipeSort.LIKE;
  }
  return RecipeSort.LATEST;
}

/**
 * 通用食谱列表页：从首页标签宫格、"热门榜单-更多"跳转进来。
 * 条件是固定的（一个 tagId 或一种 sort），所以不显示标签栏与筛选栏，
 * 但列表主体与分类页完全一致，复用同一个 ViewModel。
 */
@ComponentV2
export struct RecipeListPage {
  @Param param: RecipeListParam = { title: '', tagId: '', sort: RecipeSort.LATEST };
  @Local vm: CategoryViewModel = new CategoryViewModel();

  aboutToAppear(): void {
    this.vm.tagId = this.param.tagId;
    this.vm.sort = parseSort(this.param.sort);
    this.vm.reload();
  }

  build() {
    Column() {
      TopBar({ title: this.param.title })

      StateView({
        status: this.vm.state.status,
        errorMessage: this.vm.state.errorMessage,
        emptyText: $r('app.string.category_empty'),
        onRetry: () => this.vm.reload(),
        content: () => { this.listView() }
      })
        .layoutWeight(1)
    }
    .width('100%')
    .height('100%')
    .backgroundColor($r('app.color.bg_page'))
  }

  @Builder
  listView() {
    WaterFlow({ footer: () => { this.footer() } }) {
      LazyForEach(this.vm.recipes, (item: RecipeListItem) => {
        FlowItem() {
          RecipeCard({
            item: item,
            onTap: (target: RecipeListItem) => {
              const detailParam: RecipeDetailParam = { recipeId: target.id };
              NavUtil.push(RouteNames.RECIPE_DETAIL, detailParam);
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

  @Builder
  footer() {
    LoadMoreFooter({
      status: this.vm.loadMoreStatus,
      onRetry: () => this.vm.loadMore()
    })
  }
}
