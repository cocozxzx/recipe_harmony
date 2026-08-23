if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
export class TagChip extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.initParam("text", (params && "text" in params) ? params.text : '');
        this.initParam("selected", (params && "selected" in params) ? params.selected : false);
        this.onTap = "onTap" in params ? params.onTap : () => { };
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
        this.resetParam("text", (params && "text" in params) ? params.text : '');
        this.resetParam("selected", (params && "selected" in params) ? params.selected : false);
        this.onTap = "onTap" in params ? params.onTap : () => { };
    }
    @Param
    readonly text: string;
    @Param
    readonly selected: boolean;
    @Event
    onTap: () => void;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.text);
            Text.debugLine("entry/src/main/ets/commons/uikit/TagChip.ets(9:5)", "entry");
            Text.fontSize({ "id": 16777427, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Text.fontColor(this.selected ? { "id": 16777235, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" } : { "id": 16777247, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Text.fontWeight(this.selected ? FontWeight.Medium : FontWeight.Normal);
            Text.height({ "id": 16777424, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Text.padding({ left: { "id": 16777441, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }, right: { "id": 16777441, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" } });
            Text.borderRadius({ "id": 16777438, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Text.backgroundColor(this.selected ? { "id": 16777237, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" } : { "id": 16777233, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Text.textAlign(TextAlign.Center);
            Text.maxLines(1);
            Text.onClick(() => this.onTap());
        }, Text);
        Text.pop();
    }
    public updateStateVars(params) {
        if (params === undefined) {
            return;
        }
        if ("text" in params) {
            this.updateParam("text", params.text);
        }
        if ("selected" in params) {
            this.updateParam("selected", params.selected);
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
}
export class MiniTag extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.initParam("text", (params && "text" in params) ? params.text : '');
        this.initParam("bgColor", (params && "bgColor" in params) ? params.bgColor : { "id": 16777233, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
        this.initParam("textColor", (params && "textColor" in params) ? params.textColor : { "id": 16777248, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
        this.resetParam("text", (params && "text" in params) ? params.text : '');
        this.resetParam("bgColor", (params && "bgColor" in params) ? params.bgColor : { "id": 16777233, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
        this.resetParam("textColor", (params && "textColor" in params) ? params.textColor : { "id": 16777248, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
    }
    @Param
    readonly text: ResourceStr;
    @Param
    readonly bgColor: ResourceColor;
    @Param
    readonly textColor: ResourceColor;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.text);
            Text.debugLine("entry/src/main/ets/commons/uikit/TagChip.ets(31:5)", "entry");
            Text.fontSize({ "id": 16777428, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Text.fontColor(this.textColor);
            Text.padding({ left: 6, right: 6, top: 2, bottom: 2 });
            Text.borderRadius({ "id": 16777438, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Text.backgroundColor(this.bgColor);
        }, Text);
        Text.pop();
    }
    public updateStateVars(params) {
        if (params === undefined) {
            return;
        }
        if ("text" in params) {
            this.updateParam("text", params.text);
        }
        if ("bgColor" in params) {
            this.updateParam("bgColor", params.bgColor);
        }
        if ("textColor" in params) {
            this.updateParam("textColor", params.textColor);
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
}
