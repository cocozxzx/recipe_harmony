import { PixelMapTransformation } from "@package:pkg_modules/.ohpm/@ohos+imageknife@3.2.10/pkg_modules/@ohos/imageknife/src/main/ets/transform/PixelMapTransformation";
import effectKit from "@ohos:effectKit";
/**
 * 图片变换：灰化效果
 */
export class GrayScaleTransformation extends PixelMapTransformation {
    constructor() {
        "use sendable";
        super();
    }
    async transform(context: Context, toTransform: PixelMap, width: number, height: number): Promise<PixelMap> {
        let headFilter = effectKit.createEffect(toTransform);
        if (headFilter != null) {
            return await headFilter.grayscale().getEffectPixelMap();
        }
        return toTransform;
    }
}
