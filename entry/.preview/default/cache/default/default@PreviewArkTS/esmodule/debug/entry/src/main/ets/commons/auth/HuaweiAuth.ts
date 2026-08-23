import authentication from "@hms:core.authentication";
import type common from "@ohos:app.ability.common";
import util from "@ohos:util";
import { Logger } from "@bundle:com.eatapp.recipe/entry/ets/commons/utils/Logger";
const TAG: string = 'HuaweiAuth';
/**
 * 华为账号一键登录（Account Kit）。
 *
 * 前端只负责换取 authCode，再交给后端 `/auth/huawei` 换取正式 token——
 * 用户资料与 openId 的获取都在后端完成，避免把 AppSecret 放进客户端。
 */
export class HuaweiAuth {
    /** 拉起华为账号授权，返回 serviceAuthCode；用户取消或失败返回空串 */
    static async getAuthCode(context: common.UIAbilityContext): Promise<string> {
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
            return code;
        }
        catch (e) {
            Logger.e(TAG, 'huawei authorization failed', e as Object);
            return '';
        }
    }
}
