import { GPUImageFilter } from "@package:pkg_modules/.ohpm/@ohos+gpu_transform@1.0.4/pkg_modules/@ohos/gpu_transform/src/main/ets/gpu/filter/GPUImageFilter";
import ArrayList from "@ohos:util.ArrayList";
export abstract class GPUImageFilterGroup extends GPUImageFilter {
    private filters: ArrayList<GPUImageFilter>;
    constructor() {
        super();
        this.filters = new ArrayList();
    }
    addFilter(aFilter: GPUImageFilter) {
        this.filters.add(aFilter);
    }
    getFilters(): ArrayList<GPUImageFilter> {
        return this.filters;
    }
}
