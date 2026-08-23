import { FileCache } from "@package:pkg_modules/.ohpm/@ohos+imageknife@3.2.10/pkg_modules/@ohos/imageknife/src/main/ets/cache/FileCache";
import type { IImageLoaderStrategy } from './IImageLoaderStrategy';
import { ImageKnifeLoader } from "@package:pkg_modules/.ohpm/@ohos+imageknife@3.2.10/pkg_modules/@ohos/imageknife/src/main/ets/ImageKnifeLoader";
import type { ImageKnifeData, ImageKnifeRequestWithSource, RequestJobRequest, TimeInfo } from '../model/ImageKnifeData';
import { LoadPhase } from "@package:pkg_modules/.ohpm/@ohos+imageknife@3.2.10/pkg_modules/@ohos/imageknife/src/main/ets/utils/Constants";
import { LogUtil } from "@package:pkg_modules/.ohpm/@ohos+imageknife@3.2.10/pkg_modules/@ohos/imageknife/src/main/ets/utils/LogUtil";
import type List from "@ohos:util.List";
import taskpool from "@ohos:taskpool";
import { ImageLoaderFactory } from "@package:pkg_modules/.ohpm/@ohos+imageknife@3.2.10/pkg_modules/@ohos/imageknife/src/main/ets/loaderStrategy/ImageLoaderFactory";
// 自定义加载策略
export class CustomLoaderStrategy implements IImageLoaderStrategy {
    async loadImage(request: RequestJobRequest, requestList: List<ImageKnifeRequestWithSource> | undefined, fileKey: string, callBackData: ImageKnifeData, callBackTimeInfo: TimeInfo): Promise<void> {
        let resBuf: ArrayBuffer | undefined;
        let loadError: string = '';
        // 从文件缓存获取
        ImageKnifeLoader.assembleError(callBackData, LoadPhase.PHASE_CUSTOM_LOAD);
        callBackTimeInfo.diskCheckStartTime = Date.now();
        resBuf = FileCache.getFileCacheByFile(request.context, fileKey, request.fileCacheFolder);
        callBackTimeInfo.diskCheckEndTime = Date.now();
        if (resBuf !== undefined) {
            ImageKnifeLoader.parseFile(resBuf, fileKey, request, callBackData);
        }
        else if (!request.onlyRetrieveFromCache) {
            LogUtil.log('start customGetImage src=' + request.componentId + ',srcType:' + request.requestSource + ',' +
                request.componentVersion);
            if (taskpool.Task.isCanceled()) {
                return;
            }
            const headerObj = ImageKnifeLoader.getHeaderObj(request);
            try {
                request.customGetImage!(request.context, request.src as string, headerObj, {
                    caPath: request.caPath,
                    connectTimeout: request.connectTimeout,
                    readTimeout: request.readTimeout,
                    dnsOverHttps: request.dnsOverHttps,
                    dnsServers: request.dnsServers
                })
                    .then((buffer) => {
                    if (buffer !== undefined && buffer !== null) {
                        ImageKnifeLoader.parseFile(buffer, fileKey, request, callBackData, true, headerObj);
                    }
                    else {
                        loadError = 'customGetImage loadFail undefined';
                        request.customGetImage = undefined;
                        const loaderStrategy = ImageLoaderFactory.getLoaderStrategy(request);
                        if (loaderStrategy) {
                            loaderStrategy.loadImage(request, requestList, fileKey, callBackData, callBackTimeInfo);
                        }
                        else {
                            loadError += `Unsupported request type: ${request.src}`;
                            callBackTimeInfo.requestEndTime = Date.now();
                            ImageKnifeLoader.makeEmptyResult(request, loadError, callBackData);
                        }
                    }
                }).catch((err: string) => {
                    loadError = 'customGetImage loadFail err ';
                    request.customGetImage = undefined;
                    const loaderStrategy = ImageLoaderFactory.getLoaderStrategy(request);
                    if (loaderStrategy) {
                        loaderStrategy.loadImage(request, requestList, fileKey, callBackData, callBackTimeInfo);
                    }
                    else {
                        loadError += `Unsupported request type: ${request.src}`;
                        callBackTimeInfo.requestEndTime = Date.now();
                        ImageKnifeLoader.makeEmptyResult(request, loadError, callBackData);
                    }
                });
            }
            catch (e) {
                loadError = 'customGetImage loadFail failed ';
                request.customGetImage = undefined;
                const loaderStrategy = ImageLoaderFactory.getLoaderStrategy(request);
                if (loaderStrategy) {
                    loaderStrategy.loadImage(request, requestList, fileKey, callBackData, callBackTimeInfo);
                }
                else {
                    loadError += `Unsupported request type: ${request.src}`;
                    callBackTimeInfo.requestEndTime = Date.now();
                    ImageKnifeLoader.makeEmptyResult(request, loadError, callBackData);
                }
            }
            LogUtil.log('end customGetImage src=' + request.componentId + ',srcType:' +
                request.requestSource + ',' + request.componentVersion);
            return;
        }
        else {
            loadError = `onlyRetrieveFromCache, do not fetch image src = ${request.src}`;
            ImageKnifeLoader.makeEmptyResult(request, loadError, callBackData);
        }
        return;
    }
}
