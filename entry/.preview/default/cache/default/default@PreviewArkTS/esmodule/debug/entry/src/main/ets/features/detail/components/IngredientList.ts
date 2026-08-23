if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
import { displayAmount } from "@bundle:com.eatapp.recipe/entry/ets/commons/model/Recipe";
import type { RecipeIngredient } from "@bundle:com.eatapp.recipe/entry/ets/commons/model/Recipe";
import { MiniTag } from "@bundle:com.eatapp.recipe/entry/ets/commons/uikit/TagChip";
import { Formatter } from "@bundle:com.eatapp.recipe/entry/ets/commons/utils/Formatter";
export class IngredientList extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.initParam("ingredients", (params && "ingredients" in params) ? params.ingredients : []);
        this.initParam("servings", (params && "servings" in params) ? params.servings : 1);
        this.initParam("baseServings", (params && "baseServings" in params) ? params.baseServings : 1);
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
        this.resetParam("ingredients", (params && "ingredients" in params) ? params.ingredients : []);
        this.resetParam("servings", (params && "servings" in params) ? params.servings : 1);
        this.resetParam("baseServings", (params && "baseServings" in params) ? params.baseServings : 1);
    }
    @Param
    readonly ingredients: RecipeIngredient[];
    @Param
    readonly servings: number;
    @Param
    readonly baseServings: number;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/features/detail/components/IngredientList.ets(16:5)", "entry");
            Column.width('100%');
            Column.padding({ left: { "id": 16777441, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }, right: { "id": 16777441, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" } });
            Column.backgroundColor({ "id": 16777234, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Column.borderRadius({ "id": 16777437, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, index: number) => {
                const item = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create({ space: 2 });
                    Column.debugLine("entry/src/main/ets/features/detail/components/IngredientList.ets(18:9)", "entry");
                    Column.width('100%');
                    Column.padding({ top: { "id": 16777442, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }, bottom: { "id": 16777442, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" } });
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create({ space: 8 });
                    Row.debugLine("entry/src/main/ets/features/detail/components/IngredientList.ets(19:11)", "entry");
                    Row.width('100%');
                    Row.alignItems(VerticalAlign.Center);
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(item.name);
                    Text.debugLine("entry/src/main/ets/features/detail/components/IngredientList.ets(20:13)", "entry");
                    Text.fontSize({ "id": 16777426, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                    Text.fontColor({ "id": 16777246, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    If.create();
                    if (item.isOptional) {
                        this.ifElseBranchUpdateFunction(0, () => {
                            {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    if (isInitialRender) {
                                        let componentCall = new MiniTag(this, { text: { "id": 16777322, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" } }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/features/detail/components/IngredientList.ets", line: 24, col: 15 });
                                        ViewV2.create(componentCall);
                                        let paramsLambda = () => {
                                            return {
                                                text: { "id": 16777322, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }
                                            };
                                        };
                                        componentCall.paramsGenerator_ = paramsLambda;
                                    }
                                    else {
                                        this.updateStateVarsOfChildByElmtId(elmtId, {
                                            text: { "id": 16777322, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }
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
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.debugLine("entry/src/main/ets/features/detail/components/IngredientList.ets(26:13)", "entry");
                    Row.layoutWeight(1);
                }, Row);
                Row.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(this.amountText(item));
                    Text.debugLine("entry/src/main/ets/features/detail/components/IngredientList.ets(27:13)", "entry");
                    Text.fontSize({ "id": 16777426, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                    Text.fontColor({ "id": 16777247, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                }, Text);
                Text.pop();
                Row.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    If.create();
                    if (item.remark.length > 0) {
                        this.ifElseBranchUpdateFunction(0, () => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create(item.remark);
                                Text.debugLine("entry/src/main/ets/features/detail/components/IngredientList.ets(35:13)", "entry");
                                Text.fontSize({ "id": 16777428, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                                Text.fontColor({ "id": 16777248, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
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
                Column.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    If.create();
                    if (index < this.ingredients.length - 1) {
                        this.ifElseBranchUpdateFunction(0, () => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Divider.create();
                                Divider.debugLine("entry/src/main/ets/features/detail/components/IngredientList.ets(45:11)", "entry");
                                Divider.color({ "id": 16777238, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                                Divider.strokeWidth(1);
                            }, Divider);
                        });
                    }
                    else {
                        this.ifElseBranchUpdateFunction(1, () => {
                        });
                    }
                }, If);
                If.pop();
            };
            this.forEachUpdateFunction(elmtId, this.ingredients, forEachItemGenFunction, (item: RecipeIngredient) => item.id, true, false);
        }, ForEach);
        ForEach.pop();
        Column.pop();
    }
    private amountText(item: RecipeIngredient): string {
        const value: number = displayAmount(item, this.servings, this.baseServings);
        return `${Formatter.amount(value)}${item.unit}`;
    }
    public updateStateVars(params) {
        if (params === undefined) {
            return;
        }
        if ("ingredients" in params) {
            this.updateParam("ingredients", params.ingredients);
        }
        if ("servings" in params) {
            this.updateParam("servings", params.servings);
        }
        if ("baseServings" in params) {
            this.updateParam("baseServings", params.baseServings);
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
}
