## Git 分支开发规范（PureChat）

本文档约定本项目在日常开发、测试、发布中的 Git 分支模型、命名规范、提交流程与合并策略，确保团队协作一致、高效、可追溯。

### 分支模型

- **main**: 产线稳定分支，仅保存对外发布的稳定版本。禁止在此分支直接开发。
- **release/x.y.z**: 预发布分支，用于发布前的联调、回归与版本封版（x.y.z 为语义化版本号）。
- **feature/**: 功能开发分支，从 `main` 或指定基线创建，完成后合并回 `main`（通过 PR）。
- **fix/**: 缺陷修复分支，修复日常测试或开发中发现的问题。
- **hotfix/**: 线上紧急修复分支，基于 `main` 创建，修复完成后合并回 `main` 并同步到相关分支。
- **chore/**: 工程化/构建/依赖等杂项改动分支（不影响业务逻辑）。
- **docs/**: 仅文档相关改动分支。
- **test/**: 测试验证或实验性尝试分支，必要时清理。

建议采用「简化 GitFlow」：以 `main` 为单主干，按需创建 `release` 与临时开发分支。

### 分支命名规范

统一使用小写、`-` 连接词，推荐包含范围与简要描述：

- `feature/<scope>-<short-desc>` 例：`feature/chat-message-virtual-list`
- `fix/<scope>-<short-desc>` 例：`fix/login-token-refresh`
- `hotfix/<scope>-<short-desc>` 例：`hotfix/chat-crash-on-image`
- `chore/<scope>-<short-desc>` 例：`chore/build-pnpm-workspace`
- `docs/<scope>-<short-desc>` 例：`docs/contributing-guide`
- `release/x.y.z` 例：`release/1.4.0`

其中 `<scope>` 通常为模块名或目录名，如 `ai`、`service-api`、`views-chat`、`stores-user` 等。

### 提交信息规范（Conventional Commits）

本仓库已包含 `commitlint.md`，建议遵循 Conventional Commits：

```
<type>(<scope>): <subject>

[optional body]
[optional footer(s)]
```

- 常用 `type`：`feat`、`fix`、`perf`、`refactor`、`style`、`docs`、`test`、`chore`、`build`、`ci`。
- `scope` 建议与分支 `<scope>` 一致。
- `subject` 使用陈述式、简洁明确；英文首字母小写，结尾不加句号。

示例：

```
feat(views-chat): 支持会话多选与批量删除
fix(service-request): 处理 401 刷新 token 失败的边界
chore(build): 升级 vite 到 5.x 并修复插件兼容
```

### 工作流与合并策略

1) 从最新基线创建分支

- 功能/修复分支一般从 `main` 创建；版本周期内也可从 `release/x.y.z` 创建。
- 创建前先同步远端：`git fetch --all --prune`。

2) 保持分支同步

- 开发中推荐定期 `git pull --rebase origin <base>` 以减少合并噪音。
- 避免在同一分支内产生多余的合并提交（merge commit）。

3) PR 规则

- 所有改动必须通过 PR 合并，禁止直接向 `main` 推送。
- 一个 PR 专注一件事：尽量小而完整，便于 Review。
- PR 描述需包含：变更摘要、影响范围、测试说明、兼容性与风险点。
- CI 必须通过，确保构建、lint、测试均通过后方可合并。

4) 合并方式

- 默认使用 **Squash and merge**：保持主干历史清晰，每个 PR 生成一条语义化提交。
- Hotfix 可在必要时使用 `merge` 保留完整提交，但需说明原因。

5) 代码评审

- 至少 1 名 Reviewer 通过（核心模块建议 2 名）。
- Reviewer 关注：正确性、可读性、边界/异常、性能与安全、是否符合目录与代码风格。

### 版本与发布

- 采用语义化版本：`MAJOR.MINOR.PATCH`
  - 破坏性变更：提升 MAJOR
  - 向后兼容新功能：提升 MINOR
  - 向后兼容修复：提升 PATCH
- 当准备发布：
  1. 从 `main` 切出 `release/x.y.z`
  2. 回归测试、修复仅允许修复类提交
  3. 生成变更日志（推荐基于 Conventional Commits 自动生成）
  4. 合并回 `main`，在 `main` 打 Tag：`vX.Y.Z`
  5. 如有持续演进分支，同步必要改动

### Hotfix 流程

1. 基于 `main` 创建 `hotfix/<scope>-<desc>` 分支。
2. 完成修复后发起 PR 合并回 `main`，打补丁 Tag（如 `v1.4.1`）。
3. 需要时将修复变更 Cherry-pick 至活跃的 `release` 或后续开发分支。

### 目录/模块命名建议（与分支 scope 对齐）

与本仓库结构对应，常见 scope 可参考：

- `ai/*`、`src/ai/*`：模型接入、平台适配
- `service/*`、`src/service/*`：接口层与请求封装
- `views/*`、`components/*`：页面与组件
- `stores/*`：状态管理
- `utils/*`：工具方法
- `plugins/*`、`build/*`：构建与插件

### 本地开发建议

- 提交前：`pnpm run lint`、`pnpm run typecheck`（如有）、`pnpm run build` 验证。
- 大改动前创建分支并尽早同步 PR，降低冲突风险。
- 避免将编译产物与临时文件提交到仓库。

### 分支生命周期

- `feature/*`、`fix/*`、`chore/*`、`docs/*`、`test/*`：合并完成后删除远端分支。
- `release/x.y.z`：版本发布完成、回合并后删除。
- `hotfix/*`：合并与回同步完成后删除。

### 典型命令示例

```bash
# 同步最新主干并创建功能分支
git checkout main
git pull --rebase origin main
git checkout -b feature/views-chat-virtual-list

# 保持与主干同步
git fetch --all --prune
git rebase origin/main

# 推送并创建 PR
git push -u origin feature/views-chat-virtual-list

# 完成后本地删除
git checkout main && git pull --rebase
git branch -d feature/views-chat-virtual-list
git push origin --delete feature/views-chat-virtual-list
```

### 分支保护与权限（建议）

- 保护 `main`：
  - 必须通过 CI
  - 至少 1 人 Review
  - 禁止强推（force push）
  - 禁止直接在 `main` 上提交
- 对 `release/*` 分支应用同等保护策略。

### 附录：与提交校验集成

- 推荐在本地启用 `commitlint`、`eslint`、`prettier` 与 `lint-staged`，在提交前进行校验与自动修复，确保规范落地。

---

如需对规范进行修改或细化，请提交 PR 更新本文档。
