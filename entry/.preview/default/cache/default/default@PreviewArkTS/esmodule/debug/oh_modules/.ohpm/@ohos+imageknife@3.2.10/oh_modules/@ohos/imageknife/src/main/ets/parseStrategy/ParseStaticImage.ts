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
import hiTraceMeter from "@ohos:hiTraceMeter";
export class ParseStaticImage implements IParseImage {
    async parseImage(resBuf: ArrayBuffer, typeValue: string, fileKey: string, request: RequestJobRequest, callBackData: ImageKnifeData): Promise<RequestJobResult | undefined> {
        let resPixelmap: PixelMap | undefined = undefined;
        hiTraceMeter.startTrace('parseImage', request.componentId);
        let timeInfo: TimeInfo = ImageKnifeLoader.getTimeInfo(callBackData);
        let pixel: sendableImage.PixelMap | undefined = undefined;
        let rangeMode: image.DecodingDynamicRange | undefined = undefined;
        switch (request.dynamicRangeMode) {
            case DynamicRangeMode.HIGH:
                rangeMode = image.DecodingDynamicRange.HDR;
                break;
            case DynamicRangeMode.CONSTRAINT:
                rangeMode = image.DecodingDynamicRange.AUTO;
                break;
            case DynamicRangeMode.STANDARD:
                rangeMode = image.DecodingDynamicRange.SDR;
                break;
        }
        let decodingOptions: image.DecodingOptions = {
            editable: request.requestSource === ImageKnifeRequestSource.SRC && request.transformation !== undefined ? true :
                false,
            desiredDynamicRange: rangeMode
        };
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
        callBackData.imageWidth = size.width;
        callBackData.imageHeight = size.height;
        if (request.isAutoImageFit && request.requestSource === ImageKnifeRequestSource.SRC) {
            request.componentHeight = request.componentWidth * size.height / size.width;
        }
        try {
            if ((request.downsampType !== DownsampleStrategy.NONE) &&
                request.requestSource === ImageKnifeRequestSource.SRC) {
                decodingOptions.desiredSize =
                    ImageKnifeLoader.getDownsamplerDecodingOptions(typeValue, request, size, ImageKnifeRequestSource.SRC);
            }
        }
        catch (err) {
            imageSource.release();
            ImageKnifeLoader.makeEmptyResult(request, 'getDownsamplerDecodingOptions failed:' + err);
            return;
        }
        // 如果开启jpeg解码优化、类型是jpeg/jpg且没有图形变换后处理(配置transformation)，设置YUV格式解码
        if (request.jpegOptimizeDecoding && !request.transformation && typeValue === 'jpg') {
            decodingOptions.desiredPixelFormat = image.PixelMapFormat.NV12;
            LogUtil.log(`decodingOptions.desiredPixelFormat is image.PixelMapFormat.NV12 : ${request.componentId},srcType:${request.requestSource}, ${request.componentVersion}`);
        }
        timeInfo.decodeStartTime = Date.now();
        // 获取旋转信息
        let exif: string | undefined = undefined;
        await imageSource.getImageProperty(image.PropertyKey.ORIENTATION).then((res) => {
            exif = res;
        }).catch((error: BusinessError) => {
            LogUtil.info("The normal image don't have rotation information, " + error.message);
        });
        await imageSource.createPixelMap(decodingOptions)
            .then((pixelmap: PixelMap) => {
            timeInfo.decodeEndTime = Date.now();
            resPixelmap = pixelmap;
            imageSource.release();
        }).catch((error: BusinessError) => {
            timeInfo.decodeEndTime = Date.now();
            imageSource.release();
            ImageKnifeLoader.makeEmptyResult(request, 'createPixelMap failed:' + JSON.stringify(error), ImageKnifeLoader.assembleError(callBackData, LoadPhase.PHASE_CREATE_PIXEL_MAP, LoadPixelMapCode.IMAGE_DECODE_ERROR_CODE));
            return;
        });
        if (request.requestSource === ImageKnifeRequestSource.SRC && request.transformation !== undefined &&
            resPixelmap !== undefined) {
            LogUtil.log('requestJob.transform.start:' + request.componentId + ',srcType:' + request.requestSource + ',' +
                request.componentVersion);
            resPixelmap = await request.transformation?.transform(request.context, resPixelmap, request.componentWidth, request.componentHeight);
            LogUtil.log('requestJob.transform.end:' + request.componentId + ',srcType:' + request.requestSource + ',' +
                request.componentVersion);
        }
        try {
            resPixelmap?.setTransferDetached(true);
        }
        catch (e) {
            LogUtil.error('PixelMap setTransferDetached failed:' + JSON.stringify(e));
        }
        // 设置翻转和旋转角度
        if (exif && exif !== 'Top-left') {
            let result = ImageKnifeLoader.getOrientation(exif);
            if (result.horizontal || result.vertical) {
                resPixelmap?.flipSync(result.horizontal, result.vertical);
            }
            if (result.rotate > 0) {
                resPixelmap?.rotateSync(result.rotate);
            }
            LogUtil.log('The normal image set flip , horizontal=' + result.horizontal + ', vertical=' + result.vertical +
                ', rotate=' + result.rotate);
        }
        if (request.pixelName !== undefined) {
            if (deviceInfo.sdkApiVersion < 13) {
                LogUtil.error('api not support setPixelName');
            }
            else {
                resPixelmap?.setMemoryNameSync(request.pixelName);
            }
        }
        //获取各个pixelMap的大小
        if (resPixelmap !== undefined) {
            let decodeImages: DecodeImageInfo[] = [];
            let size = (resPixelmap as PixelMap).getImageInfoSync().size;
            let decodeImage: DecodeImageInfo = {
                contentWidth: size.width,
                contentHeight: size.height,
                contentSize: (resPixelmap as PixelMap).getPixelBytesNumber()
            };
            decodeImages.push(decodeImage);
            callBackData.decodeImages = decodeImages;
            pixel = sendableImage.convertFromPixelMap(resPixelmap);
        }
        LogUtil.log('image parse pixelmap end:' + request.componentId + ',srcType:' + request.requestSource + ',' +
            request.componentVersion);
        hiTraceMeter.finishTrace('parseImage', request.componentId);
        return {
            pixelMap: pixel,
            bufferSize: resBuf.byteLength,
            fileKey: fileKey,
            size: size,
            type: typeValue,
            imageKnifeData: callBackData
        };
    }
}
