import { Motion } from './Theme';

/** 主按钮：背景 brand_primary，高度 48vp，全宽或最小宽度 120vp */
@ComponentV2
export struct PrimaryButton {
  @Param text: ResourceStr = '';
  @Param btnEnabled: boolean = true;
  @Param loading: boolean = false;
  @Param fullWidth: boolean = true;
  @Event onTap: () => void = () => {};

  build() {
    Button({ stateEffect: this.btnEnabled && !this.loading }) {
      Row({ space: 8 }) {
        if (this.loading) {
          LoadingProgress()
            .width($r('app.float.icon_md'))
            .height($r('app.float.icon_md'))
            .color($r('app.color.text_on_brand'))
        }
        Text(this.text)
          .fontSize($r('app.float.font_title_sm'))
          .fontWeight(FontWeight.Medium)
          .fontColor($r('app.color.text_on_brand'))
      }
    }
    .type(ButtonType.Normal)
    .width(this.fullWidth ? '100%' : undefined)
    .constraintSize({ minWidth: this.fullWidth ? 0 : 120 })
    .height($r('app.float.button_height'))
    .borderRadius($r('app.float.radius_md'))
    .backgroundColor(this.btnEnabled ? $r('app.color.brand_primary') : $r('app.color.text_disabled'))
    .padding({ left: $r('app.float.space_lg'), right: $r('app.float.space_lg') })
    .enabled(this.btnEnabled && !this.loading)
    .animation(Motion.standard())
    .onClick(() => this.onTap())
  }
}

/** 次按钮：背景 brand_primary_light，文字 brand_primary */
@ComponentV2
export struct SecondaryButton {
  @Param text: ResourceStr = '';
  @Param btnEnabled: boolean = true;
  @Param fullWidth: boolean = true;
  @Event onTap: () => void = () => {};

  build() {
    Button(this.text, { stateEffect: this.btnEnabled })
      .type(ButtonType.Normal)
      .width(this.fullWidth ? '100%' : undefined)
      .constraintSize({ minWidth: this.fullWidth ? 0 : 120 })
      .height($r('app.float.button_height'))
      .borderRadius($r('app.float.radius_md'))
      .backgroundColor($r('app.color.brand_primary_light'))
      .fontColor(this.btnEnabled ? $r('app.color.brand_primary') : $r('app.color.text_disabled'))
      .fontSize($r('app.float.font_title_sm'))
      .fontWeight(FontWeight.Medium)
      .padding({ left: $r('app.float.space_lg'), right: $r('app.float.space_lg') })
      .enabled(this.btnEnabled)
      .onClick(() => this.onTap())
  }
}

/** 文字按钮：无背景 */
@ComponentV2
export struct TextButton {
  @Param text: ResourceStr = '';
  @Param color: ResourceColor = $r('app.color.brand_primary');
  @Param textSize: Length = $r('app.float.font_body');
  @Event onTap: () => void = () => {};

  build() {
    Text(this.text)
      .fontSize(this.textSize)
      .fontColor(this.color)
      .fontWeight(FontWeight.Medium)
      .padding({ left: $r('app.float.space_sm'), right: $r('app.float.space_sm'), top: 4, bottom: 4 })
      .onClick(() => this.onTap())
  }
}
