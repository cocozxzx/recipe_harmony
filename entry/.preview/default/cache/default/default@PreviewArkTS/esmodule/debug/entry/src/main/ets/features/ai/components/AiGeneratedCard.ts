if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
import type { AiGeneratedRecipe } from '../../../commons/model/Ai';
import { displayAmount } from "@bundle:com.eatapp.recipe/entry/ets/commons/model/Recipe";
import type { RecipeIngredient, RecipeStep, RecipeTip } from "@bundle:com.eatapp.recipe/entry/ets/commons/model/Recipe";
import { CookTimeLabel } from "@bundle:com.eatapp.recipe/entry/ets/commons/uikit/CookTimeLabel";
import { DifficultyStars } from "@bundle:com.eatapp.recipe/entry/ets/commons/uikit/DifficultyStars";
import { MiniTag } from "@bundle:com.eatapp.recipe/entry/ets/commons/uikit/TagChip";
import { Shadows } from "@bundle:com.eatapp.recipe/entry/ets/commons/uikit/Theme";
import { Formatter } from "@bundle:com.eatapp.recipe/entry/ets/commons/utils/Formatter";
export class AiGeneratedCard extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.initParam("recipe", (params && "recipe" in params) ? params.recipe : {
            id: '',
            name: '',
            summary: '',
            difficulty: 0,
            calorie: 0,
            cookTime: 0,
            baseServings: 0,
            ingredients: [],
            steps: [],
            tips: [],
            favorited: false,
            createTime: ''
        });
        this.initParam("expandable", (params && "expandable" in params) ? params.expandable : true);
        this.expanded = false;
        this.onToggleFavorite = "onToggleFavorite" in params ? params.onToggleFavorite : () => { };
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
        this.resetParam("recipe", (params && "recipe" in params) ? params.recipe : {
            id: '',
            name: '',
            summary: '',
            difficulty: 0,
            calorie: 0,
            cookTime: 0,
            baseServings: 0,
            ingredients: [],
            steps: [],
            tips: [],
            favorited: false,
            createTime: ''
        });
        this.resetParam("expandable", (params && "expandable" in params) ? params.expandable : true);
        this.expanded = false;
        this.onToggleFavorite = "onToggleFavorite" in params ? params.onToggleFavorite : () => { };
    }
    @Param
    readonly recipe: AiGeneratedRecipe;
    @Param
    readonly expandable: boolean;
    @Local
    expanded: boolean;
    @Event
    onToggleFavorite: () => void;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 12 });
            Column.debugLine("entry/src/main/ets/features/ai/components/AiGeneratedCard.ets(36:5)", "entry");
            Column.width('100%');
            Column.padding({ "id": 16777441, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Column.backgroundColor({ "id": 16777234, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Column.borderRadius({ "id": 16777436, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Column.shadow(Shadows.card);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 8 });
            Row.debugLine("entry/src/main/ets/features/ai/components/AiGeneratedCard.ets(37:7)", "entry");
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.recipe.name);
            Text.debugLine("entry/src/main/ets/features/ai/components/AiGeneratedCard.ets(38:9)", "entry");
            Text.fontSize({ "id": 16777432, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor({ "id": 16777246, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new MiniTag(this, {
                        text: { "id": 16777282, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                        bgColor: { "id": 16777229, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                        textColor: { "id": 16777228, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/features/ai/components/AiGeneratedCard.ets", line: 43, col: 9 });
                    ViewV2.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            text: { "id": 16777282, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                            bgColor: { "id": 16777229, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                            textColor: { "id": 16777228, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        text: { "id": 16777282, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                        bgColor: { "id": 16777229, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                        textColor: { "id": 16777228, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }
                    });
                }
            }, { name: "MiniTag" });
        }
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.recipe.summary.length > 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.recipe.summary);
                        Text.debugLine("entry/src/main/ets/features/ai/components/AiGeneratedCard.ets(52:9)", "entry");
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
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 12 });
            Row.debugLine("entry/src/main/ets/features/ai/components/AiGeneratedCard.ets(59:7)", "entry");
            Row.width('100%');
        }, Row);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new DifficultyStars(this, { value: this.recipe.difficulty }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/features/ai/components/AiGeneratedCard.ets", line: 60, col: 9 });
                    ViewV2.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            value: this.recipe.difficulty
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        value: this.recipe.difficulty
                    });
                }
            }, { name: "DifficultyStars" });
        }
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new CookTimeLabel(this, { minutes: this.recipe.cookTime }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/features/ai/components/AiGeneratedCard.ets", line: 61, col: 9 });
                    ViewV2.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            minutes: this.recipe.cookTime
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        minutes: this.recipe.cookTime
                    });
                }
            }, { name: "CookTimeLabel" });
        }
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create();
            Text.debugLine("entry/src/main/ets/features/ai/components/AiGeneratedCard.ets(62:9)", "entry");
            Text.fontSize({ "id": 16777428, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Text.fontColor({ "id": 16777248, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
        }, Text);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Span.create(Formatter.caloriePerServing(this.recipe.calorie, this.recipe.baseServings).toString());
            Span.debugLine("entry/src/main/ets/features/ai/components/AiGeneratedCard.ets(63:11)", "entry");
        }, Span);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Span.create({ "id": 16777330, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Span.debugLine("entry/src/main/ets/features/ai/components/AiGeneratedCard.ets(64:11)", "entry");
        }, Span);
        Text.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.expanded || !this.expandable) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.details.bind(this)();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 16 });
            Row.debugLine("entry/src/main/ets/features/ai/components/AiGeneratedCard.ets(75:7)", "entry");
            Row.width('100%');
            Row.alignItems(VerticalAlign.Center);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.expandable) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.expanded ? { "id": 16777311, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" } : { "id": 16777320, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        Text.debugLine("entry/src/main/ets/features/ai/components/AiGeneratedCard.ets(77:11)", "entry");
                        Text.fontSize({ "id": 16777427, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        Text.fontColor({ "id": 16777235, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        Text.onClick(() => { this.expanded = !this.expanded; });
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
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/features/ai/components/AiGeneratedCard.ets(82:9)", "entry");
            Row.layoutWeight(1);
        }, Row);
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(this.recipe.favorited ? { "id": 16777257, "type": 20000, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" } : { "id": 16777420, "type": 20000, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Image.debugLine("entry/src/main/ets/features/ai/components/AiGeneratedCard.ets(83:9)", "entry");
            Image.width({ "id": 16777434, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Image.height({ "id": 16777434, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Image.fillColor(this.recipe.favorited ? { "id": 16777230, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" } : { "id": 16777248, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Image.onClick(() => this.onToggleFavorite());
        }, Image);
        Row.pop();
        Column.pop();
    }
    details(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 12 });
            Column.debugLine("entry/src/main/ets/features/ai/components/AiGeneratedCard.ets(101:5)", "entry");
            Column.width('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Divider.create();
            Divider.debugLine("entry/src/main/ets/features/ai/components/AiGeneratedCard.ets(102:7)", "entry");
            Divider.color({ "id": 16777238, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Divider.strokeWidth(1);
        }, Divider);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777329, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Text.debugLine("entry/src/main/ets/features/ai/components/AiGeneratedCard.ets(104:7)", "entry");
            Text.fontSize({ "id": 16777426, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor({ "id": 16777246, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Text.width('100%');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const item = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.debugLine("entry/src/main/ets/features/ai/components/AiGeneratedCard.ets(110:9)", "entry");
                    Row.width('100%');
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(item.name);
                    Text.debugLine("entry/src/main/ets/features/ai/components/AiGeneratedCard.ets(111:11)", "entry");
                    Text.fontSize({ "id": 16777427, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                    Text.fontColor({ "id": 16777246, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                    Text.layoutWeight(1);
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(`${Formatter.amount(displayAmount(item, this.recipe.baseServings, this.recipe.baseServings))}${item.unit}`);
                    Text.debugLine("entry/src/main/ets/features/ai/components/AiGeneratedCard.ets(115:11)", "entry");
                    Text.fontSize({ "id": 16777427, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                    Text.fontColor({ "id": 16777247, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                }, Text);
                Text.pop();
                Row.pop();
            };
            this.forEachUpdateFunction(elmtId, this.recipe.ingredients, forEachItemGenFunction, (item: RecipeIngredient) => item.id, false, false);
        }, ForEach);
        ForEach.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777335, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Text.debugLine("entry/src/main/ets/features/ai/components/AiGeneratedCard.ets(122:7)", "entry");
            Text.fontSize({ "id": 16777426, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor({ "id": 16777246, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Text.width('100%');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, index: number) => {
                const step = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(`${index + 1}. ${step.content}`);
                    Text.debugLine("entry/src/main/ets/features/ai/components/AiGeneratedCard.ets(128:9)", "entry");
                    Text.fontSize({ "id": 16777427, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                    Text.fontColor({ "id": 16777247, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                    Text.lineHeight(22);
                    Text.width('100%');
                }, Text);
                Text.pop();
            };
            this.forEachUpdateFunction(elmtId, this.recipe.steps, forEachItemGenFunction, (step: RecipeStep) => step.id, true, false);
        }, ForEach);
        ForEach.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.recipe.tips.length > 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create({ "id": 16777336, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        Text.debugLine("entry/src/main/ets/features/ai/components/AiGeneratedCard.ets(136:9)", "entry");
                        Text.fontSize({ "id": 16777426, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        Text.fontWeight(FontWeight.Medium);
                        Text.fontColor({ "id": 16777246, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        Text.width('100%');
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        ForEach.create();
                        const forEachItemGenFunction = _item => {
                            const tip = _item;
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create(tip.content);
                                Text.debugLine("entry/src/main/ets/features/ai/components/AiGeneratedCard.ets(142:11)", "entry");
                                Text.fontSize({ "id": 16777427, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                                Text.fontColor({ "id": 16777247, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                                Text.lineHeight(22);
                                Text.width('100%');
                            }, Text);
                            Text.pop();
                        };
                        this.forEachUpdateFunction(elmtId, this.recipe.tips, forEachItemGenFunction, (tip: RecipeTip) => tip.id, false, false);
                    }, ForEach);
                    ForEach.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Column.pop();
    }
    public updateStateVars(params) {
        if (params === undefined) {
            return;
        }
        if ("recipe" in params) {
            this.updateParam("recipe", params.recipe);
        }
        if ("expandable" in params) {
            this.updateParam("expandable", params.expandable);
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
}
