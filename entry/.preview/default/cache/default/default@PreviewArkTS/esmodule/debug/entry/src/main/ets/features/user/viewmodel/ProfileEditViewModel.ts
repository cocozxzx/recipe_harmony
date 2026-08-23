import picker from "@ohos:file.picker";
import type common from "@ohos:app.ability.common";
import { AuthRepository } from "@bundle:com.eatapp.recipe/entry/ets/commons/auth/AuthRepository";
import { AuthService } from "@bundle:com.eatapp.recipe/entry/ets/commons/auth/AuthService";
import type { UserInfo } from '../../../commons/model/User';
import { readableMessage } from "@bundle:com.eatapp.recipe/entry/ets/commons/network/Errors";
import { ApiPaths } from "@bundle:com.eatapp.recipe/entry/ets/commons/network/ApiPaths";
import { HttpClient } from "@bundle:com.eatapp.recipe/entry/ets/commons/network/HttpClient";
import type { UploadResultDto } from '../../../commons/network/dto/Common';
import { Toast } from "@bundle:com.eatapp.recipe/entry/ets/commons/uikit/Toast";
import { Logger } from "@bundle:com.eatapp.recipe/entry/ets/commons/utils/Logger";
const TAG: string = 'ProfileEditViewModel';
@ObservedV2
export class ProfileEditViewModel {
    @Trace
    nickname: string = '';
    @Trace
    avatar: string = '';
    @Trace
    saving: boolean = false;
    @Trace
    uploading: boolean = false;
    init(): void {
        const user: UserInfo | null = AuthService.get().user;
        if (user !== null) {
            this.nickname = user.nickname;
            this.avatar = user.avatar;
        }
    }
    /**
     * 选图用 PhotoViewPicker——它由系统相册进程弹出选择界面，
     * 不需要申请相册读取权限，权限清单里也就不必声明媒体权限。
     */
    async pickAndUploadAvatar(context: common.UIAbilityContext): Promise<void> {
        if (this.uploading) {
            return;
        }
        this.uploading = true;
        try {
            const options: picker.PhotoSelectOptions = new picker.PhotoSelectOptions();
            options.MIMEType = picker.PhotoViewMIMETypes.IMAGE_TYPE;
            options.maxSelectNumber = 1;
            const photoPicker: picker.PhotoViewPicker = new picker.PhotoViewPicker(context);
            const result: picker.PhotoSelectResult = await photoPicker.select(options);
            const uris: string[] = result.photoUris ?? [];
            if (uris.length === 0) {
                return;
            }
            const uploaded: UploadResultDto = await HttpClient.upload<UploadResultDto>(ApiPaths.ME_AVATAR, uris[0]);
            this.avatar = uploaded.url;
        }
        catch (e) {
            Logger.e(TAG, 'upload avatar failed', e as Object);
            Toast.show(readableMessage(e as Object));
        }
        finally {
            this.uploading = false;
        }
    }
    async save(): Promise<boolean> {
        const name: string = this.nickname.trim();
        if (name.length === 0) {
            Toast.show({ "id": 16777397, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            return false;
        }
        this.saving = true;
        try {
            const updated: UserInfo = await AuthRepository.updateProfile(name, this.avatar);
            await AuthService.get().setUser(updated);
            Toast.show({ "id": 16777399, "type": 10003, params: [], "bundleName": "com.eatapp.recipe", "moduleName": "entry" });
            return true;
        }
        catch (e) {
            Logger.e(TAG, 'save profile failed', e as Object);
            Toast.show(readableMessage(e as Object));
            return false;
        }
        finally {
            this.saving = false;
        }
    }
}
