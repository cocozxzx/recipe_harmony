import type { ImageKnifeData, RequestJobRequest, TimeInfo, ImageKnifeRequestWithSource } from '../model/ImageKnifeData';
import fs from "@ohos:file.fs";
import type { IImageLoaderStrategy } from './IImageLoaderStrategy';
import type List from "@ohos:util.List";
import { ImageKnifeLoader } from "@package:pkg_modules/.ohpm/@ohos+imageknife@3.2.10/pkg_modules/@ohos/imageknife/src/main/ets/ImageKnifeLoader";
import { LoadPhase, LoadPixelMapCode } from "@package:pkg_modules/.ohpm/@ohos+imageknife@3.2.10/pkg_modules/@ohos/imageknife/src/main/ets/utils/Constants";
import type { BusinessError } from "@ohos:base";
import taskpool from "@ohos:taskpool";
export class FileSystemLoaderStrategy implements IImageLoaderStrategy {
    async loadImage(request: RequestJobRequest, requestList: List<ImageKnifeRequestWithSource> | undefined, fileKey: string, callBackData: ImageKnifeData, callBackTimeInfo: TimeInfo): Promise<void> {
        let resBuf: ArrayBuffer | undefined;
        let loadError: string = '';
        if (typeof request.src === 'string' &&
            (request.src.startsWith('datashare://') || request.src.startsWith('file://'))) {
            if (taskpool.Task.isCanceled()) {
                return;
            }
            ImageKnifeLoader.assembleError(callBackData, LoadPhase.PHASE_SHARE_FILE);
            await fs.open(request.src, fs.OpenMode.READ_ONLY).then(async (file) => {
                await fs.stat(file.fd).then(async (stat) => {
                    let buf = new ArrayBuffer(stat.size);
                    await fs.read(file.fd, buf).then((readLen) => {
                        resBuf = buf;
                        fs.closeSync(file.fd);
                    }).catch((err: BusinessError) => {
                        ImageKnifeLoader.assembleError(callBackData, LoadPhase.PHASE_SHARE_FILE, LoadPixelMapCode.IMAGE_LOAD_SHARE_FILE_FAILED_CODE);
                        loadError = 'LoadDataShareFileClient fs.read err happened uri=' + request.src + ' err.msg=' + err?.message +
                            ' err.code=' + err?.code;
                    });
                }).catch((err: BusinessError) => {
                    ImageKnifeLoader.assembleError(callBackData, LoadPhase.PHASE_SHARE_FILE, LoadPixelMapCode.IMAGE_LOAD_SHARE_FILE_FAILED_CODE);
                    loadError = 'LoadDataShareFileClient fs.stat err happened uri=' + request.src + ' err.msg=' + err?.message +
                        ' err.code=' + err?.code;
                });
            }).catch((err: BusinessError) => {
                ImageKnifeLoader.assembleError(callBackData, LoadPhase.PHASE_SHARE_FILE, LoadPixelMapCode.IMAGE_LOAD_SHARE_FILE_FAILED_CODE);
                loadError = 'LoadDataShareFileClient fs.open err happened uri=' + request.src + ' err.msg=' + err?.message +
                    ' err.code=' + err?.code;
            });
        }
        if (resBuf === undefined || resBuf === null) {
            callBackTimeInfo.requestEndTime = Date.now();
            ImageKnifeLoader.makeEmptyResult(request, loadError, callBackData);
        }
        else {
            ImageKnifeLoader.parseFile(resBuf, fileKey, request, callBackData);
        }
        return;
    }
}
