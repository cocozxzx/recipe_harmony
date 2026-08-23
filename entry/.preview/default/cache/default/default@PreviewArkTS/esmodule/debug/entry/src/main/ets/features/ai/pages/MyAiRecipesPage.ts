if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
import type { AiGeneratedRecipe } from '../../../commons/model/Ai';
import { LoadMoreFooter } from "@bundle:com.eatapp.recipe/entry/ets/commons/uikit/LoadMoreFooter";
import { StateView } from "@bundle:com.eatapp.recipe/entry/ets/commons/uikit/StateView";
import { TopBar } from "@bundle:com.eatapp.recipe/entry/ets/commons/uikit/TopBar";
import { AiGeneratedCard } from "@bundle:com.eatapp.recipe/entry/ets/features/ai/components/AiGeneratedCard";
import { MyAiRecipesViewModel } from "@bundle:com.eatapp.recipe/entry/ets/features/ai/viewmodel/MyAiRecipesViewModel";
export class MyAiRecipesPage extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.vm = new MyAiRecipesViewModel();
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
        this.vm = new MyAiRecipesViewModel();
    }
    @Local
    vm: MyAiRecipesViewModel;
    aboutToAppear(): void {
        this.vm.load();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/features/ai/pages/MyAiRecipesPage.ets(18:5)", "entry");
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor({ "id": 16777232, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
        }, Column);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new TopBar(this, { title: { "id": 16777380, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" } }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/features/ai/pages/MyAiRecipesPage.ets", line: 19, col: 7 });
                    ViewV2.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: { "id": 16777380, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        title: { "id": 16777380, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }
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
                        onRetry: () => this.vm.load(),
                        content: () => { this.listView(); }
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/features/ai/pages/MyAiRecipesPage.ets", line: 21, col: 7 });
                    ViewV2.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            status: this.vm.state.status,
                            errorMessage: this.vm.state.errorMessage,
                            onRetry: () => this.vm.load(),
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
            List.create({ space: 12 });
            List.debugLine("entry/src/main/ets/features/ai/pages/MyAiRecipesPage.ets(36:5)", "entry");
            List.width('100%');
            List.height('100%');
            List.padding({ "id": 16777440, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            List.scrollBar(BarState.Off);
            List.cachedCount(2);
            List.onReachEnd(() => this.vm.loadMore());
        }, List);
        {
            const __lazyForEachItemGenFunction = (_item, index: number) => {
                const item = _item;
                {
                    const itemCreation2 = (elmtId, isInitialRender) => {
                        ListItem.create(() => { }, false);
                        ListItem.debugLine("entry/src/main/ets/features/ai/pages/MyAiRecipesPage.ets(38:9)", "entry");
                    };
                    const observedDeepRender = () => {
                        this.observeComponentCreation2(itemCreation2, ListItem);
                        {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                if (isInitialRender) {
                                    let componentCall = new AiGeneratedCard(this, {
                                        recipe: item,
                                        onToggleFavorite: () => this.vm.unfavorite(index, item)
                                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/features/ai/pages/MyAiRecipesPage.ets", line: 39, col: 11 });
                                    ViewV2.create(componentCall);
                                    let paramsLambda = () => {
                                        return {
                                            recipe: item,
                                            onToggleFavorite: () => this.vm.unfavorite(index, item)
                                        };
                                    };
                                    componentCall.paramsGenerator_ = paramsLambda;
                                }
                                else {
                                    this.updateStateVarsOfChildByElmtId(elmtId, {
                                        recipe: item
                                    });
                                }
                            }, { name: "AiGeneratedCard" });
                        }
                        ListItem.pop();
                    };
                    observedDeepRender();
                }
            };
            const __lazyForEachItemIdFunc = (item: AiGeneratedRecipe) => item.id;
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
                ListItem.debugLine("entry/src/main/ets/features/ai/pages/MyAiRecipesPage.ets(46:7)", "entry");
            };
            const deepRenderFunction = (elmtId, isInitialRender) => {
                itemCreation(elmtId, isInitialRender);
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new LoadMoreFooter(this, { status: this.vm.loadMoreStatus, onRetry: () => this.vm.loadMore() }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/features/ai/pages/MyAiRecipesPage.ets", line: 47, col: 9 });
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
    rerender() {
        this.updateDirtyElements();
    }
}
