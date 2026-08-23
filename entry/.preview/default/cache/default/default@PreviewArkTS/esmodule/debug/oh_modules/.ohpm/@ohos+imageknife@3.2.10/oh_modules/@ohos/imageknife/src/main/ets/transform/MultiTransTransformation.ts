import { PixelMapTransformation } from "@package:pkg_modules/.ohpm/@ohos+imageknife@3.2.10/pkg_modules/@ohos/imageknife/src/main/ets/transform/PixelMapTransformation";
import type collections from "@ohos:arkts.collections";
/**
 * 多个图片变换
 */
export class MultiTransTransformation extends PixelMapTransformation {
    private transformations: collections.Array<PixelMapTransformation>;
    constructor(transformations: collections.Array<PixelMapTransformation>) {
        "use sendable";
        super();
        this.transformations = transformations;
    }
    async transform(context: Context, toTransform: PixelMap, width: number, height: number): Promise<PixelMap> {
        let res = toTransform;
        for (let i = 0; i < this.transformations.length; i++) {
            res = await this.transformations[i].transform(context, res, width, height);
        }
        return res;
    }
    getName(): string {
        let res: string = '';
        this.transformations.forEach((transformation) => {
            res += transformation.getName() + '&';
        });
        return res;
    }
}
