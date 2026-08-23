if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
export class ServingsStepper extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.initParam("servings", (params && "servings" in params) ? params.servings : 1);
        this.initParam("canDecrease", (params && "canDecrease" in params) ? params.canDecrease : true);
        this.initParam("canIncrease", (params && "canIncrease" in params) ? params.canIncrease : true);
        this.onDecrease = "onDecrease" in params ? params.onDecrease : () => { };
        this.onIncrease = "onIncrease" in params ? params.onIncrease : () => { };
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
        this.resetParam("servings", (params && "servings" in params) ? params.servings : 1);
        this.resetParam("canDecrease", (params && "canDecrease" in params) ? params.canDecrease : true);
        this.resetParam("canIncrease", (params && "canIncrease" in params) ? params.canIncrease : true);
        this.onDecrease = "onDecrease" in params ? params.onDecrease : () => { };
        this.onIncrease = "onIncrease" in params ? params.onIncrease : () => { };
    }
    @Param
    readonly servings: number;
    @Param
    readonly canDecrease: boolean;
    @Param
    readonly canIncrease: boolean;
    @Event
    onDecrease: () => void;
    @Event
    onIncrease: () => void;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/features/detail/components/ServingsStepper.ets(14:5)", "entry");
            Row.width('100%');
            Row.padding({ "id": 16777441, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Row.backgroundColor({ "id": 16777234, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Row.borderRadius({ "id": 16777437, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777332, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Text.debugLine("entry/src/main/ets/features/detail/components/ServingsStepper.ets(15:7)", "entry");
            Text.fontSize({ "id": 16777426, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Text.fontColor({ "id": 16777246, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 12 });
            Row.debugLine("entry/src/main/ets/features/detail/components/ServingsStepper.ets(20:7)", "entry");
            Row.alignItems(VerticalAlign.Center);
        }, Row);
        this.stepButton.bind(this)({ "id": 16777449, "type": 20000, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }, this.canDecrease, () => this.onDecrease());
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create();
            Text.debugLine("entry/src/main/ets/features/detail/components/ServingsStepper.ets(23:9)", "entry");
            Text.fontSize({ "id": 16777426, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor({ "id": 16777246, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Text.constraintSize({ minWidth: 44 });
            Text.textAlign(TextAlign.Center);
        }, Text);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Span.create(this.servings.toString());
            Span.debugLine("entry/src/main/ets/features/detail/components/ServingsStepper.ets(24:11)", "entry");
        }, Span);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Span.create({ "id": 16777326, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Span.debugLine("entry/src/main/ets/features/detail/components/ServingsStepper.ets(25:11)", "entry");
        }, Span);
        Text.pop();
        this.stepButton.bind(this)({ "id": 16777258, "type": 20000, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }, this.canIncrease, () => this.onIncrease());
        Row.pop();
        Row.pop();
    }
    stepButton(icon: Resource, enabled: boolean, action: () => void, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(icon);
            Image.debugLine("entry/src/main/ets/features/detail/components/ServingsStepper.ets(45:5)", "entry");
            Image.width({ "id": 16777434, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Image.height({ "id": 16777434, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Image.fillColor(enabled ? { "id": 16777235, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" } : { "id": 16777244, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Image.padding(6);
            Image.borderRadius({ "id": 16777438, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Image.backgroundColor({ "id": 16777233, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Image.enabled(enabled);
            Image.onClick(() => action());
        }, Image);
    }
    public updateStateVars(params) {
        if (params === undefined) {
            return;
        }
        if ("servings" in params) {
            this.updateParam("servings", params.servings);
        }
        if ("canDecrease" in params) {
            this.updateParam("canDecrease", params.canDecrease);
        }
        if ("canIncrease" in params) {
            this.updateParam("canIncrease", params.canIncrease);
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
}
