import { FileCache } from "@package:pkg_modules/.ohpm/@ohos+imageknife@3.2.10/pkg_modules/@ohos/imageknife/src/main/ets/cache/FileCache";
import type { IImageLoaderStrategy } from './IImageLoaderStrategy';
import { ImageKnifeRequestSource } from "@package:pkg_modules/.ohpm/@ohos+imageknife@3.2.10/pkg_modules/@ohos/imageknife/src/main/ets/model/ImageKnifeData";
import type { ImageKnifeData, ImageKnifeRequestWithSource, RequestJobRequest, TimeInfo } from "@package:pkg_modules/.ohpm/@ohos+imageknife@3.2.10/pkg_modules/@ohos/imageknife/src/main/ets/model/ImageKnifeData";
import http from "@ohos:net.http";
import { ImageKnifeLoader } from "@package:pkg_modules/.ohpm/@ohos+imageknife@3.2.10/pkg_modules/@ohos/imageknife/src/main/ets/ImageKnifeLoader";
import { combineArrayBuffers } from "@package:pkg_modules/.ohpm/@ohos+imageknife@3.2.10/pkg_modules/@ohos/imageknife/src/main/ets/utils/ArrayBufferUtils";
import type { BusinessError } from "@ohos:base";
import emitter from "@ohos:events.emitter";
import { Constants, LoadPhase, LoadPixelMapCode } from "@package:pkg_modules/.ohpm/@ohos+imageknife@3.2.10/pkg_modules/@ohos/imageknife/src/main/ets/utils/Constants";
import { LogUtil } from "@package:pkg_modules/.ohpm/@ohos+imageknife@3.2.10/pkg_modules/@ohos/imageknife/src/main/ets/utils/LogUtil";
import type List from "@ohos:util.List";
import taskpool from "@ohos:taskpool";
import hiTraceMeter from "@ohos:hiTraceMeter";
class RequestData {
    public receiveSize: number = 2000;
    public totalSize: number = 2000;
}
// HTTP加载策略
export class HttpLoaderStrategy implements IImageLoaderStrategy {
    async loadImage(request: RequestJobRequest, requestList: List<ImageKnifeRequestWithSource> | undefined, fileKey: string, callBackData: ImageKnifeData, callBackTimeInfo: TimeInfo): Promise<void> {
        let resBuf: ArrayBuffer | undefined;
        let loadError: string = '';
        // 从文件缓存获取
        ImageKnifeLoader.assembleError(callBackData, LoadPhase.PHASE_NET);
        callBackTimeInfo.diskCheckStartTime = Date.now();
        hiTraceMeter.startTrace('getFileCache', request.componentId);
        resBuf = FileCache.getFileCacheByFile(request.context, fileKey, request.fileCacheFolder);
        hiTraceMeter.finishTrace('getFileCache', request.componentId);
        callBackTimeInfo.diskCheckEndTime = Date.now();
        if (resBuf !== undefined) {
            LogUtil.log(`success get image from filecache for key = ${fileKey} src = ${request.componentId},
        srcType:${request.requestSource}, ${request.componentVersion}`);
            ImageKnifeLoader.parseFile(resBuf, fileKey, request, callBackData);
        }
        else if (request.onlyRetrieveFromCache !== true) {
            LogUtil.log(`HttpDownloadClient.start: ${request.componentId}, srcType:${request.requestSource},
        ${request.componentVersion}`);
            callBackTimeInfo.netRequestStartTime = Date.now();
            if (taskpool.Task.isCanceled()) {
                return;
            }
            const httpRequest = http.createHttp();
            emitter.once((request.src as string) + request.componentId, () => {
                httpRequest.destroy();
            });
            let progress: number = 0;
            let arrayBuffers: ArrayBuffer[] = [];
            const headerObj = ImageKnifeLoader.getHeaderObj(request);
            httpRequest.on('dataReceive', (data: ArrayBuffer) => {
                arrayBuffers.push(data);
            });
            if (request.isWatchProgress) {
                httpRequest.on('dataReceiveProgress', (data: RequestData) => {
                    if (data != undefined && typeof data.receiveSize === 'number' && typeof data.totalSize === 'number') {
                        const percent = Math.round(((data.receiveSize * 1.0) / (data.totalSize * 1.0)) * 100);
                        if (progress !== percent) {
                            progress = percent;
                            if (requestList === undefined) {
                                // 子线程
                                emitter.emit(Constants.PROGRESS_EMITTER + request.memoryKey, { data: { 'value': progress } });
                            }
                            else {
                                // 主线程请求
                                requestList.forEach((requestWithSource: ImageKnifeRequestWithSource) => {
                                    if (requestWithSource.request.imageKnifeOption.progressListener !== undefined &&
                                        requestWithSource.source === ImageKnifeRequestSource.SRC) {
                                        requestWithSource.request.imageKnifeOption.progressListener(progress);
                                    }
                                });
                            }
                        }
                    }
                });
            }
            hiTraceMeter.startTrace('loadHttp', request.componentId);
            let promise = httpRequest.requestInStream(request.src as string, {
                header: headerObj,
                method: http.RequestMethod.GET,
                expectDataType: http.HttpDataType.ARRAY_BUFFER,
                connectTimeout: request.connectTimeout ?? 60000,
                readTimeout: request.readTimeout ?? 30000,
                caPath: request.caPath,
                dnsOverHttps: request.dnsOverHttps,
                dnsServers: request.dnsServers,
                remoteValidation: request.remoteValidation
            });
            promise.then((data: number) => {
                emitter.off((request.src as string) + request.componentId);
                httpRequest.destroy();
                httpRequest.off('dataReceive');
                httpRequest.off('dataReceiveProgress');
                callBackData.httpCode = data;
                ImageKnifeLoader.assembleError(callBackData, LoadPhase.PHASE_NET, undefined);
                callBackTimeInfo.netRequestEndTime = Date.now();
                if (data == 200 || data == 206 || data == 204) {
                    hiTraceMeter.finishTrace('loadHttp', request.componentId);
                    resBuf = combineArrayBuffers(arrayBuffers);
                    arrayBuffers = [];
                    ImageKnifeLoader.parseFile(resBuf, fileKey, request, callBackData, true, headerObj);
                }
                else {
                    arrayBuffers = [];
                    loadError = 'HttpDownloadClient has error, http code =' + JSON.stringify(data);
                    ImageKnifeLoader.makeEmptyResult(request, loadError, ImageKnifeLoader.assembleError(callBackData, LoadPhase.PHASE_NET, LoadPixelMapCode.IMAGE_HTTPS_LOAD_FAILED_CODE));
                }
            }).catch((err: BusinessError) => {
                emitter.off((request.src as string) + request.componentId);
                httpRequest.destroy();
                httpRequest.off('dataReceive');
                httpRequest.off('dataReceiveProgress');
                arrayBuffers = [];
                callBackData.httpCode = err.code;
                loadError = 'HttpDownloadClient download ERROR : err = ' + JSON.stringify(err);
                callBackTimeInfo.netRequestEndTime = Date.now();
                ImageKnifeLoader.makeEmptyResult(request, loadError, ImageKnifeLoader.assembleError(callBackData, LoadPhase.PHASE_NET, LoadPixelMapCode.IMAGE_HTTPS_LOAD_FAILED_CODE));
            });
            LogUtil.log('HttpDownloadClient.end:' + request.componentId + ',srcType:' +
                request.requestSource + ',' + request.componentVersion);
            return;
        }
        else {
            callBackTimeInfo.netRequestEndTime = Date.now();
            loadError = `onlyRetrieveFromCache, do not fetch image src = ${request.src}`;
            ImageKnifeLoader.makeEmptyResult(request, loadError, callBackData);
            return;
        }
    }
}
