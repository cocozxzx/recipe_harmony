if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
import type common from "@ohos:app.ability.common";
import { AuthService } from "@bundle:com.eatapp.recipe/entry/ets/commons/auth/AuthService";
import { AuthRepository } from "@bundle:com.eatapp.recipe/entry/ets/commons/auth/AuthRepository";
import { HuaweiAuth } from "@bundle:com.eatapp.recipe/entry/ets/commons/auth/HuaweiAuth";
import type { HuaweiAuthResult } from "@bundle:com.eatapp.recipe/entry/ets/commons/auth/HuaweiAuth";
import { LoginMode } from "@bundle:com.eatapp.recipe/entry/ets/commons/model/User";
import type { AuthResult } from "@bundle:com.eatapp.recipe/entry/ets/commons/model/User";
import { DOC_AGREEMENT, DOC_PRIVACY, RouteNames } from "@bundle:com.eatapp.recipe/entry/ets/commons/router/RouteNames";
import type { WebDocParam } from "@bundle:com.eatapp.recipe/entry/ets/commons/router/RouteNames";
import { NavUtil } from "@bundle:com.eatapp.recipe/entry/ets/commons/router/NavUtil";
import { Toast } from "@bundle:com.eatapp.recipe/entry/ets/commons/uikit/Toast";
import { Formatter } from "@bundle:com.eatapp.recipe/entry/ets/commons/utils/Formatter";
import { Strings } from "@bundle:com.eatapp.recipe/entry/ets/commons/utils/Strings";
import BuildProfile from "@bundle:com.eatapp.recipe/entry/.preview/default/generated/profile/default/BuildProfile";
const COUNTDOWN_SECONDS: number = 60;
export class LoginPage extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.currentMode = LoginMode.SMS;
        this.phone = '';
        this.email = '';
        this.account = '';
        this.password = '';
        this.code = '';
        this.agreed = false;
        this.submitting = false;
        this.codeCountdown = 0;
        this.auth = AuthService.get();
        this.timerId = -1;
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
        this.currentMode = LoginMode.SMS;
        this.phone = '';
        this.email = '';
        this.account = '';
        this.password = '';
        this.code = '';
        this.agreed = false;
        this.submitting = false;
        this.codeCountdown = 0;
        this.auth = AuthService.get();
        this.resetMonitorsOnReuse();
    }
    @Local
    currentMode: LoginMode;
    @Local
    phone: string;
    @Local
    email: string;
    @Local
    account: string;
    @Local
    password: string;
    @Local
    code: string;
    @Local
    agreed: boolean;
    @Local
    submitting: boolean;
    @Local
    codeCountdown: number;
    @Local
    auth: AuthService;
    private timerId: number;
    aboutToDisappear(): void {
        this.stopCountdown();
    }
    @Monitor('auth.isLogin')
    onLoginStateChanged(): void {
        if (this.auth.isLogin) {
            NavUtil.pop();
        }
    }
    get canSubmit(): boolean {
        if (!this.agreed || this.submitting) {
            return false;
        }
        if (this.currentMode === LoginMode.SMS) {
            return this.phone.length > 0 && this.code.length > 0;
        }
        if (this.currentMode === LoginMode.EMAIL) {
            return this.email.length > 0 && this.code.length > 0;
        }
        return this.account.length > 0 && this.password.length > 0;
    }
    private checkAgreement(): boolean {
        if (!this.agreed) {
            Toast.show({ "id": 16777355, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            return false;
        }
        return true;
    }
    private validate(): boolean {
        if (this.currentMode === LoginMode.SMS) {
            if (!Formatter.isPhone(this.phone)) {
                Toast.show({ "id": 16777367, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                return false;
            }
            if (this.code.length === 0) {
                Toast.show({ "id": 16777357, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                return false;
            }
            return true;
        }
        if (this.currentMode === LoginMode.EMAIL) {
            if (!Formatter.isEmail(this.email)) {
                Toast.show({ "id": 16777360, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                return false;
            }
            if (this.code.length === 0) {
                Toast.show({ "id": 16777357, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                return false;
            }
            return true;
        }
        if (this.account.length === 0) {
            Toast.show({ "id": 16777351, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            return false;
        }
        if (this.password.length === 0) {
            Toast.show({ "id": 16777365, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            return false;
        }
        return true;
    }
    private async doLogin(): Promise<AuthResult> {
        if (this.currentMode === LoginMode.SMS) {
            return AuthRepository.loginBySms(this.phone, this.code);
        }
        if (this.currentMode === LoginMode.EMAIL) {
            return AuthRepository.loginByEmail(this.email, this.code);
        }
        return AuthRepository.loginByPassword(this.account, this.password);
    }
    async submit(): Promise<void> {
        if (!this.checkAgreement() || this.submitting) {
            return;
        }
        if (!this.validate()) {
            return;
        }
        this.submitting = true;
        try {
            const result: AuthResult = await this.doLogin();
            await AuthService.get().onLoginSuccess(result);
            Toast.show({ "id": 16777372, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
        }
        catch (e) {
            Toast.show((e as Error).message ?? { "id": 16777363, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
        }
        finally {
            this.submitting = false;
        }
    }
    async loginByHuawei(): Promise<void> {
        if (!this.checkAgreement() || this.submitting) {
            return;
        }
        this.submitting = true;
        try {
            const context: common.UIAbilityContext = getContext(this) as common.UIAbilityContext;
            const authResult: HuaweiAuthResult = await HuaweiAuth.getAuthCode(context);
            if (authResult.authCode.length === 0) {
                if (BuildProfile.LOG_ENABLED as boolean) {
                    Toast.show(`华为登录失败 code=${authResult.errCode} ${authResult.errMsg}`, 4000);
                }
                else {
                    Toast.show({ "id": 16777363, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                }
                return;
            }
            const result: AuthResult = await AuthRepository.loginByHuawei(authResult.authCode);
            await AuthService.get().onLoginSuccess(result);
            Toast.show({ "id": 16777372, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
        }
        catch (e) {
            Toast.show((e as Error).message ?? { "id": 16777363, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
        }
        finally {
            this.submitting = false;
        }
    }
    async sendCode(): Promise<void> {
        if (this.codeCountdown > 0) {
            return;
        }
        if (!this.checkAgreement()) {
            return;
        }
        try {
            if (this.currentMode === LoginMode.SMS) {
                if (!Formatter.isPhone(this.phone)) {
                    Toast.show({ "id": 16777367, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                    return;
                }
                await AuthRepository.sendSmsCode(this.phone);
            }
            else {
                if (!Formatter.isEmail(this.email)) {
                    Toast.show({ "id": 16777360, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                    return;
                }
                await AuthRepository.sendEmailCode(this.email);
            }
            Toast.show({ "id": 16777359, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            this.startCountdown();
        }
        catch (e) {
            Toast.show((e as Error).message ?? { "id": 16777363, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
        }
    }
    switchMode(mode: LoginMode): void {
        this.currentMode = mode;
        this.code = '';
        this.password = '';
    }
    private startCountdown(): void {
        this.stopCountdown();
        this.codeCountdown = COUNTDOWN_SECONDS;
        this.timerId = setInterval(() => {
            this.codeCountdown -= 1;
            if (this.codeCountdown <= 0) {
                this.stopCountdown();
            }
        }, 1000);
    }
    private stopCountdown(): void {
        if (this.timerId !== -1) {
            clearInterval(this.timerId);
            this.timerId = -1;
        }
        this.codeCountdown = 0;
    }
    private openDoc(docKey: string, title: Resource): void {
        const param: WebDocParam = { title: Strings.get(title), docKey: docKey };
        NavUtil.push(RouteNames.WEB_DOC, param);
    }
    private countdownText(): ResourceStr {
        if (this.codeCountdown === 0) {
            return { "id": 16777369, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" };
        }
        return `${this.codeCountdown}s`;
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/features/user/pages/LoginPage.ets(217:5)", "entry");
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor({ "id": 16777232, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
        }, Column);
        this.titleBar.bind(this)();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.debugLine("entry/src/main/ets/features/user/pages/LoginPage.ets(219:7)", "entry");
            Scroll.scrollBar(BarState.Off);
            Scroll.edgeEffect(EdgeEffect.Spring);
            Scroll.layoutWeight(1);
            Scroll.expandSafeArea([SafeAreaType.KEYBOARD], [SafeAreaEdge.BOTTOM]);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 24 });
            Column.debugLine("entry/src/main/ets/features/user/pages/LoginPage.ets(220:9)", "entry");
            Column.width('100%');
            Column.padding({ left: { "id": 16777443, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }, right: { "id": 16777443, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" } });
        }, Column);
        this.headerSection.bind(this)();
        this.huaweiLoginButton.bind(this)();
        this.dividerSection.bind(this)();
        this.formSection.bind(this)();
        this.switchModeSection.bind(this)();
        this.agreementSection.bind(this)();
        Column.pop();
        Scroll.pop();
        Column.pop();
    }
    titleBar(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/features/user/pages/LoginPage.ets(243:5)", "entry");
            Row.width('100%');
            Row.height({ "id": 16777421, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Row.padding({ left: { "id": 16777440, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }, right: { "id": 16777440, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" } });
            Row.alignItems(VerticalAlign.Center);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777222, "type": 20000, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Image.debugLine("entry/src/main/ets/features/user/pages/LoginPage.ets(244:7)", "entry");
            Image.width({ "id": 16777433, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Image.height({ "id": 16777433, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Image.fillColor({ "id": 16777246, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Image.onClick(() => NavUtil.pop());
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/features/user/pages/LoginPage.ets(249:7)", "entry");
            Row.width({ "id": 16777433, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
        }, Row);
        Row.pop();
        Row.pop();
    }
    headerSection(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 8 });
            Column.debugLine("entry/src/main/ets/features/user/pages/LoginPage.ets(259:5)", "entry");
            Column.width('100%');
            Column.alignItems(HorizontalAlign.Start);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777376, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Text.debugLine("entry/src/main/ets/features/user/pages/LoginPage.ets(260:7)", "entry");
            Text.fontSize({ "id": 16777429, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor({ "id": 16777246, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Text.width('100%');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777371, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Text.debugLine("entry/src/main/ets/features/user/pages/LoginPage.ets(265:7)", "entry");
            Text.fontSize({ "id": 16777427, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Text.fontColor({ "id": 16777247, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Text.width('100%');
        }, Text);
        Text.pop();
        Column.pop();
    }
    huaweiLoginButton(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithChild({ stateEffect: !this.submitting });
            Button.debugLine("entry/src/main/ets/features/user/pages/LoginPage.ets(276:5)", "entry");
            Button.type(ButtonType.Normal);
            Button.width('100%');
            Button.height({ "id": 16777422, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Button.borderRadius({ "id": 16777437, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Button.backgroundColor({ "id": 16777235, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Button.enabled(!this.submitting);
            Button.onClick(() => this.loginByHuawei());
        }, Button);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 8 });
            Row.debugLine("entry/src/main/ets/features/user/pages/LoginPage.ets(277:7)", "entry");
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.submitting) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        LoadingProgress.create();
                        LoadingProgress.debugLine("entry/src/main/ets/features/user/pages/LoginPage.ets(279:11)", "entry");
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
            Text.create({ "id": 16777362, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Text.debugLine("entry/src/main/ets/features/user/pages/LoginPage.ets(284:9)", "entry");
            Text.fontSize({ "id": 16777432, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor({ "id": 16777245, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
        }, Text);
        Text.pop();
        Row.pop();
        Button.pop();
    }
    dividerSection(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 12 });
            Row.debugLine("entry/src/main/ets/features/user/pages/LoginPage.ets(301:5)", "entry");
            Row.width('100%');
            Row.alignItems(VerticalAlign.Center);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Divider.create();
            Divider.debugLine("entry/src/main/ets/features/user/pages/LoginPage.ets(302:7)", "entry");
            Divider.color({ "id": 16777238, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Divider.strokeWidth(1);
            Divider.layoutWeight(1);
        }, Divider);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777364, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Text.debugLine("entry/src/main/ets/features/user/pages/LoginPage.ets(306:7)", "entry");
            Text.fontSize({ "id": 16777428, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Text.fontColor({ "id": 16777248, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Divider.create();
            Divider.debugLine("entry/src/main/ets/features/user/pages/LoginPage.ets(309:7)", "entry");
            Divider.color({ "id": 16777238, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Divider.strokeWidth(1);
            Divider.layoutWeight(1);
        }, Divider);
        Row.pop();
    }
    formSection(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 12 });
            Column.debugLine("entry/src/main/ets/features/user/pages/LoginPage.ets(320:5)", "entry");
            Column.width('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.currentMode === LoginMode.SMS) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        TextInput.create({ placeholder: { "id": 16777368, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }, text: this.phone });
                        TextInput.debugLine("entry/src/main/ets/features/user/pages/LoginPage.ets(322:9)", "entry");
                        TextInput.type(InputType.PhoneNumber);
                        TextInput.inputFilter('[0-9]');
                        TextInput.maxLength(11);
                        TextInput.enterKeyType(EnterKeyType.Next);
                        TextInput.width('100%');
                        TextInput.height({ "id": 16777422, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        TextInput.borderRadius({ "id": 16777437, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        TextInput.backgroundColor({ "id": 16777233, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        TextInput.padding({ left: { "id": 16777440, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }, right: { "id": 16777440, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" } });
                        TextInput.fontSize({ "id": 16777426, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        TextInput.fontColor({ "id": 16777246, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        TextInput.placeholderColor({ "id": 16777248, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        TextInput.caretColor({ "id": 16777235, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        TextInput.onChange((value: string) => { this.phone = value; });
                    }, TextInput);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create({ space: 8 });
                        Row.debugLine("entry/src/main/ets/features/user/pages/LoginPage.ets(338:9)", "entry");
                        Row.width('100%');
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        TextInput.create({ placeholder: { "id": 16777358, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }, text: this.code });
                        TextInput.debugLine("entry/src/main/ets/features/user/pages/LoginPage.ets(339:11)", "entry");
                        TextInput.type(InputType.Number);
                        TextInput.maxLength(6);
                        TextInput.enterKeyType(EnterKeyType.Done);
                        TextInput.layoutWeight(1);
                        TextInput.height({ "id": 16777422, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        TextInput.borderRadius({ "id": 16777437, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        TextInput.backgroundColor({ "id": 16777233, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        TextInput.padding({ left: { "id": 16777440, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }, right: { "id": 16777440, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" } });
                        TextInput.fontSize({ "id": 16777426, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        TextInput.fontColor({ "id": 16777246, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        TextInput.placeholderColor({ "id": 16777248, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        TextInput.caretColor({ "id": 16777235, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        TextInput.onChange((value: string) => { this.code = value; });
                    }, TextInput);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithLabel(this.countdownText());
                        Button.debugLine("entry/src/main/ets/features/user/pages/LoginPage.ets(354:11)", "entry");
                        Button.type(ButtonType.Normal);
                        Button.height({ "id": 16777422, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        Button.constraintSize({ minWidth: 108 });
                        Button.borderRadius({ "id": 16777437, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        Button.backgroundColor({ "id": 16777237, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        Button.fontColor(this.codeCountdown > 0 ? { "id": 16777248, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" } : { "id": 16777235, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        Button.fontSize({ "id": 16777427, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        Button.enabled(this.codeCountdown === 0);
                        Button.onClick(() => this.sendCode());
                    }, Button);
                    Button.pop();
                    Row.pop();
                });
            }
            else if (this.currentMode === LoginMode.EMAIL) {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        TextInput.create({ placeholder: { "id": 16777361, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }, text: this.email });
                        TextInput.debugLine("entry/src/main/ets/features/user/pages/LoginPage.ets(367:9)", "entry");
                        TextInput.type(InputType.Email);
                        TextInput.enterKeyType(EnterKeyType.Next);
                        TextInput.width('100%');
                        TextInput.height({ "id": 16777422, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        TextInput.borderRadius({ "id": 16777437, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        TextInput.backgroundColor({ "id": 16777233, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        TextInput.padding({ left: { "id": 16777440, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }, right: { "id": 16777440, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" } });
                        TextInput.fontSize({ "id": 16777426, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        TextInput.fontColor({ "id": 16777246, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        TextInput.placeholderColor({ "id": 16777248, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        TextInput.caretColor({ "id": 16777235, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        TextInput.onChange((value: string) => { this.email = value; });
                    }, TextInput);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create({ space: 8 });
                        Row.debugLine("entry/src/main/ets/features/user/pages/LoginPage.ets(381:9)", "entry");
                        Row.width('100%');
                    }, Row);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        TextInput.create({ placeholder: { "id": 16777358, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }, text: this.code });
                        TextInput.debugLine("entry/src/main/ets/features/user/pages/LoginPage.ets(382:11)", "entry");
                        TextInput.type(InputType.Number);
                        TextInput.maxLength(6);
                        TextInput.enterKeyType(EnterKeyType.Done);
                        TextInput.layoutWeight(1);
                        TextInput.height({ "id": 16777422, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        TextInput.borderRadius({ "id": 16777437, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        TextInput.backgroundColor({ "id": 16777233, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        TextInput.padding({ left: { "id": 16777440, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }, right: { "id": 16777440, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" } });
                        TextInput.fontSize({ "id": 16777426, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        TextInput.fontColor({ "id": 16777246, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        TextInput.placeholderColor({ "id": 16777248, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        TextInput.caretColor({ "id": 16777235, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        TextInput.onChange((value: string) => { this.code = value; });
                    }, TextInput);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithLabel(this.countdownText());
                        Button.debugLine("entry/src/main/ets/features/user/pages/LoginPage.ets(397:11)", "entry");
                        Button.type(ButtonType.Normal);
                        Button.height({ "id": 16777422, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        Button.constraintSize({ minWidth: 108 });
                        Button.borderRadius({ "id": 16777437, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        Button.backgroundColor({ "id": 16777237, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        Button.fontColor(this.codeCountdown > 0 ? { "id": 16777248, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" } : { "id": 16777235, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        Button.fontSize({ "id": 16777427, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        Button.enabled(this.codeCountdown === 0);
                        Button.onClick(() => this.sendCode());
                    }, Button);
                    Button.pop();
                    Row.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(2, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        TextInput.create({ placeholder: { "id": 16777351, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }, text: this.account });
                        TextInput.debugLine("entry/src/main/ets/features/user/pages/LoginPage.ets(410:9)", "entry");
                        TextInput.type(InputType.Normal);
                        TextInput.enterKeyType(EnterKeyType.Next);
                        TextInput.width('100%');
                        TextInput.height({ "id": 16777422, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        TextInput.borderRadius({ "id": 16777437, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        TextInput.backgroundColor({ "id": 16777233, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        TextInput.padding({ left: { "id": 16777440, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }, right: { "id": 16777440, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" } });
                        TextInput.fontSize({ "id": 16777426, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        TextInput.fontColor({ "id": 16777246, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        TextInput.placeholderColor({ "id": 16777248, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        TextInput.caretColor({ "id": 16777235, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        TextInput.onChange((value: string) => { this.account = value; });
                    }, TextInput);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        TextInput.create({ placeholder: { "id": 16777366, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }, text: this.password });
                        TextInput.debugLine("entry/src/main/ets/features/user/pages/LoginPage.ets(424:9)", "entry");
                        TextInput.type(InputType.Password);
                        TextInput.enterKeyType(EnterKeyType.Done);
                        TextInput.width('100%');
                        TextInput.height({ "id": 16777422, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        TextInput.borderRadius({ "id": 16777437, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        TextInput.backgroundColor({ "id": 16777233, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        TextInput.padding({ left: { "id": 16777440, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }, right: { "id": 16777440, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" } });
                        TextInput.fontSize({ "id": 16777426, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        TextInput.fontColor({ "id": 16777246, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        TextInput.placeholderColor({ "id": 16777248, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        TextInput.caretColor({ "id": 16777235, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        TextInput.onChange((value: string) => { this.password = value; });
                    }, TextInput);
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel({ "id": 16777370, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Button.debugLine("entry/src/main/ets/features/user/pages/LoginPage.ets(439:7)", "entry");
            Button.type(ButtonType.Normal);
            Button.width('100%');
            Button.height({ "id": 16777422, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Button.borderRadius({ "id": 16777437, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Button.backgroundColor(this.canSubmit ? { "id": 16777235, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" } : { "id": 16777244, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Button.fontColor({ "id": 16777245, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Button.fontSize({ "id": 16777432, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Button.fontWeight(FontWeight.Medium);
            Button.enabled(this.canSubmit && !this.submitting);
            Button.onClick(() => this.submit());
        }, Button);
        Button.pop();
        Column.pop();
    }
    switchModeSection(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 16 });
            Row.debugLine("entry/src/main/ets/features/user/pages/LoginPage.ets(456:5)", "entry");
            Row.width('100%');
            Row.justifyContent(FlexAlign.Center);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.currentMode !== LoginMode.SMS) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create({ "id": 16777375, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        Text.debugLine("entry/src/main/ets/features/user/pages/LoginPage.ets(458:9)", "entry");
                        Text.fontSize({ "id": 16777427, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        Text.fontColor({ "id": 16777235, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        Text.fontWeight(FontWeight.Medium);
                        Text.padding({ left: { "id": 16777442, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }, right: { "id": 16777442, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }, top: 4, bottom: 4 });
                        Text.onClick(() => this.switchMode(LoginMode.SMS));
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
            if (this.currentMode !== LoginMode.PASSWORD) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create({ "id": 16777374, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        Text.debugLine("entry/src/main/ets/features/user/pages/LoginPage.ets(466:9)", "entry");
                        Text.fontSize({ "id": 16777427, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        Text.fontColor({ "id": 16777235, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        Text.fontWeight(FontWeight.Medium);
                        Text.padding({ left: { "id": 16777442, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }, right: { "id": 16777442, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }, top: 4, bottom: 4 });
                        Text.onClick(() => this.switchMode(LoginMode.PASSWORD));
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
            if (this.currentMode !== LoginMode.EMAIL) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create({ "id": 16777373, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        Text.debugLine("entry/src/main/ets/features/user/pages/LoginPage.ets(474:9)", "entry");
                        Text.fontSize({ "id": 16777427, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        Text.fontColor({ "id": 16777235, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        Text.fontWeight(FontWeight.Medium);
                        Text.padding({ left: { "id": 16777442, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }, right: { "id": 16777442, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }, top: 4, bottom: 4 });
                        Text.onClick(() => this.switchMode(LoginMode.EMAIL));
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
        Row.pop();
    }
    agreementSection(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 8 });
            Row.debugLine("entry/src/main/ets/features/user/pages/LoginPage.ets(488:5)", "entry");
            Row.width('100%');
            Row.alignItems(VerticalAlign.Center);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Checkbox.create();
            Checkbox.debugLine("entry/src/main/ets/features/user/pages/LoginPage.ets(489:7)", "entry");
            Checkbox.select(this.agreed);
            Checkbox.selectedColor({ "id": 16777235, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Checkbox.shape(CheckBoxShape.ROUNDED_SQUARE);
            Checkbox.width({ "id": 16777434, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Checkbox.height({ "id": 16777434, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Checkbox.onChange((checked: boolean) => { this.agreed = checked; });
        }, Checkbox);
        Checkbox.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create();
            Text.debugLine("entry/src/main/ets/features/user/pages/LoginPage.ets(497:7)", "entry");
            Text.fontSize({ "id": 16777428, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Text.fontColor({ "id": 16777247, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Text.layoutWeight(1);
        }, Text);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Span.create({ "id": 16777353, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Span.debugLine("entry/src/main/ets/features/user/pages/LoginPage.ets(498:9)", "entry");
        }, Span);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Span.create({ "id": 16777356, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Span.debugLine("entry/src/main/ets/features/user/pages/LoginPage.ets(499:9)", "entry");
            Span.fontColor({ "id": 16777235, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Span.onClick(() => this.openDoc(DOC_AGREEMENT, { "id": 16777379, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }));
        }, Span);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Span.create({ "id": 16777352, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Span.debugLine("entry/src/main/ets/features/user/pages/LoginPage.ets(502:9)", "entry");
        }, Span);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Span.create({ "id": 16777354, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Span.debugLine("entry/src/main/ets/features/user/pages/LoginPage.ets(503:9)", "entry");
            Span.fontColor({ "id": 16777235, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Span.onClick(() => this.openDoc(DOC_PRIVACY, { "id": 16777398, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }));
        }, Span);
        Text.pop();
        Row.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
