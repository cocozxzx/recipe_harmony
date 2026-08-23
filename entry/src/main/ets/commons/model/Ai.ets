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

export interface AiRecipeMatch {
  recipe: RecipeListItem;
  matchRate: number;                        // 食材重合度 0-100
  missingIngredients: string[];             // "还缺 XX"
}

export interface AiGeneratedRecipe {
  id: string;
  name: string;
  summary: string;
  difficulty: number;
  calorie: number;
  cookTime: number;
  baseServings: number;
  ingredients: RecipeIngredient[];
  steps: RecipeStep[];
  tips: RecipeTip[];
  favorited: boolean;
  createTime: string;
}

/**
 * 对话消息。流式过程中需要局部刷新（逐字追加 text），
 * 所以必须是 @ObservedV2 class 而非 interface。
 */
@ObservedV2
export class AiMessage {
  @Trace id: string = '';
  @Trace role: AiRole = AiRole.USER;
  @Trace text: string = '';                 // 流式增量拼接
  @Trace resultType: AiResultType = AiResultType.TEXT;
  @Trace recipes: AiRecipeMatch[] = [];
  @Trace generated: AiGeneratedRecipe | null = null;
  @Trace streaming: boolean = false;        // true 时显示光标动效
  @Trace failed: boolean = false;
  @Trace hint: string = '';                 // 流式过程中的阶段文案（"正在理解你的需求…"）

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
