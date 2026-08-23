import type { AiGeneratedRecipe } from '../../../commons/model/Ai';
import { ApiPaths } from "@bundle:com.eatapp.recipe/entry/ets/commons/network/ApiPaths";
import { HttpClient, QueryParams } from "@bundle:com.eatapp.recipe/entry/ets/commons/network/HttpClient";
import { SseClient } from "@bundle:com.eatapp.recipe/entry/ets/commons/network/SseClient";
import type { SseHandler } from "@bundle:com.eatapp.recipe/entry/ets/commons/network/SseClient";
import type { EmptyDto, PageResultDto } from '../../../commons/network/dto/Common';
import type { AiChatReq } from '../../../commons/network/dto/Requests';
/**
 * AI 能力的数据来源。
 * 对话走 SSE 流式（`POST /ai/chat`），其余是普通 REST。
 */
export class AiRepository {
    /**
     * 发起一轮对话。返回 SseClient 以便调用方随时取消。
     * 事件解析在 ViewModel 里做——那里才知道当前消息是哪一条。
     */
    static chat(message: string, handler: SseHandler): SseClient {
        const client: SseClient = new SseClient(handler);
        const body: AiChatReq = { message: message };
        client.start(ApiPaths.AI_CHAT, body);
        return client;
    }
    static async getGeneratedRecipe(id: string): Promise<AiGeneratedRecipe> {
        return HttpClient.get<AiGeneratedRecipe>(ApiPaths.aiRecipeDetail(id));
    }
    static async favorite(id: string): Promise<void> {
        await HttpClient.post<EmptyDto>(ApiPaths.aiRecipeFavorite(id));
    }
    static async unfavorite(id: string): Promise<void> {
        await HttpClient.del<EmptyDto>(ApiPaths.aiRecipeFavorite(id));
    }
    static async getMyAiRecipes(page: number, size: number): Promise<PageResultDto<AiGeneratedRecipe>> {
        const params: QueryParams = new QueryParams();
        params.putNumber('page', page);
        params.putNumber('size', size);
        return HttpClient.get<PageResultDto<AiGeneratedRecipe>>(ApiPaths.ME_AI_RECIPES, params);
    }
}
