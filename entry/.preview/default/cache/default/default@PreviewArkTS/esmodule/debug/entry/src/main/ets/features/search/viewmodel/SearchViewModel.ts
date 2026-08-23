import { PageState, PageStatus } from "@bundle:com.eatapp.recipe/entry/ets/commons/model/PageState";
import { RecipeQuery, RecipeSort } from "@bundle:com.eatapp.recipe/entry/ets/commons/model/Recipe";
import type { RecipeListItem } from "@bundle:com.eatapp.recipe/entry/ets/commons/model/Recipe";
import { readableMessage } from "@bundle:com.eatapp.recipe/entry/ets/commons/network/Errors";
import type { PageResultDto } from '../../../commons/network/dto/Common';
import type { HomeDataDto } from '../../../commons/network/dto/HomeDto';
import { ApiPaths } from "@bundle:com.eatapp.recipe/entry/ets/commons/network/ApiPaths";
import { HttpClient } from "@bundle:com.eatapp.recipe/entry/ets/commons/network/HttpClient";
import { RecipeRepository } from "@bundle:com.eatapp.recipe/entry/ets/commons/repository/RecipeRepository";
import { HistoryStore } from "@bundle:com.eatapp.recipe/entry/ets/commons/storage/HistoryStore";
import { LazyDataSource } from "@bundle:com.eatapp.recipe/entry/ets/commons/uikit/LazyDataSource";
import { LoadMoreStatus } from "@bundle:com.eatapp.recipe/entry/ets/commons/uikit/LoadMoreFooter";
import { Logger } from "@bundle:com.eatapp.recipe/entry/ets/commons/utils/Logger";
const TAG: string = 'SearchViewModel';
const PAGE_SIZE: number = 20;
@ObservedV2
export class SearchViewModel {
    @Trace
    keyword: string = '';
    @Trace
    searched: boolean = false; // false 时展示历史/热门，true 时展示结果
    @Trace
    state: PageState = new PageState();
    @Trace
    history: string[] = [];
    @Trace
    hotRecipes: RecipeListItem[] = [];
    @Trace
    loadMoreStatus: LoadMoreStatus = LoadMoreStatus.IDLE;
    readonly results: LazyDataSource<RecipeListItem> = new LazyDataSource<RecipeListItem>();
    private page: number = 1;
    private hasMore: boolean = true;
    private loading: boolean = false;
    async init(initialKeyword: string): Promise<void> {
        this.history = await HistoryStore.getSearchHistory();
        // 无历史时展示热门食谱，复用首页热门榜数据，不额外加接口
        if (this.history.length === 0) {
            await this.loadHot();
        }
        if (initialKeyword.length > 0) {
            this.keyword = initialKeyword;
            await this.search();
        }
    }
    private async loadHot(): Promise<void> {
        try {
            const data: HomeDataDto = await HttpClient.get<HomeDataDto>(ApiPaths.HOME);
            this.hotRecipes = data.hotRecipes;
        }
        catch (e) {
            Logger.w(TAG, 'load hot failed', e as Object);
        }
    }
    /** 输入框内容变化。清空时回到历史/热门视图。 */
    onKeywordChange(value: string): void {
        this.keyword = value;
        if (value.length === 0) {
            this.searched = false;
            this.state.status = PageStatus.SUCCESS;
        }
    }
    async search(): Promise<void> {
        const keyword: string = this.keyword.trim();
        if (keyword.length === 0) {
            return;
        }
        this.searched = true;
        this.state.loading();
        this.page = 1;
        this.hasMore = true;
        this.history = await HistoryStore.addSearchHistory(keyword);
        try {
            const result: PageResultDto<RecipeListItem> = await RecipeRepository.getRecipes(this.buildQuery(1));
            this.results.reset(result.list);
            this.hasMore = result.hasMore;
            this.loadMoreStatus = this.hasMore ? LoadMoreStatus.IDLE : LoadMoreStatus.NO_MORE;
            this.state.success(result.list.length > 0);
        }
        catch (e) {
            Logger.e(TAG, 'search failed', e as Object);
            this.state.error(readableMessage(e as Object));
        }
    }
    async searchWith(keyword: string): Promise<void> {
        this.keyword = keyword;
        await this.search();
    }
    async loadMore(): Promise<void> {
        if (this.loading || !this.hasMore || !this.searched) {
            return;
        }
        this.loading = true;
        this.loadMoreStatus = LoadMoreStatus.LOADING;
        try {
            const next: number = this.page + 1;
            const result: PageResultDto<RecipeListItem> = await RecipeRepository.getRecipes(this.buildQuery(next));
            this.page = next;
            this.hasMore = result.hasMore;
            this.results.appendAll(result.list);
            this.loadMoreStatus = this.hasMore ? LoadMoreStatus.IDLE : LoadMoreStatus.NO_MORE;
        }
        catch (e) {
            Logger.e(TAG, 'loadMore failed', e as Object);
            this.loadMoreStatus = LoadMoreStatus.FAILED;
        }
        finally {
            this.loading = false;
        }
    }
    async removeHistory(keyword: string): Promise<void> {
        this.history = await HistoryStore.removeSearchHistory(keyword);
    }
    async clearHistory(): Promise<void> {
        await HistoryStore.clearSearchHistory();
        this.history = [];
        if (this.hotRecipes.length === 0) {
            await this.loadHot();
        }
    }
    private buildQuery(page: number): RecipeQuery {
        const query: RecipeQuery = new RecipeQuery();
        query.keyword = this.keyword.trim();
        query.sort = RecipeSort.LATEST;
        query.page = page;
        query.size = PAGE_SIZE;
        return query;
    }
}
