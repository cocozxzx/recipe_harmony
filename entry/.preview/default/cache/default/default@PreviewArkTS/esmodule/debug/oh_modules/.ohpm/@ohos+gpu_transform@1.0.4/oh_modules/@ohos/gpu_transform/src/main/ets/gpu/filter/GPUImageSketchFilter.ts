import { GPUImage3x3TextureSamplingFilter } from "@package:pkg_modules/.ohpm/@ohos+gpu_transform@1.0.4/pkg_modules/@ohos/gpu_transform/src/main/ets/gpu/filter/GPUImage3x3TextureSamplingFilter";
import { GPUFilterType } from "@package:pkg_modules/.ohpm/@ohos+gpu_transform@1.0.4/pkg_modules/@ohos/gpu_transform/src/main/ets/gpu/gl/GPUFilterType";
export class GPUImageSketchFilter extends GPUImage3x3TextureSamplingFilter {
    constructor() {
        super();
    }
    getFilterType(): GPUFilterType {
        return GPUFilterType.SKETCH;
    }
    onInitialized() {
    }
    onReadySize() {
        this.setTexelWidth(this.width);
        this.setTexelHeight(this.height);
    }
}
