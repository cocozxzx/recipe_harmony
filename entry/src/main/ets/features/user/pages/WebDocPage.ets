import { util } from '@kit.ArkTS';
import { common } from '@kit.AbilityKit';
import { PageState } from '../../../commons/model/PageState';
import { DOC_PRIVACY, WebDocParam } from '../../../commons/router/RouteNames';
import { StateView } from '../../../commons/uikit/StateView';
import { TopBar } from '../../../commons/uikit/TopBar';
import { Logger } from '../../../commons/utils/Logger';

const TAG: string = 'WebDocPage';

/**
 * 用户协议 / 隐私政策。
 *
 * 正文放在 rawfile 里随包发布，不走网络——
 * 审核时必须保证断网状态下也能打开这两份文档。
 */
@ComponentV2
export struct WebDocPage {
  @Param param: WebDocParam = { title: '', docKey: DOC_PRIVACY };
  @Local content: string = '';
  @Local state: PageState = new PageState();

  aboutToAppear(): void {
    this.load();
  }

  build() {
    Column() {
      TopBar({ title: this.param.title })

      StateView({
        status: this.state.status,
        errorMessage: this.state.errorMessage,
        onRetry: () => this.load(),
        content: () => { this.docView() }
      })
        .layoutWeight(1)
    }
    .width('100%')
    .height('100%')
    .backgroundColor($r('app.color.bg_page'))
  }

  @Builder
  docView() {
    Scroll() {
      Text(this.content)
        .fontSize($r('app.float.font_body_sm'))
        .fontColor($r('app.color.text_primary'))
        .lineHeight(24)
        .width('100%')
        .padding($r('app.float.space_lg'))
    }
    .scrollBar(BarState.Off)
    .width('100%')
    .height('100%')
    .align(Alignment.Top)
  }

  private load(): void {
    this.state.loading();
    try {
      const context: common.UIAbilityContext = getContext(this) as common.UIAbilityContext;
      const bytes: Uint8Array = context.resourceManager.getRawFileContentSync(this.param.docKey + '.txt');
      const decoder: util.TextDecoder = util.TextDecoder.create('utf-8', { ignoreBOM: true });
      this.content = decoder.decodeToString(bytes);
      this.state.success(this.content.length > 0);
    } catch (e) {
      Logger.e(TAG, 'load doc ' + this.param.docKey + ' failed', e);
      this.state.error('');
    }
  }
}
