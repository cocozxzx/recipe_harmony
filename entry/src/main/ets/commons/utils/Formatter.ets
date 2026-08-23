/**
 * 展示层格式化工具。纯函数，不依赖任何 UI 状态。
 */
export class Formatter {
  /**
   * 用量显示：保留 1 位小数，整数不显示小数位。
   * 10 -> "10"，10.25 -> "10.3"，0.5 -> "0.5"
   */
  static amount(value: number): string {
    const rounded: number = Math.round(value * 10) / 10;
    if (Number.isInteger(rounded)) {
      return rounded.toFixed(0);
    }
    return rounded.toFixed(1);
  }

  /** 计数：1000 以上转为 "1.2k"，避免卡片被长数字撑开 */
  static count(value: number): string {
    if (value < 1000) {
      return value.toString();
    }
    if (value < 10000) {
      return `${(Math.floor(value / 100) / 10).toFixed(1)}k`;
    }
    return `${Math.floor(value / 1000)}k`;
  }

  /** 每份热量：向下取整，避免出现 "142.857 大卡" */
  static caloriePerServing(calorie: number, baseServings: number): number {
    if (baseServings <= 0) {
      return 0;
    }
    return Math.round(calorie / baseServings);
  }

  /** 手机号脱敏，后端已脱敏时原样返回 */
  static maskPhone(phone: string): string {
    if (phone.length !== 11) {
      return phone;
    }
    return `${phone.substring(0, 3)}****${phone.substring(7)}`;
  }

  /** 时间戳 -> "今天 14:30" / "8月20日" / "2025年12月1日" */
  static historyTime(timestamp: number): string {
    const date: Date = new Date(timestamp);
    const now: Date = new Date();
    const sameYear: boolean = date.getFullYear() === now.getFullYear();
    const sameDay: boolean = sameYear && date.getMonth() === now.getMonth() && date.getDate() === now.getDate();
    if (sameDay) {
      const hh: string = date.getHours().toString().padStart(2, '0');
      const mm: string = date.getMinutes().toString().padStart(2, '0');
      return `今天 ${hh}:${mm}`;
    }
    if (sameYear) {
      return `${date.getMonth() + 1}月${date.getDate()}日`;
    }
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
  }

  static isPhone(value: string): boolean {
    return /^1[3-9]\d{9}$/.test(value);
  }

  static isEmail(value: string): boolean {
    return /^[\w.+-]+@[\w-]+(\.[\w-]+)+$/.test(value);
  }
}
