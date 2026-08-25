import { AuthService } from '../../../commons/auth/AuthService';
import { OauthBinding, PLATFORM_HUAWEI, UserInfo } from '../../../commons/model/User';
import { NavUtil } from '../../../commons/router/NavUtil';
import { ConfirmDialog } from '../../../commons/uikit/ConfirmDialog';
import { TopBar } from '../../../commons/uikit/TopBar';
import { Strings } from '../../../commons/utils/Strings';
import { SettingGroup, SettingRow } from '../components/SettingRow';
import { MineViewModel } from '../viewmodel/MineViewModel';

/**
 * 账号与绑定。
 *
 * ⚠️「注销账号」入口是华为应用市场上架的强制要求，不是可选项，遗漏会被审核打回。
 *   必须二次确认，并明确告知数据删除范围。
 */
@ComponentV2
export struct AccountPage {
  @Local vm: MineViewModel = new MineViewModel();
  @Local auth: AuthService = AuthService.get();

  private deleteDialog: CustomDialogController = new CustomDialogController({
    builder: ConfirmDialog({
      title: $r('app.string.account_delete_title'),
      desc: $r('app.string.account_delete_desc'),
      confirmText: $r('app.string.account_delete_confirm'),
      danger: true,
      onConfirm: () => this.confirmDelete()
    }),
    alignment: DialogAlignment.Center,
    cornerRadius: 16
  });

  build() {
    Column() {
      TopBar({ title: $r('app.string.mine_account') })

      Column({ space: 24 }) {
        SettingGroup({ content: () => { this.bindingGroup() } })

        SettingGroup({ content: () => { this.dangerGroup() } })
      }
      .width('100%')
      .padding($r('app.float.space_lg'))
    }
    .width('100%')
    .height('100%')
    .backgroundColor($r('app.color.bg_page'))
  }

  @Builder
  bindingGroup() {
    SettingRow({
      title: $r('app.string.account_phone'),
      value: this.bindingText(this.user().phone),
      showArrow: false
    })
    SettingRow({
      title: $r('app.string.account_email'),
      value: this.bindingText(this.user().email),
      showArrow: false
    })
    SettingRow({
      title: $r('app.string.account_huawei'),
      value: this.huaweiText(),
      showArrow: false,
      showDivider: false
    })
  }

  @Builder
  dangerGroup() {
    SettingRow({
      title: $r('app.string.account_delete'),
      danger: true,
      showDivider: false,
      onTap: (): void => { this.deleteDialog.open(); }
    })
  }

  private user(): UserInfo {
    const fallback: UserInfo = {
      id: '', nickname: '', avatar: '', phone: '', email: '',
      hasPassword: false, favoriteCount: 0, likeCount: 0, bindings: []
    };
    return this.auth.user !== null && this.auth.user !== undefined ? this.auth.user : fallback;
  }

  /** 后端已做脱敏，前端只判断是否为空 */
  private bindingText(value: string): string {
    return value.length > 0 ? value : Strings.get($r('app.string.account_unbound'));
  }

  private huaweiText(): string {
    const bindings: OauthBinding[] = this.user().bindings !== null && this.user().bindings !== undefined
      ? this.user().bindings : [];
    const huawei: OauthBinding | undefined =
      bindings.find((it: OauthBinding) => it.platform === PLATFORM_HUAWEI);
    const bound: boolean = huawei !== undefined && huawei.bound;
    return Strings.get(bound ? $r('app.string.account_bound') : $r('app.string.account_unbound'));
  }

  private async confirmDelete(): Promise<void> {
    const ok: boolean = await this.vm.deleteAccount();
    if (ok) {
      // 注销成功后清空本地状态并回到首页
      NavUtil.popToRoot();
    }
  }
}
