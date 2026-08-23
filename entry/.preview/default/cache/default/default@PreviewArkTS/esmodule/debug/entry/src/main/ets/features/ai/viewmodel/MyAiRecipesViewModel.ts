import type { AiGeneratedRecipe } from '../../../commons/model/Ai';
import { PageState } from "@bundle:com.eatapp.recipe/entry/ets/commons/model/PageState";
import { readableMessage } from "@bundle:com.eatapp.recipe/entry/ets/commons/network/Errors";
import type { PageResultDto } from '../../../commons/network/dto/Common';
import { LazyDataSource } from "@bundle:com.eatapp.recipe/entry/ets/commons/uikit/LazyDataSource";
import { LoadMoreStatus } from "@bundle:com.eatapp.recipe/entry/ets/commons/uikit/LoadMoreFooter";
import { Toast } from "@bundle:com.eatapp.recipe/entry/ets/commons/uikit/Toast";
import { Logger } from "@bundle:com.eatapp.recipe/entry/ets/commons/utils/Logger";
import { AiRepository } from "@bundle:com.eatapp.recipe/entry/ets/features/ai/repository/AiRepository";
const TAG: string = 'MyAiRecipesViewModel';
const PAGE_SIZE: number = 20;
/**
 * "我的 AI 食谱"。
 * 这个页面虽然从"我的"进入，但代码放在 ai feature 下——
 * features 之间禁止互相 import，跳转只靠 RouteNames 里的字符串。
 */
@ObservedV2
export class MyAiRecipesViewModel {
    @Trace
    state: PageState = new PageState();
    @Trace
    loadMoreStatus: LoadMoreStatus = LoadMoreStatus.IDLE;
    readonly items: LazyDataSource<AiGeneratedRecipe> = new LazyDataSource<AiGeneratedRecipe>();
    private page: number = 1;
    private hasMore: boolean = true;
    private loading: boolean = false;
    async load(): Promise<void> {
        this.state.loading();
        this.page = 1;
        this.hasMore = true;
        try {
            const result: PageResultDto<AiGeneratedRecipe> = await AiRepository.getMyAiRecipes(1, PAGE_SIZE);
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
            const result: PageResultDto<AiGeneratedRecipe> = await AiRepository.getMyAiRecipes(next, PAGE_SIZE);
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
    /** 取消收藏后直接从列表移除——这个列表本身就是"我收藏的" */
    async unfavorite(index: number, recipe: AiGeneratedRecipe): Promise<void> {
        try {
            await AiRepository.unfavorite(recipe.id);
            this.items.removeAt(index);
            this.state.success(!this.items.isEmpty());
            Toast.show({ "id": 16777338, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
        }
        catch (e) {
            Logger.e(TAG, 'unfavorite failed', e as Object);
            Toast.show(readableMessage(e as Object));
        }
    }
}
