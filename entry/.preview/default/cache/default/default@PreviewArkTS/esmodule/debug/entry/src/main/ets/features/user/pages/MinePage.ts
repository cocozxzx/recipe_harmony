if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
import { AuthService } from "@bundle:com.eatapp.recipe/entry/ets/commons/auth/AuthService";
import type { UserInfo } from '../../../commons/model/User';
import { NavUtil } from "@bundle:com.eatapp.recipe/entry/ets/commons/router/NavUtil";
import { DOC_AGREEMENT, DOC_PRIVACY, RouteNames } from "@bundle:com.eatapp.recipe/entry/ets/commons/router/RouteNames";
import type { WebDocParam } from "@bundle:com.eatapp.recipe/entry/ets/commons/router/RouteNames";
import { ConfirmDialog } from "@bundle:com.eatapp.recipe/entry/ets/commons/uikit/ConfirmDialog";
import { NetImage } from "@bundle:com.eatapp.recipe/entry/ets/commons/uikit/NetImage";
import { Formatter } from "@bundle:com.eatapp.recipe/entry/ets/commons/utils/Formatter";
import { Strings } from "@bundle:com.eatapp.recipe/entry/ets/commons/utils/Strings";
import { SettingGroup, SettingRow } from "@bundle:com.eatapp.recipe/entry/ets/features/user/components/SettingRow";
import { MineViewModel } from "@bundle:com.eatapp.recipe/entry/ets/features/user/viewmodel/MineViewModel";
export class MinePage extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.vm = new MineViewModel();
        this.auth = AuthService.get();
        this.logoutDialog = new CustomDialogController({
            builder: () => {
                let jsDialog = new ConfirmDialog(this, {
                    title: { "id": 16777394, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                    desc: { "id": 16777395, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                    onConfirm: () => this.vm.logout()
                }, undefined, -1, () => { }, { page: "entry/src/main/ets/features/user/pages/MinePage.ets", line: 22, col: 14 });
                jsDialog.setController(this.logoutDialog);
                ViewPU.create(jsDialog);
                let paramsLambda = () => {
                    return {
                        title: { "id": 16777394, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                        desc: { "id": 16777395, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                        onConfirm: () => this.vm.logout()
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
    private logoutDialog: CustomDialogController;
    aboutToAppear(): void {
        if (this.auth.isLogin) {
            this.vm.refresh();
        }
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/features/user/pages/MinePage.ets(38:5)", "entry");
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor({ "id": 16777232, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (!this.auth.isLogin) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.guestView.bind(this)();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.memberView.bind(this)();
                });
            }
        }, If);
        If.pop();
        Column.pop();
    }
    guestView(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 20 });
            Column.debugLine("entry/src/main/ets/features/user/pages/MinePage.ets(52:5)", "entry");
            Column.width('100%');
            Column.height('100%');
            Column.justifyContent(FlexAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777220, "type": 20000, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Image.debugLine("entry/src/main/ets/features/user/pages/MinePage.ets(53:7)", "entry");
            Image.width(160);
            Image.height(160);
            Image.objectFit(ImageFit.Contain);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777389, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Text.debugLine("entry/src/main/ets/features/user/pages/MinePage.ets(57:7)", "entry");
            Text.fontSize({ "id": 16777426, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Text.fontColor({ "id": 16777247, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Text.textAlign(TextAlign.Center);
            Text.padding({ left: { "id": 16777443, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }, right: { "id": 16777443, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" } });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel({ "id": 16777393, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Button.debugLine("entry/src/main/ets/features/user/pages/MinePage.ets(62:7)", "entry");
            Button.type(ButtonType.Normal);
            Button.height({ "id": 16777422, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Button.constraintSize({ minWidth: 200 });
            Button.borderRadius({ "id": 16777437, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Button.backgroundColor({ "id": 16777235, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Button.fontColor({ "id": 16777245, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Button.fontSize({ "id": 16777432, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Button.onClick(() => NavUtil.push(RouteNames.LOGIN));
        }, Button);
        Button.pop();
        Column.pop();
    }
    memberView(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Scroll.create();
            Scroll.debugLine("entry/src/main/ets/features/user/pages/MinePage.ets(79:5)", "entry");
            Scroll.scrollBar(BarState.Off);
            Scroll.width('100%');
            Scroll.height('100%');
            Scroll.align(Alignment.Top);
        }, Scroll);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 24 });
            Column.debugLine("entry/src/main/ets/features/user/pages/MinePage.ets(80:7)", "entry");
            Column.width('100%');
            Column.padding({
                left: { "id": 16777440, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                right: { "id": 16777440, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                top: { "id": 16777440, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                bottom: { "id": 16777445, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }
            });
        }, Column);
        this.header.bind(this)();
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new SettingGroup(this, {
                        title: { "id": 16777387, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                        content: () => { this.contentGroup(); }
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/features/user/pages/MinePage.ets", line: 83, col: 9 });
                    ViewV2.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: { "id": 16777387, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                            content: () => { this.contentGroup(); }
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        title: { "id": 16777387, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }
                    });
                }
            }, { name: "SettingGroup" });
        }
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new SettingGroup(this, {
                        title: { "id": 16777388, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                        content: () => { this.settingsGroup(); }
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/features/user/pages/MinePage.ets", line: 88, col: 9 });
                    ViewV2.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: { "id": 16777388, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                            content: () => { this.settingsGroup(); }
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        title: { "id": 16777388, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }
                    });
                }
            }, { name: "SettingGroup" });
        }
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel({ "id": 16777394, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Button.debugLine("entry/src/main/ets/features/user/pages/MinePage.ets(93:9)", "entry");
            Button.type(ButtonType.Normal);
            Button.width('100%');
            Button.height({ "id": 16777422, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Button.borderRadius({ "id": 16777437, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Button.backgroundColor({ "id": 16777234, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Button.fontColor({ "id": 16777242, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Button.fontSize({ "id": 16777432, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Button.onClick(() => this.logoutDialog.open());
        }, Button);
        Button.pop();
        Column.pop();
        Scroll.pop();
    }
    header(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 16 });
            Row.debugLine("entry/src/main/ets/features/user/pages/MinePage.ets(119:5)", "entry");
            Row.width('100%');
            Row.padding({ "id": 16777440, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Row.backgroundColor({ "id": 16777234, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Row.borderRadius({ "id": 16777436, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Row.onClick(() => NavUtil.push(RouteNames.PROFILE_EDIT));
        }, Row);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new NetImage(this, {
                        url: this.user().avatar,
                        imgWidth: 64,
                        imgHeight: 64,
                        radius: 32
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/features/user/pages/MinePage.ets", line: 120, col: 7 });
                    ViewV2.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            url: this.user().avatar,
                            imgWidth: 64,
                            imgHeight: 64,
                            radius: 32
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        url: this.user().avatar,
                        imgWidth: 64,
                        imgHeight: 64,
                        radius: 32
                    });
                }
            }, { name: "NetImage" });
        }
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 8 });
            Column.debugLine("entry/src/main/ets/features/user/pages/MinePage.ets(127:7)", "entry");
            Column.alignItems(HorizontalAlign.Start);
            Column.layoutWeight(1);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.user().nickname);
            Text.debugLine("entry/src/main/ets/features/user/pages/MinePage.ets(128:9)", "entry");
            Text.fontSize({ "id": 16777430, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor({ "id": 16777246, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 16 });
            Row.debugLine("entry/src/main/ets/features/user/pages/MinePage.ets(133:9)", "entry");
        }, Row);
        this.countLabel.bind(this)({ "id": 16777385, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }, this.user().favoriteCount);
        this.countLabel.bind(this)({ "id": 16777391, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }, this.user().likeCount);
        Row.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777225, "type": 20000, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Image.debugLine("entry/src/main/ets/features/user/pages/MinePage.ets(141:7)", "entry");
            Image.width({ "id": 16777435, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Image.height({ "id": 16777435, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Image.fillColor({ "id": 16777248, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
        }, Image);
        Row.pop();
    }
    countLabel(label: ResourceStr, count: number, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 4 });
            Row.debugLine("entry/src/main/ets/features/user/pages/MinePage.ets(155:5)", "entry");
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(Formatter.count(count));
            Text.debugLine("entry/src/main/ets/features/user/pages/MinePage.ets(156:7)", "entry");
            Text.fontSize({ "id": 16777426, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor({ "id": 16777246, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(label);
            Text.debugLine("entry/src/main/ets/features/user/pages/MinePage.ets(160:7)", "entry");
            Text.fontSize({ "id": 16777428, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Text.fontColor({ "id": 16777248, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
        }, Text);
        Text.pop();
        Row.pop();
    }
    contentGroup(parent = null) {
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new SettingRow(this, {
                        title: { "id": 16777386, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                        onTap: () => NavUtil.push(RouteNames.MY_FAVORITES)
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/features/user/pages/MinePage.ets", line: 168, col: 5 });
                    ViewV2.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: { "id": 16777386, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                            onTap: () => NavUtil.push(RouteNames.MY_FAVORITES)
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        title: { "id": 16777386, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }
                    });
                }
            }, { name: "SettingRow" });
        }
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new SettingRow(this, {
                        title: { "id": 16777392, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                        onTap: () => NavUtil.push(RouteNames.MY_LIKES)
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/features/user/pages/MinePage.ets", line: 172, col: 5 });
                    ViewV2.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: { "id": 16777392, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                            onTap: () => NavUtil.push(RouteNames.MY_LIKES)
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        title: { "id": 16777392, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }
                    });
                }
            }, { name: "SettingRow" });
        }
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new SettingRow(this, {
                        title: { "id": 16777390, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                        onTap: () => NavUtil.push(RouteNames.BROWSE_HISTORY)
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/features/user/pages/MinePage.ets", line: 176, col: 5 });
                    ViewV2.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: { "id": 16777390, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                            onTap: () => NavUtil.push(RouteNames.BROWSE_HISTORY)
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        title: { "id": 16777390, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }
                    });
                }
            }, { name: "SettingRow" });
        }
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new SettingRow(this, {
                        title: { "id": 16777380, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                        showDivider: false,
                        onTap: () => NavUtil.push(RouteNames.MY_AI_RECIPES)
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/features/user/pages/MinePage.ets", line: 180, col: 5 });
                    ViewV2.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: { "id": 16777380, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                            showDivider: false,
                            onTap: () => NavUtil.push(RouteNames.MY_AI_RECIPES)
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        title: { "id": 16777380, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                        showDivider: false
                    });
                }
            }, { name: "SettingRow" });
        }
    }
    settingsGroup(parent = null) {
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new SettingRow(this, {
                        title: { "id": 16777378, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                        onTap: () => NavUtil.push(RouteNames.ACCOUNT)
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/features/user/pages/MinePage.ets", line: 189, col: 5 });
                    ViewV2.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: { "id": 16777378, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                            onTap: () => NavUtil.push(RouteNames.ACCOUNT)
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        title: { "id": 16777378, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }
                    });
                }
            }, { name: "SettingRow" });
        }
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new SettingRow(this, {
                        title: { "id": 16777383, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                        showArrow: false,
                        onTap: () => this.vm.clearCache()
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/features/user/pages/MinePage.ets", line: 193, col: 5 });
                    ViewV2.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: { "id": 16777383, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                            showArrow: false,
                            onTap: () => this.vm.clearCache()
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        title: { "id": 16777383, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                        showArrow: false
                    });
                }
            }, { name: "SettingRow" });
        }
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new SettingRow(this, {
                        title: { "id": 16777377, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                        onTap: () => NavUtil.push(RouteNames.ABOUT)
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/features/user/pages/MinePage.ets", line: 198, col: 5 });
                    ViewV2.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: { "id": 16777377, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                            onTap: () => NavUtil.push(RouteNames.ABOUT)
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        title: { "id": 16777377, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }
                    });
                }
            }, { name: "SettingRow" });
        }
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new SettingRow(this, {
                        title: { "id": 16777379, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                        onTap: () => this.openDoc(DOC_AGREEMENT, { "id": 16777379, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" })
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/features/user/pages/MinePage.ets", line: 202, col: 5 });
                    ViewV2.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: { "id": 16777379, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                            onTap: () => this.openDoc(DOC_AGREEMENT, { "id": 16777379, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" })
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        title: { "id": 16777379, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }
                    });
                }
            }, { name: "SettingRow" });
        }
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new SettingRow(this, {
                        title: { "id": 16777398, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                        showDivider: false,
                        onTap: () => this.openDoc(DOC_PRIVACY, { "id": 16777398, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" })
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/features/user/pages/MinePage.ets", line: 206, col: 5 });
                    ViewV2.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: { "id": 16777398, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                            showDivider: false,
                            onTap: () => this.openDoc(DOC_PRIVACY, { "id": 16777398, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" })
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        title: { "id": 16777398, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
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
    private openDoc(docKey: string, title: Resource): void {
        const param: WebDocParam = { title: Strings.get(title), docKey: docKey };
        NavUtil.push(RouteNames.WEB_DOC, param);
    }
    rerender() {
        this.updateDirtyElements();
    }
}
