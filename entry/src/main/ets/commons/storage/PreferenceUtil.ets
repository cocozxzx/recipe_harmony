import { preferences } from '@kit.ArkData';
import { common } from '@kit.AbilityKit';
import { Logger } from '../utils/Logger';

const TAG: string = 'PreferenceUtil';
const STORE_NAME: string = 'eat_app_store';

/**
 * preferences 封装。
 * 必须在 EntryAbility.onCreate 里先调用 `init(context)`，否则所有读写返回默认值。
 */
export class PreferenceUtil {
  private static store: preferences.Preferences | null = null;

  static async init(context: common.UIAbilityContext): Promise<void> {
    if (PreferenceUtil.store !== null) {
      return;
    }
    try {
      const options: preferences.Options = { name: STORE_NAME };
      PreferenceUtil.store = await preferences.getPreferences(context, options);
      Logger.i(TAG, 'preferences ready');
    } catch (e) {
      Logger.e(TAG, 'init failed', e as Object);
    }
  }

  static isReady(): boolean {
    return PreferenceUtil.store !== null;
  }

  static async getString(key: string, defValue: string = ''): Promise<string> {
    const store: preferences.Preferences | null = PreferenceUtil.store;
    if (store === null) {
      Logger.w(TAG, `getString before init: ${key}`);
      return defValue;
    }
    try {
      const value: preferences.ValueType = await store.get(key, defValue);
      return value as string;
    } catch (e) {
      Logger.e(TAG, `getString failed: ${key}`, e as Object);
      return defValue;
    }
  }

  static async putString(key: string, value: string): Promise<void> {
    const store: preferences.Preferences | null = PreferenceUtil.store;
    if (store === null) {
      Logger.w(TAG, `putString before init: ${key}`);
      return;
    }
    try {
      await store.put(key, value);
      await store.flush();
    } catch (e) {
      Logger.e(TAG, `putString failed: ${key}`, e as Object);
    }
  }

  static async getBoolean(key: string, defValue: boolean = false): Promise<boolean> {
    const store: preferences.Preferences | null = PreferenceUtil.store;
    if (store === null) {
      return defValue;
    }
    try {
      const value: preferences.ValueType = await store.get(key, defValue);
      return value as boolean;
    } catch (e) {
      Logger.e(TAG, `getBoolean failed: ${key}`, e as Object);
      return defValue;
    }
  }

  static async putBoolean(key: string, value: boolean): Promise<void> {
    const store: preferences.Preferences | null = PreferenceUtil.store;
    if (store === null) {
      return;
    }
    try {
      await store.put(key, value);
      await store.flush();
    } catch (e) {
      Logger.e(TAG, `putBoolean failed: ${key}`, e as Object);
    }
  }

  static async delete(key: string): Promise<void> {
    const store: preferences.Preferences | null = PreferenceUtil.store;
    if (store === null) {
      return;
    }
    try {
      await store.delete(key);
      await store.flush();
    } catch (e) {
      Logger.e(TAG, `delete failed: ${key}`, e as Object);
    }
  }

  static async clear(): Promise<void> {
    const store: preferences.Preferences | null = PreferenceUtil.store;
    if (store === null) {
      return;
    }
    try {
      await store.clear();
      await store.flush();
    } catch (e) {
      Logger.e(TAG, 'clear failed', e as Object);
    }
  }
}

/** 所有 preferences key 集中声明，避免散落字符串导致互相覆盖 */
export class PrefKeys {
  static readonly TOKEN: string = 'auth_token';
  static readonly REFRESH_TOKEN: string = 'auth_refresh_token';
  static readonly USER_INFO: string = 'auth_user_info';
  static readonly SEARCH_HISTORY: string = 'search_history';
  static readonly BROWSE_HISTORY: string = 'browse_history';
}
