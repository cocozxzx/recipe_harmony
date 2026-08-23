if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
import { ImageKnifeComponent } from "@package:pkg_modules/.ohpm/@ohos+imageknife@3.2.10/pkg_modules/@ohos/imageknife/index";
import type { ImageKnifeOption } from "@package:pkg_modules/.ohpm/@ohos+imageknife@3.2.10/pkg_modules/@ohos/imageknife/index";
export class NetImage extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.initParam("url", (params && "url" in params) ? params.url : '');
        this.initParam("imgWidth", (params && "imgWidth" in params) ? params.imgWidth : '100%');
        this.initParam("imgHeight", (params && "imgHeight" in params) ? params.imgHeight : '100%');
        this.initParam("radius", (params && "radius" in params) ? params.radius : 0);
        this.initParam("fit", (params && "fit" in params) ? params.fit : ImageFit.Cover);
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
        this.resetParam("url", (params && "url" in params) ? params.url : '');
        this.resetParam("imgWidth", (params && "imgWidth" in params) ? params.imgWidth : '100%');
        this.resetParam("imgHeight", (params && "imgHeight" in params) ? params.imgHeight : '100%');
        this.resetParam("radius", (params && "radius" in params) ? params.radius : 0);
        this.resetParam("fit", (params && "fit" in params) ? params.fit : ImageFit.Cover);
    }
    @Param
    readonly url: string;
    @Param
    readonly imgWidth: Length;
    @Param
    readonly imgHeight: Length;
    @Param
    readonly radius: Length;
    @Param
    readonly fit: ImageFit;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Stack.create();
            Stack.debugLine("entry/src/main/ets/commons/uikit/NetImage.ets(20:5)", "entry");
            Stack.width(this.imgWidth);
            Stack.height(this.imgHeight);
            Stack.borderRadius(this.radius);
            Stack.clip(true);
            Stack.backgroundColor({ "id": 16777233, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
        }, Stack);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.url.length === 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // 空 URL 直接渲染占位图，避免 ImageKnife 走一次无谓的失败流程
                        Image.create({ "id": 16777252, "type": 20000, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        Image.debugLine("entry/src/main/ets/commons/uikit/NetImage.ets(23:9)", "entry");
                        // 空 URL 直接渲染占位图，避免 ImageKnife 走一次无谓的失败流程
                        Image.width('100%');
                        // 空 URL 直接渲染占位图，避免 ImageKnife 走一次无谓的失败流程
                        Image.height('100%');
                        // 空 URL 直接渲染占位图，避免 ImageKnife 走一次无谓的失败流程
                        Image.objectFit(this.fit);
                    }, Image);
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        __Common__.create();
                        __Common__.width('100%');
                        __Common__.height('100%');
                    }, __Common__);
                    {
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            if (isInitialRender) {
                                let componentCall = new ImageKnifeComponent(this, {
                                    imageKnifeOption: {
                                        loadSrc: this.url,
                                        placeholderSrc: { "id": 16777252, "type": 20000, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                                        errorholderSrc: { "id": 16777252, "type": 20000, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                                        objectFit: this.fit
                                    } as ImageKnifeOption
                                }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/commons/uikit/NetImage.ets", line: 28, col: 9 });
                                ViewPU.create(componentCall);
                                let paramsLambda = () => {
                                    return {
                                        imageKnifeOption: {
                                            loadSrc: this.url,
                                            placeholderSrc: { "id": 16777252, "type": 20000, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                                            errorholderSrc: { "id": 16777252, "type": 20000, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                                            objectFit: this.fit
                                        } as ImageKnifeOption
                                    };
                                };
                                componentCall.paramsGenerator_ = paramsLambda;
                            }
                            else {
                                this.updateStateVarsOfChildByElmtId(elmtId, {
                                    imageKnifeOption: {
                                        loadSrc: this.url,
                                        placeholderSrc: { "id": 16777252, "type": 20000, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                                        errorholderSrc: { "id": 16777252, "type": 20000, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                                        objectFit: this.fit
                                    } as ImageKnifeOption
                                });
                            }
                        }, { name: "ImageKnifeComponent" });
                    }
                    __Common__.pop();
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
        if ("url" in params) {
            this.updateParam("url", params.url);
        }
        if ("imgWidth" in params) {
            this.updateParam("imgWidth", params.imgWidth);
        }
        if ("imgHeight" in params) {
            this.updateParam("imgHeight", params.imgHeight);
        }
        if ("radius" in params) {
            this.updateParam("radius", params.radius);
        }
        if ("fit" in params) {
            this.updateParam("fit", params.fit);
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
}
