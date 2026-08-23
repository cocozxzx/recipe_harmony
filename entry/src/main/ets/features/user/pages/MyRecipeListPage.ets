import { RecipeListItem } from '../../../commons/model/Recipe';
import { NavUtil } from '../../../commons/router/NavUtil';
import { RecipeDetailParam, RouteNames } from '../../../commons/router/RouteNames';
import { LoadMoreFooter } from '../../../commons/uikit/LoadMoreFooter';
import { RecipeRow } from '../../../commons/uikit/RecipeRow';
import { StateView } from '../../../commons/uikit/StateView';
import { TopBar } from '../../../commons/uikit/TopBar';
import { MyListSource, MyRecipeListViewModel } from '../viewmodel/MyRecipeListViewModel';

/** 我的收藏 / 我的点赞。两者只差数据源，共用一个页面。 */
@ComponentV2
export struct MyRecipeListPage {
  @Param source: MyListSource = MyListSource.FAVORITES;
  @Local vm: MyRecipeListViewModel = new MyRecipeListViewModel();

  aboutToAppear(): void {
    this.vm.load(this.source);
  }

  build() {
    Column() {
      TopBar({
        title: this.source === MyListSource.FAVORITES
          ? $r('app.string.mine_favorites')
          : $r('app.string.mine_likes')
      })

      StateView({
        status: this.vm.state.status,
        errorMessage: this.vm.state.errorMessage,
        onRetry: () => this.vm.load(this.source),
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
    List() {
      LazyForEach(this.vm.items, (item: RecipeListItem) => {
        ListItem() {
          RecipeRow({
            item: item,
            onTap: (target: RecipeListItem) => {
              const param: RecipeDetailParam = { recipeId: target.id };
              NavUtil.push(RouteNames.RECIPE_DETAIL, param);
            }
          })
        }
      }, (item: RecipeListItem) => item.id)

      ListItem() {
        LoadMoreFooter({ status: this.vm.loadMoreStatus, onRetry: () => this.vm.loadMore() })
      }
    }
    .width('100%')
    .height('100%')
    .padding({ left: $r('app.float.space_lg'), right: $r('app.float.space_lg') })
    .scrollBar(BarState.Off)
    .cachedCount(3)
    .onReachEnd(() => this.vm.loadMore())
  }
}
