import { JsonSafe } from '../utils/JsonSafe';

@ObservedV2
export class OauthBinding {
  @Trace platform: string = '';
  @Trace bound: boolean = false;

  static fromJson(obj: Record<string, Object>): OauthBinding {
    const binding: OauthBinding = new OauthBinding();
    binding.platform = JsonSafe.string(obj, 'platform');
    binding.bound = JsonSafe.boolean(obj, 'bound');
    return binding;
  }

  static fromJsonArray(arr: Record<string, Object>[]): OauthBinding[] {
    if (arr === null || arr === undefined) {
      return [];
    }
    const result: OauthBinding[] = [];
    for (const obj of arr) {
      result.push(OauthBinding.fromJson(obj));
    }
    return result;
  }
}

@ObservedV2
export class UserInfo {
  @Trace id: string = '';
  @Trace nickname: string = '';
  @Trace avatar: string = '';
  @Trace phone: string = '';
  @Trace email: string = '';
  @Trace hasPassword: boolean = false;
  @Trace favoriteCount: number = 0;
  @Trace likeCount: number = 0;
  @Trace bindings: OauthBinding[] = [];

  static fromJson(obj: Record<string, Object>): UserInfo {
    const info: UserInfo = new UserInfo();
    info.id = JsonSafe.string(obj, 'id');
    info.nickname = JsonSafe.string(obj, 'nickname');
    info.avatar = JsonSafe.string(obj, 'avatar');
    info.phone = JsonSafe.string(obj, 'phone');
    info.email = JsonSafe.string(obj, 'email');
    info.hasPassword = JsonSafe.boolean(obj, 'hasPassword');
    info.favoriteCount = JsonSafe.number(obj, 'favoriteCount');
    info.likeCount = JsonSafe.number(obj, 'likeCount');
    info.bindings = OauthBinding.fromJsonArray(JsonSafe.arr(obj, 'bindings'));
    return info;
  }
}

export class AuthResult {
  token: string = '';
  refreshToken: string = '';
  user: UserInfo = new UserInfo();

  static fromJson(obj: Record<string, Object>): AuthResult {
    const result: AuthResult = new AuthResult();
    result.token = JsonSafe.string(obj, 'token');
    result.refreshToken = JsonSafe.string(obj, 'refreshToken');
    const userObj: Record<string, Object> | null = JsonSafe.obj(obj, 'user');
    if (userObj !== null) {
      result.user = UserInfo.fromJson(userObj);
    }
    return result;
  }
}

export class CaptchaInfo {
  captchaKey: string = '';
  image: string = '';

  static fromJson(obj: Record<string, Object>): CaptchaInfo {
    const info: CaptchaInfo = new CaptchaInfo();
    info.captchaKey = JsonSafe.string(obj, 'captchaKey');
    info.image = JsonSafe.string(obj, 'image');
    return info;
  }
}

export const PLATFORM_HUAWEI: string = 'HUAWEI';
