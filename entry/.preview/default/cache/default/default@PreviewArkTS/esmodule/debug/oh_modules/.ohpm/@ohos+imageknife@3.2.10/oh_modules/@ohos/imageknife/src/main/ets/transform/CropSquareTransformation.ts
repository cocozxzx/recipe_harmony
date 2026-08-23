import { PixelMapTransformation } from "@package:pkg_modules/.ohpm/@ohos+imageknife@3.2.10/pkg_modules/@ohos/imageknife/src/main/ets/transform/PixelMapTransformation";
import type { Size } from "@ohos:arkui.node";
import type image from "@ohos:multimedia.image";
/**
 * 图片变换：正方形裁剪效果
 */
export class CropSquareTransformation extends PixelMapTransformation {
    constructor() {
        "use sendable";
        super();
    }
    async transform(context: Context, toTransform: PixelMap, width: number, height: number): Promise<PixelMap> {
        let imageInfo: image.ImageInfo = await toTransform.getImageInfo();
        let size: Size = {
            width: imageInfo.size.width,
            height: imageInfo.size.height
        };
        if (!size) {
            console.error('CropSquareTransformation The image size does not exist.');
            return toTransform;
        }
        let pixelMapWidth: number = size.width;
        let pixelMapHeight: number = size.height;
        let targetSize: number = pixelMapWidth > pixelMapHeight ? pixelMapHeight : pixelMapWidth;
        let region: image.Region = {
            size: { width: targetSize, height: targetSize },
            x: pixelMapWidth / 2 - targetSize / 2,
            y: pixelMapHeight / 2 - targetSize / 2
        };
        await toTransform.crop(region);
        return toTransform;
    }
}
