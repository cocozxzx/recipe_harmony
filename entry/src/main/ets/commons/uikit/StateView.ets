import { curves } from '@kit.ArkUI';
import { PageStatus } from '../model/PageState';
import { SkeletonBox } from './SkeletonBox';

/**
 * 四态容器：加载中（骨架屏）/ 有数据 / 空状态 / 加载失败（可重试）。
 *
 * 所有列表页必须走这个组件，不允许出现白屏——这是编码红线之一。
 * 骨架屏可由调用方通过 `skeleton` 传入页面专属版本，不传则用通用列表骨架。
 */
@ComponentV2
export struct StateView {
  @Param status: PageStatus = PageStatus.LOADING;
  @Param errorMessage: string = '';
  @Param emptyText: ResourceStr = $r('app.string.common_empty');
  @Param emptyActionText: ResourceStr = '';
  @Event onRetry: () => void = () => {};
  @Event onEmptyAction: () => void = () => {};

  @BuilderParam content: () => void;
  @BuilderParam skeleton: () => void = this.defaultSkeleton;

  @Builder
  defaultSkeleton() {
    Column({ space: 16 }) {
      ForEach([0, 1, 2, 3, 4], (index: number) => {
        Row({ space: 12 }) {
          SkeletonBox({ boxWidth: 96, boxHeight: 72, radius: $r('app.float.radius_md') })
          Column({ space: 8 }) {
            SkeletonBox({ boxWidth: '70%', boxHeight: 16 })
            SkeletonBox({ boxWidth: '45%', boxHeight: 12 })
            SkeletonBox({ boxWidth: '30%', boxHeight: 12 })
          }
          .alignItems(HorizontalAlign.Start)
          .layoutWeight(1)
        }
        .width('100%')
      }, (index: number) => index.toString())
    }
    .width('100%')
    .padding($r('app.float.space_lg'))
  }

  @Builder
  placeholder(image: Resource, text: ResourceStr, actionText: ResourceStr, action: () => void) {
    Column({ space: 12 }) {
      Image(image)
        .width($r('app.float.img_empty'))
        .height($r('app.float.img_empty'))
        .objectFit(ImageFit.Contain)
        .transition(
          TransitionEffect.OPACITY.combine(TransitionEffect.scale({ x: 0.9, y: 0.9 }))
            .animation({ curve: curves.springMotion(0.55, 0.825) })
        )
      Text(text)
        .fontSize($r('app.float.font_body'))
        .fontColor($r('app.color.text_secondary'))
        .textAlign(TextAlign.Center)
      if (actionText !== '') {
        Button(actionText)
          .height($r('app.float.button_height'))
          .constraintSize({ minWidth: $r('app.float.empty_btn_w') })
          .backgroundColor($r('app.color.brand_primary_light'))
          .fontColor($r('app.color.brand_primary'))
          .fontSize($r('app.float.font_title_sm'))
          .borderRadius($r('app.float.radius_md'))
          .onClick(() => action())
      }
    }
    .width('100%')
    .padding($r('app.float.space_xl'))
    .justifyContent(FlexAlign.Center)
  }

  build() {
    Stack() {
      if (this.status === PageStatus.LOADING) {
        this.skeleton()
      } else if (this.status === PageStatus.SUCCESS) {
        this.content()
      } else if (this.status === PageStatus.EMPTY) {
        this.placeholder(
          $r('app.media.img_empty'),
          this.emptyText,
          this.emptyActionText,
          () => this.onEmptyAction()
        )
      } else {
        this.placeholder(
          $r('app.media.img_error'),
          this.errorMessage.length > 0 ? this.errorMessage : $r('app.string.common_error'),
          $r('app.string.common_retry'),
          () => this.onRetry()
        )
      }
    }
    .width('100%')
    .height('100%')
    .align(this.status === PageStatus.SUCCESS ? Alignment.TopStart : Alignment.Center)
  }
}
