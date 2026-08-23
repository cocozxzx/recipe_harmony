/**
 * 设计规范中无法放进资源文件的常量。
 * 色值、间距、圆角、字号一律走 $r('app.color.xxx') / $r('app.float.xxx')，不要往这里加。
 */
export class Shadows {
    /** 卡片阴影。只有卡片和浮起元素才有阴影，列表项之间用 divider 分隔线。 */
    static readonly card: ShadowOptions = {
        radius: 8, color: '#0F2D3A34', offsetX: 0, offsetY: 2
    };
    static readonly float: ShadowOptions = {
        radius: 16, color: '#142D3A34', offsetX: 0, offsetY: 4
    };
}
export class Motion {
    /** 转场与状态切换统一 250ms EaseOut。小清新的关键是克制，不做花哨动效。 */
    static readonly duration: number = 250;
    static readonly curve: Curve = Curve.EaseOut;
    /** 点击反馈：缩放至 0.97，150ms */
    static readonly pressDuration: number = 150;
    static readonly pressScale: number = 0.97;
    /** 骨架屏微光循环 */
    static readonly skeletonDuration: number = 1200;
    /** 收藏/点赞点击弹跳 */
    static readonly bounceDuration: number = 200;
    static standard(): AnimateParam {
        return { duration: Motion.duration, curve: Motion.curve };
    }
}
/** 字重与规范表一一对应，避免各页面随手写数字 */
export class Weights {
    static readonly display: FontWeight = FontWeight.Bold; // 700
    static readonly section: FontWeight = FontWeight.Medium; // 600 近似
    static readonly cardTitle: FontWeight = FontWeight.Medium; // 500
    static readonly body: FontWeight = FontWeight.Normal; // 400
}
/** 正文行高 1.6，用于步骤描述这类多行文本 */
export const BODY_LINE_HEIGHT: number = 24;
