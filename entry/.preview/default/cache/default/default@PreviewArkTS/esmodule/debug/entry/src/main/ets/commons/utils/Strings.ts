import type resourceManager from "@ohos:resourceManager";
import type common from "@ohos:app.ability.common";
import { Logger } from "@bundle:com.eatapp.recipe/entry/ets/commons/utils/Logger";
const TAG: string = 'Strings';
/**
 * 非 UI 层（网络、存储、Service）读取资源字符串的入口。
 *
 * 这些层没有 UIContext，`$r()` 只能拿到 Resource 描述而不能直接当字符串用，
 * 所以在 EntryAbility 启动时把 resourceManager 缓存下来，供同步读取。
 * View 层仍然直接用 `$r('app.string.xxx')`，不要走这里。
 */
export class Strings {
    private static rm: resourceManager.ResourceManager | null = null;
    static init(context: common.UIAbilityContext): void {
        Strings.rm = context.resourceManager;
    }
    static get(res: Resource, fallback: string = ''): string {
        const rm: resourceManager.ResourceManager | null = Strings.rm;
        if (rm === null) {
            return fallback;
        }
        try {
            return rm.getStringSync(res.id);
        }
        catch (e) {
            Logger.w(TAG, 'getStringSync failed', e as Object);
            return fallback;
        }
    }
}
