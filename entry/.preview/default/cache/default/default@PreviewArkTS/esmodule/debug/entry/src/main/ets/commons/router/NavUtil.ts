import { AppStorageV2 } from "@ohos:arkui.StateManagement";
import { Logger } from "@bundle:com.eatapp.recipe/entry/ets/commons/utils/Logger";
const TAG: string = 'NavUtil';
/** 底部 Tab 序号，与 Index.ets 的 Tabs 顺序一致 */
export enum AppTab {
    HOME = 0,
    CATEGORY = 1,
    AI = 2,
    MINE = 3
}
/**
 * 跨 Tab 通信的全局状态。
 * 首页 AI 卡片、搜索空结果都需要"切到 AI Tab 并带上一句话"，
 * 而 features 之间不允许互相 import，所以把这点状态下沉到 commons。
 */
@ObservedV2
export class AppNavState {
    @Trace
    tabIndex: number = AppTab.HOME;
    /** 切到 AI Tab 时预填的输入内容，AI 页消费后要清空 */
    @Trace
    aiPrefill: string = '';
    static get(): AppNavState {
        return AppStorageV2.connect(AppNavState, 'AppNavState', () => new AppNavState())!;
    }
}
/**
 * 全局唯一的 NavPathStack 封装。
 * 实例由 Index.ets 在创建时注册，其余各处通过 NavUtil 访问，
 * 避免 NavPathStack 被逐层透传或被 features 各自持有。
 */
export class NavUtil {
    private static stack: NavPathStack | null = null;
    static bind(stack: NavPathStack): void {
        NavUtil.stack = stack;
    }
    static push(name: string, param?: Object): void {
        const stack: NavPathStack | null = NavUtil.stack;
        if (stack === null) {
            Logger.e(TAG, `push before bind: ${name}`);
            return;
        }
        stack.pushPathByName(name, param ?? null, false);
    }
    static pop(): void {
        NavUtil.stack?.pop();
    }
    static popToRoot(): void {
        NavUtil.stack?.clear();
    }
    /** 切换底部 Tab，可选带上给 AI 页的预填文案 */
    static switchTab(tab: AppTab, aiPrefill: string = ''): void {
        NavUtil.popToRoot();
        const state: AppNavState = AppNavState.get();
        state.aiPrefill = aiPrefill;
        state.tabIndex = tab;
    }
}
