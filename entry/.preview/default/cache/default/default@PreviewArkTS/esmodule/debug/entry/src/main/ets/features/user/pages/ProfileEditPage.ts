if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
import type common from "@ohos:app.ability.common";
import { NavUtil } from "@bundle:com.eatapp.recipe/entry/ets/commons/router/NavUtil";
import { PrimaryButton } from "@bundle:com.eatapp.recipe/entry/ets/commons/uikit/Buttons";
import { NetImage } from "@bundle:com.eatapp.recipe/entry/ets/commons/uikit/NetImage";
import { TopBar } from "@bundle:com.eatapp.recipe/entry/ets/commons/uikit/TopBar";
import { ProfileEditViewModel } from "@bundle:com.eatapp.recipe/entry/ets/features/user/viewmodel/ProfileEditViewModel";
export class ProfileEditPage extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.vm = new ProfileEditViewModel();
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
        this.vm = new ProfileEditViewModel();
    }
    @Local
    vm: ProfileEditViewModel;
    aboutToAppear(): void {
        this.vm.init();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/features/user/pages/ProfileEditPage.ets(18:5)", "entry");
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor({ "id": 16777232, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
        }, Column);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new TopBar(this, { title: { "id": 16777384, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" } }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/features/user/pages/ProfileEditPage.ets", line: 19, col: 7 });
                    ViewV2.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            title: { "id": 16777384, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        title: { "id": 16777384, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }
                    });
                }
            }, { name: "TopBar" });
        }
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 24 });
            Column.debugLine("entry/src/main/ets/features/user/pages/ProfileEditPage.ets(21:7)", "entry");
            Column.width('100%');
            Column.padding({ "id": 16777440, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 12 });
            Column.debugLine("entry/src/main/ets/features/user/pages/ProfileEditPage.ets(22:9)", "entry");
            Column.width('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create({ alignContent: Alignment.BottomEnd });
            Stack.debugLine("entry/src/main/ets/features/user/pages/ProfileEditPage.ets(23:11)", "entry");
            Stack.onClick(() => {
                const context: common.UIAbilityContext = getContext(this) as common.UIAbilityContext;
                this.vm.pickAndUploadAvatar(context);
            });
        }, Stack);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new NetImage(this, {
                        url: this.vm.avatar,
                        imgWidth: 88,
                        imgHeight: 88,
                        radius: 44
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/features/user/pages/ProfileEditPage.ets", line: 24, col: 13 });
                    ViewV2.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            url: this.vm.avatar,
                            imgWidth: 88,
                            imgHeight: 88,
                            radius: 44
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        url: this.vm.avatar,
                        imgWidth: 88,
                        imgHeight: 88,
                        radius: 44
                    });
                }
            }, { name: "NetImage" });
        }
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777227, "type": 20000, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Image.debugLine("entry/src/main/ets/features/user/pages/ProfileEditPage.ets(30:13)", "entry");
            Image.width({ "id": 16777434, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Image.height({ "id": 16777434, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Image.fillColor({ "id": 16777245, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Image.padding(4);
            Image.borderRadius(14);
            Image.backgroundColor({ "id": 16777235, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
        }, Image);
        Stack.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777381, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Text.debugLine("entry/src/main/ets/features/user/pages/ProfileEditPage.ets(43:11)", "entry");
            Text.fontSize({ "id": 16777428, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Text.fontColor({ "id": 16777248, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
        }, Text);
        Text.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 8 });
            Column.debugLine("entry/src/main/ets/features/user/pages/ProfileEditPage.ets(49:9)", "entry");
            Column.width('100%');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777396, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Text.debugLine("entry/src/main/ets/features/user/pages/ProfileEditPage.ets(50:11)", "entry");
            Text.fontSize({ "id": 16777427, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Text.fontColor({ "id": 16777247, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Text.width('100%');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ text: this.vm.nickname });
            TextInput.debugLine("entry/src/main/ets/features/user/pages/ProfileEditPage.ets(54:11)", "entry");
            TextInput.width('100%');
            TextInput.height({ "id": 16777422, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            TextInput.borderRadius({ "id": 16777437, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            TextInput.backgroundColor({ "id": 16777234, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            TextInput.padding({ left: { "id": 16777440, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }, right: { "id": 16777440, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" } });
            TextInput.fontSize({ "id": 16777426, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            TextInput.fontColor({ "id": 16777246, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            TextInput.maxLength(20);
            TextInput.onChange((value: string) => { this.vm.nickname = value; });
        }, TextInput);
        Column.pop();
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new PrimaryButton(this, {
                        text: { "id": 16777325, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                        loading: this.vm.saving,
                        onTap: () => this.save()
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/features/user/pages/ProfileEditPage.ets", line: 67, col: 9 });
                    ViewV2.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            text: { "id": 16777325, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                            loading: this.vm.saving,
                            onTap: () => this.save()
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        text: { "id": 16777325, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                        loading: this.vm.saving
                    });
                }
            }, { name: "PrimaryButton" });
        }
        Column.pop();
        Column.pop();
    }
    private async save(): Promise<void> {
        const ok: boolean = await this.vm.save();
        if (ok) {
            NavUtil.pop();
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
}
