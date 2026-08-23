if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
export class DifficultyStars extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.initParam("value", (params && "value" in params) ? params.value : 0);
        this.initParam("total", (params && "total" in params) ? params.total : 5);
        this.initParam("starSize", (params && "starSize" in params) ? params.starSize : { "id": 16777435, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
        this.resetParam("value", (params && "value" in params) ? params.value : 0);
        this.resetParam("total", (params && "total" in params) ? params.total : 5);
        this.resetParam("starSize", (params && "starSize" in params) ? params.starSize : { "id": 16777435, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
    }
    @Param
    readonly value: number; // 1-5
    @Param
    readonly total: number;
    @Param
    readonly starSize: Length;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 2 });
            Row.debugLine("entry/src/main/ets/commons/uikit/DifficultyStars.ets(12:5)", "entry");
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const index = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Image.create(index < this.value ? { "id": 16777251, "type": 20000, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" } : { "id": 16777262, "type": 20000, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                    Image.debugLine("entry/src/main/ets/commons/uikit/DifficultyStars.ets(14:9)", "entry");
                    Image.width(this.starSize);
                    Image.height(this.starSize);
                    Image.fillColor(index < this.value ? { "id": 16777228, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" } : { "id": 16777244, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                }, Image);
            };
            this.forEachUpdateFunction(elmtId, this.indexes(), forEachItemGenFunction, (index: number) => index.toString(), false, false);
        }, ForEach);
        ForEach.pop();
        Row.pop();
    }
    private indexes(): number[] {
        const list: number[] = [];
        for (let i = 0; i < this.total; i++) {
            list.push(i);
        }
        return list;
    }
    public updateStateVars(params) {
        if (params === undefined) {
            return;
        }
        if ("value" in params) {
            this.updateParam("value", params.value);
        }
        if ("total" in params) {
            this.updateParam("total", params.total);
        }
        if ("starSize" in params) {
            this.updateParam("starSize", params.starSize);
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
}
