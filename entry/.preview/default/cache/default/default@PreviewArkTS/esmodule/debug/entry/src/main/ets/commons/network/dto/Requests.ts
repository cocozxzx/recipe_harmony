/**
 * 请求体结构。ArkTS 不支持无类型标注的对象字面量，
 * 每个 POST/PUT 的 body 都需要在这里有对应的 interface。
 */
export interface HuaweiLoginReq {
    authCode: string;
}
export interface SmsCodeReq {
    phone: string;
    scene: string; // 目前固定 "LOGIN"
}
export interface SmsLoginReq {
    phone: string;
    code: string;
}
export interface PasswordLoginReq {
    account: string; // 手机号或邮箱，后端自行判断
    password: string;
}
export interface EmailCodeReq {
    email: string;
    scene: string;
}
export interface EmailLoginReq {
    email: string;
    code: string;
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
