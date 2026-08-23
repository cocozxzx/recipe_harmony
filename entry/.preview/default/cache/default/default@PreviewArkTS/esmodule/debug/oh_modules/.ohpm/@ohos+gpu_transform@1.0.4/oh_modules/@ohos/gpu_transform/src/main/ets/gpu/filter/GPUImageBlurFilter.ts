import { GPUImageFilter } from "@package:pkg_modules/.ohpm/@ohos+gpu_transform@1.0.4/pkg_modules/@ohos/gpu_transform/src/main/ets/gpu/filter/GPUImageFilter";
import { GPUFilterType } from "@package:pkg_modules/.ohpm/@ohos+gpu_transform@1.0.4/pkg_modules/@ohos/gpu_transform/src/main/ets/gpu/gl/GPUFilterType";
export class GPUImageBlurFilter extends GPUImageFilter {
    private blurRadius: number;
    private blurOffset: Array<number>;
    private sumWeight: number;
    constructor() {
        super();
    }
    getFilterType(): GPUFilterType {
        return GPUFilterType.BLUR;
    }
    onInitialized() {
    }
    onReadySize() {
    }
    setBlurRadius(blurRadius: number) {
        this.blurRadius = blurRadius;
        this.setInteger("blurRadius", this.blurRadius);
        this.calculateSumWeight();
    }
    setBlurOffset(blurOffset: Array<number>) {
        let offset = new Array<number>(2);
        if (this.width <= 0 || this.height <= 0) {
            throw new Error("the width or height must be greater than 0");
        }
        if (!blurOffset || blurOffset.length !== 2) {
            throw new Error("you should a valid value needs to be set.");
        }
        offset[0] = blurOffset[0] / this.width;
        offset[1] = blurOffset[1] / this.height;
        this.blurOffset = offset;
        this.setFloat2f("blurOffset", this.blurOffset);
    }
    setSumWeight(sumWeight: number) {
        this.sumWeight = sumWeight;
        this.setFloat("sumWeight", this.sumWeight);
    }
    private calculateSumWeight() {
        if (this.blurRadius < 1) {
            this.setSumWeight(0);
            return;
        }
        let sumWeight = 0;
        let sigma = this.blurRadius / 3.0;
        for (let i = 0; i < this.blurRadius; i++) {
            let weight = ((1.0 / Math.sqrt(2.0 * Math.PI * sigma * sigma)) * Math.exp(-(i * i) / (2.0 * sigma * sigma)));
            sumWeight += weight;
            if (i != 0) {
                sumWeight += weight;
            }
        }
        this.setSumWeight(sumWeight);
    }
}
