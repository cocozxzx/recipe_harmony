import { AiGeneratedRecipe, AiMessage, AiResultType, AiRole, AiScene } from '../../../commons/model/Ai';
import { readableMessage } from '../../../commons/network/Errors';
import { SseClient, SseEvent, SseHandler } from '../../../commons/network/SseClient';
import {
  AiEventName,
  AiErrorEventDto,
  AiGeneratedEventDto,
  AiGeneratingEventDto,
  AiIntentEventDto,
  AiRecipesEventDto
} from '../../../commons/network/dto/AiDto';
import { Toast } from '../../../commons/uikit/Toast';
import { Logger } from '../../../commons/utils/Logger';
import { Strings } from '../../../commons/utils/Strings';
import { AiRepository } from '../repository/AiRepository';

const TAG: string = 'AiViewModel';

/**
 * AI 对话状态机。
 *
 * 两个场景在同一入口自然分流——用户不需要先选"我要用哪个功能"，
 * 意图由后端判定并通过第一个 `intent` 事件告知前端。
 *
 * SSE 事件 → 消息状态的映射全部收在这里，View 只负责按 resultType 渲染。
 */
@ObservedV2
export class AiViewModel {
  @Trace messages: AiMessage[] = [];
  @Trace input: string = '';
  @Trace streaming: boolean = false;

  private client: SseClient | null = null;
  private current: AiMessage | null = null;
  private seq: number = 0;

  get canSend(): boolean {
    return this.input.trim().length > 0 && !this.streaming;
  }

  /** 从首页 / 搜索空结果跳过来时带的预填文案 */
  prefill(text: string): void {
    if (text.length > 0) {
      this.input = text;
    }
  }

  send(text: string): void {
    const message: string = text.trim();
    if (message.length === 0 || this.streaming) {
      return;
    }
    this.input = '';
    this.seq += 1;
    const userMessage: AiMessage = AiMessage.user(`u${this.seq}`, message);
    this.seq += 1;
    const assistant: AiMessage = AiMessage.assistant(`a${this.seq}`);
    assistant.hint = Strings.get($r('app.string.ai_thinking'));

    this.messages = this.messages.concat([userMessage, assistant]);
    this.current = assistant;
    this.streaming = true;

    const handler: SseHandler = {
      onEvent: (event: SseEvent) => this.onEvent(event),
      onError: (msg: string) => this.onStreamError(msg),
      onComplete: () => this.onComplete()
    };
    this.client = AiRepository.chat(message, handler);
  }

  /** 用户点"停止生成"。已经流出来的内容保留，不回滚。 */
  stop(): void {
    this.client?.cancel();
    this.client = null;
    this.finishCurrent();
  }

  /** 页面销毁时必须调用，否则流会在后台继续跑 */
  dispose(): void {
    this.client?.cancel();
    this.client = null;
  }

  retryLast(): void {
    const list: AiMessage[] = this.messages;
    for (let i = list.length - 1; i >= 0; i--) {
      if (list[i].role === AiRole.USER) {
        this.send(list[i].text);
        return;
      }
    }
  }

  private onEvent(event: SseEvent): void {
    const message: AiMessage | null = this.current;
    if (message === null) {
      return;
    }
    try {
      if (event.event === AiEventName.INTENT) {
        const dto: AiIntentEventDto = JSON.parse(event.data) as AiIntentEventDto;
        message.hint = this.hintForScene(dto.scene);
      } else if (event.event === AiEventName.RECIPES) {
        const dto: AiRecipesEventDto = JSON.parse(event.data) as AiRecipesEventDto;
        message.recipes = dto.matches;
        message.resultType = AiResultType.RECIPES;
        message.hint = '';
      } else if (event.event === AiEventName.GENERATING) {
        const dto: AiGeneratingEventDto = JSON.parse(event.data) as AiGeneratingEventDto;
        message.text += dto.delta;
        message.hint = '';
      } else if (event.event === AiEventName.GENERATED) {
        const dto: AiGeneratedEventDto = JSON.parse(event.data) as AiGeneratedEventDto;
        message.generated = dto.recipe;
        message.resultType = AiResultType.GENERATED;
        message.hint = '';
      } else if (event.event === AiEventName.ERROR) {
        const dto: AiErrorEventDto = JSON.parse(event.data) as AiErrorEventDto;
        this.onStreamError(dto.message);
      } else if (event.event === AiEventName.DONE) {
        this.finishCurrent();
      }
    } catch (e) {
      Logger.e(TAG, `parse event ${event.event} failed`, e as Object);
    }
  }

  private onStreamError(message: string): void {
    const current: AiMessage | null = this.current;
    if (current !== null) {
      current.failed = true;
      current.streaming = false;
      current.hint = '';
      if (current.text.length === 0) {
        current.text = message;
      }
    }
    this.current = null;
    this.client = null;
    this.streaming = false;
  }

  private onComplete(): void {
    this.finishCurrent();
  }

  private finishCurrent(): void {
    const current: AiMessage | null = this.current;
    if (current !== null) {
      current.streaming = false;
      current.hint = '';
    }
    this.current = null;
    this.streaming = false;
  }

  private hintForScene(scene: string): string {
    if (scene === AiScene.FALLBACK_GENERATE as string) {
      return Strings.get($r('app.string.ai_generating'));
    }
    return Strings.get($r('app.string.ai_searching'));
  }

  /** 收藏 AI 生成的食谱。它不进 recipe 表、不计入榜单，单独存一份收藏关系。 */
  async toggleGeneratedFavorite(message: AiMessage): Promise<void> {
    const recipe: AiGeneratedRecipe | null = message.generated;
    if (recipe === null) {
      return;
    }
    const target: boolean = !recipe.favorited;
    recipe.favorited = target;
    // 重新赋值以触发 @Trace 的引用变更通知
    message.generated = recipe;
    try {
      if (target) {
        await AiRepository.favorite(recipe.id);
      } else {
        await AiRepository.unfavorite(recipe.id);
      }
      Toast.show(target ? $r('app.string.favorite_added') : $r('app.string.favorite_removed'));
    } catch (e) {
      Logger.e(TAG, 'toggle ai favorite failed', e as Object);
      recipe.favorited = !target;
      message.generated = recipe;
      Toast.show(readableMessage(e as Object));
    }
  }
}
