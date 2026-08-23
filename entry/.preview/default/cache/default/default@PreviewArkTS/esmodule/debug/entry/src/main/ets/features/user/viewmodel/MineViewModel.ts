import { AuthService } from "@bundle:com.eatapp.recipe/entry/ets/commons/auth/AuthService";
import { readableMessage } from "@bundle:com.eatapp.recipe/entry/ets/commons/network/Errors";
import { HistoryStore } from "@bundle:com.eatapp.recipe/entry/ets/commons/storage/HistoryStore";
import { Toast } from "@bundle:com.eatapp.recipe/entry/ets/commons/uikit/Toast";
import { Logger } from "@bundle:com.eatapp.recipe/entry/ets/commons/utils/Logger";
const TAG: string = 'MineViewModel';
@ObservedV2
export class MineViewModel {
    @Trace
    working: boolean = false;
    async refresh(): Promise<void> {
        await AuthService.get().refreshUser();
    }
    /** 清除缓存：图片缓存由 ImageKnife 自行管理，这里清掉本地浏览历史即可 */
    async clearCache(): Promise<void> {
        await HistoryStore.clearBrowseHistory();
        Toast.show({ "id": 16777382, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
    }
    async logout(): Promise<void> {
        this.working = true;
        try {
            await AuthService.get().logout();
        }
        finally {
            this.working = false;
        }
    }
    /**
     * 注销账号。
     * 「注销账号」入口是华为应用市场上架的强制要求，不是可选项——
     * 必须二次确认并明确告知数据删除范围（见 ConfirmDialog 的 desc）。
     */
    async deleteAccount(): Promise<boolean> {
        this.working = true;
        try {
            await AuthService.get().deleteAccount();
            Toast.show({ "id": 16777275, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            return true;
        }
        catch (e) {
            Logger.e(TAG, 'delete account failed', e as Object);
            Toast.show(readableMessage(e as Object));
            return false;
        }
        finally {
            this.working = false;
        }
    }
}
