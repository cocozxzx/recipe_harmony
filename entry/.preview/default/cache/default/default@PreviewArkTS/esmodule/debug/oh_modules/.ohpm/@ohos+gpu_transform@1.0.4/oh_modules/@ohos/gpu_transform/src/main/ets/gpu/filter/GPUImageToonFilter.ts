import { GPUImage3x3TextureSamplingFilter } from "@package:pkg_modules/.ohpm/@ohos+gpu_transform@1.0.4/pkg_modules/@ohos/gpu_transform/src/main/ets/gpu/filter/GPUImage3x3TextureSamplingFilter";
import { GPUFilterType } from "@package:pkg_modules/.ohpm/@ohos+gpu_transform@1.0.4/pkg_modules/@ohos/gpu_transform/src/main/ets/gpu/gl/GPUFilterType";
export class GPUImageToonFilter extends GPUImage3x3TextureSamplingFilter {
    private threshold: number = 0.2;
    private quantizationLevels: number = 10.0;
    constructor() {
        super();
    }
    getFilterType(): GPUFilterType {
        return GPUFilterType.TOON;
    }
    onInitialized() {
    }
    onReadySize() {
        this.setTexelWidth(this.width);
        this.setTexelHeight(this.height);
    }
    setThreshold(threshold: number) {
        this.threshold = threshold;
        this.setFloat("threshold", threshold);
    }
    setQuantizationLevels(quantizationLevels: number) {
        this.quantizationLevels = quantizationLevels;
        this.setFloat("quantizationLevels", quantizationLevels);
    }
}
