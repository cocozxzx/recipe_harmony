if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
export class AiEntryCard extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.onTap = "onTap" in params ? params.onTap : () => { };
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
        this.onTap = "onTap" in params ? params.onTap : () => { };
    }
    @Event
    onTap: () => void;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 12 });
            Row.debugLine("entry/src/main/ets/features/home/components/AiEntryCard.ets(12:5)", "entry");
            Row.width('100%');
            Row.padding({ "id": 16777440, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Row.backgroundColor({ "id": 16777237, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Row.borderRadius({ "id": 16777436, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Row.onClick(() => this.onTap());
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 4 });
            Column.debugLine("entry/src/main/ets/features/home/components/AiEntryCard.ets(13:7)", "entry");
            Column.alignItems(HorizontalAlign.Start);
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777343, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Text.debugLine("entry/src/main/ets/features/home/components/AiEntryCard.ets(14:9)", "entry");
            Text.fontSize({ "id": 16777432, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor({ "id": 16777246, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777342, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Text.debugLine("entry/src/main/ets/features/home/components/AiEntryCard.ets(18:9)", "entry");
            Text.fontSize({ "id": 16777427, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Text.fontColor({ "id": 16777247, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777259, "type": 20000, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Image.debugLine("entry/src/main/ets/features/home/components/AiEntryCard.ets(25:7)", "entry");
            Image.width(40);
            Image.height(40);
            Image.fillColor({ "id": 16777235, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
        }, Image);
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
