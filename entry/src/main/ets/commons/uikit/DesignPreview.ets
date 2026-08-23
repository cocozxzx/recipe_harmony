import { PageStatus } from '../model/PageState';
import { RecipeListItem } from '../model/Recipe';
import { PrimaryButton, SecondaryButton, TextButton } from './Buttons';
import { CookTimeLabel } from './CookTimeLabel';
import { DifficultyStars } from './DifficultyStars';
import { LoadMoreFooter, LoadMoreStatus } from './LoadMoreFooter';
import { RecipeCard } from './RecipeCard';
import { RecipeCardH } from './RecipeCardH';
import { RecipeRow } from './RecipeRow';
import { SearchBar } from './SearchBar';
import { SectionHeader } from './SectionHeader';
import { SkeletonBox } from './SkeletonBox';
import { StateView } from './StateView';
import { MiniTag, TagChip } from './TagChip';
import { Shadows } from './Theme';

interface ColorSpec {
  name: string;
  value: ResourceColor;
}

/**
 * 设计 token 与组件预览页。
 *
 * 用途：Phase 1 / Phase 3 的验收——把全部颜色、字号、圆角、阴影和每个组件的
 * 各种状态（含空态、错误态、选中态）渲染出来，肉眼核对是否符合小清新调性。
 *
 * 不在路由表里注册，需要看时把 module.json5 的入口临时指到它，或在
 * DevEco 里用 @Preview 单独预览。
 */
@ComponentV2
export struct DesignPreview {
  @Local chipSelected: boolean = true;
  @Local previewStatus: PageStatus = PageStatus.EMPTY;

  private readonly sampleItem: RecipeListItem = {
    id: 'preview-1',
    name: '番茄炒蛋盖浇饭',
    coverImage: '',
    difficulty: 2,
    cookTime: 20,
    favoriteCount: 1280,
    likeCount: 342,
    tagName: '家常菜'
  };

  private readonly colors: ColorSpec[] = [
    { name: 'brand_primary', value: $r('app.color.brand_primary') },
    { name: 'brand_primary_light', value: $r('app.color.brand_primary_light') },
    { name: 'brand_primary_dark', value: $r('app.color.brand_primary_dark') },
    { name: 'accent', value: $r('app.color.accent') },
    { name: 'accent_light', value: $r('app.color.accent_light') },
    { name: 'action_like', value: $r('app.color.action_like') },
    { name: 'action_favorite', value: $r('app.color.action_favorite') },
    { name: 'bg_page', value: $r('app.color.bg_page') },
    { name: 'bg_surface', value: $r('app.color.bg_surface') },
    { name: 'bg_sunken', value: $r('app.color.bg_sunken') },
    { name: 'divider', value: $r('app.color.divider') },
    { name: 'text_primary', value: $r('app.color.text_primary') },
    { name: 'text_secondary', value: $r('app.color.text_secondary') },
    { name: 'text_tertiary', value: $r('app.color.text_tertiary') },
    { name: 'text_disabled', value: $r('app.color.text_disabled') },
    { name: 'state_error', value: $r('app.color.state_error') },
    { name: 'state_warning', value: $r('app.color.state_warning') }
  ];

  build() {
    Scroll() {
      Column({ space: 24 }) {
        SectionHeader({ title: '色彩' })
        this.colorGrid()

        SectionHeader({ title: '排版' })
        this.typography()

        SectionHeader({ title: '圆角与阴影' })
        this.shapes()

        SectionHeader({ title: '按钮' })
        Column({ space: 12 }) {
          PrimaryButton({ text: '主按钮' })
          PrimaryButton({ text: '主按钮（禁用）', enabled: false })
          PrimaryButton({ text: '主按钮（加载中）', loading: true })
          SecondaryButton({ text: '次按钮' })
          TextButton({ text: '文字按钮' })
        }

        SectionHeader({ title: '标签与星级' })
        Row({ space: 12 }) {
          TagChip({ text: '早餐', selected: this.chipSelected, onTap: () => { this.chipSelected = !this.chipSelected; } })
          TagChip({ text: '主食', selected: false })
          MiniTag({ text: '可选' })
          DifficultyStars({ value: 3 })
          CookTimeLabel({ minutes: 25, withIcon: true })
        }

        SectionHeader({ title: '搜索框' })
        Column({ space: 12 }) {
          SearchBar({ readOnly: true })
          SearchBar({ text: '番茄' })
        }

        SectionHeader({ title: '卡片' })
        Row({ space: 12 }) {
          RecipeCard({ item: this.sampleItem }).width(160)
          RecipeCardH({ item: this.sampleItem })
        }
        RecipeRow({ item: this.sampleItem })

        SectionHeader({ title: '骨架屏' })
        Column({ space: 8 }) {
          SkeletonBox({ boxWidth: '80%', boxHeight: 16 })
          SkeletonBox({ boxWidth: '60%', boxHeight: 12 })
        }

        SectionHeader({ title: '加载更多' })
        Column() {
          LoadMoreFooter({ status: LoadMoreStatus.LOADING })
          LoadMoreFooter({ status: LoadMoreStatus.NO_MORE })
          LoadMoreFooter({ status: LoadMoreStatus.FAILED })
        }

        SectionHeader({ title: '四态容器', actionText: '切换' })
        Column() {
          StateView({
            status: this.previewStatus,
            errorMessage: '加载失败了，请稍后重试',
            content: () => { this.stateContent() }
          })
            .height(320)
        }
        .onClick(() => { this.previewStatus = this.nextStatus(); })
      }
      .width('100%')
      .padding($r('app.float.space_lg'))
      .alignItems(HorizontalAlign.Start)
    }
    .width('100%')
    .height('100%')
    .backgroundColor($r('app.color.bg_page'))
  }

  @Builder
  stateContent() {
    Text('SUCCESS 态内容')
      .fontSize($r('app.float.font_body'))
      .fontColor($r('app.color.text_primary'))
  }

  @Builder
  colorGrid() {
    Flex({ wrap: FlexWrap.Wrap }) {
      ForEach(this.colors, (spec: ColorSpec) => {
        Column({ space: 4 }) {
          Row()
            .width(72)
            .height(48)
            .borderRadius($r('app.float.radius_sm'))
            .backgroundColor(spec.value)
            .borderWidth(1)
            .borderColor($r('app.color.divider'))
          Text(spec.name)
            .fontSize(10)
            .fontColor($r('app.color.text_tertiary'))
            .width(72)
            .maxLines(2)
        }
        .margin({ right: 8, bottom: 8 })
      }, (spec: ColorSpec) => spec.name)
    }
    .width('100%')
  }

  @Builder
  typography() {
    Column({ space: 8 }) {
      Text('页面大标题 font_display').fontSize($r('app.float.font_display')).fontWeight(FontWeight.Bold)
        .fontColor($r('app.color.text_primary'))
      Text('详情页菜名 font_title_lg').fontSize($r('app.float.font_title_lg')).fontWeight(FontWeight.Bold)
        .fontColor($r('app.color.text_primary'))
      Text('区块标题 font_title').fontSize($r('app.float.font_title')).fontWeight(FontWeight.Medium)
        .fontColor($r('app.color.text_primary'))
      Text('卡片菜名 font_body / 500').fontSize($r('app.float.font_body')).fontWeight(FontWeight.Medium)
        .fontColor($r('app.color.text_primary'))
      Text('正文 font_body / 行高 1.6').fontSize($r('app.float.font_body')).lineHeight(24)
        .fontColor($r('app.color.text_primary'))
      Text('次要说明 font_body_sm').fontSize($r('app.float.font_body_sm'))
        .fontColor($r('app.color.text_secondary'))
      Text('辅助信息 font_caption').fontSize($r('app.float.font_caption'))
        .fontColor($r('app.color.text_tertiary'))
    }
    .alignItems(HorizontalAlign.Start)
    .width('100%')
  }

  @Builder
  shapes() {
    Row({ space: 12 }) {
      this.shapeBox('sm', $r('app.float.radius_sm'))
      this.shapeBox('md', $r('app.float.radius_md'))
      this.shapeBox('lg', $r('app.float.radius_lg'))
      this.shapeBox('xl', $r('app.float.radius_xl'))
    }
    .width('100%')
  }

  @Builder
  shapeBox(label: string, radius: Resource) {
    Column({ space: 4 }) {
      Row()
        .width(64)
        .height(64)
        .borderRadius(radius)
        .backgroundColor($r('app.color.bg_surface'))
        .shadow(Shadows.card)
      Text(label)
        .fontSize($r('app.float.font_caption'))
        .fontColor($r('app.color.text_tertiary'))
    }
  }

  private nextStatus(): PageStatus {
    if (this.previewStatus === PageStatus.LOADING) {
      return PageStatus.SUCCESS;
    }
    if (this.previewStatus === PageStatus.SUCCESS) {
      return PageStatus.EMPTY;
    }
    if (this.previewStatus === PageStatus.EMPTY) {
      return PageStatus.ERROR;
    }
    return PageStatus.LOADING;
  }
}
