import authentication from "@hms:core.authentication";
import type common from "@ohos:app.ability.common";
import type { BusinessError } from "@ohos:base";
import util from "@ohos:util";
import { Logger } from "@bundle:com.eatapp.recipe/entry/ets/commons/utils/Logger";
const TAG: string = 'HuaweiAuth';
/** 授权结果。失败时 authCode 为空，errCode/errMsg 保留 Account Kit 的原始信息。 */
export interface HuaweiAuthResult {
    authCode: string;
    errCode: number;
    errMsg: string;
}
/**
 * 华为账号一键登录（Account Kit）。
 *
 * 前端只负责换取 authCode，再交给后端 `/auth/huawei` 换取正式 token——
 * 用户资料与 openId 的获取都在后端完成，避免把 AppSecret 放进客户端。
 */
export class HuaweiAuth {
    /** 拉起华为账号授权。成功返回 serviceAuthCode，失败返回带错误码的结果 */
    static async getAuthCode(context: common.UIAbilityContext): Promise<HuaweiAuthResult> {
        try {
            const request: authentication.AuthorizationWithHuaweiIDRequest = new authentication.HuaweiIDProvider().createAuthorizationWithHuaweiIDRequest();
            request.scopes = ['profile'];
            request.permissions = ['serviceauthcode'];
            // 已授权过也强制走一次，保证每次拿到的是新鲜可用的 authCode
            request.forceAuthorization = true;
            request.state = util.generateRandomUUID();
            const controller: authentication.AuthenticationController = new authentication.AuthenticationController(context);
            const response: authentication.AuthorizationWithHuaweiIDResponse = await controller.executeRequest(request);
            const code: string = response.data?.authorizationCode ?? '';
            Logger.i(TAG, `authCode acquired: ${code.length > 0}`);
            return { authCode: code, errCode: 0, errMsg: '' };
        }
        catch (e) {
            const err: BusinessError = e as BusinessError;
            const code: number = err.code;
            const msg: string = err.message;
            // 错误码必须外抛：只打日志的话，真机上除了「登录失败」什么都看不到，无从排查
            Logger.e(TAG, `huawei authorization failed, code=${code}, msg=${msg}`);
            return { authCode: '', errCode: code, errMsg: msg };
        }
    }
}
