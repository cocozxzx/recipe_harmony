if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
import type { RecipeStep } from '../../../commons/model/Recipe';
import { NetImage } from "@bundle:com.eatapp.recipe/entry/ets/commons/uikit/NetImage";
export class StepList extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.initParam("steps", (params && "steps" in params) ? params.steps : []);
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
        this.resetParam("steps", (params && "steps" in params) ? params.steps : []);
    }
    @Param
    readonly steps: RecipeStep[];
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 16 });
            Column.debugLine("entry/src/main/ets/features/detail/components/StepList.ets(13:5)", "entry");
            Column.width('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, index: number) => {
                const step = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create({ space: 12 });
                    Row.debugLine("entry/src/main/ets/features/detail/components/StepList.ets(15:9)", "entry");
                    Row.width('100%');
                    Row.alignItems(VerticalAlign.Top);
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create((index + 1).toString());
                    Text.debugLine("entry/src/main/ets/features/detail/components/StepList.ets(16:11)", "entry");
                    Text.fontSize({ "id": 16777427, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                    Text.fontWeight(FontWeight.Medium);
                    Text.fontColor({ "id": 16777245, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                    Text.width(24);
                    Text.height(24);
                    Text.borderRadius(12);
                    Text.backgroundColor({ "id": 16777235, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                    Text.textAlign(TextAlign.Center);
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create({ space: 8 });
                    Column.debugLine("entry/src/main/ets/features/detail/components/StepList.ets(26:11)", "entry");
                    Column.alignItems(HorizontalAlign.Start);
                    Column.layoutWeight(1);
                }, Column);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(step.content);
                    Text.debugLine("entry/src/main/ets/features/detail/components/StepList.ets(27:13)", "entry");
                    Text.fontSize({ "id": 16777426, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                    Text.fontColor({ "id": 16777246, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                    Text.lineHeight(24);
                    Text.width('100%');
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    If.create();
                    if (step.image?.length > 0) {
                        this.ifElseBranchUpdateFunction(0, () => {
                            {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    if (isInitialRender) {
                                        let componentCall = new NetImage(this, {
                                            url: step.image,
                                            imgWidth: '100%',
                                            imgHeight: 180,
                                            radius: { "id": 16777437, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }
                                        }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/features/detail/components/StepList.ets", line: 34, col: 15 });
                                        ViewV2.create(componentCall);
                                        let paramsLambda = () => {
                                            return {
                                                url: step.image,
                                                imgWidth: '100%',
                                                imgHeight: 180,
                                                radius: { "id": 16777437, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }
                                            };
                                        };
                                        componentCall.paramsGenerator_ = paramsLambda;
                                    }
                                    else {
                                        this.updateStateVarsOfChildByElmtId(elmtId, {
                                            url: step.image,
                                            imgWidth: '100%',
                                            imgHeight: 180,
                                            radius: { "id": 16777437, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }
                                        });
                                    }
                                }, { name: "NetImage" });
                            }
                        });
                    }
                    else {
                        this.ifElseBranchUpdateFunction(1, () => {
                        });
                    }
                }, If);
                If.pop();
                Column.pop();
                Row.pop();
            };
            this.forEachUpdateFunction(elmtId, this.steps, forEachItemGenFunction, (step: RecipeStep) => step.id, true, false);
        }, ForEach);
        ForEach.pop();
        Column.pop();
    }
    public updateStateVars(params) {
        if (params === undefined) {
            return;
        }
        if ("steps" in params) {
            this.updateParam("steps", params.steps);
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
}
