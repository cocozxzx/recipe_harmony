import { AtMost, CenterInside, AtLeast, DownsampleStrategy, FitCenter, DefaultDownSampling, } from "@package:pkg_modules/.ohpm/@ohos+imageknife@3.2.10/pkg_modules/@ohos/imageknife/src/main/ets/downsampling/DownsampleStartegy";
export class Downsampler {
    calculateScaling(typeValue: string, sourceWidth: number, //原始宽高
    sourceHeight: number, //原始宽高
    requestWidth: number, //请求宽高
    requestHeight: number, //请求宽高
    downsampType: DownsampleStrategy): Size {
        if (sourceHeight <= 0 || sourceWidth <= 0) {
            throw new Error(`Invalid width and height, sourceHeight:${sourceHeight}+ sourceWidth:${sourceWidth}`);
        }
        let downsampler = this.getDownsampler(downsampType);
        let scaleFactor: number = downsampler.getScaleFactor(sourceWidth, sourceHeight, requestWidth, requestHeight, downsampType); //缩放比
        //基于上一步得出的采样大小，根据不同的图片类型，计算采样后的图片尺寸
        if (typeValue === 'png') {
            return {
                width: Math.floor(sourceWidth / scaleFactor),
                height: Math.floor(sourceHeight / scaleFactor)
            };
        }
        else if (typeValue === 'webp') {
            return {
                width: Math.round(sourceWidth / scaleFactor),
                height: Math.round(sourceHeight / scaleFactor)
            };
        }
        else {
            return {
                width: sourceWidth / scaleFactor,
                height: sourceHeight / scaleFactor
            };
        }
    }
    getDownsampler(downsampType: DownsampleStrategy) {
        switch (downsampType) {
            case DownsampleStrategy.FIT_CENTER_MEMORY:
            case DownsampleStrategy.FIT_CENTER_QUALITY:
                return new FitCenter();
            case DownsampleStrategy.AT_MOST:
                return new AtMost();
            case DownsampleStrategy.CENTER_INSIDE_MEMORY:
            case DownsampleStrategy.CENTER_INSIDE_QUALITY:
                return new CenterInside();
            case DownsampleStrategy.AT_LEAST:
                return new AtLeast();
            case DownsampleStrategy.DEFAULT:
                return new DefaultDownSampling();
            default:
                throw new Error('Unsupported downsampling strategy');
        }
    }
}
