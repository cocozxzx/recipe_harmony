if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
import { RecipeSort } from "@bundle:com.eatapp.recipe/entry/ets/commons/model/Recipe";
import type { RecipeListItem } from "@bundle:com.eatapp.recipe/entry/ets/commons/model/Recipe";
import { NavUtil } from "@bundle:com.eatapp.recipe/entry/ets/commons/router/NavUtil";
import { RouteNames } from "@bundle:com.eatapp.recipe/entry/ets/commons/router/RouteNames";
import type { RecipeDetailParam, RecipeListParam } from "@bundle:com.eatapp.recipe/entry/ets/commons/router/RouteNames";
import { LoadMoreFooter } from "@bundle:com.eatapp.recipe/entry/ets/commons/uikit/LoadMoreFooter";
import { RecipeCard } from "@bundle:com.eatapp.recipe/entry/ets/commons/uikit/RecipeCard";
import { StateView } from "@bundle:com.eatapp.recipe/entry/ets/commons/uikit/StateView";
import { TopBar } from "@bundle:com.eatapp.recipe/entry/ets/commons/uikit/TopBar";
import { CategoryViewModel } from "@bundle:com.eatapp.recipe/entry/ets/features/category/viewmodel/CategoryViewModel";
export class RecipeListPage extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.initParam("param", (params && "param" in params) ? params.param : { title: '', tagId: '', sort: RecipeSort.LATEST as string });
        this.vm = new CategoryViewModel();
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
        this.resetParam("param", (params && "param" in params) ? params.param : { title: '', tagId: '', sort: RecipeSort.LATEST as string });
        this.vm = new CategoryViewModel();
    }
    @Param
    readonly param: RecipeListParam;
    @Local
    vm: CategoryViewModel;
    aboutToAppear(): void {
        this.vm.tagId = this.param.tagId;
        this.vm.sort = this.param.sort as RecipeSort;
        this.vm.reload();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/features/category/pages/RecipeListPage.ets(27:5)", "entry");
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor({ "id": 16777232, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
        }, Column);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new TopBar(this, { title: this.param.title }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/features/category/pages/RecipeListPage.ets", line: 28, col: 7 });
                    ViewV2.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: this.param.title
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        title: this.param.title
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
                        emptyText: { "id": 16777303, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                        onRetry: () => this.vm.reload(),
                        content: () => { this.listView(); }
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/features/category/pages/RecipeListPage.ets", line: 30, col: 7 });
                    ViewV2.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            status: this.vm.state.status,
                            errorMessage: this.vm.state.errorMessage,
                            emptyText: { "id": 16777303, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                            onRetry: () => this.vm.reload(),
                            content: () => { this.listView(); }
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        status: this.vm.state.status,
                        errorMessage: this.vm.state.errorMessage,
                        emptyText: { "id": 16777303, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }
                    });
                }
            }, { name: "StateView" });
        }
        __Common__.pop();
        Column.pop();
    }
    listView(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            WaterFlow.create({ footer: () => { this.footer(); } });
            WaterFlow.debugLine("entry/src/main/ets/features/category/pages/RecipeListPage.ets(46:5)", "entry");
            WaterFlow.columnsTemplate('1fr 1fr');
            WaterFlow.columnsGap({ "id": 16777441, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            WaterFlow.rowsGap({ "id": 16777441, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            WaterFlow.width('100%');
            WaterFlow.height('100%');
            WaterFlow.padding({ left: { "id": 16777440, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }, right: { "id": 16777440, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" } });
            WaterFlow.scrollBar(BarState.Off);
            WaterFlow.cachedCount(3);
            WaterFlow.onReachEnd(() => this.vm.loadMore());
        }, WaterFlow);
        {
            const __lazyForEachItemGenFunction = _item => {
                const item = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    FlowItem.create();
                    FlowItem.debugLine("entry/src/main/ets/features/category/pages/RecipeListPage.ets(48:9)", "entry");
                    FlowItem.width('100%');
                }, FlowItem);
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new RecipeCard(this, {
                                item: item,
                                onTap: (target: RecipeListItem) => {
                                    const detailParam: RecipeDetailParam = { recipeId: target.id };
                                    NavUtil.push(RouteNames.RECIPE_DETAIL, detailParam);
                                }
                            }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/features/category/pages/RecipeListPage.ets", line: 49, col: 11 });
                            ViewV2.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    item: item,
                                    onTap: (target: RecipeListItem) => {
                                        const detailParam: RecipeDetailParam = { recipeId: target.id };
                                        NavUtil.push(RouteNames.RECIPE_DETAIL, detailParam);
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
                    }, { name: "RecipeCard" });
                }
                FlowItem.pop();
            };
            const __lazyForEachItemIdFunc = (item: RecipeListItem) => item.id;
            LazyForEach.create("1", this, this.vm.recipes, __lazyForEachItemGenFunction, __lazyForEachItemIdFunc);
            LazyForEach.pop();
        }
        WaterFlow.pop();
    }
    footer(parent = null) {
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new LoadMoreFooter(this, {
                        status: this.vm.loadMoreStatus,
                        onRetry: () => this.vm.loadMore()
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/features/category/pages/RecipeListPage.ets", line: 73, col: 5 });
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
    }
    public updateStateVars(params) {
        if (params === undefined) {
            return;
        }
        if ("param" in params) {
            this.updateParam("param", params.param);
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
}
