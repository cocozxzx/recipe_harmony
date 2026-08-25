import { PageState } from '../../../commons/model/PageState';
import { RecipeListItem, RecipeQuery, RecipeSort, RecipeTag } from '../../../commons/model/Recipe';
import { readableMessage } from '../../../commons/network/Errors';
import { PageResultDto } from '../../../commons/network/dto/Common';
import { RecipeRepository } from '../../../commons/repository/RecipeRepository';
import { LazyDataSource } from '../../../commons/uikit/LazyDataSource';
import { LoadMoreStatus } from '../../../commons/uikit/LoadMoreFooter';
import { Logger } from '../../../commons/utils/Logger';

const TAG: string = 'CategoryViewModel';
const PAGE_SIZE: number = 20;

/**
 * 分类页状态。
 *
 * 持有全部查询条件（tagId / sort / difficulties / cookTime），
 * 任一条件变更都重置到第 1 页重新请求——不做增量合并，
 * 否则筛选切换时列表里会混进上一次条件的数据。
 */
@ObservedV2
export class CategoryViewModel {
  @Trace state: PageState = new PageState();
  @Trace tags: RecipeTag[] = [];
  @Trace tagId: string = '';                       // 空串代表"全部"
  @Trace sort: RecipeSort = RecipeSort.LATEST;
  @Trace difficulties: number[] = [];
  @Trace maxCookTime: number = 0;                  // 0 表示不限
  @Trace filterExpanded: boolean = false;
  @Trace loadMoreStatus: LoadMoreStatus = LoadMoreStatus.IDLE;
  /** 列表内容变更后置为 true，页面据此把滚动位置拉回顶部 */
  @Trace resetScrollToken: number = 0;

  readonly recipes: LazyDataSource<RecipeListItem> = new LazyDataSource<RecipeListItem>();

  private page: number = 1;
  private hasMore: boolean = true;
  private loading: boolean = false;

  async init(): Promise<void> {
    await this.loadTags();
    await this.reload();
  }

  private async loadTags(): Promise<void> {
    try {
      this.tags = await RecipeRepository.getTags();
    } catch (e) {
      // 标签栏拉不到不阻塞列表，用户仍可浏览"全部"
      Logger.w(TAG, 'loadTags failed', e);
    }
  }

  selectTag(tagId: string): void {
    if (this.tagId === tagId) {
      return;
    }
    this.tagId = tagId;
    this.reload();
  }

  selectSort(sort: RecipeSort): void {
    if (this.sort === sort) {
      return;
    }
    this.sort = sort;
    this.reload();
  }

  toggleFilter(): void {
    this.filterExpanded = !this.filterExpanded;
  }

  toggleDifficulty(value: number): void {
    const index: number = this.difficulties.indexOf(value);
    const next: number[] = this.difficulties.slice();
    if (index >= 0) {
      next.splice(index, 1);
    } else {
      next.push(value);
    }
    this.difficulties = next;
  }

  setMaxCookTime(minutes: number): void {
    this.maxCookTime = minutes;
  }

  /** 筛选面板"重置"：只清筛选项，不动标签与排序 */
  resetFilter(): void {
    this.difficulties = [];
    this.maxCookTime = 0;
  }

  applyFilter(): void {
    this.filterExpanded = false;
    this.reload();
  }

  async reload(): Promise<void> {
    this.state.loading();
    this.page = 1;
    this.hasMore = true;
    this.loadMoreStatus = LoadMoreStatus.IDLE;
    try {
      const result: PageResultDto<RecipeListItem> = await RecipeRepository.getRecipes(this.buildQuery(1));
      this.recipes.reset(result.list);
      this.hasMore = result.hasMore;
      this.loadMoreStatus = this.hasMore ? LoadMoreStatus.IDLE : LoadMoreStatus.NO_MORE;
      this.state.success(result.list.length > 0);
      this.resetScrollToken += 1;
    } catch (e) {
      Logger.e(TAG, 'reload failed', e);
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
      const result: PageResultDto<RecipeListItem> = await RecipeRepository.getRecipes(this.buildQuery(next));
      this.page = next;
      this.hasMore = result.hasMore;
      this.recipes.appendAll(result.list);
      this.loadMoreStatus = this.hasMore ? LoadMoreStatus.IDLE : LoadMoreStatus.NO_MORE;
    } catch (e) {
      Logger.e(TAG, 'loadMore failed', e);
      this.loadMoreStatus = LoadMoreStatus.FAILED;
    } finally {
      this.loading = false;
    }
  }

  private buildQuery(page: number): RecipeQuery {
    const query: RecipeQuery = new RecipeQuery();
    query.tagId = this.tagId;
    query.sort = this.sort;
    query.difficulties = this.difficulties;
    query.maxCookTime = this.maxCookTime;
    query.page = page;
    query.size = PAGE_SIZE;
    return query;
  }
}
