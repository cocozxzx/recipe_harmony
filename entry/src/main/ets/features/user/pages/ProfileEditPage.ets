import { common } from '@kit.AbilityKit';
import { NavUtil } from '../../../commons/router/NavUtil';
import { PrimaryButton } from '../../../commons/uikit/Buttons';
import { NetImage } from '../../../commons/uikit/NetImage';
import { TopBar } from '../../../commons/uikit/TopBar';
import { ProfileEditViewModel } from '../viewmodel/ProfileEditViewModel';

/** 资料编辑：修改昵称、更换头像 */
@ComponentV2
export struct ProfileEditPage {
  @Local vm: ProfileEditViewModel = new ProfileEditViewModel();

  aboutToAppear(): void {
    this.vm.init();
  }

  build() {
    Column() {
      TopBar({ title: $r('app.string.mine_edit_profile') })

      Column({ space: 24 }) {
        Column({ space: 12 }) {
          Stack({ alignContent: Alignment.BottomEnd }) {
            NetImage({
              url: this.vm.avatar,
              imgWidth: $r('app.float.avatar_lg'),
              imgHeight: $r('app.float.avatar_lg'),
              radius: $r('app.float.avatar_radius_lg')
            })
            Image($r('app.media.ic_camera'))
              .width($r('app.float.icon_md'))
              .height($r('app.float.icon_md'))
              .fillColor($r('app.color.text_on_brand'))
              .padding(4)
              .borderRadius($r('app.float.camera_btn_radius'))
              .backgroundColor($r('app.color.brand_primary'))
              .accessibilityText('拍照')
          }
          .accessibilityText('更换头像')
          .onClick(() => {
            const context: common.UIAbilityContext = getContext(this) as common.UIAbilityContext;
            this.vm.pickAndUploadAvatar(context);
          })

          Text($r('app.string.mine_avatar'))
            .fontSize($r('app.float.font_caption'))
            .fontColor($r('app.color.text_tertiary'))
        }
        .width('100%')

        Column({ space: 8 }) {
          Text($r('app.string.mine_nickname'))
            .fontSize($r('app.float.font_body_sm'))
            .fontColor($r('app.color.text_secondary'))
            .width('100%')
          TextInput({ text: this.vm.nickname })
            .width('100%')
            .height($r('app.float.button_height'))
            .borderRadius($r('app.float.radius_md'))
            .backgroundColor($r('app.color.bg_surface'))
            .padding({ left: $r('app.float.space_lg'), right: $r('app.float.space_lg') })
            .fontSize($r('app.float.font_body'))
            .fontColor($r('app.color.text_primary'))
            .maxLength(20)
            .onChange((value: string) => { this.vm.nickname = value; })
        }
        .width('100%')

        PrimaryButton({
          text: $r('app.string.common_save'),
          loading: this.vm.saving,
          onTap: () => this.save()
        })
      }
      .width('100%')
      .padding($r('app.float.space_lg'))
    }
    .width('100%')
    .height('100%')
    .backgroundColor($r('app.color.bg_page'))
    .expandSafeArea([SafeAreaType.KEYBOARD], [SafeAreaEdge.BOTTOM])
  }

  private async save(): Promise<void> {
    const ok: boolean = await this.vm.save();
    if (ok) {
      NavUtil.pop();
    }
  }
}
