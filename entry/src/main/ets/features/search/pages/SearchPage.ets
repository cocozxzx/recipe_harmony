import { LengthMetrics } from '@kit.ArkUI';
import { RecipeListItem } from '../../../commons/model/Recipe';
import { AppTab, NavUtil } from '../../../commons/router/NavUtil';
import { RecipeDetailParam, RouteNames, SearchParam } from '../../../commons/router/RouteNames';
import { LoadMoreFooter } from '../../../commons/uikit/LoadMoreFooter';
import { RecipeRow } from '../../../commons/uikit/RecipeRow';
import { SearchBar } from '../../../commons/uikit/SearchBar';
import { SectionHeader } from '../../../commons/uikit/SectionHeader';
import { StateView } from '../../../commons/uikit/StateView';
import { SearchViewModel } from '../viewmodel/SearchViewModel';

/**
 * 搜索页。
 * 空结果不做死路——引导到 AI Tab 并带上关键词（"没找到？让 AI 帮你想想"）。
 */
@ComponentV2
export struct SearchPage {
  @Param param: SearchParam = { keyword: '' };
  @Local vm: SearchViewModel = new SearchViewModel();

  aboutToAppear(): void {
    this.vm.init(this.param.keyword);
  }

  build() {
    Column() {
      Row({ space: 12 }) {
        SearchBar({
          text: this.vm.keyword,
          autoFocus: true,
          onTextChange: (value: string) => this.vm.onKeywordChange(value),
          onSubmit: () => this.vm.search()
        })
          .layoutWeight(1)

        Text($r('app.string.common_cancel'))
          .fontSize($r('app.float.font_body'))
          .fontColor($r('app.color.text_secondary'))
          .onClick(() => NavUtil.pop())
      }
      .width('100%')
      .padding($r('app.float.space_lg'))

      if (this.vm.searched) {
        this.resultView()
      } else {
        this.discoveryView()
      }
    }
    .width('100%')
    .height('100%')
    .backgroundColor($r('app.color.bg_page'))
  }

  @Builder
  resultView() {
    StateView({
      status: this.vm.state.status,
      errorMessage: this.vm.state.errorMessage,
      emptyText: $r('app.string.search_empty_title'),
      emptyActionText: $r('app.string.search_empty_ai'),
      onRetry: () => this.vm.search(),
      onEmptyAction: () => NavUtil.switchTab(AppTab.AI, this.vm.keyword),
      content: () => { this.resultList() }
    })
      .layoutWeight(1)
  }

  @Builder
  resultList() {
    List() {
      LazyForEach(this.vm.results, (item: RecipeListItem) => {
        ListItem() {
          RecipeRow({
            item: item,
            onTap: (target: RecipeListItem) => {
              const detailParam: RecipeDetailParam = { recipeId: target.id };
              NavUtil.push(RouteNames.RECIPE_DETAIL, detailParam);
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

  @Builder
  discoveryView() {
    Scroll() {
      Column({ space: 24 }) {
        if (this.vm.history.length > 0) {
          Column({ space: 12 }) {
            SectionHeader({
              title: $r('app.string.search_history'),
              actionText: $r('app.string.common_clear'),
              onAction: () => this.vm.clearHistory()
            })
            Flex({ wrap: FlexWrap.Wrap, space: { main: LengthMetrics.vp(8), cross: LengthMetrics.vp(8) } }) {
              ForEach(this.vm.history, (keyword: string) => {
                Row({ space: 6 }) {
                  Text(keyword)
                    .fontSize($r('app.float.font_body_sm'))
                    .fontColor($r('app.color.text_secondary'))
                  Image($r('app.media.ic_close'))
                    .width(12)
                    .height(12)
                    .fillColor($r('app.color.text_tertiary'))
                    .onClick(() => this.vm.removeHistory(keyword))
                }
                .height($r('app.float.chip_height'))
                .padding({ left: $r('app.float.space_md'), right: $r('app.float.space_md') })
                .backgroundColor($r('app.color.bg_sunken'))
                .borderRadius($r('app.float.radius_sm'))
                .onClick(() => this.vm.searchWith(keyword))
              }, (keyword: string) => keyword)
            }
            .width('100%')
          }
        }

        if (this.vm.hotRecipes.length > 0) {
          Column({ space: 12 }) {
            SectionHeader({ title: $r('app.string.search_hot') })
            ForEach(this.vm.hotRecipes, (item: RecipeListItem) => {
              RecipeRow({
                item: item,
                onTap: (target: RecipeListItem) => {
                  const detailParam: RecipeDetailParam = { recipeId: target.id };
                  NavUtil.push(RouteNames.RECIPE_DETAIL, detailParam);
                }
              })
            }, (item: RecipeListItem) => item.id)
          }
        }
      }
      .width('100%')
      .padding({ left: $r('app.float.space_lg'), right: $r('app.float.space_lg') })
    }
    .scrollBar(BarState.Off)
    .layoutWeight(1)
    .align(Alignment.Top)
  }
}
