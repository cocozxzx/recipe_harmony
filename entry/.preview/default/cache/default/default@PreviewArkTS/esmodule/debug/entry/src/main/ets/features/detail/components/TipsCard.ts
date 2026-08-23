if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
import type { RecipeTip } from '../../../commons/model/Recipe';
export class TipsCard extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.initParam("tips", (params && "tips" in params) ? params.tips : []);
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
        this.resetParam("tips", (params && "tips" in params) ? params.tips : []);
    }
    @Param
    readonly tips: RecipeTip[];
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 10 });
            Column.debugLine("entry/src/main/ets/features/detail/components/TipsCard.ets(15:5)", "entry");
            Column.width('100%');
            Column.padding({ "id": 16777440, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Column.backgroundColor({ "id": 16777229, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Column.borderRadius({ "id": 16777437, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = (_item, index: number) => {
                const tip = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create({ space: 8 });
                    Row.debugLine("entry/src/main/ets/features/detail/components/TipsCard.ets(17:9)", "entry");
                    Row.width('100%');
                    Row.alignItems(VerticalAlign.Top);
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create('·');
                    Text.debugLine("entry/src/main/ets/features/detail/components/TipsCard.ets(18:11)", "entry");
                    Text.fontSize({ "id": 16777426, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                    Text.fontColor({ "id": 16777228, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                }, Text);
                Text.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(tip.content);
                    Text.debugLine("entry/src/main/ets/features/detail/components/TipsCard.ets(21:11)", "entry");
                    Text.fontSize({ "id": 16777427, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                    Text.fontColor({ "id": 16777247, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                    Text.lineHeight(22);
                    Text.layoutWeight(1);
                }, Text);
                Text.pop();
                Row.pop();
            };
            this.forEachUpdateFunction(elmtId, this.tips, forEachItemGenFunction, (tip: RecipeTip) => tip.id, true, false);
        }, ForEach);
        ForEach.pop();
        Column.pop();
    }
    public updateStateVars(params) {
        if (params === undefined) {
            return;
        }
        if ("tips" in params) {
            this.updateParam("tips", params.tips);
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
}
