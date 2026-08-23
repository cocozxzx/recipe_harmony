if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
import { LengthMetrics } from "@ohos:arkui.node";
import type { RecipeListItem } from '../../../commons/model/Recipe';
import { AppTab, NavUtil } from "@bundle:com.eatapp.recipe/entry/ets/commons/router/NavUtil";
import { RouteNames } from "@bundle:com.eatapp.recipe/entry/ets/commons/router/RouteNames";
import type { RecipeDetailParam, SearchParam } from "@bundle:com.eatapp.recipe/entry/ets/commons/router/RouteNames";
import { LoadMoreFooter } from "@bundle:com.eatapp.recipe/entry/ets/commons/uikit/LoadMoreFooter";
import { RecipeRow } from "@bundle:com.eatapp.recipe/entry/ets/commons/uikit/RecipeRow";
import { SearchBar } from "@bundle:com.eatapp.recipe/entry/ets/commons/uikit/SearchBar";
import { SectionHeader } from "@bundle:com.eatapp.recipe/entry/ets/commons/uikit/SectionHeader";
import { StateView } from "@bundle:com.eatapp.recipe/entry/ets/commons/uikit/StateView";
import { SearchViewModel } from "@bundle:com.eatapp.recipe/entry/ets/features/search/viewmodel/SearchViewModel";
export class SearchPage extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.initParam("param", (params && "param" in params) ? params.param : { keyword: '' });
        this.vm = new SearchViewModel();
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
        this.resetParam("param", (params && "param" in params) ? params.param : { keyword: '' });
        this.vm = new SearchViewModel();
    }
    @Param
    readonly param: SearchParam;
    @Local
    vm: SearchViewModel;
    aboutToAppear(): void {
        this.vm.init(this.param.keyword);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/features/search/pages/SearchPage.ets(26:5)", "entry");
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor({ "id": 16777232, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 12 });
            Row.debugLine("entry/src/main/ets/features/search/pages/SearchPage.ets(27:7)", "entry");
            Row.width('100%');
            Row.padding({ "id": 16777440, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            __Common__.create();
            __Common__.layoutWeight(1);
        }, __Common__);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new SearchBar(this, {
                        text: this.vm.keyword,
                        autoFocus: true,
                        onTextChange: (value: string) => this.vm.onKeywordChange(value),
                        onSubmit: () => this.vm.search()
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/features/search/pages/SearchPage.ets", line: 28, col: 9 });
                    ViewV2.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            text: this.vm.keyword,
                            autoFocus: true,
                            onTextChange: (value: string) => this.vm.onKeywordChange(value),
                            onSubmit: () => this.vm.search()
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        text: this.vm.keyword,
                        autoFocus: true
                    });
                }
            }, { name: "SearchBar" });
        }
        __Common__.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777312, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Text.debugLine("entry/src/main/ets/features/search/pages/SearchPage.ets(36:9)", "entry");
            Text.fontSize({ "id": 16777426, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Text.fontColor({ "id": 16777247, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Text.onClick(() => NavUtil.pop());
        }, Text);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.vm.searched) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.resultView.bind(this)();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.discoveryView.bind(this)();
                });
            }
        }, If);
        If.pop();
        Column.pop();
    }
    resultView(parent = null) {
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
                        emptyText: { "id": 16777409, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                        emptyActionText: { "id": 16777408, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                        onRetry: () => this.vm.search(),
                        onEmptyAction: () => NavUtil.switchTab(AppTab.AI, this.vm.keyword),
                        content: () => { this.resultList(); }
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/features/search/pages/SearchPage.ets", line: 57, col: 5 });
                    ViewV2.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            status: this.vm.state.status,
                            errorMessage: this.vm.state.errorMessage,
                            emptyText: { "id": 16777409, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                            emptyActionText: { "id": 16777408, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                            onRetry: () => this.vm.search(),
                            onEmptyAction: () => NavUtil.switchTab(AppTab.AI, this.vm.keyword),
                            content: () => { this.resultList(); }
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        status: this.vm.state.status,
                        errorMessage: this.vm.state.errorMessage,
                        emptyText: { "id": 16777409, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                        emptyActionText: { "id": 16777408, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }
                    });
                }
            }, { name: "StateView" });
        }
        __Common__.pop();
    }
    resultList(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            List.create();
            List.debugLine("entry/src/main/ets/features/search/pages/SearchPage.ets(71:5)", "entry");
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
                        ListItem.debugLine("entry/src/main/ets/features/search/pages/SearchPage.ets(73:9)", "entry");
                    };
                    const observedDeepRender = () => {
                        this.observeComponentCreation2(itemCreation2, ListItem);
                        {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                if (isInitialRender) {
                                    let componentCall = new RecipeRow(this, {
                                        item: item,
                                        onTap: (target: RecipeListItem) => {
                                            const detailParam: RecipeDetailParam = { recipeId: target.id };
                                            NavUtil.push(RouteNames.RECIPE_DETAIL, detailParam);
                                        }
                                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/features/search/pages/SearchPage.ets", line: 74, col: 11 });
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
                            }, { name: "RecipeRow" });
                        }
                        ListItem.pop();
                    };
                    observedDeepRender();
                }
            };
            const __lazyForEachItemIdFunc = (item: RecipeListItem) => item.id;
            LazyForEach.create("1", this, this.vm.results, __lazyForEachItemGenFunction, __lazyForEachItemIdFunc);
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
                ListItem.debugLine("entry/src/main/ets/features/search/pages/SearchPage.ets(84:7)", "entry");
            };
            const deepRenderFunction = (elmtId, isInitialRender) => {
                itemCreation(elmtId, isInitialRender);
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new LoadMoreFooter(this, { status: this.vm.loadMoreStatus, onRetry: () => this.vm.loadMore() }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/features/search/pages/SearchPage.ets", line: 85, col: 9 });
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
    discoveryView(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.debugLine("entry/src/main/ets/features/search/pages/SearchPage.ets(98:5)", "entry");
            Scroll.scrollBar(BarState.Off);
            Scroll.layoutWeight(1);
            Scroll.align(Alignment.Top);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 24 });
            Column.debugLine("entry/src/main/ets/features/search/pages/SearchPage.ets(99:7)", "entry");
            Column.width('100%');
            Column.padding({ left: { "id": 16777440, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }, right: { "id": 16777440, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" } });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.vm.history.length > 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create({ space: 12 });
                        Column.debugLine("entry/src/main/ets/features/search/pages/SearchPage.ets(101:11)", "entry");
                    }, Column);
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new SectionHeader(this, {
                                    title: { "id": 16777410, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                                    actionText: { "id": 16777313, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                                    onAction: () => this.vm.clearHistory()
                                }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/features/search/pages/SearchPage.ets", line: 102, col: 13 });
                                ViewV2.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        title: { "id": 16777410, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                                        actionText: { "id": 16777313, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                                        onAction: () => this.vm.clearHistory()
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    title: { "id": 16777410, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                                    actionText: { "id": 16777313, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }
                                });
                            }
                        }, { name: "SectionHeader" });
                    }
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Flex.create({ wrap: FlexWrap.Wrap, space: { main: LengthMetrics.vp(8), cross: LengthMetrics.vp(8) } });
                        Flex.debugLine("entry/src/main/ets/features/search/pages/SearchPage.ets(107:13)", "entry");
                        Flex.width('100%');
                    }, Flex);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        ForEach.create();
                        const forEachItemGenFunction = _item => {
                            const keyword = _item;
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Row.create({ space: 6 });
                                Row.debugLine("entry/src/main/ets/features/search/pages/SearchPage.ets(109:17)", "entry");
                                Row.height({ "id": 16777424, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                                Row.padding({ left: { "id": 16777441, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }, right: { "id": 16777441, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" } });
                                Row.backgroundColor({ "id": 16777233, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                                Row.borderRadius({ "id": 16777438, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                                Row.onClick(() => this.vm.searchWith(keyword));
                            }, Row);
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create(keyword);
                                Text.debugLine("entry/src/main/ets/features/search/pages/SearchPage.ets(110:19)", "entry");
                                Text.fontSize({ "id": 16777427, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                                Text.fontColor({ "id": 16777247, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                            }, Text);
                            Text.pop();
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Image.create({ "id": 16777219, "type": 20000, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                                Image.debugLine("entry/src/main/ets/features/search/pages/SearchPage.ets(113:19)", "entry");
                                Image.width(12);
                                Image.height(12);
                                Image.fillColor({ "id": 16777248, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                                Image.onClick(() => this.vm.removeHistory(keyword));
                            }, Image);
                            Row.pop();
                        };
                        this.forEachUpdateFunction(elmtId, this.vm.history, forEachItemGenFunction, (keyword: string) => keyword, false, false);
                    }, ForEach);
                    ForEach.pop();
                    Flex.pop();
                    Column.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.vm.hotRecipes.length > 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create({ space: 12 });
                        Column.debugLine("entry/src/main/ets/features/search/pages/SearchPage.ets(131:11)", "entry");
                    }, Column);
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new SectionHeader(this, { title: { "id": 16777411, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" } }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/features/search/pages/SearchPage.ets", line: 132, col: 13 });
                                ViewV2.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        title: { "id": 16777411, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    title: { "id": 16777411, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }
                                });
                            }
                        }, { name: "SectionHeader" });
                    }
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        ForEach.create();
                        const forEachItemGenFunction = _item => {
                            const item = _item;
                            {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    if (isInitialRender) {
                                        let componentCall = new RecipeRow(this, {
                                            item: item,
                                            onTap: (target: RecipeListItem) => {
                                                const detailParam: RecipeDetailParam = { recipeId: target.id };
                                                NavUtil.push(RouteNames.RECIPE_DETAIL, detailParam);
                                            }
                                        }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/features/search/pages/SearchPage.ets", line: 134, col: 15 });
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
                                }, { name: "RecipeRow" });
                            }
                        };
                        this.forEachUpdateFunction(elmtId, this.vm.hotRecipes, forEachItemGenFunction, (item: RecipeListItem) => item.id, false, false);
                    }, ForEach);
                    ForEach.pop();
                    Column.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Column.pop();
        Scroll.pop();
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
