if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
import BuildProfile from "@bundle:com.eatapp.recipe/entry/.preview/default/generated/profile/default/BuildProfile";
import { DOC_AGREEMENT, DOC_PRIVACY, RouteNames } from "@bundle:com.eatapp.recipe/entry/ets/commons/router/RouteNames";
import type { WebDocParam } from "@bundle:com.eatapp.recipe/entry/ets/commons/router/RouteNames";
import { NavUtil } from "@bundle:com.eatapp.recipe/entry/ets/commons/router/NavUtil";
import { TopBar } from "@bundle:com.eatapp.recipe/entry/ets/commons/uikit/TopBar";
import { Strings } from "@bundle:com.eatapp.recipe/entry/ets/commons/utils/Strings";
import { SettingGroup, SettingRow } from "@bundle:com.eatapp.recipe/entry/ets/features/user/components/SettingRow";
export class AboutPage extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/features/user/pages/AboutPage.ets(12:5)", "entry");
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor({ "id": 16777232, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
        }, Column);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new TopBar(this, { title: { "id": 16777377, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" } }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/features/user/pages/AboutPage.ets", line: 13, col: 7 });
                    ViewV2.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: { "id": 16777377, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        title: { "id": 16777377, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }
                    });
                }
            }, { name: "TopBar" });
        }
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 24 });
            Column.debugLine("entry/src/main/ets/features/user/pages/AboutPage.ets(15:7)", "entry");
            Column.width('100%');
            Column.padding({ "id": 16777440, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 12 });
            Column.debugLine("entry/src/main/ets/features/user/pages/AboutPage.ets(16:9)", "entry");
            Column.width('100%');
            Column.padding({ top: { "id": 16777445, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" } });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777216, "type": 20000, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Image.debugLine("entry/src/main/ets/features/user/pages/AboutPage.ets(17:11)", "entry");
            Image.width(72);
            Image.height(72);
            Image.borderRadius({ "id": 16777436, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777217, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Text.debugLine("entry/src/main/ets/features/user/pages/AboutPage.ets(21:11)", "entry");
            Text.fontSize({ "id": 16777430, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor({ "id": 16777246, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.versionText());
            Text.debugLine("entry/src/main/ets/features/user/pages/AboutPage.ets(25:11)", "entry");
            Text.fontSize({ "id": 16777428, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Text.fontColor({ "id": 16777248, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
        }, Text);
        Text.pop();
        Column.pop();
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new SettingGroup(this, { content: () => { this.docs(); } }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/features/user/pages/AboutPage.ets", line: 32, col: 9 });
                    ViewV2.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            content: () => { this.docs(); }
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
    docs(parent = null) {
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new SettingRow(this, {
                        title: { "id": 16777379, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                        onTap: () => this.openDoc(DOC_AGREEMENT, { "id": 16777379, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" })
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/features/user/pages/AboutPage.ets", line: 44, col: 5 });
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
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/features/user/pages/AboutPage.ets", line: 48, col: 5 });
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
    private versionText(): string {
        return `v${BuildProfile.APP_VERSION as string} (${BuildProfile.ENV as string})`;
    }
    private openDoc(docKey: string, title: Resource): void {
        const param: WebDocParam = { title: Strings.get(title), docKey: docKey };
        NavUtil.push(RouteNames.WEB_DOC, param);
    }
    rerender() {
        this.updateDirtyElements();
    }
}
