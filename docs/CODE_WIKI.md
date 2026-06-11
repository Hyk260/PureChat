# PureChat 项目 Code Wiki

> 聊天应用与 AI 开发框架，基于 Vue 3 + Vite 6 + TypeScript 构建，提供多模型 AI 对话、腾讯云 IM 聊天、Web 搜索等功能的完整前端应用。

---

## 1. 项目概览

### 1.1 项目定位

PureChat 是一款同时支持：
- **多模型 AI 对话**：对接 OpenAI、DeepSeek、Claude、Gemini、Qwen、Ollama 等多个 AI 服务
- **即时通讯聊天**：通过腾讯云 IM SDK 实现多用户群组/私聊
- **本地聊天模式**：基于 IndexedDB 的本地会话，无需后端即可运行
- **联网搜索**：内置 Tavily、Exa、百度、必应等多种搜索引擎提供商
- **桌面应用**：支持 Electron 打包，支持 macOS/Windows

### 1.2 核心功能清单

| 功能模块 | 说明 |
|---------|------|
| 多模型 AI 对话 | 流式输出、深度思考、工具调用、Markdown 渲染 |
| 会话管理 | 一对一聊天、群聊、会话列表、历史消息、合并转发 |
| 消息类型 | 文本、图片、文件、视频、引用回复、自定义消息体 |
| 代码高亮 | Shiki 语法高亮、代码块复制、HTML 工件预览 |
| Web 搜索 | 多种搜索引擎提供商，可配置的搜索策略 |
| 主题系统 | 光明/黑暗模式自动切换，系统主题跟随 |
| 多语言 | 简体中文 / English |
| 数据持久化 | Pinia + pinia-plugin-persistedstate + IndexedDB (Dexie) |

### 1.3 技术栈

| 类别 | 技术 |
|-----|-----|
| 核心框架 | Vue 3.5 + Vue Router 4 + Pinia 3 |
| 语言 | TypeScript 6 |
| 构建工具 | Vite 6 |
| UI 组件 | Element Plus 2.13 + Ant Design Vue 4.2 + UnoCSS |
| 图标 | @iconify/vue + Lucide + 自定义 SVG |
| AI SDK | OpenAI SDK + Ollama SDK |
| IM SDK | @tencentcloud/lite-chat |
| 富文本编辑器 | WangEditor |
| 代码编辑器 | Monaco Editor |
| 本地存储 | Dexie + idb-keyval + localforage |
| 测试 | Vitest |
| 其他 | @vueuse/core + dayjs + axios + Shiki 3 |

---

## 2. 应用初始化流程

入口文件：[src/main.ts](file:///Volumes/MacOs/github/PureChat/src/main.ts)

```
createApp(App)
       │
       ├─ setupDirectives()      // 安装全局指令（copy、lazy、optimize）
       ├─ loadAllAssembly()      // 注册自动装配组件
       ├─ setupPlugins()         // 安装插件（见下文）
       ├─ setupStore()           // Pinia Store + 持久化插件
       ├─ setupRouter()          // Vue Router + 路由守卫
       ├─ setupI18n()            // vue-i18n 国际化
       └─ app.mount('#app')      // 挂载到 DOM
```

**setupPlugins** 执行顺序：[src/plugins/index.ts](file:///Volumes/MacOs/github/PureChat/src/plugins/index.ts)

```
useElIcons()                   // 自动注册 Element Plus 图标
useElementPlus()               // Element Plus 全局配置
useGlobalProperties()          // 注入 $appConfig (isElectron, isLocalMode)
useLazyLoad()                  // vanilla-lazyload 图片懒加载
setupIconifyOffline()          // 离线图标加载
setupAppVersionNotification()  // 版本更新提示
setupAppErrorHandle(app)       // 全局错误处理
setupDayjs()                   // Day.js 日期格式化
```

**根组件** [src/App.vue](file:///Volumes/MacOs/github/PureChat/src/App.vue)

```html
<ElConfigProvider>           <!-- Element Plus 语言/主题配置 -->
  <AppProvider>              <!-- 全局提供器 -->
    <RouterView />           <!-- 路由出口 -->
  </AppProvider>
</ElConfigProvider>
```

---

## 3. 目录结构

### 3.1 根目录结构

```
PureChat/
├── build/                    # Vite 构建配置与插件
│   ├── config/
│   │   ├── define.ts         # 构建时常量、手动分包策略
│   │   ├── optimize.ts       # Vite 依赖优化配置
│   │   └── time.ts           # 构建时间
│   └── plugins/
│       ├── index.ts          # 插件装配入口
│       ├── cdn.ts            # CDN 导入插件
│       ├── html.ts           # HTML 模板处理
│       ├── info.ts           # 构建信息输出
│       ├── pwa.ts            # PWA 配置
│       ├── unocss.ts         # UnoCSS 配置
│       ├── unplugin.ts       # 自动导入/组件注册
│       └── utils.ts
├── packages/                 # Monorepo 包（pnpm workspace）
│   ├── const/                # 常量枚举
│   ├── database/             # Dexie 本地数据库（核心数据模型）
│   ├── fetch-sse/            # SSE 流式请求工具
│   ├── icons/                # 图标组件库（多品牌图标）
│   ├── model-bank/           # AI 模型与提供商数据
│   ├── model-runtime/        # AI 模型运行时抽象层
│   ├── prompts/              # Prompt 模板与处理链
│   ├── static-avatar/        # 静态头像资源
│   ├── types/                # 共享类型定义
│   ├── ui/                   # UI 组件库（Markdown 渲染等）
│   └── utils/                # 工具函数库（聊天、文件、时间等）
├── src/                      # 主应用源码
│   ├── components/           # 业务组件
│   ├── composables/          # 组合式 API
│   ├── config/               # 配置文件
│   ├── directives/           # Vue 指令
│   ├── hooks/                # 业务级 Hook
│   ├── layout/               # 三栏布局
│   ├── locales/              # 国际化文案
│   ├── plugins/              # Vue 插件装配
│   ├── router/               # 路由模块
│   ├── service/              # 服务层（核心业务逻辑）
│   ├── stores/               # Pinia 状态管理
│   ├── styles/               # 全局样式
│   ├── theme/                # 主题配置
│   ├── types/                # 类型定义
│   ├── typings/              # .d.ts 类型声明
│   ├── utils/                # 工具函数
│   ├── views/                # 页面级视图
│   ├── App.vue
│   └── main.ts
├── public/                   # 静态资源
├── scripts/                  # 构建脚本
├── .env                      # 环境变量模板
├── .env.development          # 开发环境
├── vite.config.ts            # Vite 配置
├── tsconfig.json             # TypeScript 配置
├── pnpm-workspace.yaml       # pnpm workspace 配置
├── eslint.config.js          # ESLint 配置
└── package.json
```

---

## 4. Monorepo 包详解

本项目通过 `pnpm-workspace.yaml` 管理多个内联包，形成清晰的分层架构：

```
┌─────────────────────────────────────────────────────────┐
│                      App Layer (src/)                   │
│  views / components / stores / router / service / layout │
└──────────────────┬──────────────────────────────────────┘
                   │ 使用
┌──────────────────▼──────────────────────────────────────┐
│                    Business Packages                     │
│                                                          │
│  ┌──────────┐  ┌──────────┐  ┌─────────────┐            │
│  │ database │  │  utils   │  │ model-bank  │  ...        │
│  └──────────┘  └──────────┘  └─────────────┘            │
│                                                          │
│  ┌─────────────┐  ┌────────┐  ┌────────────────┐        │
│  │ model-runtime│  │  ui    │  │ fetch-sse      │        │
│  └─────────────┘  └────────┘  └────────────────┘        │
│                                                          │
│  ┌─────────┐  ┌────────┐  ┌──────────┐  ┌─────────┐     │
│  │  icons  │  │ prompts│  │   const  │  │  types  │     │
│  └─────────┘  └────────┘  └──────────┘  └─────────┘     │
└──────────────────────────────────────────────────────────┘
```

### 4.1 packages/types — 共享类型定义

**包路径**：[packages/types/src/](file:///Volumes/MacOs/github/PureChat/packages/types/src/)

核心类型模块：

| 文件 | 说明 |
|------|------|
| `llm.ts` | LLM 对话相关类型（Message、ChatStreamPayload、ModelCard 等） |
| `protocol.ts` | 协议层类型定义 |
| `runtime.ts` | 模型运行时类型 |
| `aiProvider.ts` | AI 提供商类型 |
| `search.ts` | Web 搜索相关类型 |
| `topic/` | 话题/线程类型 |
| `message/` | 消息体通用类型 |
| `common.ts` | 通用类型（Nullable、PartialBy 等工具类型） |

### 4.2 packages/const — 常量枚举

**入口**：[packages/const/src/index.ts](file:///Volumes/MacOs/github/PureChat/packages/const/src/index.ts)

定义全项目共享的常量与枚举：
- `llm.ts` / `settings/llm.ts`：LLM 相关常量（模型 ID、默认参数）
- `message.ts`：消息类型枚举
- `session.ts`：会话常量
- `group.ts`：群组相关常量
- `user.ts`：用户相关常量
- `menu.ts`：菜单项定义
- `common.ts`：通用常量

### 4.3 packages/database — Dexie 本地数据库

**入口**：[packages/database/src/index.ts](file:///Volumes/MacOs/github/PureChat/packages/database/src/index.ts)

基于 [Dexie.js](https://dexie.org/) 封装的本地 IndexedDB 层，为本地聊天模式提供完整的数据持久化。

**核心架构**：

```
packages/database/src/
├── client/
│   ├── db.ts          # Dexie 实例定义
│   ├── index.ts       # 导出数据库访问
│   └── schemas.ts     # 表 schema 定义
├── core/
│   └── model.ts       # Model 基类（通用 CRUD 方法）
├── models/
│   ├── message.ts     # 消息模型
│   ├── session.ts     # 会话模型
│   ├── topic.ts       # 话题模型
│   ├── user.ts        # 用户模型
│   ├── files.ts       # 文件模型
│   └── index.ts
├── schemas/           # 各模块 schema 定义
└── types/             # 数据库类型
```

**数据模型**：

| 模型 | 主键 | 说明 |
|------|------|------|
| `DB_User` | `userID` | 用户/机器人/AI 模型档案 |
| `DB_Session` | `conversationID` | 会话列表项（每个会话对应一个用户/群） |
| `DB_Message` | `ID` | 具体消息（文本/图片/文件/系统提示等） |
| `DB_Topic` | `id` | AI 会话中的话题（会话下的子主题） |
| `DB_Group` | `groupID` | 群组资料 |
| `DB_File` | `id` | 文件上传记录 |

**关键类型导出**：

```ts
export interface DB_Message {
  ID: string                      // 消息唯一 ID
  conversationID: string          // 所属会话
  from: string                    // 发送者 userID
  to: string                      // 接收者
  type: MessageType               // 消息类型
  payload: any                    // 消息内容
  time: number                    // 时间戳
  status: MessageStatus           // 发送状态
  // ... 其他字段
}
```

### 4.4 packages/model-runtime — AI 模型运行时

**入口**：[packages/model-runtime/src/index.ts](file:///Volumes/MacOs/github/PureChat/packages/model-runtime/src/index.ts)

本包是项目的核心抽象层，提供与具体 AI 服务商解耦的通用模型调用接口。

**架构图**：

```
                    ┌──────────────────────┐
                    │    ModelRuntime      │
                    │ (统一调用门面)        │
                    └──────────┬───────────┘
                               │
              ┌────────────────┼────────────────┐
              ▼                ▼                ▼
        ┌──────────┐    ┌────────────┐    ┌─────────────┐
        │  OpenAI  │    │  Anthropic │    │  DeepSeek   │
        └──────────┘    └────────────┘    └─────────────┘
              │                │                │
              └────────────────┼────────────────┘
                               ▼
                    ┌──────────────────────┐
                    │ OpenAICompatibleRuntime│
                    │ (抽象基类：chat, models)│
                    └──────────────────────┘
                               │
                               ▼
                    ┌──────────────────────┐
                    │  Streams (SSE 解析)   │
                    │ openai / ollama       │
                    └──────────────────────┘
```

**核心组件**：

| 文件 | 职责 |
|------|------|
| `core/ModelRuntime.ts` | 模型运行时门面类，`chat()` 和 `models()` 统一接口 |
| `core/BaseAI.ts` | `RuntimeAI` 接口与 `OpenAICompatibleRuntime` 抽象基类 |
| `core/openaiCompatibleFactory/` | OpenAI 兼容模式工厂（非流转流转换） |
| `core/streams/` | SSE 流式响应解析器（OpenAI Responses API / Ollama） |
| `core/RouterRuntime/` | 路由式运行时（多模型路由） |
| `providers/*/index.ts` | 各 AI 提供商具体实现 |
| `runtimeMap.ts` | provider name → Runtime 类映射表 |

**使用示例**：

```ts
// 初始化特定提供商的运行时
const runtime = ModelRuntime.initializeWithProvider("openai", {
  apiKey: "sk-xxx",
  baseURL: "https://api.openai.com/v1",
})

// 流式聊天
const response = await runtime.chat({
  messages: [{ role: "user", content: "你好" }],
  model: "gpt-4o-mini",
  stream: true,
})

// 拉取可用模型列表
const models = await runtime.models()
```

### 4.5 packages/model-bank — AI 模型数据库

**入口**：[packages/model-bank/src/index.ts](file:///Volumes/MacOs/github/PureChat/packages/model-bank/src/index.ts)

维护所有支持的 AI 模型及提供商的静态数据。

**数据结构**：

```
packages/model-bank/src/
├── aiModels/            # 各提供商模型定义
│   ├── openai.ts
│   ├── deepseek.ts
│   ├── anthropic.ts
│   ├── qwen.ts
│   ├── ollama.ts
│   ├── zhipu.ts         # 智谱
│   ├── minimax.ts       # 字节
│   ├── mistral.ts
│   ├── zeroone.ts       # 零一万物
│   ├── github.ts
│   └── index.ts
├── aiModelsConfig/      # 模型调用配置（温度、最大 token 等）
├── aiModelsValue/       # 模型参数默认值
├── const/modelProvider.ts # 提供商信息
├── types/aiModel.ts     # 类型定义
└── providers.ts         # 提供商汇总
```

**核心类型**：

```ts
export interface AIBaseModelCard {
  id: string                 // 模型唯一 ID
  name: string               // 显示名称
  provider: string           // 提供商
  contextWindow: number      // 上下文窗口
  maxOutput: number          // 最大输出 token
  vision?: boolean           // 是否支持视觉
  // ...
}
```

### 4.6 packages/ui — UI 组件库

**入口**：[packages/ui/src/index.ts](file:///Volumes/MacOs/github/PureChat/packages/ui/src/index.ts)

可复用的 UI 组件，核心是 Markdown 渲染引擎。

**Markdown 组件链**：

```
<Markdown>
  └── NodeRenderer
        ├── CodeBlockNode     (代码块，Shiki 高亮)
        ├── PreCodeNode       (pre/code 包裹)
        ├── TableNode         (表格)
        ├── HighlightNode     (高亮行)
        └── ImageVerify       (图片加载校验)
```

支持特性：
- 自定义 Markdown-it 插件（容器、行号、链接、数学公式、图片）
- Shiki 3 语法高亮（`@shikijs/core` + `@shikijs/transformers`）
- 类型书写效果（TypewriterEffect）

### 4.7 packages/utils — 工具函数库

**入口**：[packages/utils/src/index.ts](file:///Volumes/MacOs/github/PureChat/packages/utils/src/index.ts)

超过 50+ 工具函数模块，覆盖：

| 目录/文件 | 功能 |
|----------|------|
| `chat/` | 聊天相关：添加时间分割线、剪贴板、链接识别、内容转换、OG 生成 |
| `hooks/` | React/Vue 风格 hooks：`useCopyCode`、`useScreenshot`、`useHandlerDrop` |
| `fetchEventSource/` | EventSource/SSE 请求封装 |
| `clientS3/` | S3 客户端上传 |
| `getCustomData/` | 自定义消息体解析 |
| `common.ts` | 通用工具函数 |
| `file.ts` / `download.ts` | 文件与下载处理 |
| `base64.ts` / `imageToBase64.ts` | Base64 编码、图片转换 |
| `time.ts` / `timeFormat.ts` | 时间工具 |
| `storage.ts` / `cookie.ts` | 本地存储与 Cookie |
| `safeParseJSON.ts` | 安全的 JSON 解析 |
| `sanitize.ts` | HTML 清理（DOMPurify） |
| `openai.ts` | OpenAI 请求辅助 |
| `idGenerator.ts` / `uuid.ts` | ID 生成 |
| `topic.ts` | 话题相关工具 |
| **测试** | `tests/` 目录下有完整 vitest 测试覆盖 |

### 4.8 packages/fetch-sse — SSE 流式请求

**入口**：[packages/fetch-sse/src/index.ts](file:///Volumes/MacOs/github/PureChat/packages/fetch-sse/src/index.ts)

提供基于 `fetch` 的 SSE（Server-Sent Events）请求封装。

核心模块：
- `fetchSSE.ts`：主入口函数，处理流式请求与回调
- `headers.ts`：请求头工具
- `request.ts`：底层请求封装
- `__tests__/`：单元测试

### 4.9 packages/icons — 图标组件库

**入口**：[packages/icons/src/index.ts](file:///Volumes/MacOs/github/PureChat/packages/icons/src/index.ts)

为每个 AI 模型提供商精心设计的 SVG 图标组件：

| 提供商 | 组件位置 |
|--------|---------|
| OpenAI | `Icon/OpenAI/` |
| Anthropic (Claude) | `Icon/Anthropic/` |
| DeepSeek | `Icon/DeepSeek/` |
| Google Gemini | `Icon/Gemini/` |
| Meta | `Icon/Meta/` |
| Mistral | `Icon/Mistral/` |
| Alibaba Qwen | `Icon/Qwen/` |
| Zhipu ChatGLM | `Icon/ChatGLM/` |
| Ollama | `Icon/Ollama/` |
| 零一万物 | `Icon/ZeroOne/` |
| Minimax | `Icon/Minimax/` |
| Yi 零一万物 | `Icon/Yi/` |
| Github | `Icon/Github/` |

每个图标包含三种形态：
- `Avatar.vue`：头像式圆形图标
- `Mono.vue`：单色线条图标
- `Text.vue`：文字 logo

功能组件：
- `features/ModelIcon/`：模型图标包装器
- `features/ProviderIcon/`：提供商图标
- `features/IconAvatar/`：头像组件
- `features/ModelTag/`：模型标签组件
- `svgIcon/`：额外 SVG 图标（Spinner、Tiktok 等）
- `lucideExtra/`：Lucide 扩展图标

### 4.10 packages/prompts — Prompt 模板库

**入口**：[packages/prompts/src/index.ts](file:///Volumes/MacOs/github/PureChat/packages/prompts/src/index.ts)

Prompt 处理链（chains）：

| Chain | 功能 |
|-------|------|
| `summaryTitle.ts` | 根据消息内容生成会话标题 |
| `translate.ts` | 文本翻译 |

每个 chain 提供类型安全的 prompt 模板与输出解析，包含 vitest 单元测试。

---

## 5. src/ 主应用架构

### 5.1 路由系统

**入口**：[src/router/index.ts](file:///Volumes/MacOs/github/PureChat/src/router/index.ts)

**路由模式**：
- Electron 环境：强制 `hash` 模式（`createWebHashHistory`）
- Web 环境：根据 `VITE_ROUTER_HISTORY` 可选 `hash` 或 `history`
- 基础路径：`VITE_BASE_URL`

**路由模块**：

| 模块 | 文件 | 说明 |
|------|------|------|
| layout | [src/router/modules/layout.ts](file:///Volumes/MacOs/github/PureChat/src/router/modules/layout.ts) | 主布局路由（需要认证） |
| remaining | [src/router/modules/remaining.ts](file:///Volumes/MacOs/github/PureChat/src/router/modules/remaining.ts) | 登录/404 等外部页面 |

**路由守卫**：[src/router/guard/index.ts](file:///Volumes/MacOs/github/PureChat/src/router/guard/index.ts)
- 认证检查（未登录跳登录页）
- 页面加载进度条（NProgress）
- 路由切换滚动行为

**主要路由表**：

| 路径 | 视图 | 说明 |
|------|------|------|
| `/chat/:conversationID?` | `views/chat/` | 聊天主页面（会话 ID 可选） |
| `/discover` | `views/discover/` | 模型/Agent 发现页 |
| `/friends` | `views/friends/` | 好友/联系人页 |
| `/about` | `views/about/` | 关于页 |
| `/login` | — | 登录页 |

### 5.2 布局系统

**入口**：[src/layout/index.vue](file:///Volumes/MacOs/github/PureChat/src/layout/index.vue)

经典三栏布局：

```
┌──────────┬──────────────────────┬──────────────┐
│          │                      │              │
│ LayAside │     LayContent       │  LaySetting  │
│ (侧边栏) │   (会话/消息区域)      │  (设置面板)  │
│          │                      │              │
└──────────┴──────────────────────┴──────────────┘
```

- `lay-aside/`：左侧导航栏（聊天/发现/朋友等入口）
- `lay-content/`：中间主内容区（RouterView 容器）
- `lay-setting/`：右侧设置抽屉（主题、语言、模型配置、搜索配置）

### 5.3 状态管理（Pinia Stores）

**入口装配**：[src/stores/index.ts](file:///Volumes/MacOs/github/PureChat/src/stores/index.ts)
- `resetSetupStore` 插件：支持一键重置 store
- `pinia-plugin-persistedstate`：状态持久化到 localStorage

**Store 模块**：[src/stores/modules/](file:///Volumes/MacOs/github/PureChat/src/stores/modules/)

| Store | ID | 核心职责 |
|-------|----|---------|
| `useAppStore` | `app` | 语言/时间线/Markdown 渲染开关 |
| `useUserStore` | `user` | 用户信息、登录状态、重连逻辑 |
| `useChatStore` | `chat` | 会话列表、当前会话、消息状态 |
| `useGroupStore` | `group` | 群组资料、群成员管理 |
| `useAgentStore` | `agent` | AI Agent 配置与状态 |
| `useRobotStore` | `robot` | 机器人模型配置 |
| `useThemeStore` | `theme` | 主题/字体/光明黑暗切换 |
| `useAuthStore` | `auth` | 认证 Token、用户凭证 |
| `useSidebarStore` | `sidebar` | 侧边栏折叠状态 |
| `useRouteStore` | `route` | 路由相关缓存 |
| `usePortalStore` | `portal` | 弹层/门户状态 |
| `useToolsStore` | `tools` | 工具面板状态 |
| `useTopicStore` | `topic` | AI 话题管理 |
| `useWebSearchStore` | `websearch` | Web 搜索配置 |

**Store ID 枚举**：[src/stores/enum/index.ts](file:///Volumes/MacOs/github/PureChat/src/stores/enum/index.ts)

### 5.4 服务层（Service Layer）

**目录**：[src/service/](file:///Volumes/MacOs/github/PureChat/src/service/)

服务层是项目最核心的业务逻辑所在，所有数据交互都通过此处完成。

#### 5.4.1 Chat 服务（核心）

**入口**：[src/service/chat/index.ts](file:///Volumes/MacOs/github/PureChat/src/service/chat/index.ts)

**聊天服务门面**：[src/service/chat/PureChatService.ts](file:///Volumes/MacOs/github/PureChat/src/service/chat/PureChatService.ts)

单例模式，根据编译时常量 `__LOCAL_MODE__` 选择运行模式：

```ts
class PureChatService {
  // 单例
  static getInstance(): PureChatService

  // 根据 __LOCAL_MODE__ 选择
  chatService: LocalChatService | TencentChatService

  // 调试工具（开发环境挂在 window.__TIM_DEBUG__）
  setupDebugTools()
}
```

**两种模式对比**：

| 模式 | 实现类 | 数据源 | 适用场景 |
|------|--------|--------|---------|
| 本地模式 | `LocalChatService` | 浏览器 IndexedDB (Dexie) | 单机 AI 对话、开发调试 |
| 腾讯云模式 | `TencentChatService` | 腾讯云 IM SDK | 多用户聊天、生产环境 |

**模式切换**：在 `.env` 中设置 `VITE_LOCAL_MODE=Y` 启用本地模式

#### 5.4.2 IM SDK API 层

**目录**：[src/service/im-sdk-api/](file:///Volumes/MacOs/github/PureChat/src/service/im-sdk-api/)

对腾讯云 IM SDK 进行薄封装的 API 层：

| 文件 | 说明 |
|------|------|
| `index.ts` | 导出所有 API，统一入口 |
| `message.ts` | 消息发送、撤回、转发 API |
| `session.ts` | 会话列表获取、置顶、免打扰 |
| `profile.ts` | 用户资料获取与设置 |
| `group.ts` | 群组管理（创建/加群/成员） |
| `other.ts` | 杂项 API（登录、登出、网络状态） |

#### 5.4.3 聊天辅助工具

**目录**：[src/service/chat/utils/](file:///Volumes/MacOs/github/PureChat/src/service/chat/utils/)

| 工具 | 功能 |
|------|------|
| `getConversationList` | 获取会话列表（带分页） |
| `checkoutNetState` | 网络状态变化监听 |
| `kickedOutReason` | 被踢下线原因处理 |

#### 5.4.4 AI 模型运行时（Client）

**目录**：[src/service/chatService/](file:///Volumes/MacOs/github/PureChat/src/service/chatService/)

| 文件 | 说明 |
|------|------|
| `index.ts` | 导出主 chat 服务 |
| `clientModelRuntime.ts` | 客户端侧模型运行时（调用 packages/model-runtime） |
| `agents/StreamingHandler.ts` | 流式响应处理器（解析 SSE、更新 UI） |
| `mecha/contextEngineering.ts` | 上下文工程（prompt 组装、压缩） |
| `mecha/index.ts` | Mecha 引擎（AI 调用编排） |

#### 5.4.5 Web 搜索服务

**目录**：[src/service/WebSearchProvider/](file:///Volumes/MacOs/github/PureChat/src/service/WebSearchProvider/)

支持的搜索引擎提供商：

| 提供商 | 文件 | 说明 |
|--------|------|------|
| Tavily | `TavilyProvider.ts` | 专业 AI 搜索引擎（推荐） |
| Exa AI | `ExaProvider.ts` | 语义搜索 |
| 百度 | `LocalBaiduProvider.ts` | 本地网页抓取（客户端） |
| 必应 | `LocalBingProvider.ts` | 本地网页抓取（客户端） |
| 默认 | `DefaultProvider.ts` | 回退实现 |

**工厂模式**：`WebSearchProviderFactory.create(providerName)`

**核心接口**：

```ts
interface BaseWebSearchProvider {
  name: string
  search(query: string, options?: SearchOptions): Promise<SearchResult[]>
  parseResponse(html: string): ParsedContent
}
```

**主服务入口**：[src/service/WebSearchService.ts](file:///Volumes/MacOs/github/PureChat/src/service/WebSearchService.ts)

#### 5.4.6 API 服务层

**目录**：[src/service/api/](file:///Volumes/MacOs/github/PureChat/src/service/api/)

| 文件 | 说明 |
|------|------|
| `index.ts` | axios 实例与通用 API |
| `auth.ts` | 认证相关 API（登录/注册/刷新 Token） |
| `user.ts` | 用户相关 API |
| `other.ts` | 杂项 API |

**请求封装**：[src/service/request/index.ts](file:///Volumes/MacOs/github/PureChat/src/service/request/index.ts)
- axios 拦截器（请求签名、响应格式化、错误统一处理）
- 类型定义在 `types.ts`

**数据模型声明**：[src/service/models.ts](file:///Volumes/MacOs/github/PureChat/src/service/models.ts)

### 5.5 组件体系

**目录**：[src/components/](file:///Volumes/MacOs/github/PureChat/src/components/)

**自动装配**：`components/Automatic/` 目录下的组件会在启动时通过 `loadAllAssembly()` 全局注册。

**核心组件模块**：

| 目录 | 说明 |
|------|------|
| `Chat/` | 聊天相关组件（消息气泡、输入框、菜单、话题面板） |
| `MessageRenderer/` | 通用消息渲染器（根据消息类型动态选择组件） |
| `CodeBlockView/` | 代码块展示、HTML 工件预览弹窗 |
| `CodeEditor/` | Monaco 编辑器 + 预览面板 |
| `ContextMenu/` | 右键上下文菜单 |
| `Popups/` | 各类弹窗（添加群成员、合并消息、上传头像等） |
| `ShareModal/` | 分享/截图生成弹窗 |
| `EmojiMart/` | Emoji 选择器 |
| `Loader/` | 加载动画 |
| `MoreSidebar/` | 扩展侧边栏 |
| `ThemeSwitch/` | 主题切换器 |

**消息渲染器架构**：[src/components/MessageRenderer/](file:///Volumes/MacOs/github/PureChat/src/components/MessageRenderer/)

```
MessageRenderer (index.vue)
  ├── ElemItemTypes/        (腾讯 IM 消息元素 → Vue 组件)
  │   ├── TextElemItem.vue
  │   ├── ImageElemItem.vue
  │   ├── FileElemItem.vue
  │   ├── VideoElemItem.vue
  │   ├── RelayElemItem.vue      (合并转发)
  │   ├── TipsElemItem.vue       (系统提示)
  │   ├── GroupTipElement.vue    (群提示)
  │   ├── GroupSystemNoticeElemItem.vue
  │   └── CustomElemItem.vue     (自定义消息 → CloudCustomData)
  ├── CustomMsgBody/       (AI/机器人自定义消息体)
  │   ├── Loading.vue      (思考中/加载)
  │   ├── ToolCall.vue     (工具调用)
  │   └── Warning.vue      (警告/错误)
  ├── CloudCustomData/     (自定义数据解析)
  │   ├── ReplyElem.vue    (引用回复)
  │   ├── Thinking.vue     (深度思考)
  │   └── WebSearch.vue    (搜索引用)
  ├── utils/
  │   ├── getMessageComponent.ts
  │   ├── message-component-factory.ts   (工厂模式)
  │   └── message-component-manager.ts   (注册表)
  └── types/message.ts
```

### 5.6 Hooks

**目录**：[src/hooks/](file:///Volumes/MacOs/github/PureChat/src/hooks/)

| Hook | 功能 |
|------|------|
| `useMessageCreator.ts` | 消息创建（构造 IM 消息对象） |
| `useMessageOperations.ts` | 消息操作（复制/转发/撤回/删除） |
| `useOAuth.ts` | GitHub OAuth 登录流程 |
| `usePopup.ts` | 弹窗管理 |
| `useSettings.ts` | 设置面板逻辑 |
| `types.ts` | Hook 相关类型 |

### 5.7 Composables

**目录**：[src/composables/](file:///Volumes/MacOs/github/PureChat/src/composables/)

| 文件 | 功能 |
|------|------|
| `useContextMenu.ts` | 右键菜单组合式 API |
| `useLazyload.ts` | 懒加载图片 |
| `useHtmlArtifacts.ts` | HTML 工件（生成/预览） |

### 5.8 指令（Directives）

**入口**：[src/directives/index.ts](file:///Volumes/MacOs/github/PureChat/src/directives/index.ts)

| 指令 | 功能 |
|------|------|
| `v-copy` | 点击复制文本 |
| `v-lazy` | 图片懒加载（vanilla-lazyload 封装） |
| `v-optimize` | 性能优化相关（虚拟滚动等） |

### 5.9 国际化（i18n）

**入口**：[src/locales/index.ts](file:///Volumes/MacOs/github/PureChat/src/locales/index.ts)

**语言包**：
- [src/locales/langs/zh-CN.ts](file:///Volumes/MacOs/github/PureChat/src/locales/langs/zh-CN.ts) — 简体中文
- [src/locales/langs/en.ts](file:///Volumes/MacOs/github/PureChat/src/locales/langs/en.ts) — English

**集成**：
- `elementPlus.ts`：Element Plus 组件语言包映射
- `dayjs.ts`：Day.js 日期格式化语言包

### 5.10 配置（Config）

**目录**：[src/config/](file:///Volumes/MacOs/github/PureChat/src/config/)

| 文件 | 说明 |
|------|------|
| `market.ts` | 模型市场配置（推荐模型、分类） |
| `prompts.ts` | 系统/推荐 Prompt 预设 |
| `webSearchProviders.ts` | Web 搜索提供商配置（名称、图标、可用状态） |
| `monaco-editor/config.ts` | Monaco Editor 编辑器配置 |
| `custom/index.ts` | 自定义配置（主题色等） |

### 5.11 页面视图（Views）

**目录**：[src/views/](file:///Volumes/MacOs/github/PureChat/src/views/)

#### 5.11.1 聊天主页面 `views/chat/`

**入口**：[src/views/chat/index.vue](file:///Volumes/MacOs/github/PureChat/src/views/chat/index.vue)

子组件：

```
views/chat/
├── message.vue              # 消息主容器（左侧列表 + 右侧内容）
├── chat/
│   ├── Chatwin.vue          # 单个聊天窗口（消息流展示）
│   ├── ConversationList.vue # 会话列表（虚拟滚动）
│   ├── GroupDetails.vue     # 群组详情面板
│   └── VirtualList.vue      # 虚拟列表组件
├── Inputbar/
│   ├── index.vue            # 输入栏主组件
│   ├── EmojiPicker.vue      # Emoji 选择
│   ├── RobotModel.vue       # AI 模型选择
│   ├── RobotOptions.vue     # 模型参数（温度等）
│   ├── RobotPlugin.vue      # 插件开关（搜索/工具调用）
│   └── DragPrompt.vue       # Prompt 拖拽
├── editor/
│   ├── index.vue            # 富文本编辑器（WangEditor 封装）
│   ├── SendMessageButton.vue
│   └── utils.ts             # 编辑器工具函数
└── components/
    ├── CardPopover.vue      # 卡片弹窗
    ├── EmptyMessage.vue     # 空状态
    ├── LoadMore.vue         # 加载更多
    └── SearchInput.vue      # 搜索框
```

**消息流程**：

```
用户输入 (editor/)
       │
       ▼
  useMessageCreator 构造消息
       │
       ▼
  发送至 IM SDK / 本地 DB
       │
       ├── AI 模型消息 → model-runtime.chat() → StreamingHandler 解析
       │                       │
       │                       ▼
       │                  SSE 流分段更新消息
       │
       └── 普通消息 → 直接写入 DB 并更新 UI

Chatwin.vue 监听 useChatStore.currentMessages
      (虚拟滚动 + 时间分割线 + Markdown 渲染)
```

#### 5.11.2 发现页 `views/discover/`

**入口**：[src/views/discover/index.vue](file:///Volumes/MacOs/github/PureChat/src/views/discover/index.vue)

- 展示 AI 模型市场、Agent 推荐
- `AgentCard.vue` / `ModelProviderCard.vue` / `StarMessage.vue`
- 可搜索、分类筛选

#### 5.11.3 好友页 `views/friends/`

**入口**：[src/views/friends/index.vue](file:///Volumes/MacOs/github/PureChat/src/views/friends/index.vue)

- 好友/联系人树状列表
- `FriendsTree.vue` / `FriendsTabs.vue` / `ProfileCard.vue` / `CardGrid.vue`

#### 5.11.4 关于页 `views/about/`

展示项目信息、版本、贡献者等。

---

## 6. 构建与配置系统

### 6.1 Vite 配置

**主文件**：[vite.config.ts](file:///Volumes/MacOs/github/PureChat/vite.config.ts)

**关键配置项**：

```ts
// 路径别名
alias: {
  "~": "/",                    // 项目根
  "@": "/src",                 // 源码目录
}

// 开发服务器
server.port: VITE_PORT
server.host: "0.0.0.0"         // 允许局域网访问
server.open: true              // 自动打开浏览器

// 预热文件，加速启动
warmup.clientFiles: ["./index.html", "./src/{views,components}/*"]

// 构建
build.sourcemap: VITE_SOURCE_MAP === "Y"
build.chunkSizeWarningLimit: 1024  // 1MB 警告阈值
build.rollupOptions.manualChunks  // 手动分包策略（见下文）
```

### 6.2 手动分包策略

**定义**：[build/config/define.ts](file:///Volumes/MacOs/github/PureChat/build/config/define.ts)

| chunk 名称 | 包含依赖 |
|-----------|---------|
| `vue-vendor` | vue |
| `vue-router-vendor` | vue-router |
| `pinia-vendor` | pinia |
| `element-plus-vendor` | element-plus |
| `element-icons-vendor` | @element-plus/icons-vue |
| `ant-vendor` | ant-design-vue |
| `wangeditor-vendor` | @wangeditor |
| `monaco-editor-vendor` | monaco-editor |
| `ollama-vendor` | ollama SDK |
| `tencent-im-vendor` | @tencentcloud/lite-chat |
| `lodash-vendor` | lodash-es |
| `vueuse-vendor` | @vueuse |
| `dayjs-vendor` | dayjs |
| `axios-vendor` | axios |
| `emoji-mart-vendor` | emoji-mart |
| `pinyin-pro-vendor` | pinyin-pro |
| `vue-i18n-vendor` | vue-i18n |
| `iconify-vendor` | @iconify |
| `vendor` | 其他所有 node_modules |

### 6.3 Vite 插件链

**定义**：[build/plugins/index.ts](file:///Volumes/MacOs/github/PureChat/build/plugins/index.ts)

```
@vitejs/plugin-vue            (Vue 3 SFC 编译)
@vitejs/plugin-vue-jsx        (JSX / TSX 支持)
vite-plugin-progress          (构建进度条)
unocss                        (原子化 CSS)
vite-plugin-html              (HTML 模板处理)
viteBuildInfo                 (构建完成信息输出)
├── unplugin-auto-import      (自动导入 Vue API)
├── unplugin-vue-components   (按需自动注册组件)
├── vite-plugin-remove-console (生产移除 console.log)
├── vite-plugin-vue-devtools  (开发调试工具)
├── rollup-plugin-visualizer  (打包分析，仅 analyze 命令)
└── vite-plugin-cdn-import    (CDN 加速，仅 VITE_CDN=Y)
```

### 6.4 自动导入（Auto Import）

通过 `unplugin-auto-import` 实现以下 API 免手动导入：

- Vue 3：`ref`, `computed`, `watch`, `onMounted`, `defineProps` 等
- Vue Router：`useRoute`, `useRouter`
- Pinia：`storeToRefs`
- VueUse：`useEventListener`, `useWindowFocus` 等
- 项目自定义：`useChatStore`, `useUserStore` 等 stores

生成的类型声明：`src/typings/auto-imports.d.ts`

### 6.5 TypeScript 配置

**主文件**：[tsconfig.json](file:///Volumes/MacOs/github/PureChat/tsconfig.json)

```jsonc
{
  "compilerOptions": {
    "target": "ESNext",
    "module": "ESNext",
    "moduleResolution": "bundler",     // Vite 原生模块解析
    "jsx": "preserve",
    "jsxImportSource": "vue",
    "lib": ["DOM", "ESNext"],
    "strict": true,
    "strictNullChecks": true,
    "paths": { "@/*": ["./src/*"], "~/*": ["./*"] },
    "types": ["vite/client", "node", "element-plus/global"]
  },
  "include": ["src/**/*", "build/**/*", "packages/**/*"]
}
```

### 6.6 UnoCSS 配置

**配置文件**：`uno.config.ts`

使用 UnoCSS 原子化 CSS 框架，配合：
- `@unocss/preset-icons`：支持 `<div class="i-carbon-logo-vue" />` 形式的图标类
- `@unocss/preset-uno`：默认预设（类 Tailwind）
- `@unocss/preset-rem-to-px`：rem → px 转换

### 6.7 代码规范

- **ESLint**：`eslint.config.js`（Flat Config 新格式）
- **Prettier**：`.prettierrc.js`
- **Style 配置**：`src/styles/index.css` + Element Plus 主题变量覆盖

---

## 7. 环境变量与编译时常量

### 7.1 环境变量（`.env` 文件）

| 变量 | 类型 | 默认 | 说明 |
|------|------|------|------|
| `VITE_PORT` | number | 5173 | 开发服务器端口 |
| `VITE_BASE_URL` | string | `/` | 应用部署路径 |
| `VITE_ROUTER_HISTORY` | `hash` \| `history` | `history` | 路由模式 |
| `VITE_LOCAL_MODE` | `Y` \| `N` | `N` | 是否启用本地聊天模式 |
| `VITE_APP_ENV` | `web` \| `electron` | `web` | 运行环境 |
| `VITE_OPENAI_API_KEY` | string | — | OpenAI API Key |
| `VITE_OPENAI_PROXY_URL` | string | — | OpenAI 代理地址 |
| `VITE_IM_SDK_APPID` | string | — | 腾讯云 IM AppID |
| `VITE_SERVICE_BASE_URL` | string | — | 后端服务地址 |
| `VITE_SOURCE_MAP` | `Y` \| `N` | `N` | 生产构建是否生成 sourcemap |
| `VITE_REMOVE_CONSOLE` | `Y` \| `N` | `N` | 构建时移除 console |
| `VITE_CDN` | `Y` \| `N` | `N` | 是否使用 CDN 加速 |
| `VITE_DEV_TOOLS` | `Y` \| `N` | `N` | 是否启用 Vue DevTools |

### 7.2 编译时常量（Injected by Vite）

| 常量 | 类型 | 说明 |
|------|------|------|
| `__LOCAL_MODE__` | boolean | 是否为本地聊天模式（由 `VITE_LOCAL_MODE` 决定） |
| `__IS_ELECTRON__` | boolean | 是否为 Electron 环境（由 `VITE_APP_ENV` 决定） |
| `__APP_INFO__` | object | 应用信息对象，包含 pkg 名称、版本、依赖、构建时间 |

在代码中可直接使用：

```ts
if (__LOCAL_MODE__) {
  // 本地模式特有逻辑
}
if (__IS_ELECTRON__) {
  // Electron 特有逻辑
}
console.log(__APP_INFO__.pkg.version)
```

类型声明：`src/typings/app.d.ts`

---

## 8. 关键数据流

### 8.1 用户登录流程

```
用户打开登录页
     │
     ▼
useOAuth.ts → GitHub OAuth 跳转
     │
     ▼
OAuth 回调 → 交换 access_token
     │
     ▼
useUserStore.login(userSig, userID)
     │
     ├─ IM SDK login(userSig) 或 LocalChatService.login()
     │
     ▼
拉取会话列表 → useChatStore.setConversationList()
     │
     ▼
重定向到 /chat → 首次进入欢迎消息
```

### 8.2 AI 消息发送与流式响应

```
用户在输入栏输入消息 + 选择模型
     │
     ▼
Inputbar/index.vue 提交
     │
     ▼
useMessageCreator 构造消息对象（DB_Message / IM Message）
     │
     ▼
发送至消息流
     ├─ 立即在 UI 显示 user message（乐观更新）
     │
     ▼
ClientModelRuntime → ModelRuntime.initializeWithProvider(provider, params)
     │
     ▼
ModelRuntime.chat(payload) → 调用具体 Provider 的 client.chat()
     │
     ▼
StreamingHandler 解析 SSE 流
     ├─ 每收到一个 chunk → 更新 assistant message
     │                     useChatStore.updateMessage()
     │
     ├─ 收到完整响应 → 设置消息状态 = success
     │
     └─ 错误处理 → 设置消息状态 = error + 重试按钮
     │
     ▼
持久化到 database (packages/database)
```

### 8.3 消息渲染流程

```
useChatStore.currentMessages (响应式数组)
         │
         ▼
Chatwin.vue + VirtualList.vue (虚拟滚动)
         │
         ├── 按时间分组 + 插入时间分割线 (TimeDivider)
         │
         ▼
MessageRenderer (index.vue)
         │
         ├── getMessageComponent(msg) → 查表选择组件
         │    (Text / Image / File / Video / Custom / Relay / Tips ...)
         │
         ├── 文本消息 → Markdown 渲染 (packages/ui Markdown)
         │                   ├── 代码块 → CodeBlockNode + Shiki 高亮
         │                   ├── 表格 → TableNode
         │                   └── 图片 → ImageVerify
         │
         └── 自定义消息 → 解析 payload.cloudCustomData
                              ├── Thinking (深度思考折叠)
                              ├── WebSearch (搜索引用卡片)
                              └── ReplyElem (引用回复)
```

---

## 9. 样式与主题系统

**全局样式入口**：[src/styles/index.css](file:///Volumes/MacOs/github/PureChat/src/styles/index.css)

**主题配置**：

| 样式文件 | 功能 |
|---------|------|
| `color.css` | 全局 CSS 变量（颜色、阴影） |
| `font.css` | 字体与排版 |
| `element.css` | Element Plus 主题覆盖 |
| `index.css` | 样式总入口 |
| `transition.css` | 过渡动画 |
| `scrollbar.css` | 自定义滚动条 |
| `normalize.css` | 重置样式 |

**主题切换机制**：

`useThemeStore` 维护主题状态，通过切换 `data-theme` attribute 或替换 CSS 变量值实现光明/黑暗模式切换，并自动监听 `prefers-color-scheme` 系统设置。

---

## 10. 类型系统

### 10.1 全局类型声明

**目录**：[src/typings/](file:///Volumes/MacOs/github/PureChat/src/typings/)

| 文件 | 说明 |
|------|------|
| `app.d.ts` | 全局常量类型（`__APP_INFO__`、`__LOCAL_MODE__` 等） |
| `auto-imports.d.ts` | 自动导入 API 类型（由 unplugin 生成） |
| `components.d.ts` | 自动注册组件类型（由 unplugin 生成） |
| `directives.d.ts` | 自定义指令类型 |
| `global.d.ts` | 全局类型（Window 扩展、Env 类型） |
| `storage.d.ts` | 本地存储键名类型 |
| `vite-env.d.ts` | Vite Client 类型 |
| `vue.d.ts` | Vue 扩展类型 |

### 10.2 业务类型（src/types）

**目录**：[src/types/](file:///Volumes/MacOs/github/PureChat/src/types/)

| 文件 | 说明 |
|------|------|
| `index.ts` | 汇总导出 |
| `tencent-cloud-chat.ts` | 腾讯云 IM SDK 类型（Profile、Conversation 等） |

---

## 11. 项目运行与开发

### 11.1 环境要求

```
Node.js: ^20.19.0 或 >= 22.0.0
pnpm: >= 8 (推荐使用 10.x)
```

### 11.2 安装与启动

```bash
# 1. 克隆项目
git clone https://github.com/Hyk260/PureChat.git
cd PureChat

# 2. 安装依赖（pnpm workspace 会自动 link 内部包）
pnpm install

# 3. 配置环境变量
cp .env .env.local
# 编辑 .env.local，填入必要的 API Key

# 4. 启动开发服务器（默认 http://localhost:5173）
pnpm dev

# 5. 生产构建
pnpm build

# 6. 预览构建结果
pnpm preview
```

### 11.3 所有 NPM Scripts

| 命令 | 说明 |
|------|------|
| `pnpm dev` | 启动 Vite 开发服务器（HMR） |
| `pnpm build` | 生产环境构建 |
| `pnpm build:dev` | 开发模式构建（保留调试信息） |
| `pnpm build:github` | 带 base URL 的构建（用于 GitHub Pages） |
| `pnpm build:cdn` | CDN 模式构建 |
| `pnpm build:preview` | 构建并启动预览服务器 |
| `pnpm preview` | 预览生产构建 |
| `pnpm preview:github` | 预览 GitHub Pages 构建 |
| `pnpm analyze` | 分析打包产物（rollup-plugin-visualizer） |
| `pnpm lint` | 运行 ESLint（自动修复） |
| `pnpm lint:vue` | 仅 lint `.vue` 文件 |
| `pnpm lint:check` | 仅检查，不自动修复 |
| `pnpm type:check` | 运行 TypeScript 类型检查（vue-tsc） |
| `pnpm type:watch` | 监听模式下运行类型检查 |
| `pnpm check` | 运行综合检查脚本 |
| `pnpm skills:sync` | 同步 AI skill 配置 |
| `pnpm skills:check` | 检查 skill 配置 |
| `pnpm clean` | 删除 dist 目录 |

### 11.4 本地模式快速上手（最简单方式）

```bash
# 1. 设置环境变量 .env.local
VITE_LOCAL_MODE=Y          # 启用本地聊天模式（无需腾讯云 IM）
VITE_OPENAI_API_KEY=sk-xxx  # 填入你的 OpenAI Key
VITE_OPENAI_PROXY_URL=https://api.openai.com/v1  # 或代理地址

# 2. 启动
pnpm dev

# 3. 打开浏览器 → 直接进入聊天界面 → 无需登录即可与 AI 对话
```

---

## 12. 关键模块调用图

```
                    ┌────────────────────┐
                    │     用户界面        │
                    │ (views/chat/)       │
                    └─────────┬──────────┘
                              │
                 ┌────────────┼────────────┐
                 ▼            ▼            ▼
          ┌──────────┐ ┌───────────┐ ┌──────────┐
          │  Pinia   │ │  Hooks    │ │ Compos- │
          │ (stores) │ │(useMsg*)  │ │ ables    │
          └────┬─────┘ └─────┬─────┘ └─────┬────┘
               │              │               │
               └──────────────┼───────────────┘
                              ▼
                    ┌──────────────────────┐
                    │  Service Layer       │
                    │  (src/service/)      │
                    │                      │
                    │  ├── chat/           │
                    │  │   ├── PureChatService (门面)│
                    │  │   ├── LocalChatService     │
                    │  │   └── TencentChatService   │
                    │  ├── chatService/    │
                    │  │   └── clientModelRuntime  │
                    │  ├── im-sdk-api/     │
                    │  ├── api/            │
                    │  ├── WebSearchService       │
                    │  └── request/        │
                    └──────────┬───────────┘
                               │
              ┌────────────────┼────────────────┐
              ▼                ▼                ▼
       ┌──────────┐    ┌──────────────┐  ┌──────────┐
       │ packages/ │    │ 腾讯云 IM SDK│  │ OpenAI   │
       │ workspace│    │ (外部依赖)     │  │ / Ollama │
       └──────────┘    └──────────────┘  └──────────┘
            │
    ┌───────┼──────────────┬───────────────┐
    ▼       ▼              ▼               ▼
┌──────┐┌───────┐   ┌────────────┐ ┌────────────┐
│model-││model- │   │   database │   │    ui     │
│runtime││bank   │   │   (Dexie)  │   │(Markdown) │
└──────┘└───────┘   └────────────┘ └────────────┘
    │                  │                │
    ▼                  ▼                ▼
┌──────────┐    ┌────────────┐   ┌────────────┐
│ fetch-sse│    │ IndexedDB  │   │ Shiki /    │
│ (SSE)    │    │ (浏览器)    │   │ highlight.js│
└──────────┘    └────────────┘   └────────────┘
```

---

## 13. 扩展指南

### 13.1 添加新的 AI 模型提供商

1. 在 `packages/model-bank/src/aiModels/newprovider.ts` 定义模型卡片数据
2. 在 `packages/model-runtime/src/providers/newprovider/` 实现 `OpenAICompatibleRuntime` 子类
3. 在 `packages/model-runtime/src/runtimeMap.ts` 注册映射
4. 在 `packages/icons/src/Icon/NewProvider/` 添加图标组件
5. 在 `src/config/market.ts` 配置市场展示信息

### 13.2 添加新的消息类型

1. 在 `packages/database/src/schemas/message.ts` 扩展类型
2. 在 `src/components/MessageRenderer/ElemItemTypes/` 添加新组件
3. 在 `src/components/MessageRenderer/utils/message-component-factory.ts` 注册组件映射
4. 在 `useMessageCreator` 中添加构造函数

### 13.3 添加新的 Web 搜索引擎

1. 在 `src/service/WebSearchProvider/NewProvider.ts` 实现 `BaseWebSearchProvider` 接口
2. 在 `WebSearchProviderFactory.ts` 中注册
3. 在 `src/config/webSearchProviders.ts` 添加配置

---

## 14. 常见问题（FAQ）

**Q1：本地模式与腾讯云模式有何区别？**
- 本地模式：所有数据存储在浏览器 IndexedDB，仅支持 AI 对话，无需任何后端
- 腾讯云模式：通过腾讯云 IM SDK 实现多用户即时通讯，需要后端配合签名

**Q2：如何切换到本地模式？**
- 在 `.env` 中设置 `VITE_LOCAL_MODE=Y` 后重启开发服务器

**Q3：为什么需要多个 AI SDK 封装？**
- 各提供商 API 协议略有差异（Ollama、Anthropic 等不完全兼容 OpenAI 格式）
- `model-runtime` 层提供统一抽象，业务层无需关心底层差异

**Q4：数据如何持久化？**
- Store 中的轻量状态：`pinia-plugin-persistedstate` → localStorage
- 消息/会话/用户资料：`packages/database`（Dexie）→ IndexedDB
- 文件/图片：浏览器内存 + 临时 Blob URL

**Q5：如何实现 AI 流式响应？**
- 通过 `fetch` 的 ReadableStream + SSE（Server-Sent Events）协议
- `packages/fetch-sse` 提供通用 SSE 解析能力
- `src/service/chatService/agents/StreamingHandler.ts` 负责将 chunks 转换为 UI 更新

---

## 15. 文件索引速查表

| 需求 | 位置 |
|------|------|
| 改 AI 模型列表 | `packages/model-bank/src/` |
| 改 AI 调用逻辑 | `packages/model-runtime/src/core/` |
| 改数据库 schema | `packages/database/src/schemas/` |
| 改消息气泡样式 | `src/components/MessageRenderer/` |
| 改 Markdown 渲染 | `packages/ui/src/Markdown/` |
| 改主题色 | `src/styles/color.css` + `src/theme/settings.ts` |
| 加新页面路由 | `src/router/modules/` |
| 加全局状态 | `src/stores/modules/` |
| 加 API | `src/service/api/` + `src/service/request/` |
| 改聊天功能核心 | `src/service/chat/PureChatService.ts` |
| 改输入栏 | `src/views/chat/Inputbar/` |
| 改聊天窗口 | `src/views/chat/chat/Chatwin.vue` |
| 加工具函数 | `packages/utils/src/` |
| 加国际化文案 | `src/locales/langs/` |
| 加 Prompt 预设 | `src/config/prompts.ts` 或 `packages/prompts/src/` |
| 加 Web 搜索 | `src/service/WebSearchProvider/` |

---

*本 Wiki 基于 PureChat 项目源码自动生成，如有疑问请查阅具体文件的详细实现。*
