import { ImageKnifeLoader } from "@package:pkg_modules/.ohpm/@ohos+imageknife@3.2.10/pkg_modules/@ohos/imageknife/src/main/ets/ImageKnifeLoader";
import { ImageKnifeRequestSource } from "@package:pkg_modules/.ohpm/@ohos+imageknife@3.2.10/pkg_modules/@ohos/imageknife/src/main/ets/model/ImageKnifeData";
import type { DecodeImageInfo, ImageKnifeData, RequestJobRequest, RequestJobResult, TimeInfo } from "@package:pkg_modules/.ohpm/@ohos+imageknife@3.2.10/pkg_modules/@ohos/imageknife/src/main/ets/model/ImageKnifeData";
import { LoadPhase, LoadPixelMapCode } from "@package:pkg_modules/.ohpm/@ohos+imageknife@3.2.10/pkg_modules/@ohos/imageknife/src/main/ets/utils/Constants";
import type { IParseImage } from "./IParseImage";
import image from "@ohos:multimedia.image";
import sendableImage from "@ohos:multimedia.sendableImage";
import type { BusinessError } from "@ohos:base";
import deviceInfo from "@ohos:deviceInfo";
import { LogUtil } from "@package:pkg_modules/.ohpm/@ohos+imageknife@3.2.10/pkg_modules/@ohos/imageknife/src/main/ets/utils/LogUtil";
import { DownsampleStrategy } from "@package:pkg_modules/.ohpm/@ohos+imageknife@3.2.10/pkg_modules/@ohos/imageknife/src/main/ets/downsampling/DownsampleStartegy";
export class SvgParseImage implements IParseImage {
    async parseImage(resBuf: ArrayBuffer, typeValue: string, fileKey: string, request: RequestJobRequest, callBackData: ImageKnifeData): Promise<RequestJobResult | undefined> {
        let resPixelmap: PixelMap | undefined = undefined;
        let timeInfo: TimeInfo = ImageKnifeLoader.getTimeInfo(callBackData);
        let pixel: sendableImage.PixelMap | undefined = undefined;
        let imageSource: image.ImageSource = image.createImageSource(resBuf);
        if (imageSource === undefined) {
            ImageKnifeLoader.makeEmptyResult(request, 'image.createImageSource failed', ImageKnifeLoader.assembleError(callBackData, LoadPhase.PHASE_CREATE_SOURCE, LoadPixelMapCode.IMAGE_SOURCE_ERROR_CODE));
            return;
        }
        let imageInfoSync = imageSource.getImageInfoSync();
        if (imageInfoSync === undefined) {
            imageSource.release();
            ImageKnifeLoader.makeEmptyResult(request, 'getImageInfoSync failed');
            return;
        }
        let size = imageInfoSync.size;
        let scale = size.height / size.width;
        let hValue = Math.round(request.componentHeight);
        let wValue = Math.round(request.componentWidth);
        let defaultSize: image.Size = {
            height: wValue * scale,
            width: wValue
        };
        let opts: image.DecodingOptions = {
            editable: true,
            desiredSize: defaultSize
        };
        callBackData.imageWidth = size.width;
        callBackData.imageHeight = size.height;
        try {
            if ((request.downsampType !== DownsampleStrategy.NONE) &&
                request.requestSource === ImageKnifeRequestSource.SRC) {
                opts.desiredSize = ImageKnifeLoader.getDownsamplerDecodingOptions(typeValue, request, size);
            }
        }
        catch (err) {
            imageSource.release();
            ImageKnifeLoader.makeEmptyResult(request, 'getDownsamplerDecodingOptions failed:' + err);
            return;
        }
        timeInfo.decodeStartTime = Date.now();
        // 获取旋转信息
        let exif: string | undefined = undefined;
        await imageSource.getImageProperty(image.PropertyKey.ORIENTATION).then((res) => {
            exif = res;
        }).catch((error: BusinessError) => {
            LogUtil.info("Svg image don't have rotation information, " + error.message);
        });
        await imageSource.createPixelMap(opts)
            .then((pixelmap: PixelMap) => {
            timeInfo.decodeEndTime = Date.now();
            resPixelmap = pixelmap;
            imageSource.release();
            try {
                resPixelmap.setTransferDetached(true);
                // 设置翻转和旋转角度
                if (exif && exif !== 'Top-left') {
                    let result = ImageKnifeLoader.getOrientation(exif);
                    if (result.horizontal || result.vertical) {
                        resPixelmap?.flipSync(result.horizontal, result.vertical);
                    }
                    if (result.rotate > 0) {
                        resPixelmap?.rotateSync(result.rotate);
                    }
                    LogUtil.log('Svg image set flip , horizontal=' + result.horizontal + ', vertical=' + result.vertical +
                        ', rotate=' + result.rotate);
                }
            }
            catch (e) {
                LogUtil.error('PixelMap setTransferDetached failed:' + JSON.stringify(e));
            }
        }).catch((error: BusinessError) => {
            timeInfo.decodeEndTime = Date.now();
            imageSource.release();
            ImageKnifeLoader.makeEmptyResult(request, 'getImageInfoSync failed:' + JSON.stringify(error), ImageKnifeLoader.assembleError(callBackData, LoadPhase.PHASE_CREATE_PIXEL_MAP, LoadPixelMapCode.IMAGE_DECODE_ERROR_CODE));
            return;
        });
        if (request.pixelName !== undefined && resPixelmap !== undefined) {
            if (deviceInfo.sdkApiVersion < 13) {
                LogUtil.error('api not support setPixelName');
            }
            else {
                (resPixelmap as PixelMap).setMemoryNameSync(request.pixelName);
            }
        }
        //获取各个pixelMap的大小
        if (resPixelmap && typeof resPixelmap !== 'string') {
            let decodeImages: DecodeImageInfo[] = [];
            let decodeImage: DecodeImageInfo = {
                contentWidth: defaultSize.width,
                contentHeight: defaultSize.height,
                contentSize: (resPixelmap as PixelMap).getPixelBytesNumber()
            };
            decodeImages.push(decodeImage);
            pixel = sendableImage.convertFromPixelMap(resPixelmap);
        }
        return {
            pixelMap: pixel,
            bufferSize: resBuf.byteLength,
            fileKey: fileKey,
            type: typeValue,
            imageKnifeData: callBackData
        };
    }
}
