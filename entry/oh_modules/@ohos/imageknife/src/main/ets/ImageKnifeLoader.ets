/*
 * Copyright (C) 2024 Huawei Device Co., Ltd.
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
import {
  CacheStrategy,
  DecodeImageInfo,
  ErrorInfo,
  FlipRotate,
  ImageKnifeData,
  ImageKnifeRequestSource,
  ImageKnifeRequestWithSource, RequestJobRequest,
  TimeInfo } from './model/ImageKnifeData';
import List from '@ohos.util.List'
import { FileCache } from './cache/FileCache';
import { LogUtil } from './utils/LogUtil';
import { Constants, LoadPhase, LoadPixelMapCode } from './utils/Constants';
import http from '@ohos.net.http';
import { combineArrayBuffers } from './utils/ArrayBufferUtils';
import { BusinessError } from '@kit.BasicServicesKit';
import fs from '@ohos.file.fs';
import emitter from '@ohos.events.emitter';
import image from '@ohos.multimedia.image';
import { RequestJobResult } from './model/ImageKnifeData'
import util from '@ohos.util';
import { FileTypeUtil } from './utils/FileTypeUtil';
import { DownsampleStrategy } from './downsampling/DownsampleStartegy';
import { Downsampler } from './downsampling/Downsampler';
import { common } from '@kit.AbilityKit';
import { ImageLoaderFactory } from './loaderStrategy/ImageLoaderFactory';
import { taskpool } from '@kit.ArkTS';
import { hiTraceMeter } from '@kit.PerformanceAnalysisKit';
import { ParseImageFactory } from './parseStrategy/ParseImageFactory';

/**
 * ImageKnifeDispatcher 抽取出来的方法，因@Concurrent只能import方法，故抽取到另一个类
 */
export class ImageKnifeLoader {
  static execute(request: RequestJobRequest, requestList: List<ImageKnifeRequestWithSource> | undefined, fileKey: string){
    ImageKnifeLoader.getImageArrayBuffer(request,requestList,fileKey)
  }
  static getUnit8Array (resBuf: ArrayBuffer) {
    let unit8 = new Uint8Array(resBuf)
    let unitString = ''
    if (unit8.length >= 3) {
      unitString = unit8[0] + ',' + unit8[1] + ',' + unit8[2]
    } else if (unit8.length > 0 && unit8.length < 3) {
      unitString = unit8.length + ''
    }
    return unitString
  }
  static async parseImage(resBuf: ArrayBuffer, fileKey: string,
    request: RequestJobRequest, callBackData: ImageKnifeData,headerObj?: Record<string, Object>): Promise<RequestJobResult | undefined> {
    callBackData.bufSize = resBuf.byteLength;
    let typeValue = new FileTypeUtil().getFileType(resBuf);
    if(typeValue == null) {
      LogUtil.log('requestJob.end: getFileType is null: ' + request.componentId + ',srcType:' + request.requestSource + ',' + request.componentVersion)
      ImageKnifeLoader.makeEmptyResult(request,
        'request is not a valid image source:' + request.src + ' ,componentId' + request.componentId + ',srcType:' +
        request.requestSource + ',' +
        request.componentVersion + ',buffer:' + resBuf.byteLength + ',unit8:' + ImageKnifeLoader.getUnit8Array(resBuf) +
          ',header:' + JSON.stringify(headerObj),
        ImageKnifeLoader.assembleError(callBackData, LoadPhase.PHASE_GET_FORMAT,
          LoadPixelMapCode.IMAGE_PARSE_FORMAT_FAILED_CODE))
      return
    }
    callBackData.type = typeValue;
    const parseFactory = ParseImageFactory.getParseStrategy(request,typeValue)
    let parseResult = await parseFactory.parseImage(resBuf,typeValue,fileKey,request,callBackData)
    return parseResult
  }

  static makeEmptyResult(request:RequestJobRequest,error: string, data?: ImageKnifeData){
    let res: RequestJobResult = {
      pixelMap: undefined,
      bufferSize: 0,
      fileKey: '',
      loadFail: error,
      imageKnifeData: data
    }
    emitter.emit(Constants.CALLBACK_EMITTER + request.memoryKey, { data: { 'value': res } })
  }

  static assembleError(data: ImageKnifeData | undefined, phase: string, code?: number): ImageKnifeData | undefined {
    let errorCallBackData = data?.errorInfo;
    if (!errorCallBackData) {
      return data;
    }
    errorCallBackData.phase = phase;
    errorCallBackData.code = code? code: 0;
    return data
  }

  static getTimeInfo(callBackData: ImageKnifeData): TimeInfo {
    let timeInfo: TimeInfo;
    if (callBackData.timeInfo) {
      timeInfo = callBackData.timeInfo;
    }else {
      timeInfo = {};
      callBackData.timeInfo = timeInfo;
    }
    return timeInfo;
  }
  static async  parseFile(resBuf: ArrayBuffer, fileKey: string,
    request: RequestJobRequest, callBackData: ImageKnifeData,saveFile?: boolean,headerObj?: Record<string, Object>) {
    let res = await ImageKnifeLoader.parseImage(resBuf,fileKey,request,callBackData,headerObj)
    // 保存文件缓存
    if (res && saveFile && request.writeCacheStrategy !== CacheStrategy.Memory) {
      LogUtil.log('requestJob_saveFileCacheOnlyFile.start:' + request.componentId + ',srcType:' + request.requestSource + ',' + request.componentVersion)
      hiTraceMeter.startTrace('saveFileCache',request.componentId)
      FileCache.saveFileCacheOnlyFile(request.context, fileKey, resBuf , request.fileCacheFolder)
      hiTraceMeter.finishTrace('saveFileCache',request.componentId)
      LogUtil.log('requestJob_saveFileCacheOnlyFile.end:' + request.componentId + ',srcType:' + request.requestSource + ',' + request.componentVersion)
    }
    if (res) {
      emitter.emit(Constants.CALLBACK_EMITTER + request.memoryKey, { data: { 'value': res } })
    }
  }
  static getHeaderObj(request:RequestJobRequest){
    let  headerObj: Record<string, Object> | undefined = {}
    if (request.headers != undefined && headerObj !== undefined) {
      request.headers.forEach((value) => {
        headerObj![value.key] = value.value
      })
    } else if (request.allHeaders.size > 0 && headerObj !== undefined) {
      request.allHeaders.forEach((value, key) => {
        headerObj![key] = value
      })
    } else {
      headerObj = undefined
    }
    return headerObj
  }

  // 获取图片资源
  static async getImageArrayBuffer(request: RequestJobRequest, requestList: List<ImageKnifeRequestWithSource> | undefined,fileKey:string) {
    let resBuf: ArrayBuffer | undefined
    let loadError: string = ''
    //定义图片各个阶段错误信息
    let error: ErrorInfo = { code: 0, phase: LoadPhase.PHASE_LOAD }
    //定义加载时间点
    let callBackTimeInfo: TimeInfo = {};
    //定义加载信息回调数据
    let callBackData: ImageKnifeData = {
      source: '',
      imageWidth: 0,
      imageHeight: 0,
      timeInfo: callBackTimeInfo,
      errorInfo: error
    };

    const loaderStrategy = ImageLoaderFactory.getLoaderStrategy(request);
    if (loaderStrategy) {
      await loaderStrategy.loadImage(request, requestList, fileKey, callBackData, callBackTimeInfo);
    } else {
      loadError = `Unsupported request type: ${request.src}`;
      callBackTimeInfo.requestEndTime = Date.now();
      ImageKnifeLoader.makeEmptyResult(request, loadError, callBackData);
    }
  }
  static isLocalLoadSrc(context: Object | undefined, loadSrc: string): boolean {
    if (context != undefined) {
      let fileDir: string = (context as common.UIAbilityContext).filesDir as string;
      let cacheDir: string = (context as common.UIAbilityContext).cacheDir as string
      if (loadSrc.startsWith(fileDir) || loadSrc.startsWith(cacheDir)) {
        return true;
      }
    }
    return false;
  }
  static getDownsamplerDecodingOptions(typeValue: string, request: RequestJobRequest, size: Size,
    SRC?: ImageKnifeRequestSource):image.Size {
    let reqSize =
      new Downsampler().calculateScaling(typeValue, size.width, size.height,
        request.targetWidth, request.targetHeight, request.downsampType)
    if (typeValue == 'svg') {
      return {
        height: reqSize.height,
        width: reqSize.width
      }
    } else {
      return {
        width: reqSize.width,
        height: reqSize.height
      }
    }
  }

  static getOrientation(orientation: string | undefined){
    let horizontal: boolean = false;
    let vertical: boolean = false;
    let rotate: number= 0;
    switch (orientation){
      case 'Top-left': break
      case 'Top-right':
        horizontal = true;
        break;
      case 'Bottom-left':
        vertical = true;
        break
      case 'Bottom-right':
        rotate = 180;
        break;
      case 'Left-top':
        horizontal = true;
        rotate = 270;
        break
      case 'Right-top':
        rotate = 90;
        break;
      case 'Left-bottom':
        rotate = 270;
        break
      case 'Right-bottom':
        horizontal = true;
        rotate = 90;
        break;
    }

    let data: FlipRotate = { horizontal: horizontal, vertical: vertical, rotate:rotate };
    return data
  }
}