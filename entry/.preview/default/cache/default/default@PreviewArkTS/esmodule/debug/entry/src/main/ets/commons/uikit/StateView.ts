if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
import { PageStatus } from "@bundle:com.eatapp.recipe/entry/ets/commons/model/PageState";
import { SkeletonBox } from "@bundle:com.eatapp.recipe/entry/ets/commons/uikit/SkeletonBox";
export class StateView extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.initParam("status", (params && "status" in params) ? params.status : PageStatus.LOADING);
        this.initParam("errorMessage", (params && "errorMessage" in params) ? params.errorMessage : '');
        this.initParam("emptyText", (params && "emptyText" in params) ? params.emptyText : { "id": 16777315, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
        this.initParam("emptyActionText", (params && "emptyActionText" in params) ? params.emptyActionText : '');
        this.onRetry = "onRetry" in params ? params.onRetry : () => { };
        this.onEmptyAction = "onEmptyAction" in params ? params.onEmptyAction : () => { };
        this.content = "content" in params ? params.content : undefined;
        this.skeleton = "skeleton" in params ? params.skeleton : this.defaultSkeleton;
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
        this.resetParam("status", (params && "status" in params) ? params.status : PageStatus.LOADING);
        this.resetParam("errorMessage", (params && "errorMessage" in params) ? params.errorMessage : '');
        this.resetParam("emptyText", (params && "emptyText" in params) ? params.emptyText : { "id": 16777315, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
        this.resetParam("emptyActionText", (params && "emptyActionText" in params) ? params.emptyActionText : '');
        this.onRetry = "onRetry" in params ? params.onRetry : () => { };
        this.onEmptyAction = "onEmptyAction" in params ? params.onEmptyAction : () => { };
        this.content = "content" in params ? params.content : undefined;
        this.skeleton = "skeleton" in params ? params.skeleton : this.defaultSkeleton;
    }
    @Param
    readonly status: PageStatus;
    @Param
    readonly errorMessage: string;
    @Param
    readonly emptyText: ResourceStr;
    @Param
    readonly emptyActionText: ResourceStr;
    @Event
    onRetry: () => void;
    @Event
    onEmptyAction: () => void;
    content: () => void;
    skeleton: () => void;
    defaultSkeleton(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 16 });
            Column.debugLine("entry/src/main/ets/commons/uikit/StateView.ets(24:5)", "entry");
            Column.width('100%');
            Column.padding({ "id": 16777440, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const index = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create({ space: 12 });
                    Row.debugLine("entry/src/main/ets/commons/uikit/StateView.ets(26:9)", "entry");
                    Row.width('100%');
                }, Row);
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new SkeletonBox(this, { boxWidth: 96, boxHeight: 72, radius: { "id": 16777437, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" } }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/commons/uikit/StateView.ets", line: 27, col: 11 });
                            ViewV2.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    boxWidth: 96,
                                    boxHeight: 72,
                                    radius: { "id": 16777437, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }
                                };
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {
                                boxWidth: 96, boxHeight: 72, radius: { "id": 16777437, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }
                            });
                        }
                    }, { name: "SkeletonBox" });
                }
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create({ space: 8 });
                    Column.debugLine("entry/src/main/ets/commons/uikit/StateView.ets(28:11)", "entry");
                    Column.alignItems(HorizontalAlign.Start);
                    Column.layoutWeight(1);
                }, Column);
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new SkeletonBox(this, { boxWidth: '70%', boxHeight: 16 }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/commons/uikit/StateView.ets", line: 29, col: 13 });
                            ViewV2.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    boxWidth: '70%',
                                    boxHeight: 16
                                };
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {
                                boxWidth: '70%', boxHeight: 16
                            });
                        }
                    }, { name: "SkeletonBox" });
                }
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new SkeletonBox(this, { boxWidth: '45%', boxHeight: 12 }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/commons/uikit/StateView.ets", line: 30, col: 13 });
                            ViewV2.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    boxWidth: '45%',
                                    boxHeight: 12
                                };
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {
                                boxWidth: '45%', boxHeight: 12
                            });
                        }
                    }, { name: "SkeletonBox" });
                }
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new SkeletonBox(this, { boxWidth: '30%', boxHeight: 12 }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/commons/uikit/StateView.ets", line: 31, col: 13 });
                            ViewV2.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    boxWidth: '30%',
                                    boxHeight: 12
                                };
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {
                                boxWidth: '30%', boxHeight: 12
                            });
                        }
                    }, { name: "SkeletonBox" });
                }
                Column.pop();
                Row.pop();
            };
            this.forEachUpdateFunction(elmtId, [0, 1, 2, 3, 4], forEachItemGenFunction, (index: number) => index.toString(), false, false);
        }, ForEach);
        ForEach.pop();
        Column.pop();
    }
    placeholder(image: Resource, text: ResourceStr, actionText: ResourceStr, action: () => void, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 12 });
            Column.debugLine("entry/src/main/ets/commons/uikit/StateView.ets(45:5)", "entry");
            Column.width('100%');
            Column.padding({ "id": 16777443, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Column.justifyContent(FlexAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(image);
            Image.debugLine("entry/src/main/ets/commons/uikit/StateView.ets(46:7)", "entry");
            Image.width(160);
            Image.height(160);
            Image.objectFit(ImageFit.Contain);
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(text);
            Text.debugLine("entry/src/main/ets/commons/uikit/StateView.ets(50:7)", "entry");
            Text.fontSize({ "id": 16777426, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Text.fontColor({ "id": 16777247, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Text.textAlign(TextAlign.Center);
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (actionText !== '') {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithLabel(actionText);
                        Button.debugLine("entry/src/main/ets/commons/uikit/StateView.ets(55:9)", "entry");
                        Button.height({ "id": 16777422, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        Button.constraintSize({ minWidth: 120 });
                        Button.backgroundColor({ "id": 16777237, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        Button.fontColor({ "id": 16777235, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        Button.fontSize({ "id": 16777432, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        Button.borderRadius({ "id": 16777437, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        Button.onClick(() => action());
                    }, Button);
                    Button.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Column.pop();
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Stack.debugLine("entry/src/main/ets/commons/uikit/StateView.ets(71:5)", "entry");
            Stack.width('100%');
            Stack.height('100%');
            Stack.align(this.status === PageStatus.SUCCESS ? Alignment.TopStart : Alignment.Center);
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.status === PageStatus.LOADING) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.skeleton.bind(this)();
                });
            }
            else if (this.status === PageStatus.SUCCESS) {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.content.bind(this)();
                });
            }
            else if (this.status === PageStatus.EMPTY) {
                this.ifElseBranchUpdateFunction(2, () => {
                    this.placeholder.bind(this)({ "id": 16777220, "type": 20000, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }, this.emptyText, this.emptyActionText, () => this.onEmptyAction());
                });
            }
            else {
                this.ifElseBranchUpdateFunction(3, () => {
                    this.placeholder.bind(this)({ "id": 16777419, "type": 20000, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }, this.errorMessage.length > 0 ? this.errorMessage : { "id": 16777316, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }, { "id": 16777324, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }, () => this.onRetry());
                });
            }
        }, If);
        If.pop();
        Stack.pop();
    }
    public updateStateVars(params) {
        if (params === undefined) {
            return;
        }
        if ("status" in params) {
            this.updateParam("status", params.status);
        }
        if ("errorMessage" in params) {
            this.updateParam("errorMessage", params.errorMessage);
        }
        if ("emptyText" in params) {
            this.updateParam("emptyText", params.emptyText);
        }
        if ("emptyActionText" in params) {
            this.updateParam("emptyActionText", params.emptyActionText);
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
}
