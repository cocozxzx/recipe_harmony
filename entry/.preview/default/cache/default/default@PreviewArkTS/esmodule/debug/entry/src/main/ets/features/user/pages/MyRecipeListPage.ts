if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
import type { RecipeListItem } from '../../../commons/model/Recipe';
import { NavUtil } from "@bundle:com.eatapp.recipe/entry/ets/commons/router/NavUtil";
import { RouteNames } from "@bundle:com.eatapp.recipe/entry/ets/commons/router/RouteNames";
import type { RecipeDetailParam } from "@bundle:com.eatapp.recipe/entry/ets/commons/router/RouteNames";
import { LoadMoreFooter } from "@bundle:com.eatapp.recipe/entry/ets/commons/uikit/LoadMoreFooter";
import { RecipeRow } from "@bundle:com.eatapp.recipe/entry/ets/commons/uikit/RecipeRow";
import { StateView } from "@bundle:com.eatapp.recipe/entry/ets/commons/uikit/StateView";
import { TopBar } from "@bundle:com.eatapp.recipe/entry/ets/commons/uikit/TopBar";
import { MyListSource, MyRecipeListViewModel } from "@bundle:com.eatapp.recipe/entry/ets/features/user/viewmodel/MyRecipeListViewModel";
export class MyRecipeListPage extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.initParam("source", (params && "source" in params) ? params.source : MyListSource.FAVORITES);
        this.vm = new MyRecipeListViewModel();
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
        this.resetParam("source", (params && "source" in params) ? params.source : MyListSource.FAVORITES);
        this.vm = new MyRecipeListViewModel();
    }
    @Param
    readonly source: MyListSource;
    @Local
    vm: MyRecipeListViewModel;
    aboutToAppear(): void {
        this.vm.load(this.source);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/features/user/pages/MyRecipeListPage.ets(21:5)", "entry");
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor({ "id": 16777232, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
        }, Column);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new TopBar(this, {
                        title: this.source === MyListSource.FAVORITES
                            ? { "id": 16777386, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" } : { "id": 16777392, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/features/user/pages/MyRecipeListPage.ets", line: 22, col: 7 });
                    ViewV2.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: this.source === MyListSource.FAVORITES
                                ? { "id": 16777386, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" } : { "id": 16777392, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        title: this.source === MyListSource.FAVORITES
                            ? { "id": 16777386, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" } : { "id": 16777392, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }
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
                        status: this.vm.state.status,
                        errorMessage: this.vm.state.errorMessage,
                        onRetry: () => this.vm.load(this.source),
                        content: () => { this.listView(); }
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/features/user/pages/MyRecipeListPage.ets", line: 28, col: 7 });
                    ViewV2.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            status: this.vm.state.status,
                            errorMessage: this.vm.state.errorMessage,
                            onRetry: () => this.vm.load(this.source),
                            content: () => { this.listView(); }
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        status: this.vm.state.status,
                        errorMessage: this.vm.state.errorMessage
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
            List.debugLine("entry/src/main/ets/features/user/pages/MyRecipeListPage.ets(43:5)", "entry");
            List.width('100%');
            List.height('100%');
            List.padding({ left: { "id": 16777440, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }, right: { "id": 16777440, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" } });
            List.scrollBar(BarState.Off);
            List.cachedCount(3);
            List.onReachEnd(() => this.vm.loadMore());
        }, List);
        {
            const __lazyForEachItemGenFunction = _item => {
                const item = _item;
                {
                    const itemCreation2 = (elmtId, isInitialRender) => {
                        ListItem.create(() => { }, false);
                        ListItem.debugLine("entry/src/main/ets/features/user/pages/MyRecipeListPage.ets(45:9)", "entry");
                    };
                    const observedDeepRender = () => {
                        this.observeComponentCreation2(itemCreation2, ListItem);
                        {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                if (isInitialRender) {
                                    let componentCall = new RecipeRow(this, {
                                        item: item,
                                        onTap: (target: RecipeListItem) => {
                                            const param: RecipeDetailParam = { recipeId: target.id };
                                            NavUtil.push(RouteNames.RECIPE_DETAIL, param);
                                        }
                                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/features/user/pages/MyRecipeListPage.ets", line: 46, col: 11 });
                                    ViewV2.create(componentCall);
                                    let paramsLambda = () => {
                                        return {
                                            item: item,
                                            onTap: (target: RecipeListItem) => {
                                                const param: RecipeDetailParam = { recipeId: target.id };
                                                NavUtil.push(RouteNames.RECIPE_DETAIL, param);
                                            }
                                        };
                                    };
                                    componentCall.paramsGenerator_ = paramsLambda;
                                }
                                else {
                                    this.updateStateVarsOfChildByElmtId(elmtId, {
                                        item: item
                                    });
                                }
                            }, { name: "RecipeRow" });
                        }
                        ListItem.pop();
                    };
                    observedDeepRender();
                }
            };
            const __lazyForEachItemIdFunc = (item: RecipeListItem) => item.id;
            LazyForEach.create("1", this, this.vm.items, __lazyForEachItemGenFunction, __lazyForEachItemIdFunc);
            LazyForEach.pop();
        }
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
                ListItem.debugLine("entry/src/main/ets/features/user/pages/MyRecipeListPage.ets(56:7)", "entry");
            };
            const deepRenderFunction = (elmtId, isInitialRender) => {
                itemCreation(elmtId, isInitialRender);
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new LoadMoreFooter(this, { status: this.vm.loadMoreStatus, onRetry: () => this.vm.loadMore() }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/features/user/pages/MyRecipeListPage.ets", line: 57, col: 9 });
                            ViewV2.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    status: this.vm.loadMoreStatus,
                                    onRetry: () => this.vm.loadMore()
                                };
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {
                                status: this.vm.loadMoreStatus
                            });
                        }
                    }, { name: "LoadMoreFooter" });
                }
                ListItem.pop();
            };
            this.observeComponentCreation2(itemCreation2, ListItem);
            ListItem.pop();
        }
        List.pop();
    }
    public updateStateVars(params) {
        if (params === undefined) {
            return;
        }
        if ("source" in params) {
            this.updateParam("source", params.source);
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
}
