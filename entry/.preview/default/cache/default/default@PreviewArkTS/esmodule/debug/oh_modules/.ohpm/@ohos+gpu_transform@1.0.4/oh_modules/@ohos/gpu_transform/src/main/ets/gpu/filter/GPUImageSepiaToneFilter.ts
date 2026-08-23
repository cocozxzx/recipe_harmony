import { GPUImageColorMatrixFilter } from "@package:pkg_modules/.ohpm/@ohos+gpu_transform@1.0.4/pkg_modules/@ohos/gpu_transform/src/main/ets/gpu/filter/GPUImageColorMatrixFilter";
import { GPUFilterType } from "@package:pkg_modules/.ohpm/@ohos+gpu_transform@1.0.4/pkg_modules/@ohos/gpu_transform/src/main/ets/gpu/gl/GPUFilterType";
export class GPUImageSepiaToneFilter extends GPUImageColorMatrixFilter {
    constructor(intensity?: number) {
        super();
        this.setIntensity(intensity ? intensity : 1.0);
        this.setColorMatrix([
            0.3588, 0.7044, 0.1368, 0.0,
            0.2990, 0.5870, 0.1140, 0.0,
            0.2392, 0.4696, 0.0912, 0.0,
            0.0, 0.0, 0.0, 1.0
        ]);
    }
    getFilterType(): GPUFilterType {
        return GPUFilterType.SEPIA;
    }
    onReadySize() {
    }
}
