/**
 * 路由名常量。
 *
 * features 之间禁止互相 import，跨模块跳转只依赖这里的字符串，
 * 不产生编译期依赖——这是以后能把 features 拆成 HAR 的前提。
 */
export class RouteNames {
  static readonly RECIPE_DETAIL: string = 'recipeDetail';
  static readonly SEARCH: string = 'search';
  static readonly RECIPE_LIST: string = 'recipeList';       // 通用食谱列表（热门更多 / 标签跳转）
  static readonly LOGIN: string = 'login';                  // 全屏登录页
  static readonly REGISTER: string = 'register';            // 手机号注册页
  static readonly PROFILE_EDIT: string = 'profileEdit';
  static readonly MY_FAVORITES: string = 'myFavorites';
  static readonly MY_LIKES: string = 'myLikes';
  static readonly MY_AI_RECIPES: string = 'myAiRecipes';
  static readonly BROWSE_HISTORY: string = 'browseHistory';
  static readonly ACCOUNT: string = 'account';
  static readonly ABOUT: string = 'about';
  static readonly WEB_DOC: string = 'webDoc';               // 用户协议 / 隐私政策
  static readonly AI_RECIPE_DETAIL: string = 'aiRecipeDetail';
}

/** 页面参数一律用类型化 class，不传裸 Map。 */

export class RecipeDetailParam {
  recipeId: string = '';
}

export class AiRecipeDetailParam {
  aiRecipeId: string = '';
}

export class RecipeListParam {
  title: string = '';
  tagId: string = '';
  sort: string = '';
}

export class SearchParam {
  keyword: string = '';
}

export class WebDocParam {
  title: string = '';
  docKey: string = '';
}

export const DOC_AGREEMENT: string = 'agreement';
export const DOC_PRIVACY: string = 'privacy';
