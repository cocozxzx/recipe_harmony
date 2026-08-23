import type { RequestJobRequest, ImageKnifeRequestWithSource, ImageKnifeData, TimeInfo } from '../model/ImageKnifeData';
import type { IImageLoaderStrategy } from './IImageLoaderStrategy';
import type List from "@ohos:util.List";
import { ImageKnifeLoader } from "@package:pkg_modules/.ohpm/@ohos+imageknife@3.2.10/pkg_modules/@ohos/imageknife/src/main/ets/ImageKnifeLoader";
import { LoadPhase, LoadPixelMapCode } from "@package:pkg_modules/.ohpm/@ohos+imageknife@3.2.10/pkg_modules/@ohos/imageknife/src/main/ets/utils/Constants";
import fs from "@ohos:file.fs";
export class FileLocalLoadStrategy implements IImageLoaderStrategy {
    loadImage(request: RequestJobRequest, requestList: List<ImageKnifeRequestWithSource> | undefined, fileKey: string, callBackData: ImageKnifeData, callBackTimeInfo: TimeInfo): Promise<void> {
        let resBuf: ArrayBuffer | undefined;
        let loadError: string = '';
        if (typeof request.src === 'string' && ImageKnifeLoader.isLocalLoadSrc(request.context, request.src)) {
            ImageKnifeLoader.assembleError(callBackData, LoadPhase.PHASE_LOCAL_FILE);
            try {
                const stat = fs.statSync(request.src);
                if (stat.size > 0) {
                    const file = fs.openSync(request.src, fs.OpenMode.READ_ONLY);
                    resBuf = new ArrayBuffer(stat.size);
                    fs.readSync(file.fd, resBuf);
                    fs.closeSync(file);
                }
            }
            catch (err) {
                ImageKnifeLoader.assembleError(callBackData, LoadPhase.PHASE_LOCAL_FILE, LoadPixelMapCode.IMAGE_LOAD_LOCAL_FILE_FAILED_CODE);
                loadError = `LocalLoadSrc: ${request.src}, err: ${err}`;
                ImageKnifeLoader.makeEmptyResult(request, loadError, ImageKnifeLoader.assembleError(callBackData, LoadPhase.PHASE_LOCAL_FILE, LoadPixelMapCode.IMAGE_LOAD_LOCAL_FILE_FAILED_CODE));
            }
        }
        else {
            loadError = `Parameter not supported: ${request.src}`;
            ImageKnifeLoader.makeEmptyResult(request, loadError, callBackData);
        }
        if (resBuf === undefined || resBuf === null) {
            callBackTimeInfo.requestEndTime = Date.now();
            ImageKnifeLoader.makeEmptyResult(request, loadError, callBackData);
        }
        else {
            ImageKnifeLoader.parseFile(resBuf, fileKey, request, callBackData);
        }
        return Promise.resolve();
    }
}
