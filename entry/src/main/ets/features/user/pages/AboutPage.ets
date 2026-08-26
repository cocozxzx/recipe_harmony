import BuildProfile from 'BuildProfile';
import { DOC_AGREEMENT, DOC_PRIVACY, RouteNames, WebDocParam } from '../../../commons/router/RouteNames';
import { NavUtil } from '../../../commons/router/NavUtil';
import { TopBar } from '../../../commons/uikit/TopBar';
import { Strings } from '../../../commons/utils/Strings';
import { SettingGroup, SettingRow } from '../components/SettingRow';

/** 关于我们。版本号取自编译期注入，不手写。 */
@ComponentV2
export struct AboutPage {
  build() {
    Column() {
      TopBar({ title: $r('app.string.mine_about') })

      Column({ space: 24 }) {
        Column({ space: 12 }) {
          Image($r('app.media.app_icon'))
            .width($r('app.float.icon_app'))
            .height($r('app.float.icon_app'))
            .borderRadius($r('app.float.radius_lg'))
          Text($r('app.string.app_name'))
            .fontSize($r('app.float.font_title'))
            .fontWeight(FontWeight.Medium)
            .fontColor($r('app.color.text_primary'))
          Text(this.versionText())
            .fontSize($r('app.float.font_caption'))
            .fontColor($r('app.color.text_tertiary'))
        }
        .width('100%')
        .padding({ top: $r('app.float.space_xxl') })

        SettingGroup({ content: () => { this.docs() } })
      }
      .width('100%')
      .padding($r('app.float.space_lg'))
    }
    .width('100%')
    .height('100%')
    .backgroundColor($r('app.color.bg_page'))
    .expandSafeArea([SafeAreaType.SYSTEM], [SafeAreaEdge.TOP, SafeAreaEdge.BOTTOM])
  }

  @Builder
  docs() {
    SettingRow({
      title: $r('app.string.mine_agreement'),
      onTap: () => this.openDoc(DOC_AGREEMENT, $r('app.string.mine_agreement'))
    })
    SettingRow({
      title: $r('app.string.mine_privacy'),
      showDivider: false,
      onTap: () => this.openDoc(DOC_PRIVACY, $r('app.string.mine_privacy'))
    })
  }

  private versionText(): string {
    return 'v' + BuildProfile.APP_VERSION + ' (' + BuildProfile.ENV + ')';
  }

  private openDoc(docKey: string, title: Resource): void {
    const param: WebDocParam = { title: Strings.get(title), docKey: docKey };
    NavUtil.push(RouteNames.WEB_DOC, param);
  }
}
