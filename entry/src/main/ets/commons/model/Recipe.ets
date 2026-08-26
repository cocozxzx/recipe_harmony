import { JsonSafe } from '../utils/JsonSafe';

@ObservedV2
export class RecipeListItem {
  @Trace id: string = '';
  @Trace name: string = '';
  @Trace coverImage: string = '';
  @Trace difficulty: number = 0;
  @Trace cookTime: number = 0;
  @Trace favoriteCount: number = 0;
  @Trace likeCount: number = 0;
  @Trace tagName: string = '';

  static create(id: string, name: string, coverImage: string, difficulty: number,
    cookTime: number, favoriteCount: number, likeCount: number, tagName: string): RecipeListItem {
    const item: RecipeListItem = new RecipeListItem();
    item.id = id;
    item.name = name;
    item.coverImage = coverImage;
    item.difficulty = difficulty;
    item.cookTime = cookTime;
    item.favoriteCount = favoriteCount;
    item.likeCount = likeCount;
    item.tagName = tagName;
    return item;
  }

  static fromJson(obj: Record<string, Object>): RecipeListItem {
    const item: RecipeListItem = new RecipeListItem();
    item.id = JsonSafe.string(obj, 'id');
    item.name = JsonSafe.string(obj, 'name');
    item.coverImage = JsonSafe.string(obj, 'coverImage');
    item.difficulty = JsonSafe.number(obj, 'difficulty');
    item.cookTime = JsonSafe.number(obj, 'cookTime');
    item.favoriteCount = JsonSafe.number(obj, 'favoriteCount');
    item.likeCount = JsonSafe.number(obj, 'likeCount');
    item.tagName = JsonSafe.string(obj, 'tagName');
    return item;
  }

  static fromJsonArray(arr: Record<string, Object>[]): RecipeListItem[] {
    if (arr === null || arr === undefined) {
      return [];
    }
    const result: RecipeListItem[] = [];
    for (const obj of arr) {
      result.push(RecipeListItem.fromJson(obj));
    }
    return result;
  }
}

@ObservedV2
export class RecipeIngredient {
  @Trace id: string = '';
  @Trace ingredientId: string = '';
  @Trace name: string = '';
  @Trace amount: number = 0;
  @Trace unit: string = '';
  @Trace isOptional: boolean = false;
  @Trace isConvertible: boolean = true;
  @Trace remark: string = '';
  @Trace sort: number = 0;

  static fromJson(obj: Record<string, Object>): RecipeIngredient {
    const item: RecipeIngredient = new RecipeIngredient();
    item.id = JsonSafe.string(obj, 'id');
    item.ingredientId = JsonSafe.string(obj, 'ingredientId');
    item.name = JsonSafe.string(obj, 'name');
    item.amount = JsonSafe.number(obj, 'amount');
    item.unit = JsonSafe.string(obj, 'unit');
    item.isOptional = JsonSafe.boolean(obj, 'isOptional');
    item.isConvertible = JsonSafe.boolean(obj, 'isConvertible', true);
    item.remark = JsonSafe.string(obj, 'remark');
    item.sort = JsonSafe.number(obj, 'sort');
    return item;
  }

  static fromJsonArray(arr: Record<string, Object>[]): RecipeIngredient[] {
    if (arr === null || arr === undefined) {
      return [];
    }
    const result: RecipeIngredient[] = [];
    for (const obj of arr) {
      result.push(RecipeIngredient.fromJson(obj));
    }
    return result;
  }
}

@ObservedV2
export class RecipeStep {
  @Trace id: string = '';
  @Trace sort: number = 0;
  @Trace content: string = '';
  @Trace image: string = '';

  static fromJson(obj: Record<string, Object>): RecipeStep {
    const item: RecipeStep = new RecipeStep();
    item.id = JsonSafe.string(obj, 'id');
    item.sort = JsonSafe.number(obj, 'sort');
    item.content = JsonSafe.string(obj, 'content');
    item.image = JsonSafe.string(obj, 'image');
    return item;
  }

  static fromJsonArray(arr: Record<string, Object>[]): RecipeStep[] {
    if (arr === null || arr === undefined) {
      return [];
    }
    const result: RecipeStep[] = [];
    for (const obj of arr) {
      result.push(RecipeStep.fromJson(obj));
    }
    return result;
  }
}

@ObservedV2
export class RecipeTip {
  @Trace id: string = '';
  @Trace sort: number = 0;
  @Trace content: string = '';

  static fromJson(obj: Record<string, Object>): RecipeTip {
    const item: RecipeTip = new RecipeTip();
    item.id = JsonSafe.string(obj, 'id');
    item.sort = JsonSafe.number(obj, 'sort');
    item.content = JsonSafe.string(obj, 'content');
    return item;
  }

  static fromJsonArray(arr: Record<string, Object>[]): RecipeTip[] {
    if (arr === null || arr === undefined) {
      return [];
    }
    const result: RecipeTip[] = [];
    for (const obj of arr) {
      result.push(RecipeTip.fromJson(obj));
    }
    return result;
  }
}

@ObservedV2
export class RecipeTag {
  @Trace id: string = '';
  @Trace name: string = '';
  @Trace recipeCount: number = 0;
  @Trace sort: number = 0;

  static fromJson(obj: Record<string, Object>): RecipeTag {
    const tag: RecipeTag = new RecipeTag();
    tag.id = JsonSafe.string(obj, 'id');
    tag.name = JsonSafe.string(obj, 'name');
    tag.recipeCount = JsonSafe.number(obj, 'recipeCount');
    tag.sort = JsonSafe.number(obj, 'sort');
    return tag;
  }

  static fromJsonArray(arr: Record<string, Object>[]): RecipeTag[] {
    if (arr === null || arr === undefined) {
      return [];
    }
    const result: RecipeTag[] = [];
    for (const obj of arr) {
      result.push(RecipeTag.fromJson(obj));
    }
    return result;
  }
}

@ObservedV2
export class RecipeDetail {
  @Trace id: string = '';
  @Trace name: string = '';
  @Trace coverImage: string = '';
  @Trace summary: string = '';
  @Trace difficulty: number = 0;
  @Trace calorie: number = 0;
  @Trace cookTime: number = 0;
  @Trace baseServings: number = 0;
  @Trace tagId: string = '';
  @Trace tagName: string = '';
  @Trace favoriteCount: number = 0;
  @Trace likeCount: number = 0;
  @Trace favorited: boolean = false;
  @Trace liked: boolean = false;
  @Trace ingredients: RecipeIngredient[] = [];
  @Trace steps: RecipeStep[] = [];
  @Trace tips: RecipeTip[] = [];

  static fromJson(obj: Record<string, Object>): RecipeDetail {
    const detail: RecipeDetail = new RecipeDetail();
    detail.id = JsonSafe.string(obj, 'id');
    detail.name = JsonSafe.string(obj, 'name');
    detail.coverImage = JsonSafe.string(obj, 'coverImage');
    detail.summary = JsonSafe.string(obj, 'summary');
    detail.difficulty = JsonSafe.number(obj, 'difficulty');
    detail.calorie = JsonSafe.number(obj, 'calorie');
    detail.cookTime = JsonSafe.number(obj, 'cookTime');
    detail.baseServings = JsonSafe.number(obj, 'baseServings');
    detail.tagId = JsonSafe.string(obj, 'tagId');
    detail.tagName = JsonSafe.string(obj, 'tagName');
    detail.favoriteCount = JsonSafe.number(obj, 'favoriteCount');
    detail.likeCount = JsonSafe.number(obj, 'likeCount');
    detail.favorited = JsonSafe.boolean(obj, 'favorited');
    detail.liked = JsonSafe.boolean(obj, 'liked');
    detail.ingredients = RecipeIngredient.fromJsonArray(JsonSafe.arr(obj, 'ingredients'));
    detail.steps = RecipeStep.fromJsonArray(JsonSafe.arr(obj, 'steps'));
    detail.tips = RecipeTip.fromJsonArray(JsonSafe.arr(obj, 'tips'));
    return detail;
  }
}

export enum RecipeSort {
  LATEST = 'latest',
  FAVORITE = 'favorite',
  LIKE = 'like'
}

export class RecipeQuery {
  tagId: string = '';
  keyword: string = '';
  sort: RecipeSort = RecipeSort.LATEST;
  difficulties: number[] = [];
  maxCookTime: number = 0;
  minCookTime: number = 0;
  page: number = 1;
  size: number = 20;
}

export function displayAmount(ing: RecipeIngredient, current: number, base: number): number {
  if (!ing.isConvertible || base <= 0) {
    return ing.amount;
  }
  return ing.amount * current / base;
}
