import { RecipeQuery, RecipeSort } from "@bundle:com.eatapp.recipe/entry/ets/commons/model/Recipe";
import type { RecipeListItem } from "@bundle:com.eatapp.recipe/entry/ets/commons/model/Recipe";
import { ApiPaths } from "@bundle:com.eatapp.recipe/entry/ets/commons/network/ApiPaths";
import { HttpClient } from "@bundle:com.eatapp.recipe/entry/ets/commons/network/HttpClient";
import type { PageResultDto } from '../../../commons/network/dto/Common';
import type { HomeDataDto } from '../../../commons/network/dto/HomeDto';
import { RecipeRepository } from "@bundle:com.eatapp.recipe/entry/ets/commons/repository/RecipeRepository";
const PAGE_SIZE: number = 20;
/**
 * 首页数据。
 * 首屏走一次聚合接口 `GET /home`，避免开屏并发四个请求；
 * "最新发布"的后续分页复用通用列表接口。
 */
export class HomeRepository {
    static async getHomeData(): Promise<HomeDataDto> {
        return HttpClient.get<HomeDataDto>(ApiPaths.HOME);
    }
    static async getLatest(page: number): Promise<PageResultDto<RecipeListItem>> {
        const query: RecipeQuery = new RecipeQuery();
        query.sort = RecipeSort.LATEST;
        query.page = page;
        query.size = PAGE_SIZE;
        return RecipeRepository.getRecipes(query);
    }
}
