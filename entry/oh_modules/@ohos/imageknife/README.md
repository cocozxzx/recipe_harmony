# <center>ImageKnife</center>

> **ImageKnife has ceased active development. We recommend migrating to [imageknifepro](https://gitcode.com/CPF-ApplicationTPC/imageknifepro), which provides both ArkTS and Native component usage modes, offers better image loading performance, and supports customizing network download, decoding, file caching, and memory caching via interceptors using a responsibility chain-interceptor pattern.**

This project is based on [Glide](https://github.com/bumptech/glide).

## Introduction

ImageKnife is an image loading and caching library designed specifically for OpenHarmony, built for efficiency, lightness, and ease of use. Key features:

- Custom memory cache strategy with configurable cache size (LRU by default)
- Disk L2 cache: downloaded images are automatically saved to disk
- Custom image obtaining/network download implementation
- Network download progress callback
- Inherits system Image capabilities: `border` support for borders and rounded corners
- Inherits system Image capabilities: `objectFit` support for image scaling, including Auto mode for adaptive height
- Image transformations via `transformation`
- Concurrent request count control with request queue priority support
- Components whose lifecycle has been destroyed no longer initiate image requests
- Custom cache key
- Custom HTTP request headers
- Cache write strategy control via `writeCacheStrategy` (memory-only or file-only)
- Image preloading via `preLoadCache`
- Cache-only image loading via `onlyRetrieveFromCache`
- Single or multiple image transformations (e.g., blur, brightness)
- Memory downsampling optimization to reduce memory usage

Planned features:

- Custom image decoding

> **Note: Version 3.x has undergone major refactoring compared to 2.x, with the following main changes:**
> - Rendering with the Image component instead of the Canvas component
> - Refactored Dispatch logic supporting concurrent request count control and queue priority
> - Custom memory cache strategy and size via `initMemoryCache`
> - Custom image obtaining/download via `option`
>
> **Differences from 2.x:**
> - The `drawLifeCycle` API is not supported (manual canvas drawing)
> - Parameters such as `mainScaleType` and `border` are now aligned with the system Image component
> - GIF/WebP animation playback and control are now handled by ImageAnimator
> - Anti-aliasing related parameters are not included

## Installation

```bash
ohpm install @ohos/imageknife
```

For more information on OpenHarmony ohpm environment setup, see [How to Install OpenHarmony ohpm Packages](https://gitcode.com/openharmony-tpc/docs/blob/master/OpenHarmony_har_usage.md).

To use image transformation features (e.g., blur, brightness), install the GPUImage dependency:

```bash
ohpm install @ohos/gpu_transform
```

Or add the dependency in your project's `oh-package.json5`:

```json5
"dependencies": {
  "@ohos/gpu_transform": "^1.0.2"
}
```

## Constraints

### Compatibility

Verified on the following versions:

- DevEco Studio 5.1.0 Release (5.1.0.849), SDK: API18 Release(5.1.0.849)

> **Note: This library sets `compatibleSdkVersion` to API18. It cannot be installed or used on devices running below API18.**

### Required Permissions

When loading network images, add the following permission to the `requestPermissions` field in `module.json5`:

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

## Quick Start

```typescript
import { ImageKnife, ImageKnifeComponent } from '@ohos/imageknife';

// Initialize file cache once, recommended in UIAbility.onWindowStageCreate
// Parameters: context, max cached file count (256), total cache size limit (256 MB)
await ImageKnife.getInstance().initFileCache(getContext(this), 256, 256 * 1024 * 1024);

@Entry
@Component
struct ImageDemo {
  build() {
    Column() {
      // Load a network image with a placeholder and error image
      ImageKnifeComponent({
        imageKnifeOption: {
          loadSrc: 'https://www.openharmony.cn/_nuxt/img/logo.dcf95b3.png',
          placeholderSrc: $r('app.media.loading'),     // Placeholder shown while loading
          errorholderSrc: $r('app.media.app_icon'),    // Error image shown on failure
          objectFit: ImageFit.Contain                  // Image scaling mode
        }
      }).width(300).height(300)
    }
  }
}
```

## How to Use

### 1. Display a Local Resource Image

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

### 2. Display a File from Local Context Files

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

### 3. Display a Network Image

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

### 4. Custom Image Download

Use `customGetImage` to provide a custom download function, replacing the default HTTP request logic.

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

// Custom image acquisition; replace with your own network request logic as needed
@Concurrent
async function custom(context: Context, src: string | PixelMap | Resource): Promise<ArrayBuffer | undefined> {
  console.info("ImageKnife::  custom download: " + src)
  // Example: reads from a local file; replace with your own request logic
  return context.resourceManager.getMediaContentSync($r("app.media.bb").id).buffer as ArrayBuffer
}
```

### 5. Listen for Network Download Progress

```typescript
ImageKnifeComponent({
  imageKnifeOption: {
    loadSrc:"https://www.openharmony.cn/_nuxt/img/logo.dcf95b3.png",
    progressListener:(progress:number)=>{console.info("ImageKinfe:: call back progress = " + progress)}
  }
}).width(100).height(100)
```

### 6. Set Border and Rounded Corners

```typescript
ImageKnifeComponent({
  imageKnifeOption: {
    loadSrc: $r("app.media.rabbit"),
    border: { radius: 50 }
  }
}).width(100).height(100)
```

### 7. Image Transformations

**Single transformation:**

```typescript
ImageKnifeComponent({
  imageKnifeOption: {
    loadSrc: $r("app.media.rabbit"),
    border: { radius: 50 },
    transformation: new BlurTransformation(3)   // Blur radius 3
  }
}).width(100).height(100)
```

**Multiple combined transformations:**

```typescript
let transformations: collections.Array<PixelMapTransformation> = new collections.Array<PixelMapTransformation>();
transformations.push(new BlurTransformation(5));           // Blur
transformations.push(new BrightnessTransformation(0.2));   // Brightness

ImageKnifeComponent({
  imageKnifeOption: {
    loadSrc: $r('app.media.pngSample'),
    placeholderSrc: $r("app.media.loading"),
    errorholderSrc: $r("app.media.app_icon"),
    objectFit: ImageFit.Contain,
    border: { radius: { topLeft: 50, bottomRight: 50 } },  // Rounded corners
    transformation: transformations.length > 0 ? new MultiTransTransformation(transformations) : undefined
  }
}).width(300).height(300)
  .rotate({ angle: 90 })  // Rotate 90 degrees
  .contrast(12)            // Contrast filter
```

**Circular crop:**

```typescript
ImageKnifeComponent({
  imageKnifeOption: {
    loadSrc: $r('app.media.pngSample'),
    objectFit: ImageFit.Cover,
    border: { radius: 150 }
  }
}).width(300).height(300)
```

**Circular crop with border:**

```typescript
ImageKnifeComponent({
  imageKnifeOption: {
    loadSrc: $r('app.media.pngSample'),
    objectFit: ImageFit.Cover,
    border: { radius: 150, color: Color.Red, width: 5 }
  }
}).width(300).height(300)
```

**Contrast filter:**

```typescript
ImageKnifeComponent({
  imageKnifeOption: {
    loadSrc: $r('app.media.pngSample')
  }
}).width(300).height(300)
  .contrast(12)
```

**Rotation:**

```typescript
ImageKnifeComponent({
  imageKnifeOption: {
    loadSrc: $r('app.media.pngSample')
  }
}).width(300).height(300)
  .rotate({ angle: 90 })
  .backgroundColor(Color.Pink)
```

### 8. Listen for Image Load Success and Failure

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

### 9. Synchronous Image Loading (syncLoad)

`syncLoad` controls whether images are loaded synchronously. The default is asynchronous. For small local Resource images, set `syncLoad` to `true` for faster loading on the main thread.

```typescript
ImageKnifeComponent({
        imageKnifeOption:{
          loadSrc:$r("app.media.pngSample"),
          placeholderSrc:$r("app.media.loading")
        },syncLoad:true
      })
```

### 10. Using ImageKnifeAnimatorComponent for Animated Images

```typescript
ImageKnifeAnimatorComponent({
        imageKnifeOption: {
          loadSrc:"https://gd-hbimg.huaban.com/e0a25a7cab0d7c2431978726971d61720732728a315ae-57EskW_fw658",
          placeholderSrc:$r('app.media.loading'),
          errorholderSrc:$r('app.media.failed')
        },animatorOption:this.animatorOption
      }).width(300).height(300).backgroundColor(Color.Orange).margin({top:30})
```

### 11. Retrieve Image Load Callback Data

The `req` parameter in each `onLoadListener` callback provides detailed request information (URL, component dimensions, timestamps):

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

### 12. Image Downsampling

Use `downsampleOf` to control the downsampling strategy, balancing display quality and memory usage:

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

### 13. Custom RCP Network Request

```typescript
ImageKnifeComponent({
    imageKnifeOption:{
        loadSrc:"http://xx.xx",
        customGetImage:custom
     }
})
// Custom download method
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

### Component Reuse

In list reuse scenarios such as LazyForEach, you must set `loadSrc` to an empty string in the `aboutToRecycle` lifecycle and use `@Watch` to listen for `loadSrc` changes to trigger a reload. Failing to do so may leave the reused component blank.

```typescript
@Component
struct ReusableImageItem {
  // @Watch triggers ImageKnifeComponent to reload when loadSrc changes
  @State @Watch('onLoadSrcChanged') loadSrc: string = '';

  onLoadSrcChanged() {
    // ImageKnifeComponent automatically re-requests and displays the image on loadSrc change
  }

  // Clear loadSrc before reuse to prevent stale image residue
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

## Available APIs

### ImageKnife Components

| Name                          | Parameter Type                              | Description                      |
|-------------------------------|---------------------------------------------|----------------------------------|
| ImageKnifeComponent           | ImageKnifeOption                            | Image display component          |
| ImageKnifeComponentV2         | ImageKnifeOptionV2                          | Image display component based on @ComponentV2 state management; key fields such as `loadSrc` and `transformation` support reactive updates |
| ImageKnifeAnimatorComponent   | ImageKnifeOption, AnimatorOption            | Animated image control component |
| ImageKnifeAnimatorComponentV2 | ImageKnifeOptionV2, AnimatorOptionV2        | Animation playback control component based on @ComponentV2 state management   |

### AnimatorOption Parameters

| Name       | Type            | Required | Description                                      |
|------------|-----------------|----------|--------------------------------------------------|
| state      | AnimationStatus | No       | Animation playback state                         |
| iterations | number          | No       | Number of playback times                         |
| reverse    | boolean         | No       | Whether to play in reverse                       |
| onStart    | () => void      | No       | Triggered when the animation starts              |
| onFinish   | () => void      | No       | Triggered when the animation finishes or stops   |
| onPause    | () => void      | No       | Triggered when the animation pauses              |
| onCancel   | () => void      | No       | Triggered when the animation resets to its initial state |
| onRepeat   | () => void      | No       | Triggered when the animation repeats             |

### ImageKnifeOption Parameters

| Name                  | Type                                                                                                                                                                                                                                                                                               | Required | Description                                      |
|-----------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------|--------------------------------------------------|
| loadSrc               | string \| PixelMap \| Resource                                                                                                                                                                                                                                                                     | Yes      | Main image source                                |
| placeholderSrc        | PixelMap \| Resource                                                                                                                                                                                                                                                                               | No       | Placeholder image shown while loading            |
| errorholderSrc        | PixelMap \| Resource                                                                                                                                                                                                                                                                               | No       | Error image shown on load failure                |
| objectFit             | ImageFit                                                                                                                                                                                                                                                                                           | No       | Main image scaling mode                          |
| placeholderObjectFit  | ImageFit                                                                                                                                                                                                                                                                                           | No       | Placeholder image scaling mode                   |
| errorholderObjectFit  | ImageFit                                                                                                                                                                                                                                                                                           | No       | Error image scaling mode                         |
| writeCacheStrategy    | CacheStrategy                                                                                                                                                                                                                                                                                      | No       | Cache write strategy                             |
| onlyRetrieveFromCache | boolean                                                                                                                                                                                                                                                                                            | No       | If `true`, skip network and local requests; load from cache only |
| customGetImage        | (context: Context, src: string \| PixelMap \| Resource, headers?: Record<string, Object>, httpOption?: HttpRequestOption) => Promise\<ArrayBuffer \| undefined\>                                                                                                                                                                 | No       | Custom image obtaining/download method           |
| border                | BorderOptions                                                                                                                                                                                                                                                                                      | No       | Border and rounded corner configuration          |
| priority              | taskpool.Priority                                                                                                                                                                                                                                                                                  | No       | Request loading priority                         |
| context               | common.UIAbilityContext                                                                                                                                                                                                                                                                            | No       | Context; uses global context if not specified    |
| progressListener      | (progress: number) => void                                                                                                                                                                                                                                                                         | No       | Network download progress callback, range 0 to 1 |
| signature             | string                                                                                                                                                                                                                                                                                             | No       | Custom cache key supplement                      |
| headerOption          | Array\<HeaderOptions\>                                                                                                                                                                                                                                                                             | No       | HTTP request headers for this request            |
| transformation        | PixelMapTransformation                                                                                                                                                                                                                                                                             | No       | Image transformation (single or combined)        |
| drawingColorFilter    | ColorFilter \| drawing.ColorFilter                                                                                                                                                                                                                                                                 | No       | Color filter effect                              |
| onComplete            | (event: EventImage \| undefined) => void                                                                                                                                                                                                                                                           | No       | Callback triggered when image rendering is complete |
| onLoadListener        | onLoadStart?: (req?: ImageKnifeRequest) => void, onLoadSuccess?: (data: string \| PixelMap \| undefined, imageData: ImageKnifeData, req?: ImageKnifeRequest) => void, onLoadFailed?: (err: string, req?: ImageKnifeRequest) => void, onLoadCancel?: (res: string, req?: ImageKnifeRequest) => void | No       | Image load state callbacks (start/success/failure/cancel) |
| downsampleOf          | DownsampleStrategy                                                                                                                                                                                                                                                                                 | No       | Downsampling strategy                            |
| httpOption            | HttpRequestOption                                                                                                                                                                                                                                                                                  | No       | Network request configuration (timeout, retry, etc.) |
| pixelName             | string                                                                                                                                                                                                                                                                                             | No       | PixelMap name for distinguishing multiple PixelMap caches |
| dynamicRangeMode      | DynamicRangeMode                                                                                                                                                                                                                                                                                   | No       | Expected image dynamic range for display         |

### Downsampling Strategies (DownsampleStrategy)

| Value                    | Description                                                  |
|--------------------------|--------------------------------------------------------------|
| NONE                     | No downsampling                                              |
| AT_MOST                  | No upscaling when the requested size exceeds the actual size |
| FIT_CENTER_MEMORY        | Auto-adapt both dimensions, memory-first                     |
| FIT_CENTER_QUALITY       | Auto-adapt both dimensions, quality-first                    |
| CENTER_INSIDE_MEMORY     | Scale down by the maximum aspect ratio, memory-first         |
| CENTER_INSIDE_QUALITY    | Scale down by the maximum aspect ratio, quality-first        |
| AT_LEAST                 | Adapt using the minimum aspect ratio                         |

### Cache Strategy (CacheStrategy)

| Value      | Description |
|------------|-------------|
| Default    | Default — read/write to both memory and file (disk) cache |
| Memory     | Memory only — read/write to memory cache only |
| File       | File only — read/write to file (disk) cache only |

### ImageKnife APIs

| API                                  | Parameters                                                                                                                                        | Description                                                                                                                                                              |
|--------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| initMemoryCache                      | newMemoryCache: IMemoryCache                                                                                                                      | Sets a custom memory cache strategy (default: LRU, max 256 entries / 128 MB; cache is not released when navigating away from a page; entries are evicted automatically once the limit is reached) |
| initFileCache                        | context: Context, size: number, memory: number                                                                                                    | Initializes file cache with a max file count (size) and total capacity limit (memory, in bytes)                                                                          |
| reload                               | request: ImageKnifeRequest                                                                                                                        | Reloads the specified image request                                                                                                                                      |
| preLoad                              | loadSrc: string \| ImageKnifeOption                                                                                                               | Preloads an image and returns an ImageKnifeRequest                                                                                                                       |
| cancel                               | request: ImageKnifeRequest                                                                                                                        | Cancels the specified image request                                                                                                                                      |
| preLoadCache                         | loadSrc: string \| ImageKnifeOption                                                                                                               | Preloads an image and returns its file cache path                                                                                                                        |
| getCacheImage                        | loadSrc: string, cacheType?: CacheStrategy, signature?: string                                                                                    | Asynchronously retrieves an image from memory or file cache                                                                                                             |
| getCacheImageSync                    | loadSrc: string, cacheType?: CacheStrategy, signature?: string                                                                                    | Synchronously retrieves an image from memory or file cache                                                                                                              |
| addHeader                            | key: string, value: Object                                                                                                                        | Adds a global HTTP request header                                                                                                                                        |
| serHeaderOptions                     | Array\<HeaderOptions\>                                                                                                                            | Sets the global HTTP request header list                                                                                                                                 |
| deleteHeader                         | key: string                                                                                                                                       | Deletes a global HTTP request header                                                                                                                                     |
| setCustomGetImage                    | customGetImage?: (context: Context, src: string \| PixelMap \| Resource, headers?: Record<string, Object>) => Promise\<ArrayBuffer \| undefined\> | Sets a global custom image obtaining/download method                                                                                                                     |
| setEngineKeyImpl                     | IEngineKey                                                                                                                                        | Sets the global cache key generation strategy                                                                                                                            |
| setMaxRequests                       | concurrency: number                                                                                                                               | Sets the maximum number of concurrent requests                                                                                                                           |
| setConnectTimeout                    | timeout: number                                                                                                                                   | Sets the connection timeout duration (milliseconds)                                                                                                                      |
| setReadTimeout                       | timeout: number                                                                                                                                   | Sets the read timeout duration (milliseconds)                                                                                                                            |
| putCacheImage                        | url: string, pixelMap: PixelMap, cacheType?: CacheStrategy, packOption?: image.PackingOption, signature?: string                                  | Writes a PixelMap to memory or disk cache                                                                                                                                |
| removeMemoryCache                    | url: string \| ImageKnifeOption                                                                                                                   | Removes the memory cache for the specified URL                                                                                                                           |
| removeFileCache                      | url: string \| ImageKnifeOption                                                                                                                   | Removes the disk cache for the specified URL                                                                                                                             |
| removeAllMemoryCache                 | -                                                                                                                                                 | Clears all memory cache                                                                                                                                                  |
| removeAllFileCache                   | -                                                                                                                                                 | Clears all disk cache                                                                                                                                                    |
| getCacheLimitSize                    | cacheType?: CacheStrategy                                                                                                                         | Returns the capacity limit of the specified cache type                                                                                                                   |
| getCurrentCacheNum                   | cacheType?: CacheStrategy                                                                                                                         | Returns the current number of cached images for the specified cache type                                                                                                 |
| getCurrentCacheSize                  | cacheType?: CacheStrategy                                                                                                                         | Returns the current used space of the specified cache type                                                                                                               |
| setJpegOptimizeDecoding (3.2.9+)     | enable: boolean                                                                                                                                   | Enables or disables optimized JPEG decoding to reduce decoded image memory usage. Disabled by default. Not applied when a transformation is set; `getCacheImage` may return a non-RGBA PixelMap when enabled. |
| getJpegOptimizeDecoding (3.2.9+)     | -                                                                                                                                                 | Returns whether optimized JPEG decoding is currently enabled                                                                                                             |

### Callbacks

| Name          | Parameters                                                                                                   | Description                                                                                                                                                                              |
|---------------|--------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| onLoadStart   | req: ImageKnifeRequest                                                                                       | `req` contains image request info (URL, component dimensions) and `ImageKnifeData` (request start time, memory cache check time)                                                         |
| onLoadSuccess | data: string \| PixelMap \| undefined, imageData: ImageKnifeData, req?: ImageKnifeRequest                   | `data`: successfully loaded data; `imageData`: image cache info; `req.imageKnifeData`: original size, decoded size, format, frame count, and per-stage durations                          |
| onLoadFailed  | err: string, req?: ImageKnifeRequest                                                                         | `err`: error description; `req.imageKnifeData` contains error phase, error code, network error code, and per-stage durations                                                              |
| onLoadCancel  | reason: string, req?: ImageKnifeRequest                                                                      | `reason`: cancellation reason; `req.imageKnifeData` contains error phase, error code, and per-stage durations (including cancellation time)                                               |

### Graphic Transformation Types (GPUImage Dependency Required)

| Type                               | Description                                   |
|------------------------------------|-----------------------------------------------|
| BlurTransformation                 | Blurs the image                               |
| BrightnessTransformation           | Applies a brightness filter                   |
| CropSquareTransformation           | Crops the image to a square                   |
| CropTransformation                 | Crops the image to a custom rectangle         |
| CropCircleTransformation           | Crops the image to a circular shape            |
| CropCircleWithBorderTransformation | Crops the image to a circular shape with border |
| GrayScaleTransformation            | Applies a grayscale filter                    |
| InvertTransformation               | Applies an inversion filter                   |
| KuwaharaTransformation             | Applies a Kuwahara filter (requires GPUImage) |
| MaskTransformation                 | Applies a mask                                |
| PixelationTransformation           | Applies a pixelation filter (requires GPUImage)|
| SepiaTransformation                | Applies a sepia filter (requires GPUImage)    |
| SketchTransformation               | Applies a sketch filter (requires GPUImage)   |
| SwirlTransformation                | Applies a swirl filter (requires GPUImage)    |
| ToonTransformation                 | Applies a cartoon filter (requires GPUImage)  |
| VignetterTransformation            | Applies a vignette filter (requires GPUImage) |

## About Obfuscation

For details on code obfuscation, see [Code Obfuscation Guide](https://docs.openharmony.cn/pages/v5.0/en/application-dev/arkts-utils/source-obfuscation.md).

To prevent the imageknife library from being obfuscated, add the following exclusion rule to `obfuscation-rules.txt`:

```
-keep
./oh_modules/@ohos/imageknife
```

To disable ImageKnife's internal debug logs (e.g., `showPixelMap`, `executeJob` and other frequent hilog output), call:

```typescript
import { LogUtil } from '@ohos/imageknife';

LogUtil.mLogLevel = LogUtil.OFF;
```

## Known Issues

- The `ImageFit` property cannot be set on the `ImageKnifeAnimator` component.
- `ImageKnifeComponentV2` does not currently support use inside `@ReusableV2`-decorated components ([issue #677](https://gitcode.com/CPF-ApplicationTPC/ImageKnife/issues/677)); for `@ReusableV2` scenarios, please migrate to [imageknifepro](https://gitcode.com/CPF-ApplicationTPC/imageknifepro)

## Directory Structure

```
/ImageKnife               # Project root directory
├── entry                 # Sample code directory
├── library               # ImageKnife library directory
│   ├── src/main/ets
│   │   ├── 3rd_party     # MD5 hash algorithm implementation
│   │   ├── cache         # Cache implementation
│   │   ├── components    # Component implementation
│   │   ├── downsampling  # Image downsampling
│   │   ├── key           # Cache key generation
│   │   ├── loaderStrategy  # Image loading strategy
│   │   ├── model         # Data model
│   │   ├── parseStrategy # Image parsing strategy
│   │   ├── queue         # Request queue
│   │   ├── transform     # Image transformation
│   │   ├── utils         # Utility classes
│   │   ├── ImageKnife.ets           # Core class
│   │   ├── ImageKnifeDispatcher.ets # Request dispatcher
│   │   └── ImageKnifeLoader.ets    # Image loader
│   └── index.ets         # Library API export entry
├── sharedlibrary         # Cross-module image reading verification module
├── gpu_transform         # GPU transformation module
├── README.md             # English installation and usage instructions
└── README_zh.md          # Chinese installation and usage instructions
```

## How to Contribute

If you find any issues during use, feel free to submit an [Issue](https://gitcode.com/CPF-ApplicationTPC/ImageKnife/issues) or a [PR](https://gitcode.com/CPF-ApplicationTPC/ImageKnife/pulls).

## License

This project is licensed under [Apache License 2.0](https://gitcode.com/CPF-ApplicationTPC/ImageKnife/blob/master/LICENSE).
