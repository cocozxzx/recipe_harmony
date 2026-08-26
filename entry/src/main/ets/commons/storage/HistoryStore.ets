import { JsonSafe } from '../utils/JsonSafe';
import { PreferenceUtil, PrefKeys } from './PreferenceUtil';
import { Logger } from '../utils/Logger';

const TAG: string = 'HistoryStore';
const MAX_BROWSE: number = 50;
const MAX_SEARCH: number = 10;

/**
 * 浏览历史条目。
 * 第一期只存本地——只有鸿蒙一个端，没有跨端同步需求，不值当为此建后端表。
 */
@ObservedV2
export class BrowseHistoryItem {
  @Trace id: string = '';
  @Trace name: string = '';
  @Trace coverImage: string = '';
  @Trace time: number = 0;

  static create(id: string, name: string, coverImage: string, time: number): BrowseHistoryItem {
    const item: BrowseHistoryItem = new BrowseHistoryItem();
    item.id = id;
    item.name = name;
    item.coverImage = coverImage;
    item.time = time;
    return item;
  }
}

/** 浏览历史 / 搜索历史，均落 preferences */
export class HistoryStore {

  // ---------- 浏览历史 ----------

  static async getBrowseHistory(): Promise<BrowseHistoryItem[]> {
    const raw: string = await PreferenceUtil.getString(PrefKeys.BROWSE_HISTORY, '[]');
    return HistoryStore.parseBrowse(raw);
  }

  /** 详情页打开时调用。同一食谱重复浏览只保留最新一条并置顶。 */
  static async addBrowseHistory(item: BrowseHistoryItem): Promise<void> {
    const list: BrowseHistoryItem[] = await HistoryStore.getBrowseHistory();
    const deduped: BrowseHistoryItem[] = list.filter((it: BrowseHistoryItem) => it.id !== item.id);
    deduped.unshift(item);
    const trimmed: BrowseHistoryItem[] = deduped.slice(0, MAX_BROWSE);
    await PreferenceUtil.putString(PrefKeys.BROWSE_HISTORY, JSON.stringify(trimmed));
  }

  static async removeBrowseHistory(id: string): Promise<BrowseHistoryItem[]> {
    const list: BrowseHistoryItem[] = await HistoryStore.getBrowseHistory();
    const next: BrowseHistoryItem[] = list.filter((it: BrowseHistoryItem) => it.id !== id);
    await PreferenceUtil.putString(PrefKeys.BROWSE_HISTORY, JSON.stringify(next));
    return next;
  }

  static async clearBrowseHistory(): Promise<void> {
    await PreferenceUtil.delete(PrefKeys.BROWSE_HISTORY);
  }

  // ---------- 搜索历史 ----------

  static async getSearchHistory(): Promise<string[]> {
    const raw: string = await PreferenceUtil.getString(PrefKeys.SEARCH_HISTORY, '[]');
    return HistoryStore.parseSearch(raw);
  }

  /** 去重后置顶，最多保留 10 条 */
  static async addSearchHistory(keyword: string): Promise<string[]> {
    const trimmedKeyword: string = keyword.trim();
    if (trimmedKeyword.length === 0) {
      return HistoryStore.getSearchHistory();
    }
    const list: string[] = await HistoryStore.getSearchHistory();
    const deduped: string[] = list.filter((it: string) => it !== trimmedKeyword);
    deduped.unshift(trimmedKeyword);
    const next: string[] = deduped.slice(0, MAX_SEARCH);
    await PreferenceUtil.putString(PrefKeys.SEARCH_HISTORY, JSON.stringify(next));
    return next;
  }

  static async removeSearchHistory(keyword: string): Promise<string[]> {
    const list: string[] = await HistoryStore.getSearchHistory();
    const next: string[] = list.filter((it: string) => it !== keyword);
    await PreferenceUtil.putString(PrefKeys.SEARCH_HISTORY, JSON.stringify(next));
    return next;
  }

  static async clearSearchHistory(): Promise<void> {
    await PreferenceUtil.delete(PrefKeys.SEARCH_HISTORY);
  }

  // ---------- 反序列化 ----------
  // ArkTS 里 JSON.parse 的结果不能直接当对象用，统一在这里断言并兜底

  private static parseBrowse(raw: string): BrowseHistoryItem[] {
    try {
      const parsed: Record<string, Object>[] = JSON.parse(raw);
      if (!Array.isArray(parsed)) {
        return [];
      }
      const result: BrowseHistoryItem[] = [];
      for (const obj of parsed) {
        const item: BrowseHistoryItem = new BrowseHistoryItem();
        item.id = JsonSafe.string(obj, 'id');
        item.name = JsonSafe.string(obj, 'name');
        item.coverImage = JsonSafe.string(obj, 'coverImage');
        item.time = JsonSafe.number(obj, 'time');
        result.push(item);
      }
      return result;
    } catch (e) {
      Logger.e(TAG, 'parse browse history failed', e);
      return [];
    }
  }

  private static parseSearch(raw: string): string[] {
    try {
      const parsed: string[] = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      Logger.e(TAG, 'parse search history failed', e);
      return [];
    }
  }
}
