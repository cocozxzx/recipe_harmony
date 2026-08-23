import { PageState } from '../../../commons/model/PageState';
import { NavUtil } from '../../../commons/router/NavUtil';
import { RecipeDetailParam, RouteNames } from '../../../commons/router/RouteNames';
import { BrowseHistoryItem, HistoryStore } from '../../../commons/storage/HistoryStore';
import { ConfirmDialog } from '../../../commons/uikit/ConfirmDialog';
import { NetImage } from '../../../commons/uikit/NetImage';
import { StateView } from '../../../commons/uikit/StateView';
import { TopBar } from '../../../commons/uikit/TopBar';
import { Formatter } from '../../../commons/utils/Formatter';

/**
 * 浏览历史。
 * 只存本地（preferences），不建后端表——第一期只有鸿蒙一个端，
 * 等后续做安卓/小程序需要跨端同步时再加表也不晚。
 */
@ComponentV2
export struct BrowseHistoryPage {
  @Local items: BrowseHistoryItem[] = [];
  @Local state: PageState = new PageState();

  private clearDialog: CustomDialogController = new CustomDialogController({
    builder: ConfirmDialog({
      title: $r('app.string.history_title'),
      desc: $r('app.string.history_clear_confirm'),
      onConfirm: () => this.clear()
    }),
    alignment: DialogAlignment.Center,
    cornerRadius: 16
  });

  aboutToAppear(): void {
    this.load();
  }

  build() {
    Column() {
      TopBar({
        title: $r('app.string.history_title'),
        actionIcon: $r('app.media.ic_delete'),
        onAction: () => this.clearDialog.open()
      })

      StateView({
        status: this.state.status,
        errorMessage: this.state.errorMessage,
        emptyText: $r('app.string.history_empty'),
        onRetry: () => this.load(),
        content: () => { this.listView() }
      })
        .layoutWeight(1)
    }
    .width('100%')
    .height('100%')
    .backgroundColor($r('app.color.bg_page'))
  }

  @Builder
  listView() {
    List() {
      ForEach(this.items, (item: BrowseHistoryItem) => {
        ListItem() {
          Row({ space: 12 }) {
            NetImage({
              url: item.coverImage,
              imgWidth: 80,
              imgHeight: 60,
              radius: $r('app.float.radius_md')
            })
            Column({ space: 6 }) {
              Text(item.name)
                .fontSize($r('app.float.font_body'))
                .fontColor($r('app.color.text_primary'))
                .maxLines(2)
                .textOverflow({ overflow: TextOverflow.Ellipsis })
                .width('100%')
              Text(Formatter.historyTime(item.time))
                .fontSize($r('app.float.font_caption'))
                .fontColor($r('app.color.text_tertiary'))
            }
            .alignItems(HorizontalAlign.Start)
            .layoutWeight(1)
          }
          .width('100%')
          .padding({ top: $r('app.float.space_md'), bottom: $r('app.float.space_md') })
          .onClick(() => {
            const param: RecipeDetailParam = { recipeId: item.id };
            NavUtil.push(RouteNames.RECIPE_DETAIL, param);
          })
        }
        .swipeAction({ end: this.deleteButton(item) })
      }, (item: BrowseHistoryItem) => item.id)
    }
    .width('100%')
    .height('100%')
    .padding({ left: $r('app.float.space_lg'), right: $r('app.float.space_lg') })
    .divider({ strokeWidth: 1, color: $r('app.color.divider') })
    .scrollBar(BarState.Off)
  }

  @Builder
  deleteButton(item: BrowseHistoryItem) {
    Text($r('app.string.common_clear'))
      .fontSize($r('app.float.font_body_sm'))
      .fontColor($r('app.color.text_on_brand'))
      .width(72)
      .height('100%')
      .textAlign(TextAlign.Center)
      .backgroundColor($r('app.color.state_error'))
      .onClick(() => this.remove(item.id))
  }

  private async load(): Promise<void> {
    this.state.loading();
    this.items = await HistoryStore.getBrowseHistory();
    this.state.success(this.items.length > 0);
  }

  private async remove(id: string): Promise<void> {
    this.items = await HistoryStore.removeBrowseHistory(id);
    this.state.success(this.items.length > 0);
  }

  private async clear(): Promise<void> {
    await HistoryStore.clearBrowseHistory();
    this.items = [];
    this.state.success(false);
  }
}
