if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
import { NavUtil } from "@bundle:com.eatapp.recipe/entry/ets/commons/router/NavUtil";
export class TopBar extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.initParam("title", (params && "title" in params) ? params.title : '');
        this.initParam("showBack", (params && "showBack" in params) ? params.showBack : true);
        this.initParam("actionIcon", (params && "actionIcon" in params) ? params.actionIcon : null);
        this.onAction = "onAction" in params ? params.onAction : () => { };
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
        this.resetParam("title", (params && "title" in params) ? params.title : '');
        this.resetParam("showBack", (params && "showBack" in params) ? params.showBack : true);
        this.resetParam("actionIcon", (params && "actionIcon" in params) ? params.actionIcon : null);
        this.onAction = "onAction" in params ? params.onAction : () => { };
    }
    @Param
    readonly title: ResourceStr;
    @Param
    readonly showBack: boolean;
    @Param
    readonly actionIcon: Resource | null;
    @Event
    onAction: () => void;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/commons/uikit/TopBar.ets(15:5)", "entry");
            Row.width('100%');
            Row.height({ "id": 16777421, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Row.padding({ left: { "id": 16777440, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }, right: { "id": 16777440, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" } });
            Row.backgroundColor({ "id": 16777232, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Row.alignItems(VerticalAlign.Center);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.showBack) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create({ "id": 16777222, "type": 20000, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        Image.debugLine("entry/src/main/ets/commons/uikit/TopBar.ets(17:9)", "entry");
                        Image.width({ "id": 16777433, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        Image.height({ "id": 16777433, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        Image.fillColor({ "id": 16777246, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        Image.onClick(() => NavUtil.pop());
                    }, Image);
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.debugLine("entry/src/main/ets/commons/uikit/TopBar.ets(23:9)", "entry");
                        Row.width({ "id": 16777433, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                    }, Row);
                    Row.pop();
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.title);
            Text.debugLine("entry/src/main/ets/commons/uikit/TopBar.ets(26:7)", "entry");
            Text.fontSize({ "id": 16777430, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor({ "id": 16777246, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Text.maxLines(1);
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
            Text.textAlign(TextAlign.Center);
            Text.layoutWeight(1);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.actionIcon !== null) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create(this.actionIcon);
                        Image.debugLine("entry/src/main/ets/commons/uikit/TopBar.ets(36:9)", "entry");
                        Image.width({ "id": 16777433, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        Image.height({ "id": 16777433, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        Image.fillColor({ "id": 16777247, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        Image.onClick(() => this.onAction());
                    }, Image);
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.debugLine("entry/src/main/ets/commons/uikit/TopBar.ets(42:9)", "entry");
                        Row.width({ "id": 16777433, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                    }, Row);
                    Row.pop();
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
        if ("title" in params) {
            this.updateParam("title", params.title);
        }
        if ("showBack" in params) {
            this.updateParam("showBack", params.showBack);
        }
        if ("actionIcon" in params) {
            this.updateParam("actionIcon", params.actionIcon);
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
}
