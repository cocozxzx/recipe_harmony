import { GPUImageFilter } from "@package:pkg_modules/.ohpm/@ohos+gpu_transform@1.0.4/pkg_modules/@ohos/gpu_transform/src/main/ets/gpu/filter/GPUImageFilter";
import { GPUFilterType } from "@package:pkg_modules/.ohpm/@ohos+gpu_transform@1.0.4/pkg_modules/@ohos/gpu_transform/src/main/ets/gpu/gl/GPUFilterType";
export class GPUImageSwirlFilter extends GPUImageFilter {
    private _radius: number = 25;
    private _angle: number = 0.9;
    private _xCenter: number = 0.5;
    private _yCenter: number = 0.5;
    constructor() {
        super();
    }
    getFilterType(): GPUFilterType {
        return GPUFilterType.SWIRL;
    }
    onInitialized() {
    }
    onReadySize() {
    }
    setRadius(radius: number) {
        this._radius = radius;
        this.setFloat("radius", this._radius);
    }
    setAngle(angle: number) {
        this._angle = angle;
        this.setFloat("angle", this._angle);
    }
    setCenter(x_center: number, y_center: number) {
        this._xCenter = x_center;
        this._yCenter = y_center;
        this.setPoint("center", x_center, y_center);
    }
}
