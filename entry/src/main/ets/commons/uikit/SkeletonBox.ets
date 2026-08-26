import { curves } from '@kit.ArkUI';
import { Motion } from './Theme';

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
      curve: curves.springMotion(0.55, 0.825),
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
      .transition(TransitionEffect.OPACITY)
  }
}
