export class JsonSafe {
  static string(obj: Record<string, Object>, key: string, fallback: string = ''): string {
    const val: Object | undefined = obj[key];
    if (val !== undefined && val !== null && typeof val === 'string') {
      return val as string;
    }
    return fallback;
  }

  static number(obj: Record<string, Object>, key: string, fallback: number = 0): number {
    const val: Object | undefined = obj[key];
    if (val !== undefined && val !== null && typeof val === 'number') {
      return val as number;
    }
    return fallback;
  }

  static boolean(obj: Record<string, Object>, key: string, fallback: boolean = false): boolean {
    const val: Object | undefined = obj[key];
    if (val !== undefined && val !== null && typeof val === 'boolean') {
      return val as boolean;
    }
    return fallback;
  }

  static obj(obj: Record<string, Object>, key: string): Record<string, Object> | null {
    const val: Object | undefined = obj[key];
    if (val !== undefined && val !== null && typeof val === 'object') {
      return val as Record<string, Object>;
    }
    return null;
  }

  static arr(obj: Record<string, Object>, key: string): Record<string, Object>[] {
    const val: Object | undefined = obj[key];
    if (val !== undefined && val !== null && Array.isArray(val)) {
      return val as Record<string, Object>[];
    }
    return [];
  }

  static stringArr(obj: Record<string, Object>, key: string): string[] {
    const val: Object | undefined = obj[key];
    if (val !== undefined && val !== null && Array.isArray(val)) {
      return val as string[];
    }
    return [];
  }
}
