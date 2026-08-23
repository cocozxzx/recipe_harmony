# <center>ImageKnife</center>

> **当前 ImageKnife 已停止演进，推荐迁移至 [imageknifepro](https://gitcode.com/CPF-ApplicationTPC/imageknifepro)：同时提供 ArkTS 组件和 Native 组件两种使用方式；图片加载性能更优；支持通过拦截器自定义网络下载、解码、文件缓存及内存缓存，并以责任链-拦截器模式同时应用多个自定义加载策略。**

本项目基于 [Glide](https://github.com/bumptech/glide) 开发。

## 简介

ImageKnife 是专为 OpenHarmony 打造的图像加载缓存库，致力于高效、轻量、易用。主要特性：

- 支持自定义内存缓存策略，可设置内存缓存大小（默认 LRU 策略）
- 支持磁盘二级缓存，已下载图片自动保存至磁盘
- 支持自定义图片获取/网络下载实现
- 支持监听网络下载进度回调
- 继承系统 Image 能力，支持通过 `border` 设置边框和圆角
- 继承系统 Image 能力，支持通过 `objectFit` 设置图片缩放，含 Auto 模式自适应高度
- 支持通过 `transformation` 对图片进行变换处理
- 支持并发请求数量控制，支持请求排队队列优先级设置
- 生命周期已销毁的组件不再发起图片请求
- 支持自定义缓存 key
- 支持自定义 HTTP 请求头
- 支持通过 `writeCacheStrategy` 控制缓存存入策略（仅内存缓存或仅文件缓存）
- 支持 `preLoadCache` 预加载图片
- 支持 `onlyRetrieveFromCache` 仅从缓存加载图片
- 支持单个或多个图片变换（如模糊、亮度调节等）
- 内存降采样优化，降低内存占用

待实现特性：

- 支持自定义图片解码

> **注意：3.x 版本相对 2.x 版本进行了重大重构，主要变化如下：**
> - 使用 Image 组件替代 Canvas 组件进行渲染
> - 重构 Dispatch 分发逻辑，支持并发请求数控制及请求队列优先级
> - 支持通过 `initMemoryCache` 自定义内存缓存策略和大小
> - 支持通过 `option` 自定义图片获取/网络下载方法
>
> **与 2.x 版本的差异：**
> - 不支持 `drawLifeCycle` 接口（通过 Canvas 手绘图片）
> - `mainScaleType`、`border` 等参数与系统 Image 组件保持一致
> - GIF/WebP 动图播放与控制改由 ImageAnimator 实现
> - 不包含抗锯齿相关参数

## 下载安装

```bash
ohpm install @ohos/imageknife
```

OpenHarmony ohpm 环境配置等更多内容，请参考[如何安装 OpenHarmony ohpm 包](https://gitcode.com/openharmony-tpc/docs/blob/master/OpenHarmony_har_usage.md)。

若需使用图形变换功能（如模糊、亮度调节等），可额外安装 GPUImage 依赖：

```bash
ohpm install @ohos/gpu_transform
```

或在工程的 `oh-package.json5` 中添加依赖配置：

```json5
"dependencies": {
  "@ohos/gpu_transform": "^1.0.2"
}
```

## 约束与限制

### 兼容性

在下述版本验证通过：

- DevEco Studio 5.1.0 Release（5.1.0.849）, SDK: API18 Release(5.1.0.849)

> **注意：本库 `compatibleSdkVersion` 设置为 API18，不支持在低于 API18 的设备上安装使用。**

### 权限要求

加载网络图片时，需在 `module.json5` 的 `requestPermissions` 字段中添加以下权限：

```json5
"requestPermissions": [
  {
    "name": "ohos.permission.INTERNET",
    "usedScene": {
      "abilities": ["EntryAbility"],
      "when": "always"
    }
  }
]
```

## 使用示例

```typescript
import { ImageKnife, ImageKnifeComponent } from '@ohos/imageknife';

// 初始化文件缓存，建议在 UIAbility.onWindowStageCreate 中调用一次
// 参数：context，单次最大缓存文件数（256），缓存总大小上限（256 MB）
await ImageKnife.getInstance().initFileCache(getContext(this), 256, 256 * 1024 * 1024);

@Entry
@Component
struct ImageDemo {
  build() {
    Column() {
      // 加载网络图片，并指定占位图和错误图
      ImageKnifeComponent({
        imageKnifeOption: {
          loadSrc: 'https://www.openharmony.cn/_nuxt/img/logo.dcf95b3.png',
          placeholderSrc: $r('app.media.loading'),     // 加载中显示的占位图
          errorholderSrc: $r('app.media.app_icon'),    // 加载失败时显示的错误图
          objectFit: ImageFit.Contain                  // 图片缩放方式
        }
      }).width(300).height(300)
    }
  }
}
```

## 使用说明

### 1. 显示本地资源图片

```typescript
ImageKnifeComponent({
  imageKnifeOption: {
    loadSrc: $r("app.media.app_icon"),
    placeholderSrc: $r("app.media.loading"),
    errorholderSrc: $r("app.media.app_icon"),
    objectFit: ImageFit.Auto
  }
}).width(100).height(100)
```

### 2. 显示本地 context files 中的文件

```typescript
ImageKnifeComponent({
  imageKnifeOption: {
    loadSrc: this.localFile,
    placeholderSrc: $r("app.media.loading"),
    errorholderSrc: $r("app.media.app_icon"),
    objectFit: ImageFit.Auto
  }
}).width(100).height(100)
```

### 3. 显示网络图片

```typescript
ImageKnifeComponent({
  imageKnifeOption: {
    loadSrc: "https://www.openharmony.cn/_nuxt/img/logo.dcf95b3.png",
    placeholderSrc: $r("app.media.loading"),
    errorholderSrc: $r("app.media.app_icon"),
    objectFit: ImageFit.Auto
  }
}).width(100).height(100)
```

### 4. 自定义图片下载

通过 `customGetImage` 提供自定义下载函数，可替换默认的 HTTP 网络请求逻辑。

```typescript
ImageKnifeComponent({
  imageKnifeOption: {
    loadSrc: "https://file.atomgit.com/uploads/user/1704857786989_8994.jpeg",
    placeholderSrc: $r("app.media.loading"),
    errorholderSrc: $r("app.media.app_icon"),
    objectFit: ImageFit.Auto,
    customGetImage: custom
  }
}).width(100).height(100)

// 自定义实现图片获取方法，如自定义网络下载
@Concurrent
async function custom(context: Context, src: string | PixelMap | Resource): Promise<ArrayBuffer | undefined> {
  console.info("ImageKnife::  custom download: " + src)
  // 举例写法从本地文件读取，也可以自己请求网络图片
  return context.resourceManager.getMediaContentSync($r("app.media.bb").id).buffer as ArrayBuffer
}
```

### 5. 监听网络下载进度

```typescript
ImageKnifeComponent({
  imageKnifeOption: {
    loadSrc:"https://www.openharmony.cn/_nuxt/img/logo.dcf95b3.png",
    progressListener:(progress:number)=>{console.info("ImageKinfe:: call back progress = " + progress)}
  }
}).width(100).height(100)
```

### 6. 设置边框和圆角

```typescript
ImageKnifeComponent({
  imageKnifeOption: {
    loadSrc: $r("app.media.rabbit"),
    border: { radius: 50 }
  }
}).width(100).height(100)
```

### 7. 图片变换

**单种变换：**

```typescript
ImageKnifeComponent({
  imageKnifeOption: {
    loadSrc: $r("app.media.rabbit"),
    border: { radius: 50 },
    transformation: new BlurTransformation(3)   // 模糊半径 3
  }
}).width(100).height(100)
```

**多种变换组合：**

```typescript
let transformations: collections.Array<PixelMapTransformation> = new collections.Array<PixelMapTransformation>();
transformations.push(new BlurTransformation(5));           // 模糊
transformations.push(new BrightnessTransformation(0.2));   // 亮度

ImageKnifeComponent({
  imageKnifeOption: {
    loadSrc: $r('app.media.pngSample'),
    placeholderSrc: $r("app.media.loading"),
    errorholderSrc: $r("app.media.app_icon"),
    objectFit: ImageFit.Contain,
    border: { radius: { topLeft: 50, bottomRight: 50 } },  // 圆角设置
    transformation: transformations.length > 0 ? new MultiTransTransformation(transformations) : undefined
  }
}).width(300).height(300)
  .rotate({ angle: 90 })  // 旋转 90 度
  .contrast(12)            // 对比度滤波器
```

**圆形裁剪：**

```typescript
ImageKnifeComponent({
  imageKnifeOption: {
    loadSrc: $r('app.media.pngSample'),
    objectFit: ImageFit.Cover,
    border: { radius: 150 }
  }
}).width(300).height(300)
```

**圆形裁剪带边框：**

```typescript
ImageKnifeComponent({
  imageKnifeOption: {
    loadSrc: $r('app.media.pngSample'),
    objectFit: ImageFit.Cover,
    border: { radius: 150, color: Color.Red, width: 5 }
  }
}).width(300).height(300)
```

**对比度滤波变换：**

```typescript
ImageKnifeComponent({
  imageKnifeOption: {
    loadSrc: $r('app.media.pngSample')
  }
}).width(300).height(300)
  .contrast(12)
```

**旋转变换：**

```typescript
ImageKnifeComponent({
  imageKnifeOption: {
    loadSrc: $r('app.media.pngSample')
  }
}).width(300).height(300)
  .rotate({ angle: 90 })
  .backgroundColor(Color.Pink)
```

### 8. 监听图片加载成功与失败

```typescript
ImageKnifeComponent({ imageKnifeOption:
{
   loadSrc: $r("app.media.rabbit"),
   onLoadListener:{
    onLoadStart:()=>{
     this.starTime = new Date().getTime()
     console.info("Load start: ");
    },
    onLoadFailed: (err) => {
     console.error("Load Failed Reason: " + err + "  cost " + (new Date().getTime() - this.starTime) + " milliseconds");
    },
    onLoadSuccess: (data, imageData) => {
     console.info("Load Successful: cost " + (new Date().getTime() - this.starTime) + " milliseconds");
     return data;
    },
    onLoadCancel(err){
      console.info(err)
    }
   }
 })
.width(100).height(100)
```

### 9. 同步加载图片（syncLoad）

`syncLoad` 控制是否同步加载图片，默认为异步加载。加载尺寸较小的本地 Resource 图片时建议设为 `true`，可在主线程快速完成。

```typescript
ImageKnifeComponent({
        imageKnifeOption:{
          loadSrc:$r("app.media.pngSample"),
          placeholderSrc:$r("app.media.loading")
        },syncLoad:true
      })
```

### 10. 使用 ImageKnifeAnimatorComponent 加载动图

```typescript
ImageKnifeAnimatorComponent({
        imageKnifeOption: {
          loadSrc:"https://gd-hbimg.huaban.com/e0a25a7cab0d7c2431978726971d61720732728a315ae-57EskW_fw658",
          placeholderSrc:$r('app.media.loading'),
          errorholderSrc:$r('app.media.failed')
        },animatorOption:this.animatorOption
      }).width(300).height(300).backgroundColor(Color.Orange).margin({top:30})
```

### 11. 获取图片加载回调数据

通过 `onLoadListener` 中各回调的 `req` 参数，可获取本次请求的详细信息（URL、组件尺寸、时间点等）：

```typescript
ImageKnifeComponent({ imageKnifeOption:  {
                loadSrc: $r('app.media.pngSample'),
                objectFit: ImageFit.Contain,
                onLoadListener: {
                  onLoadStart: (req) => {
                    let startCallBackData = JSON.stringify(req?.imageKnifeData);
                  },
                  onLoadFailed: (res, req) => {
                    let failedBackData = res + ";" + JSON.stringify(req?.imageKnifeData);
                  },
                  onLoadSuccess: (data, imageData, req) => {
                    let successBackData = JSON.stringify(req?.imageKnifeData);
                  },
                  onLoadCancel: (res, req) => {
                    let cancelBackData = res + ";" + JSON.stringify(req?.imageKnifeData);
                  }
                },
                border: { radius: 50 },
                onComplete: (event) => {
                  if (event && event.loadingStatus == 0) {
                    let render_success = JSON.stringify(Date.now())
                  }
                }
              }
}).width(100).height(100)
```

### 12. 图片降采样

通过 `downsampleOf` 控制降采样策略，在保证显示效果的同时节约内存：

```typescript
ImageKnifeComponent({
        imageKnifeOption:{
          loadSrc:$r("app.media.pngSample"),
          placeholderSrc:$r('app.media.loading'),
          errorholderSrc:$r('app.media.failed'),
          downsampleOf: DownsampleStrategy.NONE
        }
      }).width(300).height(300)
```

### 13. 使用 RCP 自定义网络请求

```typescript
ImageKnifeComponent({
    imageKnifeOption:{
        loadSrc:"http://xx.xx",
        customGetImage:custom
     }
})
// 自定义下载方法
@Concurrent
async function custom(context: Context, src: string | PixelMap | Resource,headers?: Record<string,Object>): Promise<ArrayBuffer | undefined> {
  return new Promise((resolve,reject)=>{
    if (typeof src == "string") {
      let session = GetSession.session
      let req = new rcp.Request(src,"GET");
      session.fetch(req).then((response)=>{
        if(response.statusCode == 200) {
          let buffer = response.body
          resolve(buffer)
        } else {
          reject("rcp code:"+response.statusCode)
        }
      }).catch((err:BusinessError)=>{
        reject("error rcp src:"+src+",err:"+JSON.stringify(err))
      })
    }
  })
}
```

### 复用场景

在 LazyForEach 等列表复用场景中，必须在 `aboutToRecycle` 生命周期中将 `loadSrc` 置为空字符串，并通过 `@Watch` 监听 `loadSrc` 变化以触发图片重新加载。若不置空，复用后的组件可能持续显示空白。

```typescript
@Component
struct ReusableImageItem {
  // 使用 @Watch 监听 loadSrc 变化，变化时 ImageKnifeComponent 自动触发重新加载
  @State @Watch('onLoadSrcChanged') loadSrc: string = '';

  onLoadSrcChanged() {
    // loadSrc 改变后，ImageKnifeComponent 会自动重新请求并显示图片
  }

  // 组件即将被复用时，先将 loadSrc 置空，避免旧图片残留
  aboutToRecycle(): void {
    this.loadSrc = '';
  }

  build() {
    ImageKnifeComponent({
      imageKnifeOption: {
        loadSrc: this.loadSrc,
        placeholderSrc: $r('app.media.loading'),
        errorholderSrc: $r('app.media.app_icon')
      }
    }).width(200).height(200)
  }
}
```

## 接口说明

### ImageKnife 组件

| 组件名称                       | 参数类型                                 | 描述         |
|-------------------------------|------------------------------------------|------------|
| ImageKnifeComponent           | ImageKnifeOption                         | 图片显示组件     |
| ImageKnifeComponentV2         | ImageKnifeOptionV2                       | 基于 @ComponentV2 状态管理的图片显示组件，`loadSrc`、`transformation` 等关键字段支持响应式更新 |
| ImageKnifeAnimatorComponent   | ImageKnifeOption、AnimatorOption         | 动图播放控制组件   |
| ImageKnifeAnimatorComponentV2 | ImageKnifeOptionV2、AnimatorOptionV2     | 基于 @ComponentV2 状态管理的动图播放控制组件   |

### AnimatorOption 参数

| 参数名称       | 类型              | 必填 | 描述                              |
|------------|-----------------|------|---------------------------------|
| state      | AnimationStatus | 否    | 动画播放状态                          |
| iterations | number          | 否    | 播放次数                            |
| reverse    | boolean         | 否    | 是否反向播放                          |
| onStart    | () => void      | 否    | 动画开始播放时触发                       |
| onFinish   | () => void      | 否    | 动画播放完成或停止时触发                    |
| onPause    | () => void      | 否    | 动画暂停时触发                         |
| onCancel   | () => void      | 否    | 动画重置到初始状态时触发                    |
| onRepeat   | () => void      | 否    | 动画重复播放时触发                       |

### ImageKnifeOption 参数

| 参数名称                  | 类型                                                                                                                                                                                                                                                                                                 | 必填 | 描述                                  |
|-----------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------|-------------------------------------|
| loadSrc               | string \| PixelMap \| Resource                                                                                                                                                                                                                                                                     | 是    | 主图地址或资源                             |
| placeholderSrc        | PixelMap \| Resource                                                                                                                                                                                                                                                                               | 否    | 加载中占位图                              |
| errorholderSrc        | PixelMap \| Resource                                                                                                                                                                                                                                                                               | 否    | 加载失败错误图                             |
| objectFit             | ImageFit                                                                                                                                                                                                                                                                                           | 否    | 主图缩放方式                              |
| placeholderObjectFit  | ImageFit                                                                                                                                                                                                                                                                                           | 否    | 占位图缩放方式                             |
| errorholderObjectFit  | ImageFit                                                                                                                                                                                                                                                                                           | 否    | 错误图缩放方式                             |
| writeCacheStrategy    | CacheStrategy                                                                                                                                                                                                                                                                                      | 否    | 缓存写入策略                              |
| onlyRetrieveFromCache | boolean                                                                                                                                                                                                                                                                                            | 否    | 设为 `true` 时跳过网络和本地请求，仅从缓存加载         |
| customGetImage        | (context: Context, src: string \| PixelMap \| Resource, headers?: Record<string, Object>, httpOption?: HttpRequestOption) => Promise\<ArrayBuffer \| undefined\>                                                                                                                                                                 | 否    | 自定义图片获取/下载方法                        |
| border                | BorderOptions                                                                                                                                                                                                                                                                                      | 否    | 边框和圆角配置                             |
| priority              | taskpool.Priority                                                                                                                                                                                                                                                                                  | 否    | 请求加载优先级                             |
| context               | common.UIAbilityContext                                                                                                                                                                                                                                                                            | 否    | 上下文，未指定时使用全局上下文                     |
| progressListener      | (progress: number) => void                                                                                                                                                                                                                                                                         | 否    | 网络下载进度回调，取值 0～1                     |
| signature             | string                                                                                                                                                                                                                                                                                             | 否    | 自定义缓存 key 补充字段                      |
| headerOption          | Array\<HeaderOptions\>                                                                                                                                                                                                                                                                             | 否    | 当次请求的 HTTP 请求头                      |
| transformation        | PixelMapTransformation                                                                                                                                                                                                                                                                             | 否    | 图片变换（单个或多个组合）                       |
| drawingColorFilter    | ColorFilter \| drawing.ColorFilter                                                                                                                                                                                                                                                                 | 否    | 颜色滤镜效果                              |
| onComplete            | (event: EventImage \| undefined) => void                                                                                                                                                                                                                                                           | 否    | 图片渲染完成回调                            |
| onLoadListener        | onLoadStart?: (req?: ImageKnifeRequest) => void, onLoadSuccess?: (data: string \| PixelMap \| undefined, imageData: ImageKnifeData, req?: ImageKnifeRequest) => void, onLoadFailed?: (err: string, req?: ImageKnifeRequest) => void, onLoadCancel?: (res: string, req?: ImageKnifeRequest) => void | 否    | 图片加载状态回调（开始/成功/失败/取消）               |
| downsampleOf          | DownsampleStrategy                                                                                                                                                                                                                                                                                 | 否    | 降采样策略                               |
| httpOption            | HttpRequestOption                                                                                                                                                                                                                                                                                  | 否    | 网络请求配置（超时、重试等）                      |
| pixelName             | string                                                                                                                                                                                                                                                                                             | 否    | 位图命名，用于区分多个 PixelMap 缓存             |
| dynamicRangeMode      | DynamicRangeMode                                                                                                                                                                                                                                                                                   | 否    | 期望展示的图像动态范围                         |

### 降采样策略（DownsampleStrategy）

| 枚举值                      | 描述                             |
|--------------------------|--------------------------------|
| NONE                     | 不进行降采样                         |
| AT_MOST                  | 请求尺寸大于实际尺寸时不放大                 |
| FIT_CENTER_MEMORY        | 两边自适应，内存优先                     |
| FIT_CENTER_QUALITY       | 两边自适应，质量优先                     |
| CENTER_INSIDE_MEMORY     | 按宽高最大缩放比缩小，内存优先                |
| CENTER_INSIDE_QUALITY    | 按宽高最大缩放比缩小，质量优先                |
| AT_LEAST                 | 按宽高最小缩放比适配                     |

### 缓存策略（CacheStrategy）

| 枚举值                      | 描述                         |
|--------------------------|--------------------------------|
| Default                  | 默认-写入/读取内存和文件缓存      |
| Memory                   | 只写入/读取内存缓存              |
| File                     | 只写入/读取文件缓存              |

### ImageKnife 接口

| 接口名称                              | 参数                                                                                                                                                | 描述                                                                                                                                                                    |
|-------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| initMemoryCache                     | newMemoryCache: IMemoryCache                                                                                                                      | 自定义内存缓存策略（默认：LRU，最多 256 条 / 128 MB；退出页面不会自动释放缓存，达到上限后自动淘汰最久未使用的条目）                                                                                                                                                         |
| initFileCache                       | context: Context, size: number, memory: number                                                                                                    | 初始化文件缓存，指定最大文件数量（size）和总容量上限（memory，单位字节）                                                                                                                           |
| reload                              | request: ImageKnifeRequest                                                                                                                        | 重新加载指定图片请求                                                                                                                                                            |
| preLoad                             | loadSrc: string \| ImageKnifeOption                                                                                                               | 预加载图片，返回 ImageKnifeRequest                                                                                                                                            |
| cancel                              | request: ImageKnifeRequest                                                                                                                        | 取消指定图片请求                                                                                                                                                              |
| preLoadCache                        | loadSrc: string \| ImageKnifeOption                                                                                                               | 预加载图片并返回文件缓存路径                                                                                                                                                        |
| getCacheImage                       | loadSrc: string, cacheType?: CacheStrategy, signature?: string                                                                                    | 从内存或文件缓存中异步获取图片资源                                                                                                                                                     |
| getCacheImageSync                   | loadSrc: string, cacheType?: CacheStrategy, signature?: string                                                                                    | 从内存或文件缓存中同步获取图片资源                                                                                                                                                     |
| addHeader                           | key: string, value: Object                                                                                                                        | 全局添加 HTTP 请求头                                                                                                                                                         |
| serHeaderOptions                    | Array\<HeaderOptions\>                                                                                                                            | 全局设置 HTTP 请求头列表                                                                                                                                                        |
| deleteHeader                        | key: string                                                                                                                                       | 全局删除指定 HTTP 请求头                                                                                                                                                        |
| setCustomGetImage                   | customGetImage?: (context: Context, src: string \| PixelMap \| Resource, headers?: Record<string, Object>) => Promise\<ArrayBuffer \| undefined\> | 全局设置自定义图片获取/下载方法                                                                                                                                                      |
| setEngineKeyImpl                    | IEngineKey                                                                                                                                        | 全局设置缓存 key 生成策略                                                                                                                                                       |
| setMaxRequests                      | concurrency: number                                                                                                                               | 设置最大并发请求数                                                                                                                                                             |
| setConnectTimeout                   | timeout: number                                                                                                                                   | 设置连接超时时长（毫秒）                                                                                                                                                          |
| setReadTimeout                      | timeout: number                                                                                                                                   | 设置读取超时时长（毫秒）                                                                                                                                                          |
| putCacheImage                       | url: string, pixelMap: PixelMap, cacheType?: CacheStrategy, packOption?: image.PackingOption, signature?: string                                  | 将 PixelMap 写入内存或磁盘缓存                                                                                                                                                  |
| removeMemoryCache                   | url: string \| ImageKnifeOption                                                                                                                   | 清除指定 URL 的内存缓存                                                                                                                                                        |
| removeFileCache                     | url: string \| ImageKnifeOption                                                                                                                   | 清除指定 URL 的磁盘缓存                                                                                                                                                        |
| removeAllMemoryCache                | -                                                                                                                                                 | 清除全部内存缓存                                                                                                                                                              |
| removeAllFileCache                  | -                                                                                                                                                 | 清除全部磁盘缓存                                                                                                                                                              |
| getCacheLimitSize                   | cacheType?: CacheStrategy                                                                                                                         | 获取指定类型缓存的容量上限                                                                                                                                                         |
| getCurrentCacheNum                  | cacheType?: CacheStrategy                                                                                                                         | 获取指定类型缓存当前缓存的图片数量                                                                                                                                                     |
| getCurrentCacheSize                 | cacheType?: CacheStrategy                                                                                                                         | 获取指定类型缓存当前已用空间                                                                                                                                                        |
| setJpegOptimizeDecoding（3.2.9+）    | enable: boolean                                                                                                                                   | 启用/禁用 JPEG 解码优化，以减小解码后的图片内存占用。默认不启用。启用后对已设置图形变换的 JPEG 图片不生效；`getCacheImage` 可能返回非 RGBA 格式的 PixelMap。 |
| getJpegOptimizeDecoding（3.2.9+）    | -                                                                                                                                                 | 返回 JPEG 解码优化当前是否已启用                                                                                                                                                   |

### 回调接口说明

| 回调名称          | 回调参数                                                                                              | 描述                                                                                                                                                                  |
|---------------|---------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| onLoadStart   | req: ImageKnifeRequest                                                                            | `req` 包含图片请求信息（URL、组件宽高）及 `ImageKnifeData`（请求开始时间、内存缓存检查时间点）                                                                                                        |
| onLoadSuccess | data: string \| PixelMap \| undefined, imageData: ImageKnifeData, req?: ImageKnifeRequest         | `data`：加载成功的数据；`imageData`：图片缓存信息；`req.imageKnifeData`：图片原始尺寸、解码尺寸、格式、帧数、请求各阶段耗时                                                                                   |
| onLoadFailed  | err: string, req?: ImageKnifeRequest                                                              | `err`：错误描述；`req.imageKnifeData` 包含错误阶段、错误码、网络请求错误码及各阶段耗时                                                                                                           |
| onLoadCancel  | reason: string, req?: ImageKnifeRequest                                                           | `reason`：取消原因；`req.imageKnifeData` 包含错误阶段、错误码及各阶段耗时（含请求取消时间点）                                                                                                       |

### 图形变换类型（需安装 GPUImage 依赖）

| 变换类型                               | 描述                          |
| ---------------------------------- | ----------------------------- |
| BlurTransformation                 | 模糊处理                          |
| BrightnessTransformation           | 亮度滤波器                         |
| CropSquareTransformation           | 正方形裁剪                         |
| CropTransformation                 | 自定义矩形裁剪                       |
| CropCircleTransformation           | 圆形裁剪                             |
| CropCircleWithBorderTransformation | 圆环裁剪                         |
| GrayScaleTransformation            | 灰度滤波器                         |
| InvertTransformation               | 反转滤波器                         |
| KuwaharaTransformation             | 桑原滤波器（需 GPUImage）             |
| MaskTransformation                 | 遮罩                            |
| PixelationTransformation           | 像素化滤波器（需 GPUImage）            |
| SepiaTransformation                | 乌墨色滤波器（需 GPUImage）            |
| SketchTransformation               | 素描滤波器（需 GPUImage）             |
| SwirlTransformation                | 扭曲滤波器（需 GPUImage）             |
| ToonTransformation                 | 动画滤波器（需 GPUImage）             |
| VignetterTransformation            | 装饰（晕影）滤波器（需 GPUImage）         |

## 关于混淆

代码混淆详情请查看[代码混淆简介](https://docs.openharmony.cn/pages/v5.0/zh-cn/application-dev/arkts-utils/source-obfuscation.md)。

若希望 imageknife 库在混淆过程中不被混淆，需在混淆规则配置文件 `obfuscation-rules.txt` 中添加排除规则：

```
-keep
./oh_modules/@ohos/imageknife
```

若需关闭 ImageKnife 内部调试日志（如 `showPixelMap`、`executeJob` 等频繁输出的 hilog 日志），可调用：

```typescript
import { LogUtil } from '@ohos/imageknife';

LogUtil.mLogLevel = LogUtil.OFF;
```

## 遗留问题

- ImageKnifeAnimator 组件不支持设置 `ImageFit` 属性
- `ImageKnifeComponentV2` 暂不支持在 `@ReusableV2` 装饰的组件中使用（[issue #677](https://gitcode.com/CPF-ApplicationTPC/ImageKnife/issues/677)）；如需在 `@ReusableV2` 场景使用，请迁移至 [imageknifepro](https://gitcode.com/CPF-ApplicationTPC/imageknifepro)

## 目录结构

```
/ImageKnife               # 项目根目录
 entry                 # 示例代码目录
 library               # ImageKnife 库目录
    src/main/ets
       3rd_party     # MD5 哈希算法实现
       cache         # 缓存相关实现
       components    # 组件实现
       downsampling  # 图片降采样
       key           # 缓存键生成
       loaderStrategy  # 图片加载策略
       model         # 数据模型
       parseStrategy # 图片解析策略
       queue         # 请求队列
       transform     # 图片变换
       utils         # 工具类
       ImageKnife.ets           # 核心类
       ImageKnifeDispatcher.ets # 请求调度器
       ImageKnifeLoader.ets    # 图片加载器
    index.ets         # 库 API 导出入口
 sharedlibrary         # 跨模块图片读取功能验证模块
 gpu_transform         # GPU 变换相关模块
 README.md             # 英文安装使用说明
 README_zh.md          # 中文安装使用说明
```

## 贡献代码

使用过程中发现任何问题，欢迎提 [Issue](https://gitcode.com/CPF-ApplicationTPC/ImageKnife/issues) 或发 [PR](https://gitcode.com/CPF-ApplicationTPC/ImageKnife/pulls) 共建。

## 开源协议

本项目基于 [Apache License 2.0](https://gitcode.com/CPF-ApplicationTPC/ImageKnife/blob/master/LICENSE)，请自由地享受和参与开源。
