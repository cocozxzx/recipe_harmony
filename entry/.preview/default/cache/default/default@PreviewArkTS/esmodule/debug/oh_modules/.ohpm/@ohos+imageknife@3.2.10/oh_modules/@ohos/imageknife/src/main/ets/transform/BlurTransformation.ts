import { PixelMapTransformation } from "@package:pkg_modules/.ohpm/@ohos+imageknife@3.2.10/pkg_modules/@ohos/imageknife/src/main/ets/transform/PixelMapTransformation";
import effectKit from "@ohos:effectKit";
/**
 * 图片变换：模糊效果
 */
export class BlurTransformation extends PixelMapTransformation {
    private radius: number; // 模糊半径，单位是像素。模糊效果与所设置的值成正比，值越大效果越明显。
    constructor(radius: number) {
        "use sendable";
        super();
        this.radius = radius;
    }
    getName(): string {
        return this.constructor.name + ';radius:' + this.radius;
    }
    async transform(context: Context, toTransform: PixelMap, width: number, height: number): Promise<PixelMap> {
        let headFilter = effectKit.createEffect(toTransform);
        if (headFilter != null) {
            return await headFilter.blur(this.radius).getEffectPixelMap();
        }
        return toTransform;
    }
}
