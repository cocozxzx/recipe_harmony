if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
import { TagChip } from "@bundle:com.eatapp.recipe/entry/ets/commons/uikit/TagChip";
import { Strings } from "@bundle:com.eatapp.recipe/entry/ets/commons/utils/Strings";
import { CategoryViewModel } from "@bundle:com.eatapp.recipe/entry/ets/features/category/viewmodel/CategoryViewModel";
/** 耗时区间选项，值为"不超过 N 分钟"，0 表示不限 */
interface CookTimeOption {
    label: ResourceStr;
    value: number;
}
export class FilterPanel extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.initParam("vm", (params && "vm" in params) ? params.vm : new CategoryViewModel());
        this.cookTimeOptions = [
            { label: { "id": 16777302, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }, value: 0 },
            { label: { "id": 16777299, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }, value: 15 },
            { label: { "id": 16777300, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }, value: 30 },
            { label: { "id": 16777301, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }, value: 60 }
        ];
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
        this.resetParam("vm", (params && "vm" in params) ? params.vm : new CategoryViewModel());
    }
    @Param
    readonly vm: CategoryViewModel;
    private readonly cookTimeOptions: CookTimeOption[];
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 16 });
            Column.debugLine("entry/src/main/ets/features/category/components/FilterPanel.ets(27:5)", "entry");
            Column.width('100%');
            Column.padding({ "id": 16777440, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Column.backgroundColor({ "id": 16777234, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Column.borderRadius({ "id": 16777436, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 8 });
            Column.debugLine("entry/src/main/ets/features/category/components/FilterPanel.ets(28:7)", "entry");
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777306, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Text.debugLine("entry/src/main/ets/features/category/components/FilterPanel.ets(29:9)", "entry");
            Text.fontSize({ "id": 16777427, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Text.fontColor({ "id": 16777247, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Text.width('100%');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 8 });
            Row.debugLine("entry/src/main/ets/features/category/components/FilterPanel.ets(33:9)", "entry");
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const level = _item;
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new TagChip(this, {
                                text: this.starsLabel(level),
                                selected: this.vm.difficulties.indexOf(level) >= 0,
                                onTap: () => this.vm.toggleDifficulty(level)
                            }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/features/category/components/FilterPanel.ets", line: 35, col: 13 });
                            ViewV2.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    text: this.starsLabel(level),
                                    selected: this.vm.difficulties.indexOf(level) >= 0,
                                    onTap: () => this.vm.toggleDifficulty(level)
                                };
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {
                                text: this.starsLabel(level),
                                selected: this.vm.difficulties.indexOf(level) >= 0
                            });
                        }
                    }, { name: "TagChip" });
                }
            };
            this.forEachUpdateFunction(elmtId, [1, 2, 3, 4, 5], forEachItemGenFunction, (level: number) => level.toString(), false, false);
        }, ForEach);
        ForEach.pop();
        Row.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create({ space: 8 });
            Column.debugLine("entry/src/main/ets/features/category/components/FilterPanel.ets(45:7)", "entry");
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create({ "id": 16777305, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Text.debugLine("entry/src/main/ets/features/category/components/FilterPanel.ets(46:9)", "entry");
            Text.fontSize({ "id": 16777427, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Text.fontColor({ "id": 16777247, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Text.width('100%');
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 8 });
            Row.debugLine("entry/src/main/ets/features/category/components/FilterPanel.ets(50:9)", "entry");
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const option = _item;
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new TagChip(this, {
                                text: Strings.get(option.label as Resource, ''),
                                selected: this.vm.maxCookTime === option.value,
                                onTap: () => this.vm.setMaxCookTime(option.value)
                            }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/features/category/components/FilterPanel.ets", line: 52, col: 13 });
                            ViewV2.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    text: Strings.get(option.label as Resource, ''),
                                    selected: this.vm.maxCookTime === option.value,
                                    onTap: () => this.vm.setMaxCookTime(option.value)
                                };
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {
                                text: Strings.get(option.label as Resource, ''),
                                selected: this.vm.maxCookTime === option.value
                            });
                        }
                    }, { name: "TagChip" });
                }
            };
            this.forEachUpdateFunction(elmtId, this.cookTimeOptions, forEachItemGenFunction, (option: CookTimeOption) => option.value.toString(), false, false);
        }, ForEach);
        ForEach.pop();
        Row.pop();
        Column.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create({ space: 12 });
            Row.debugLine("entry/src/main/ets/features/category/components/FilterPanel.ets(62:7)", "entry");
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel({ "id": 16777323, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Button.debugLine("entry/src/main/ets/features/category/components/FilterPanel.ets(63:9)", "entry");
            Button.type(ButtonType.Normal);
            Button.layoutWeight(1);
            Button.height(40);
            Button.borderRadius({ "id": 16777437, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Button.backgroundColor({ "id": 16777233, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Button.fontColor({ "id": 16777247, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Button.fontSize({ "id": 16777426, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Button.onClick(() => this.vm.resetFilter());
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel({ "id": 16777314, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Button.debugLine("entry/src/main/ets/features/category/components/FilterPanel.ets(73:9)", "entry");
            Button.type(ButtonType.Normal);
            Button.layoutWeight(1);
            Button.height(40);
            Button.borderRadius({ "id": 16777437, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Button.backgroundColor({ "id": 16777235, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Button.fontColor({ "id": 16777245, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Button.fontSize({ "id": 16777426, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Button.onClick(() => this.vm.applyFilter());
        }, Button);
        Button.pop();
        Row.pop();
        Column.pop();
    }
    /** 难度用星号表示，与卡片上的星级图标保持同一套语义 */
    private starsLabel(level: number): string {
        let text: string = '';
        for (let i = 0; i < level; i++) {
            text += '★';
        }
        return text;
    }
    public updateStateVars(params) {
        if (params === undefined) {
            return;
        }
        if ("vm" in params) {
            this.updateParam("vm", params.vm);
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
}
