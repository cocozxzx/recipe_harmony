import { RecipeStep } from '../../../commons/model/Recipe';
import { NetImage } from '../../../commons/uikit/NetImage';

@ComponentV2
export struct StepList {
  @Param steps: RecipeStep[] = [];

  build() {
    Column({ space: 16 }) {
      ForEach(this.steps, (step: RecipeStep, index: number) => {
        Row({ space: 12 }) {
          Text((index + 1).toString())
            .fontSize($r('app.float.font_body_sm'))
            .fontWeight(FontWeight.Medium)
            .fontColor($r('app.color.text_on_brand'))
            .width(24)
            .height(24)
            .borderRadius(12)
            .backgroundColor($r('app.color.brand_primary'))
            .textAlign(TextAlign.Center)

          Column({ space: 8 }) {
            Text(step.content)
              .fontSize($r('app.float.font_body'))
              .fontColor($r('app.color.text_primary'))
              .lineHeight(24)
              .width('100%')

            // ✅ 修复：用显式空值判断替代可选链
            if (step.image?.length > 0) {
              NetImage({
                url: step.image,
                imgWidth: '100%',
                imgHeight: 180,
                radius: $r('app.float.radius_md')
              })
            }
          }
          .alignItems(HorizontalAlign.Start)
          .layoutWeight(1)
        }
        .width('100%')
        .alignItems(VerticalAlign.Top)
      }, (step: RecipeStep) => step.id)
    }
    .width('100%')
  }
}