import { RouteNames } from '../commons/router/RouteNames';
import {
  RecipeDetailParam,
  RecipeListParam,
  SearchParam,
  WebDocParam
} from '../commons/router/RouteNames';
import { RecipeListPage } from '../features/category/pages/RecipeListPage';
import { DetailPage } from '../features/detail/pages/DetailPage';
import { MyAiRecipesPage } from '../features/ai/pages/MyAiRecipesPage';
import { SearchPage } from '../features/search/pages/SearchPage';
import { AboutPage } from '../features/user/pages/AboutPage';
import { AccountPage } from '../features/user/pages/AccountPage';
import { BrowseHistoryPage } from '../features/user/pages/BrowseHistoryPage';
import { LoginPage } from '../features/user/pages/LoginPage';
import { MyRecipeListPage } from '../features/user/pages/MyRecipeListPage';
import { ProfileEditPage } from '../features/user/pages/ProfileEditPage';
import { RegisterPage } from '../features/user/pages/RegisterPage';
import { WebDocPage } from '../features/user/pages/WebDocPage';
import { MyListSource } from '../features/user/viewmodel/MyRecipeListViewModel';
import { JsonSafe } from '../commons/utils/JsonSafe';

function toRecipeDetailParam(p: object): RecipeDetailParam {
  const src: Record<string, Object> = p as Record<string, Object>;
  const param: RecipeDetailParam = new RecipeDetailParam();
  param.recipeId = JsonSafe.string(src, 'recipeId');
  return param;
}

function toSearchParam(p: object): SearchParam {
  const src: Record<string, Object> = p as Record<string, Object>;
  const param: SearchParam = new SearchParam();
  param.keyword = JsonSafe.string(src, 'keyword');
  return param;
}

function toRecipeListParam(p: object): RecipeListParam {
  const src: Record<string, Object> = p as Record<string, Object>;
  const param: RecipeListParam = new RecipeListParam();
  param.title = JsonSafe.string(src, 'title');
  param.tagId = JsonSafe.string(src, 'tagId');
  param.sort = JsonSafe.string(src, 'sort');
  return param;
}

function toWebDocParam(p: object): WebDocParam {
  const src: Record<string, Object> = p as Record<string, Object>;
  const param: WebDocParam = new WebDocParam();
  param.title = JsonSafe.string(src, 'title');
  param.docKey = JsonSafe.string(src, 'docKey');
  return param;
}

@Builder
export function routeMap(name: string, param: object) {
  if (name === RouteNames.RECIPE_DETAIL) {
    NavDestination() {
      DetailPage({ param: toRecipeDetailParam(param) })
    }
    .hideTitleBar(true)
    .systemTransition(NavigationSystemTransitionType.SLIDE_RIGHT)
  } else if (name === RouteNames.SEARCH) {
    NavDestination() {
      SearchPage({ param: toSearchParam(param) })
    }
    .hideTitleBar(true)
    .systemTransition(NavigationSystemTransitionType.SLIDE_BOTTOM)
  } else if (name === RouteNames.RECIPE_LIST) {
    NavDestination() {
      RecipeListPage({ param: toRecipeListParam(param) })
    }
    .hideTitleBar(true)
    .systemTransition(NavigationSystemTransitionType.SLIDE_RIGHT)
  } else if (name === RouteNames.LOGIN) {
    NavDestination() {
      LoginPage()
    }
    .hideTitleBar(true)
    .systemTransition(NavigationSystemTransitionType.SLIDE_BOTTOM)
  } else if (name === RouteNames.REGISTER) {
    NavDestination() {
      RegisterPage()
    }
    .hideTitleBar(true)
    .systemTransition(NavigationSystemTransitionType.SLIDE_BOTTOM)
  } else if (name === RouteNames.PROFILE_EDIT) {
    NavDestination() {
      ProfileEditPage()
    }
    .hideTitleBar(true)
    .systemTransition(NavigationSystemTransitionType.SLIDE_RIGHT)
  } else if (name === RouteNames.MY_FAVORITES) {
    NavDestination() {
      MyRecipeListPage({ source: MyListSource.FAVORITES })
    }
    .hideTitleBar(true)
    .systemTransition(NavigationSystemTransitionType.SLIDE_RIGHT)
  } else if (name === RouteNames.MY_LIKES) {
    NavDestination() {
      MyRecipeListPage({ source: MyListSource.LIKES })
    }
    .hideTitleBar(true)
    .systemTransition(NavigationSystemTransitionType.SLIDE_RIGHT)
  } else if (name === RouteNames.MY_AI_RECIPES) {
    NavDestination() {
      MyAiRecipesPage()
    }
    .hideTitleBar(true)
    .systemTransition(NavigationSystemTransitionType.SLIDE_RIGHT)
  } else if (name === RouteNames.BROWSE_HISTORY) {
    NavDestination() {
      BrowseHistoryPage()
    }
    .hideTitleBar(true)
    .systemTransition(NavigationSystemTransitionType.SLIDE_RIGHT)
  } else if (name === RouteNames.ACCOUNT) {
    NavDestination() {
      AccountPage()
    }
    .hideTitleBar(true)
    .systemTransition(NavigationSystemTransitionType.SLIDE_RIGHT)
  } else if (name === RouteNames.ABOUT) {
    NavDestination() {
      AboutPage()
    }
    .hideTitleBar(true)
    .systemTransition(NavigationSystemTransitionType.SLIDE_RIGHT)
  } else if (name === RouteNames.WEB_DOC) {
    NavDestination() {
      WebDocPage({ param: toWebDocParam(param) })
    }
    .hideTitleBar(true)
    .systemTransition(NavigationSystemTransitionType.SLIDE_RIGHT)
  }
}
