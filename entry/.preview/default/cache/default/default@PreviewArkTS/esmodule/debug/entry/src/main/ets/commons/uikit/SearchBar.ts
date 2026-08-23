if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
export class SearchBar extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.initParam("text", (params && "text" in params) ? params.text : '');
        this.initParam("placeholder", (params && "placeholder" in params) ? params.placeholder : { "id": 16777412, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
        this.initParam("readOnly", (params && "readOnly" in params) ? params.readOnly : false);
        this.initParam("autoFocus", (params && "autoFocus" in params) ? params.autoFocus : false);
        this.onTextChange = "onTextChange" in params ? params.onTextChange : () => { };
        this.onSubmit = "onSubmit" in params ? params.onSubmit : () => { };
        this.onTap = "onTap" in params ? params.onTap : () => { };
        this.controller = new TextInputController();
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
        this.resetParam("text", (params && "text" in params) ? params.text : '');
        this.resetParam("placeholder", (params && "placeholder" in params) ? params.placeholder : { "id": 16777412, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
        this.resetParam("readOnly", (params && "readOnly" in params) ? params.readOnly : false);
        this.resetParam("autoFocus", (params && "autoFocus" in params) ? params.autoFocus : false);
        this.onTextChange = "onTextChange" in params ? params.onTextChange : () => { };
        this.onSubmit = "onSubmit" in params ? params.onSubmit : () => { };
        this.onTap = "onTap" in params ? params.onTap : () => { };
    }
    @Param
    readonly text: string;
    @Param
    readonly placeholder: ResourceStr;
    @Param
    readonly readOnly: boolean;
    @Param
    readonly autoFocus: boolean;
    @Event
    onTextChange: (value: string) => void;
    @Event
    onSubmit: (value: string) => void;
    @Event
    onTap: () => void;
    private controller: TextInputController;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 8 });
            Row.debugLine("entry/src/main/ets/commons/uikit/SearchBar.ets(19:5)", "entry");
            Row.width('100%');
            Row.height(44);
            Row.padding({ left: { "id": 16777441, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }, right: { "id": 16777441, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" } });
            Row.backgroundColor({ "id": 16777233, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Row.borderRadius({ "id": 16777437, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Row.onClick(() => {
                if (this.readOnly) {
                    this.onTap();
                }
            });
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777255, "type": 20000, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Image.debugLine("entry/src/main/ets/commons/uikit/SearchBar.ets(20:7)", "entry");
            Image.width({ "id": 16777434, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Image.height({ "id": 16777434, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Image.fillColor({ "id": 16777248, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.readOnly) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.text.length > 0 ? this.text : this.placeholder);
                        Text.debugLine("entry/src/main/ets/commons/uikit/SearchBar.ets(26:9)", "entry");
                        Text.fontSize({ "id": 16777426, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        Text.fontColor(this.text.length > 0 ? { "id": 16777246, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" } : { "id": 16777248, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        Text.layoutWeight(1);
                        Text.maxLines(1);
                    }, Text);
                    Text.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        TextInput.create({ text: this.text, placeholder: this.placeholder, controller: this.controller });
                        TextInput.debugLine("entry/src/main/ets/commons/uikit/SearchBar.ets(32:9)", "entry");
                        TextInput.layoutWeight(1);
                        TextInput.height(40);
                        TextInput.padding(0);
                        TextInput.borderRadius(0);
                        TextInput.backgroundColor({ "id": 16777249, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        TextInput.fontSize({ "id": 16777426, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        TextInput.fontColor({ "id": 16777246, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        TextInput.placeholderColor({ "id": 16777248, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        TextInput.enterKeyType(EnterKeyType.Search);
                        TextInput.defaultFocus(this.autoFocus);
                        TextInput.onChange((value: string) => this.onTextChange(value));
                        TextInput.onSubmit(() => this.onSubmit(this.text));
                    }, TextInput);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        If.create();
                        if (this.text.length > 0) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Image.create({ "id": 16777219, "type": 20000, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                                    Image.debugLine("entry/src/main/ets/commons/uikit/SearchBar.ets(47:11)", "entry");
                                    Image.width({ "id": 16777435, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                                    Image.height({ "id": 16777435, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                                    Image.fillColor({ "id": 16777248, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                                    Image.onClick(() => this.onTextChange(''));
                                }, Image);
                            });
                        }
                        else {
                            this.ifElseBranchUpdateFunction(1, () => {
                            });
                        }
                    }, If);
                    If.pop();
                });
            }
        }, If);
        If.pop();
        Row.pop();
    }
    public updateStateVars(params) {
        if (params === undefined) {
            return;
        }
        if ("text" in params) {
            this.updateParam("text", params.text);
        }
        if ("placeholder" in params) {
            this.updateParam("placeholder", params.placeholder);
        }
        if ("readOnly" in params) {
            this.updateParam("readOnly", params.readOnly);
        }
        if ("autoFocus" in params) {
            this.updateParam("autoFocus", params.autoFocus);
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
}
