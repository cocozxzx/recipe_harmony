if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
export class SettingRow extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.initParam("title", (params && "title" in params) ? params.title : '');
        this.initParam("value", (params && "value" in params) ? params.value : '');
        this.initParam("showArrow", (params && "showArrow" in params) ? params.showArrow : true);
        this.initParam("showDivider", (params && "showDivider" in params) ? params.showDivider : true);
        this.initParam("danger", (params && "danger" in params) ? params.danger : false);
        this.onTap = "onTap" in params ? params.onTap : () => { };
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
        this.resetParam("title", (params && "title" in params) ? params.title : '');
        this.resetParam("value", (params && "value" in params) ? params.value : '');
        this.resetParam("showArrow", (params && "showArrow" in params) ? params.showArrow : true);
        this.resetParam("showDivider", (params && "showDivider" in params) ? params.showDivider : true);
        this.resetParam("danger", (params && "danger" in params) ? params.danger : false);
        this.onTap = "onTap" in params ? params.onTap : () => { };
    }
    @Param
    readonly title: ResourceStr;
    @Param
    readonly value: string;
    @Param
    readonly showArrow: boolean;
    @Param
    readonly showDivider: boolean;
    @Param
    readonly danger: boolean;
    @Event
    onTap: () => void;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/features/user/components/SettingRow.ets(12:5)", "entry");
            Column.width('100%');
            Column.padding({ left: { "id": 16777440, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }, right: { "id": 16777440, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" } });
            Column.onClick(() => this.onTap());
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 8 });
            Row.debugLine("entry/src/main/ets/features/user/components/SettingRow.ets(13:7)", "entry");
            Row.width('100%');
            Row.height(52);
            Row.alignItems(VerticalAlign.Center);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.title);
            Text.debugLine("entry/src/main/ets/features/user/components/SettingRow.ets(14:9)", "entry");
            Text.fontSize({ "id": 16777426, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Text.fontColor(this.danger ? { "id": 16777242, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" } : { "id": 16777246, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.value.length > 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.value);
                        Text.debugLine("entry/src/main/ets/features/user/components/SettingRow.ets(20:11)", "entry");
                        Text.fontSize({ "id": 16777427, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        Text.fontColor({ "id": 16777248, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
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
            If.create();
            if (this.showArrow) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create({ "id": 16777225, "type": 20000, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        Image.debugLine("entry/src/main/ets/features/user/components/SettingRow.ets(26:11)", "entry");
                        Image.width({ "id": 16777435, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        Image.height({ "id": 16777435, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        Image.fillColor({ "id": 16777248, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                    }, Image);
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.showDivider) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Divider.create();
                        Divider.debugLine("entry/src/main/ets/features/user/components/SettingRow.ets(37:9)", "entry");
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
        Column.pop();
    }
    public updateStateVars(params) {
        if (params === undefined) {
            return;
        }
        if ("title" in params) {
            this.updateParam("title", params.title);
        }
        if ("value" in params) {
            this.updateParam("value", params.value);
        }
        if ("showArrow" in params) {
            this.updateParam("showArrow", params.showArrow);
        }
        if ("showDivider" in params) {
            this.updateParam("showDivider", params.showDivider);
        }
        if ("danger" in params) {
            this.updateParam("danger", params.danger);
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
}
export class SettingGroup extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.initParam("title", (params && "title" in params) ? params.title : '');
        this.content = "content" in params ? params.content : undefined;
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
        this.resetParam("title", (params && "title" in params) ? params.title : '');
        this.content = "content" in params ? params.content : undefined;
    }
    @Param
    readonly title: ResourceStr;
    content: () => void;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 8 });
            Column.debugLine("entry/src/main/ets/features/user/components/SettingRow.ets(53:5)", "entry");
            Column.width('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.title !== '') {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.title);
                        Text.debugLine("entry/src/main/ets/features/user/components/SettingRow.ets(55:9)", "entry");
                        Text.fontSize({ "id": 16777427, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        Text.fontColor({ "id": 16777247, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        Text.width('100%');
                        Text.padding({ left: { "id": 16777440, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" } });
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
            Column.create();
            Column.debugLine("entry/src/main/ets/features/user/components/SettingRow.ets(61:7)", "entry");
            Column.width('100%');
            Column.backgroundColor({ "id": 16777234, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Column.borderRadius({ "id": 16777436, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
        }, Column);
        this.content.bind(this)();
        Column.pop();
        Column.pop();
    }
    public updateStateVars(params) {
        if (params === undefined) {
            return;
        }
        if ("title" in params) {
            this.updateParam("title", params.title);
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
}
