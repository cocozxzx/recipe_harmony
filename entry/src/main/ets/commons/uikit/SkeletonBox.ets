import { Motion } from './Theme';

/**
 * 骨架屏基础块。微光循环 1200ms。
 * 组合使用即可拼出各页面的骨架，不必为每个页面单独画一套。
 */
@ComponentV2
export struct SkeletonBox {
  @Param boxWidth: Length = '100%';
  @Param boxHeight: Length = 16;
  @Param radius: Length = $r('app.float.radius_sm');
  @Local shine: number = 0;

  aboutToAppear(): void {
    this.startShine();
  }

  private startShine(): void {
    animateTo({
      duration: Motion.skeletonDuration,
      curve: Curve.EaseInOut,
      iterations: -1,
      playMode: PlayMode.Alternate
    }, () => {
      this.shine = 1;
    });
  }

  build() {
    Row()
      .width(this.boxWidth)
      .height(this.boxHeight)
      .borderRadius(this.radius)
      .backgroundColor($r('app.color.skeleton_base'))
      .opacity(0.5 + this.shine * 0.5)
  }
}
