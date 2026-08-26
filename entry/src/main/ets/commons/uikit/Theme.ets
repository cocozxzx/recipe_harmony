import { curves } from '@kit.ArkUI';

export class Shadows {
  static readonly card: ShadowOptions = {
    radius: 8, color: '#0F2D3A34', offsetX: 0, offsetY: 2
  };
  static readonly float: ShadowOptions = {
    radius: 16, color: '#142D3A34', offsetX: 0, offsetY: 4
  };
}

export class Motion {
  static readonly duration: number = 250;
  /** 华为官方推荐弹簧曲线，物理自然感，取代硬编码 Curve.EaseOut */
  static readonly springCurve: ICurve = curves.springMotion(0.55, 0.825);
  /** 弹跳用更快的弹簧：response=0.3 快速回弹，dampingFraction=0.6 欠阻尼可过冲 */
  static readonly bounceCurve: ICurve = curves.springMotion(0.3, 0.6);
  /** 跟手弹簧曲线，用于手势/触摸反馈 */
  static readonly responsiveCurve: ICurve = curves.responsiveSpringMotion(0.55, 0.825);
  /** 点击反馈：缩放至 0.97 */
  static readonly pressScale: number = 0.97;
  /** 骨架屏微光循环 */
  static readonly skeletonDuration: number = 1200;

  static standard(): AnimateParam {
    return { duration: Motion.duration, curve: Motion.springCurve };
  }

  static bounce(): AnimateParam {
    return { curve: Motion.bounceCurve };
  }
}

/** 字重与规范表一一对应，避免各页面随手写数字 */
export class Weights {
  static readonly display: FontWeight = FontWeight.Bold;      // 700
  static readonly section: FontWeight = FontWeight.Medium;    // 600 近似
  static readonly cardTitle: FontWeight = FontWeight.Medium;  // 500
  static readonly body: FontWeight = FontWeight.Normal;       // 400
}

/** 正文行高 1.6，用于步骤描述这类多行文本 */
export const BODY_LINE_HEIGHT: number = 24;
