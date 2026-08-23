if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
import type { ImageKnifeOptionV2 } from '../model/ImageKnifeOption';
import { ImageKnifeRequest, ImageKnifeRequestState } from "@package:pkg_modules/.ohpm/@ohos+imageknife@3.2.10/pkg_modules/@ohos/imageknife/src/main/ets/model/ImageKnifeRequest";
import type common from "@ohos:app.ability.common";
import { ImageKnife } from "@package:pkg_modules/.ohpm/@ohos+imageknife@3.2.10/pkg_modules/@ohos/imageknife/src/main/ets/ImageKnife";
import { LogUtil } from "@package:pkg_modules/.ohpm/@ohos+imageknife@3.2.10/pkg_modules/@ohos/imageknife/src/main/ets/utils/LogUtil";
import { ImageKnifeRequestSource } from "@package:pkg_modules/.ohpm/@ohos+imageknife@3.2.10/pkg_modules/@ohos/imageknife/src/main/ets/model/ImageKnifeData";
import type { ImageKnifeData } from "@package:pkg_modules/.ohpm/@ohos+imageknife@3.2.10/pkg_modules/@ohos/imageknife/src/main/ets/model/ImageKnifeData";
import type { IEngineKey } from '../key/IEngineKey';
import { DefaultEngineKey } from "@package:pkg_modules/.ohpm/@ohos+imageknife@3.2.10/pkg_modules/@ohos/imageknife/src/main/ets/key/DefaultEngineKey";
import emitter from "@ohos:events.emitter";
import taskpool from "@ohos:taskpool";
export class ImageKnifeComponentV2 extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.pixelMap = ImageContent.EMPTY;
        this.initParam("syncLoad", (params && "syncLoad" in params) ? params.syncLoad : false);
        this.adaptiveWidth = '100%';
        this.adaptiveHeight = '100%';
        this.objectFit = ImageFit.Contain;
        this.componentId = 0;
        this.request = undefined;
        this.lastWidth = 0;
        this.lastHeight = 0;
        this.currentWidth = 0;
        this.isImageFitAutoResize = false;
        this.currentHeight = 0;
        this.componentVersion = 0;
        this.currentContext = undefined;
        this.lastOption = undefined;
        this.initParam("imageKnifeOption", (params && "imageKnifeOption" in params) ? params.imageKnifeOption : undefined);
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
        this.pixelMap = ImageContent.EMPTY;
        this.resetParam("syncLoad", (params && "syncLoad" in params) ? params.syncLoad : false);
        this.adaptiveWidth = '100%';
        this.adaptiveHeight = '100%';
        this.objectFit = ImageFit.Contain;
        this.resetParam("imageKnifeOption", (params && "imageKnifeOption" in params) ? params.imageKnifeOption : undefined);
        this.resetMonitorsOnReuse();
    }
    @Local
    pixelMap: PixelMap | string | Resource | ImageContent | undefined;
    @Param
    readonly syncLoad: boolean;
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
    private currentWidth: number;
    private isImageFitAutoResize: boolean;
    private currentHeight: number;
    private componentVersion: number;
    private currentContext: common.UIAbilityContext | undefined;
    private lastOption?: string;
    @Param
    readonly imageKnifeOption: ImageKnifeOptionV2;
    @Monitor('imageKnifeOption', 'imageKnifeOption.loadSrc', 'imageKnifeOption.signature', 'imageKnifeOption.transformation', 'imageKnifeOption.downsampleOf')
    watchImageKnifeOption() {
        if (this.lastOption !== undefined && this.lastOption === this.getChangeValue() && this.pixelMap !== ImageContent.EMPTY) {
            return;
        }
        this.lastOption = this.getChangeValue();
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
    getChangeValue() {
        if (typeof (this.imageKnifeOption.loadSrc as PixelMap)?.isEditable === 'boolean') {
            return;
        }
        return `${JSON.stringify(this.imageKnifeOption.loadSrc)},${this.imageKnifeOption.signature},
            ${this.imageKnifeOption.downsampleOf},${JSON.stringify(this.imageKnifeOption.transformation)},
            ${JSON.stringify(this.imageKnifeOption.dynamicRangeMode)}`;
    }
    aboutToAppear(): void {
        this.lastOption = this.getChangeValue();
        this.objectFit =
            this.imageKnifeOption.placeholderObjectFit ?? (this.imageKnifeOption.objectFit ?? ImageFit.Contain);
        this.adaptiveHeight = this.objectFit === ImageFit.Auto ? undefined : this.adaptiveHeight;
        this.componentId = this.getUniqueId();
        if (this.syncLoad) { //针对部分消息列表最新消息的图片闪动问题，建议使用同步方式在aboutToAppear时加载图片
            let engineKey: IEngineKey = new DefaultEngineKey();
            let memoryCacheSrc: ImageKnifeData | undefined = ImageKnife.getInstance()
                .loadFromMemoryCache(engineKey.generateMemoryKey(this.imageKnifeOption.loadSrc, ImageKnifeRequestSource.SRC, this.imageKnifeOption));
            if (memoryCacheSrc !== undefined) {
                LogUtil.log('aboutToAppear success load loadSrc from memory cache for loadSrc = ' + this.imageKnifeOption.loadSrc);
                this.pixelMap = memoryCacheSrc.source;
            }
            else {
                LogUtil.log('aboutToAppear fail load loadSrc from memory cache for loadSrc = ' + this.imageKnifeOption.loadSrc);
                if (this.imageKnifeOption.placeholderSrc !== undefined) {
                    let memoryCachePlace: ImageKnifeData | undefined = ImageKnife.getInstance()
                        .loadFromMemoryCache(engineKey.generateMemoryKey(this.imageKnifeOption.placeholderSrc!, ImageKnifeRequestSource.PLACE_HOLDER, this.imageKnifeOption));
                    if (memoryCachePlace !== undefined) {
                        LogUtil.log('aboutToAppear success load placeholderSrc from memory cache for placeholderSrc = ' + this.imageKnifeOption.placeholderSrc);
                        this.pixelMap = memoryCachePlace.source;
                    }
                    else {
                        LogUtil.log('aboutToAppear fail load placeholderSrc from memory cache for placeholderSrc = ' + this.imageKnifeOption.placeholderSrc);
                    }
                }
            }
        }
    }
    aboutToDisappear(): void {
        this.emitterDestroy();
        this.clearLastRequest();
    }
    aboutToRecycle() {
        this.pixelMap = ImageContent.EMPTY;
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
                    LogUtil.error(`ImageKnifeComponentV2; clearLastRequest error: ${error}`);
                }
            }
            this.request.destroy();
            this.request = undefined;
        }
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(this.pixelMap);
            Image.debugLine("oh_modules/.ohpm/@ohos+imageknife@3.2.10/oh_modules/@ohos/imageknife/src/main/ets/components/ImageKnifeComponentV2.ets(134:5)", "@ohos/imageknife");
            Image.dynamicRangeMode(this.imageKnifeOption.dynamicRangeMode);
            Image.colorFilter(this.imageKnifeOption.drawingColorFilter);
            Image.objectFit(this.objectFit);
            Image.width(this.adaptiveWidth);
            Image.height(this.adaptiveHeight);
            Image.border(this.imageKnifeOption.border);
            Image.syncLoad(this.syncLoad);
            Image.draggable(false);
            Image.onComplete(this.imageKnifeOption.onComplete);
            Image.onSizeChange((oldValue: SizeOptions, newValue: SizeOptions) => {
                this.currentWidth = newValue.width as number;
                this.currentHeight = newValue.height as number;
                this.lastWidth = oldValue.width as number;
                this.lastHeight = oldValue.height as number;
                if (this.currentWidth <= 0 || (this.objectFit !== ImageFit.Auto && this.currentHeight <= 0)) {
                    // 存在宽或者高为0,此次重回无意义,无需进行request请求
                }
                else {
                    // 前提：宽高值均有效,值>0. 条件1：当前宽高与上一次宽高不同  条件2:当前是第一次绘制
                    if (this.currentHeight !== this.lastHeight || this.currentWidth !== this.lastWidth) {
                        LogUtil.log('onSizeChange execute request:width=' + this.currentWidth + ' height= ' + this.currentHeight +
                            ' loadSrc = ' + this.imageKnifeOption.loadSrc +
                            ' placeholderSrc = ' + this.imageKnifeOption.placeholderSrc +
                            ' errorholderSrc = ' + this.imageKnifeOption.errorholderSrc +
                            ' componentId = ' + this.componentId);
                        if (this.objectFit === ImageFit.Auto && this.isImageFitAutoResize) {
                            this.isImageFitAutoResize = false;
                        }
                        else {
                            ImageKnife.getInstance().execute(this.getRequest(this.currentWidth, this.currentHeight, this.componentId));
                        }
                    }
                }
            });
        }, Image);
    }
    getCurrentContext(): common.UIAbilityContext {
        if (this.currentContext === undefined) {
            this.currentContext = this.getUIContext().getHostContext() as common.UIAbilityContext;
        }
        return this.currentContext;
    }
    getRequest(width: number, height: number, componentId: number): ImageKnifeRequest {
        this.request = new ImageKnifeRequest(this.imageKnifeOption, this.imageKnifeOption.context !== undefined ? this.imageKnifeOption.context : this.getCurrentContext(), this.getUIContext().vp2px(width), this.getUIContext().vp2px(height), this.componentVersion, {
            showPixelMap: (version: number, pixelMap: PixelMap | string | Resource, requestSource: ImageKnifeRequestSource, size?: Size) => {
                if (version !== this.componentVersion) {
                    return; //针对reuse场景，不显示历史图片
                }
                this.pixelMap = pixelMap;
                LogUtil.info('image load showPixelMap:' + this.request?.componentId + ',srcType:' + requestSource +
                    ',version:' + this.request?.componentVersion +
                    ',size:' + JSON.stringify(size));
                if ((this.imageKnifeOption.objectFit === ImageFit.Auto ||
                    this.imageKnifeOption.placeholderObjectFit === ImageFit.Auto ||
                    this.imageKnifeOption.errorholderObjectFit === ImageFit.Auto) && this.isImageFitAutoResize === false) {
                    this.isImageFitAutoResize = true;
                }
                if (requestSource == ImageKnifeRequestSource.SRC) {
                    this.objectFit =
                        this.imageKnifeOption.objectFit ?? ImageFit.Contain;
                    this.adaptiveHeight = this.objectFit === ImageFit.Auto ? undefined : '100%';
                }
                else if (requestSource == ImageKnifeRequestSource.PLACE_HOLDER) {
                    this.objectFit =
                        this.imageKnifeOption.placeholderObjectFit ?? (this.imageKnifeOption.objectFit ?? ImageFit.Contain);
                    this.adaptiveHeight = this.objectFit === ImageFit.Auto ? undefined : '100%';
                }
                else {
                    this.objectFit =
                        this.imageKnifeOption.errorholderObjectFit ?? (this.imageKnifeOption.objectFit ?? ImageFit.Contain);
                    this.adaptiveHeight = this.objectFit === ImageFit.Auto ? undefined : '100%';
                }
            }
        }, componentId);
        return this.request;
    }
    public updateStateVars(params) {
        if (params === undefined) {
            return;
        }
        if ("syncLoad" in params) {
            this.updateParam("syncLoad", params.syncLoad);
        }
        if ("imageKnifeOption" in params) {
            this.updateParam("imageKnifeOption", params.imageKnifeOption);
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
}
