import type { BaseTransformation } from './BaseTransformation';
/**
 * 基于PixelMap的图片变换
 */
export abstract class PixelMapTransformation implements BaseTransformation<PixelMap> {
    constructor() {
        "use sendable";
    }
    transform(context: Context, toTransform: PixelMap, width: number, height: number): Promise<PixelMap> {
        throw new Error('Method not implemented.');
    }
    getName(): string {
        return this.constructor.name;
    }
}
