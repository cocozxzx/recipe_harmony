import { TagChip } from '../../../commons/uikit/TagChip';
import { Strings } from '../../../commons/utils/Strings';
import { CategoryViewModel } from '../viewmodel/CategoryViewModel';

/** 耗时区间选项，值为"不超过 N 分钟"，0 表示不限 */
interface CookTimeOption {
  label: ResourceStr;
  value: number;
}

/**
 * 筛选面板：难度多选 + 耗时区间。
 * 收起式设计——分类页首屏应该尽量多留给瀑布流卡片。
 */
@ComponentV2
export struct FilterPanel {
  @Param vm: CategoryViewModel = new CategoryViewModel();

  private readonly cookTimeOptions: CookTimeOption[] = [
    { label: $r('app.string.category_cooktime_any'), value: 0 },
    { label: $r('app.string.category_cooktime_15'), value: 15 },
    { label: $r('app.string.category_cooktime_30'), value: 30 },
    { label: $r('app.string.category_cooktime_60'), value: 60 }
  ];

  build() {
    Column({ space: 16 }) {
      Column({ space: 8 }) {
        Text($r('app.string.category_filter_difficulty'))
          .fontSize($r('app.float.font_body_sm'))
          .fontColor($r('app.color.text_secondary'))
          .width('100%')
        Row({ space: 8 }) {
          ForEach([1, 2, 3, 4, 5], (level: number) => {
            TagChip({
              text: this.starsLabel(level),
              selected: this.vm.difficulties.indexOf(level) >= 0,
              onTap: () => this.vm.toggleDifficulty(level)
            })
          }, (level: number) => level.toString())
        }
        .width('100%')
      }

      Column({ space: 8 }) {
        Text($r('app.string.category_filter_cooktime'))
          .fontSize($r('app.float.font_body_sm'))
          .fontColor($r('app.color.text_secondary'))
          .width('100%')
        Row({ space: 8 }) {
          ForEach(this.cookTimeOptions, (option: CookTimeOption) => {
            TagChip({
              text: option.label,
              selected: this.vm.maxCookTime === option.value,
              onTap: () => this.vm.setMaxCookTime(option.value)
            })
          }, (option: CookTimeOption) => option.value.toString())
        }
        .width('100%')
      }

      Row({ space: 12 }) {
        Button($r('app.string.common_reset'))
          .type(ButtonType.Normal)
          .layoutWeight(1)
          .height(40)
          .borderRadius($r('app.float.radius_md'))
          .backgroundColor($r('app.color.bg_sunken'))
          .fontColor($r('app.color.text_secondary'))
          .fontSize($r('app.float.font_body'))
          .onClick(() => this.vm.resetFilter())

        Button($r('app.string.common_confirm'))
          .type(ButtonType.Normal)
          .layoutWeight(1)
          .height(40)
          .borderRadius($r('app.float.radius_md'))
          .backgroundColor($r('app.color.brand_primary'))
          .fontColor($r('app.color.text_on_brand'))
          .fontSize($r('app.float.font_body'))
          .onClick(() => this.vm.applyFilter())
      }
      .width('100%')
    }
    .width('100%')
    .padding($r('app.float.space_lg'))
    .backgroundColor($r('app.color.bg_surface'))
    .borderRadius($r('app.float.radius_lg'))
  }

  /** 难度用星号表示，与卡片上的星级图标保持同一套语义 */
  private starsLabel(level: number): string {
    let text: string = '';
    for (let i = 0; i < level; i++) {
      text += '★';
    }
    return text;
  }
}
