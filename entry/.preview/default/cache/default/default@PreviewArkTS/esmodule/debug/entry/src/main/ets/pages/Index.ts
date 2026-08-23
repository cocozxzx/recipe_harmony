if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
import { AuthService } from "@bundle:com.eatapp.recipe/entry/ets/commons/auth/AuthService";
import { LoginSheet } from "@bundle:com.eatapp.recipe/entry/ets/commons/auth/LoginSheet";
import { AppNavState, AppTab, NavUtil } from "@bundle:com.eatapp.recipe/entry/ets/commons/router/NavUtil";
import { Motion } from "@bundle:com.eatapp.recipe/entry/ets/commons/uikit/Theme";
import { AiPage } from "@bundle:com.eatapp.recipe/entry/ets/features/ai/pages/AiPage";
import { CategoryPage } from "@bundle:com.eatapp.recipe/entry/ets/features/category/pages/CategoryPage";
import { HomePage } from "@bundle:com.eatapp.recipe/entry/ets/features/home/pages/HomePage";
import { MinePage } from "@bundle:com.eatapp.recipe/entry/ets/features/user/pages/MinePage";
import { routeMap } from "@bundle:com.eatapp.recipe/entry/ets/router/RouteMap";
class Index extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.stack = new NavPathStack();
        this.nav = AppNavState.get();
        this.auth = AuthService.get();
        this.tabsController = new TabsController();
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
        this.stack = new NavPathStack();
        this.nav = AppNavState.get();
        this.auth = AuthService.get();
        this.resetMonitorsOnReuse();
    }
    @Local
    stack: NavPathStack;
    @Local
    nav: AppNavState;
    @Local
    auth: AuthService;
    private tabsController: TabsController;
    aboutToAppear(): void {
        NavUtil.bind(this.stack);
    }
    /** 其他页面通过 NavUtil.switchTab 改状态，这里负责真正切 Tab */
    @Monitor('nav.tabIndex')
    onTabIndexChanged(): void {
        this.tabsController.changeIndex(this.nav.tabIndex);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Navigation.create(this.stack, { moduleName: "entry", pagePath: "entry/src/main/ets/pages/Index", isUserCreateStack: true });
            Navigation.debugLine("entry/src/main/ets/pages/Index.ets(39:5)", "entry");
            Navigation.mode(NavigationMode.Auto);
            Navigation.hideTitleBar(true);
            Navigation.navDestination({ builder: routeMap.bind(this) });
            Navigation.backgroundColor({ "id": 16777232, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Navigation.bindSheet({ value: this.auth.sheetVisible, changeEvent: newValue => { this.auth.sheetVisible = newValue; } }, { builder: () => {
                    this.loginSheet.call(this);
                } }, {
                detents: [SheetSize.MEDIUM, SheetSize.LARGE],
                showClose: false,
                dragBar: true,
                backgroundColor: { "id": 16777234, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                onDisappear: () => {
                    // 下滑关闭也要走取消流程，否则 pending action 会残留到下次登录
                    if (!this.auth.isLogin) {
                        this.auth.onLoginCancelled();
                    }
                }
            });
        }, Navigation);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Tabs.create({ barPosition: BarPosition.End, controller: this.tabsController });
            Tabs.debugLine("entry/src/main/ets/pages/Index.ets(40:7)", "entry");
            Tabs.barMode(BarMode.Fixed);
            Tabs.scrollable(false);
            Tabs.animationDuration(Motion.duration);
            Tabs.barBackgroundColor({ "id": 16777234, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Tabs.divider({ strokeWidth: 1, color: { "id": 16777238, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" } });
            Tabs.width('100%');
            Tabs.height('100%');
            Tabs.onChange((index: number) => {
                this.nav.tabIndex = index;
                // AI 需登录：切到该 Tab 时直接半屏拉起登录，不让用户先看到一个空页面再去找入口
                if (index === AppTab.AI && !this.auth.isLogin) {
                    this.auth.requireLogin(() => { });
                }
            });
        }, Tabs);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TabContent.create(() => {
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new HomePage(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 42, col: 11 });
                            ViewV2.create(componentCall);
                            let paramsLambda = () => {
                                return {};
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                    }, { name: "HomePage" });
                }
            });
            TabContent.tabBar({ builder: () => {
                    this.tabBar.call(this, AppTab.HOME, { "id": 16777415, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }, { "id": 16777267, "type": 20000, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }, { "id": 16777265, "type": 20000, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                } });
            TabContent.debugLine("entry/src/main/ets/pages/Index.ets(41:9)", "entry");
        }, TabContent);
        TabContent.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TabContent.create(() => {
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new CategoryPage(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 48, col: 11 });
                            ViewV2.create(componentCall);
                            let paramsLambda = () => {
                                return {};
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                    }, { name: "CategoryPage" });
                }
            });
            TabContent.tabBar({ builder: () => {
                    this.tabBar.call(this, AppTab.CATEGORY, { "id": 16777414, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }, { "id": 16777261, "type": 20000, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }, { "id": 16777418, "type": 20000, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                } });
            TabContent.debugLine("entry/src/main/ets/pages/Index.ets(47:9)", "entry");
        }, TabContent);
        TabContent.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TabContent.create(() => {
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new AiPage(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 54, col: 11 });
                            ViewV2.create(componentCall);
                            let paramsLambda = () => {
                                return {};
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                    }, { name: "AiPage" });
                }
            });
            TabContent.tabBar({ builder: () => {
                    this.tabBar.call(this, AppTab.AI, { "id": 16777413, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }, { "id": 16777250, "type": 20000, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }, { "id": 16777253, "type": 20000, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                } });
            TabContent.debugLine("entry/src/main/ets/pages/Index.ets(53:9)", "entry");
        }, TabContent);
        TabContent.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TabContent.create(() => {
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new MinePage(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 60, col: 11 });
                            ViewV2.create(componentCall);
                            let paramsLambda = () => {
                                return {};
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                    }, { name: "MinePage" });
                }
            });
            TabContent.tabBar({ builder: () => {
                    this.tabBar.call(this, AppTab.MINE, { "id": 16777416, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }, { "id": 16777448, "type": 20000, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }, { "id": 16777450, "type": 20000, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                } });
            TabContent.debugLine("entry/src/main/ets/pages/Index.ets(59:9)", "entry");
        }, TabContent);
        TabContent.pop();
        Tabs.pop();
        Navigation.pop();
    }
    tabBar(index: AppTab, label: ResourceStr, icon: Resource, iconSelected: Resource, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 4 });
            Column.debugLine("entry/src/main/ets/pages/Index.ets(101:5)", "entry");
            Column.width('100%');
            Column.height('100%');
            Column.justifyContent(FlexAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(this.nav.tabIndex === index ? iconSelected : icon);
            Image.debugLine("entry/src/main/ets/pages/Index.ets(102:7)", "entry");
            Image.width({ "id": 16777433, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Image.height({ "id": 16777433, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Image.fillColor(this.nav.tabIndex === index ? { "id": 16777235, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" } : { "id": 16777248, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(label);
            Text.debugLine("entry/src/main/ets/pages/Index.ets(106:7)", "entry");
            Text.fontSize({ "id": 16777428, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Text.fontColor(this.nav.tabIndex === index ? { "id": 16777235, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" } : { "id": 16777248, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
        }, Text);
        Text.pop();
        Column.pop();
    }
    loginSheet(parent = null) {
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new LoginSheet(this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/pages/Index.ets", line: 117, col: 5 });
                    ViewV2.create(componentCall);
                    let paramsLambda = () => {
                        return {};
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "LoginSheet" });
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "Index";
    }
}
registerNamedRoute(() => new Index(undefined, {}), "", { bundleName: "com.eatapp.recipe", moduleName: "entry", pagePath: "pages/Index", pageFullPath: "entry/src/main/ets/pages/Index", integratedHsp: "false", moduleType: "followWithHap" });
