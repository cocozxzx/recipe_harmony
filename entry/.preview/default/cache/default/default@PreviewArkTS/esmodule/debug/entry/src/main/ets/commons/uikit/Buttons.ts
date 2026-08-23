if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
import { Motion } from "@bundle:com.eatapp.recipe/entry/ets/commons/uikit/Theme";
export class PrimaryButton extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.initParam("text", (params && "text" in params) ? params.text : '');
        this.initParam("btnEnabled", (params && "btnEnabled" in params) ? params.btnEnabled : true);
        this.initParam("loading", (params && "loading" in params) ? params.loading : false);
        this.initParam("fullWidth", (params && "fullWidth" in params) ? params.fullWidth : true);
        this.onTap = "onTap" in params ? params.onTap : () => { };
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
        this.resetParam("text", (params && "text" in params) ? params.text : '');
        this.resetParam("btnEnabled", (params && "btnEnabled" in params) ? params.btnEnabled : true);
        this.resetParam("loading", (params && "loading" in params) ? params.loading : false);
        this.resetParam("fullWidth", (params && "fullWidth" in params) ? params.fullWidth : true);
        this.onTap = "onTap" in params ? params.onTap : () => { };
    }
    @Param
    readonly text: ResourceStr;
    @Param
    readonly btnEnabled: boolean;
    @Param
    readonly loading: boolean;
    @Param
    readonly fullWidth: boolean;
    @Event
    onTap: () => void;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithChild({ stateEffect: this.btnEnabled && !this.loading });
            Button.debugLine("entry/src/main/ets/commons/uikit/Buttons.ets(13:5)", "entry");
            globalThis.Context.animation(Motion.standard());
            Button.type(ButtonType.Normal);
            Button.width(this.fullWidth ? '100%' : undefined);
            Button.constraintSize({ minWidth: this.fullWidth ? 0 : 120 });
            Button.height({ "id": 16777422, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Button.borderRadius({ "id": 16777437, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Button.backgroundColor(this.btnEnabled ? { "id": 16777235, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" } : { "id": 16777244, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Button.padding({ left: { "id": 16777440, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }, right: { "id": 16777440, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" } });
            Button.enabled(this.btnEnabled && !this.loading);
            globalThis.Context.animation(null);
            Button.onClick(() => this.onTap());
        }, Button);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 8 });
            Row.debugLine("entry/src/main/ets/commons/uikit/Buttons.ets(14:7)", "entry");
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.loading) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        LoadingProgress.create();
                        LoadingProgress.debugLine("entry/src/main/ets/commons/uikit/Buttons.ets(16:11)", "entry");
                        LoadingProgress.width({ "id": 16777434, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        LoadingProgress.height({ "id": 16777434, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        LoadingProgress.color({ "id": 16777245, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                    }, LoadingProgress);
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.text);
            Text.debugLine("entry/src/main/ets/commons/uikit/Buttons.ets(21:9)", "entry");
            Text.fontSize({ "id": 16777432, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor({ "id": 16777245, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
        }, Text);
        Text.pop();
        Row.pop();
        Button.pop();
    }
    public updateStateVars(params) {
        if (params === undefined) {
            return;
        }
        if ("text" in params) {
            this.updateParam("text", params.text);
        }
        if ("btnEnabled" in params) {
            this.updateParam("btnEnabled", params.btnEnabled);
        }
        if ("loading" in params) {
            this.updateParam("loading", params.loading);
        }
        if ("fullWidth" in params) {
            this.updateParam("fullWidth", params.fullWidth);
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
}
export class SecondaryButton extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.initParam("text", (params && "text" in params) ? params.text : '');
        this.initParam("btnEnabled", (params && "btnEnabled" in params) ? params.btnEnabled : true);
        this.initParam("fullWidth", (params && "fullWidth" in params) ? params.fullWidth : true);
        this.onTap = "onTap" in params ? params.onTap : () => { };
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
        this.resetParam("text", (params && "text" in params) ? params.text : '');
        this.resetParam("btnEnabled", (params && "btnEnabled" in params) ? params.btnEnabled : true);
        this.resetParam("fullWidth", (params && "fullWidth" in params) ? params.fullWidth : true);
        this.onTap = "onTap" in params ? params.onTap : () => { };
    }
    @Param
    readonly text: ResourceStr;
    @Param
    readonly btnEnabled: boolean;
    @Param
    readonly fullWidth: boolean;
    @Event
    onTap: () => void;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel(this.text, { stateEffect: this.btnEnabled });
            Button.debugLine("entry/src/main/ets/commons/uikit/Buttons.ets(49:5)", "entry");
            Button.type(ButtonType.Normal);
            Button.width(this.fullWidth ? '100%' : undefined);
            Button.constraintSize({ minWidth: this.fullWidth ? 0 : 120 });
            Button.height({ "id": 16777422, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Button.borderRadius({ "id": 16777437, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Button.backgroundColor({ "id": 16777237, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Button.fontColor(this.btnEnabled ? { "id": 16777235, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" } : { "id": 16777244, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Button.fontSize({ "id": 16777432, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Button.fontWeight(FontWeight.Medium);
            Button.padding({ left: { "id": 16777440, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }, right: { "id": 16777440, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" } });
            Button.enabled(this.btnEnabled);
            Button.onClick(() => this.onTap());
        }, Button);
        Button.pop();
    }
    public updateStateVars(params) {
        if (params === undefined) {
            return;
        }
        if ("text" in params) {
            this.updateParam("text", params.text);
        }
        if ("btnEnabled" in params) {
            this.updateParam("btnEnabled", params.btnEnabled);
        }
        if ("fullWidth" in params) {
            this.updateParam("fullWidth", params.fullWidth);
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
}
export class TextButton extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.initParam("text", (params && "text" in params) ? params.text : '');
        this.initParam("color", (params && "color" in params) ? params.color : { "id": 16777235, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
        this.initParam("textSize", (params && "textSize" in params) ? params.textSize : { "id": 16777426, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
        this.onTap = "onTap" in params ? params.onTap : () => { };
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
        this.resetParam("text", (params && "text" in params) ? params.text : '');
        this.resetParam("color", (params && "color" in params) ? params.color : { "id": 16777235, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
        this.resetParam("textSize", (params && "textSize" in params) ? params.textSize : { "id": 16777426, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
        this.onTap = "onTap" in params ? params.onTap : () => { };
    }
    @Param
    readonly text: ResourceStr;
    @Param
    readonly color: ResourceColor;
    @Param
    readonly textSize: Length;
    @Event
    onTap: () => void;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.text);
            Text.debugLine("entry/src/main/ets/commons/uikit/Buttons.ets(74:5)", "entry");
            Text.fontSize(this.textSize);
            Text.fontColor(this.color);
            Text.fontWeight(FontWeight.Medium);
            Text.padding({ left: { "id": 16777442, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }, right: { "id": 16777442, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }, top: 4, bottom: 4 });
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
        if ("color" in params) {
            this.updateParam("color", params.color);
        }
        if ("textSize" in params) {
            this.updateParam("textSize", params.textSize);
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
}
