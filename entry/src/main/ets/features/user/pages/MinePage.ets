import { AuthService } from '../../../commons/auth/AuthService';
import { UserInfo } from '../../../commons/model/User';
import { NavUtil } from '../../../commons/router/NavUtil';
import { DOC_AGREEMENT, DOC_PRIVACY, RouteNames, WebDocParam } from '../../../commons/router/RouteNames';
import { ConfirmDialog } from '../../../commons/uikit/ConfirmDialog';
import { NetImage } from '../../../commons/uikit/NetImage';
import { Formatter } from '../../../commons/utils/Formatter';
import { Strings } from '../../../commons/utils/Strings';
import { SettingGroup, SettingRow } from '../components/SettingRow';
import { MineViewModel } from '../viewmodel/MineViewModel';

/**
 * 个人中心。
 * 未登录展示登录引导页（一句价值说明 + 登录按钮），不展示空的功能列表。
 */
@ComponentV2
export struct MinePage {
  @Local vm: MineViewModel = new MineViewModel();
  @Local auth: AuthService = AuthService.get();

  private logoutDialog: CustomDialogController = new CustomDialogController({
    builder: ConfirmDialog({
      title: $r('app.string.mine_logout'),
      desc: $r('app.string.mine_logout_confirm'),
      onConfirm: () => this.vm.logout()
    }),
    alignment: DialogAlignment.Center,
    cornerRadius: 16
  });

  aboutToAppear(): void {
    if (this.auth.isLogin) {
      this.vm.refresh();
    }
  }

  build() {
    Column() {
      if (!this.auth.isLogin) {
        this.guestView()
      } else {
        this.memberView()
      }
    }
    .width('100%')
    .height('100%')
    .backgroundColor($r('app.color.bg_page'))
  }

  @Builder
  guestView() {
    Column({ space: 20 }) {
      Image($r('app.media.img_empty'))
        .width(160)
        .height(160)
        .objectFit(ImageFit.Contain)
      Text($r('app.string.mine_guest_slogan'))
        .fontSize($r('app.float.font_body'))
        .fontColor($r('app.color.text_secondary'))
        .textAlign(TextAlign.Center)
        .padding({ left: $r('app.float.space_xl'), right: $r('app.float.space_xl') })
      Button($r('app.string.mine_login_register'))
        .type(ButtonType.Normal)
        .height($r('app.float.button_height'))
        .constraintSize({ minWidth: 200 })
        .borderRadius($r('app.float.radius_md'))
        .backgroundColor($r('app.color.brand_primary'))
        .fontColor($r('app.color.text_on_brand'))
        .fontSize($r('app.float.font_title_sm'))
        .onClick(() => NavUtil.push(RouteNames.LOGIN))
    }
    .width('100%')
    .height('100%')
    .justifyContent(FlexAlign.Center)
  }

  @Builder
  memberView() {
    Scroll() {
      Column({ space: 24 }) {
        this.header()

        SettingGroup({
          title: $r('app.string.mine_group_content'),
          content: () => { this.contentGroup() }
        })

        SettingGroup({
          title: $r('app.string.mine_group_settings'),
          content: () => { this.settingsGroup() }
        })

        Button($r('app.string.mine_logout'))
          .type(ButtonType.Normal)
          .width('100%')
          .height($r('app.float.button_height'))
          .borderRadius($r('app.float.radius_md'))
          .backgroundColor($r('app.color.bg_surface'))
          .fontColor($r('app.color.state_error'))
          .fontSize($r('app.float.font_title_sm'))
          .onClick(() => this.logoutDialog.open())
      }
      .width('100%')
      .padding({
        left: $r('app.float.space_lg'),
        right: $r('app.float.space_lg'),
        top: $r('app.float.space_lg'),
        bottom: $r('app.float.space_xxl')
      })
    }
    .scrollBar(BarState.Off)
    .width('100%')
    .height('100%')
    .align(Alignment.Top)
  }

  @Builder
  header() {
    Row({ space: 16 }) {
      NetImage({
        url: this.user().avatar,
        imgWidth: 64,
        imgHeight: 64,
        radius: 32
      })

      Column({ space: 8 }) {
        Text(this.user().nickname)
          .fontSize($r('app.float.font_title'))
          .fontWeight(FontWeight.Medium)
          .fontColor($r('app.color.text_primary'))

        Row({ space: 16 }) {
          this.countLabel($r('app.string.mine_favorite_count'), this.user().favoriteCount)
          this.countLabel($r('app.string.mine_like_count'), this.user().likeCount)
        }
      }
      .alignItems(HorizontalAlign.Start)
      .layoutWeight(1)

      Image($r('app.media.ic_arrow_right'))
        .width($r('app.float.icon_sm'))
        .height($r('app.float.icon_sm'))
        .fillColor($r('app.color.text_tertiary'))
    }
    .width('100%')
    .padding($r('app.float.space_lg'))
    .backgroundColor($r('app.color.bg_surface'))
    .borderRadius($r('app.float.radius_lg'))
    .onClick(() => NavUtil.push(RouteNames.PROFILE_EDIT))
  }

  @Builder
  countLabel(label: ResourceStr, count: number) {
    Row({ space: 4 }) {
      Text(Formatter.count(count))
        .fontSize($r('app.float.font_body'))
        .fontWeight(FontWeight.Medium)
        .fontColor($r('app.color.text_primary'))
      Text(label)
        .fontSize($r('app.float.font_caption'))
        .fontColor($r('app.color.text_tertiary'))
    }
  }

  @Builder
  contentGroup() {
    SettingRow({
      title: $r('app.string.mine_favorites'),
      onTap: () => NavUtil.push(RouteNames.MY_FAVORITES)
    })
    SettingRow({
      title: $r('app.string.mine_likes'),
      onTap: () => NavUtil.push(RouteNames.MY_LIKES)
    })
    SettingRow({
      title: $r('app.string.mine_history'),
      onTap: () => NavUtil.push(RouteNames.BROWSE_HISTORY)
    })
    SettingRow({
      title: $r('app.string.mine_ai_recipes'),
      showDivider: false,
      onTap: () => NavUtil.push(RouteNames.MY_AI_RECIPES)
    })
  }

  @Builder
  settingsGroup() {
    SettingRow({
      title: $r('app.string.mine_account'),
      onTap: () => NavUtil.push(RouteNames.ACCOUNT)
    })
    SettingRow({
      title: $r('app.string.mine_clear_cache'),
      showArrow: false,
      onTap: () => this.vm.clearCache()
    })
    SettingRow({
      title: $r('app.string.mine_about'),
      onTap: () => NavUtil.push(RouteNames.ABOUT)
    })
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

  private user(): UserInfo {
    return this.auth.user ?? ({ bindings: [] } as object as UserInfo);
  }

  private openDoc(docKey: string, title: Resource): void {
    const param: WebDocParam = { title: Strings.get(title), docKey: docKey };
    NavUtil.push(RouteNames.WEB_DOC, param);
  }
}
