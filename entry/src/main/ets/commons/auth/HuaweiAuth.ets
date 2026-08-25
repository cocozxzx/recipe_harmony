import { loginComponentManager } from '@kit.AccountKit';
import { common } from '@kit.AbilityKit';
import { BusinessError } from '@kit.BasicServicesKit';

export interface HuaweiAuthResult {
  authCode: string;
  errCode: number;
  errMsg: string;
}

export class HuaweiAuth {
  static async getAuthCode(context: common.UIAbilityContext): Promise<HuaweiAuthResult> {
    try {
      // 通过 loginComponentManager 获取华为账号授权码
      const credential: loginComponentManager.HuaweiIDCredential =
        await loginComponentManager.getHuaweiID(context);
      const authCode: string = credential.authorizationCode !== null && credential.authorizationCode !== undefined
        ? credential.authorizationCode : '';
      return {
        authCode: authCode,
        errCode: 0,
        errMsg: ''
      };
    } catch (error) {
      const bizError: BusinessError = error;
      const errCode: number = bizError.code !== undefined && bizError.code !== null ? bizError.code : -1;
      const errMsg: string = bizError.message !== undefined && bizError.message !== null ? bizError.message : 'Unknown error';
      return {
        authCode: '',
        errCode: errCode,
        errMsg: errMsg
      };
    }
  }
}
