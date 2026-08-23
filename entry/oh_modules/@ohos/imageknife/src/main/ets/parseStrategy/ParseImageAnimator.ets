/*
 * Copyright (C) 2025 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
// 控制动图解码策略
import { ImageKnifeLoader } from "../ImageKnifeLoader";
import { DecodeImageInfo, ImageKnifeData, ImageKnifeRequestSource, RequestJobRequest,
  RequestJobResult,
  TimeInfo} from "../model/ImageKnifeData";
import { LoadPhase, LoadPixelMapCode } from "../utils/Constants";
import { IParseImage } from "./IParseImage";
import { BusinessError,deviceInfo } from "@kit.BasicServicesKit";
import { image, sendableImage } from "@kit.ImageKit";
import { LogUtil } from "../utils/LogUtil";

export class ParseImageAnimator implements IParseImage {
  async parseImage(
    resBuf: ArrayBuffer,
    typeValue: string,
    fileKey: string,
    request: RequestJobRequest,
    callBackData: ImageKnifeData
  ): Promise<RequestJobResult | undefined> {
    let timeInfo: TimeInfo = ImageKnifeLoader.getTimeInfo(callBackData);

    if (typeValue === 'gif' || typeValue === 'webp') {
      let imageSource: image.ImageSource = image.createImageSource(resBuf);
      if (imageSource === undefined){
        ImageKnifeLoader.makeEmptyResult(request,'image.createImageSource failed', ImageKnifeLoader.assembleError(callBackData, LoadPhase.PHASE_CREATE_SOURCE, LoadPixelMapCode.IMAGE_SOURCE_ERROR_CODE))
        return
      }
      let decodingOptions: image.DecodingOptions = {
        editable: request.requestSource === ImageKnifeRequestSource.SRC && request.transformation !== undefined ? true : false,
      }

      let imageInfoSync = imageSource.getImageInfoSync()
      if (imageInfoSync === undefined){
        imageSource.release()
        ImageKnifeLoader.makeEmptyResult(request, 'getImageInfoSync failed')
        return
      }
      callBackData.imageWidth = imageInfoSync.size.width;
      callBackData.imageHeight = imageInfoSync.size.height;
      let pixelMapList: Array<sendableImage.PixelMap> = []
      let pixList: Array<image.PixelMap> = []
      let delayList: Array<number> = []
      timeInfo.decodeStartTime = Date.now();
      let decodeImages: Array<DecodeImageInfo> = [];
      await imageSource.createPixelMapList(decodingOptions).then(async (pixelList: Array<PixelMap>) => {
        timeInfo.decodeEndTime = Date.now();
        pixList = pixelList
        //sdk的api接口发生变更：从.getDelayTime() 变为.getDelayTimeList()
        await imageSource.getDelayTimeList().then(delayTimes => {
          if (pixelList.length > 0) {
            for (let i = 0; i < pixelList.length; i++) {
              if (i < delayTimes.length) {
                delayList.push(delayTimes[i]);
              } else {
                delayList.push(delayTimes[delayTimes.length - 1])
              }
              //获取各个pixelMap的大小
              let size = pixelList[i].getImageInfoSync().size
              let decodeImage: DecodeImageInfo = {
                contentWidth: size.width,
                contentHeight: size.height,
                contentSize: pixelList[i].getPixelBytesNumber()
              }
              decodeImages.push(decodeImage);
            }
            imageSource.release();
          }
        })
      }).catch((error: BusinessError) => {
        imageSource.release()
        timeInfo.decodeEndTime = Date.now();
        ImageKnifeLoader.makeEmptyResult(request,'createPixelMapList failed:' + JSON.stringify(error),
          ImageKnifeLoader.assembleError(callBackData,LoadPhase.PHASE_CREATE_PIXEL_MAP,LoadPixelMapCode.IMAGE_DECODE_ERROR_CODE))
        return
      })
      for (let index = 0;index < pixList.length; index++) {
        if (request.pixelName !== undefined) {
          if (deviceInfo.sdkApiVersion < 13) {
            LogUtil.error('api not support setPixelName')
          } else {
            pixList[index].setMemoryNameSync(request.pixelName)
          }
        }
        pixelMapList.push(sendableImage.convertFromPixelMap(pixList[index]));
      }
      callBackData.decodeImages = decodeImages;
      return {
        pixelMap: '',
        bufferSize: resBuf.byteLength,
        fileKey: fileKey,
        type: typeValue,
        imageKnifeData:callBackData,
        pixelMapList,
        delayList
      }
    } else {
      ImageKnifeLoader.makeEmptyResult(request,'ImageKnifeAnimatorComponent not support format', ImageKnifeLoader.assembleError(callBackData,LoadPhase.PHASE_PARSE_IAMGE,LoadPixelMapCode.IMAGE_FORMAT_ERROR_CODE))
      return
    }
  }
}