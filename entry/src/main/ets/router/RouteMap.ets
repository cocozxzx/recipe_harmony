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

/**
 * NavDestination 注册表。
 *
 * 这是全项目唯一一处能同时 import 多个 feature 的地方——
 * 它属于 entry 层，依赖方向是 entry → features，没有破坏单向依赖。
 * feature 内部跳转只用 RouteNames 里的字符串，不 import 彼此的页面。
 */
@Builder
export function routeMap(name: string, param: object) {
  if (name === RouteNames.RECIPE_DETAIL) {
    NavDestination() {
      DetailPage({ param: param as RecipeDetailParam })
    }
    .hideTitleBar(true)
  } else if (name === RouteNames.SEARCH) {
    NavDestination() {
      SearchPage({ param: param as SearchParam })
    }
    .hideTitleBar(true)
  } else if (name === RouteNames.RECIPE_LIST) {
    NavDestination() {
      RecipeListPage({ param: param as RecipeListParam })
    }
    .hideTitleBar(true)
  } else if (name === RouteNames.LOGIN) {
    NavDestination() {
      LoginPage()
    }
    .hideTitleBar(true)
  } else if (name === RouteNames.REGISTER) {
    NavDestination() {
      RegisterPage()
    }
    .hideTitleBar(true)
  } else if (name === RouteNames.PROFILE_EDIT) {
    NavDestination() {
      ProfileEditPage()
    }
    .hideTitleBar(true)
  } else if (name === RouteNames.MY_FAVORITES) {
    NavDestination() {
      MyRecipeListPage({ source: MyListSource.FAVORITES })
    }
    .hideTitleBar(true)
  } else if (name === RouteNames.MY_LIKES) {
    NavDestination() {
      MyRecipeListPage({ source: MyListSource.LIKES })
    }
    .hideTitleBar(true)
  } else if (name === RouteNames.MY_AI_RECIPES) {
    NavDestination() {
      MyAiRecipesPage()
    }
    .hideTitleBar(true)
  } else if (name === RouteNames.BROWSE_HISTORY) {
    NavDestination() {
      BrowseHistoryPage()
    }
    .hideTitleBar(true)
  } else if (name === RouteNames.ACCOUNT) {
    NavDestination() {
      AccountPage()
    }
    .hideTitleBar(true)
  } else if (name === RouteNames.ABOUT) {
    NavDestination() {
      AboutPage()
    }
    .hideTitleBar(true)
  } else if (name === RouteNames.WEB_DOC) {
    NavDestination() {
      WebDocPage({ param: param as WebDocParam })
    }
    .hideTitleBar(true)
  }
}
