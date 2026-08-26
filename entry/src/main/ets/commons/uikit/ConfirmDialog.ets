import { ComponentContent } from '@kit.ArkUI';

export class ConfirmParams {
  title: ResourceStr = '';
  desc: ResourceStr = '';
  confirmText: ResourceStr = $r('app.string.common_confirm');
  cancelText: ResourceStr = $r('app.string.common_cancel');
  danger: boolean = false;
  onConfirm: () => void = () => {};
}

@ComponentV2
struct ConfirmDialogContent {
  @Param title: ResourceStr = '';
  @Param desc: ResourceStr = '';
  @Param confirmText: ResourceStr = $r('app.string.common_confirm');
  @Param cancelText: ResourceStr = $r('app.string.common_cancel');
  @Param danger: boolean = false;
  @Event onConfirm: () => void = () => {};
  @Event onCancel: () => void = () => {};

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
          .onClick(() => this.onCancel())

        Button(this.confirmText)
          .type(ButtonType.Normal)
          .layoutWeight(1)
          .height($r('app.float.button_height'))
          .borderRadius($r('app.float.radius_md'))
          .backgroundColor(this.danger ? $r('app.color.state_error') : $r('app.color.brand_primary'))
          .fontColor($r('app.color.text_on_brand'))
          .fontSize($r('app.float.font_title_sm'))
          .onClick(() => this.onConfirm())
      }
      .width('100%')
    }
    .width('100%')
    .padding($r('app.float.space_xl'))
    .backgroundColor($r('app.color.bg_surface'))
    .borderRadius($r('app.float.radius_lg'))
    .clip(true)
  }
}

@Builder
function confirmDialogBuilder(params: ConfirmParams) {
  ConfirmDialogContent({
    title: params.title,
    desc: params.desc,
    confirmText: params.confirmText,
    cancelText: params.cancelText,
    danger: params.danger,
    onConfirm: params.onConfirm,
    onCancel: () => {
      ConfirmDialog.close();
    }
  })
}

export class ConfirmDialog {
  private static contentNode: ComponentContent<ConfirmParams> | null = null;
  private static uiContext: UIContext | null = null;

  static init(context: UIContext): void {
    ConfirmDialog.uiContext = context;
  }

  static show(params: ConfirmParams): void {
    if (ConfirmDialog.uiContext === null) {
      return;
    }
    ConfirmDialog.contentNode = new ComponentContent(
      ConfirmDialog.uiContext,
      wrapBuilder(confirmDialogBuilder),
      params
    );
    ConfirmDialog.uiContext.getPromptAction().openCustomDialog(ConfirmDialog.contentNode, {
      alignment: DialogAlignment.Center,
      autoCancel: true
    });
  }

  static close(): void {
    if (ConfirmDialog.uiContext !== null && ConfirmDialog.contentNode !== null) {
      ConfirmDialog.uiContext.getPromptAction().closeCustomDialog(ConfirmDialog.contentNode);
      ConfirmDialog.contentNode = null;
    }
  }
}
