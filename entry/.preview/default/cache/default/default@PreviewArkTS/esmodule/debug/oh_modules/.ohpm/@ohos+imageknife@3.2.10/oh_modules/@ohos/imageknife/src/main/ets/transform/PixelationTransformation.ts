import { GPUImagePixelationFilter } from "@package:pkg_modules/.ohpm/@ohos+gpu_transform@1.0.4/pkg_modules/@ohos/gpu_transform/index";
import { PixelMapTransformation } from "@package:pkg_modules/.ohpm/@ohos+imageknife@3.2.10/pkg_modules/@ohos/imageknife/src/main/ets/transform/PixelMapTransformation";
import type image from "@ohos:multimedia.image";
/**
 * Applies a Pixelation effect to the image.
 * The pixel with a default of 10.0.
 */
export class PixelationTransformation extends PixelMapTransformation {
    private mPixel: number = 10.0;
    constructor(pixel?: number) {
        "use sendable";
        super();
        if (pixel) {
            this.mPixel = pixel;
        }
    }
    getName(): string {
        return this.constructor.name + ';pixel:' + this.mPixel;
    }
    async transform(context: Context, toTransform: PixelMap, width: number, height: number): Promise<PixelMap> {
        let imageInfo: image.ImageInfo = await toTransform.getImageInfo();
        if (!imageInfo.size) {
            console.error('PixelationTransformation The image size does not exist.');
            return toTransform;
        }
        return await this.pixelGPU(toTransform, imageInfo.size.width, imageInfo.size.height);
    }
    private async pixelGPU(bitmap: PixelMap, targetWidth: number, targetHeight: number): Promise<PixelMap> {
        let bufferData = new ArrayBuffer(bitmap.getPixelBytesNumber());
        await bitmap.readPixelsToBuffer(bufferData);
        let filter = new GPUImagePixelationFilter();
        filter.setImageData(bufferData, targetWidth, targetHeight);
        filter.setPixel(this.mPixel);
        let buf = await filter.getPixelMapBuf(0, 0, targetWidth, targetHeight);
        await bitmap.writeBufferToPixels(buf);
        return bitmap;
    }
}
