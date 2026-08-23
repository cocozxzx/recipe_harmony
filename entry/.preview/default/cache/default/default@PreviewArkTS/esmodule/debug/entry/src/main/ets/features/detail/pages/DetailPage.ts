if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
import type common from "@ohos:app.ability.common";
import BuildProfile from "@bundle:com.eatapp.recipe/entry/.preview/default/generated/profile/default/BuildProfile";
import type { RecipeDetail } from '../../../commons/model/Recipe';
import { NavUtil } from "@bundle:com.eatapp.recipe/entry/ets/commons/router/NavUtil";
import type { RecipeDetailParam } from '../../../commons/router/RouteNames';
import { CookTimeLabel } from "@bundle:com.eatapp.recipe/entry/ets/commons/uikit/CookTimeLabel";
import { DifficultyStars } from "@bundle:com.eatapp.recipe/entry/ets/commons/uikit/DifficultyStars";
import { NetImage } from "@bundle:com.eatapp.recipe/entry/ets/commons/uikit/NetImage";
import { SectionHeader } from "@bundle:com.eatapp.recipe/entry/ets/commons/uikit/SectionHeader";
import { StateView } from "@bundle:com.eatapp.recipe/entry/ets/commons/uikit/StateView";
import { MiniTag } from "@bundle:com.eatapp.recipe/entry/ets/commons/uikit/TagChip";
import { Motion, Shadows } from "@bundle:com.eatapp.recipe/entry/ets/commons/uikit/Theme";
import { Formatter } from "@bundle:com.eatapp.recipe/entry/ets/commons/utils/Formatter";
import { IngredientList } from "@bundle:com.eatapp.recipe/entry/ets/features/detail/components/IngredientList";
import { ServingsStepper } from "@bundle:com.eatapp.recipe/entry/ets/features/detail/components/ServingsStepper";
import { ShareHelper } from "@bundle:com.eatapp.recipe/entry/ets/features/detail/components/ShareHelper";
import { StepList } from "@bundle:com.eatapp.recipe/entry/ets/features/detail/components/StepList";
import { TipsCard } from "@bundle:com.eatapp.recipe/entry/ets/features/detail/components/TipsCard";
import { DetailViewModel } from "@bundle:com.eatapp.recipe/entry/ets/features/detail/viewmodel/DetailViewModel";
export class DetailPage extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.initParam("param", (params && "param" in params) ? params.param : { recipeId: '' });
        this.vm = new DetailViewModel();
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
        this.resetParam("param", (params && "param" in params) ? params.param : { recipeId: '' });
        this.vm = new DetailViewModel();
    }
    @Param
    readonly param: RecipeDetailParam;
    @Local
    vm: DetailViewModel;
    aboutToAppear(): void {
        this.vm.load(this.param.recipeId);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create({ alignContent: Alignment.TopStart });
            Stack.debugLine("entry/src/main/ets/features/detail/pages/DetailPage.ets(35:5)", "entry");
            Stack.width('100%');
            Stack.height('100%');
            Stack.backgroundColor({ "id": 16777232, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            __Common__.create();
            __Common__.width('100%');
            __Common__.height('100%');
        }, __Common__);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new StateView(this, {
                        status: this.vm.state.status,
                        errorMessage: this.vm.state.errorMessage,
                        onRetry: () => this.vm.load(this.param.recipeId),
                        content: () => { this.contentView(); }
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/features/detail/pages/DetailPage.ets", line: 36, col: 7 });
                    ViewV2.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            status: this.vm.state.status,
                            errorMessage: this.vm.state.errorMessage,
                            onRetry: () => this.vm.load(this.param.recipeId),
                            content: () => { this.contentView(); }
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
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 返回按钮浮于封面之上，避免通栏大图被标题栏切掉
            Image.create({ "id": 16777222, "type": 20000, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Image.debugLine("entry/src/main/ets/features/detail/pages/DetailPage.ets(46:7)", "entry");
            // 返回按钮浮于封面之上，避免通栏大图被标题栏切掉
            Image.width({ "id": 16777433, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            // 返回按钮浮于封面之上，避免通栏大图被标题栏切掉
            Image.height({ "id": 16777433, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            // 返回按钮浮于封面之上，避免通栏大图被标题栏切掉
            Image.fillColor({ "id": 16777234, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            // 返回按钮浮于封面之上，避免通栏大图被标题栏切掉
            Image.margin({ left: { "id": 16777440, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }, top: { "id": 16777440, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" } });
            // 返回按钮浮于封面之上，避免通栏大图被标题栏切掉
            Image.onClick(() => NavUtil.pop());
        }, Image);
        Stack.pop();
    }
    contentView(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/features/detail/pages/DetailPage.ets(60:5)", "entry");
            Column.width('100%');
            Column.height('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.debugLine("entry/src/main/ets/features/detail/pages/DetailPage.ets(61:7)", "entry");
            Scroll.scrollBar(BarState.Off);
            Scroll.layoutWeight(1);
            Scroll.align(Alignment.Top);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 24 });
            Column.debugLine("entry/src/main/ets/features/detail/pages/DetailPage.ets(62:9)", "entry");
            Column.width('100%');
            Column.padding({ bottom: 96 });
        }, Column);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new NetImage(this, {
                        url: this.detail().coverImage,
                        imgWidth: '100%',
                        imgHeight: { "id": 16777425, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                        fit: ImageFit.Cover
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/features/detail/pages/DetailPage.ets", line: 63, col: 11 });
                    ViewV2.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            url: this.detail().coverImage,
                            imgWidth: '100%',
                            imgHeight: { "id": 16777425, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                            fit: ImageFit.Cover
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        url: this.detail().coverImage,
                        imgWidth: '100%',
                        imgHeight: { "id": 16777425, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                        fit: ImageFit.Cover
                    });
                }
            }, { name: "NetImage" });
        }
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 24 });
            Column.debugLine("entry/src/main/ets/features/detail/pages/DetailPage.ets(70:11)", "entry");
            Column.width('100%');
            Column.padding({ left: { "id": 16777440, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }, right: { "id": 16777440, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" } });
        }, Column);
        this.titleSection.bind(this)();
        this.summarySection.bind(this)();
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new ServingsStepper(this, {
                        servings: this.vm.servings,
                        canDecrease: this.vm.canDecrease(),
                        canIncrease: this.vm.canIncrease(),
                        onDecrease: () => this.vm.decreaseServings(),
                        onIncrease: () => this.vm.increaseServings()
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/features/detail/pages/DetailPage.ets", line: 74, col: 13 });
                    ViewV2.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            servings: this.vm.servings,
                            canDecrease: this.vm.canDecrease(),
                            canIncrease: this.vm.canIncrease(),
                            onDecrease: () => this.vm.decreaseServings(),
                            onIncrease: () => this.vm.increaseServings()
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        servings: this.vm.servings,
                        canDecrease: this.vm.canDecrease(),
                        canIncrease: this.vm.canIncrease()
                    });
                }
            }, { name: "ServingsStepper" });
        }
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 12 });
            Column.debugLine("entry/src/main/ets/features/detail/pages/DetailPage.ets(82:13)", "entry");
        }, Column);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new SectionHeader(this, { title: { "id": 16777329, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" } }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/features/detail/pages/DetailPage.ets", line: 83, col: 15 });
                    ViewV2.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: { "id": 16777329, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        title: { "id": 16777329, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }
                    });
                }
            }, { name: "SectionHeader" });
        }
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new IngredientList(this, {
                        ingredients: this.detail().ingredients,
                        servings: this.vm.servings,
                        baseServings: this.detail().baseServings
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/features/detail/pages/DetailPage.ets", line: 84, col: 15 });
                    ViewV2.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            ingredients: this.detail().ingredients,
                            servings: this.vm.servings,
                            baseServings: this.detail().baseServings
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        ingredients: this.detail().ingredients,
                        servings: this.vm.servings,
                        baseServings: this.detail().baseServings
                    });
                }
            }, { name: "IngredientList" });
        }
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 12 });
            Column.debugLine("entry/src/main/ets/features/detail/pages/DetailPage.ets(91:13)", "entry");
        }, Column);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new SectionHeader(this, { title: { "id": 16777335, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" } }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/features/detail/pages/DetailPage.ets", line: 92, col: 15 });
                    ViewV2.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: { "id": 16777335, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        title: { "id": 16777335, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }
                    });
                }
            }, { name: "SectionHeader" });
        }
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new StepList(this, { steps: this.detail().steps }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/features/detail/pages/DetailPage.ets", line: 93, col: 15 });
                    ViewV2.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            steps: this.detail().steps
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        steps: this.detail().steps
                    });
                }
            }, { name: "StepList" });
        }
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.detail().tips.length > 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create({ space: 12 });
                        Column.debugLine("entry/src/main/ets/features/detail/pages/DetailPage.ets(97:15)", "entry");
                    }, Column);
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new SectionHeader(this, { title: { "id": 16777336, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" } }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/features/detail/pages/DetailPage.ets", line: 98, col: 17 });
                                ViewV2.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        title: { "id": 16777336, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    title: { "id": 16777336, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }
                                });
                            }
                        }, { name: "SectionHeader" });
                    }
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new TipsCard(this, { tips: this.detail().tips }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/features/detail/pages/DetailPage.ets", line: 99, col: 17 });
                                ViewV2.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        tips: this.detail().tips
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    tips: this.detail().tips
                                });
                            }
                        }, { name: "TipsCard" });
                    }
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
        Column.pop();
        Scroll.pop();
        this.actionBar.bind(this)();
        Column.pop();
    }
    titleSection(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 10 });
            Column.debugLine("entry/src/main/ets/features/detail/pages/DetailPage.ets(121:5)", "entry");
            Column.width('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.detail().name);
            Text.debugLine("entry/src/main/ets/features/detail/pages/DetailPage.ets(122:7)", "entry");
            Text.fontSize({ "id": 16777431, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor({ "id": 16777246, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Text.width('100%');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 8 });
            Row.debugLine("entry/src/main/ets/features/detail/pages/DetailPage.ets(128:7)", "entry");
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.detail().tagName.length > 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new MiniTag(this, {
                                    text: this.detail().tagName,
                                    bgColor: { "id": 16777237, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                                    textColor: { "id": 16777235, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }
                                }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/features/detail/pages/DetailPage.ets", line: 130, col: 11 });
                                ViewV2.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        text: this.detail().tagName,
                                        bgColor: { "id": 16777237, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                                        textColor: { "id": 16777235, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    text: this.detail().tagName,
                                    bgColor: { "id": 16777237, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                                    textColor: { "id": 16777235, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }
                                });
                            }
                        }, { name: "MiniTag" });
                    }
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new DifficultyStars(this, { value: this.detail().difficulty }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/features/detail/pages/DetailPage.ets", line: 136, col: 9 });
                    ViewV2.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            value: this.detail().difficulty
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        value: this.detail().difficulty
                    });
                }
            }, { name: "DifficultyStars" });
        }
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new CookTimeLabel(this, { minutes: this.detail().cookTime, withIcon: true }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/features/detail/pages/DetailPage.ets", line: 137, col: 9 });
                    ViewV2.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            minutes: this.detail().cookTime,
                            withIcon: true
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        minutes: this.detail().cookTime, withIcon: true
                    });
                }
            }, { name: "CookTimeLabel" });
        }
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // 每份热量不随份数变化：总热量按比例变，每份是恒定的
            Row.create({ space: 4 });
            Row.debugLine("entry/src/main/ets/features/detail/pages/DetailPage.ets(142:7)", "entry");
            // 每份热量不随份数变化：总热量按比例变，每份是恒定的
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777327, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Text.debugLine("entry/src/main/ets/features/detail/pages/DetailPage.ets(143:9)", "entry");
            Text.fontSize({ "id": 16777428, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Text.fontColor({ "id": 16777248, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create();
            Text.debugLine("entry/src/main/ets/features/detail/pages/DetailPage.ets(146:9)", "entry");
            Text.fontSize({ "id": 16777428, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Text.fontColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
        }, Text);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Span.create(Formatter.caloriePerServing(this.detail().calorie, this.detail().baseServings).toString());
            Span.debugLine("entry/src/main/ets/features/detail/pages/DetailPage.ets(147:11)", "entry");
        }, Span);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Span.create({ "id": 16777330, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Span.debugLine("entry/src/main/ets/features/detail/pages/DetailPage.ets(148:11)", "entry");
        }, Span);
        Text.pop();
        // 每份热量不随份数变化：总热量按比例变，每份是恒定的
        Row.pop();
        Column.pop();
    }
    summarySection(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.detail().summary.length > 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.detail().summary);
                        Text.debugLine("entry/src/main/ets/features/detail/pages/DetailPage.ets(161:7)", "entry");
                        Text.fontSize({ "id": 16777427, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        Text.fontColor({ "id": 16777247, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        Text.lineHeight(22);
                        Text.width('100%');
                    }, Text);
                    Text.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
    }
    actionBar(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/features/detail/pages/DetailPage.ets(171:5)", "entry");
            Row.width('100%');
            Row.height(64);
            Row.padding({ left: { "id": 16777443, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }, right: { "id": 16777443, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" } });
            Row.backgroundColor({ "id": 16777234, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Row.shadow(Shadows.float);
            Row.justifyContent(FlexAlign.SpaceAround);
            Row.alignItems(VerticalAlign.Center);
        }, Row);
        this.actionItem.bind(this)(this.vm.favorited ? { "id": 16777257, "type": 20000, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" } : { "id": 16777420, "type": 20000, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }, this.vm.favorited ? { "id": 16777230, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" } : { "id": 16777248, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }, Formatter.count(this.vm.favoriteCount), this.vm.favoriteBounce, () => this.vm.toggleFavorite());
        this.actionItem.bind(this)(this.vm.liked ? { "id": 16777221, "type": 20000, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" } : { "id": 16777226, "type": 20000, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }, this.vm.liked ? { "id": 16777231, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" } : { "id": 16777248, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }, Formatter.count(this.vm.likeCount), this.vm.likeBounce, () => this.vm.toggleLike());
        this.actionItem.bind(this)({ "id": 16777263, "type": 20000, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }, { "id": 16777248, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }, '', 0, () => this.share());
        Row.pop();
    }
    actionItem(icon: Resource, color: ResourceColor, label: string, bounceToken: number, action: () => void, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 6 });
            Row.debugLine("entry/src/main/ets/features/detail/pages/DetailPage.ets(205:5)", "entry");
            Row.padding({ "id": 16777442, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Row.onClick(() => action());
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(icon);
            Image.debugLine("entry/src/main/ets/features/detail/pages/DetailPage.ets(206:7)", "entry");
            globalThis.Context.animation({ duration: Motion.bounceDuration, curve: Curve.EaseOut });
            Image.width({ "id": 16777433, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Image.height({ "id": 16777433, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Image.fillColor(color);
            Image.scale({ x: 1, y: 1 });
            globalThis.Context.animation(null);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (label.length > 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(label);
                        Text.debugLine("entry/src/main/ets/features/detail/pages/DetailPage.ets(213:9)", "entry");
                        Text.fontSize({ "id": 16777428, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        Text.fontColor({ "id": 16777247, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                    }, Text);
                    Text.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Row.pop();
    }
    /** detail 在 SUCCESS 态下必然非空；这里收敛一次判空，避免每处都写 ?. */
    private detail(): RecipeDetail {
        const fallback: RecipeDetail = {
            id: '', name: '', coverImage: '', summary: '',
            difficulty: 0, calorie: 0, cookTime: 0, baseServings: 0,
            tagId: '', tagName: '', favoriteCount: 0, likeCount: 0,
            favorited: false, liked: false,
            ingredients: [], steps: [], tips: []
        };
        return this.vm.detail ?? fallback;
    }
    private share(): void {
        const detail: RecipeDetail = this.detail();
        const context: common.UIAbilityContext = getContext(this) as common.UIAbilityContext;
        const link: string = `${BuildProfile.SHARE_BASE_URL as string}${detail.id}`;
        ShareHelper.share(context, detail.name, detail.summary, link);
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
