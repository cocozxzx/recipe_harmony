import { PixelMapTransformation } from "@package:pkg_modules/.ohpm/@ohos+imageknife@3.2.10/pkg_modules/@ohos/imageknife/src/main/ets/transform/PixelMapTransformation";
import effectKit from "@ohos:effectKit";
/**
 * 图片变换：高亮效果
 */
export class BrightnessTransformation extends PixelMapTransformation {
    private bright: number; // 高亮程度，取值范围在0-1之间，取值为0时图像保持不变。
    constructor(bright: number) {
        "use sendable";
        super();
        this.bright = bright;
    }
    getName(): string {
        return this.constructor.name + ';bright:' + this.bright;
    }
    async transform(context: Context, toTransform: PixelMap, width: number, height: number): Promise<PixelMap> {
        let headFilter = effectKit.createEffect(toTransform);
        if (headFilter != null) {
            return await headFilter.brightness(this.bright).getEffectPixelMap();
        }
        return toTransform;
    }
}
