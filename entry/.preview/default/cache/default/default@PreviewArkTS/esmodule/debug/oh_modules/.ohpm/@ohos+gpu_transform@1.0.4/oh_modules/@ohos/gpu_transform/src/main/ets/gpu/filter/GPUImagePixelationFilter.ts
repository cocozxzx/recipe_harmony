import { GPUImageFilter } from "@package:pkg_modules/.ohpm/@ohos+gpu_transform@1.0.4/pkg_modules/@ohos/gpu_transform/src/main/ets/gpu/filter/GPUImageFilter";
import { GPUFilterType } from "@package:pkg_modules/.ohpm/@ohos+gpu_transform@1.0.4/pkg_modules/@ohos/gpu_transform/src/main/ets/gpu/gl/GPUFilterType";
export class GPUImagePixelationFilter extends GPUImageFilter {
    private pixel: number = 1.0;
    constructor() {
        super();
    }
    getFilterType(): GPUFilterType {
        return GPUFilterType.PIXELATION;
    }
    onInitialized() {
    }
    onReadySize() {
    }
    setPixel(pixel: number) {
        this.pixel = pixel;
        this.setFloat("imageWidthFactor", 1.0 / this.width);
        this.setFloat("imageHeightFactor", 1.0 / this.height);
        this.setFloat("pixel", this.pixel);
    }
}
