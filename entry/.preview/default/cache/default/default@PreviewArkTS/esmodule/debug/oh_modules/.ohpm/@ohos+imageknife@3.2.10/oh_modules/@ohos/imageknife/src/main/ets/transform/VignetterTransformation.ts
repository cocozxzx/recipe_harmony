import { GPUImageVignetterFilter } from "@package:pkg_modules/.ohpm/@ohos+gpu_transform@1.0.4/pkg_modules/@ohos/gpu_transform/index";
import { PixelMapTransformation } from "@package:pkg_modules/.ohpm/@ohos+imageknife@3.2.10/pkg_modules/@ohos/imageknife/src/main/ets/transform/PixelMapTransformation";
import type image from "@ohos:multimedia.image";
/**
 * 图片变换：装饰效果
 */
export class VignetterTransformation extends PixelMapTransformation {
    private mXCenter: number = 0.5;
    private mYCenter: number = 0.5;
    private mRed: number = 0.0;
    private mGreen: number = 0.0;
    private mBlue: number = 0.0;
    private mStart: number = 0.3;
    private mEnd: number = 0.75;
    constructor(centerPoint: Array<number>, vignetteColor: Array<number>, vignetteSpace: Array<number>) {
        "use sendable";
        super();
        if (centerPoint.length === 2) {
            this.mXCenter = centerPoint[0];
            this.mYCenter = centerPoint[1];
        }
        if (vignetteColor.length === 3) {
            this.mRed = vignetteColor[0];
            this.mGreen = vignetteColor[1];
            this.mBlue = vignetteColor[2];
        }
        if (vignetteSpace.length === 2) {
            this.mStart = vignetteSpace[0];
            this.mEnd = vignetteSpace[1];
        }
    }
    getName(): string {
        return this.constructor.name + ';XCenter:' + this.mXCenter + ';YCenter:' + this.mYCenter + ';Red:'
            + this.mRed + ';Green:' + this.mGreen + ';Blue:' + this.mBlue + ';Start:' + this.mStart + ';End:' + this.mEnd;
    }
    async transform(context: Context, toTransform: PixelMap, width: number, height: number): Promise<PixelMap> {
        let imageInfo: image.ImageInfo = await toTransform.getImageInfo();
        if (!imageInfo.size) {
            console.error('VignetterTransformation The image size does not exist.');
            return toTransform;
        }
        return await this.swirlGPU(toTransform, imageInfo.size.width, imageInfo.size.height);
    }
    private async swirlGPU(bitmap: image.PixelMap, targetWidth: number, targetHeight: number) {
        let bufferData = new ArrayBuffer(bitmap.getPixelBytesNumber());
        await bitmap.readPixelsToBuffer(bufferData);
        let filter = new GPUImageVignetterFilter();
        filter.setImageData(bufferData, targetWidth, targetHeight);
        filter.setVignetteCenter([this.mXCenter, this.mYCenter]);
        filter.setVignetteColor([this.mRed, this.mGreen, this.mBlue]);
        filter.setVignetteStart(this.mStart);
        filter.setVignetteEnd(this.mEnd);
        let buf = await filter.getPixelMapBuf(0, 0, targetWidth, targetHeight);
        await bitmap.writeBufferToPixels(buf);
        return bitmap;
    }
}
