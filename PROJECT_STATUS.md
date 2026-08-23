# 食谱 App 鸿蒙端 — 实施进度

更新时间：2026-08-21

按 `harmonyappimplementationguide.md` 的 Phase 顺序施工。本文件记录每个 Phase 的落地情况与待验证项。

## 进度

| Phase | 内容 | 状态 | 产出 |
|---|---|---|---|
| 0 | 工程初始化 | ✅ 代码完成 | `build-profile.json5`（多环境变量注入）、`AppScope/app.json5`、`module.json5`（deviceTypes: phone、INTERNET 权限）、目录骨架、`pages/Index.ets`（Navigation + 四 Tab） |
| 1 | 设计 token | ✅ 代码完成 | `color.json` / `float.json` / `string.json`、`uikit/Theme.ets`、`media/` 下 30+ 线性图标与插画、`resources/dark/` 预留、`uikit/DesignPreview.ets` 预览页 |
| 2 | 基础设施层 | ✅ 代码完成 | `Logger` / `Strings` / `Formatter` / `PreferenceUtil` / `TokenManager` / `HistoryStore` / `ApiPaths` / `HttpClient` / `Interceptors`（401 单飞刷新）/ `Errors` / `SseClient` / `RouteNames` / `NavUtil` / `RouteMap` |
| 3 | 通用组件库 | ✅ 代码完成 | `StateView` / `NetImage` / `RecipeCard` / `RecipeCardH` / `RecipeRow` / `DifficultyStars` / `TagChip` / `Buttons` / `SearchBar` / `LoadMoreFooter` / `SkeletonBox` / `SectionHeader` / `ConfirmDialog` / `Toast` / `LazyDataSource` / `TopBar` / `CookTimeLabel` |
| 4 | 首页 | ✅ 代码完成 | 搜索框、标签宫格、AI 引导卡、今日推荐、热门榜单、最新发布（下拉刷新 + 触底加载） |
| 5 | 分类页 | ✅ 代码完成 | 标签横滑、三种排序、难度/耗时筛选面板、双列 WaterFlow、条件变更回顶 |
| 6 | 详情页 | ✅ 代码完成 | 通栏封面、标题区、份数切换器（`is_convertible` 不换算）、食材/步骤/提示、底部操作栏、Share Kit 系统分享 |
| 7 | 登录与鉴权 | ✅ 代码完成 | 华为一键登录 + 短信 + 密码 + 邮箱、协议勾选必选、半屏 `LoginSheet` 与全屏 `LoginPage` 共用表单、`requireLogin` 回调续跑原动作 |
| 8 | 收藏与点赞 | ✅ 代码完成 | 乐观更新 + 失败回滚、300ms 防抖、未登录拉起登录后自动补做 |
| 9 | AI 页 | ✅ 代码完成 | SSE 流式（含跨分片缓冲）、三种结果渲染、停止生成、示例气泡、未登录引导 |
| 10 | 我的 | ✅ 代码完成 | 两态、我的收藏/点赞/浏览历史/AI 食谱、账号与绑定（含**注销账号**）、资料编辑（Picker 免权限选图）、关于、协议与隐私（rawfile 本地文档） |
| 11 | 搜索 | ✅ 代码完成 | 自动聚焦、搜索历史（本地、可单删可清空）、无历史展示热门、空结果引导到 AI Tab 并带关键词 |
| 12 | 打磨与上架 | ⬜ 未开始 | 需真机跑通后进行 |

## 尚未验证（重要）

本机没有 HarmonyOS SDK，**代码从未编译或真机运行过**。首次在 DevEco Studio 打开后需要：

1. `ohpm install` 拉取 `@ohos/imageknife`。
2. 逐一核对系统 Kit 的 API 签名：RCP 拦截器（`Interceptors.ets`）、Account Kit（`HuaweiAuth.ets`）、Share Kit（`ShareHelper.ets`）、Picker（`ProfileEditViewModel.ets`）。这几处按官方文档写，首次编译大概率需按 IDE 报错微调。
3. **优先做 SSE 技术验证**：构造一次被拆成两个 chunk 的单个 SSE 事件，确认 `SseClient` 的分片边界处理正确。这是全项目风险最高的一处。

## 依赖后端

以下未就绪前，对应页面只能跑通 UI 与错误态：

- 所有 ID 以**字符串**返回（雪花 ID 超出 JS number 安全范围，用 number 会静默丢精度）
- `recipe.publish_time` 字段；图片多尺寸 URL
- `GET /home` 聚合接口（含按日期种子的伪随机今日推荐）
- `GET /recipes` 的 sort / difficulty / cookTime 筛选参数
- 华为账号 authCode 换取、短信与邮件服务
- `POST /ai/chat` SSE 流式接口
- `DELETE /auth/account` 及数据清理

## 上架前必办

- `resources/rawfile/agreement.txt` 与 `privacy.txt` 目前是**占位稿**，须替换为法务正式文本（文件名与路径不要改）。
- 应用图标、启动页目前是临时 SVG，需 UI 出正式素材。
- 软著、备案、开发者认证——前置周期比开发还长，建议立即并行启动。
