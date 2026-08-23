import { hilog } from '@kit.PerformanceAnalysisKit';
import BuildProfile from 'BuildProfile';

const DOMAIN: number = 0xE471;
const PREFIX: string = 'EatApp';

/**
 * 全局日志封装。
 * 统一 domain 与 tag，业务侧只关心 `Logger.i('HomeVM', '...')`。
 * release 包由 BuildProfile.LOG_ENABLED 关掉 d/i 两级，w/e 始终保留。
 */
export class Logger {
  private static get verbose(): boolean {
    return BuildProfile.LOG_ENABLED as boolean;
  }

  private static format(tag: string, message: string, args: Object[]): string {
    if (args.length === 0) {
      return `[${tag}] ${message}`;
    }
    const extra: string = args.map((it: Object) => Logger.stringify(it)).join(' ');
    return `[${tag}] ${message} ${extra}`;
  }

  private static stringify(value: Object): string {
    if (value instanceof Error) {
      const err: Error = value as Error;
      return `${err.name}: ${err.message}`;
    }
    if (typeof value === 'string') {
      return value as string;
    }
    try {
      return JSON.stringify(value);
    } catch (e) {
      return String(value);
    }
  }

  static d(tag: string, message: string, ...args: Object[]): void {
    if (!Logger.verbose) {
      return;
    }
    hilog.debug(DOMAIN, PREFIX, '%{public}s', Logger.format(tag, message, args));
  }

  static i(tag: string, message: string, ...args: Object[]): void {
    if (!Logger.verbose) {
      return;
    }
    hilog.info(DOMAIN, PREFIX, '%{public}s', Logger.format(tag, message, args));
  }

  static w(tag: string, message: string, ...args: Object[]): void {
    hilog.warn(DOMAIN, PREFIX, '%{public}s', Logger.format(tag, message, args));
  }

  static e(tag: string, message: string, ...args: Object[]): void {
    hilog.error(DOMAIN, PREFIX, '%{public}s', Logger.format(tag, message, args));
  }
}
