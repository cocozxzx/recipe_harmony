if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
import { PageState } from "@bundle:com.eatapp.recipe/entry/ets/commons/model/PageState";
import { NavUtil } from "@bundle:com.eatapp.recipe/entry/ets/commons/router/NavUtil";
import { RouteNames } from "@bundle:com.eatapp.recipe/entry/ets/commons/router/RouteNames";
import type { RecipeDetailParam } from "@bundle:com.eatapp.recipe/entry/ets/commons/router/RouteNames";
import { HistoryStore } from "@bundle:com.eatapp.recipe/entry/ets/commons/storage/HistoryStore";
import type { BrowseHistoryItem } from "@bundle:com.eatapp.recipe/entry/ets/commons/storage/HistoryStore";
import { ConfirmDialog } from "@bundle:com.eatapp.recipe/entry/ets/commons/uikit/ConfirmDialog";
import { NetImage } from "@bundle:com.eatapp.recipe/entry/ets/commons/uikit/NetImage";
import { StateView } from "@bundle:com.eatapp.recipe/entry/ets/commons/uikit/StateView";
import { TopBar } from "@bundle:com.eatapp.recipe/entry/ets/commons/uikit/TopBar";
import { Formatter } from "@bundle:com.eatapp.recipe/entry/ets/commons/utils/Formatter";
export class BrowseHistoryPage extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.items = [];
        this.state = new PageState();
        this.clearDialog = new CustomDialogController({
            builder: () => {
                let jsDialog = new ConfirmDialog(this, {
                    title: { "id": 16777341, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                    desc: { "id": 16777339, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                    onConfirm: () => this.clear()
                }, undefined, -1, () => { }, { page: "entry/src/main/ets/features/user/pages/BrowseHistoryPage.ets", line: 22, col: 14 });
                jsDialog.setController(this.clearDialog);
                ViewPU.create(jsDialog);
                let paramsLambda = () => {
                    return {
                        title: { "id": 16777341, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                        desc: { "id": 16777339, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                        onConfirm: () => this.clear()
                    };
                };
                jsDialog.paramsGenerator_ = paramsLambda;
            },
            alignment: DialogAlignment.Center,
            cornerRadius: 16
        }, this);
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
        this.items = [];
        this.state = new PageState();
    }
    @Local
    items: BrowseHistoryItem[];
    @Local
    state: PageState;
    private clearDialog: CustomDialogController;
    aboutToAppear(): void {
        this.load();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/features/user/pages/BrowseHistoryPage.ets(36:5)", "entry");
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor({ "id": 16777232, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
        }, Column);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new TopBar(this, {
                        title: { "id": 16777341, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                        actionIcon: { "id": 16777256, "type": 20000, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                        onAction: (): void => { this.clearDialog.open(); }
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/features/user/pages/BrowseHistoryPage.ets", line: 37, col: 7 });
                    ViewV2.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: { "id": 16777341, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                            actionIcon: { "id": 16777256, "type": 20000, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                            onAction: (): void => { this.clearDialog.open(); }
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        title: { "id": 16777341, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                        actionIcon: { "id": 16777256, "type": 20000, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }
                    });
                }
            }, { name: "TopBar" });
        }
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            __Common__.create();
            __Common__.layoutWeight(1);
        }, __Common__);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new StateView(this, {
                        status: this.state.status,
                        errorMessage: this.state.errorMessage,
                        emptyText: { "id": 16777340, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                        onRetry: () => this.load(),
                        content: () => { this.listView(); }
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/features/user/pages/BrowseHistoryPage.ets", line: 43, col: 7 });
                    ViewV2.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            status: this.state.status,
                            errorMessage: this.state.errorMessage,
                            emptyText: { "id": 16777340, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                            onRetry: () => this.load(),
                            content: () => { this.listView(); }
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        status: this.state.status,
                        errorMessage: this.state.errorMessage,
                        emptyText: { "id": 16777340, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }
                    });
                }
            }, { name: "StateView" });
        }
        __Common__.pop();
        Column.pop();
    }
    listView(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            List.create();
            List.debugLine("entry/src/main/ets/features/user/pages/BrowseHistoryPage.ets(59:5)", "entry");
            List.width('100%');
            List.height('100%');
            List.padding({ left: { "id": 16777440, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }, right: { "id": 16777440, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" } });
            List.divider({ strokeWidth: 1, color: { "id": 16777238, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" } });
            List.scrollBar(BarState.Off);
        }, List);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const item = _item;
                {
                    const itemCreation = (elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        ListItem.create(deepRenderFunction, true);
                        if (!isInitialRender) {
                            ListItem.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    };
                    const itemCreation2 = (elmtId, isInitialRender) => {
                        ListItem.create(deepRenderFunction, true);
                        ListItem.swipeAction({ end: this.deleteButton.bind(this, item) });
                        ListItem.debugLine("entry/src/main/ets/features/user/pages/BrowseHistoryPage.ets(61:9)", "entry");
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Row.create({ space: 12 });
                            Row.debugLine("entry/src/main/ets/features/user/pages/BrowseHistoryPage.ets(62:11)", "entry");
                            Row.width('100%');
                            Row.padding({ top: { "id": 16777441, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }, bottom: { "id": 16777441, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" } });
                            Row.onClick(() => {
                                const param: RecipeDetailParam = { recipeId: item.id };
                                NavUtil.push(RouteNames.RECIPE_DETAIL, param);
                            });
                        }, Row);
                        {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                if (isInitialRender) {
                                    let componentCall = new NetImage(this, {
                                        url: item.coverImage,
                                        imgWidth: 80,
                                        imgHeight: 60,
                                        radius: { "id": 16777437, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }
                                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/features/user/pages/BrowseHistoryPage.ets", line: 63, col: 13 });
                                    ViewV2.create(componentCall);
                                    let paramsLambda = () => {
                                        return {
                                            url: item.coverImage,
                                            imgWidth: 80,
                                            imgHeight: 60,
                                            radius: { "id": 16777437, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }
                                        };
                                    };
                                    componentCall.paramsGenerator_ = paramsLambda;
                                }
                                else {
                                    this.updateStateVarsOfChildByElmtId(elmtId, {
                                        url: item.coverImage,
                                        imgWidth: 80,
                                        imgHeight: 60,
                                        radius: { "id": 16777437, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }
                                    });
                                }
                            }, { name: "NetImage" });
                        }
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Column.create({ space: 6 });
                            Column.debugLine("entry/src/main/ets/features/user/pages/BrowseHistoryPage.ets(69:13)", "entry");
                            Column.alignItems(HorizontalAlign.Start);
                            Column.layoutWeight(1);
                        }, Column);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(item.name);
                            Text.debugLine("entry/src/main/ets/features/user/pages/BrowseHistoryPage.ets(70:15)", "entry");
                            Text.fontSize({ "id": 16777426, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                            Text.fontColor({ "id": 16777246, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                            Text.maxLines(2);
                            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
                            Text.width('100%');
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(Formatter.historyTime(item.time));
                            Text.debugLine("entry/src/main/ets/features/user/pages/BrowseHistoryPage.ets(76:15)", "entry");
                            Text.fontSize({ "id": 16777428, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                            Text.fontColor({ "id": 16777248, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        }, Text);
                        Text.pop();
                        Column.pop();
                        Row.pop();
                        ListItem.pop();
                    };
                    this.observeComponentCreation2(itemCreation2, ListItem);
                    ListItem.pop();
                }
            };
            this.forEachUpdateFunction(elmtId, this.items, forEachItemGenFunction, (item: BrowseHistoryItem) => item.id, false, false);
        }, ForEach);
        ForEach.pop();
        List.pop();
    }
    deleteButton(item: BrowseHistoryItem, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777313, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Text.debugLine("entry/src/main/ets/features/user/pages/BrowseHistoryPage.ets(102:5)", "entry");
            Text.fontSize({ "id": 16777427, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Text.fontColor({ "id": 16777245, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Text.width(72);
            Text.height('100%');
            Text.textAlign(TextAlign.Center);
            Text.backgroundColor({ "id": 16777242, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Text.onClick(() => this.remove(item.id));
        }, Text);
        Text.pop();
    }
    private async load(): Promise<void> {
        this.state.loading();
        this.items = await HistoryStore.getBrowseHistory();
        this.state.success(this.items.length > 0);
    }
    private async remove(id: string): Promise<void> {
        this.items = await HistoryStore.removeBrowseHistory(id);
        this.state.success(this.items.length > 0);
    }
    private async clear(): Promise<void> {
        await HistoryStore.clearBrowseHistory();
        this.items = [];
        this.state.success(false);
    }
    rerender() {
        this.updateDirtyElements();
    }
}
