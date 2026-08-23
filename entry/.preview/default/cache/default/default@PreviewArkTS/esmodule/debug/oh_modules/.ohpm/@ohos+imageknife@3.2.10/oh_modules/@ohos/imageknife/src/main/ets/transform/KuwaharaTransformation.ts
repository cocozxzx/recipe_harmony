import { GPUImageKuwaharaFilter } from "@package:pkg_modules/.ohpm/@ohos+gpu_transform@1.0.4/pkg_modules/@ohos/gpu_transform/index";
import { PixelMapTransformation } from "@package:pkg_modules/.ohpm/@ohos+imageknife@3.2.10/pkg_modules/@ohos/imageknife/src/main/ets/transform/PixelMapTransformation";
import type image from "@ohos:multimedia.image";
/**
 * 图片变换：桑原滤波效果
 */
export class KuwaharaTransformation extends PixelMapTransformation {
    private radius: number;
    constructor(radius: number) {
        "use sendable";
        super();
        this.radius = radius;
    }
    getName(): string {
        return this.constructor.name + ';radius:' + this.radius;
    }
    async transform(context: Context, toTransform: PixelMap, width: number, height: number): Promise<PixelMap> {
        let imageInfo: image.ImageInfo = await toTransform.getImageInfo();
        if (!imageInfo.size) {
            console.error('KuwaharaTransformation The image size does not exist.');
            return toTransform;
        }
        return await this.kuwaharaGpu(toTransform, imageInfo.size.width, imageInfo.size.height);
    }
    private async kuwaharaGpu(bitmap: PixelMap, targetWidth: number, targetHeight: number): Promise<PixelMap> {
        let bufferData = new ArrayBuffer(bitmap.getPixelBytesNumber());
        await bitmap.readPixelsToBuffer(bufferData);
        let filter = new GPUImageKuwaharaFilter();
        filter.setImageData(bufferData, targetWidth, targetHeight);
        filter.setRadius(this.radius);
        let buf = await filter.getPixelMapBuf(0, 0, targetWidth, targetHeight);
        await bitmap.writeBufferToPixels(buf);
        return bitmap;
    }
}
