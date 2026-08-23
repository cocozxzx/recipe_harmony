import { GPUImageSketchFilter } from "@package:pkg_modules/.ohpm/@ohos+gpu_transform@1.0.4/pkg_modules/@ohos/gpu_transform/index";
import { PixelMapTransformation } from "@package:pkg_modules/.ohpm/@ohos+imageknife@3.2.10/pkg_modules/@ohos/imageknife/src/main/ets/transform/PixelMapTransformation";
import type image from "@ohos:multimedia.image";
/**
 * 图片变换:素描效果
 */
export class SketchTransformation extends PixelMapTransformation {
    constructor() {
        "use sendable";
        super();
    }
    async transform(context: Context, toTransform: PixelMap, width: number, height: number): Promise<PixelMap> {
        let imageInfo: image.ImageInfo = await toTransform.getImageInfo();
        if (!imageInfo.size) {
            console.error('SketchTransformation The image size does not exist.');
            return toTransform;
        }
        return await this.sketchGPU(toTransform, imageInfo.size.width, imageInfo.size.height);
    }
    private async sketchGPU(bitmap: PixelMap, targetWidth: number, targetHeight: number): Promise<PixelMap> {
        let bufferData = new ArrayBuffer(bitmap.getPixelBytesNumber());
        await bitmap.readPixelsToBuffer(bufferData);
        let filter = new GPUImageSketchFilter();
        filter.setImageData(bufferData, targetWidth, targetHeight);
        let buf = await filter.getPixelMapBuf(0, 0, targetWidth, targetHeight);
        await bitmap.writeBufferToPixels(buf);
        return bitmap;
    }
}
