import { GPUImageSwirlFilter } from "@package:pkg_modules/.ohpm/@ohos+gpu_transform@1.0.4/pkg_modules/@ohos/gpu_transform/index";
import { PixelMapTransformation } from "@package:pkg_modules/.ohpm/@ohos+imageknife@3.2.10/pkg_modules/@ohos/imageknife/src/main/ets/transform/PixelMapTransformation";
import type image from "@ohos:multimedia.image";
/**
 * 图片变换：扭曲效果
 */
export class SwirlTransformation extends PixelMapTransformation {
    // degree:值越大范围越大
    private mDegree: number = 0;
    // 取值范围 0.0 ~ 1.0
    private mAngle: number = 0.9;
    // 在图中的位置 取值范围 0.0 ~ 1.0
    private mXCenter: number = 0.5;
    // 在图中的位置 取值范围 0.0 ~ 1.0
    private mYCenter: number = 0.5;
    constructor(degree: number, angle?: number, centerPoint?: Array<number>) {
        "use sendable";
        super();
        this.mDegree = degree;
        if (angle) {
            this.mAngle = angle;
        }
        if (centerPoint && centerPoint.length === 2) {
            this.mXCenter = centerPoint[0];
            this.mYCenter = centerPoint[1];
        }
    }
    getName(): string {
        return this.constructor.name + ';degree:' + this.mDegree + ';angle:' + this.mAngle + ';XCenter:' + this.mXCenter
            + ';YCenter:' + this.mYCenter;
    }
    async transform(context: Context, toTransform: PixelMap, width: number, height: number): Promise<PixelMap> {
        let imageInfo: image.ImageInfo = await toTransform.getImageInfo();
        if (!imageInfo.size) {
            console.error('SwirlTransformation The image size does not exist.');
            return toTransform;
        }
        return await this.swirlGPU(toTransform, imageInfo.size.width, imageInfo.size.height);
    }
    private async swirlGPU(bitmap: image.PixelMap, targetWidth: number, targetHeight: number): Promise<PixelMap> {
        let bufferData = new ArrayBuffer(bitmap.getPixelBytesNumber());
        await bitmap.readPixelsToBuffer(bufferData);
        let filter = new GPUImageSwirlFilter();
        filter.setImageData(bufferData, targetWidth, targetHeight);
        filter.setRadius(this.mDegree);
        filter.setAngle(this.mAngle);
        filter.setCenter(this.mXCenter, this.mYCenter);
        let buf = await filter.getPixelMapBuf(0, 0, targetWidth, targetHeight);
        await bitmap.writeBufferToPixels(buf);
        return bitmap;
    }
}
