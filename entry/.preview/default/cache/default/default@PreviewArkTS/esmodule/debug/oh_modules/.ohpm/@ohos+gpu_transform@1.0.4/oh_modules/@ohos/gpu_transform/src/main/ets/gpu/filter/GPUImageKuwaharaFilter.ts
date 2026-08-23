import { GPUImageFilter } from "@package:pkg_modules/.ohpm/@ohos+gpu_transform@1.0.4/pkg_modules/@ohos/gpu_transform/src/main/ets/gpu/filter/GPUImageFilter";
import { GPUFilterType } from "@package:pkg_modules/.ohpm/@ohos+gpu_transform@1.0.4/pkg_modules/@ohos/gpu_transform/src/main/ets/gpu/gl/GPUFilterType";
export class GPUImageKuwaharaFilter extends GPUImageFilter {
    private _radius: number = 25;
    constructor(radius?: number) {
        super();
        if (radius) {
            this._radius = radius;
        }
    }
    getFilterType(): GPUFilterType {
        return GPUFilterType.KUWAHARA;
    }
    onInitialized() {
    }
    onReadySize() {
    }
    setRadius(radius: number) {
        this._radius = radius;
        this.setFloat("radius", this._radius);
    }
}
