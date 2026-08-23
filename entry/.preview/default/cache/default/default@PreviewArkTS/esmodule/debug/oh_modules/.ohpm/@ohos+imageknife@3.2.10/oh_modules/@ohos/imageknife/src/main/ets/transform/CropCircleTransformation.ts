import { PixelMapTransformation } from "@package:pkg_modules/.ohpm/@ohos+imageknife@3.2.10/pkg_modules/@ohos/imageknife/src/main/ets/transform/PixelMapTransformation";
import type { Size } from "@ohos:arkui.node";
import type image from "@ohos:multimedia.image";
/**
 * 图片变换：圆形裁剪效果
 */
export class CropCircleTransformation extends PixelMapTransformation {
    private mCenterX: number = 0;
    private mCenterY: number = 0;
    private mRadius: number = 0;
    constructor() {
        "use sendable";
        super();
    }
    getName(): string {
        return this.constructor.name + ';mCenterX:' + this.mCenterX + ';mCenterY:' + this.mCenterY + ';mRadius:' + this.mRadius;
    }
    async transform(context: Context, toTransform: PixelMap, width: number, height: number): Promise<PixelMap> {
        return await this.transformCircle(toTransform);
    }
    private async transformCircle(data: PixelMap): Promise<PixelMap> {
        let imageInfo: image.ImageInfo = await data.getImageInfo();
        let size: Size = {
            width: imageInfo.size.width,
            height: imageInfo.size.height
        };
        if (!size) {
            console.error('CropCircleTransformation The image size does not exist.');
            return data;
        }
        let height: number = size.height;
        let width: number = size.width;
        this.mRadius = 0;
        if (width > height) {
            this.mRadius = height / 2;
        }
        else {
            this.mRadius = width / 2;
        }
        this.mCenterX = width / 2;
        this.mCenterY = height / 2;
        let bufferData: ArrayBuffer = new ArrayBuffer(data.getPixelBytesNumber());
        await data.readPixelsToBuffer(bufferData);
        let dataArray = new Uint8Array(bufferData);
        for (let h = 0; h <= height; h++) {
            for (let w = 0; w <= width; w++) {
                if (this.isContainsCircle(w, h)) {
                    continue;
                }
                // 针对的点
                let index = (h * width + w) * 4;
                dataArray[index] = 0;
                dataArray[index + 1] = 0;
                dataArray[index + 2] = 0;
                dataArray[index + 3] = 0;
            }
        }
        await data.writeBufferToPixels(bufferData);
        return data;
    }
    isContainsCircle(x: number, y: number): boolean {
        let a = Math.pow((this.mCenterX - x), 2);
        let b = Math.pow((this.mCenterY - y), 2);
        let c = Math.sqrt((a + b));
        return c <= this.mRadius;
    }
}
