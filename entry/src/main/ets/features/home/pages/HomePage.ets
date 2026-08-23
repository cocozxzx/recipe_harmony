import { PageStatus } from '../../../commons/model/PageState';
import { RecipeListItem, RecipeSort, RecipeTag } from '../../../commons/model/Recipe';
import { AppTab, NavUtil } from '../../../commons/router/NavUtil';
import {
  RecipeDetailParam,
  RecipeListParam,
  RouteNames,
  SearchParam
} from '../../../commons/router/RouteNames';
import { LoadMoreFooter } from '../../../commons/uikit/LoadMoreFooter';
import { RecipeCardH } from '../../../commons/uikit/RecipeCardH';
import { RecipeRow } from '../../../commons/uikit/RecipeRow';
import { SearchBar } from '../../../commons/uikit/SearchBar';
import { SectionHeader } from '../../../commons/uikit/SectionHeader';
import { StateView } from '../../../commons/uikit/StateView';
import { Strings } from '../../../commons/utils/Strings';
import { AiEntryCard } from '../components/AiEntryCard';
import { TagGrid } from '../components/TagGrid';
import { HomeViewModel } from '../viewmodel/HomeViewModel';

/**
 * 首页：搜索框 / 标签宫格 / AI 引导卡 / 今日推荐 / 热门榜单 / 最新发布。
 *
 * 全部靠现有数据撑起，后台不需要新增运营配置——
 * 第一期不做 Banner 轮播位，也不做个性化推荐（"今日推荐"由后端按日期种子伪随机）。
 */
@ComponentV2
export struct HomePage {
  @Local vm: HomeViewModel = new HomeViewModel();

  aboutToAppear(): void {
    this.vm.load();
  }

  build() {
    Column() {
      Row() {
        SearchBar({
          readOnly: true,
          placeholder: $r('app.string.home_search_placeholder'),
          onTap: () => NavUtil.push(RouteNames.SEARCH, { keyword: '' } as SearchParam)
        })
      }
      .width('100%')
      .padding({
        left: $r('app.float.space_lg'),
        right: $r('app.float.space_lg'),
        top: $r('app.float.space_md'),
        bottom: $r('app.float.space_md')
      })

      StateView({
        status: this.vm.state.status,
        errorMessage: this.vm.state.errorMessage,
        emptyText: $r('app.string.home_empty'),
        onRetry: () => this.vm.load(),
        content: () => { this.contentView() }
      })
        .layoutWeight(1)
    }
    .width('100%')
    .height('100%')
    .backgroundColor($r('app.color.bg_page'))
  }

  @Builder
  contentView() {
    Refresh({ refreshing: this.vm.refreshing }) {
      List() {
        ListItem() {
          Column({ space: 24 }) {
            TagGrid({
              tags: this.vm.tags,
              onTagTap: (tag: RecipeTag) => this.openTag(tag),
              onMoreTap: () => NavUtil.switchTab(AppTab.CATEGORY)
            })

            AiEntryCard({ onTap: () => NavUtil.switchTab(AppTab.AI) })

            this.horizontalSection($r('app.string.home_section_today'), '', this.vm.todayRecommend, () => {})

            this.horizontalSection(
              $r('app.string.home_section_hot'),
              $r('app.string.common_more'),
              this.vm.hotRecipes,
              () => this.openHotMore()
            )

            SectionHeader({ title: $r('app.string.home_section_latest') })
          }
          .width('100%')
          .padding({ left: $r('app.float.space_lg'), right: $r('app.float.space_lg') })
        }

        LazyForEach(this.vm.latest, (item: RecipeListItem) => {
          ListItem() {
            RecipeRow({
              item: item,
              onTap: (target: RecipeListItem) => this.openDetail(target)
            })
              .padding({ left: $r('app.float.space_lg'), right: $r('app.float.space_lg') })
          }
        }, (item: RecipeListItem) => item.id)

        ListItem() {
          LoadMoreFooter({
            status: this.vm.loadMoreStatus,
            onRetry: () => this.vm.loadMore()
          })
        }
      }
      .width('100%')
      .height('100%')
      .scrollBar(BarState.Off)
      .cachedCount(3)
      .edgeEffect(EdgeEffect.None)
      .onReachEnd(() => this.vm.loadMore())
    }
    .onRefreshing(() => this.vm.refresh())
    .width('100%')
    .height('100%')
  }

  /** 今日推荐 / 热门榜单共用的横滑区块 */
  @Builder
  horizontalSection(title: ResourceStr, action: ResourceStr, items: RecipeListItem[], onAction: () => void) {
    if (items.length > 0) {
      Column({ space: 12 }) {
        SectionHeader({ title: title, actionText: action, onAction: onAction })
        Scroll() {
          Row({ space: 12 }) {
            ForEach(items, (item: RecipeListItem) => {
              RecipeCardH({
                item: item,
                onTap: (target: RecipeListItem) => this.openDetail(target)
              })
            }, (item: RecipeListItem) => item.id)
          }
        }
        .scrollable(ScrollDirection.Horizontal)
        .scrollBar(BarState.Off)
        .width('100%')
        .align(Alignment.Start)
      }
      .width('100%')
    }
  }

  private openDetail(item: RecipeListItem): void {
    const param: RecipeDetailParam = { recipeId: item.id };
    NavUtil.push(RouteNames.RECIPE_DETAIL, param);
  }

  private openTag(tag: RecipeTag): void {
    const param: RecipeListParam = { title: tag.name, tagId: tag.id, sort: RecipeSort.LATEST as string };
    NavUtil.push(RouteNames.RECIPE_LIST, param);
  }

  private openHotMore(): void {
    const param: RecipeListParam = {
      title: Strings.get($r('app.string.home_section_hot')),
      tagId: '',
      sort: RecipeSort.FAVORITE as string
    };
    NavUtil.push(RouteNames.RECIPE_LIST, param);
  }
}
