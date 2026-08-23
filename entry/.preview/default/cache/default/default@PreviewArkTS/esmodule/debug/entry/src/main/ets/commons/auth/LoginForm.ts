if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
import type common from "@ohos:app.ability.common";
import { LoginMode } from "@bundle:com.eatapp.recipe/entry/ets/commons/model/User";
import { DOC_AGREEMENT, DOC_PRIVACY, RouteNames } from "@bundle:com.eatapp.recipe/entry/ets/commons/router/RouteNames";
import type { WebDocParam } from "@bundle:com.eatapp.recipe/entry/ets/commons/router/RouteNames";
import { NavUtil } from "@bundle:com.eatapp.recipe/entry/ets/commons/router/NavUtil";
import { PrimaryButton, TextButton } from "@bundle:com.eatapp.recipe/entry/ets/commons/uikit/Buttons";
import { Strings } from "@bundle:com.eatapp.recipe/entry/ets/commons/utils/Strings";
import { LoginViewModel } from "@bundle:com.eatapp.recipe/entry/ets/commons/auth/LoginViewModel";
export class LoginForm extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.initParam("vm", (params && "vm" in params) ? params.vm : new LoginViewModel());
        this.onClose = "onClose" in params ? params.onClose : () => { };
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
        this.resetParam("vm", (params && "vm" in params) ? params.vm : new LoginViewModel());
        this.onClose = "onClose" in params ? params.onClose : () => { };
    }
    @Param
    readonly vm: LoginViewModel;
    @Event
    onClose: () => void;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 16 });
            Column.debugLine("entry/src/main/ets/commons/auth/LoginForm.ets(21:5)", "entry");
            Column.width('100%');
            Column.alignItems(HorizontalAlign.Start);
        }, Column);
        this.huaweiSection.bind(this)();
        this.divider.bind(this)();
        this.formSection.bind(this)();
        this.switchSection.bind(this)();
        this.agreementSection.bind(this)();
        Column.pop();
    }
    huaweiSection(parent = null) {
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new PrimaryButton(this, {
                        text: { "id": 16777362, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                        loading: this.vm.submitting,
                        onTap: () => {
                            const context: common.UIAbilityContext = getContext(this) as common.UIAbilityContext;
                            this.vm.loginByHuawei(context);
                        }
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/commons/auth/LoginForm.ets", line: 34, col: 5 });
                    ViewV2.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            text: { "id": 16777362, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                            loading: this.vm.submitting,
                            onTap: () => {
                                const context: common.UIAbilityContext = getContext(this) as common.UIAbilityContext;
                                this.vm.loginByHuawei(context);
                            }
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        text: { "id": 16777362, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                        loading: this.vm.submitting
                    });
                }
            }, { name: "PrimaryButton" });
        }
    }
    divider(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 12 });
            Row.debugLine("entry/src/main/ets/commons/auth/LoginForm.ets(46:5)", "entry");
            Row.width('100%');
            Row.alignItems(VerticalAlign.Center);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Divider.create();
            Divider.debugLine("entry/src/main/ets/commons/auth/LoginForm.ets(47:7)", "entry");
            Divider.color({ "id": 16777238, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Divider.strokeWidth(1);
            Divider.layoutWeight(1);
        }, Divider);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777364, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Text.debugLine("entry/src/main/ets/commons/auth/LoginForm.ets(48:7)", "entry");
            Text.fontSize({ "id": 16777428, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Text.fontColor({ "id": 16777248, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Divider.create();
            Divider.debugLine("entry/src/main/ets/commons/auth/LoginForm.ets(51:7)", "entry");
            Divider.color({ "id": 16777238, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Divider.strokeWidth(1);
            Divider.layoutWeight(1);
        }, Divider);
        Row.pop();
    }
    formSection(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 12 });
            Column.debugLine("entry/src/main/ets/commons/auth/LoginForm.ets(59:5)", "entry");
            Column.width('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.vm.mode === LoginMode.SMS) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.inputField.bind(this)({ "id": 16777368, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }, this.vm.phone, InputType.PhoneNumber, (v: string) => { this.vm.phone = v; });
                    this.codeField.bind(this)();
                });
            }
            else if (this.vm.mode === LoginMode.EMAIL) {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.inputField.bind(this)({ "id": 16777361, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }, this.vm.email, InputType.Email, (v: string) => { this.vm.email = v; });
                    this.codeField.bind(this)();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(2, () => {
                    this.inputField.bind(this)({ "id": 16777351, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }, this.vm.account, InputType.Normal, (v: string) => { this.vm.account = v; });
                    this.inputField.bind(this)({ "id": 16777366, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }, this.vm.password, InputType.Password, (v: string) => { this.vm.password = v; });
                });
            }
        }, If);
        If.pop();
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new PrimaryButton(this, {
                        text: { "id": 16777370, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                        btnEnabled: this.vm.canSubmit,
                        loading: this.vm.submitting,
                        onTap: () => this.vm.submit()
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/commons/auth/LoginForm.ets", line: 75, col: 7 });
                    ViewV2.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            text: { "id": 16777370, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                            btnEnabled: this.vm.canSubmit,
                            loading: this.vm.submitting,
                            onTap: () => this.vm.submit()
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        text: { "id": 16777370, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                        btnEnabled: this.vm.canSubmit,
                        loading: this.vm.submitting
                    });
                }
            }, { name: "PrimaryButton" });
        }
        Column.pop();
    }
    inputField(placeholder: ResourceStr, value: string, type: InputType, onChange: (v: string) => void, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ text: value, placeholder: placeholder });
            TextInput.debugLine("entry/src/main/ets/commons/auth/LoginForm.ets(87:5)", "entry");
            TextInput.type(type);
            TextInput.width('100%');
            TextInput.height({ "id": 16777422, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            TextInput.borderRadius({ "id": 16777437, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            TextInput.backgroundColor({ "id": 16777233, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            TextInput.padding({ left: { "id": 16777440, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }, right: { "id": 16777440, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" } });
            TextInput.fontSize({ "id": 16777426, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            TextInput.fontColor({ "id": 16777246, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            TextInput.placeholderColor({ "id": 16777248, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            TextInput.onChange((v: string) => onChange(v));
        }, TextInput);
    }
    codeField(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 8 });
            Row.debugLine("entry/src/main/ets/commons/auth/LoginForm.ets(102:5)", "entry");
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ text: this.vm.code, placeholder: { "id": 16777358, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" } });
            TextInput.debugLine("entry/src/main/ets/commons/auth/LoginForm.ets(103:7)", "entry");
            TextInput.type(InputType.Number);
            TextInput.layoutWeight(1);
            TextInput.height({ "id": 16777422, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            TextInput.borderRadius({ "id": 16777437, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            TextInput.backgroundColor({ "id": 16777233, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            TextInput.padding({ left: { "id": 16777440, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }, right: { "id": 16777440, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" } });
            TextInput.fontSize({ "id": 16777426, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            TextInput.fontColor({ "id": 16777246, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            TextInput.placeholderColor({ "id": 16777248, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            TextInput.onChange((v: string) => { this.vm.code = v; });
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel(this.countdownText());
            Button.debugLine("entry/src/main/ets/commons/auth/LoginForm.ets(115:7)", "entry");
            Button.type(ButtonType.Normal);
            Button.height({ "id": 16777422, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Button.constraintSize({ minWidth: 108 });
            Button.borderRadius({ "id": 16777437, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Button.backgroundColor({ "id": 16777237, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Button.fontColor(this.vm.codeCountdown > 0 ? { "id": 16777248, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" } : { "id": 16777235, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Button.fontSize({ "id": 16777427, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Button.enabled(this.vm.codeCountdown === 0);
            Button.onClick(() => this.vm.sendCode());
        }, Button);
        Button.pop();
        Row.pop();
    }
    switchSection(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 16 });
            Row.debugLine("entry/src/main/ets/commons/auth/LoginForm.ets(131:5)", "entry");
            Row.width('100%');
            Row.justifyContent(FlexAlign.Center);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.vm.mode !== LoginMode.SMS) {
                this.ifElseBranchUpdateFunction(0, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new TextButton(this, {
                                    text: { "id": 16777375, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                                    textSize: { "id": 16777427, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                                    onTap: () => this.vm.switchMode(LoginMode.SMS)
                                }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/commons/auth/LoginForm.ets", line: 133, col: 9 });
                                ViewV2.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        text: { "id": 16777375, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                                        textSize: { "id": 16777427, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                                        onTap: () => this.vm.switchMode(LoginMode.SMS)
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    text: { "id": 16777375, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                                    textSize: { "id": 16777427, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }
                                });
                            }
                        }, { name: "TextButton" });
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
            If.create();
            if (this.vm.mode !== LoginMode.PASSWORD) {
                this.ifElseBranchUpdateFunction(0, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new TextButton(this, {
                                    text: { "id": 16777374, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                                    textSize: { "id": 16777427, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                                    onTap: () => this.vm.switchMode(LoginMode.PASSWORD)
                                }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/commons/auth/LoginForm.ets", line: 140, col: 9 });
                                ViewV2.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        text: { "id": 16777374, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                                        textSize: { "id": 16777427, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                                        onTap: () => this.vm.switchMode(LoginMode.PASSWORD)
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    text: { "id": 16777374, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                                    textSize: { "id": 16777427, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }
                                });
                            }
                        }, { name: "TextButton" });
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
            If.create();
            if (this.vm.mode !== LoginMode.EMAIL) {
                this.ifElseBranchUpdateFunction(0, () => {
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new TextButton(this, {
                                    text: { "id": 16777373, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                                    textSize: { "id": 16777427, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                                    onTap: () => this.vm.switchMode(LoginMode.EMAIL)
                                }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/commons/auth/LoginForm.ets", line: 147, col: 9 });
                                ViewV2.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        text: { "id": 16777373, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                                        textSize: { "id": 16777427, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                                        onTap: () => this.vm.switchMode(LoginMode.EMAIL)
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    text: { "id": 16777373, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                                    textSize: { "id": 16777427, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }
                                });
                            }
                        }, { name: "TextButton" });
                    }
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Row.pop();
    }
    agreementSection(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 8 });
            Row.debugLine("entry/src/main/ets/commons/auth/LoginForm.ets(160:5)", "entry");
            Row.width('100%');
            Row.alignItems(VerticalAlign.Center);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Checkbox.create();
            Checkbox.debugLine("entry/src/main/ets/commons/auth/LoginForm.ets(161:7)", "entry");
            Checkbox.select(this.vm.agreed);
            Checkbox.selectedColor({ "id": 16777235, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Checkbox.width({ "id": 16777434, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Checkbox.height({ "id": 16777434, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Checkbox.onChange((checked: boolean) => { this.vm.agreed = checked; });
        }, Checkbox);
        Checkbox.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create();
            Text.debugLine("entry/src/main/ets/commons/auth/LoginForm.ets(168:7)", "entry");
            Text.fontSize({ "id": 16777428, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Text.fontColor({ "id": 16777247, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Text.layoutWeight(1);
        }, Text);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Span.create({ "id": 16777353, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Span.debugLine("entry/src/main/ets/commons/auth/LoginForm.ets(169:9)", "entry");
        }, Span);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Span.create({ "id": 16777356, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Span.debugLine("entry/src/main/ets/commons/auth/LoginForm.ets(170:9)", "entry");
            Span.fontColor({ "id": 16777235, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Span.onClick(() => this.openDoc(DOC_AGREEMENT, { "id": 16777379, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }));
        }, Span);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Span.create({ "id": 16777352, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Span.debugLine("entry/src/main/ets/commons/auth/LoginForm.ets(173:9)", "entry");
        }, Span);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Span.create({ "id": 16777354, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Span.debugLine("entry/src/main/ets/commons/auth/LoginForm.ets(174:9)", "entry");
            Span.fontColor({ "id": 16777235, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Span.onClick(() => this.openDoc(DOC_PRIVACY, { "id": 16777398, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }));
        }, Span);
        Text.pop();
        Row.pop();
    }
    private countdownText(): ResourceStr {
        if (this.vm.codeCountdown === 0) {
            return { "id": 16777369, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" };
        }
        return `${this.vm.codeCountdown}s`;
    }
    private openDoc(docKey: string, title: Resource): void {
        const param: WebDocParam = { title: Strings.get(title), docKey: docKey };
        NavUtil.push(RouteNames.WEB_DOC, param);
    }
    public updateStateVars(params) {
        if (params === undefined) {
            return;
        }
        if ("vm" in params) {
            this.updateParam("vm", params.vm);
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
}
