import { GPUImageFilter } from "@package:pkg_modules/.ohpm/@ohos+gpu_transform@1.0.4/pkg_modules/@ohos/gpu_transform/src/main/ets/gpu/filter/GPUImageFilter";
import { GPUFilterType } from "@package:pkg_modules/.ohpm/@ohos+gpu_transform@1.0.4/pkg_modules/@ohos/gpu_transform/src/main/ets/gpu/gl/GPUFilterType";
export class GPUImageVignetterFilter extends GPUImageFilter {
    private vignetteCenter: Array<number> = [0.0, 0.0];
    private vignetteColor: Array<number> = [0.0, 0.0, 0.0];
    private vignetteStart: number;
    private vignetteEnd: number;
    constructor() {
        super();
    }
    getFilterType(): GPUFilterType {
        return GPUFilterType.VIGNETTE;
    }
    onInitialized() {
    }
    onReadySize() {
    }
    setVignetteCenter(center: Array<number>) {
        this.vignetteCenter = center;
        this.setFloatVec2("vignetteCenter", center);
    }
    setVignetteColor(colors: Array<number>) {
        this.vignetteColor = colors;
        this.setFloatVec3("vignetteColor", colors);
    }
    setVignetteStart(start: number) {
        this.vignetteStart = start;
        this.setFloat("vignetteStart", this.vignetteStart);
    }
    setVignetteEnd(end: number) {
        this.vignetteEnd = end;
        this.setFloat("vignetteEnd", this.vignetteEnd);
    }
}
