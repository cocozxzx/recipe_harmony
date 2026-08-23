import type { HeaderOptions, HttpRequestOption } from './ImageKnifeOption';
import type { ImageKnifeRequest } from './ImageKnifeRequest';
import type { IEngineKey } from '../key/IEngineKey';
import type { PixelMapTransformation } from '../transform/PixelMapTransformation';
import type common from "@ohos:app.ability.common";
import type { Size } from "@ohos:arkui.node";
import type { DownsampleStrategy } from '../downsampling/DownsampleStartegy';
import type List from "@ohos:util.List";
import type sendableImage from "@ohos:multimedia.sendableImage";
import type http from "@ohos:net.http";
export interface ImageKnifeData {
    source: PixelMap | string; // url
    imageWidth: number; // 原始宽高大小
    imageHeight: number;
    bufSize?: number; // 图片的字节数
    type?: string;
    httpCode?: number; // 网络请求状态码及错误码
    imageAnimator?: Array<ImageFrameInfo>;
    frameCount?: number; // 帧
    decodeImages?: Array<DecodeImageInfo>; //Image组件或者ImageAnimator组件可以加载一张或者多张
    timeInfo?: TimeInfo; // 加载图片的各个时间点
    errorInfo?: ErrorInfo; // 错误
}
/**
 * 解码后的图片的size
 */
export interface DecodeImageInfo {
    contentWidth?: number; // 解码后宽高
    contentHeight?: number;
    contentSize?: number; // 大小
}
/**
 * 加载的错误信息
 */
export interface ErrorInfo {
    phase: string; //图片加载阶段信息，如：网络加载阶段，缓存获取阶段及其解码阶段等
    code: number;
}
/**
 * load检查时间点
 */
export interface TimeInfo {
    requestStartTime?: number;
    requestEndTime?: number;
    requestCancelTime?: number;
    memoryCheckStartTime?: number;
    memoryCheckEndTime?: number;
    diskCheckStartTime?: number;
    diskCheckEndTime?: number;
    netRequestStartTime?: number;
    netRequestEndTime?: number;
    decodeStartTime?: number;
    decodeEndTime?: number;
}
/**
 * onComplete成功回调
 */
export interface EventImage {
    width: number;
    height: number;
    componentWidth: number;
    componentHeight: number;
    loadingStatus: number;
    contentWidth: number;
    contentHeight: number;
    contentOffsetX: number;
    contentOffsetY: number;
}
/**
 * 缓存策略
 */
export enum CacheStrategy {
    // 默认-写入/读取内存和文件缓存
    Default = 0,
    // 只写入/读取内存缓存
    Memory = 1,
    // 只写入/读取文件缓存
    File = 2
}
/**
 * 区分是src,placehodler,还是error_holder
 */
export enum ImageKnifeRequestSource {
    SRC = 0,
    PLACE_HOLDER = 1,
    ERROR_HOLDER = 2
}
export interface ImageKnifeRequestWithSource {
    request: ImageKnifeRequest;
    source: ImageKnifeRequestSource;
}
export interface ImageKnifeCheckRequest {
    memoryKey: string;
    requestList: List<ImageKnifeRequestWithSource>;
}
/**
 * request子线程处理时的返回
 */
export interface RequestJobResult {
    pixelMap: sendableImage.PixelMap | string | undefined;
    bufferSize: number;
    fileKey: string;
    loadFail?: string;
    size?: Size;
    type?: string;
    pixelMapList?: Array<sendableImage.PixelMap>;
    delayList?: Array<number>;
    imageKnifeData?: ImageKnifeData;
}
/**
 * request子线程处理时的请求参数
 */
export interface RequestJobRequest {
    context: common.UIAbilityContext;
    src: string | number;
    headers?: Array<HeaderOptions>;
    allHeaders: Map<string, Object>;
    componentWidth: number;
    componentHeight: number;
    customGetImage?: (context: Context, src: string | PixelMap | Resource, headers?: Record<string, Object>, httpOption?: HttpRequestOption) => Promise<ArrayBuffer | undefined>;
    onlyRetrieveFromCache?: boolean;
    requestSource: ImageKnifeRequestSource;
    transformation?: PixelMapTransformation;
    writeCacheStrategy?: CacheStrategy;
    signature?: string;
    engineKey: IEngineKey;
    isWatchProgress: boolean;
    memoryKey: string;
    fileCacheFolder: string;
    isAnimator?: boolean;
    moduleName?: string;
    resName?: string;
    targetWidth: number;
    targetHeight: number;
    downsampType: DownsampleStrategy;
    isAutoImageFit: boolean;
    componentId?: number;
    componentVersion?: number;
    caPath?: string;
    connectTimeout?: number;
    readTimeout?: number;
    dnsOverHttps?: string;
    dnsServers?: Array<string>;
    remoteValidation?: http.RemoteValidation;
    pixelName?: string;
    dynamicRangeMode?: DynamicRangeMode;
    jpegOptimizeDecoding?: boolean;
}
export interface FlipRotate {
    horizontal: boolean;
    vertical: boolean;
    rotate: number;
}
