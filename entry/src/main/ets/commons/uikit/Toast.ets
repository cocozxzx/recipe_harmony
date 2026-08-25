import { promptAction } from '@kit.ArkUI';
import { Logger } from '../utils/Logger';

const TAG: string = 'Toast';

/** 轻提示封装。文案一律传 Resource，不要在调用处硬编码字符串。 */
export class Toast {
  static show(message: ResourceStr, durationMs: number = 2000): void {
    try {
      promptAction.showToast({ message: message, duration: durationMs });
    } catch (e) {
      Logger.e(TAG, 'showToast failed', e);
    }
  }
}
