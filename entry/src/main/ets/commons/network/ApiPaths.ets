/**
 * 所有接口路径常量。业务代码中禁止出现裸路径字符串。
 * BaseURL 由 BuildProfile.API_BASE_URL 注入，已含 /api/app/v1 前缀。
 */
export class ApiPaths {
  // 认证
  static readonly AUTH_HUAWEI: string = '/auth/huawei';
  static readonly AUTH_SMS_CODE: string = '/auth/sms/code';
  static readonly AUTH_SMS_LOGIN: string = '/auth/sms/login';
  static readonly AUTH_PASSWORD_LOGIN: string = '/auth/password/login';
  static readonly AUTH_CAPTCHA: string = '/auth/captcha';
  static readonly AUTH_REGISTER: string = '/auth/register';
  static readonly AUTH_REFRESH: string = '/auth/refresh';
  static readonly AUTH_LOGOUT: string = '/auth/logout';
  static readonly AUTH_ACCOUNT: string = '/auth/account';

  // 内容浏览
  static readonly HOME: string = '/home';
  static readonly RECIPES: string = '/recipes';
  static readonly TAGS: string = '/tags';

  static recipeDetail(id: string): string {
    return `/recipes/${id}`;
  }

  static recipeFavorite(id: string): string {
    return `/recipes/${id}/favorite`;
  }

  static recipeLike(id: string): string {
    return `/recipes/${id}/like`;
  }

  // 个人中心
  static readonly ME: string = '/me';
  static readonly ME_AVATAR: string = '/me/avatar';
  static readonly ME_FAVORITES: string = '/me/favorites';
  static readonly ME_LIKES: string = '/me/likes';
  static readonly ME_AI_RECIPES: string = '/me/ai-recipes';

  // AI
  static readonly AI_CHAT: string = '/ai/chat';

  static aiRecipeDetail(id: string): string {
    return `/ai-recipes/${id}`;
  }

  static aiRecipeFavorite(id: string): string {
    return `/ai-recipes/${id}/favorite`;
  }
}
