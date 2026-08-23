import type AbilityConstant from "@ohos:app.ability.AbilityConstant";
import UIAbility from "@ohos:app.ability.UIAbility";
import type Want from "@ohos:app.ability.Want";
import type window from "@ohos:window";
import { ImageKnife } from "@package:pkg_modules/.ohpm/@ohos+imageknife@3.2.10/pkg_modules/@ohos/imageknife/index";
import { AuthService } from "@bundle:com.eatapp.recipe/entry/ets/commons/auth/AuthService";
import { PreferenceUtil } from "@bundle:com.eatapp.recipe/entry/ets/commons/storage/PreferenceUtil";
import { Logger } from "@bundle:com.eatapp.recipe/entry/ets/commons/utils/Logger";
import { Strings } from "@bundle:com.eatapp.recipe/entry/ets/commons/utils/Strings";
const TAG: string = 'EntryAbility';
export default class EntryAbility extends UIAbility {
    async onCreate(want: Want, launchParam: AbilityConstant.LaunchParam): Promise<void> {
        Logger.i(TAG, 'onCreate');
        // 顺序有讲究：Strings / preferences 必须先就绪，
        // 否则 TokenManager.restore 与网络层的文案读取都会拿到空值。
        Strings.init(this.context);
        await PreferenceUtil.init(this.context);
        try {
            ImageKnife.getInstance().initFileCache(this.context, 256, 256 * 1024 * 1024);
        }
        catch (e) {
            Logger.e(TAG, 'init imageknife failed', e as Object);
        }
        // 不做启动强制登录：这里只恢复已有登录态，没有 token 就以游客身份进首页
        await AuthService.bootstrap();
    }
    onDestroy(): void {
        Logger.i(TAG, 'onDestroy');
    }
    async onWindowStageCreate(windowStage: window.WindowStage): Promise<void> {
        try {
            await windowStage.loadContent('pages/Index');
            const mainWindow: window.Window = windowStage.getMainWindowSync();
            // 沉浸式：首页封面大图与详情页通栏图需要延伸到状态栏下方
            await mainWindow.setWindowLayoutFullScreen(false);
            await mainWindow.setWindowSystemBarProperties({
                statusBarContentColor: '#2D3A34'
            });
        }
        catch (e) {
            Logger.e(TAG, 'onWindowStageCreate failed', e as Object);
        }
    }
    onWindowStageDestroy(): void {
        Logger.i(TAG, 'onWindowStageDestroy');
    }
    onForeground(): void {
        Logger.d(TAG, 'onForeground');
    }
    onBackground(): void {
        Logger.d(TAG, 'onBackground');
    }
}
