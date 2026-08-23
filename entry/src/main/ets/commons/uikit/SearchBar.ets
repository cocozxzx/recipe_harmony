/**
 * 搜索框。
 * `readOnly` 模式下不接受输入，整块可点——首页用它做"点击跳搜索页"的入口，
 * 这样首页不必真的持有一个输入框，也就不会误触发软键盘。
 */
@ComponentV2
export struct SearchBar {
  @Param text: string = '';
  @Param placeholder: ResourceStr = $r('app.string.search_placeholder');
  @Param readOnly: boolean = false;
  @Param autoFocus: boolean = false;
  @Event onTextChange: (value: string) => void = () => {};
  @Event onSubmit: (value: string) => void = () => {};
  @Event onTap: () => void = () => {};

  private controller: TextInputController = new TextInputController();

  build() {
    Row({ space: 8 }) {
      Image($r('app.media.ic_search'))
        .width($r('app.float.icon_md'))
        .height($r('app.float.icon_md'))
        .fillColor($r('app.color.text_tertiary'))

      if (this.readOnly) {
        Text(this.text.length > 0 ? this.text : this.placeholder)
          .fontSize($r('app.float.font_body'))
          .fontColor(this.text.length > 0 ? $r('app.color.text_primary') : $r('app.color.text_tertiary'))
          .layoutWeight(1)
          .maxLines(1)
      } else {
        TextInput({ text: this.text, placeholder: this.placeholder, controller: this.controller })
          .layoutWeight(1)
          .height(40)
          .padding(0)
          .borderRadius(0)
          .backgroundColor($r('app.color.transparent'))
          .fontSize($r('app.float.font_body'))
          .fontColor($r('app.color.text_primary'))
          .placeholderColor($r('app.color.text_tertiary'))
          .enterKeyType(EnterKeyType.Search)
          .defaultFocus(this.autoFocus)
          .onChange((value: string) => this.onTextChange(value))
          .onSubmit(() => this.onSubmit(this.text))

        if (this.text.length > 0) {
          Image($r('app.media.ic_close'))
            .width($r('app.float.icon_sm'))
            .height($r('app.float.icon_sm'))
            .fillColor($r('app.color.text_tertiary'))
            .onClick(() => this.onTextChange(''))
        }
      }
    }
    .width('100%')
    .height(44)
    .padding({ left: $r('app.float.space_md'), right: $r('app.float.space_md') })
    .backgroundColor($r('app.color.bg_sunken'))
    .borderRadius($r('app.float.radius_md'))
    .onClick(() => {
      if (this.readOnly) {
        this.onTap();
      }
    })
  }
}
