import { RecipeListItem, RecipeQuery, RecipeSort, RecipeTag } from '../../../commons/model/Recipe';
import { ApiPaths } from '../../../commons/network/ApiPaths';
import { HttpClient } from '../../../commons/network/HttpClient';
import { PageResultDto } from '../../../commons/network/dto/Common';
import { HomeDataDto } from '../../../commons/network/dto/HomeDto';
import { RecipeRepository } from '../../../commons/repository/RecipeRepository';
import { JsonSafe } from '../../../commons/utils/JsonSafe';

const PAGE_SIZE: number = 20;

export class HomeRepository {
  static async getHomeData(): Promise<HomeDataDto> {
    const raw: Record<string, Object> = await HttpClient.get<Record<string, Object>>(ApiPaths.HOME);
    const latestRaw: Record<string, Object> | null = JsonSafe.obj(raw, 'latest');
    const latestPage: PageResultDto<RecipeListItem> = latestRaw !== null
      ? RecipeRepository.toRecipeListPageFromRecord(latestRaw) : RecipeRepository.emptyPage();
    return {
      tags: RecipeTag.fromJsonArray(JsonSafe.arr(raw, 'tags')),
      todayRecommend: RecipeListItem.fromJsonArray(JsonSafe.arr(raw, 'todayRecommend')),
      hotRecipes: RecipeListItem.fromJsonArray(JsonSafe.arr(raw, 'hotRecipes')),
      latest: latestPage
    };
  }

  static async getLatest(page: number): Promise<PageResultDto<RecipeListItem>> {
    const query: RecipeQuery = new RecipeQuery();
    query.sort = RecipeSort.LATEST;
    query.page = page;
    query.size = PAGE_SIZE;
    return RecipeRepository.getRecipes(query);
  }
}
