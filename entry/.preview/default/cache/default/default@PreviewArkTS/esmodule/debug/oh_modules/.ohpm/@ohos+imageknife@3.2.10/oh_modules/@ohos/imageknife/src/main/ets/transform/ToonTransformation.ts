import { GPUImageToonFilter } from "@package:pkg_modules/.ohpm/@ohos+gpu_transform@1.0.4/pkg_modules/@ohos/gpu_transform/index";
import { PixelMapTransformation } from "@package:pkg_modules/.ohpm/@ohos+imageknife@3.2.10/pkg_modules/@ohos/imageknife/src/main/ets/transform/PixelMapTransformation";
import type image from "@ohos:multimedia.image";
/**
 * 图片变换：动画滤镜效果
 */
export class ToonTransformation extends PixelMapTransformation {
    private threshold: number = 0.2;
    private quantizationLevels: number = 10.0;
    constructor(threshold?: number, quantizationLevels?: number) {
        "use sendable";
        super();
        if (threshold) {
            this.threshold = threshold;
        }
        if (quantizationLevels) {
            this.quantizationLevels = quantizationLevels;
        }
    }
    getName(): string {
        return this.constructor.name + ';threshold:' + this.threshold + ';quantizationLevels:' + this.quantizationLevels;
    }
    async transform(context: Context, toTransform: PixelMap, width: number, height: number): Promise<PixelMap> {
        let imageInfo: image.ImageInfo = await toTransform.getImageInfo();
        if (!imageInfo.size) {
            console.error('ToonTransformation The image size does not exist.');
            return toTransform;
        }
        return await this.toonGPU(toTransform, imageInfo.size.width, imageInfo.size.height);
    }
    private async toonGPU(bitmap: image.PixelMap, targetWidth: number, targetHeight: number) {
        let bufferData = new ArrayBuffer(bitmap.getPixelBytesNumber());
        await bitmap.readPixelsToBuffer(bufferData);
        let filter = new GPUImageToonFilter();
        filter.setImageData(bufferData, targetWidth, targetHeight);
        filter.setThreshold(this.threshold);
        filter.setQuantizationLevels(this.quantizationLevels);
        let buf = await filter.getPixelMapBuf(0, 0, targetWidth, targetHeight);
        await bitmap.writeBufferToPixels(buf);
        return bitmap;
    }
}
