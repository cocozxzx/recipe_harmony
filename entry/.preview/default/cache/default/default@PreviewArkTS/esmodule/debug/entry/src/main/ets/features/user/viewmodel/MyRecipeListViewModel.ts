import { PageState } from "@bundle:com.eatapp.recipe/entry/ets/commons/model/PageState";
import type { RecipeListItem } from '../../../commons/model/Recipe';
import { readableMessage } from "@bundle:com.eatapp.recipe/entry/ets/commons/network/Errors";
import type { PageResultDto } from '../../../commons/network/dto/Common';
import { RecipeRepository } from "@bundle:com.eatapp.recipe/entry/ets/commons/repository/RecipeRepository";
import { LazyDataSource } from "@bundle:com.eatapp.recipe/entry/ets/commons/uikit/LazyDataSource";
import { LoadMoreStatus } from "@bundle:com.eatapp.recipe/entry/ets/commons/uikit/LoadMoreFooter";
import { Logger } from "@bundle:com.eatapp.recipe/entry/ets/commons/utils/Logger";
const TAG: string = 'MyRecipeListViewModel';
const PAGE_SIZE: number = 20;
/** "我的收藏"与"我的点赞"结构完全一致，只差数据源，用一个枚举区分 */
export enum MyListSource {
    FAVORITES = 0,
    LIKES = 1
}
@ObservedV2
export class MyRecipeListViewModel {
    @Trace
    state: PageState = new PageState();
    @Trace
    loadMoreStatus: LoadMoreStatus = LoadMoreStatus.IDLE;
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
        }
        catch (e) {
            Logger.e(TAG, 'load failed', e as Object);
            this.state.error(readableMessage(e as Object));
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
        }
        catch (e) {
            Logger.e(TAG, 'loadMore failed', e as Object);
            this.loadMoreStatus = LoadMoreStatus.FAILED;
        }
        finally {
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
