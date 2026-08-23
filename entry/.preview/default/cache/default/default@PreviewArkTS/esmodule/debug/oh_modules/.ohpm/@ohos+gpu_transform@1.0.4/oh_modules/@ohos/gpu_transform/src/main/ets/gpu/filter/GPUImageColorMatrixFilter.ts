import { GPUImageFilter } from "@package:pkg_modules/.ohpm/@ohos+gpu_transform@1.0.4/pkg_modules/@ohos/gpu_transform/src/main/ets/gpu/filter/GPUImageFilter";
import { GPUFilterType } from "@package:pkg_modules/.ohpm/@ohos+gpu_transform@1.0.4/pkg_modules/@ohos/gpu_transform/src/main/ets/gpu/gl/GPUFilterType";
export class GPUImageColorMatrixFilter extends GPUImageFilter {
    private intensity: number = 1.0;
    private colorMatrix: Array<number> = [
        1.0, 0.0, 0.0, 0.0,
        0.0, 1.0, 0.0, 0.0,
        0.0, 0.0, 1.0, 0.0,
        0.0, 0.0, 0.0, 1.0
    ];
    constructor(intensity?: number) {
        super();
        if (intensity) {
            this.intensity = intensity;
        }
    }
    getFilterType(): GPUFilterType {
        return GPUFilterType.CONTRAST;
    }
    onInitialized() {
    }
    onReadySize() {
    }
    setIntensity(intensity: number) {
        this.intensity = intensity;
        this.setFloat("intensity", this.intensity);
    }
    setColorMatrix(colorMatrix: Array<number>) {
        this.colorMatrix = colorMatrix;
        this.setUniformMatrix4f("colorMatrix", this.colorMatrix);
    }
}
