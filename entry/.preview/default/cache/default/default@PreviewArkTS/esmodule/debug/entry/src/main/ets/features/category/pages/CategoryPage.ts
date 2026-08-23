if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
import { RecipeSort } from "@bundle:com.eatapp.recipe/entry/ets/commons/model/Recipe";
import type { RecipeListItem, RecipeTag } from "@bundle:com.eatapp.recipe/entry/ets/commons/model/Recipe";
import { NavUtil } from "@bundle:com.eatapp.recipe/entry/ets/commons/router/NavUtil";
import { RouteNames } from "@bundle:com.eatapp.recipe/entry/ets/commons/router/RouteNames";
import type { RecipeDetailParam } from "@bundle:com.eatapp.recipe/entry/ets/commons/router/RouteNames";
import { LoadMoreFooter } from "@bundle:com.eatapp.recipe/entry/ets/commons/uikit/LoadMoreFooter";
import { RecipeCard } from "@bundle:com.eatapp.recipe/entry/ets/commons/uikit/RecipeCard";
import { TagChip } from "@bundle:com.eatapp.recipe/entry/ets/commons/uikit/TagChip";
import { StateView } from "@bundle:com.eatapp.recipe/entry/ets/commons/uikit/StateView";
import { Strings } from "@bundle:com.eatapp.recipe/entry/ets/commons/utils/Strings";
import { FilterPanel } from "@bundle:com.eatapp.recipe/entry/ets/features/category/components/FilterPanel";
import { CategoryViewModel } from "@bundle:com.eatapp.recipe/entry/ets/features/category/viewmodel/CategoryViewModel";
export class CategoryPage extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.vm = new CategoryViewModel();
        this.scroller = new Scroller();
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
        this.vm = new CategoryViewModel();
        this.resetMonitorsOnReuse();
    }
    @Local
    vm: CategoryViewModel;
    private scroller: Scroller;
    aboutToAppear(): void {
        this.vm.init();
    }
    /** 切换标签 / 排序 / 筛选后列表要回到顶部，否则用户会停在上一份数据的滚动位置 */
    @Monitor('vm.resetScrollToken')
    onListReset(): void {
        this.scroller.scrollEdge(Edge.Top);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/features/category/pages/CategoryPage.ets(32:5)", "entry");
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor({ "id": 16777232, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
        }, Column);
        this.tagBar.bind(this)();
        this.sortBar.bind(this)();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.vm.filterExpanded) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        __Common__.create();
                        __Common__.margin({ left: { "id": 16777440, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }, right: { "id": 16777440, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" } });
                    }, __Common__);
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new FilterPanel(this, { vm: this.vm }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/features/category/pages/CategoryPage.ets", line: 36, col: 9 });
                                ViewV2.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        vm: this.vm
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    vm: this.vm
                                });
                            }
                        }, { name: "FilterPanel" });
                    }
                    __Common__.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
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
                        content: () => { this.waterFlow(); }
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/features/category/pages/CategoryPage.ets", line: 40, col: 7 });
                    ViewV2.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            status: this.vm.state.status,
                            errorMessage: this.vm.state.errorMessage,
                            emptyText: { "id": 16777303, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                            onRetry: () => this.vm.reload(),
                            content: () => { this.waterFlow(); }
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
    tagBar(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.debugLine("entry/src/main/ets/features/category/pages/CategoryPage.ets(56:5)", "entry");
            Scroll.scrollable(ScrollDirection.Horizontal);
            Scroll.scrollBar(BarState.Off);
            Scroll.width('100%');
            Scroll.padding({ top: { "id": 16777441, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }, bottom: { "id": 16777441, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" } });
            Scroll.align(Alignment.Start);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 8 });
            Row.debugLine("entry/src/main/ets/features/category/pages/CategoryPage.ets(57:7)", "entry");
            Row.padding({ left: { "id": 16777440, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }, right: { "id": 16777440, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" } });
        }, Row);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new TagChip(this, {
                        text: Strings.get({ "id": 16777298, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }),
                        selected: this.vm.tagId === '',
                        onTap: () => this.vm.selectTag('')
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/features/category/pages/CategoryPage.ets", line: 58, col: 9 });
                    ViewV2.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            text: Strings.get({ "id": 16777298, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }),
                            selected: this.vm.tagId === '',
                            onTap: () => this.vm.selectTag('')
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        text: Strings.get({ "id": 16777298, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }),
                        selected: this.vm.tagId === ''
                    });
                }
            }, { name: "TagChip" });
        }
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const tag = _item;
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new TagChip(this, {
                                text: tag.name,
                                selected: this.vm.tagId === tag.id,
                                onTap: () => this.vm.selectTag(tag.id)
                            }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/features/category/pages/CategoryPage.ets", line: 64, col: 11 });
                            ViewV2.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    text: tag.name,
                                    selected: this.vm.tagId === tag.id,
                                    onTap: () => this.vm.selectTag(tag.id)
                                };
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {
                                text: tag.name,
                                selected: this.vm.tagId === tag.id
                            });
                        }
                    }, { name: "TagChip" });
                }
            };
            this.forEachUpdateFunction(elmtId, this.vm.tags, forEachItemGenFunction, (tag: RecipeTag) => tag.id, false, false);
        }, ForEach);
        ForEach.pop();
        Row.pop();
        Scroll.pop();
    }
    sortBar(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/features/category/pages/CategoryPage.ets(82:5)", "entry");
            Row.width('100%');
            Row.padding({
                left: { "id": 16777440, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                right: { "id": 16777440, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                bottom: { "id": 16777441, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 16 });
            Row.debugLine("entry/src/main/ets/features/category/pages/CategoryPage.ets(83:7)", "entry");
            Row.layoutWeight(1);
        }, Row);
        this.sortItem.bind(this)({ "id": 16777308, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }, RecipeSort.LATEST);
        this.sortItem.bind(this)({ "id": 16777307, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }, RecipeSort.FAVORITE);
        this.sortItem.bind(this)({ "id": 16777309, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }, RecipeSort.LIKE);
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 4 });
            Row.debugLine("entry/src/main/ets/features/category/pages/CategoryPage.ets(90:7)", "entry");
            Row.onClick(() => this.vm.toggleFilter());
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777304, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Text.debugLine("entry/src/main/ets/features/category/pages/CategoryPage.ets(91:9)", "entry");
            Text.fontSize({ "id": 16777427, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Text.fontColor(this.hasFilter() ? { "id": 16777235, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" } : { "id": 16777247, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777224, "type": 20000, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Image.debugLine("entry/src/main/ets/features/category/pages/CategoryPage.ets(94:9)", "entry");
            Image.width({ "id": 16777435, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Image.height({ "id": 16777435, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Image.rotate({ angle: this.vm.filterExpanded ? -90 : 90 });
            Image.fillColor(this.hasFilter() ? { "id": 16777235, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" } : { "id": 16777248, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
        }, Image);
        Row.pop();
        Row.pop();
    }
    sortItem(label: ResourceStr, value: RecipeSort, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(label);
            Text.debugLine("entry/src/main/ets/features/category/pages/CategoryPage.ets(112:5)", "entry");
            Text.fontSize({ "id": 16777427, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Text.fontWeight(this.vm.sort === value ? FontWeight.Medium : FontWeight.Normal);
            Text.fontColor(this.vm.sort === value ? { "id": 16777235, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" } : { "id": 16777247, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Text.onClick(() => this.vm.selectSort(value));
        }, Text);
        Text.pop();
    }
    waterFlow(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/features/category/pages/CategoryPage.ets(121:5)", "entry");
            Column.width('100%');
            Column.height('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            WaterFlow.create({ scroller: this.scroller, footer: () => { this.footer(); } });
            WaterFlow.debugLine("entry/src/main/ets/features/category/pages/CategoryPage.ets(122:7)", "entry");
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
                    FlowItem.debugLine("entry/src/main/ets/features/category/pages/CategoryPage.ets(124:11)", "entry");
                    FlowItem.width('100%');
                }, FlowItem);
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new RecipeCard(this, {
                                item: item,
                                onTap: (target: RecipeListItem) => {
                                    const param: RecipeDetailParam = { recipeId: target.id };
                                    NavUtil.push(RouteNames.RECIPE_DETAIL, param);
                                }
                            }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/features/category/pages/CategoryPage.ets", line: 125, col: 13 });
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
                    }, { name: "RecipeCard" });
                }
                FlowItem.pop();
            };
            const __lazyForEachItemIdFunc = (item: RecipeListItem) => item.id;
            LazyForEach.create("1", this, this.vm.recipes, __lazyForEachItemGenFunction, __lazyForEachItemIdFunc);
            LazyForEach.pop();
        }
        WaterFlow.pop();
        Column.pop();
    }
    footer(parent = null) {
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new LoadMoreFooter(this, {
                        status: this.vm.loadMoreStatus,
                        onRetry: () => this.vm.loadMore()
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/features/category/pages/CategoryPage.ets", line: 152, col: 5 });
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
    private hasFilter(): boolean {
        return this.vm.difficulties.length > 0 || this.vm.maxCookTime > 0;
    }
    rerender() {
        this.updateDirtyElements();
    }
}
