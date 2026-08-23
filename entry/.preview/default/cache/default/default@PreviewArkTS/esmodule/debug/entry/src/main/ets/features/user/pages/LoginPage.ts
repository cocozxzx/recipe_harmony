if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
import { AuthService } from "@bundle:com.eatapp.recipe/entry/ets/commons/auth/AuthService";
import { LoginForm } from "@bundle:com.eatapp.recipe/entry/ets/commons/auth/LoginForm";
import { LoginViewModel } from "@bundle:com.eatapp.recipe/entry/ets/commons/auth/LoginViewModel";
import { NavUtil } from "@bundle:com.eatapp.recipe/entry/ets/commons/router/NavUtil";
import { TopBar } from "@bundle:com.eatapp.recipe/entry/ets/commons/uikit/TopBar";
export class LoginPage extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.vm = new LoginViewModel();
        this.auth = AuthService.get();
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
        this.vm = new LoginViewModel();
        this.auth = AuthService.get();
        this.resetMonitorsOnReuse();
    }
    @Local
    vm: LoginViewModel;
    @Local
    auth: AuthService;
    aboutToDisappear(): void {
        this.vm.dispose();
    }
    /** 登录成功后自动退回上一页 */
    @Monitor('auth.isLogin')
    onLoginStateChanged(): void {
        if (this.auth.isLogin) {
            NavUtil.pop();
        }
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/features/user/pages/LoginPage.ets(29:5)", "entry");
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor({ "id": 16777232, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
        }, Column);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new TopBar(this, { title: '' }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/features/user/pages/LoginPage.ets", line: 30, col: 7 });
                    ViewV2.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: ''
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        title: ''
                    });
                }
            }, { name: "TopBar" });
        }
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 24 });
            Column.debugLine("entry/src/main/ets/features/user/pages/LoginPage.ets(32:7)", "entry");
            Column.width('100%');
            Column.padding({ "id": 16777440, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 8 });
            Column.debugLine("entry/src/main/ets/features/user/pages/LoginPage.ets(33:9)", "entry");
            Column.width('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777376, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Text.debugLine("entry/src/main/ets/features/user/pages/LoginPage.ets(34:11)", "entry");
            Text.fontSize({ "id": 16777429, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Text.fontWeight(FontWeight.Bold);
            Text.fontColor({ "id": 16777246, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Text.width('100%');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777371, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Text.debugLine("entry/src/main/ets/features/user/pages/LoginPage.ets(39:11)", "entry");
            Text.fontSize({ "id": 16777427, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Text.fontColor({ "id": 16777247, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Text.width('100%');
        }, Text);
        Text.pop();
        Column.pop();
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new LoginForm(this, { vm: this.vm }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/features/user/pages/LoginPage.ets", line: 46, col: 9 });
                    ViewV2.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            vm: this.vm
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        vm: this.vm
                    });
                }
            }, { name: "LoginForm" });
        }
        Column.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
