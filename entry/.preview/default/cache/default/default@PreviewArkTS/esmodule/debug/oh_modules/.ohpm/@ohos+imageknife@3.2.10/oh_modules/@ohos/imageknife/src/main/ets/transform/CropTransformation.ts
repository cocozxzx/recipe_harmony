import { PixelMapTransformation } from "@package:pkg_modules/.ohpm/@ohos+imageknife@3.2.10/pkg_modules/@ohos/imageknife/src/main/ets/transform/PixelMapTransformation";
import type { Size } from "@ohos:arkui.node";
import type image from "@ohos:multimedia.image";
/**
 * 图片变换：自定义裁剪效果
 */
export class CropTransformation extends PixelMapTransformation {
    private mWidth: number = 0;
    private mHeight: number = 0;
    private mCropType: number = 0;
    constructor(width: number, height: number, cropType: number) {
        "use sendable";
        super();
        this.mWidth = width;
        this.mHeight = height;
        this.mCropType = cropType;
    }
    getName(): string {
        return this.constructor.name + ';mWidth:' + this.mWidth + ';mHeight:' + this.mHeight + ';mCropType:' + this.mCropType;
    }
    async transform(context: Context, toTransform: PixelMap, width: number, height: number): Promise<PixelMap> {
        let imageInfo: image.ImageInfo = await toTransform.getImageInfo();
        let size: Size = {
            width: imageInfo.size.width,
            height: imageInfo.size.height
        };
        if (!size) {
            console.error('CropTransformation The image size does not exist.');
            return toTransform;
        }
        let pixelMapWidth: number = size.width;
        let pixelMapHeight: number = size.height;
        this.mWidth = this.mWidth == 0 ? pixelMapWidth : this.mWidth;
        this.mHeight = this.mHeight == 0 ? pixelMapHeight : this.mHeight;
        let scaleX: number = this.mWidth / pixelMapWidth;
        let scaleY: number = this.mHeight / pixelMapHeight;
        let scale: number = Math.max(scaleX, scaleY);
        let scaledWidth: number = scale * pixelMapWidth;
        let scaledHeight: number = scale * pixelMapHeight;
        let left: number = (this.mWidth - scaledWidth) / 2;
        let top: number = Math.abs(this.getTop(scaledHeight));
        toTransform.scaleSync(scale, scale);
        let region: image.Region = {
            size: {
                width: this.mWidth,
                height: this.mHeight
            },
            x: left < 0 ? 0 : left,
            y: top < 0 ? 0 : top
        };
        toTransform.cropSync(region);
        return toTransform;
    }
    private getTop(scaledHeight: number): number {
        switch (this.mCropType) {
            case 0:
                return 0;
            case 1:
                return (this.mHeight - scaledHeight) / 2;
            case 2:
                return this.mHeight - scaledHeight;
            default:
                return 0;
        }
    }
}
