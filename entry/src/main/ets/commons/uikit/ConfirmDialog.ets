@CustomDialog
export struct ConfirmDialog {
  controller?: CustomDialogController;
  title: ResourceStr = '';
  desc: ResourceStr = '';
  confirmText: ResourceStr = $r('app.string.common_confirm');
  cancelText: ResourceStr = $r('app.string.common_cancel');
  danger: boolean = false;
  onConfirm: () => void = () => {};

  build() {
    Column({ space: 16 }) {
      Text(this.title)
        .fontSize($r('app.float.font_title'))
        .fontWeight(FontWeight.Medium)
        .fontColor($r('app.color.text_primary'))
        .textAlign(TextAlign.Center)
        .width('100%')

      if (this.desc !== '') {
        Text(this.desc)
          .fontSize($r('app.float.font_body_sm'))
          .fontColor($r('app.color.text_secondary'))
          .lineHeight(22)
          .width('100%')
      }

      Row({ space: 12 }) {
        Button(this.cancelText)
          .type(ButtonType.Normal)
          .layoutWeight(1)
          .height($r('app.float.button_height'))
          .borderRadius($r('app.float.radius_md'))
          .backgroundColor($r('app.color.bg_sunken'))
          .fontColor($r('app.color.text_secondary'))
          .fontSize($r('app.float.font_title_sm'))
          .onClick(() => {
            const ctrl: CustomDialogController | undefined = this.controller;
            if (ctrl !== undefined && ctrl !== null) {
              ctrl.close();
            }
          })

        Button(this.confirmText)
          .type(ButtonType.Normal)
          .layoutWeight(1)
          .height($r('app.float.button_height'))
          .borderRadius($r('app.float.radius_md'))
          .backgroundColor(this.danger ? $r('app.color.state_error') : $r('app.color.brand_primary'))
          .fontColor($r('app.color.text_on_brand'))
          .fontSize($r('app.float.font_title_sm'))
          .onClick(() => {
            const ctrl: CustomDialogController | undefined = this.controller;
            if (ctrl !== undefined && ctrl !== null) {
              ctrl.close();
            }
            this.onConfirm();
          })
      }
      .width('100%')
    }
    .width('100%')
    .padding($r('app.float.space_xl'))
    .backgroundColor($r('app.color.bg_surface'))
    .borderRadius($r('app.float.radius_lg'))
  }
}
