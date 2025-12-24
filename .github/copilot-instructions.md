# Copilot 指南 — PureChat

目的：帮助 AI 代码助手快速理解此仓库的架构、常用工作流与可修改的触发点，以便安全、可运行地做出改动。

- **项目概览**: 前端 monorepo（pnpm workspace），使用 Vite + Vue 3 + TypeScript。根入口为 `src/main.ts`，页面在 `src/views/`，UI 组件在 `src/components/`。
- **关键子系统**:
  - `src/ai/`: 所有 LLM / 提供商抽象（见 `ApiClientFactory.ts`、`BaseApiClient.ts`）——新增或变更模型接入应从这里入手。
  - `src/components/`: 消息渲染、编辑器、主题等组件（例如 `src/components/Features/index.ts` 导出图标与映射）。
  - `src/service/` & `src/database/`: 网络与本地数据层，业务流从 service -> stores -> components。
  - `src/stores/`: Pinia 状态管理（首选在 stores 中放共享状态而非散落到组件）。

- **运行与构建（必用命令）**:
  - 安装: `pnpm install`
  - 开发: `pnpm dev` (vite)
  - 构建: `pnpm build`
  - Lint: `pnpm lint` 或 `pnpm lint:vue`
  - 类型检查: `pnpm type:check`
  - 项目检查: `pnpm run check`（项目自定义脚本）
  - 特殊构建：`pnpm build:github` 会设置 `VITE_BASE_URL=/PureChat/`

- **测试与本地验证**:
  - 仓内使用 `vitest`（在若干 packages 中有配置）。AI 修改应保证 `pnpm dev` 能启动，`pnpm build` 能构建，且 `pnpm lint`/类型检查无新增错误。

- **常见模式与约定（针对 AI）**:
  - 小步修改：优先最小变更集，单次 PR 聚焦单一目标（修复、特性或文档）。
  - 类型优先：为导出 API 明确类型；避免引入 `any`。修改 `src/ai` 或 `src/service` 时，先补类型再实现逻辑。
  - 配置点集中：新增模型/提供商常需要同时更新 `src/ai/platforms/*`、`src/ai/index.ts` 以及可能的 `config/modelProviders.ts` 或 `components/Features` 映射。
  - UI 修改：组件样式与行为通常在 `src/components/*`；若更改消息渲染，检查 `src/components/MessageRenderer` 下的实现。

- **外部集成/依赖注意事项**:
  - 依赖库示例：`openai`, `ollama`, `@tencentcloud/chat`。API 密钥与敏感信息应通过环境变量（VITE_*）注入，且不要将凭据硬编码或提交。
  - Monaco 编辑器、markdown 渲染和语法高亮使用 `monaco-editor`、`markdown-it`、`shiki` 等，变更编辑器相关代码请留意包体积与懒加载。

- **何处查找入手点（示例文件）**
  - `src/ai/ApiClientFactory.ts`：新增/切换模型接入的工厂入口。
  - `src/ai/BaseApiClient.ts`：提供商客户端共有抽象与流处理。
  - `src/components/Features/index.ts`：图标/映射导出示例（provider/model 映射通常在此类位置）。
  - `src/service/`：外部请求与业务逻辑封装。

- **提交与变更要求（AI 生成的 PR）**:
  - 保持构建可通过：`pnpm install` -> `pnpm build`。
  - 运行 lint 和类型检查并修复问题：`pnpm lint`，`pnpm type:check`。
  - 在 PR 描述中列出变更文件、动机、影响范围与验证步骤。

禁止事项：不要在仓库中加入硬编码密钥、远程执行脚本或直接修改 CI/CD 凭据；不要替换项目范围内的代码格式化或 ESLint 配置。

如果指令不明确，请要求精确输入：修改的目标文件路径、预期行为与成功标准（例如：`在 src/ai 增加 X 提供商，使 dev/server 能够使用該提供商並通過構建`）。
