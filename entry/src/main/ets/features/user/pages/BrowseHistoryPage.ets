import { PageState } from '../../../commons/model/PageState';
import { NavUtil } from '../../../commons/router/NavUtil';
import { RecipeDetailParam, RouteNames } from '../../../commons/router/RouteNames';
import { BrowseHistoryItem, HistoryStore } from '../../../commons/storage/HistoryStore';
import { ConfirmDialog, ConfirmParams } from '../../../commons/uikit/ConfirmDialog';
import { LazyDataSource } from '../../../commons/uikit/LazyDataSource';
import { NetImage } from '../../../commons/uikit/NetImage';
import { StateView } from '../../../commons/uikit/StateView';
import { TopBar } from '../../../commons/uikit/TopBar';
import { Formatter } from '../../../commons/utils/Formatter';

@ComponentV2
export struct BrowseHistoryPage {
  @Local state: PageState = new PageState();
  @Local dataSource: LazyDataSource<BrowseHistoryItem> = new LazyDataSource();

  aboutToAppear(): void {
    this.load();
  }

  build() {
    Column() {
      TopBar({
        title: $r('app.string.history_title'),
        actionIcon: $r('app.media.ic_delete'),
        onAction: (): void => {
          const params: ConfirmParams = new ConfirmParams();
          params.title = $r('app.string.history_title');
          params.desc = $r('app.string.history_clear_confirm');
          params.onConfirm = () => this.clear();
          ConfirmDialog.show(params);
        }
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
    .expandSafeArea([SafeAreaType.SYSTEM], [SafeAreaEdge.TOP, SafeAreaEdge.BOTTOM])
  }

  @Builder
  listView() {
    List() {
      LazyForEach(this.dataSource, (item: BrowseHistoryItem) => {
        ListItem() {
          Row({ space: 12 }) {
            NetImage({
              url: item.coverImage,
              imgWidth: $r('app.float.img_history_w'),
              imgHeight: $r('app.float.img_history_h'),
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
    .cachedCount(5)
    .edgeEffect(EdgeEffect.Spring)
  }

  @Builder
  deleteButton(item: BrowseHistoryItem) {
    Text($r('app.string.common_clear'))
      .fontSize($r('app.float.font_body_sm'))
      .fontColor($r('app.color.text_on_brand'))
      .width($r('app.float.swipe_btn_w'))
      .height('100%')
      .textAlign(TextAlign.Center)
      .backgroundColor($r('app.color.state_error'))
      .onClick(() => this.remove(item.id))
  }

  private async load(): Promise<void> {
    this.state.loading();
    const items: BrowseHistoryItem[] = await HistoryStore.getBrowseHistory();
    this.dataSource.reset(items);
    this.state.success(items.length > 0);
  }

  private async remove(id: string): Promise<void> {
    const next: BrowseHistoryItem[] = await HistoryStore.removeBrowseHistory(id);
    this.dataSource.reset(next);
    this.state.success(next.length > 0);
  }

  private async clear(): Promise<void> {
    await HistoryStore.clearBrowseHistory();
    this.dataSource.clear();
    this.state.success(false);
  }
}
