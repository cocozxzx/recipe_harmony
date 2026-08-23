import { SparkMD5 } from "@package:pkg_modules/.ohpm/@ohos+imageknife@3.2.10/pkg_modules/@ohos/imageknife/src/main/ets/3rd_party/sparkmd5/spark-md5";
import type { ImageKnifeOption } from '../model/ImageKnifeOption';
import type { IEngineKey } from './IEngineKey';
import type { PixelMapTransformation } from '../transform/PixelMapTransformation';
import { ImageKnifeRequestSource } from "@package:pkg_modules/.ohpm/@ohos+imageknife@3.2.10/pkg_modules/@ohos/imageknife/src/main/ets/model/ImageKnifeData";
import { DownsampleStrategy } from "@package:pkg_modules/.ohpm/@ohos+imageknife@3.2.10/pkg_modules/@ohos/imageknife/src/main/ets/downsampling/DownsampleStartegy";
export class DefaultEngineKey implements IEngineKey {
    constructor() {
        "use sendable";
    }
    // 生成内存缓存key
    generateMemoryKey(loadSrc: string | PixelMap | Resource, requestSource: ImageKnifeRequestSource, imageKnifeOption: ImageKnifeOption, isAnimator?: boolean, width?: number, height?: number): string {
        let key = (isAnimator == true ? 'Animator=' : 'loadSrc==') + (typeof loadSrc == 'string' ? loadSrc : JSON.stringify(loadSrc)) + ';';
        if (requestSource === ImageKnifeRequestSource.SRC) {
            if (imageKnifeOption.signature !== undefined && imageKnifeOption.signature !== '') {
                key += 'signature=' + imageKnifeOption.signature + ';';
            }
            if (imageKnifeOption.dynamicRangeMode !== undefined && imageKnifeOption.dynamicRangeMode !== DynamicRangeMode.STANDARD) {
                key += 'dynamicRangeMode=' + imageKnifeOption.dynamicRangeMode + ';';
            }
            if (imageKnifeOption.transformation) {
                key += 'transformation=' + this.getTransformation(imageKnifeOption.transformation) + ';';
            }
            if ((imageKnifeOption.downsampleOf !== DownsampleStrategy.NONE && imageKnifeOption.downsampleOf !== undefined)) {
                key += 'downsampleOf' + imageKnifeOption.downsampleOf + 'width=' + width + 'height=' + height;
            }
        }
        return key;
    }
    // 生成文件缓存key
    generateFileKey(loadSrc: string | PixelMap | Resource, signature?: string, isAnimator?: boolean): string {
        let src = (isAnimator == true ? 'Animator=' : 'loadSrc==') + (typeof loadSrc == 'string' ? loadSrc : JSON.stringify(loadSrc)) + ';';
        if (signature !== undefined && signature !== '') {
            src += 'signature=' + signature + ';';
        }
        return SparkMD5.hashBinary(src);
    }
    private getTransformation(transformation: PixelMapTransformation): string {
        return transformation.getName();
    }
}
