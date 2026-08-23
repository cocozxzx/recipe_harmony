if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
import type { RecipeListItem } from '../model/Recipe';
import { Formatter } from "@bundle:com.eatapp.recipe/entry/ets/commons/utils/Formatter";
import { CookTimeLabel } from "@bundle:com.eatapp.recipe/entry/ets/commons/uikit/CookTimeLabel";
import { DifficultyStars } from "@bundle:com.eatapp.recipe/entry/ets/commons/uikit/DifficultyStars";
import { NetImage } from "@bundle:com.eatapp.recipe/entry/ets/commons/uikit/NetImage";
export class RecipeRow extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.initParam("item", (params && "item" in params) ? params.item : {} as RecipeListItem);
        this.initParam("showDivider", (params && "showDivider" in params) ? params.showDivider : true);
        this.onTap = "onTap" in params ? params.onTap : () => { };
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
        this.resetParam("item", (params && "item" in params) ? params.item : {} as RecipeListItem);
        this.resetParam("showDivider", (params && "showDivider" in params) ? params.showDivider : true);
        this.onTap = "onTap" in params ? params.onTap : () => { };
    }
    @Param
    readonly item: RecipeListItem;
    @Param
    readonly showDivider: boolean;
    @Event
    onTap: (item: RecipeListItem) => void;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/commons/uikit/RecipeRow.ets(18:5)", "entry");
            Column.width('100%');
            Column.padding({ top: { "id": 16777441, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }, bottom: this.showDivider ? 0 : { "id": 16777441, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" } });
            Column.onClick(() => this.onTap(this.item));
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 12 });
            Row.debugLine("entry/src/main/ets/commons/uikit/RecipeRow.ets(19:7)", "entry");
            Row.width('100%');
            Row.alignItems(VerticalAlign.Top);
        }, Row);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new NetImage(this, {
                        url: this.item.coverImage,
                        imgWidth: 104,
                        imgHeight: 78,
                        radius: { "id": 16777437, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }
                    }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/commons/uikit/RecipeRow.ets", line: 20, col: 9 });
                    ViewV2.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            url: this.item.coverImage,
                            imgWidth: 104,
                            imgHeight: 78,
                            radius: { "id": 16777437, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        url: this.item.coverImage,
                        imgWidth: 104,
                        imgHeight: 78,
                        radius: { "id": 16777437, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }
                    });
                }
            }, { name: "NetImage" });
        }
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 6 });
            Column.debugLine("entry/src/main/ets/commons/uikit/RecipeRow.ets(27:9)", "entry");
            Column.alignItems(HorizontalAlign.Start);
            Column.justifyContent(FlexAlign.Center);
            Column.layoutWeight(1);
            Column.height(78);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(this.item.name);
            Text.debugLine("entry/src/main/ets/commons/uikit/RecipeRow.ets(28:11)", "entry");
            Text.fontSize({ "id": 16777426, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Text.fontWeight(FontWeight.Medium);
            Text.fontColor({ "id": 16777246, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Text.maxLines(2);
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
            Text.width('100%');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 8 });
            Row.debugLine("entry/src/main/ets/commons/uikit/RecipeRow.ets(36:11)", "entry");
        }, Row);
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new DifficultyStars(this, { value: this.item.difficulty }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/commons/uikit/RecipeRow.ets", line: 37, col: 13 });
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
        {
            this.observeComponentCreation2((elmtId, isInitialRender) => {
                if (isInitialRender) {
                    let componentCall = new CookTimeLabel(this, { minutes: this.item.cookTime }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/commons/uikit/RecipeRow.ets", line: 38, col: 13 });
                    ViewV2.create(componentCall);
                    let paramsLambda = () => {
                        return {
                            minutes: this.item.cookTime
                        };
                    };
                    componentCall.paramsGenerator_ = paramsLambda;
                }
                else {
                    this.updateStateVarsOfChildByElmtId(elmtId, {
                        minutes: this.item.cookTime
                    });
                }
            }, { name: "CookTimeLabel" });
        }
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 12 });
            Row.debugLine("entry/src/main/ets/commons/uikit/RecipeRow.ets(41:11)", "entry");
        }, Row);
        this.countItem.bind(this)({ "id": 16777420, "type": 20000, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }, this.item.favoriteCount);
        this.countItem.bind(this)({ "id": 16777226, "type": 20000, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }, this.item.likeCount);
        Row.pop();
        Column.pop();
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.showDivider) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Divider.create();
                        Divider.debugLine("entry/src/main/ets/commons/uikit/RecipeRow.ets(55:9)", "entry");
                        Divider.color({ "id": 16777238, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        Divider.strokeWidth(1);
                        Divider.margin({ top: { "id": 16777441, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" } });
                    }, Divider);
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Column.pop();
    }
    countItem(icon: Resource, count: number, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 4 });
            Row.debugLine("entry/src/main/ets/commons/uikit/RecipeRow.ets(68:5)", "entry");
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create(icon);
            Image.debugLine("entry/src/main/ets/commons/uikit/RecipeRow.ets(69:7)", "entry");
            Image.width({ "id": 16777435, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Image.height({ "id": 16777435, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Image.fillColor({ "id": 16777248, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(Formatter.count(count));
            Text.debugLine("entry/src/main/ets/commons/uikit/RecipeRow.ets(73:7)", "entry");
            Text.fontSize({ "id": 16777428, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Text.fontColor({ "id": 16777248, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
        }, Text);
        Text.pop();
        Row.pop();
    }
    public updateStateVars(params) {
        if (params === undefined) {
            return;
        }
        if ("item" in params) {
            this.updateParam("item", params.item);
        }
        if ("showDivider" in params) {
            this.updateParam("showDivider", params.showDivider);
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
}
