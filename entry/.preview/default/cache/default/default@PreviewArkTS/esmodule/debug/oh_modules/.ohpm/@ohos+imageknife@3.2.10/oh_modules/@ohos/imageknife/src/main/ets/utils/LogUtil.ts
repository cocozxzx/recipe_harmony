import hilog from "@ohos:hilog";
export class LogUtil {
    public static readonly DOMAIN: number = 0xD002220;
    public static readonly TAG: string = 'ImageKnife::';
    public static ON: boolean = true;
    public static OFF: boolean = false;
    public static mLogLevel: boolean = LogUtil.ON;
    public static debug(message: string, ...args: Object[]) {
        if (LogUtil.mLogLevel == LogUtil.ON) {
            hilog.debug(LogUtil.DOMAIN, LogUtil.TAG, message, args);
        }
    }
    public static info(message: string, ...args: Object[]) {
        if (LogUtil.mLogLevel == LogUtil.ON) {
            hilog.info(LogUtil.DOMAIN, LogUtil.TAG, message, args);
        }
    }
    public static log(message: string, ...args: Object[]) {
        if (LogUtil.mLogLevel == LogUtil.ON) {
            hilog.debug(LogUtil.DOMAIN, LogUtil.TAG, message, args);
        }
    }
    public static warn(message: string, ...args: Object[]) {
        hilog.warn(LogUtil.DOMAIN, LogUtil.TAG, message, args);
    }
    public static error(message: string, ...args: Object[]) {
        hilog.error(LogUtil.DOMAIN, LogUtil.TAG, message, args);
    }
}
