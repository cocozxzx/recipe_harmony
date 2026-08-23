import type { IImageLoaderStrategy } from './IImageLoaderStrategy';
import { ImageKnifeRequestSource } from "@package:pkg_modules/.ohpm/@ohos+imageknife@3.2.10/pkg_modules/@ohos/imageknife/src/main/ets/model/ImageKnifeData";
import type { ImageKnifeData, ImageKnifeRequestWithSource, RequestJobRequest, TimeInfo } from "@package:pkg_modules/.ohpm/@ohos+imageknife@3.2.10/pkg_modules/@ohos/imageknife/src/main/ets/model/ImageKnifeData";
import type List from "@ohos:util.List";
import application from "@ohos:app.ability.application";
import { ImageKnifeLoader } from "@package:pkg_modules/.ohpm/@ohos+imageknife@3.2.10/pkg_modules/@ohos/imageknife/src/main/ets/ImageKnifeLoader";
import taskpool from "@ohos:taskpool";
import { LogUtil } from "@package:pkg_modules/.ohpm/@ohos+imageknife@3.2.10/pkg_modules/@ohos/imageknife/src/main/ets/utils/LogUtil";
export class ResourceLoaderStrategy implements IImageLoaderStrategy {
    async loadImage(request: RequestJobRequest, requestList: List<ImageKnifeRequestWithSource> | undefined, fileKey: string, callBackData: ImageKnifeData, callBackTimeInfo: TimeInfo): Promise<void> {
        let resBuf: ArrayBuffer | undefined;
        let loadError: string = '';
        if (taskpool.Task.isCanceled()) {
            return;
        }
        if (typeof request.src === 'number') {
            try {
                const moduleContext = await application.createModuleContext(request.context, request.moduleName);
                const manager = moduleContext.resourceManager;
                if ((resBuf == undefined && request.onlyRetrieveFromCache !== true &&
                    request.requestSource === ImageKnifeRequestSource.SRC) ||
                    (resBuf == undefined && request.requestSource !== ImageKnifeRequestSource.SRC)) {
                    if (request.src === -1) {
                        const resName = request.resName as string;
                        resBuf =
                            (await manager.getMediaByName(resName.substring(resName.lastIndexOf('.') + 1))).buffer as ArrayBuffer;
                    }
                    else {
                        resBuf = request.resName ?
                            manager.getRawFileContentSync(request.resName).buffer.slice(0) :
                            (manager.getMediaContentSync(request.src)).buffer as ArrayBuffer;
                    }
                }
            }
            catch (err) {
                LogUtil.error(`ResourceLoaderStrategy; loadImage error: ${err}`);
            }
        }
        if (resBuf === undefined || resBuf === null) {
            callBackTimeInfo.requestEndTime = Date.now();
            loadError = 'Resource load error';
            ImageKnifeLoader.makeEmptyResult(request, loadError, callBackData);
        }
        else {
            ImageKnifeLoader.parseFile(resBuf, fileKey, request, callBackData);
        }
        return;
    }
}
