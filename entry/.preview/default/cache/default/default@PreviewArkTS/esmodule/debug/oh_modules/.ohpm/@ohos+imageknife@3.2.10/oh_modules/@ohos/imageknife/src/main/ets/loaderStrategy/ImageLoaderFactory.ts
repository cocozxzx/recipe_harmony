import { CustomLoaderStrategy } from "@package:pkg_modules/.ohpm/@ohos+imageknife@3.2.10/pkg_modules/@ohos/imageknife/src/main/ets/loaderStrategy/CustomLoaderStrategy";
import { FileSystemLoaderStrategy } from "@package:pkg_modules/.ohpm/@ohos+imageknife@3.2.10/pkg_modules/@ohos/imageknife/src/main/ets/loaderStrategy/FileSystemLoaderStrategy";
import { HttpLoaderStrategy } from "@package:pkg_modules/.ohpm/@ohos+imageknife@3.2.10/pkg_modules/@ohos/imageknife/src/main/ets/loaderStrategy/HttpLoaderStrategy";
import type { IImageLoaderStrategy } from './IImageLoaderStrategy';
import { ImageKnifeRequestSource } from "@package:pkg_modules/.ohpm/@ohos+imageknife@3.2.10/pkg_modules/@ohos/imageknife/src/main/ets/model/ImageKnifeData";
import type { RequestJobRequest } from "@package:pkg_modules/.ohpm/@ohos+imageknife@3.2.10/pkg_modules/@ohos/imageknife/src/main/ets/model/ImageKnifeData";
import { ResourceLoaderStrategy } from "@package:pkg_modules/.ohpm/@ohos+imageknife@3.2.10/pkg_modules/@ohos/imageknife/src/main/ets/loaderStrategy/ResourceLoaderStrategy";
import { FileLocalLoadStrategy } from "@package:pkg_modules/.ohpm/@ohos+imageknife@3.2.10/pkg_modules/@ohos/imageknife/src/main/ets/loaderStrategy/FileLocalLoadStrategy";
import { ImageKnifeLoader } from "@package:pkg_modules/.ohpm/@ohos+imageknife@3.2.10/pkg_modules/@ohos/imageknife/src/main/ets/ImageKnifeLoader";
export class ImageLoaderFactory {
    static getLoaderStrategy(request: RequestJobRequest): IImageLoaderStrategy | null {
        if (request.customGetImage !== undefined &&
            request.requestSource === ImageKnifeRequestSource.SRC) {
            return new CustomLoaderStrategy();
        }
        if (typeof request.src === 'string') {
            if (request.src.startsWith('datashare://') || request.src.startsWith('file://')) {
                return new FileSystemLoaderStrategy();
            }
            else if (ImageKnifeLoader.isLocalLoadSrc(request.context, request.src)) {
                return new FileLocalLoadStrategy();
            }
            else if (request.src.startsWith('http://') || request.src.startsWith('https://')) {
                return new HttpLoaderStrategy();
            }
            else {
                return null;
            }
        }
        else if (typeof request.src === 'number') {
            return new ResourceLoaderStrategy();
        }
        return null;
    }
}
