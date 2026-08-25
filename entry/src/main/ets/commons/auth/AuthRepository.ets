import { ApiPaths } from '../network/ApiPaths';
import { HttpClient } from '../network/HttpClient';
import { EmptyDto } from '../network/dto/Common';
import {
  HuaweiLoginReq,
  PasswordLoginReq,
  RegisterReq,
  SCENE_LOGIN,
  SmsCodeReq,
  SmsLoginReq,
  UpdateProfileReq
} from '../network/dto/Requests';
import { AuthResult, CaptchaInfo, UserInfo } from '../model/User';

/**
 * 认证与个人资料的数据来源。
 *
 * 登录态是跨 feature 的能力（收藏、AI、我的都要用），所以放在 commons，
 * 而不是塞进 features/user——否则其他 feature 想用就得跨 feature import。
 *
 * AuthResult / UserInfo 是纯 interface，与接口 JSON 逐字段一致，
 * 按编码约定 7.2 无需再写一层 DTO→模型的转换。
 */
export class AuthRepository {
  static async loginByHuawei(authCode: string): Promise<AuthResult> {
    const body: HuaweiLoginReq = { authCode: authCode };
    return HttpClient.post<AuthResult>(ApiPaths.AUTH_HUAWEI, body);
  }

  /** scene 决定这条码能用在哪：登录码换不了注册，反之亦然 */
  static async sendSmsCode(phone: string, scene: string = SCENE_LOGIN): Promise<void> {
    const body: SmsCodeReq = { phone: phone, scene: scene };
    await HttpClient.post<EmptyDto>(ApiPaths.AUTH_SMS_CODE, body);
  }

  static async loginBySms(phone: string, code: string): Promise<AuthResult> {
    const body: SmsLoginReq = { phone: phone, code: code };
    return HttpClient.post<AuthResult>(ApiPaths.AUTH_SMS_LOGIN, body);
  }

  static async loginByPassword(account: string, password: string,
    captchaKey: string, captchaCode: string): Promise<AuthResult> {
    const body: PasswordLoginReq = {
      account: account, password: password, captchaKey: captchaKey, captchaCode: captchaCode
    };
    return HttpClient.post<AuthResult>(ApiPaths.AUTH_PASSWORD_LOGIN, body);
  }

  static async getCaptcha(): Promise<CaptchaInfo> {
    return HttpClient.get<CaptchaInfo>(ApiPaths.AUTH_CAPTCHA);
  }

  /** 注册成功后端直接返回登录态，不用再回登录页 */
  static async register(phone: string, code: string, password: string,
    nickname: string): Promise<AuthResult> {
    const body: RegisterReq = {
      phone: phone, code: code, password: password, nickname: nickname
    };
    return HttpClient.post<AuthResult>(ApiPaths.AUTH_REGISTER, body);
  }

  static async logout(): Promise<void> {
    await HttpClient.post<EmptyDto>(ApiPaths.AUTH_LOGOUT);
  }

  /** 注销账号：后端负责删除账号信息、收藏、点赞、AI 记录 */
  static async deleteAccount(): Promise<void> {
    await HttpClient.del<EmptyDto>(ApiPaths.AUTH_ACCOUNT);
  }

  static async getMe(): Promise<UserInfo> {
    return HttpClient.get<UserInfo>(ApiPaths.ME);
  }

  static async updateProfile(nickname: string, avatar: string): Promise<UserInfo> {
    const body: UpdateProfileReq = { nickname: nickname, avatar: avatar };
    return HttpClient.put<UserInfo>(ApiPaths.ME, body);
  }
}
