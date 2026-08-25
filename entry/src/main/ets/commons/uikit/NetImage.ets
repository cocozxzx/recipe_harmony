import { ImageKnifeComponent, ImageKnifeOption } from '@ohos/imageknife';
import { MediaUrl } from '../network/MediaUrl';

/**
 * 网络图片统一入口。内存 + 磁盘二级缓存由 ImageKnife 提供。
 *
 * 全项目禁止直接写 `Image(网络URL)`——那样没有缓存，
 * 列表滚动时会反复走网络，也没有占位图，图片到达前布局会抖。
 *
 * 列表页一律传缩略图 URL，详情页封面才用中图。
 *
 * 传进来的 url 可以是后端下发的站内相对路径，这里统一补全成绝对地址，
 * 调用方不必关心后端存的是相对路径还是 OSS 绝对地址。
 */
@ComponentV2
export struct NetImage {
  @Param url: string = '';
  @Param imgWidth: Length = '100%';
  @Param imgHeight: Length = '100%';
  @Param radius: Length = 0;
  @Param fit: ImageFit = ImageFit.Cover;

  build() {
    Stack() {
      if (this.src().length === 0) {
        // 空 URL 直接渲染占位图，避免 ImageKnife 走一次无谓的失败流程
        Image($r('app.media.img_placeholder'))
          .width('100%')
          .height('100%')
          .objectFit(this.fit)
      } else {
        ImageKnifeComponent({
          imageKnifeOption: {
            loadSrc: this.src(),
            placeholderSrc: $r('app.media.img_placeholder'),
            errorholderSrc: $r('app.media.img_placeholder'),
            objectFit: this.fit
          }
        })
          .width('100%')
          .height('100%')
      }
    }
    .width(this.imgWidth)
    .height(this.imgHeight)
    .borderRadius(this.radius)
    .clip(true)
    .backgroundColor($r('app.color.bg_sunken'))
  }

  private src(): string {
    return MediaUrl.resolve(this.url);
  }
}
