if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
import { AiMessage, AiResultType, AiRole } from "@bundle:com.eatapp.recipe/entry/ets/commons/model/Ai";
import type { AiRecipeMatch } from "@bundle:com.eatapp.recipe/entry/ets/commons/model/Ai";
import type { RecipeListItem } from '../../../commons/model/Recipe';
import { NavUtil } from "@bundle:com.eatapp.recipe/entry/ets/commons/router/NavUtil";
import { RouteNames } from "@bundle:com.eatapp.recipe/entry/ets/commons/router/RouteNames";
import type { RecipeDetailParam } from "@bundle:com.eatapp.recipe/entry/ets/commons/router/RouteNames";
import { RecipeRow } from "@bundle:com.eatapp.recipe/entry/ets/commons/uikit/RecipeRow";
import { Strings } from "@bundle:com.eatapp.recipe/entry/ets/commons/utils/Strings";
import { MiniTag } from "@bundle:com.eatapp.recipe/entry/ets/commons/uikit/TagChip";
import { AiGeneratedCard } from "@bundle:com.eatapp.recipe/entry/ets/features/ai/components/AiGeneratedCard";
export class AiMessageItem extends ViewV2 {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda, extraInfo) {
        super(parent, elmtId, extraInfo);
        this.initParam("message", (params && "message" in params) ? params.message : new AiMessage());
        this.onRetry = "onRetry" in params ? params.onRetry : () => { };
        this.onToggleFavorite = "onToggleFavorite" in params ? params.onToggleFavorite : () => { };
        this.finalizeConstruction();
    }
    public resetStateVarsOnReuse(params: Object): void {
        this.resetParam("message", (params && "message" in params) ? params.message : new AiMessage());
        this.onRetry = "onRetry" in params ? params.onRetry : () => { };
        this.onToggleFavorite = "onToggleFavorite" in params ? params.onToggleFavorite : () => { };
    }
    @Param
    readonly message: AiMessage;
    @Event
    onRetry: () => void;
    @Event
    onToggleFavorite: () => void;
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/features/ai/components/AiMessageItem.ets(22:5)", "entry");
            Row.width('100%');
            Row.alignItems(VerticalAlign.Top);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.message.role === AiRole.USER) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.debugLine("entry/src/main/ets/features/ai/components/AiMessageItem.ets(24:9)", "entry");
                        Row.layoutWeight(1);
                    }, Row);
                    Row.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create(this.message.text);
                        Text.debugLine("entry/src/main/ets/features/ai/components/AiMessageItem.ets(25:9)", "entry");
                        Text.fontSize({ "id": 16777426, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        Text.fontColor({ "id": 16777245, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        Text.padding({ "id": 16777441, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        Text.backgroundColor({ "id": 16777235, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        Text.borderRadius({ "id": 16777437, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                        Text.constraintSize({ maxWidth: '76%' });
                    }, Text);
                    Text.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create({ space: 12 });
                        Column.debugLine("entry/src/main/ets/features/ai/components/AiMessageItem.ets(33:9)", "entry");
                        Column.alignItems(HorizontalAlign.Start);
                        Column.constraintSize({ maxWidth: '92%' });
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        If.create();
                        if (this.message.hint.length > 0) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Row.create({ space: 8 });
                                    Row.debugLine("entry/src/main/ets/features/ai/components/AiMessageItem.ets(35:13)", "entry");
                                }, Row);
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    LoadingProgress.create();
                                    LoadingProgress.debugLine("entry/src/main/ets/features/ai/components/AiMessageItem.ets(36:15)", "entry");
                                    LoadingProgress.width({ "id": 16777434, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                                    LoadingProgress.height({ "id": 16777434, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                                    LoadingProgress.color({ "id": 16777248, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                                }, LoadingProgress);
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Text.create(this.message.hint);
                                    Text.debugLine("entry/src/main/ets/features/ai/components/AiMessageItem.ets(40:15)", "entry");
                                    Text.fontSize({ "id": 16777427, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                                    Text.fontColor({ "id": 16777248, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                                }, Text);
                                Text.pop();
                                Row.pop();
                            });
                        }
                        else {
                            this.ifElseBranchUpdateFunction(1, () => {
                            });
                        }
                    }, If);
                    If.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        If.create();
                        if (this.message.text.length > 0) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Text.create(this.streamText());
                                    Text.debugLine("entry/src/main/ets/features/ai/components/AiMessageItem.ets(47:13)", "entry");
                                    Text.fontSize({ "id": 16777426, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                                    Text.fontColor({ "id": 16777246, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                                    Text.lineHeight(24);
                                    Text.padding({ "id": 16777441, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                                    Text.backgroundColor({ "id": 16777234, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                                    Text.borderRadius({ "id": 16777437, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                                    Text.width('100%');
                                }, Text);
                                Text.pop();
                            });
                        }
                        else {
                            this.ifElseBranchUpdateFunction(1, () => {
                            });
                        }
                    }, If);
                    If.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        If.create();
                        if (this.message.resultType === AiResultType.RECIPES) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                this.recipeMatches.bind(this)();
                            });
                        }
                        else {
                            this.ifElseBranchUpdateFunction(1, () => {
                            });
                        }
                    }, If);
                    If.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        If.create();
                        if (this.message.resultType === AiResultType.GENERATED && this.message.generated !== null) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                {
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        if (isInitialRender) {
                                            let componentCall = new AiGeneratedCard(this, {
                                                recipe: this.message.generated,
                                                onToggleFavorite: () => this.onToggleFavorite()
                                            }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/features/ai/components/AiMessageItem.ets", line: 62, col: 13 });
                                            ViewV2.create(componentCall);
                                            let paramsLambda = () => {
                                                return {
                                                    recipe: this.message.generated,
                                                    onToggleFavorite: () => this.onToggleFavorite()
                                                };
                                            };
                                            componentCall.paramsGenerator_ = paramsLambda;
                                        }
                                        else {
                                            this.updateStateVarsOfChildByElmtId(elmtId, {
                                                recipe: this.message.generated
                                            });
                                        }
                                    }, { name: "AiGeneratedCard" });
                                }
                            });
                        }
                        else {
                            this.ifElseBranchUpdateFunction(1, () => {
                            });
                        }
                    }, If);
                    If.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        If.create();
                        if (this.message.failed) {
                            this.ifElseBranchUpdateFunction(0, () => {
                                this.observeComponentCreation2((elmtId, isInitialRender) => {
                                    Text.create({ "id": 16777281, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                                    Text.debugLine("entry/src/main/ets/features/ai/components/AiMessageItem.ets(69:13)", "entry");
                                    Text.fontSize({ "id": 16777427, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                                    Text.fontColor({ "id": 16777242, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                                    Text.onClick(() => this.onRetry());
                                }, Text);
                                Text.pop();
                            });
                        }
                        else {
                            this.ifElseBranchUpdateFunction(1, () => {
                            });
                        }
                    }, If);
                    If.pop();
                    Column.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Row.create();
                        Row.debugLine("entry/src/main/ets/features/ai/components/AiMessageItem.ets(77:9)", "entry");
                        Row.layoutWeight(1);
                    }, Row);
                    Row.pop();
                });
            }
        }, If);
        If.pop();
        Row.pop();
    }
    recipeMatches(parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/features/ai/components/AiMessageItem.ets(86:5)", "entry");
            Column.width('100%');
            Column.padding({ left: { "id": 16777441, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }, right: { "id": 16777441, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" } });
            Column.backgroundColor({ "id": 16777234, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            Column.borderRadius({ "id": 16777437, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const match = _item;
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Column.create({ space: 6 });
                    Column.debugLine("entry/src/main/ets/features/ai/components/AiMessageItem.ets(88:9)", "entry");
                    Column.width('100%');
                }, Column);
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new RecipeRow(this, {
                                item: match.recipe,
                                showDivider: false,
                                onTap: (item: RecipeListItem) => {
                                    const param: RecipeDetailParam = { recipeId: item.id };
                                    NavUtil.push(RouteNames.RECIPE_DETAIL, param);
                                }
                            }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/features/ai/components/AiMessageItem.ets", line: 89, col: 11 });
                            ViewV2.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    item: match.recipe,
                                    showDivider: false,
                                    onTap: (item: RecipeListItem) => {
                                        const param: RecipeDetailParam = { recipeId: item.id };
                                        NavUtil.push(RouteNames.RECIPE_DETAIL, param);
                                    }
                                };
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {
                                item: match.recipe,
                                showDivider: false
                            });
                        }
                    }, { name: "RecipeRow" });
                }
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create({ space: 8 });
                    Row.debugLine("entry/src/main/ets/features/ai/components/AiMessageItem.ets(98:11)", "entry");
                    Row.width('100%');
                }, Row);
                {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        if (isInitialRender) {
                            let componentCall = new MiniTag(this, {
                                text: `${match.matchRate}%`,
                                bgColor: { "id": 16777237, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                                textColor: { "id": 16777235, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }
                            }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/features/ai/components/AiMessageItem.ets", line: 99, col: 13 });
                            ViewV2.create(componentCall);
                            let paramsLambda = () => {
                                return {
                                    text: `${match.matchRate}%`,
                                    bgColor: { "id": 16777237, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                                    textColor: { "id": 16777235, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }
                                };
                            };
                            componentCall.paramsGenerator_ = paramsLambda;
                        }
                        else {
                            this.updateStateVarsOfChildByElmtId(elmtId, {
                                text: `${match.matchRate}%`,
                                bgColor: { "id": 16777237, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" },
                                textColor: { "id": 16777235, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }
                            });
                        }
                    }, { name: "MiniTag" });
                }
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    If.create();
                    if (match.missingIngredients.length > 0) {
                        this.ifElseBranchUpdateFunction(0, () => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Text.create(this.missingText(match));
                                Text.debugLine("entry/src/main/ets/features/ai/components/AiMessageItem.ets(105:15)", "entry");
                                Text.fontSize({ "id": 16777428, "type": 10002, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                                Text.fontColor({ "id": 16777248, "type": 10001, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
                                Text.maxLines(1);
                                Text.textOverflow({ overflow: TextOverflow.Ellipsis });
                                Text.layoutWeight(1);
                            }, Text);
                            Text.pop();
                        });
                    }
                    else {
                        this.ifElseBranchUpdateFunction(1, () => {
                        });
                    }
                }, If);
                If.pop();
                Row.pop();
                Column.pop();
            };
            this.forEachUpdateFunction(elmtId, this.message.recipes, forEachItemGenFunction, (match: AiRecipeMatch) => match.recipe.id, false, false);
        }, ForEach);
        ForEach.pop();
        Column.pop();
    }
    /** 流式中在末尾补一个光标字符，比单独叠一个动画层简单且不引起重排 */
    private streamText(): string {
        return this.message.streaming ? `${this.message.text}▌` : this.message.text;
    }
    private missingText(match: AiRecipeMatch): string {
        return Strings.get({ "id": 16777287, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" }) + match.missingIngredients.join('、');
    }
    public updateStateVars(params) {
        if (params === undefined) {
            return;
        }
        if ("message" in params) {
            this.updateParam("message", params.message);
        }
    }
    rerender() {
        this.updateDirtyElements();
    }
}
