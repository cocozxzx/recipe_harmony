import { GPUImageFilter } from "@package:pkg_modules/.ohpm/@ohos+gpu_transform@1.0.4/pkg_modules/@ohos/gpu_transform/src/main/ets/gpu/filter/GPUImageFilter";
import { GPUFilterType } from "@package:pkg_modules/.ohpm/@ohos+gpu_transform@1.0.4/pkg_modules/@ohos/gpu_transform/src/main/ets/gpu/gl/GPUFilterType";
export class GPUImageColorInvertFilter extends GPUImageFilter {
    constructor() {
        super();
    }
    getFilterType(): GPUFilterType {
        return GPUFilterType.INVERT;
    }
    onInitialized() {
    }
    onReadySize() {
    }
}
