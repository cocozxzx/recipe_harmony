import { DownsampleStrategy } from "@package:pkg_modules/.ohpm/@ohos+imageknife@3.2.10/pkg_modules/@ohos/imageknife/src/main/ets/downsampling/DownsampleStartegy";
export enum SampleSizeRounding {
    /**
     * Prefer to round the sample size up so that the image is downsampled to smaller than the
     * requested size to use less memory.
     */
    //（内存优先）
    MEMORY = 0,
    /**
     * Prefer to round the sample size down so that the image is downsampled to larger than the
     * requested size to maintain quality at the expense of extra memory usage.
     */
    //（质量优先）
    QUALITY = 1
}
//找出给定整数 i 中最高位的1（即最左边的1）所代表的值
export function highestOneBit(i: number): number {
    i |= (i >> 1);
    i |= (i >> 2);
    i |= (i >> 4);
    i |= (i >> 8);
    i |= (i >> 16);
    return i - (i >>> 1);
}
export function getScale(sourceWidth: number, sourceHeight: number, requestedWidth: number, requestedHeight: number, downsampType: DownsampleStrategy): number {
    if (downsampType === DownsampleStrategy.FIT_CENTER_MEMORY) {
        const widthPercentage = requestedWidth / sourceWidth;
        const heightPercentage = requestedHeight / sourceHeight;
        return Math.min(widthPercentage, heightPercentage);
    }
    else {
        const maxIntegerFactor = Math.max(sourceHeight / requestedHeight, sourceWidth / requestedWidth);
        return maxIntegerFactor === 0 ? 1 : 1 / highestOneBit(maxIntegerFactor);
    }
}
//四舍五入
export function round(value: number): number {
    return Math.floor(value + 0.5);
}
