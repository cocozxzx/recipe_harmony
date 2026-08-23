if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
import type { RecipeTag } from '../../../commons/model/Recipe';
export class TagGrid extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.initParam("tags", (params && "tags" in params) ? params.tags : []);
        this.onTagTap = "onTagTap" in params ? params.onTagTap : () => { };
        this.onMoreTap = "onMoreTap" in params ? params.onMoreTap : () => { };
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
        this.resetParam("tags", (params && "tags" in params) ? params.tags : []);
        this.onTagTap = "onTagTap" in params ? params.onTagTap : () => { };
        this.onMoreTap = "onMoreTap" in params ? params.onMoreTap : () => { };
    }
    @Param
    readonly tags: RecipeTag[];
    @Event
    onTagTap: (tag: RecipeTag) => void;
    @Event
    onMoreTap: () => void;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Grid.create();
            Grid.debugLine("entry/src/main/ets/features/home/components/TagGrid.ets(15:5)", "entry");
            Grid.columnsTemplate('1fr 1fr 1fr 1fr');
            Grid.rowsGap({ "id": 16777441, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Grid.columnsGap({ "id": 16777442, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Grid.width('100%');
            Grid.height(this.tags.length > 3 ? 152 : 76);
        }, Grid);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const tag = _item;
                {
                    const itemCreation2 = (elmtId, isInitialRender) => {
                        GridItem.create(() => { }, false);
                        GridItem.onClick(() => this.onTagTap(tag));
                        GridItem.debugLine("entry/src/main/ets/features/home/components/TagGrid.ets(17:9)", "entry");
                    };
                    const observedDeepRender = () => {
                        this.observeComponentCreation2(itemCreation2, GridItem);
                        this.cell.bind(this)(tag.name, false);
                        GridItem.pop();
                    };
                    observedDeepRender();
                }
            };
            this.forEachUpdateFunction(elmtId, this.tags.slice(0, 7), forEachItemGenFunction, (tag: RecipeTag) => tag.id, false, false);
        }, ForEach);
        ForEach.pop();
        {
            const itemCreation2 = (elmtId, isInitialRender) => {
                GridItem.create(() => { }, false);
                GridItem.onClick(() => this.onMoreTap());
                GridItem.debugLine("entry/src/main/ets/features/home/components/TagGrid.ets(23:7)", "entry");
            };
            const observedDeepRender = () => {
                this.observeComponentCreation2(itemCreation2, GridItem);
                this.cell.bind(this)({ "id": 16777320, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }, true);
                GridItem.pop();
            };
            observedDeepRender();
        }
        Grid.pop();
    }
    cell(label: ResourceStr, highlight: boolean, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 6 });
            Column.debugLine("entry/src/main/ets/features/home/components/TagGrid.ets(37:5)", "entry");
            Column.width('100%');
            Column.justifyContent(FlexAlign.Center);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/features/home/components/TagGrid.ets(38:7)", "entry");
            Row.width(44);
            Row.height(44);
            Row.borderRadius({ "id": 16777437, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Row.backgroundColor(highlight ? { "id": 16777229, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" } : { "id": 16777237, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
        }, Row);
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create(label);
            Text.debugLine("entry/src/main/ets/features/home/components/TagGrid.ets(43:7)", "entry");
            Text.fontSize({ "id": 16777428, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Text.fontColor({ "id": 16777247, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Text.maxLines(1);
            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
        }, Text);
        Text.pop();
        Column.pop();
    }
    public updateStateVars(params) {
        if (params === undefined) {
            return;
        }
        if ("tags" in params) {
            this.updateParam("tags", params.tags);
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
}
