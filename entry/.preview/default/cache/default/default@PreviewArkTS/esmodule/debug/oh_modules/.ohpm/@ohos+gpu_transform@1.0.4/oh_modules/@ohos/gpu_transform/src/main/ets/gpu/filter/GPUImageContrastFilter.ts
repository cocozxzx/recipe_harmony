import { GPUImageFilter } from "@package:pkg_modules/.ohpm/@ohos+gpu_transform@1.0.4/pkg_modules/@ohos/gpu_transform/src/main/ets/gpu/filter/GPUImageFilter";
import { GPUFilterType } from "@package:pkg_modules/.ohpm/@ohos+gpu_transform@1.0.4/pkg_modules/@ohos/gpu_transform/src/main/ets/gpu/gl/GPUFilterType";
export class GPUImageContrastFilter extends GPUImageFilter {
    private contrast: number = 1.0;
    constructor(contrast?: number) {
        super();
        if (contrast) {
            this.contrast = contrast;
        }
    }
    getFilterType(): GPUFilterType {
        return GPUFilterType.CONTRAST;
    }
    onInitialized() {
    }
    onReadySize() {
    }
    setContrast(contrast: number) {
        this.contrast = contrast;
        this.setFloat("contrast", this.contrast);
    }
}
