if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface ConfirmDialog_Params {
    controller?: CustomDialogController;
    title?: ResourceStr;
    desc?: ResourceStr;
    confirmText?: ResourceStr;
    cancelText?: ResourceStr;
    danger?: boolean;
    onConfirm?: () => void;
}
export class ConfirmDialog extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.controller = undefined;
        this.title = '';
        this.desc = '';
        this.confirmText = { "id": 16777314, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" };
        this.cancelText = { "id": 16777312, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" };
        this.danger = false;
        this.onConfirm = () => { };
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: ConfirmDialog_Params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.title !== undefined) {
            this.title = params.title;
        }
        if (params.desc !== undefined) {
            this.desc = params.desc;
        }
        if (params.confirmText !== undefined) {
            this.confirmText = params.confirmText;
        }
        if (params.cancelText !== undefined) {
            this.cancelText = params.cancelText;
        }
        if (params.danger !== undefined) {
            this.danger = params.danger;
        }
        if (params.onConfirm !== undefined) {
            this.onConfirm = params.onConfirm;
        }
    }
    updateStateVars(params: ConfirmDialog_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
    }
    aboutToBeDeleted() {
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private controller?: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    private title: ResourceStr;
    private desc: ResourceStr;
    private confirmText: ResourceStr;
    private cancelText: ResourceStr;
    private danger: boolean;
    private onConfirm: () => void;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 16 });
            Column.debugLine("entry/src/main/ets/commons/uikit/ConfirmDialog.ets(17:5)", "entry");
            Column.width('100%');
            Column.padding({ "id": 16777443, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Column.backgroundColor({ "id": 16777234, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Column.borderRadius({ "id": 16777436, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.title);
            Text.debugLine("entry/src/main/ets/commons/uikit/ConfirmDialog.ets(18:7)", "entry");
            Text.fontSize({ "id": 16777430, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor({ "id": 16777246, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Text.textAlign(TextAlign.Center);
            Text.width('100%');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.desc !== '') {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.desc);
                        Text.debugLine("entry/src/main/ets/commons/uikit/ConfirmDialog.ets(26:9)", "entry");
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
            Row.debugLine("entry/src/main/ets/commons/uikit/ConfirmDialog.ets(33:7)", "entry");
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel(this.cancelText);
            Button.debugLine("entry/src/main/ets/commons/uikit/ConfirmDialog.ets(34:9)", "entry");
            Button.type(ButtonType.Normal);
            Button.layoutWeight(1);
            Button.height({ "id": 16777422, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Button.borderRadius({ "id": 16777437, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Button.backgroundColor({ "id": 16777233, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Button.fontColor({ "id": 16777247, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Button.fontSize({ "id": 16777432, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Button.onClick(() => this.controller?.close());
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel(this.confirmText);
            Button.debugLine("entry/src/main/ets/commons/uikit/ConfirmDialog.ets(44:9)", "entry");
            Button.type(ButtonType.Normal);
            Button.layoutWeight(1);
            Button.height({ "id": 16777422, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Button.borderRadius({ "id": 16777437, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Button.backgroundColor(this.danger ? { "id": 16777242, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" } : { "id": 16777235, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Button.fontColor({ "id": 16777245, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Button.fontSize({ "id": 16777432, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Button.onClick(() => {
                this.controller?.close();
                this.onConfirm();
            });
        }, Button);
        Button.pop();
        Row.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
