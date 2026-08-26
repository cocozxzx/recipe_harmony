import { AiGeneratedRecipe } from '../../../commons/model/Ai';
import { LoadMoreFooter } from '../../../commons/uikit/LoadMoreFooter';
import { StateView } from '../../../commons/uikit/StateView';
import { TopBar } from '../../../commons/uikit/TopBar';
import { AiGeneratedCard } from '../components/AiGeneratedCard';
import { MyAiRecipesViewModel } from '../viewmodel/MyAiRecipesViewModel';

/** 我的 AI 食谱：收藏过的 AI 生成食谱列表，可展开查看完整内容 */
@ComponentV2
export struct MyAiRecipesPage {
  @Local vm: MyAiRecipesViewModel = new MyAiRecipesViewModel();

  aboutToAppear(): void {
    this.vm.load();
  }

  build() {
    Column() {
      TopBar({ title: $r('app.string.mine_ai_recipes') })

      StateView({
        status: this.vm.state.status,
        errorMessage: this.vm.state.errorMessage,
        onRetry: () => this.vm.load(),
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
    List({ space: 12 }) {
      LazyForEach(this.vm.items, (item: AiGeneratedRecipe, index: number) => {
        ListItem() {
          AiGeneratedCard({
            recipe: item,
            onToggleFavorite: () => this.vm.unfavorite(index, item)
          })
        }
      }, (item: AiGeneratedRecipe) => item.id)

      ListItem() {
        LoadMoreFooter({ status: this.vm.loadMoreStatus, onRetry: () => this.vm.loadMore() })
      }
    }
    .width('100%')
    .height('100%')
    .padding($r('app.float.space_lg'))
    .scrollBar(BarState.Off)
    .cachedCount(2)
    .onReachEnd(() => this.vm.loadMore())
  }
}
