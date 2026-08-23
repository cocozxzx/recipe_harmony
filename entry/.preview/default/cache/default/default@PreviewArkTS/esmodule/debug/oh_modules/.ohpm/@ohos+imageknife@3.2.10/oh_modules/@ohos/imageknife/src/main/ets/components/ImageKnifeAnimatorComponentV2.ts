if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
import { AnimatorOptionV2 } from "@package:pkg_modules/.ohpm/@ohos+imageknife@3.2.10/pkg_modules/@ohos/imageknife/src/main/ets/model/ImageKnifeOption";
import type { ImageKnifeOptionV2 } from "@package:pkg_modules/.ohpm/@ohos+imageknife@3.2.10/pkg_modules/@ohos/imageknife/src/main/ets/model/ImageKnifeOption";
import { ImageKnifeRequest, ImageKnifeRequestState } from "@package:pkg_modules/.ohpm/@ohos+imageknife@3.2.10/pkg_modules/@ohos/imageknife/src/main/ets/model/ImageKnifeRequest";
import type common from "@ohos:app.ability.common";
import { ImageKnife } from "@package:pkg_modules/.ohpm/@ohos+imageknife@3.2.10/pkg_modules/@ohos/imageknife/src/main/ets/ImageKnife";
import { LogUtil } from "@package:pkg_modules/.ohpm/@ohos+imageknife@3.2.10/pkg_modules/@ohos/imageknife/src/main/ets/utils/LogUtil";
import { ImageKnifeRequestSource } from "@package:pkg_modules/.ohpm/@ohos+imageknife@3.2.10/pkg_modules/@ohos/imageknife/src/main/ets/model/ImageKnifeData";
import emitter from "@ohos:events.emitter";
import taskpool from "@ohos:taskpool";
export class ImageKnifeAnimatorComponentV2 extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.initParam("imageKnifeOption", (params && "imageKnifeOption" in params) ? params.imageKnifeOption : undefined);
        this.initParam("animatorOption", (params && "animatorOption" in params) ? params.animatorOption : new AnimatorOptionV2());
        this.pixelMap = undefined;
        this.imageAnimator = undefined;
        this.adaptiveWidth = '100%';
        this.adaptiveHeight = '100%';
        this.objectFit = ImageFit.Contain;
        this.componentId = 0;
        this.request = undefined;
        this.lastWidth = 0;
        this.lastHeight = 0;
        this.isImageFitAutoResize = false;
        this.currentWidth = 0;
        this.currentHeight = 0;
        this.componentVersion = 0;
        this.currentContext = undefined;
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
        this.resetParam("imageKnifeOption", (params && "imageKnifeOption" in params) ? params.imageKnifeOption : undefined);
        this.resetParam("animatorOption", (params && "animatorOption" in params) ? params.animatorOption : new AnimatorOptionV2());
        this.pixelMap = undefined;
        this.imageAnimator = undefined;
        this.adaptiveWidth = '100%';
        this.adaptiveHeight = '100%';
        this.objectFit = ImageFit.Contain;
        this.resetMonitorsOnReuse();
    }
    @Param
    readonly imageKnifeOption: ImageKnifeOptionV2;
    @Param
    readonly animatorOption: AnimatorOptionV2;
    @Local
    pixelMap: PixelMap | string | undefined;
    @Local
    imageAnimator: Array<ImageFrameInfo> | undefined;
    @Local
    adaptiveWidth: Length;
    @Local
    adaptiveHeight: Length | undefined;
    @Local
    objectFit: ImageFit;
    private componentId: number;
    private request: ImageKnifeRequest | undefined;
    private lastWidth: number;
    private lastHeight: number;
    private isImageFitAutoResize: boolean;
    private currentWidth: number;
    private currentHeight: number;
    private componentVersion: number;
    private currentContext: common.UIAbilityContext | undefined;
    @Monitor('imageKnifeOption', 'imageKnifeOption.loadSrc', 'imageKnifeOption.signature', 'imageKnifeOption.transformation', 'imageKnifeOption.downsampleOf')
    watchImageKnifeOption() {
        this.clearLastRequest();
        this.componentVersion++;
        this.isImageFitAutoResize = false;
        this.objectFit = this.imageKnifeOption.objectFit === undefined ? ImageFit.Contain : this.imageKnifeOption.objectFit;
        LogUtil.log('watchImageKnifeOption execute request:width=' + this.currentWidth + ' height= ' + this.currentHeight +
            ' loadSrc = ' + this.imageKnifeOption.loadSrc +
            ' placeholderSrc = ' + this.imageKnifeOption.placeholderSrc +
            ' errorholderSrc = ' + this.imageKnifeOption.errorholderSrc +
            ' componentId = ' + this.componentId);
        ImageKnife.getInstance().execute(this.getRequest(this.currentWidth, this.currentHeight, this.componentId));
    }
    aboutToAppear(): void {
        this.objectFit = this.imageKnifeOption.objectFit === undefined ? ImageFit.Contain : this.imageKnifeOption.objectFit;
        this.componentId = this.getUniqueId();
    }
    aboutToDisappear(): void {
        this.emitterDestroy();
        this.clearLastRequest();
    }
    aboutToRecycle() {
        this.emitterDestroy();
        this.clearLastRequest();
    }
    emitterDestroy() {
        if (typeof this.request?.imageKnifeOption.loadSrc === 'string' && !this.request?.drawMainSuccess) {
            emitter.emit(this.request.imageKnifeOption.loadSrc + this.componentId);
        }
    }
    /**
     * 对已DESTROY的组件不再发起请求
     */
    private clearLastRequest() {
        if (this.request !== undefined) {
            this.request.requestState = ImageKnifeRequestState.DESTROY;
            if (this.request.taskRequest !== undefined && !this.request.taskRequest.isDone()) {
                try {
                    taskpool.cancel(this.request.taskRequest);
                }
                catch (error) {
                    LogUtil.error(`ImageKnifeAnimatorComponentV2; clearLastRequest error: ${error}`);
                }
            }
            this.request.destroy();
            this.request = undefined;
        }
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ImageAnimator.create();
            ImageAnimator.debugLine("oh_modules/.ohpm/@ohos+imageknife@3.2.10/oh_modules/@ohos/imageknife/src/main/ets/components/ImageKnifeAnimatorComponentV2.ets(94:5)", "@ohos/imageknife");
            ImageAnimator.images(this.imageAnimator);
            ImageAnimator.width(this.adaptiveWidth);
            ImageAnimator.height(this.adaptiveHeight);
            ImageAnimator.border(this.imageKnifeOption.border);
            ImageAnimator.clip(this.imageKnifeOption.border?.radius == undefined ? false : true);
            ImageAnimator.state(this.animatorOption.state == undefined ? AnimationStatus.Running : this.animatorOption.state);
            ImageAnimator.iterations(this.animatorOption.iterations == undefined ? -1 : this.animatorOption.iterations);
            ImageAnimator.reverse(this.animatorOption.reverse == undefined ? false : this.animatorOption.reverse);
            ImageAnimator.onSizeChange((oldValue: SizeOptions, newValue: SizeOptions) => {
                this.currentWidth = newValue.width as number;
                this.currentHeight = newValue.height as number;
                this.lastWidth = oldValue.width as number;
                this.lastHeight = oldValue.height as number;
                if (this.currentWidth > 0 && this.currentHeight > 0) {
                    // 前提：宽高值均有效,值>0. 条件1：当前宽高与上一次宽高不同  条件2:当前是第一次绘制
                    if (this.currentHeight !== this.lastHeight || this.currentWidth !== this.lastWidth) {
                        LogUtil.log('onSizeChange execute request:width=' + this.currentWidth + ' height= ' + this.currentHeight +
                            ' loadSrc = ' + this.imageKnifeOption.loadSrc +
                            ' placeholderSrc = ' + this.imageKnifeOption.placeholderSrc +
                            ' errorholderSrc = ' + this.imageKnifeOption.errorholderSrc +
                            ' componentId = ' + this.componentId);
                        if (this.imageKnifeOption.objectFit === ImageFit.Auto && this.isImageFitAutoResize) {
                            this.isImageFitAutoResize = false;
                        }
                        else {
                            ImageKnife.getInstance().execute(this.getRequest(this.currentWidth, this.currentHeight, this.componentId));
                        }
                    }
                }
            });
            ImageAnimator.onStart(this.animatorOption.onStart);
            ImageAnimator.onFinish(this.animatorOption.onFinish);
            ImageAnimator.onPause(this.animatorOption.onPause);
            ImageAnimator.onCancel(this.animatorOption.onCancel);
            ImageAnimator.onRepeat(this.animatorOption.onRepeat);
        }, ImageAnimator);
    }
    getCurrentContext(): common.UIAbilityContext {
        if (this.currentContext === undefined) {
            this.currentContext = this.getUIContext().getHostContext() as common.UIAbilityContext;
        }
        return this.currentContext;
    }
    getRequest(width: number, height: number, componentId: number): ImageKnifeRequest {
        this.request = new ImageKnifeRequest(this.imageKnifeOption, this.imageKnifeOption.context !== undefined ? this.imageKnifeOption.context : this.getCurrentContext(), this.getUIContext().vp2px(width), this.getUIContext().vp2px(height), this.componentVersion, {
            showPixelMap: (version: number, pixelMap: PixelMap | string | Resource, requestSource: ImageKnifeRequestSource, size?: Size, imageAnimator?: Array<ImageFrameInfo>) => {
                if (version !== this.componentVersion) {
                    return; //针对reuse场景，不显示历史图片
                }
                if (imageAnimator !== undefined) {
                    this.imageAnimator = imageAnimator;
                }
                else {
                    this.imageAnimator = [
                        {
                            src: pixelMap
                        }
                    ];
                }
                if (this.imageKnifeOption.objectFit === ImageFit.Auto && this.isImageFitAutoResize === false &&
                    requestSource === ImageKnifeRequestSource.SRC) {
                    this.adaptiveHeight = undefined;
                    this.isImageFitAutoResize = true;
                }
                if (requestSource === ImageKnifeRequestSource.SRC) {
                    this.objectFit =
                        this.imageKnifeOption.objectFit === undefined ? ImageFit.Contain : this.imageKnifeOption.objectFit;
                }
                else if (requestSource == ImageKnifeRequestSource.PLACE_HOLDER) {
                    this.objectFit =
                        this.imageKnifeOption.placeholderObjectFit === undefined ?
                            (this.imageKnifeOption.objectFit === undefined ? ImageFit.Contain : this.imageKnifeOption.objectFit) :
                            this.imageKnifeOption.placeholderObjectFit;
                }
                else {
                    this.objectFit =
                        this.imageKnifeOption.errorholderObjectFit === undefined ?
                            (this.imageKnifeOption.objectFit === undefined ? ImageFit.Contain : this.imageKnifeOption.objectFit) :
                            this.imageKnifeOption.errorholderObjectFit;
                }
            }
        });
        this.request.animator = true;
        return this.request;
    }
    public updateStateVars(params) {
        if (params === undefined) {
            return;
        }
        if ("imageKnifeOption" in params) {
            this.updateParam("imageKnifeOption", params.imageKnifeOption);
        }
        if ("animatorOption" in params) {
            this.updateParam("animatorOption", params.animatorOption);
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
}
