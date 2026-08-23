import { PageState } from "@bundle:com.eatapp.recipe/entry/ets/commons/model/PageState";
import type { RecipeDetail } from '../../../commons/model/Recipe';
import { AuthService } from "@bundle:com.eatapp.recipe/entry/ets/commons/auth/AuthService";
import { readableMessage } from "@bundle:com.eatapp.recipe/entry/ets/commons/network/Errors";
import type { CountResultDto } from '../../../commons/network/dto/Common';
import { RecipeRepository } from "@bundle:com.eatapp.recipe/entry/ets/commons/repository/RecipeRepository";
import { HistoryStore } from "@bundle:com.eatapp.recipe/entry/ets/commons/storage/HistoryStore";
import type { BrowseHistoryItem } from "@bundle:com.eatapp.recipe/entry/ets/commons/storage/HistoryStore";
import { Toast } from "@bundle:com.eatapp.recipe/entry/ets/commons/uikit/Toast";
import { Logger } from "@bundle:com.eatapp.recipe/entry/ets/commons/utils/Logger";
const TAG: string = 'DetailViewModel';
const MIN_SERVINGS: number = 1;
const MAX_SERVINGS: number = 10;
const DEBOUNCE_MS: number = 300;
@ObservedV2
export class DetailViewModel {
    @Trace
    state: PageState = new PageState();
    @Trace
    detail: RecipeDetail | null = null;
    @Trace
    servings: number = 1;
    @Trace
    favorited: boolean = false;
    @Trace
    liked: boolean = false;
    @Trace
    favoriteCount: number = 0;
    @Trace
    likeCount: number = 0;
    /** 用于触发收藏/点赞图标的弹跳动效 */
    @Trace
    favoriteBounce: number = 0;
    @Trace
    likeBounce: number = 0;
    private recipeId: string = '';
    private lastFavoriteAt: number = 0;
    private lastLikeAt: number = 0;
    async load(recipeId: string): Promise<void> {
        this.recipeId = recipeId;
        this.state.loading();
        try {
            const detail: RecipeDetail = await RecipeRepository.getDetail(recipeId);
            this.detail = detail;
            this.servings = detail.baseServings > 0 ? detail.baseServings : 1;
            this.favorited = detail.favorited;
            this.liked = detail.liked;
            this.favoriteCount = detail.favoriteCount;
            this.likeCount = detail.likeCount;
            this.state.success(true);
            await this.recordHistory(detail);
        }
        catch (e) {
            Logger.e(TAG, 'load detail failed', e as Object);
            this.state.error(readableMessage(e as Object));
        }
    }
    // ---------- 份数切换 ----------
    // 后台数据结构已支持按份换算，前台必须把这个能力用起来。
    // is_convertible = 0 的食材（"盐适量"）不随份数变化，换算逻辑见 Recipe.displayAmount。
    increaseServings(): void {
        if (this.servings < MAX_SERVINGS) {
            this.servings += 1;
        }
    }
    decreaseServings(): void {
        if (this.servings > MIN_SERVINGS) {
            this.servings -= 1;
        }
    }
    canIncrease(): boolean {
        return this.servings < MAX_SERVINGS;
    }
    canDecrease(): boolean {
        return this.servings > MIN_SERVINGS;
    }
    // ---------- 收藏与点赞 ----------
    // 乐观更新：点击立即变更图标与计数，请求失败再回滚并提示。
    // 未登录先走 requireLogin，登录成功后回调会自动把这次动作补上。
    toggleFavorite(): void {
        const now: number = Date.now();
        if (now - this.lastFavoriteAt < DEBOUNCE_MS) {
            return;
        }
        this.lastFavoriteAt = now;
        AuthService.get().requireLogin(() => this.doToggleFavorite());
    }
    toggleLike(): void {
        const now: number = Date.now();
        if (now - this.lastLikeAt < DEBOUNCE_MS) {
            return;
        }
        this.lastLikeAt = now;
        AuthService.get().requireLogin(() => this.doToggleLike());
    }
    private async doToggleFavorite(): Promise<void> {
        const target: boolean = !this.favorited;
        this.favorited = target;
        this.favoriteCount += target ? 1 : -1;
        this.favoriteBounce += 1;
        try {
            const result: CountResultDto = target
                ? await RecipeRepository.favorite(this.recipeId)
                : await RecipeRepository.unfavorite(this.recipeId);
            // 以服务端计数为准，避免并发点赞导致本地计数漂移
            this.favoriteCount = result.favoriteCount;
            Toast.show(target ? { "id": 16777337, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" } : { "id": 16777338, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
        }
        catch (e) {
            Logger.e(TAG, 'toggle favorite failed', e as Object);
            this.favorited = !target;
            this.favoriteCount += target ? -1 : 1;
            Toast.show({ "id": 16777280, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
        }
    }
    private async doToggleLike(): Promise<void> {
        const target: boolean = !this.liked;
        this.liked = target;
        this.likeCount += target ? 1 : -1;
        this.likeBounce += 1;
        try {
            const result: CountResultDto = target
                ? await RecipeRepository.like(this.recipeId)
                : await RecipeRepository.unlike(this.recipeId);
            this.likeCount = result.likeCount;
            Toast.show(target ? { "id": 16777349, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" } : { "id": 16777350, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
        }
        catch (e) {
            Logger.e(TAG, 'toggle like failed', e as Object);
            this.liked = !target;
            this.likeCount += target ? -1 : 1;
            Toast.show({ "id": 16777280, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
        }
    }
    /** 浏览历史只存本地（preferences），第一期不建后端表 */
    private async recordHistory(detail: RecipeDetail): Promise<void> {
        const item: BrowseHistoryItem = {
            id: detail.id,
            name: detail.name,
            coverImage: detail.coverImage,
            time: Date.now()
        };
        await HistoryStore.addBrowseHistory(item);
    }
}
