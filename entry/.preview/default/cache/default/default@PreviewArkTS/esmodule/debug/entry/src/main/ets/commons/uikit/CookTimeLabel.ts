if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
export class CookTimeLabel extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.initParam("minutes", (params && "minutes" in params) ? params.minutes : 0);
        this.initParam("withIcon", (params && "withIcon" in params) ? params.withIcon : false);
        this.initParam("fontSize", (params && "fontSize" in params) ? params.fontSize : { "id": 16777428, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
        this.initParam("fontColor", (params && "fontColor" in params) ? params.fontColor : { "id": 16777248, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
        this.resetParam("minutes", (params && "minutes" in params) ? params.minutes : 0);
        this.resetParam("withIcon", (params && "withIcon" in params) ? params.withIcon : false);
        this.resetParam("fontSize", (params && "fontSize" in params) ? params.fontSize : { "id": 16777428, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
        this.resetParam("fontColor", (params && "fontColor" in params) ? params.fontColor : { "id": 16777248, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
    }
    @Param
    readonly minutes: number;
    @Param
    readonly withIcon: boolean;
    @Param
    readonly fontSize: Length;
    @Param
    readonly fontColor: ResourceColor;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 4 });
            Row.debugLine("entry/src/main/ets/commons/uikit/CookTimeLabel.ets(13:5)", "entry");
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.withIcon) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create({ "id": 16777223, "type": 20000, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        Image.debugLine("entry/src/main/ets/commons/uikit/CookTimeLabel.ets(15:9)", "entry");
                        Image.width({ "id": 16777435, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        Image.height({ "id": 16777435, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        Image.fillColor(this.fontColor);
                    }, Image);
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create();
            Text.debugLine("entry/src/main/ets/commons/uikit/CookTimeLabel.ets(20:7)", "entry");
            Text.fontSize(this.fontSize);
            Text.fontColor(this.fontColor);
        }, Text);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Span.create(this.minutes.toString());
            Span.debugLine("entry/src/main/ets/commons/uikit/CookTimeLabel.ets(21:9)", "entry");
        }, Span);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Span.create({ "id": 16777319, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Span.debugLine("entry/src/main/ets/commons/uikit/CookTimeLabel.ets(22:9)", "entry");
        }, Span);
        Text.pop();
        Row.pop();
    }
    public updateStateVars(params) {
        if (params === undefined) {
            return;
        }
        if ("minutes" in params) {
            this.updateParam("minutes", params.minutes);
        }
        if ("withIcon" in params) {
            this.updateParam("withIcon", params.withIcon);
        }
        if ("fontSize" in params) {
            this.updateParam("fontSize", params.fontSize);
        }
        if ("fontColor" in params) {
            this.updateParam("fontColor", params.fontColor);
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
}
