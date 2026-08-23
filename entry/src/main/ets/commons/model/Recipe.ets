/**
 * 食谱领域模型。
 *
 * ⚠️ 所有 ID 一律 string：后端主键是雪花算法 BIGINT，超出 JS number 安全整数范围，
 *    用 number 接收会静默丢失精度。后端 Jackson 需将 Long 序列化为 String。
 *
 * 这些结构与接口返回的 JSON 逐字段一致，因此同时充当 DTO——
 * 按编码约定 7.2，纯 interface 无需再写一层转换；只有带 @Trace 的 class 模型才需要手写映射。
 */

/** 列表卡片项 */
export interface RecipeListItem {
  id: string;
  name: string;
  coverImage: string;      // 缩略图 URL
  difficulty: number;      // 1-5
  cookTime: number;        // 分钟
  favoriteCount: number;
  likeCount: number;
  tagName: string;
}

export interface RecipeIngredient {
  id: string;
  ingredientId: string;
  name: string;
  amount: number;
  unit: string;
  isOptional: boolean;      // 可选食材
  isConvertible: boolean;   // 是否参与份量换算（"盐适量"为 false）
  remark: string;
  sort: number;
}

export interface RecipeStep {
  id: string;
  sort: number;
  content: string;
  image: string;            // 可为空串；AI 生成食谱的步骤恒为空串
}

export interface RecipeTip {
  id: string;
  sort: number;
  content: string;
}

export interface RecipeTag {
  id: string;
  name: string;
  recipeCount: number;      // 接口聚合字段，由后端 COUNT 得出
  sort: number;
}

/** 详情 */
export interface RecipeDetail {
  id: string;
  name: string;
  coverImage: string;      // 中图 URL
  summary: string;
  difficulty: number;
  calorie: number;         // 整道菜总热量（大卡）
  cookTime: number;
  baseServings: number;    // 基准份数
  tagId: string;
  tagName: string;
  favoriteCount: number;
  likeCount: number;
  favorited: boolean;      // 未登录恒为 false
  liked: boolean;
  ingredients: RecipeIngredient[];
  steps: RecipeStep[];
  tips: RecipeTip[];
}

/** 列表排序方式，值与 GET /recipes 的 sort 参数一一对应 */
export enum RecipeSort {
  LATEST = 'latest',
  FAVORITE = 'favorite',
  LIKE = 'like'
}

/** 食谱列表查询条件。页面间传参用类型化对象，不传裸 Map。 */
export class RecipeQuery {
  tagId: string = '';
  keyword: string = '';
  sort: RecipeSort = RecipeSort.LATEST;
  difficulties: number[] = [];
  maxCookTime: number = 0;   // 0 表示不限
  minCookTime: number = 0;
  page: number = 1;
  size: number = 20;
}

/**
 * 份数换算：不可换算的食材（如"盐适量"）不随份数变化。
 * 每份热量始终为 calorie / baseServings，不参与换算。
 */
export function displayAmount(ing: RecipeIngredient, current: number, base: number): number {
  if (!ing.isConvertible || base <= 0) {
    return ing.amount;
  }
  return ing.amount * current / base;
}
