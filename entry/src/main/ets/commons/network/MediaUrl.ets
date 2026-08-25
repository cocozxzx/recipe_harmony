import BuildProfile from 'BuildProfile';

/**
 * 图片地址归一化。
 *
 * 后端把上传的文件存成站内相对路径（/upload/recipe-cover/xxx.jpg）。
 * 管理端是同源网页，浏览器会自动拿当前站点补全，所以那边一直是好的；
 * App 不是从服务器加载的页面，相对路径没有基准，必须自己补上服务端 origin，
 * 否则 ImageKnife 拿到的是个不合法的 URL，只会一路走到 errorholder。
 *
 * origin 从 API_BASE_URL 里截，不另配一份：换环境时只改 build-profile 一处，
 * 不会出现「接口指向新机器、图片还指着旧机器」。
 */
export class MediaUrl {
  private static cachedOrigin: string = '';

  /**
   * 补全图片地址。已经是完整地址的原样返回——
   * 以后把存储换成 OSS/CDN 时后端会直接下发 https 绝对地址，这里不用再改。
   */
  static resolve(url: string): string {
    if (url.length === 0) {
      return '';
    }
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
      return url;
    }
    const origin: string = MediaUrl.origin();
    return url.startsWith('/') ? origin + url : origin + '/' + url;
  }

  /** 从 API_BASE_URL 里截出 scheme://host:port，丢掉 /api/app/v1 这段路径 */
  private static origin(): string {
    if (MediaUrl.cachedOrigin.length > 0) {
      return MediaUrl.cachedOrigin;
    }
    const base: string = BuildProfile.API_BASE_URL;
    const schemeEnd: number = base.indexOf('://');
    const pathStart: number = schemeEnd < 0 ? base.indexOf('/') : base.indexOf('/', schemeEnd + 3);
    MediaUrl.cachedOrigin = pathStart < 0 ? base : base.substring(0, pathStart);
    return MediaUrl.cachedOrigin;
  }
}
