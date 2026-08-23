if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
import { RecipeSort } from "@bundle:com.eatapp.recipe/entry/ets/commons/model/Recipe";
import type { RecipeListItem, RecipeTag } from "@bundle:com.eatapp.recipe/entry/ets/commons/model/Recipe";
import { AppTab, NavUtil } from "@bundle:com.eatapp.recipe/entry/ets/commons/router/NavUtil";
import { RouteNames } from "@bundle:com.eatapp.recipe/entry/ets/commons/router/RouteNames";
import type { RecipeDetailParam, RecipeListParam, SearchParam } from "@bundle:com.eatapp.recipe/entry/ets/commons/router/RouteNames";
import { LoadMoreFooter } from "@bundle:com.eatapp.recipe/entry/ets/commons/uikit/LoadMoreFooter";
import { RecipeCardH } from "@bundle:com.eatapp.recipe/entry/ets/commons/uikit/RecipeCardH";
import { RecipeRow } from "@bundle:com.eatapp.recipe/entry/ets/commons/uikit/RecipeRow";
import { SearchBar } from "@bundle:com.eatapp.recipe/entry/ets/commons/uikit/SearchBar";
import { SectionHeader } from "@bundle:com.eatapp.recipe/entry/ets/commons/uikit/SectionHeader";
import { StateView } from "@bundle:com.eatapp.recipe/entry/ets/commons/uikit/StateView";
import { Strings } from "@bundle:com.eatapp.recipe/entry/ets/commons/utils/Strings";
import { AiEntryCard } from "@bundle:com.eatapp.recipe/entry/ets/features/home/components/AiEntryCard";
import { TagGrid } from "@bundle:com.eatapp.recipe/entry/ets/features/home/components/TagGrid";
import { HomeViewModel } from "@bundle:com.eatapp.recipe/entry/ets/features/home/viewmodel/HomeViewModel";
export class HomePage extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.vm = new HomeViewModel();
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
        this.vm = new HomeViewModel();
    }
    @Local
    vm: HomeViewModel;
    aboutToAppear(): void {
        this.vm.load();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/features/home/pages/HomePage.ets(36:5)", "entry");
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor({ "id": 16777232, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/features/home/pages/HomePage.ets(37:7)", "entry");
            Row.width('100%');
            Row.padding({
                left: { "id": 16777440, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                right: { "id": 16777440, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                top: { "id": 16777441, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                bottom: { "id": 16777441, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }
            });
        }, Row);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new SearchBar(this, {
                        readOnly: true,
                        placeholder: { "id": 16777345, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                        onTap: () => NavUtil.push(RouteNames.SEARCH, { keyword: '' } as SearchParam)
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/features/home/pages/HomePage.ets", line: 38, col: 9 });
                    ViewV2.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            readOnly: true,
                            placeholder: { "id": 16777345, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                            onTap: () => NavUtil.push(RouteNames.SEARCH, { keyword: '' } as SearchParam)
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        readOnly: true,
                        placeholder: { "id": 16777345, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }
                    });
                }
            }, { name: "SearchBar" });
        }
        Row.pop();
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
                        emptyText: { "id": 16777344, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                        onRetry: () => this.vm.load(),
                        content: () => { this.contentView(); }
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/features/home/pages/HomePage.ets", line: 52, col: 7 });
                    ViewV2.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            status: this.vm.state.status,
                            errorMessage: this.vm.state.errorMessage,
                            emptyText: { "id": 16777344, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                            onRetry: () => this.vm.load(),
                            content: () => { this.contentView(); }
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        status: this.vm.state.status,
                        errorMessage: this.vm.state.errorMessage,
                        emptyText: { "id": 16777344, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }
                    });
                }
            }, { name: "StateView" });
        }
        __Common__.pop();
        Column.pop();
    }
    contentView(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Refresh.create({ refreshing: this.vm.refreshing });
            Refresh.debugLine("entry/src/main/ets/features/home/pages/HomePage.ets(68:5)", "entry");
            Refresh.onRefreshing(() => this.vm.refresh());
            Refresh.width('100%');
            Refresh.height('100%');
        }, Refresh);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            List.create();
            List.debugLine("entry/src/main/ets/features/home/pages/HomePage.ets(69:7)", "entry");
            List.width('100%');
            List.height('100%');
            List.scrollBar(BarState.Off);
            List.cachedCount(3);
            List.edgeEffect(EdgeEffect.None);
            List.onReachEnd(() => this.vm.loadMore());
        }, List);
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
                ListItem.debugLine("entry/src/main/ets/features/home/pages/HomePage.ets(70:9)", "entry");
            };
            const deepRenderFunction = (elmtId, isInitialRender) => {
                itemCreation(elmtId, isInitialRender);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create({ space: 24 });
                    Column.debugLine("entry/src/main/ets/features/home/pages/HomePage.ets(71:11)", "entry");
                    Column.width('100%');
                    Column.padding({ left: { "id": 16777440, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }, right: { "id": 16777440, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" } });
                }, Column);
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new TagGrid(this, {
                                tags: this.vm.tags,
                                onTagTap: (tag: RecipeTag) => this.openTag(tag),
                                onMoreTap: () => NavUtil.switchTab(AppTab.CATEGORY)
                            }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/features/home/pages/HomePage.ets", line: 72, col: 13 });
                            ViewV2.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    tags: this.vm.tags,
                                    onTagTap: (tag: RecipeTag) => this.openTag(tag),
                                    onMoreTap: () => NavUtil.switchTab(AppTab.CATEGORY)
                                };
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {
                                tags: this.vm.tags
                            });
                        }
                    }, { name: "TagGrid" });
                }
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new AiEntryCard(this, { onTap: () => NavUtil.switchTab(AppTab.AI) }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/features/home/pages/HomePage.ets", line: 78, col: 13 });
                            ViewV2.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    onTap: () => NavUtil.switchTab(AppTab.AI)
                                };
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {});
                        }
                    }, { name: "AiEntryCard" });
                }
                this.horizontalSection.bind(this)({ "id": 16777348, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }, '', this.vm.todayRecommend, () => { });
                this.horizontalSection.bind(this)({ "id": 16777346, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }, { "id": 16777320, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }, this.vm.hotRecipes, () => this.openHotMore());
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new SectionHeader(this, { title: { "id": 16777347, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" } }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/features/home/pages/HomePage.ets", line: 89, col: 13 });
                            ViewV2.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    title: { "id": 16777347, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }
                                };
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {
                                title: { "id": 16777347, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }
                            });
                        }
                    }, { name: "SectionHeader" });
                }
                Column.pop();
                ListItem.pop();
            };
            this.observeComponentCreation2(itemCreation2, ListItem);
            ListItem.pop();
        }
        {
            const __lazyForEachItemGenFunction = _item => {
                const item = _item;
                {
                    const itemCreation2 = (elmtId, isInitialRender) => {
                        ListItem.create(() => { }, false);
                        ListItem.debugLine("entry/src/main/ets/features/home/pages/HomePage.ets(96:11)", "entry");
                    };
                    const observedDeepRender = () => {
                        this.observeComponentCreation2(itemCreation2, ListItem);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            __Common__.create();
                            __Common__.padding({ left: { "id": 16777440, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }, right: { "id": 16777440, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" } });
                        }, __Common__);
                        {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                if (isInitialRender) {
                                    let componentCall = new RecipeRow(this, {
                                        item: item,
                                        onTap: (target: RecipeListItem) => this.openDetail(target)
                                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/features/home/pages/HomePage.ets", line: 97, col: 13 });
                                    ViewV2.create(componentCall);
                                    let paramsLambda = () => {
                                        return {
                                            item: item,
                                            onTap: (target: RecipeListItem) => this.openDetail(target)
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
                        __Common__.pop();
                        ListItem.pop();
                    };
                    observedDeepRender();
                }
            };
            const __lazyForEachItemIdFunc = (item: RecipeListItem) => item.id;
            LazyForEach.create("1", this, this.vm.latest, __lazyForEachItemGenFunction, __lazyForEachItemIdFunc);
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
                ListItem.debugLine("entry/src/main/ets/features/home/pages/HomePage.ets(105:9)", "entry");
            };
            const deepRenderFunction = (elmtId, isInitialRender) => {
                itemCreation(elmtId, isInitialRender);
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new LoadMoreFooter(this, {
                                status: this.vm.loadMoreStatus,
                                onRetry: () => this.vm.loadMore()
                            }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/features/home/pages/HomePage.ets", line: 106, col: 11 });
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
        Refresh.pop();
    }
    /** 今日推荐 / 热门榜单共用的横滑区块 */
    horizontalSection(title: ResourceStr, action: ResourceStr, items: RecipeListItem[], onAction: () => void, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (items.length > 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create({ space: 12 });
                        Column.debugLine("entry/src/main/ets/features/home/pages/HomePage.ets(128:7)", "entry");
                        Column.width('100%');
                    }, Column);
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new SectionHeader(this, { title: title, actionText: action, onAction: onAction }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/features/home/pages/HomePage.ets", line: 129, col: 9 });
                                ViewV2.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        title: title,
                                        actionText: action,
                                        onAction: onAction
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    title: title, actionText: action
                                });
                            }
                        }, { name: "SectionHeader" });
                    }
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Scroll.create();
                        Scroll.debugLine("entry/src/main/ets/features/home/pages/HomePage.ets(130:9)", "entry");
                        Scroll.scrollable(ScrollDirection.Horizontal);
                        Scroll.scrollBar(BarState.Off);
                        Scroll.width('100%');
                        Scroll.align(Alignment.Start);
                    }, Scroll);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create({ space: 12 });
                        Row.debugLine("entry/src/main/ets/features/home/pages/HomePage.ets(131:11)", "entry");
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        ForEach.create();
                        const forEachItemGenFunction = _item => {
                            const item = _item;
                            {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    if (isInitialRender) {
                                        let componentCall = new RecipeCardH(this, {
                                            item: item,
                                            onTap: (target: RecipeListItem) => this.openDetail(target)
                                        }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/features/home/pages/HomePage.ets", line: 133, col: 15 });
                                        ViewV2.create(componentCall);
                                        let paramsLambda = () => {
                                            return {
                                                item: item,
                                                onTap: (target: RecipeListItem) => this.openDetail(target)
                                            };
                                        };
                                        componentCall.paramsGenerator_ = paramsLambda;
                                    }
                                    else {
                                        this.updateStateVarsOfChildByElmtId(elmtId, {
                                            item: item
                                        });
                                    }
                                }, { name: "RecipeCardH" });
                            }
                        };
                        this.forEachUpdateFunction(elmtId, items, forEachItemGenFunction, (item: RecipeListItem) => item.id, false, false);
                    }, ForEach);
                    ForEach.pop();
                    Row.pop();
                    Scroll.pop();
                    Column.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
    }
    private openDetail(item: RecipeListItem): void {
        const param: RecipeDetailParam = { recipeId: item.id };
        NavUtil.push(RouteNames.RECIPE_DETAIL, param);
    }
    private openTag(tag: RecipeTag): void {
        const param: RecipeListParam = { title: tag.name, tagId: tag.id, sort: RecipeSort.LATEST as string };
        NavUtil.push(RouteNames.RECIPE_LIST, param);
    }
    private openHotMore(): void {
        const param: RecipeListParam = {
            title: Strings.get({ "id": 16777346, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }),
            tagId: '',
            sort: RecipeSort.FAVORITE as string
        };
        NavUtil.push(RouteNames.RECIPE_LIST, param);
    }
    rerender() {
        this.updateDirtyElements();
    }
}
