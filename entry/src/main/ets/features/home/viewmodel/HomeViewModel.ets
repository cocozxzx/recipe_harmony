import { PageState } from '../../../commons/model/PageState';
import { RecipeListItem, RecipeTag } from '../../../commons/model/Recipe';
import { readableMessage } from '../../../commons/network/Errors';
import { PageResultDto } from '../../../commons/network/dto/Common';
import { HomeDataDto } from '../../../commons/network/dto/HomeDto';
import { LazyDataSource } from '../../../commons/uikit/LazyDataSource';
import { LoadMoreStatus } from '../../../commons/uikit/LoadMoreFooter';
import { Logger } from '../../../commons/utils/Logger';
import { HomeRepository } from '../repository/HomeRepository';

const TAG: string = 'HomeViewModel';

@ObservedV2
export class HomeViewModel {
  @Trace state: PageState = new PageState();
  @Trace tags: RecipeTag[] = [];
  @Trace todayRecommend: RecipeListItem[] = [];
  @Trace hotRecipes: RecipeListItem[] = [];
  @Trace loadMoreStatus: LoadMoreStatus = LoadMoreStatus.IDLE;
  @Trace refreshing: boolean = false;

  /** "最新发布"是长列表，走 LazyForEach，数据放 IDataSource 而非 @Trace 数组 */
  readonly latest: LazyDataSource<RecipeListItem> = new LazyDataSource<RecipeListItem>();

  private page: number = 1;
  private hasMore: boolean = true;
  private loading: boolean = false;

  async load(): Promise<void> {
    this.state.loading();
    await this.fetchHome();
  }

  async refresh(): Promise<void> {
    this.refreshing = true;
    await this.fetchHome();
    this.refreshing = false;
  }

  async loadMore(): Promise<void> {
    if (this.loading || !this.hasMore) {
      return;
    }
    this.loading = true;
    this.loadMoreStatus = LoadMoreStatus.LOADING;
    try {
      const next: number = this.page + 1;
      const result: PageResultDto<RecipeListItem> = await HomeRepository.getLatest(next);
      this.page = next;
      this.hasMore = result.hasMore;
      this.latest.appendAll(result.list);
      this.loadMoreStatus = this.hasMore ? LoadMoreStatus.IDLE : LoadMoreStatus.NO_MORE;
    } catch (e) {
      Logger.e(TAG, 'loadMore failed', e as Object);
      this.loadMoreStatus = LoadMoreStatus.FAILED;
    } finally {
      this.loading = false;
    }
  }

  private async fetchHome(): Promise<void> {
    try {
      const data: HomeDataDto = await HomeRepository.getHomeData();
      this.tags = data.tags;
      this.todayRecommend = data.todayRecommend;
      this.hotRecipes = data.hotRecipes;
      this.latest.reset(data.latest.list);
      this.page = data.latest.page;
      this.hasMore = data.latest.hasMore;
      this.loadMoreStatus = this.hasMore ? LoadMoreStatus.IDLE : LoadMoreStatus.NO_MORE;
      // 首页只要有任意一段内容就算有数据，不能只看 latest
      const hasData: boolean = this.tags.length > 0 || this.todayRecommend.length > 0
        || this.hotRecipes.length > 0 || !this.latest.isEmpty();
      this.state.success(hasData);
    } catch (e) {
      Logger.e(TAG, 'load home failed', e as Object);
      this.state.error(readableMessage(e as Object));
    }
  }
}
