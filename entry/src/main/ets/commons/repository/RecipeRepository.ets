import { RecipeDetail, RecipeListItem, RecipeQuery, RecipeTag } from '../model/Recipe';
import { ApiPaths } from '../network/ApiPaths';
import { HttpClient, QueryParams } from '../network/HttpClient';
import { CountResultDto, EmptyDto, PageResultDto } from '../network/dto/Common';

/**
 * 食谱内容的数据来源。
 *
 * 首页、分类、搜索、"我的收藏"都要查同一个 `GET /recipes`，
 * 若按 feature 各写一份就得跨 feature import（违反依赖方向），
 * 因此这层下沉到 commons，各 feature 的 Repository 只做自己独有的聚合。
 */
export class RecipeRepository {
  static async getTags(): Promise<RecipeTag[]> {
    return HttpClient.get<RecipeTag[]>(ApiPaths.TAGS);
  }

  static async getRecipes(query: RecipeQuery): Promise<PageResultDto<RecipeListItem>> {
    const params: QueryParams = new QueryParams();
    params.put('tagId', query.tagId);
    params.put('keyword', query.keyword);
    params.put('sort', query.sort as string);
    if (query.difficulties.length > 0) {
      params.put('difficulty', query.difficulties.join(','));
    }
    params.putPositive('minCookTime', query.minCookTime);
    params.putPositive('maxCookTime', query.maxCookTime);
    params.putNumber('page', query.page);
    params.putNumber('size', query.size);
    return HttpClient.get<PageResultDto<RecipeListItem>>(ApiPaths.RECIPES, params);
  }

  static async getDetail(id: string): Promise<RecipeDetail> {
    return HttpClient.get<RecipeDetail>(ApiPaths.recipeDetail(id));
  }

  // ---------- 收藏与点赞 ----------
  // 全部需登录；重复操作后端幂等返回成功，前端不必额外判重

  static async favorite(id: string): Promise<CountResultDto> {
    return HttpClient.post<CountResultDto>(ApiPaths.recipeFavorite(id));
  }

  static async unfavorite(id: string): Promise<CountResultDto> {
    return HttpClient.del<CountResultDto>(ApiPaths.recipeFavorite(id));
  }

  static async like(id: string): Promise<CountResultDto> {
    return HttpClient.post<CountResultDto>(ApiPaths.recipeLike(id));
  }

  static async unlike(id: string): Promise<CountResultDto> {
    return HttpClient.del<CountResultDto>(ApiPaths.recipeLike(id));
  }

  // ---------- 我的内容 ----------

  static async getMyFavorites(page: number, size: number): Promise<PageResultDto<RecipeListItem>> {
    return RecipeRepository.getMyList(ApiPaths.ME_FAVORITES, page, size);
  }

  static async getMyLikes(page: number, size: number): Promise<PageResultDto<RecipeListItem>> {
    return RecipeRepository.getMyList(ApiPaths.ME_LIKES, page, size);
  }

  private static async getMyList(path: string, page: number, size: number): Promise<PageResultDto<RecipeListItem>> {
    const params: QueryParams = new QueryParams();
    params.putNumber('page', page);
    params.putNumber('size', size);
    return HttpClient.get<PageResultDto<RecipeListItem>>(path, params);
  }
}
