import { RecipeDetail, RecipeListItem, RecipeQuery, RecipeTag } from '../model/Recipe';
import { ApiPaths } from '../network/ApiPaths';
import { HttpClient, QueryParams } from '../network/HttpClient';
import { CountResultDto, PageResultDto } from '../network/dto/Common';
import { JsonSafe } from '../utils/JsonSafe';

export class RecipeRepository {
  static async getTags(): Promise<RecipeTag[]> {
    const raw: Record<string, Object>[] = await HttpClient.get<Record<string, Object>[]>(ApiPaths.TAGS);
    return RecipeTag.fromJsonArray(raw);
  }

  static async getRecipes(query: RecipeQuery): Promise<PageResultDto<RecipeListItem>> {
    const params: QueryParams = new QueryParams();
    params.put('tagId', query.tagId);
    params.put('keyword', query.keyword);
    params.put('sort', query.sort);
    if (query.difficulties.length > 0) {
      params.put('difficulty', query.difficulties.join(','));
    }
    params.putPositive('minCookTime', query.minCookTime);
    params.putPositive('maxCookTime', query.maxCookTime);
    params.putNumber('page', query.page);
    params.putNumber('size', query.size);
    const raw: PageResultDto<Record<string, Object>> = await HttpClient.get<PageResultDto<Record<string, Object>>>(ApiPaths.RECIPES, params);
    return RecipeRepository.toRecipeListPage(raw);
  }

  static async getDetail(id: string): Promise<RecipeDetail> {
    const raw: Record<string, Object> = await HttpClient.get<Record<string, Object>>(ApiPaths.recipeDetail(id));
    return RecipeDetail.fromJson(raw);
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
    const raw: PageResultDto<Record<string, Object>> = await HttpClient.get<PageResultDto<Record<string, Object>>>(path, params);
    return RecipeRepository.toRecipeListPage(raw);
  }

  static toRecipeListPage(raw: PageResultDto<Record<string, Object>>): PageResultDto<RecipeListItem> {
    const list: RecipeListItem[] = RecipeListItem.fromJsonArray(
      Array.isArray(raw.list) ? raw.list as Record<string, Object>[] : []);
    return {
      list: list,
      total: raw.total,
      page: raw.page,
      size: raw.size,
      hasMore: raw.hasMore
    };
  }

  static toRecipeListPageFromRecord(raw: Record<string, Object>): PageResultDto<RecipeListItem> {
    const list: RecipeListItem[] = RecipeListItem.fromJsonArray(JsonSafe.arr(raw, 'list'));
    return {
      list: list,
      total: JsonSafe.number(raw, 'total'),
      page: JsonSafe.number(raw, 'page', 1),
      size: JsonSafe.number(raw, 'size', 20),
      hasMore: JsonSafe.boolean(raw, 'hasMore')
    };
  }

  static emptyPage(): PageResultDto<RecipeListItem> {
    return {
      list: [],
      total: 0,
      page: 1,
      size: 20,
      hasMore: false
    };
  }
}
