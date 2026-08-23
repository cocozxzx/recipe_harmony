import { AiGeneratedRecipe, AiRecipeMatch } from '../../model/Ai';

/**
 * POST /ai/chat 的 SSE 事件载荷。
 * 每个事件名对应一个 data 结构，解析时按 event 名选择断言的类型。
 */

export interface AiIntentParsedDto {
  ingredients: string[];
  keywords: string[];
  maxCookTime: number;
  maxCalorie: number;
}

/** event: intent —— 必定第一个到达，前端据此切换加载文案 */
export interface AiIntentEventDto {
  scene: string;                  // AiScene 的字符串值
  parsed: AiIntentParsedDto;
}

/** event: recipes —— 与 generated 互斥 */
export interface AiRecipesEventDto {
  matches: AiRecipeMatch[];
}

/** event: generating —— delta 是增量文本，追加到 AiMessage.text */
export interface AiGeneratingEventDto {
  delta: string;
}

/** event: generated —— 兜底生成完成 */
export interface AiGeneratedEventDto {
  recipe: AiGeneratedRecipe;
}

/** event: error */
export interface AiErrorEventDto {
  message: string;
}

export class AiEventName {
  static readonly INTENT: string = 'intent';
  static readonly RECIPES: string = 'recipes';
  static readonly GENERATING: string = 'generating';
  static readonly GENERATED: string = 'generated';
  static readonly ERROR: string = 'error';
  static readonly DONE: string = 'done';
}
