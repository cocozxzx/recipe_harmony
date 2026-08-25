import { PageState } from '../../../commons/model/PageState';
import { RecipeListItem } from '../../../commons/model/Recipe';
import { readableMessage } from '../../../commons/network/Errors';
import { PageResultDto } from '../../../commons/network/dto/Common';
import { RecipeRepository } from '../../../commons/repository/RecipeRepository';
import { LazyDataSource } from '../../../commons/uikit/LazyDataSource';
import { LoadMoreStatus } from '../../../commons/uikit/LoadMoreFooter';
import { Logger } from '../../../commons/utils/Logger';

const TAG: string = 'MyRecipeListViewModel';
const PAGE_SIZE: number = 20;

/** "我的收藏"与"我的点赞"结构完全一致，只差数据源，用一个枚举区分 */
export enum MyListSource {
  FAVORITES,
  LIKES
}

@ObservedV2
export class MyRecipeListViewModel {
  @Trace state: PageState = new PageState();
  @Trace loadMoreStatus: LoadMoreStatus = LoadMoreStatus.IDLE;

  readonly items: LazyDataSource<RecipeListItem> = new LazyDataSource<RecipeListItem>();

  private source: MyListSource = MyListSource.FAVORITES;
  private page: number = 1;
  private hasMore: boolean = true;
  private loading: boolean = false;

  async load(source: MyListSource): Promise<void> {
    this.source = source;
    this.state.loading();
    this.page = 1;
    this.hasMore = true;
    try {
      const result: PageResultDto<RecipeListItem> = await this.fetch(1);
      this.items.reset(result.list);
      this.hasMore = result.hasMore;
      this.loadMoreStatus = this.hasMore ? LoadMoreStatus.IDLE : LoadMoreStatus.NO_MORE;
      this.state.success(result.list.length > 0);
    } catch (e) {
      Logger.e(TAG, 'load failed', e);
      this.state.error(readableMessage(e));
    }
  }

  async loadMore(): Promise<void> {
    if (this.loading || !this.hasMore) {
      return;
    }
    this.loading = true;
    this.loadMoreStatus = LoadMoreStatus.LOADING;
    try {
      const next: number = this.page + 1;
      const result: PageResultDto<RecipeListItem> = await this.fetch(next);
      this.page = next;
      this.hasMore = result.hasMore;
      this.items.appendAll(result.list);
      this.loadMoreStatus = this.hasMore ? LoadMoreStatus.IDLE : LoadMoreStatus.NO_MORE;
    } catch (e) {
      Logger.e(TAG, 'loadMore failed', e);
      this.loadMoreStatus = LoadMoreStatus.FAILED;
    } finally {
      this.loading = false;
    }
  }

  private async fetch(page: number): Promise<PageResultDto<RecipeListItem>> {
    if (this.source === MyListSource.FAVORITES) {
      return RecipeRepository.getMyFavorites(page, PAGE_SIZE);
    }
    return RecipeRepository.getMyLikes(page, PAGE_SIZE);
  }
}
