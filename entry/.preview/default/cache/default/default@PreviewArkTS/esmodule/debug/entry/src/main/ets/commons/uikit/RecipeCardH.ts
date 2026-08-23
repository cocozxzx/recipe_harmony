if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
import type { RecipeListItem } from '../model/Recipe';
import { DifficultyStars } from "@bundle:com.eatapp.recipe/entry/ets/commons/uikit/DifficultyStars";
import { NetImage } from "@bundle:com.eatapp.recipe/entry/ets/commons/uikit/NetImage";
export class RecipeCardH extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.initParam("item", (params && "item" in params) ? params.item : {} as RecipeListItem);
        this.onTap = "onTap" in params ? params.onTap : () => { };
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
        this.resetParam("item", (params && "item" in params) ? params.item : {} as RecipeListItem);
        this.onTap = "onTap" in params ? params.onTap : () => { };
    }
    @Param
    readonly item: RecipeListItem;
    @Event
    onTap: (item: RecipeListItem) => void;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 8 });
            Column.debugLine("entry/src/main/ets/commons/uikit/RecipeCardH.ets(15:5)", "entry");
            Column.alignItems(HorizontalAlign.Start);
            Column.width({ "id": 16777423, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Column.onClick(() => this.onTap(this.item));
        }, Column);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new NetImage(this, {
                        url: this.item.coverImage,
                        imgWidth: '100%',
                        imgHeight: 104,
                        radius: { "id": 16777437, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/commons/uikit/RecipeCardH.ets", line: 16, col: 7 });
                    ViewV2.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            url: this.item.coverImage,
                            imgWidth: '100%',
                            imgHeight: 104,
                            radius: { "id": 16777437, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        url: this.item.coverImage,
                        imgWidth: '100%',
                        imgHeight: 104,
                        radius: { "id": 16777437, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }
                    });
                }
            }, { name: "NetImage" });
        }
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.item.name);
            Text.debugLine("entry/src/main/ets/commons/uikit/RecipeCardH.ets(22:7)", "entry");
            Text.fontSize({ "id": 16777426, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor({ "id": 16777246, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Text.maxLines(1);
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
            Text.width('100%');
        }, Text);
        Text.pop();
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new DifficultyStars(this, { value: this.item.difficulty }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/commons/uikit/RecipeCardH.ets", line: 29, col: 7 });
                    ViewV2.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            value: this.item.difficulty
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        value: this.item.difficulty
                    });
                }
            }, { name: "DifficultyStars" });
        }
        Column.pop();
    }
    public updateStateVars(params) {
        if (params === undefined) {
            return;
        }
        if ("item" in params) {
            this.updateParam("item", params.item);
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
}
