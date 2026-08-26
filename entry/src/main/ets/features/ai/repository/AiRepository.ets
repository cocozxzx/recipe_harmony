import { AiGeneratedRecipe } from '../../../commons/model/Ai';
import { ApiPaths } from '../../../commons/network/ApiPaths';
import { HttpClient, QueryParams } from '../../../commons/network/HttpClient';
import { SseClient, SseHandler } from '../../../commons/network/SseClient';
import { EmptyDto, PageResultDto } from '../../../commons/network/dto/Common';
import { AiChatReq } from '../../../commons/network/dto/Requests';

export class AiRepository {
  static chat(message: string, handler: SseHandler): SseClient {
    const client: SseClient = new SseClient(handler);
    const body: AiChatReq = { message: message };
    client.start(ApiPaths.AI_CHAT, body);
    return client;
  }

  static async getGeneratedRecipe(id: string): Promise<AiGeneratedRecipe> {
    const raw: Record<string, Object> = await HttpClient.get<Record<string, Object>>(ApiPaths.aiRecipeDetail(id));
    return AiGeneratedRecipe.fromJson(raw);
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
    const raw: PageResultDto<Record<string, Object>> = await HttpClient.get<PageResultDto<Record<string, Object>>>(ApiPaths.ME_AI_RECIPES, params);
    const list: AiGeneratedRecipe[] = AiGeneratedRecipe.fromJsonArray(
      Array.isArray(raw.list) ? raw.list as Record<string, Object>[] : []);
    return {
      list: list,
      total: raw.total,
      page: raw.page,
      size: raw.size,
      hasMore: raw.hasMore
    };
  }
}
