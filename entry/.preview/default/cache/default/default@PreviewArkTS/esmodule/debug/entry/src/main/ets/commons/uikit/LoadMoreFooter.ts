if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
export enum LoadMoreStatus {
    IDLE = 0,
    LOADING = 1,
    NO_MORE = 2,
    FAILED = 3
}
export class LoadMoreFooter extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.initParam("status", (params && "status" in params) ? params.status : LoadMoreStatus.IDLE);
        this.onRetry = "onRetry" in params ? params.onRetry : () => { };
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
        this.resetParam("status", (params && "status" in params) ? params.status : LoadMoreStatus.IDLE);
        this.onRetry = "onRetry" in params ? params.onRetry : () => { };
    }
    @Param
    readonly status: LoadMoreStatus;
    @Event
    onRetry: () => void;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 8 });
            Row.debugLine("entry/src/main/ets/commons/uikit/LoadMoreFooter.ets(15:5)", "entry");
            Row.width('100%');
            Row.height(this.status === LoadMoreStatus.IDLE ? 0 : 48);
            Row.justifyContent(FlexAlign.Center);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.status === LoadMoreStatus.LOADING) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        LoadingProgress.create();
                        LoadingProgress.debugLine("entry/src/main/ets/commons/uikit/LoadMoreFooter.ets(17:9)", "entry");
                        LoadingProgress.width({ "id": 16777434, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        LoadingProgress.height({ "id": 16777434, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        LoadingProgress.color({ "id": 16777248, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                    }, LoadingProgress);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create({ "id": 16777318, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        Text.debugLine("entry/src/main/ets/commons/uikit/LoadMoreFooter.ets(21:9)", "entry");
                        Text.fontSize({ "id": 16777428, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        Text.fontColor({ "id": 16777248, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                    }, Text);
                    Text.pop();
                });
            }
            else if (this.status === LoadMoreStatus.NO_MORE) {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create({ "id": 16777321, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        Text.debugLine("entry/src/main/ets/commons/uikit/LoadMoreFooter.ets(25:9)", "entry");
                        Text.fontSize({ "id": 16777428, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        Text.fontColor({ "id": 16777248, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                    }, Text);
                    Text.pop();
                });
            }
            else if (this.status === LoadMoreStatus.FAILED) {
                this.ifElseBranchUpdateFunction(2, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create({ "id": 16777317, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        Text.debugLine("entry/src/main/ets/commons/uikit/LoadMoreFooter.ets(29:9)", "entry");
                        Text.fontSize({ "id": 16777428, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        Text.fontColor({ "id": 16777235, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        Text.onClick(() => this.onRetry());
                    }, Text);
                    Text.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(3, () => {
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
        if ("status" in params) {
            this.updateParam("status", params.status);
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
}
