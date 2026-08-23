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
// 动图解码策略
import { ImageKnifeLoader } from "../ImageKnifeLoader";
import { ImageKnifeData, RequestJobRequest, RequestJobResult, TimeInfo } from "../model/ImageKnifeData";
import { LoadPhase, LoadPixelMapCode } from "../utils/Constants";
import { IParseImage } from "./IParseImage";
import { image } from "@kit.ImageKit";
import { util } from "@kit.ArkTS";
import { ParseStaticImage } from "./ParseStaticImage";

export class GIFParseImage implements IParseImage {
  async parseImage(
    resBuf: ArrayBuffer,
    typeValue: string,
    fileKey: string,
    request: RequestJobRequest,
    callBackData: ImageKnifeData
  ): Promise<RequestJobResult | undefined> {
    let timeInfo: TimeInfo = ImageKnifeLoader.getTimeInfo(callBackData);
    let imageSource: image.ImageSource = image.createImageSource(resBuf)
    if (imageSource === undefined) {
      ImageKnifeLoader.makeEmptyResult(request, 'image.createImageSource failed',
        ImageKnifeLoader.assembleError(callBackData, LoadPhase.PHASE_CREATE_SOURCE,
          LoadPixelMapCode.IMAGE_SOURCE_ERROR_CODE))
      return
    }

    let frameCount = await imageSource.getFrameCount()
    let imageInfoSync = imageSource.getImageInfoSync()
    imageSource.release()
    if (imageInfoSync === undefined) {
      ImageKnifeLoader.makeEmptyResult(request, 'getImageInfoSync failed')
      return
    }
    let size = imageInfoSync.size
    callBackData.frameCount = frameCount;
    callBackData.imageWidth = size.width;
    callBackData.imageHeight = size.height;

    if (frameCount !== undefined && frameCount > 1) {
      timeInfo.decodeStartTime = Date.now()
      let base64str =
        'data:image/' + typeValue + ';base64,' + new util.Base64Helper().encodeToStringSync(new Uint8Array(resBuf))
      timeInfo.decodeEndTime = Date.now()
      return {
        pixelMap: base64str,
        bufferSize: resBuf.byteLength,
        fileKey: fileKey,
        size: size,
        type: typeValue,
        imageKnifeData: callBackData
      }
    }
    return new ParseStaticImage().parseImage(resBuf, typeValue, fileKey, request, callBackData)
  }
}