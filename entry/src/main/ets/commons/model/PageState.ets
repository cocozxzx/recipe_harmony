/** 列表 / 页面的四态。所有列表页必须走 StateView 渲染这四态，不允许白屏。 */
export enum PageStatus {
  LOADING,
  SUCCESS,
  EMPTY,
  ERROR
}

@ObservedV2
export class PageState {
  @Trace status: PageStatus = PageStatus.LOADING;
  @Trace errorMessage: string = '';

  loading(): void {
    this.status = PageStatus.LOADING;
    this.errorMessage = '';
  }

  /** 有数据走 SUCCESS，无数据走 EMPTY —— 由调用方传入判定结果，避免各页面重复写三元 */
  success(hasData: boolean): void {
    this.status = hasData ? PageStatus.SUCCESS : PageStatus.EMPTY;
    this.errorMessage = '';
  }

  error(message: string): void {
    this.status = PageStatus.ERROR;
    this.errorMessage = message;
  }
}
