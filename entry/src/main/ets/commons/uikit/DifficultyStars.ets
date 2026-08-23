/**
 * 难度星级。产品要求用星级图标而非"简单/中等/困难"文字——
 * 图标在双列卡片这种窄空间里更省位置，也不占用菜名的行宽。
 */
@ComponentV2
export struct DifficultyStars {
  @Param value: number = 0;      // 1-5
  @Param total: number = 5;
  @Param starSize: Length = $r('app.float.icon_sm');

  build() {
    Row({ space: 2 }) {
      ForEach(this.indexes(), (index: number) => {
        Image(index < this.value ? $r('app.media.ic_star_fill') : $r('app.media.ic_star'))
          .width(this.starSize)
          .height(this.starSize)
          .fillColor(index < this.value ? $r('app.color.accent') : $r('app.color.text_disabled'))
      }, (index: number) => index.toString())
    }
  }

  private indexes(): number[] {
    const list: number[] = [];
    for (let i = 0; i < this.total; i++) {
      list.push(i);
    }
    return list;
  }
}
