# 食谱 App - 鸿蒙端实施文档

更新时间：2026-08-21

> **本文档的用途**：供 Claude Code 直接据此编写代码。每个阶段写明目标、产出文件、实现要点和验收标准，按顺序执行即可。
>
> **阅读顺序**：先读第一～五节（基线、设计规范、目录、数据模型、接口契约），再按第六节的 Phase 顺序实施。第七节是全程适用的编码红线，动手前必须读完。
>
> **相关文档**：`harmony-app-architecture.md`（架构决策）、`harmony-app-requirements.md`（产品需求）、`eat_schema.sql`（数据库）

---

## 一、项目基线

| 项 | 值 |
|---|---|
| 应用类型 | HarmonyOS NEXT 原生应用 |
| 语言 | ArkTS |
| UI 框架 | ArkUI 声明式 |
| compileSdkVersion / compatibleSdkVersion | **23** |
| targetSdkVersion | 23 |
| deviceTypes | **`["phone"]`**（仅手机，见需求文档第十一节） |
| 状态管理 | **V2**（`@ComponentV2` / `@Local` / `@Param` / `@ObservedV2`） |
| 路由 | `Navigation` + `NavPathStack` |
| 网络 | RCP（Remote Communication Kit）；AI 流式接口用 NetworkKit 的 `requestInStream` |
| 本地存储 | `preferences` |
| 图片 | `@ohos/imageknife` |
| 暗色模式 | 第一期不做，资源目录预留 |

### 环境要求

- DevEco Studio 最新正式版
- HarmonyOS SDK API 23
- 真机或模拟器系统版本 ≥ HarmonyOS 6.1.0

---

## 二、设计规范（小清新）

风格要点：**低饱和自然色调、大留白、柔和圆角、极轻阴影、线性图标、无渐变无重装饰。**

### 2.1 色彩

写入 `entry/src/main/resources/base/element/color.json`：

```json
{
  "color": [
    { "name": "brand_primary",       "value": "#5CB88F" },
    { "name": "brand_primary_light", "value": "#E9F5F0" },
    { "name": "brand_primary_dark",  "value": "#47A077" },

    { "name": "accent",              "value": "#FF9A5C" },
    { "name": "accent_light",        "value": "#FFF2E9" },

    { "name": "action_like",         "value": "#FF7B8A" },
    { "name": "action_favorite",     "value": "#FFB443" },

    { "name": "bg_page",             "value": "#F7FAF9" },
    { "name": "bg_surface",          "value": "#FFFFFF" },
    { "name": "bg_sunken",           "value": "#F2F6F4" },
    { "name": "divider",             "value": "#EDF2F0" },

    { "name": "text_primary",        "value": "#2D3A34" },
    { "name": "text_secondary",      "value": "#6B7C74" },
    { "name": "text_tertiary",       "value": "#A3B0A9" },
    { "name": "text_disabled",       "value": "#C6D0CB" },
    { "name": "text_on_brand",       "value": "#FFFFFF" },

    { "name": "state_error",         "value": "#E9686B" },
    { "name": "state_warning",       "value": "#F5A623" },
    { "name": "mask",                "value": "#59000000" }
  ]
}
```

**使用约束**：业务代码中**禁止出现字面量色值**，一律 `$r('app.color.xxx')`。

### 2.2 尺寸

写入 `entry/src/main/resources/base/element/float.json`（单位 vp）：

```json
{
  "float": [
    { "name": "space_xs",  "value": "4vp" },
    { "name": "space_sm",  "value": "8vp" },
    { "name": "space_md",  "value": "12vp" },
    { "name": "space_lg",  "value": "16vp" },
    { "name": "space_xl",  "value": "24vp" },
    { "name": "space_xxl", "value": "32vp" },

    { "name": "radius_sm",   "value": "8vp" },
    { "name": "radius_md",   "value": "12vp" },
    { "name": "radius_lg",   "value": "16vp" },
    { "name": "radius_xl",   "value": "24vp" },

    { "name": "font_caption", "value": "12fp" },
    { "name": "font_body_sm", "value": "13fp" },
    { "name": "font_body",    "value": "15fp" },
    { "name": "font_title_sm","value": "16fp" },
    { "name": "font_title",   "value": "18fp" },
    { "name": "font_title_lg","value": "20fp" },
    { "name": "font_display", "value": "24fp" },

    { "name": "icon_sm", "value": "16vp" },
    { "name": "icon_md", "value": "20vp" },
    { "name": "icon_lg", "value": "24vp" }
  ]
}
```

### 2.3 排版规则

| 用途 | 字号 | 字重 | 颜色 |
|---|---|---|---|
| 页面大标题 | `font_display` | 700 | `text_primary` |
| 详情页菜名 | `font_title_lg` | 700 | `text_primary` |
| 区块标题（"热门榜单"） | `font_title` | 600 | `text_primary` |
| 卡片菜名 | `font_body` | 500 | `text_primary` |
| 正文 / 步骤描述 | `font_body` | 400 | `text_primary`，行高 1.6 |
| 简介 / 次要说明 | `font_body_sm` | 400 | `text_secondary` |
| 辅助信息（耗时、计数） | `font_caption` | 400 | `text_tertiary` |
| 按钮文字 | `font_title_sm` | 500 | 视按钮类型 |

### 2.4 布局与形状

- **页面左右边距**：`space_lg`（16vp）
- **模块之间纵向间距**：`space_xl`（24vp）
- **卡片内边距**：`space_md`（12vp）
- **卡片圆角**：`radius_lg`（16vp）；按钮/输入框 `radius_md`；小标签 `radius_sm`；头像圆形
- **图片圆角**：卡片封面 `radius_md`，详情页封面不加圆角（通栏）
- **卡片阴影**：`shadow: { radius: 8, color: '#0F2D3A34', offsetX: 0, offsetY: 2 }`。只有卡片和浮起元素有阴影，列表项之间用 `divider` 分隔线，不要滥用阴影

### 2.5 组件规范

- **主按钮**：背景 `brand_primary`，文字 `text_on_brand`，高度 48vp，圆角 `radius_md`，全宽或最小宽度 120vp
- **次按钮**：背景 `brand_primary_light`，文字 `brand_primary`，同尺寸
- **文字按钮**：无背景，文字 `brand_primary`
- **标签 Chip**：背景 `bg_sunken`，文字 `text_secondary`，高度 28vp，圆角 `radius_sm`，横向 padding `space_md`；选中态背景 `brand_primary_light`、文字 `brand_primary`
- **难度星级**：实心星 `accent`，空心星 `text_disabled`，尺寸 `icon_sm`
- **收藏图标**：未选中 `text_tertiary` 线性；选中 `action_favorite` 实心
- **点赞图标**：未选中 `text_tertiary` 线性；选中 `action_like` 实心
- **图标风格**：统一线性、2vp 描边

### 2.6 动效

- 转场与状态切换统一 **250ms，`Curve.EaseOut`**
- 点击反馈：缩放至 0.97，150ms
- 骨架屏微光循环 1200ms
- **不做花哨动效**，小清新的关键是克制

---

## 三、工程结构

```
eat-harmony/
├── build-profile.json5                     # 多环境变量注入
├── oh-package.json5
└── entry/
    ├── build-profile.json5
    └── src/main/
        ├── module.json5                    # deviceTypes: ["phone"]，权限声明
        ├── resources/
        │   ├── base/
        │   │   ├── element/                # color.json / float.json / string.json
        │   │   ├── media/                  # 图标、占位图、启动图
        │   │   └── profile/
        │   └── dark/element/               # 预留，第一期为空
        └── ets/
            ├── entryability/
            │   └── EntryAbility.ets
            ├── pages/
            │   └── Index.ets               # Navigation 根容器 + 底部 Tab
            ├── router/
            │   ├── RouteNames.ets          # 路由名常量
            │   └── RouteMap.ets            # NavDestination 注册
            ├── features/
            │   ├── home/
            │   │   ├── pages/HomePage.ets
            │   │   ├── viewmodel/HomeViewModel.ets
            │   │   ├── repository/HomeRepository.ets
            │   │   └── components/         # 首页专用组件
            │   ├── category/
            │   ├── detail/
            │   ├── ai/
            │   ├── user/
            │   └── search/
            └── commons/
                ├── network/
                │   ├── HttpClient.ets      # RCP 封装
                │   ├── Interceptors.ets    # token 注入 / 401 刷新 / 错误码
                │   ├── ApiPaths.ets        # 所有接口路径常量
                │   ├── SseClient.ets       # AI 流式专用
                │   └── dto/                # 接口 DTO（interface）
                ├── model/                  # 领域模型（class）
                ├── storage/
                │   ├── PreferenceUtil.ets
                │   ├── TokenManager.ets
                │   └── HistoryStore.ets    # 浏览历史 / 搜索历史
                ├── auth/
                │   ├── AuthService.ets     # 全局登录态 + 登录拦截
                │   └── LoginSheet.ets      # 半屏登录
                ├── uikit/                  # 通用组件
                └── utils/
                    ├── Logger.ets
                    └── Formatter.ets
```

**模块依赖方向单向**：`pages/router` → `features` → `commons`。`features` 之间**禁止互相 import**，跨模块跳转只用 `RouteNames` 里的字符串常量。

---

## 四、数据模型

### 4.1 关键约定：ID 一律用 string

> ⚠️ **后端主键是雪花算法生成的 BIGINT，超出 JS `number` 的安全整数范围（2^53-1），用 number 接收会静默丢失精度。**
>
> **所有接口的 ID 字段必须以 JSON 字符串返回**，前端模型中一律声明为 `string`。这条要同步给后端，Jackson 需配置 `Long` 序列化为 `String`。

### 4.2 通用模型

```typescript
// commons/network/dto/Common.ets
export interface ApiResponseDto<T> {
  code: number;
  message: string;
  data: T;
}

export interface PageResultDto<T> {
  list: T[];
  total: number;
  page: number;
  size: number;
  hasMore: boolean;
}

// commons/model/PageState.ets
export enum PageStatus { LOADING, SUCCESS, EMPTY, ERROR }

@ObservedV2
export class PageState {
  @Trace status: PageStatus = PageStatus.LOADING;
  @Trace errorMessage: string = '';
}
```

### 4.3 食谱模型

```typescript
// commons/model/Recipe.ets

/** 列表卡片项 */
export interface RecipeListItem {
  id: string;
  name: string;
  coverImage: string;      // 缩略图 URL
  difficulty: number;      // 1-5
  cookTime: number;        // 分钟
  favoriteCount: number;
  likeCount: number;
  tagName: string;
}

/** 详情 */
export interface RecipeDetail {
  id: string;
  name: string;
  coverImage: string;      // 中图 URL
  summary: string;
  difficulty: number;
  calorie: number;         // 整道菜总热量（大卡）
  cookTime: number;
  baseServings: number;    // 基准份数
  tagId: string;
  tagName: string;
  favoriteCount: number;
  likeCount: number;
  favorited: boolean;      // 当前用户是否已收藏（未登录恒为 false）
  liked: boolean;
  ingredients: RecipeIngredient[];
  steps: RecipeStep[];
  tips: RecipeTip[];
}

export interface RecipeIngredient {
  id: string;
  ingredientId: string;
  name: string;
  amount: number;
  unit: string;
  isOptional: boolean;      // 可选食材
  isConvertible: boolean;   // 是否参与份量换算
  remark: string;
  sort: number;
}

export interface RecipeStep {
  id: string;
  sort: number;
  content: string;
  image: string;            // 可为空串；AI 生成食谱的步骤恒为空串（无配图）
}

export interface RecipeTip {
  id: string;
  sort: number;
  content: string;
}

export interface RecipeTag {
  id: string;
  name: string;
  recipeCount: number;      // ⚠️ 接口聚合字段，非 recipe_tag 表字段，由后端 COUNT 得出
  sort: number;
}
```

### 4.4 用户模型

```typescript
// commons/model/User.ets
export interface UserInfo {
  id: string;
  nickname: string;
  avatar: string;
  phone: string;            // 脱敏，如 138****8888；未绑定为空串
  email: string;            // 脱敏；未绑定为空串
  hasPassword: boolean;
  favoriteCount: number;
  likeCount: number;
  bindings: OauthBinding[];
}

export interface OauthBinding {
  platform: string;         // 目前只有 'HUAWEI'
  bound: boolean;
}

export interface AuthResult {
  token: string;
  refreshToken: string;
  user: UserInfo;
}
```

### 4.5 AI 模型

```typescript
// commons/model/Ai.ets
export enum AiRole { USER = 'user', ASSISTANT = 'assistant' }
export enum AiResultType { TEXT = 'text', RECIPES = 'recipes', GENERATED = 'generated' }
export enum AiScene {
  INGREDIENT_RECOMMEND = 'INGREDIENT_RECOMMEND',
  CONDITION_FILTER = 'CONDITION_FILTER',
  FALLBACK_GENERATE = 'FALLBACK_GENERATE'
}

/** 对话消息（需要在流式过程中局部刷新，所以用 class + @Trace） */
@ObservedV2
export class AiMessage {
  @Trace id: string = '';
  @Trace role: AiRole = AiRole.USER;
  @Trace text: string = '';                 // 流式增量拼接
  @Trace resultType: AiResultType = AiResultType.TEXT;
  @Trace recipes: AiRecipeMatch[] = [];
  @Trace generated: AiGeneratedRecipe | null = null;
  @Trace streaming: boolean = false;        // true 时显示光标动效
  @Trace failed: boolean = false;
}

export interface AiRecipeMatch {
  recipe: RecipeListItem;
  matchRate: number;                        // 食材重合度 0-100
  missingIngredients: string[];             // "还缺 XX"
}

export interface AiGeneratedRecipe {
  id: string;
  name: string;
  summary: string;
  difficulty: number;
  calorie: number;
  cookTime: number;
  baseServings: number;
  ingredients: RecipeIngredient[];
  steps: RecipeStep[];
  tips: RecipeTip[];
  favorited: boolean;
  createTime: string;
}
```

---

## 五、接口契约

**Base URL**：由 `BuildProfile.API_BASE_URL` 注入，路径前缀 `/api/app/v1`

**统一响应**：`{ "code": 0, "message": "ok", "data": {...} }`，`code === 0` 为成功

**认证**：需登录的接口带 `Authorization: Bearer {token}`

### 5.1 认证

| 方法 | 路径 | 入参 | 响应 | 登录 |
|---|---|---|---|---|
| POST | `/auth/huawei` | `{ authCode }` | `AuthResult` | 否 |
| POST | `/auth/sms/code` | `{ phone, scene: "LOGIN" }` | — | 否 |
| POST | `/auth/sms/login` | `{ phone, code }` | `AuthResult` | 否 |
| POST | `/auth/password/login` | `{ account, password }` | `AuthResult` | 否 |
| POST | `/auth/email/code` | `{ email, scene: "LOGIN" }` | — | 否 |
| POST | `/auth/email/login` | `{ email, code }` | `AuthResult` | 否 |
| POST | `/auth/refresh` | `{ refreshToken }` | `{ token, refreshToken }` | 否 |
| POST | `/auth/logout` | — | — | 是 |
| DELETE | `/auth/account` | — | — | 是 |

> `account` 字段支持手机号 / 邮箱两种形式，后端自行判断。

### 5.2 内容浏览

| 方法 | 路径 | 说明 |
|---|---|---|
| GET | `/home` | 首页聚合，见下方结构 |
| GET | `/recipes` | 食谱列表，见下方参数 |
| GET | `/recipes/{id}` | 食谱详情 → `RecipeDetail` |
| GET | `/tags` | 全部标签 → `RecipeTag[]`，按 sort 升序 |

**`GET /home` 响应**：

```typescript
interface HomeDataDto {
  tags: RecipeTag[];                    // 按 recipeCount 降序取前 8
  todayRecommend: RecipeListItem[];     // 6 道，按日期种子伪随机
  hotRecipes: RecipeListItem[];         // 收藏 TOP10
  latest: PageResultDto<RecipeListItem>;// 最新发布第一页
}
```

**`GET /recipes` 查询参数**：

| 参数 | 类型 | 说明 |
|---|---|---|
| `tagId` | string | 可选，标签筛选 |
| `keyword` | string | 可选，菜名模糊搜索 |
| `sort` | string | `latest`（默认，按 publish_time 降序）/ `favorite` / `like` |
| `difficulty` | string | 可选，多选逗号分隔，如 `1,2,3` |
| `minCookTime` / `maxCookTime` | number | 可选，分钟 |
| `page` / `size` | number | 默认 1 / 20 |

> 只返回 `status = 1`（已发布）且 `deleted = 0` 的食谱。

### 5.3 收藏与点赞

| 方法 | 路径 | 响应 |
|---|---|---|
| POST | `/recipes/{id}/favorite` | `{ favoriteCount }` |
| DELETE | `/recipes/{id}/favorite` | `{ favoriteCount }` |
| POST | `/recipes/{id}/like` | `{ likeCount }` |
| DELETE | `/recipes/{id}/like` | `{ likeCount }` |

全部需登录。重复操作返回成功（幂等），不报错。

### 5.4 个人中心

| 方法 | 路径 | 说明 |
|---|---|---|
| GET | `/me` | → `UserInfo` |
| PUT | `/me` | `{ nickname?, avatar? }` → `UserInfo` |
| POST | `/me/avatar` | multipart 上传 → `{ url }` |
| GET | `/me/favorites` | 分页 → `PageResultDto<RecipeListItem>` |
| GET | `/me/likes` | 分页 → `PageResultDto<RecipeListItem>` |
| GET | `/me/ai-recipes` | 分页 → `PageResultDto<AiGeneratedRecipe>` |

### 5.5 AI

| 方法 | 路径 | 说明 |
|---|---|---|
| POST | `/ai/chat` | **SSE 流式**，`{ message }`，见下方事件协议 |
| GET | `/ai-recipes/{id}` | → `AiGeneratedRecipe` |
| POST | `/ai-recipes/{id}/favorite` | 收藏 AI 生成食谱 |
| DELETE | `/ai-recipes/{id}/favorite` | 取消收藏 |

**SSE 事件协议**（`Content-Type: text/event-stream`）：

```
event: intent
data: {"scene":"INGREDIENT_RECOMMEND","parsed":{"ingredients":["鸡蛋","番茄"]}}

event: recipes
data: {"matches":[{"recipe":{...},"matchRate":85,"missingIngredients":["葱"]}]}

event: generating
data: {"delta":"这道"}

event: generating
data: {"delta":"番茄炒蛋"}

event: generated
data: {"recipe":{...AiGeneratedRecipe...}}

event: error
data: {"message":"模型调用超时"}

event: done
data: {}
```

**事件说明**：

- `intent` 必定第一个到达，前端据此切换加载文案（"正在理解你的需求…"）
- `recipes` 与 `generated` **互斥**：检索命中发 `recipes`，未命中走兜底则发若干 `generating` 后发一次 `generated`
- `generating.delta` 是**增量文本**，前端追加到 `AiMessage.text`
- `done` 表示流结束，前端置 `streaming = false`
- 任何时候收到 `error` 都要结束本轮并展示错误态

---

## 六、分阶段实施步骤

> 每个 Phase 完成后必须通过验收标准才能进入下一个。

### Phase 0 — 工程初始化

**目标**：可运行的空壳，四个 Tab 能切换。

**任务**：

1. DevEco Studio 新建 Empty Ability 工程，包名建议 `com.{company}.eat`
2. `entry/build-profile.json5` 设置 `compileSdkVersion: 23`、`compatibleSdkVersion: 23`、`targetSdkVersion: 23`
3. `module.json5`：
   - `deviceTypes: ["phone"]`
   - 声明权限 `ohos.permission.INTERNET`
4. 根 `build-profile.json5` 配置多环境变量：

```json5
"buildOption": {
  "arkOptions": {
    "buildProfileFields": {
      "API_BASE_URL": "https://dev-api.example.com/api/app/v1"
    }
  }
}
```

   在 `release` product 下覆盖为生产地址。代码中通过 `import BuildProfile from 'BuildProfile'` 读取。
5. 按第三节创建完整目录结构（空文件占位）
6. `ohpm install @ohos/imageknife`
7. `pages/Index.ets`：`Navigation` 作为根容器，内含 `Tabs` 实现底部四个 Tab（首页 / 分类 / AI / 我的），先用占位页面
8. `Navigation` 设置 `mode: NavigationMode.Auto`、`hideTitleBar: true`

**产出**：`Index.ets`、`RouteNames.ets`、`RouteMap.ets`、目录骨架

**验收**：真机或模拟器能启动，四个 Tab 可切换，切换有正确的选中态。

---

### Phase 1 — 设计 token 落地

**目标**：所有设计变量以资源形式可用。

**任务**：

1. 按第 2.1、2.2 节写入 `color.json` 和 `float.json`
2. `commons/uikit/Theme.ets` 导出无法放进资源文件的常量：

```typescript
export class Shadows {
  static readonly card: ShadowOptions = {
    radius: 8, color: '#0F2D3A34', offsetX: 0, offsetY: 2
  };
  static readonly float: ShadowOptions = {
    radius: 16, color: '#142D3A34', offsetX: 0, offsetY: 4
  };
}
export class Motion {
  static readonly duration: number = 250;
  static readonly curve: Curve = Curve.EaseOut;
}
```

3. 准备 `resources/base/media/` 下的图标资源：搜索、收藏（空/实）、点赞（空/实）、分享、星（空/实）、返回、更多、清空、相机、箭头、Tab 四个图标（选中/未选中）、默认头像、图片占位图、空状态插画、错误插画
4. 创建 `resources/dark/element/` 空目录占位

**验收**：写一个临时预览页，把全部颜色块、字号、圆角、阴影渲染出来，视觉符合小清新调性。

---

### Phase 2 — 基础设施层

**目标**：网络、存储、日志、路由可用。

**任务**：

1. **`commons/utils/Logger.ets`** — 封装 `hilog`，统一 domain 和 tag，提供 `d/i/w/e` 方法
2. **`commons/storage/PreferenceUtil.ets`** — `preferences` 封装，提供 `getString/putString/getBoolean/putBoolean/delete/clear`，异步 API
3. **`commons/storage/TokenManager.ets`** — token 与 refreshToken 的读写，内存缓存 + preferences 持久化
4. **`commons/network/ApiPaths.ets`** — 第五节所有路径的常量定义
5. **`commons/network/HttpClient.ets`** — RCP 封装：
   - 单例 `rcp.Session`，配置 baseURL、超时（默认 15s）、公共 header
   - 泛型方法 `get<T>(path, params?)`、`post<T>(path, body?)`、`put<T>`、`del<T>`
   - 返回 `Promise<T>`，内部已解包 `ApiResponseDto.data`
6. **`commons/network/Interceptors.ets`**：
   - **请求拦截**：有 token 则注入 `Authorization`
   - **响应拦截**：`code !== 0` 抛 `BizError(code, message)`
   - **401 处理**：调用 refresh 接口换新 token 后重放原请求
   - ⚠️ **refresh 必须单飞**：用一个模块级 `Promise | null` 变量作为锁，并发的 401 共享同一个 refresh Promise，避免多次刷新互相顶掉
   - refresh 失败 → 清除 token、置为未登录、通知 UI 层
   - **网络异常**：断网 / 超时 / 5xx 统一转成 `NetError`，携带用户可读文案
7. **`router/RouteNames.ets`** — 所有页面路由名常量
8. **`router/RouteMap.ets`** — `@Builder` 形式的 `NavDestination` 注册表，供 `Navigation` 的 `navDestination` 使用
9. **全局 `NavPathStack`** — 在 `Index.ets` 创建，通过 `@Provider` 下发；`commons` 里提供 `NavUtil.push(name, param)` 封装

**验收**：

- 能对 `/tags` 发一次真实请求并打印结果
- 手动写入过期 token 后请求，能观察到自动刷新流程
- token 存取在 App 重启后仍有效

---

### Phase 3 — 通用组件库

**目标**：后续页面直接拼装，不重复写 UI。

**产出组件**（全部放 `commons/uikit/`）：

| 组件 | 说明 |
|---|---|
| `StateView` | **四态容器**。`@Param status: PageStatus` + 内容 `@BuilderParam`。LOADING 显示骨架屏，EMPTY 显示空状态插画+文案，ERROR 显示错误插画+重试按钮 |
| `NetImage` | ImageKnife 封装。参数：url、宽高、圆角、占位图。**全项目禁止直接 `Image(网络URL)`** |
| `RecipeCard` | 双列瀑布流卡片：封面、菜名（最多 2 行）、难度星级、耗时、收藏数、点赞数 |
| `RecipeCardH` | 横滑卡片：固定宽 140vp，封面 + 菜名 + 难度 |
| `RecipeRow` | 横向列表项：左图右文，用于搜索结果和"我的收藏" |
| `DifficultyStars` | 难度星级，参数 `value: number` |
| `TagChip` | 标签 Chip，支持选中态 |
| `PrimaryButton` / `SecondaryButton` / `TextButton` | 按钮三件套 |
| `SearchBar` | 搜索框，支持只读模式（首页点击跳转用） |
| `LoadMoreFooter` | 加载更多状态：加载中 / 没有更多了 / 加载失败点击重试 |
| `SkeletonBox` | 骨架屏基础块，带微光动效 |
| `SectionHeader` | 区块标题 + 可选"更多"按钮 |
| `ConfirmDialog` | 二次确认弹窗 |
| `Toast` | 轻提示封装 |

**验收**：建一个组件预览页，展示每个组件的全部状态（含空态、错误态、选中态），视觉与设计规范一致。

---

### Phase 4 — 首页

**目标**：首页完整可用。

**任务**：

1. `HomeRepository.ets` — 调 `GET /home` 和 `GET /recipes?sort=latest`（加载更多）
2. `HomeViewModel.ets` — `@ObservedV2` 类：

```typescript
@ObservedV2
export class HomeViewModel {
  @Trace state: PageState = new PageState();
  @Trace tags: RecipeTag[] = [];
  @Trace todayRecommend: RecipeListItem[] = [];
  @Trace hotRecipes: RecipeListItem[] = [];
  @Trace latest: RecipeListItem[] = [];
  @Trace loadingMore: boolean = false;
  @Trace hasMore: boolean = true;
  private page: number = 1;

  async load(): Promise<void> { /* ... */ }
  async refresh(): Promise<void> { /* ... */ }
  async loadMore(): Promise<void> { /* ... */ }
}
```

3. `HomePage.ets` — `Refresh` + `Scroll` 组合，自上而下：
   - `SearchBar`（只读，点击 push 搜索页）
   - 标签宫格：4 列 2 行，最后一格是"更多"
   - AI 引导卡：`brand_primary_light` 背景，插画 + 文案"冰箱里有什么？让 AI 帮你配菜"，点击切到 AI Tab
   - `SectionHeader('今日推荐')` + 横滑 `RecipeCardH` 列表
   - `SectionHeader('热门榜单', '更多')` + 横滑 `RecipeCardH` 列表
   - `SectionHeader('最新发布')` + `List` + `LazyForEach` 渲染 `RecipeRow`
4. 触底自动 `loadMore()`；下拉触发 `refresh()`

**验收**：

- 首屏加载显示骨架屏，数据到达后正常渲染
- 下拉刷新有效
- "最新发布"滚动到底自动加载下一页，无更多时显示"没有更多了"
- 断网时显示错误态，点重试能恢复

---

### Phase 5 — 分类页

**目标**：标签浏览 + 排序 + 筛选。

**任务**：

1. 顶部标签横滑栏：`Scroll(Axis.Horizontal)` + `TagChip`，首项为"全部"
2. 排序筛选栏：
   - 排序：三个文字按钮（最新 / 最多收藏 / 最多点赞），当前项高亮
   - 筛选：点击展开面板，含难度星级多选、耗时区间（如 ≤15 / ≤30 / ≤60 / 不限），底部"重置""确定"
3. 主体：`WaterFlow` + `LazyForEach` + `RecipeCard`，两列，列间距 `space_md`
4. `CategoryViewModel` 持有 `tagId / sort / difficulties / cookTimeRange / page` 全部查询条件，任一变更时重置到第 1 页重新请求
5. 触底加载更多

**验收**：切换标签、排序、筛选后列表正确刷新且回到顶部；加载更多正常；空结果显示空状态。

---

### Phase 6 — 详情页

**目标**：详情完整展示，份数换算正确，可分享。

**任务**：

1. `DetailPage.ets` 结构自上而下：
   - 封面大图（通栏，高度约 240vp），左上返回按钮浮于图上
   - 标题区：菜名、`TagChip`、`DifficultyStars`、耗时、每份热量
   - 简介
   - **份数切换器**：`- [2份] +`，范围 1~10
   - 食材列表：每行"食材名 ———— 用量 单位"，可选食材右侧加"可选"小标签，有备注则次行小字展示
   - 步骤列表：序号圆标 + 描述 + 配图（有则展示）
   - 附加提示：`accent_light` 背景卡片，列表展示
   - 底部固定操作栏：收藏、点赞、分享
2. **份数换算算法**：

```typescript
function displayAmount(ing: RecipeIngredient, current: number, base: number): number {
  if (!ing.isConvertible) return ing.amount;   // 如"盐适量"，不随份数变
  return ing.amount * current / base;
}
```

   显示规则：结果保留 1 位小数，若为整数则不显示小数位（`10` 而非 `10.0`）。放进 `Formatter.ets`。

3. **每份热量不随份数变化**：始终展示 `calorie / baseServings`
4. **分享**：Share Kit 拉起系统分享面板，内容为 `菜名 + 简介 + 落地页链接`
5. 收藏/点赞按钮先只做 UI 与本地状态，实际逻辑在 Phase 8

**验收**：

- 份数从 2 调到 4，鱼和豆腐的用量翻倍，"盐"保持不变
- 每份热量在切换份数时不变
- 分享能拉起系统面板
- 步骤无配图时布局不塌陷

---

### Phase 7 — 登录与鉴权

**目标**：四种登录方式可用，401 自动刷新，登录后回到原动作。

**任务**：

1. **`AuthService.ets`** — 全局登录态：

```typescript
@ObservedV2
export class AuthService {
  @Trace isLogin: boolean = false;
  @Trace user: UserInfo | null = null;

  static get(): AuthService { /* AppStorageV2 单例 */ }

  /** 登录拦截：未登录则拉起登录，登录成功后执行 action */
  async requireLogin(action: () => void): Promise<void> { /* ... */ }
}
```

2. **`LoginSheet.ets`** — 半屏登录（`bindSheet`）：
   - 顶部标题 + 关闭按钮
   - **华为账号一键登录**主按钮（Account Kit，`authentication.HuaweiIDProvider` 获取 authCode → 调 `/auth/huawei`）
   - 分割线"其他方式登录"
   - 手机号 + 验证码表单（验证码按钮 60s 倒计时）
   - 底部文字链切换到"账号密码登录""邮箱登录"
   - **底部协议勾选**：`☐ 我已阅读并同意《用户协议》和《隐私政策》`，未勾选时登录按钮禁用
3. **`LoginPage.ets`** — 全屏版，内容同上，从"我的"进入
4. 登录成功后：存 token → 更新 `AuthService` → 关闭弹窗 → 执行 pending action
5. 完善 Phase 2 的 401 刷新链路，接上 `AuthService` 的登出通知

**验收**：

- 四种登录方式均能成功登录并持久化
- 未勾选协议时无法登录
- 未登录状态点击 AI Tab → 拉起登录 → 登录成功后进入 AI 页（`requireLogin` 的回调机制验证）
- token 过期后请求能自动刷新并重放，用户无感
- 并发多个 401 请求只触发一次 refresh

> 收藏/点赞的登录拦截在 Phase 8 接入真实接口后再验证，本阶段只验证 `requireLogin` 机制本身。

---

### Phase 8 — 收藏与点赞

**目标**：交互完整，计数准确。

**任务**：

1. 详情页底部操作栏接入真实接口
2. **乐观更新**：点击立即变更图标与计数，请求失败则回滚并 Toast 提示
3. 点击动效：图标缩放弹跳 200ms
4. 未登录点击走 `AuthService.requireLogin()`
5. 幂等处理：重复点击做防抖（300ms）

**验收**：

- 网络正常时计数即时更新；断网时点击后能正确回滚
- **未登录点详情页收藏 → 拉起登录 → 登录成功后自动完成收藏**（Phase 7 `requireLogin` 回调的完整验证）

---

### Phase 9 — AI 页

**目标**：对话式 AI 完整可用，流式输出。

> ⚠️ **这是全项目技术风险最高的部分，建议提前做技术验证。**

**任务**：

1. **`commons/network/SseClient.ets`** — SSE 流式接收：

```
实现要点：
- 用 @kit.NetworkKit 的 http.createHttp()，调 requestInStream（RCP 不适合此场景）
- on('headersReceive') 检查状态码，非 200 直接报错
- on('dataReceive') 收到 ArrayBuffer，用 util.TextDecoder 解码为字符串
- ⚠️ 必须处理分片边界：维护一个 buffer 字符串，
  收到数据后追加到 buffer，按 '\n\n' 切分出完整事件，
  最后一段不完整的留在 buffer 里等下一片
- 每个完整事件按行解析 'event:' 和 'data:' 前缀
- on('dataEnd') 触发完成回调
- 取消：调用 httpRequest.destroy()，并置标志位忽略后续回调
- 无论成功失败，最后都要 off() 解绑所有事件并 destroy()
```

2. `AiPage.ets` — 对话式界面：
   - 顶部标题栏
   - 消息列表（`List` + `LazyForEach`），用户消息右对齐、AI 消息左对齐
   - 首次进入展示欢迎语 + 三个示例气泡（"我有鸡蛋和番茄"/"半小时能做好的家常菜"/"低卡健身餐"），点击直接发送
   - 底部输入栏：输入框 + 发送按钮；流式中变为"停止生成"按钮
3. **消息渲染分三种**：
   - `TEXT`：纯文本气泡，流式中末尾显示闪烁光标
   - `RECIPES`：文本 + 食谱卡片列表，卡片上标注重合度徽标和"还缺 XX"
   - `GENERATED`：文本 + AI 生成食谱卡片，带"AI 生成"标识，可展开查看完整内容、可收藏
4. 收到 `intent` 事件时更新加载文案；收到 `error` 时消息置 `failed = true` 并显示重试
5. 进入 AI Tab 时校验登录，未登录拉起登录

**验收**：

- 流式输出逐字显示，不卡顿
- 点"停止生成"能立即中断
- 三种结果类型都能正确渲染
- 网络中断时显示错误态并可重试
- **构造一次跨分片的 SSE 响应**（单个事件被拆成两个 chunk），验证解析仍然正确

---

### Phase 10 — 我的

**目标**：个人中心完整，含上架必需项。

**任务**：

1. `MinePage.ets` 两态：
   - 未登录：插画 + 一句价值说明 + "登录 / 注册"按钮
   - 已登录：头部（头像、昵称、收藏数/点赞数）+ 两个分组列表
2. 分组一「我的内容」：我的收藏、我的点赞、浏览历史、我的 AI 食谱 —— 各自一个列表页
3. 分组二「设置」：账号与绑定、清除缓存、关于我们、用户协议、隐私政策
4. **浏览历史** — `HistoryStore.ets` 用 `preferences` 存最近 50 条（id + 名称 + 封面 + 时间），详情页打开时写入，支持清空
5. **账号与绑定页**：展示手机号/邮箱/华为账号绑定状态，底部 **「注销账号」** 入口
6. ⚠️ **注销账号**：二次确认弹窗，明确列出将删除的数据范围（账号信息、收藏、点赞、AI 记录），确认后调 `DELETE /auth/account`，成功后清空本地状态回到首页
7. 资料编辑页：修改昵称、上传头像（用 Picker 选图，免申请相册权限）
8. 退出登录：二次确认后清 token、清登录态

**验收**：

- 未登录/已登录两态切换正确
- 注销账号入口存在，有二次确认和数据范围说明
- 浏览历史在 App 重启后仍在
- 头像上传成功后立即刷新显示

---

### Phase 11 — 搜索

**目标**：搜索可用，空结果引导到 AI。

**任务**：

1. `SearchPage.ets`：顶部搜索框自动聚焦，右侧"取消"
2. 未输入时：搜索历史（最多 10 条，可单条删除、可清空，存 `preferences`）；无历史时展示热门食谱
3. 搜索结果：`RecipeRow` 列表，支持加载更多
4. 空结果：空状态插画 + "没找到相关食谱" + 按钮"让 AI 帮你想想"，点击切到 AI Tab 并带上关键词

**验收**：搜索历史正确记录与去重；空结果引导按钮能带关键词跳到 AI Tab。

---

### Phase 12 — 打磨与上架准备

**任务**：

1. **响应式检查**：确认 `Navigation` 的 `Auto` 模式、栅格布局在窗口变宽时不错乱（虽然只声明 phone，但折叠屏展开态属于 phone 范畴）
2. **性能**：长列表滚动帧率检查、图片缓存命中率、内存占用
3. **异常兜底**：全局未捕获异常上报与友好提示
4. 应用图标、启动页、应用名称
5. **隐私声明**：权限使用说明（本项目只用网络权限）、隐私政策页面
6. 打包签名，准备上架材料

**验收**：真机完整走一遍全部流程无阻塞性问题；Release 包能正常安装运行。

---

## 七、编码约定与红线

### 7.1 硬性红线

1. **禁止 V1 装饰器**。项目中不得出现 `@Component` / `@State` / `@Prop` / `@Link` / `@Observed` / `@ObjectLink`。一律用 V2：`@ComponentV2` / `@Local` / `@Param` / `@Event` / `@Monitor` / `@ObservedV2` / `@Trace`。混用会导致状态更新静默失效且不报错。
2. **禁止字面量色值和尺寸**。一律走 `$r('app.color.xxx')` / `$r('app.float.xxx')`。
3. **禁止直接 `Image(网络URL)`**，一律用 `NetImage`。
4. **禁止在 View 中直接调用 Repository 或发请求**，必须经 ViewModel。
5. **禁止 `features` 之间互相 import**，跨模块只用路由名字符串。
6. **所有列表页必须走 `StateView` 四态**，不允许出现白屏。
7. **长列表必须 `LazyForEach` + `IDataSource`**，禁止 `ForEach` 渲染分页列表。

### 7.2 ArkTS 语言注意事项

ArkTS **不是 TypeScript 的超集**，以下写法不可用：

| 不支持 | 替代方案 |
|---|---|
| `any` / 大部分动态类型 | 显式声明类型 |
| 结构化类型兼容（structural typing） | 显式实现 interface |
| 动态属性访问 `obj[key]` | 显式属性访问，或用 `Map` |
| 无类型标注的对象字面量 | 声明 interface 或 class 后再赋值 |
| `JSON.parse()` 结果直接当对象用 | 见下方 |

**JSON 反序列化约定**：

- **DTO 一律用 `interface` 定义**（而非 class），配合 `JSON.parse(str) as XxxDto` 类型断言即可
- 需要 `@Trace` 观察的领域模型才用 `class`，此时需手写从 DTO 到 class 的转换函数
- **所有转换代码集中在 Repository 层**，不允许出现在 ViewModel 或 View 中

### 7.3 命名约定

| 类型 | 约定 | 示例 |
|---|---|---|
| 文件 | 大驼峰 + `.ets` | `HomePage.ets` |
| 页面组件 | `XxxPage` | `DetailPage` |
| 通用组件 | 名词 | `RecipeCard` |
| ViewModel | `XxxViewModel` | `HomeViewModel` |
| Repository | `XxxRepository` | `HomeRepository` |
| DTO | `XxxDto` | `HomeDataDto` |
| 路由名常量 | 全大写下划线 | `ROUTE_RECIPE_DETAIL` |

### 7.4 其他约定

- 异步方法一律 `async/await`，禁止裸 `.then()` 链
- 所有 `catch` 必须打日志，不允许空 catch
- 用户可见文案统一放 `string.json`，不硬编码在代码里
- 每个 Phase 结束提交一次 git，commit message 注明 Phase 编号

---

## 八、后端依赖清单

以下事项需后端配合，**建议在 Phase 2 之前确认到位**，否则前端会被阻塞：

| # | 事项 | 阻塞的 Phase |
|---|---|---|
| 1 | **所有 ID 以字符串返回**（雪花 ID 精度问题，见 4.1） | Phase 2 起全部 |
| 2 | `recipe` 表新增 `publish_time` 字段并在发布时写入 | Phase 4、5 |
| 3 | 图片提供多尺寸 URL（缩略图 / 中图 / 原图） | Phase 3、4 |
| 4 | `GET /home` 聚合接口，含按日期种子的伪随机今日推荐 | Phase 4 |
| 5 | `GET /recipes` 支持 sort / difficulty / cookTime 筛选参数 | Phase 5 |
| 6 | 华为账号登录后端对接（authCode 换取用户信息） | Phase 7 |
| 7 | 短信、邮件服务接入 | Phase 7 |
| 8 | `POST /ai/chat` SSE 流式接口 | Phase 9 |
| 9 | `DELETE /auth/account` 注销账号接口及数据清理逻辑 | Phase 10 |
| 10 | `ai_call_log` 表结构调整（user_id 可空 + caller_type，见需求文档第十节） | 后台侧 |

---

## 九、验收总清单

上线前逐项确认：

- [ ] 四个 Tab 均可正常使用，无白屏无崩溃
- [ ] 未登录可完整浏览首页、分类、详情、搜索
- [ ] 收藏/点赞/AI 在未登录时正确拉起登录，登录后自动继续原动作
- [ ] 四种登录方式均可用，协议勾选为必选项
- [ ] token 过期自动刷新，用户无感知；并发请求只刷新一次
- [ ] 详情页份数换算正确，`is_convertible = 0` 的食材不变
- [ ] AI 流式输出正常，可中断，跨分片事件解析正确
- [ ] 「注销账号」入口存在且有二次确认与数据范围说明
- [ ] 所有列表页有加载中 / 空 / 错误三种状态
- [ ] 断网状态下所有页面有友好提示且可重试
- [ ] 无硬编码色值、尺寸、文案
- [ ] 全项目无 V1 状态管理装饰器
- [ ] Release 包安装运行正常
