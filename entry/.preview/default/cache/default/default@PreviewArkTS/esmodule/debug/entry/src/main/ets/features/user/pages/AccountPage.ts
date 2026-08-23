if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
import { AuthService } from "@bundle:com.eatapp.recipe/entry/ets/commons/auth/AuthService";
import { PLATFORM_HUAWEI } from "@bundle:com.eatapp.recipe/entry/ets/commons/model/User";
import type { OauthBinding, UserInfo } from "@bundle:com.eatapp.recipe/entry/ets/commons/model/User";
import { NavUtil } from "@bundle:com.eatapp.recipe/entry/ets/commons/router/NavUtil";
import { ConfirmDialog } from "@bundle:com.eatapp.recipe/entry/ets/commons/uikit/ConfirmDialog";
import { TopBar } from "@bundle:com.eatapp.recipe/entry/ets/commons/uikit/TopBar";
import { Strings } from "@bundle:com.eatapp.recipe/entry/ets/commons/utils/Strings";
import { SettingGroup, SettingRow } from "@bundle:com.eatapp.recipe/entry/ets/features/user/components/SettingRow";
import { MineViewModel } from "@bundle:com.eatapp.recipe/entry/ets/features/user/viewmodel/MineViewModel";
export class AccountPage extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.vm = new MineViewModel();
        this.auth = AuthService.get();
        this.deleteDialog = new CustomDialogController({
            builder: () => {
                let jsDialog = new ConfirmDialog(this, {
                    title: { "id": 16777274, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                    desc: { "id": 16777273, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                    confirmText: { "id": 16777272, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                    danger: true,
                    onConfirm: () => this.confirmDelete()
                }, undefined, -1, () => { }, { page: "entry/src/main/ets/features/user/pages/AccountPage.ets", line: 22, col: 14 });
                jsDialog.setController(this.deleteDialog);
                ViewPU.create(jsDialog);
                let paramsLambda = () => {
                    return {
                        title: { "id": 16777274, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                        desc: { "id": 16777273, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                        confirmText: { "id": 16777272, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                        danger: true,
                        onConfirm: () => this.confirmDelete()
                    };
                };
                jsDialog.paramsGenerator_ = paramsLambda;
            },
            alignment: DialogAlignment.Center,
            cornerRadius: 16
        }, this);
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
        this.vm = new MineViewModel();
        this.auth = AuthService.get();
    }
    @Local
    vm: MineViewModel;
    @Local
    auth: AuthService;
    private deleteDialog: CustomDialogController;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/features/user/pages/AccountPage.ets(34:5)", "entry");
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor({ "id": 16777232, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
        }, Column);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new TopBar(this, { title: { "id": 16777378, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" } }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/features/user/pages/AccountPage.ets", line: 35, col: 7 });
                    ViewV2.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: { "id": 16777378, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        title: { "id": 16777378, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }
                    });
                }
            }, { name: "TopBar" });
        }
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 24 });
            Column.debugLine("entry/src/main/ets/features/user/pages/AccountPage.ets(37:7)", "entry");
            Column.width('100%');
            Column.padding({ "id": 16777440, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
        }, Column);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new SettingGroup(this, { content: () => { this.bindingGroup(); } }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/features/user/pages/AccountPage.ets", line: 38, col: 9 });
                    ViewV2.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            content: () => { this.bindingGroup(); }
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "SettingGroup" });
        }
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new SettingGroup(this, { content: () => { this.dangerGroup(); } }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/features/user/pages/AccountPage.ets", line: 40, col: 9 });
                    ViewV2.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            content: () => { this.dangerGroup(); }
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {});
                }
            }, { name: "SettingGroup" });
        }
        Column.pop();
        Column.pop();
    }
    bindingGroup(parent = null) {
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new SettingRow(this, {
                        title: { "id": 16777278, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                        value: this.bindingText(this.user().phone),
                        showArrow: false
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/features/user/pages/AccountPage.ets", line: 52, col: 5 });
                    ViewV2.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: { "id": 16777278, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                            value: this.bindingText(this.user().phone),
                            showArrow: false
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        title: { "id": 16777278, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                        value: this.bindingText(this.user().phone),
                        showArrow: false
                    });
                }
            }, { name: "SettingRow" });
        }
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new SettingRow(this, {
                        title: { "id": 16777276, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                        value: this.bindingText(this.user().email),
                        showArrow: false
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/features/user/pages/AccountPage.ets", line: 57, col: 5 });
                    ViewV2.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: { "id": 16777276, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                            value: this.bindingText(this.user().email),
                            showArrow: false
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        title: { "id": 16777276, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                        value: this.bindingText(this.user().email),
                        showArrow: false
                    });
                }
            }, { name: "SettingRow" });
        }
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new SettingRow(this, {
                        title: { "id": 16777277, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                        value: this.huaweiText(),
                        showArrow: false,
                        showDivider: false
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/features/user/pages/AccountPage.ets", line: 62, col: 5 });
                    ViewV2.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: { "id": 16777277, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                            value: this.huaweiText(),
                            showArrow: false,
                            showDivider: false
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        title: { "id": 16777277, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                        value: this.huaweiText(),
                        showArrow: false,
                        showDivider: false
                    });
                }
            }, { name: "SettingRow" });
        }
    }
    dangerGroup(parent = null) {
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new SettingRow(this, {
                        title: { "id": 16777271, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                        danger: true,
                        showDivider: false,
                        onTap: (): void => { this.deleteDialog.open(); }
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/features/user/pages/AccountPage.ets", line: 72, col: 5 });
                    ViewV2.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: { "id": 16777271, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                            danger: true,
                            showDivider: false,
                            onTap: (): void => { this.deleteDialog.open(); }
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        title: { "id": 16777271, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                        danger: true,
                        showDivider: false
                    });
                }
            }, { name: "SettingRow" });
        }
    }
    private user(): UserInfo {
        const fallback: UserInfo = {
            id: '', nickname: '', avatar: '', phone: '', email: '',
            hasPassword: false, favoriteCount: 0, likeCount: 0, bindings: []
        };
        return this.auth.user ?? fallback;
    }
    /** 后端已做脱敏，前端只判断是否为空 */
    private bindingText(value: string): string {
        return value.length > 0 ? value : Strings.get({ "id": 16777279, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
    }
    private huaweiText(): string {
        const bindings: OauthBinding[] = this.user().bindings ?? [];
        const huawei: OauthBinding | undefined = bindings.find((it: OauthBinding) => it.platform === PLATFORM_HUAWEI);
        const bound: boolean = huawei !== undefined && huawei.bound;
        return Strings.get(bound ? { "id": 16777270, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" } : { "id": 16777279, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
    }
    private async confirmDelete(): Promise<void> {
        const ok: boolean = await this.vm.deleteAccount();
        if (ok) {
            // 注销成功后清空本地状态并回到首页
            NavUtil.popToRoot();
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
}
