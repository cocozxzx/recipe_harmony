/**
 * 接口传输结构。全部用 interface 定义，配合 `JSON.parse(str) as XxxDto` 使用。
 * ArkTS 不支持 JSON.parse 结果直接当对象用，转换代码统一收在 Repository 层。
 */

export interface ApiResponseDto<T> {
  code: number;
  message: string;
  data: T;
}

export interface PageResultDto<T> {
  list: T[];
  total: number;
  page: number;
  size: number;
  hasMore: boolean;
}

/** 收藏 / 点赞接口的返回体 */
export interface CountResultDto {
  favoriteCount: number;
  likeCount: number;
}

/** 头像上传返回体 */
export interface UploadResultDto {
  url: string;
}

/** 刷新 token 返回体 */
export interface RefreshResultDto {
  token: string;
  refreshToken: string;
}

/** 空响应占位，用于 data 为 null 的接口 */
export interface EmptyDto {
}
