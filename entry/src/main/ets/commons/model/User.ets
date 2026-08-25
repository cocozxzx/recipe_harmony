export interface OauthBinding {
  platform: string;         // 第一期只有 'HUAWEI'
  bound: boolean;
}

export interface UserInfo {
  id: string;
  nickname: string;
  avatar: string;
  phone: string;            // 脱敏，如 138****8888；未绑定为空串
  email: string;            // 脱敏；未绑定为空串
  hasPassword: boolean;
  favoriteCount: number;
  likeCount: number;
  bindings: OauthBinding[];
}

export interface AuthResult {
  token: string;
  refreshToken: string;
  user: UserInfo;
}

/** 图形验证码。image 是 PNG 的 data URI，可直接喂给 Image 组件 */
export interface CaptchaInfo {
  captchaKey: string;
  image: string;
}

export const PLATFORM_HUAWEI: string = 'HUAWEI';
