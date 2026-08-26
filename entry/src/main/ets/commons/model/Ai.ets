import { JsonSafe } from '../utils/JsonSafe';
import { RecipeIngredient, RecipeListItem, RecipeStep, RecipeTip } from './Recipe';

export enum AiRole {
  USER = 'user',
  ASSISTANT = 'assistant'
}

export enum AiResultType {
  TEXT = 'text',
  RECIPES = 'recipes',
  GENERATED = 'generated'
}

export enum AiScene {
  INGREDIENT_RECOMMEND = 'INGREDIENT_RECOMMEND',
  CONDITION_FILTER = 'CONDITION_FILTER',
  FALLBACK_GENERATE = 'FALLBACK_GENERATE'
}

@ObservedV2
export class AiRecipeMatch {
  @Trace recipe: RecipeListItem = new RecipeListItem();
  @Trace matchRate: number = 0;
  @Trace missingIngredients: string[] = [];

  static fromJson(obj: Record<string, Object>): AiRecipeMatch {
    const match: AiRecipeMatch = new AiRecipeMatch();
    const recipeObj: Record<string, Object> | null = JsonSafe.obj(obj, 'recipe');
    if (recipeObj !== null) {
      match.recipe = RecipeListItem.fromJson(recipeObj);
    }
    match.matchRate = JsonSafe.number(obj, 'matchRate');
    match.missingIngredients = JsonSafe.stringArr(obj, 'missingIngredients');
    return match;
  }

  static fromJsonArray(arr: Record<string, Object>[]): AiRecipeMatch[] {
    if (arr === null || arr === undefined) {
      return [];
    }
    const result: AiRecipeMatch[] = [];
    for (const obj of arr) {
      result.push(AiRecipeMatch.fromJson(obj));
    }
    return result;
  }
}

@ObservedV2
export class AiGeneratedRecipe {
  @Trace id: string = '';
  @Trace name: string = '';
  @Trace summary: string = '';
  @Trace difficulty: number = 0;
  @Trace calorie: number = 0;
  @Trace cookTime: number = 0;
  @Trace baseServings: number = 0;
  @Trace ingredients: RecipeIngredient[] = [];
  @Trace steps: RecipeStep[] = [];
  @Trace tips: RecipeTip[] = [];
  @Trace favorited: boolean = false;
  @Trace createTime: string = '';

  static fromJson(obj: Record<string, Object>): AiGeneratedRecipe {
    const recipe: AiGeneratedRecipe = new AiGeneratedRecipe();
    recipe.id = JsonSafe.string(obj, 'id');
    recipe.name = JsonSafe.string(obj, 'name');
    recipe.summary = JsonSafe.string(obj, 'summary');
    recipe.difficulty = JsonSafe.number(obj, 'difficulty');
    recipe.calorie = JsonSafe.number(obj, 'calorie');
    recipe.cookTime = JsonSafe.number(obj, 'cookTime');
    recipe.baseServings = JsonSafe.number(obj, 'baseServings');
    recipe.ingredients = RecipeIngredient.fromJsonArray(JsonSafe.arr(obj, 'ingredients'));
    recipe.steps = RecipeStep.fromJsonArray(JsonSafe.arr(obj, 'steps'));
    recipe.tips = RecipeTip.fromJsonArray(JsonSafe.arr(obj, 'tips'));
    recipe.favorited = JsonSafe.boolean(obj, 'favorited');
    recipe.createTime = JsonSafe.string(obj, 'createTime');
    return recipe;
  }

  static fromJsonArray(arr: Record<string, Object>[]): AiGeneratedRecipe[] {
    if (arr === null || arr === undefined) {
      return [];
    }
    const result: AiGeneratedRecipe[] = [];
    for (const obj of arr) {
      result.push(AiGeneratedRecipe.fromJson(obj));
    }
    return result;
  }
}

@ObservedV2
export class AiMessage {
  @Trace id: string = '';
  @Trace role: AiRole = AiRole.USER;
  @Trace text: string = '';
  @Trace resultType: AiResultType = AiResultType.TEXT;
  @Trace recipes: AiRecipeMatch[] = [];
  @Trace generated: AiGeneratedRecipe | null = null;
  @Trace streaming: boolean = false;
  @Trace failed: boolean = false;
  @Trace hint: string = '';

  static user(id: string, text: string): AiMessage {
    const msg: AiMessage = new AiMessage();
    msg.id = id;
    msg.role = AiRole.USER;
    msg.text = text;
    return msg;
  }

  static assistant(id: string): AiMessage {
    const msg: AiMessage = new AiMessage();
    msg.id = id;
    msg.role = AiRole.ASSISTANT;
    msg.streaming = true;
    return msg;
  }
}
