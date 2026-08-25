/**
 * 请求体结构。ArkTS 不支持无类型标注的对象字面量，
 * 每个 POST/PUT 的 body 都需要在这里有对应的 interface。
 */

export interface HuaweiLoginReq {
  authCode: string;
}

export interface SmsCodeReq {
  phone: string;
  scene: string;            // SCENE_LOGIN | SCENE_REGISTER
}

export interface SmsLoginReq {
  phone: string;
  code: string;
}

export interface PasswordLoginReq {
  account: string;          // 手机号或邮箱，后端自行判断
  password: string;
  captchaKey: string;       // 取自 /auth/captcha
  captchaCode: string;      // 图形验证码答案，后端不区分大小写
}

export interface RegisterReq {
  phone: string;
  code: string;             // 短信验证码，scene=REGISTER
  password: string;
  nickname: string;         // 留空由后端生成
}

export interface RefreshReq {
  refreshToken: string;
}

export interface UpdateProfileReq {
  nickname: string;
  avatar: string;
}

export interface AiChatReq {
  message: string;
}

export const SCENE_LOGIN: string = 'LOGIN';
export const SCENE_REGISTER: string = 'REGISTER';
