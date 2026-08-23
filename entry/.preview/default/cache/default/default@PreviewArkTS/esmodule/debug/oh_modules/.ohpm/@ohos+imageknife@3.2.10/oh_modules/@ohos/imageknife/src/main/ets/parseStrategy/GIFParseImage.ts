import { ImageKnifeLoader } from "@package:pkg_modules/.ohpm/@ohos+imageknife@3.2.10/pkg_modules/@ohos/imageknife/src/main/ets/ImageKnifeLoader";
import type { ImageKnifeData, RequestJobRequest, RequestJobResult, TimeInfo } from "../model/ImageKnifeData";
import { LoadPhase, LoadPixelMapCode } from "@package:pkg_modules/.ohpm/@ohos+imageknife@3.2.10/pkg_modules/@ohos/imageknife/src/main/ets/utils/Constants";
import type { IParseImage } from "./IParseImage";
import image from "@ohos:multimedia.image";
import util from "@ohos:util";
import { ParseStaticImage } from "@package:pkg_modules/.ohpm/@ohos+imageknife@3.2.10/pkg_modules/@ohos/imageknife/src/main/ets/parseStrategy/ParseStaticImage";
export class GIFParseImage implements IParseImage {
    async parseImage(resBuf: ArrayBuffer, typeValue: string, fileKey: string, request: RequestJobRequest, callBackData: ImageKnifeData): Promise<RequestJobResult | undefined> {
        let timeInfo: TimeInfo = ImageKnifeLoader.getTimeInfo(callBackData);
        let imageSource: image.ImageSource = image.createImageSource(resBuf);
        if (imageSource === undefined) {
            ImageKnifeLoader.makeEmptyResult(request, 'image.createImageSource failed', ImageKnifeLoader.assembleError(callBackData, LoadPhase.PHASE_CREATE_SOURCE, LoadPixelMapCode.IMAGE_SOURCE_ERROR_CODE));
            return;
        }
        let frameCount = await imageSource.getFrameCount();
        let imageInfoSync = imageSource.getImageInfoSync();
        imageSource.release();
        if (imageInfoSync === undefined) {
            ImageKnifeLoader.makeEmptyResult(request, 'getImageInfoSync failed');
            return;
        }
        let size = imageInfoSync.size;
        callBackData.frameCount = frameCount;
        callBackData.imageWidth = size.width;
        callBackData.imageHeight = size.height;
        if (frameCount !== undefined && frameCount > 1) {
            timeInfo.decodeStartTime = Date.now();
            let base64str = 'data:image/' + typeValue + ';base64,' + new util.Base64Helper().encodeToStringSync(new Uint8Array(resBuf));
            timeInfo.decodeEndTime = Date.now();
            return {
                pixelMap: base64str,
                bufferSize: resBuf.byteLength,
                fileKey: fileKey,
                size: size,
                type: typeValue,
                imageKnifeData: callBackData
            };
        }
        return new ParseStaticImage().parseImage(resBuf, typeValue, fileKey, request, callBackData);
    }
}
