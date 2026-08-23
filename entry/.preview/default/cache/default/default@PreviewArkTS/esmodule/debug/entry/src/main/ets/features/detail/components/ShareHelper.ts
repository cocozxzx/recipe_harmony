import systemShare from "@hms:collaboration.systemShare";
import utd from "@ohos:data.uniformTypeDescriptor";
import type common from "@ohos:app.ability.common";
import { Logger } from "@bundle:com.eatapp.recipe/entry/ets/commons/utils/Logger";
const TAG: string = 'ShareHelper';
/**
 * 系统分享（Share Kit）。
 *
 * 第一期只做系统分享面板，内容是"菜名 + 简介 + 落地页链接"。
 * 不做分享图生成、不做小程序卡片——那两项要等有对应端和落地页才有意义。
 */
export class ShareHelper {
    static async share(context: common.UIAbilityContext, name: string, summary: string, link: string): Promise<void> {
        try {
            const data: systemShare.SharedData = new systemShare.SharedData({
                utd: utd.UniformDataType.HYPERLINK,
                title: name,
                description: summary,
                content: link
            });
            const controller: systemShare.ShareController = new systemShare.ShareController(data);
            await controller.show(context, {
                selectionMode: systemShare.SelectionMode.SINGLE,
                previewMode: systemShare.SharePreviewMode.DETAIL
            });
        }
        catch (e) {
            Logger.e(TAG, 'share failed', e as Object);
        }
    }
}
