import { GPUImageFilter } from "@package:pkg_modules/.ohpm/@ohos+gpu_transform@1.0.4/pkg_modules/@ohos/gpu_transform/src/main/ets/gpu/filter/GPUImageFilter";
import { GPUFilterType } from "@package:pkg_modules/.ohpm/@ohos+gpu_transform@1.0.4/pkg_modules/@ohos/gpu_transform/src/main/ets/gpu/gl/GPUFilterType";
export class GPUImage3x3TextureSamplingFilter extends GPUImageFilter {
    private texelWidth: number;
    private texelHeight: number;
    private lineSize: number = 1.0;
    constructor() {
        super();
    }
    getFilterType(): GPUFilterType {
        return GPUFilterType.X3TEXTURE;
    }
    onInitialized() {
    }
    onReadySize() {
    }
    setLineSize(lineSize: number) {
        this.lineSize = lineSize;
    }
    setTexelWidth(texelWidth: number) {
        this.texelWidth = this.lineSize / texelWidth;
        this.setFloat("texelWidth", this.texelWidth);
    }
    setTexelHeight(texelHeight: number) {
        this.texelHeight = this.lineSize / texelHeight;
        this.setFloat("texelHeight", this.texelHeight);
    }
}
