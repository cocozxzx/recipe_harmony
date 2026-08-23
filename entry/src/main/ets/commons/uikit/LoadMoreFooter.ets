export enum LoadMoreStatus {
  IDLE,
  LOADING,
  NO_MORE,
  FAILED
}

/** 列表底部的加载更多状态。分页统一下拉加载，不做页码。 */
@ComponentV2
export struct LoadMoreFooter {
  @Param status: LoadMoreStatus = LoadMoreStatus.IDLE;
  @Event onRetry: () => void = () => {};

  build() {
    Row({ space: 8 }) {
      if (this.status === LoadMoreStatus.LOADING) {
        LoadingProgress()
          .width($r('app.float.icon_md'))
          .height($r('app.float.icon_md'))
          .color($r('app.color.text_tertiary'))
        Text($r('app.string.common_loading'))
          .fontSize($r('app.float.font_caption'))
          .fontColor($r('app.color.text_tertiary'))
      } else if (this.status === LoadMoreStatus.NO_MORE) {
        Text($r('app.string.common_no_more'))
          .fontSize($r('app.float.font_caption'))
          .fontColor($r('app.color.text_tertiary'))
      } else if (this.status === LoadMoreStatus.FAILED) {
        Text($r('app.string.common_load_failed_retry'))
          .fontSize($r('app.float.font_caption'))
          .fontColor($r('app.color.brand_primary'))
          .onClick(() => this.onRetry())
      }
    }
    .width('100%')
    .height(this.status === LoadMoreStatus.IDLE ? 0 : 48)
    .justifyContent(FlexAlign.Center)
  }
}
