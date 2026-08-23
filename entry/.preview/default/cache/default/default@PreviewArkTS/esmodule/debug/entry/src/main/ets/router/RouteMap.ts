import { RouteNames } from "@bundle:com.eatapp.recipe/entry/ets/commons/router/RouteNames";
import type { RecipeDetailParam, RecipeListParam, SearchParam, WebDocParam } from "@bundle:com.eatapp.recipe/entry/ets/commons/router/RouteNames";
import { RecipeListPage } from "@bundle:com.eatapp.recipe/entry/ets/features/category/pages/RecipeListPage";
import { DetailPage } from "@bundle:com.eatapp.recipe/entry/ets/features/detail/pages/DetailPage";
import { MyAiRecipesPage } from "@bundle:com.eatapp.recipe/entry/ets/features/ai/pages/MyAiRecipesPage";
import { SearchPage } from "@bundle:com.eatapp.recipe/entry/ets/features/search/pages/SearchPage";
import { AboutPage } from "@bundle:com.eatapp.recipe/entry/ets/features/user/pages/AboutPage";
import { AccountPage } from "@bundle:com.eatapp.recipe/entry/ets/features/user/pages/AccountPage";
import { BrowseHistoryPage } from "@bundle:com.eatapp.recipe/entry/ets/features/user/pages/BrowseHistoryPage";
import { LoginPage } from "@bundle:com.eatapp.recipe/entry/ets/features/user/pages/LoginPage";
import { MyRecipeListPage } from "@bundle:com.eatapp.recipe/entry/ets/features/user/pages/MyRecipeListPage";
import { ProfileEditPage } from "@bundle:com.eatapp.recipe/entry/ets/features/user/pages/ProfileEditPage";
import { WebDocPage } from "@bundle:com.eatapp.recipe/entry/ets/features/user/pages/WebDocPage";
import { MyListSource } from "@bundle:com.eatapp.recipe/entry/ets/features/user/viewmodel/MyRecipeListViewModel";
/**
 * NavDestination 注册表。
 *
 * 这是全项目唯一一处能同时 import 多个 feature 的地方——
 * 它属于 entry 层，依赖方向是 entry → features，没有破坏单向依赖。
 * feature 内部跳转只用 RouteNames 里的字符串，不 import 彼此的页面。
 */
export function routeMap(name: string, param: object, parent = null) {
    (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
        If.create();
        if (name === RouteNames.RECIPE_DETAIL) {
            (parent ? parent : this).ifElseBranchUpdateFunction(0, () => {
                (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
                    NavDestination.create(() => {
                        {
                            (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
                                if (isInitialRender) {
                                    let componentCall = new DetailPage(parent ? parent : this, { param: param as RecipeDetailParam }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/router/RouteMap.ets", line: 32, col: 7 });
                                    ViewV2.create(componentCall);
                                    let paramsLambda = () => {
                                        return {
                                            param: param as RecipeDetailParam
                                        };
                                    };
                                    componentCall.paramsGenerator_ = paramsLambda;
                                }
                                else {
                                    (parent ? parent : this).updateStateVarsOfChildByElmtId(elmtId, {
                                        param: param as RecipeDetailParam
                                    });
                                }
                            }, { name: "DetailPage" });
                        }
                    }, { moduleName: "entry", pagePath: "entry/src/main/ets/router/RouteMap" });
                    NavDestination.hideTitleBar(true);
                    NavDestination.debugLine("entry/src/main/ets/router/RouteMap.ets(31:5)", "entry");
                }, NavDestination);
                NavDestination.pop();
            });
        }
        else if (name === RouteNames.SEARCH) {
            (parent ? parent : this).ifElseBranchUpdateFunction(1, () => {
                (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
                    NavDestination.create(() => {
                        {
                            (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
                                if (isInitialRender) {
                                    let componentCall = new SearchPage(parent ? parent : this, { param: param as SearchParam }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/router/RouteMap.ets", line: 37, col: 7 });
                                    ViewV2.create(componentCall);
                                    let paramsLambda = () => {
                                        return {
                                            param: param as SearchParam
                                        };
                                    };
                                    componentCall.paramsGenerator_ = paramsLambda;
                                }
                                else {
                                    (parent ? parent : this).updateStateVarsOfChildByElmtId(elmtId, {
                                        param: param as SearchParam
                                    });
                                }
                            }, { name: "SearchPage" });
                        }
                    }, { moduleName: "entry", pagePath: "entry/src/main/ets/router/RouteMap" });
                    NavDestination.hideTitleBar(true);
                    NavDestination.debugLine("entry/src/main/ets/router/RouteMap.ets(36:5)", "entry");
                }, NavDestination);
                NavDestination.pop();
            });
        }
        else if (name === RouteNames.RECIPE_LIST) {
            (parent ? parent : this).ifElseBranchUpdateFunction(2, () => {
                (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
                    NavDestination.create(() => {
                        {
                            (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
                                if (isInitialRender) {
                                    let componentCall = new RecipeListPage(parent ? parent : this, { param: param as RecipeListParam }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/router/RouteMap.ets", line: 42, col: 7 });
                                    ViewV2.create(componentCall);
                                    let paramsLambda = () => {
                                        return {
                                            param: param as RecipeListParam
                                        };
                                    };
                                    componentCall.paramsGenerator_ = paramsLambda;
                                }
                                else {
                                    (parent ? parent : this).updateStateVarsOfChildByElmtId(elmtId, {
                                        param: param as RecipeListParam
                                    });
                                }
                            }, { name: "RecipeListPage" });
                        }
                    }, { moduleName: "entry", pagePath: "entry/src/main/ets/router/RouteMap" });
                    NavDestination.hideTitleBar(true);
                    NavDestination.debugLine("entry/src/main/ets/router/RouteMap.ets(41:5)", "entry");
                }, NavDestination);
                NavDestination.pop();
            });
        }
        else if (name === RouteNames.LOGIN) {
            (parent ? parent : this).ifElseBranchUpdateFunction(3, () => {
                (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
                    NavDestination.create(() => {
                        {
                            (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
                                if (isInitialRender) {
                                    let componentCall = new LoginPage(parent ? parent : this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/router/RouteMap.ets", line: 47, col: 7 });
                                    ViewV2.create(componentCall);
                                    let paramsLambda = () => {
                                        return {};
                                    };
                                    componentCall.paramsGenerator_ = paramsLambda;
                                }
                                else {
                                    (parent ? parent : this).updateStateVarsOfChildByElmtId(elmtId, {});
                                }
                            }, { name: "LoginPage" });
                        }
                    }, { moduleName: "entry", pagePath: "entry/src/main/ets/router/RouteMap" });
                    NavDestination.hideTitleBar(true);
                    NavDestination.debugLine("entry/src/main/ets/router/RouteMap.ets(46:5)", "entry");
                }, NavDestination);
                NavDestination.pop();
            });
        }
        else if (name === RouteNames.PROFILE_EDIT) {
            (parent ? parent : this).ifElseBranchUpdateFunction(4, () => {
                (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
                    NavDestination.create(() => {
                        {
                            (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
                                if (isInitialRender) {
                                    let componentCall = new ProfileEditPage(parent ? parent : this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/router/RouteMap.ets", line: 52, col: 7 });
                                    ViewV2.create(componentCall);
                                    let paramsLambda = () => {
                                        return {};
                                    };
                                    componentCall.paramsGenerator_ = paramsLambda;
                                }
                                else {
                                    (parent ? parent : this).updateStateVarsOfChildByElmtId(elmtId, {});
                                }
                            }, { name: "ProfileEditPage" });
                        }
                    }, { moduleName: "entry", pagePath: "entry/src/main/ets/router/RouteMap" });
                    NavDestination.hideTitleBar(true);
                    NavDestination.debugLine("entry/src/main/ets/router/RouteMap.ets(51:5)", "entry");
                }, NavDestination);
                NavDestination.pop();
            });
        }
        else if (name === RouteNames.MY_FAVORITES) {
            (parent ? parent : this).ifElseBranchUpdateFunction(5, () => {
                (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
                    NavDestination.create(() => {
                        {
                            (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
                                if (isInitialRender) {
                                    let componentCall = new MyRecipeListPage(parent ? parent : this, { source: MyListSource.FAVORITES }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/router/RouteMap.ets", line: 57, col: 7 });
                                    ViewV2.create(componentCall);
                                    let paramsLambda = () => {
                                        return {
                                            source: MyListSource.FAVORITES
                                        };
                                    };
                                    componentCall.paramsGenerator_ = paramsLambda;
                                }
                                else {
                                    (parent ? parent : this).updateStateVarsOfChildByElmtId(elmtId, {
                                        source: MyListSource.FAVORITES
                                    });
                                }
                            }, { name: "MyRecipeListPage" });
                        }
                    }, { moduleName: "entry", pagePath: "entry/src/main/ets/router/RouteMap" });
                    NavDestination.hideTitleBar(true);
                    NavDestination.debugLine("entry/src/main/ets/router/RouteMap.ets(56:5)", "entry");
                }, NavDestination);
                NavDestination.pop();
            });
        }
        else if (name === RouteNames.MY_LIKES) {
            (parent ? parent : this).ifElseBranchUpdateFunction(6, () => {
                (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
                    NavDestination.create(() => {
                        {
                            (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
                                if (isInitialRender) {
                                    let componentCall = new MyRecipeListPage(parent ? parent : this, { source: MyListSource.LIKES }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/router/RouteMap.ets", line: 62, col: 7 });
                                    ViewV2.create(componentCall);
                                    let paramsLambda = () => {
                                        return {
                                            source: MyListSource.LIKES
                                        };
                                    };
                                    componentCall.paramsGenerator_ = paramsLambda;
                                }
                                else {
                                    (parent ? parent : this).updateStateVarsOfChildByElmtId(elmtId, {
                                        source: MyListSource.LIKES
                                    });
                                }
                            }, { name: "MyRecipeListPage" });
                        }
                    }, { moduleName: "entry", pagePath: "entry/src/main/ets/router/RouteMap" });
                    NavDestination.hideTitleBar(true);
                    NavDestination.debugLine("entry/src/main/ets/router/RouteMap.ets(61:5)", "entry");
                }, NavDestination);
                NavDestination.pop();
            });
        }
        else if (name === RouteNames.MY_AI_RECIPES) {
            (parent ? parent : this).ifElseBranchUpdateFunction(7, () => {
                (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
                    NavDestination.create(() => {
                        {
                            (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
                                if (isInitialRender) {
                                    let componentCall = new MyAiRecipesPage(parent ? parent : this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/router/RouteMap.ets", line: 67, col: 7 });
                                    ViewV2.create(componentCall);
                                    let paramsLambda = () => {
                                        return {};
                                    };
                                    componentCall.paramsGenerator_ = paramsLambda;
                                }
                                else {
                                    (parent ? parent : this).updateStateVarsOfChildByElmtId(elmtId, {});
                                }
                            }, { name: "MyAiRecipesPage" });
                        }
                    }, { moduleName: "entry", pagePath: "entry/src/main/ets/router/RouteMap" });
                    NavDestination.hideTitleBar(true);
                    NavDestination.debugLine("entry/src/main/ets/router/RouteMap.ets(66:5)", "entry");
                }, NavDestination);
                NavDestination.pop();
            });
        }
        else if (name === RouteNames.BROWSE_HISTORY) {
            (parent ? parent : this).ifElseBranchUpdateFunction(8, () => {
                (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
                    NavDestination.create(() => {
                        {
                            (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
                                if (isInitialRender) {
                                    let componentCall = new BrowseHistoryPage(parent ? parent : this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/router/RouteMap.ets", line: 72, col: 7 });
                                    ViewV2.create(componentCall);
                                    let paramsLambda = () => {
                                        return {};
                                    };
                                    componentCall.paramsGenerator_ = paramsLambda;
                                }
                                else {
                                    (parent ? parent : this).updateStateVarsOfChildByElmtId(elmtId, {});
                                }
                            }, { name: "BrowseHistoryPage" });
                        }
                    }, { moduleName: "entry", pagePath: "entry/src/main/ets/router/RouteMap" });
                    NavDestination.hideTitleBar(true);
                    NavDestination.debugLine("entry/src/main/ets/router/RouteMap.ets(71:5)", "entry");
                }, NavDestination);
                NavDestination.pop();
            });
        }
        else if (name === RouteNames.ACCOUNT) {
            (parent ? parent : this).ifElseBranchUpdateFunction(9, () => {
                (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
                    NavDestination.create(() => {
                        {
                            (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
                                if (isInitialRender) {
                                    let componentCall = new AccountPage(parent ? parent : this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/router/RouteMap.ets", line: 77, col: 7 });
                                    ViewV2.create(componentCall);
                                    let paramsLambda = () => {
                                        return {};
                                    };
                                    componentCall.paramsGenerator_ = paramsLambda;
                                }
                                else {
                                    (parent ? parent : this).updateStateVarsOfChildByElmtId(elmtId, {});
                                }
                            }, { name: "AccountPage" });
                        }
                    }, { moduleName: "entry", pagePath: "entry/src/main/ets/router/RouteMap" });
                    NavDestination.hideTitleBar(true);
                    NavDestination.debugLine("entry/src/main/ets/router/RouteMap.ets(76:5)", "entry");
                }, NavDestination);
                NavDestination.pop();
            });
        }
        else if (name === RouteNames.ABOUT) {
            (parent ? parent : this).ifElseBranchUpdateFunction(10, () => {
                (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
                    NavDestination.create(() => {
                        {
                            (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
                                if (isInitialRender) {
                                    let componentCall = new AboutPage(parent ? parent : this, {}, undefined, elmtId, () => { }, { page: "entry/src/main/ets/router/RouteMap.ets", line: 82, col: 7 });
                                    ViewV2.create(componentCall);
                                    let paramsLambda = () => {
                                        return {};
                                    };
                                    componentCall.paramsGenerator_ = paramsLambda;
                                }
                                else {
                                    (parent ? parent : this).updateStateVarsOfChildByElmtId(elmtId, {});
                                }
                            }, { name: "AboutPage" });
                        }
                    }, { moduleName: "entry", pagePath: "entry/src/main/ets/router/RouteMap" });
                    NavDestination.hideTitleBar(true);
                    NavDestination.debugLine("entry/src/main/ets/router/RouteMap.ets(81:5)", "entry");
                }, NavDestination);
                NavDestination.pop();
            });
        }
        else if (name === RouteNames.WEB_DOC) {
            (parent ? parent : this).ifElseBranchUpdateFunction(11, () => {
                (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
                    NavDestination.create(() => {
                        {
                            (parent ? parent : this).observeComponentCreation2((elmtId, isInitialRender) => {
                                if (isInitialRender) {
                                    let componentCall = new WebDocPage(parent ? parent : this, { param: param as WebDocParam }, undefined, elmtId, () => { }, { page: "entry/src/main/ets/router/RouteMap.ets", line: 87, col: 7 });
                                    ViewV2.create(componentCall);
                                    let paramsLambda = () => {
                                        return {
                                            param: param as WebDocParam
                                        };
                                    };
                                    componentCall.paramsGenerator_ = paramsLambda;
                                }
                                else {
                                    (parent ? parent : this).updateStateVarsOfChildByElmtId(elmtId, {
                                        param: param as WebDocParam
                                    });
                                }
                            }, { name: "WebDocPage" });
                        }
                    }, { moduleName: "entry", pagePath: "entry/src/main/ets/router/RouteMap" });
                    NavDestination.hideTitleBar(true);
                    NavDestination.debugLine("entry/src/main/ets/router/RouteMap.ets(86:5)", "entry");
                }, NavDestination);
                NavDestination.pop();
            });
        }
        else {
            this.ifElseBranchUpdateFunction(12, () => {
            });
        }
    }, If);
    If.pop();
}
