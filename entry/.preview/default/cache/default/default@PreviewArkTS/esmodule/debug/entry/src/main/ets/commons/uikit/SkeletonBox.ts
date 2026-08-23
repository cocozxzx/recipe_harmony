if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
import { Motion } from "@bundle:com.eatapp.recipe/entry/ets/commons/uikit/Theme";
export class SkeletonBox extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.initParam("boxWidth", (params && "boxWidth" in params) ? params.boxWidth : '100%');
        this.initParam("boxHeight", (params && "boxHeight" in params) ? params.boxHeight : 16);
        this.initParam("radius", (params && "radius" in params) ? params.radius : { "id": 16777438, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
        this.shine = 0;
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
        this.resetParam("boxWidth", (params && "boxWidth" in params) ? params.boxWidth : '100%');
        this.resetParam("boxHeight", (params && "boxHeight" in params) ? params.boxHeight : 16);
        this.resetParam("radius", (params && "radius" in params) ? params.radius : { "id": 16777438, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
        this.shine = 0;
    }
    @Param
    readonly boxWidth: Length;
    @Param
    readonly boxHeight: Length;
    @Param
    readonly radius: Length;
    @Local
    shine: number;
    aboutToAppear(): void {
        this.startShine();
    }
    private startShine(): void {
        Context.animateTo({
            duration: Motion.skeletonDuration,
            curve: Curve.EaseInOut,
            iterations: -1,
            playMode: PlayMode.Alternate
        }, () => {
            this.shine = 1;
        });
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/commons/uikit/SkeletonBox.ets(30:5)", "entry");
            Row.width(this.boxWidth);
            Row.height(this.boxHeight);
            Row.borderRadius(this.radius);
            Row.backgroundColor({ "id": 16777240, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Row.opacity(0.5 + this.shine * 0.5);
        }, Row);
        Row.pop();
    }
    public updateStateVars(params) {
        if (params === undefined) {
            return;
        }
        if ("boxWidth" in params) {
            this.updateParam("boxWidth", params.boxWidth);
        }
        if ("boxHeight" in params) {
            this.updateParam("boxHeight", params.boxHeight);
        }
        if ("radius" in params) {
            this.updateParam("radius", params.radius);
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
}
