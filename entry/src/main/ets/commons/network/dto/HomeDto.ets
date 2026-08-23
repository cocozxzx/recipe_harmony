import { RecipeListItem, RecipeTag } from '../../model/Recipe';
import { PageResultDto } from './Common';

/** GET /home 聚合响应 */
export interface HomeDataDto {
  tags: RecipeTag[];                      // 按 recipeCount 降序取前 8
  todayRecommend: RecipeListItem[];       // 6 道，按日期种子伪随机
  hotRecipes: RecipeListItem[];           // 收藏 TOP10
  latest: PageResultDto<RecipeListItem>;  // 最新发布第一页
}
