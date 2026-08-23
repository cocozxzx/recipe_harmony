import type { RequestJobRequest } from "../model/ImageKnifeData";
import { GIFParseImage } from "@package:pkg_modules/.ohpm/@ohos+imageknife@3.2.10/pkg_modules/@ohos/imageknife/src/main/ets/parseStrategy/GIFParseImage";
import type { IParseImage } from "./IParseImage";
import { ParseImageAnimator } from "@package:pkg_modules/.ohpm/@ohos+imageknife@3.2.10/pkg_modules/@ohos/imageknife/src/main/ets/parseStrategy/ParseImageAnimator";
import { ParseStaticImage } from "@package:pkg_modules/.ohpm/@ohos+imageknife@3.2.10/pkg_modules/@ohos/imageknife/src/main/ets/parseStrategy/ParseStaticImage";
import { SvgParseImage } from "@package:pkg_modules/.ohpm/@ohos+imageknife@3.2.10/pkg_modules/@ohos/imageknife/src/main/ets/parseStrategy/SvgParseImage";
export class ParseImageFactory {
    static getParseStrategy(request: RequestJobRequest, typeValue: string): IParseImage {
        if (request.isAnimator) {
            return new ParseImageAnimator();
        }
        if (typeValue === 'gif' || typeValue === 'webp') {
            return new GIFParseImage();
        }
        else if (typeValue === 'svg') {
            return new SvgParseImage();
        }
        return new ParseStaticImage();
    }
}
