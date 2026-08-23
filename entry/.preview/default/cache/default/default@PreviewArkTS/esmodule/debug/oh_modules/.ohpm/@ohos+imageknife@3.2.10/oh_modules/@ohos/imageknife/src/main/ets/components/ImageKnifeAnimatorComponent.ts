if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface ImageKnifeAnimatorComponent_Params {
    imageKnifeOption?: ImageKnifeOption;
    animatorOption?: AnimatorOption;
    pixelMap?: PixelMap | string | undefined;
    imageAnimator?: Array<ImageFrameInfo> | undefined;
    adaptiveWidth?: Length;
    adaptiveHeight?: Length | undefined;
    objectFit?: ImageFit;
    componentId?: number;
    request?: ImageKnifeRequest | undefined;
    lastWidth?: number;
    lastHeight?: number;
    isImageFitAutoResize?: boolean;
    currentWidth?: number;
    currentHeight?: number;
    componentVersion?: number;
    currentContext?: common.UIAbilityContext | undefined;
}
import { AnimatorOption } from "@package:pkg_modules/.ohpm/@ohos+imageknife@3.2.10/pkg_modules/@ohos/imageknife/src/main/ets/model/ImageKnifeOption";
import type { ImageKnifeOption } from "@package:pkg_modules/.ohpm/@ohos+imageknife@3.2.10/pkg_modules/@ohos/imageknife/src/main/ets/model/ImageKnifeOption";
import { ImageKnifeRequest, ImageKnifeRequestState } from "@package:pkg_modules/.ohpm/@ohos+imageknife@3.2.10/pkg_modules/@ohos/imageknife/src/main/ets/model/ImageKnifeRequest";
import type common from "@ohos:app.ability.common";
import { ImageKnife } from "@package:pkg_modules/.ohpm/@ohos+imageknife@3.2.10/pkg_modules/@ohos/imageknife/src/main/ets/ImageKnife";
import { LogUtil } from "@package:pkg_modules/.ohpm/@ohos+imageknife@3.2.10/pkg_modules/@ohos/imageknife/src/main/ets/utils/LogUtil";
import { ImageKnifeRequestSource } from "@package:pkg_modules/.ohpm/@ohos+imageknife@3.2.10/pkg_modules/@ohos/imageknife/src/main/ets/model/ImageKnifeData";
import emitter from "@ohos:events.emitter";
import taskpool from "@ohos:taskpool";
export class ImageKnifeAnimatorComponent extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__imageKnifeOption = new SynchedPropertyNesedObjectPU(params.imageKnifeOption, this, "imageKnifeOption");
        this.__animatorOption = new ObservedPropertyObjectPU(new AnimatorOption(), this, "animatorOption");
        this.__pixelMap = new ObservedPropertyObjectPU(undefined, this, "pixelMap");
        this.__imageAnimator = new ObservedPropertyObjectPU(undefined, this, "imageAnimator");
        this.__adaptiveWidth = new ObservedPropertyObjectPU('100%', this, "adaptiveWidth");
        this.__adaptiveHeight = new ObservedPropertyObjectPU('100%', this, "adaptiveHeight");
        this.__objectFit = new ObservedPropertySimplePU(ImageFit.Contain, this, "objectFit");
        this.componentId = 0;
        this.request = undefined;
        this.lastWidth = 0;
        this.lastHeight = 0;
        this.isImageFitAutoResize = false;
        this.currentWidth = 0;
        this.currentHeight = 0;
        this.componentVersion = 0;
        this.currentContext = undefined;
        this.setInitiallyProvidedValue(params);
        this.declareWatch("imageKnifeOption", this.watchImageKnifeOption);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: ImageKnifeAnimatorComponent_Params) {
        this.__imageKnifeOption.set(params.imageKnifeOption);
        if (params.animatorOption !== undefined) {
            this.animatorOption = params.animatorOption;
        }
        if (params.pixelMap !== undefined) {
            this.pixelMap = params.pixelMap;
        }
        if (params.imageAnimator !== undefined) {
            this.imageAnimator = params.imageAnimator;
        }
        if (params.adaptiveWidth !== undefined) {
            this.adaptiveWidth = params.adaptiveWidth;
        }
        if (params.adaptiveHeight !== undefined) {
            this.adaptiveHeight = params.adaptiveHeight;
        }
        if (params.objectFit !== undefined) {
            this.objectFit = params.objectFit;
        }
        if (params.componentId !== undefined) {
            this.componentId = params.componentId;
        }
        if (params.request !== undefined) {
            this.request = params.request;
        }
        if (params.lastWidth !== undefined) {
            this.lastWidth = params.lastWidth;
        }
        if (params.lastHeight !== undefined) {
            this.lastHeight = params.lastHeight;
        }
        if (params.isImageFitAutoResize !== undefined) {
            this.isImageFitAutoResize = params.isImageFitAutoResize;
        }
        if (params.currentWidth !== undefined) {
            this.currentWidth = params.currentWidth;
        }
        if (params.currentHeight !== undefined) {
            this.currentHeight = params.currentHeight;
        }
        if (params.componentVersion !== undefined) {
            this.componentVersion = params.componentVersion;
        }
        if (params.currentContext !== undefined) {
            this.currentContext = params.currentContext;
        }
    }
    updateStateVars(params: ImageKnifeAnimatorComponent_Params) {
        this.__imageKnifeOption.set(params.imageKnifeOption);
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__imageKnifeOption.purgeDependencyOnElmtId(rmElmtId);
        this.__animatorOption.purgeDependencyOnElmtId(rmElmtId);
        this.__pixelMap.purgeDependencyOnElmtId(rmElmtId);
        this.__imageAnimator.purgeDependencyOnElmtId(rmElmtId);
        this.__adaptiveWidth.purgeDependencyOnElmtId(rmElmtId);
        this.__adaptiveHeight.purgeDependencyOnElmtId(rmElmtId);
        this.__objectFit.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__imageKnifeOption.aboutToBeDeleted();
        this.__animatorOption.aboutToBeDeleted();
        this.__pixelMap.aboutToBeDeleted();
        this.__imageAnimator.aboutToBeDeleted();
        this.__adaptiveWidth.aboutToBeDeleted();
        this.__adaptiveHeight.aboutToBeDeleted();
        this.__objectFit.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __imageKnifeOption: SynchedPropertyNesedObjectPU<ImageKnifeOption>;
    get imageKnifeOption() {
        return this.__imageKnifeOption.get();
    }
    private __animatorOption: ObservedPropertyObjectPU<AnimatorOption>;
    get animatorOption() {
        return this.__animatorOption.get();
    }
    set animatorOption(newValue: AnimatorOption) {
        this.__animatorOption.set(newValue);
    }
    private __pixelMap: ObservedPropertyObjectPU<PixelMap | string | undefined>;
    get pixelMap() {
        return this.__pixelMap.get();
    }
    set pixelMap(newValue: PixelMap | string | undefined) {
        this.__pixelMap.set(newValue);
    }
    private __imageAnimator: ObservedPropertyObjectPU<Array<ImageFrameInfo> | undefined>;
    get imageAnimator() {
        return this.__imageAnimator.get();
    }
    set imageAnimator(newValue: Array<ImageFrameInfo> | undefined) {
        this.__imageAnimator.set(newValue);
    }
    private __adaptiveWidth: ObservedPropertyObjectPU<Length>;
    get adaptiveWidth() {
        return this.__adaptiveWidth.get();
    }
    set adaptiveWidth(newValue: Length) {
        this.__adaptiveWidth.set(newValue);
    }
    private __adaptiveHeight: ObservedPropertyObjectPU<Length | undefined>;
    get adaptiveHeight() {
        return this.__adaptiveHeight.get();
    }
    set adaptiveHeight(newValue: Length | undefined) {
        this.__adaptiveHeight.set(newValue);
    }
    private __objectFit: ObservedPropertySimplePU<ImageFit>;
    get objectFit() {
        return this.__objectFit.get();
    }
    set objectFit(newValue: ImageFit) {
        this.__objectFit.set(newValue);
    }
    private componentId: number;
    private request: ImageKnifeRequest | undefined;
    private lastWidth: number;
    private lastHeight: number;
    private isImageFitAutoResize: boolean;
    private currentWidth: number;
    private currentHeight: number;
    private componentVersion: number;
    private currentContext: common.UIAbilityContext | undefined;
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
                    LogUtil.error(`ImageKnifeAnimatorComponent; clearLastRequest error: ${error}`);
                }
            }
            this.request.destroy();
            this.request = undefined;
        }
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ImageAnimator.create();
            ImageAnimator.debugLine("oh_modules/.ohpm/@ohos+imageknife@3.2.10/oh_modules/@ohos/imageknife/src/main/ets/components/ImageKnifeAnimatorComponent.ets(81:5)", "@ohos/imageknife");
            ImageAnimator.images(ObservedObject.GetRawObject(this.imageAnimator));
            ImageAnimator.width(ObservedObject.GetRawObject(this.adaptiveWidth));
            ImageAnimator.height(ObservedObject.GetRawObject(this.adaptiveHeight));
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
                if (this.currentWidth <= 0 || this.currentHeight <= 0) {
                    // 存在宽或者高为0,此次重回无意义,无需进行request请求
                }
                else {
                    // 前提：宽高值均有效,值>0. 条件1：当前宽高与上一次宽高不同  条件2:当前是第一次绘制
                    if (this.currentHeight != this.lastHeight || this.currentWidth != this.lastWidth) {
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
    getCurrentContext(): common.UIAbilityContext {
        if (this.currentContext == undefined) {
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
                if (imageAnimator != undefined) {
                    this.imageAnimator = imageAnimator;
                }
                else {
                    this.imageAnimator = [
                        {
                            src: pixelMap
                        }
                    ];
                }
                if (this.imageKnifeOption.objectFit === ImageFit.Auto && this.isImageFitAutoResize == false &&
                    requestSource == ImageKnifeRequestSource.SRC) {
                    this.adaptiveHeight = undefined;
                    this.isImageFitAutoResize = true;
                }
                if (requestSource == ImageKnifeRequestSource.SRC) {
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
    rerender() {
        this.updateDirtyElements();
    }
}
