import type { ImageKnifeOption, ImageKnifeOptionV2 } from './ImageKnifeOption';
import type common from "@ohos:app.ability.common";
import type { ImageKnifeData, ImageKnifeRequestSource } from './ImageKnifeData';
import type taskpool from "@ohos:taskpool";
export class ImageKnifeRequest {
    requestState: ImageKnifeRequestState = ImageKnifeRequestState.PROGRESS;
    componentWidth: number = 0;
    componentHeight: number = 0;
    drawPlayHolderSuccess: boolean = false;
    drawMainSuccess: boolean = false;
    imageKnifeOption: ImageKnifeOption | ImageKnifeOptionV2;
    context: common.UIAbilityContext;
    ImageKnifeRequestCallback?: ImageKnifeRequestCallback;
    componentVersion: number = 0;
    headers: Map<string, Object> = new Map<string, Object>();
    imageKnifeData?: ImageKnifeData;
    componentId?: number;
    animator?: boolean;
    taskRequest?: taskpool.Task;
    constructor(option: ImageKnifeOption | ImageKnifeOptionV2, uIAbilityContext: common.UIAbilityContext, width: number, height: number, version: number, ImageKnifeRequestCallback: ImageKnifeRequestCallback, componentId?: number) {
        this.imageKnifeOption = option;
        this.context = uIAbilityContext;
        this.componentWidth = width;
        this.componentHeight = height;
        this.componentVersion = version;
        this.ImageKnifeRequestCallback = ImageKnifeRequestCallback;
        this.componentId = componentId;
    }
    // RequestOption调用header对于的方法
    addHeader(key: string, value: Object) {
        this.headers.set(key, value);
    }
    // 全局调用header对应的方法，包含RequestOption的形式
    addHeaderMap(map: Map<string, Object>) {
        map.forEach((value, key) => {
            if (!this.headers.has(key)) {
                this.addHeader(key, value);
            }
        });
    }
    destroy() {
        this.ImageKnifeRequestCallback = undefined;
    }
}
export enum ImageKnifeRequestState {
    PROGRESS = 0,
    COMPLETE = 1,
    ERROR = 2,
    DESTROY = 3
}
export interface ImageKnifeRequestCallback {
    showPixelMap: (version: number, pixelMap: PixelMap | string | Resource, requestSource: ImageKnifeRequestSource, size?: Size, imageAnimator?: Array<ImageFrameInfo>) => void;
    mainLoadError?: (err: string) => void;
}
