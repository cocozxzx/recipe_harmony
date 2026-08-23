import { GPUImageFilter } from "@package:pkg_modules/.ohpm/@ohos+gpu_transform@1.0.4/pkg_modules/@ohos/gpu_transform/src/main/ets/gpu/filter/GPUImageFilter";
import { GPUFilterType } from "@package:pkg_modules/.ohpm/@ohos+gpu_transform@1.0.4/pkg_modules/@ohos/gpu_transform/src/main/ets/gpu/gl/GPUFilterType";
export class GPUImageBrightnessFilter extends GPUImageFilter {
    private brightness: number = 25;
    constructor(brightness?: number) {
        super();
        if (brightness) {
            this.brightness = brightness;
        }
    }
    getFilterType(): GPUFilterType {
        return GPUFilterType.BRIGHT;
    }
    onInitialized() {
    }
    onReadySize() {
    }
    setBrightness(brightness: number) {
        this.brightness = brightness;
        this.setFloat("brightness", this.brightness);
    }
}
