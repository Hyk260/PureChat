# Dependabot 自动依赖更新配置指南

## 概述

Dependabot 是 GitHub 提供的自动化依赖管理工具，能够自动检测项目中的依赖更新，并创建 Pull Request 来更新依赖包。这有助于：

- 保持项目依赖的最新状态
- 及时获取安全补丁
- 减少手动维护依赖的工作量
- 提高项目的安全性

## 配置结构

### 基础配置

```yaml
version: 2
updates:
  # 配置项...
```

### 主要配置选项

#### 1. package-ecosystem
指定要监控的包管理器类型：

```yaml
package-ecosystem: "npm"        # Node.js npm
package-ecosystem: "yarn"       # Yarn
package-ecosystem: "pip"        # Python pip
package-ecosystem: "maven"      # Java Maven
package-ecosystem: "gradle"     # Java Gradle
package-ecosystem: "composer"   # PHP Composer
package-ecosystem: "bundler"    # Ruby Bundler
package-ecosystem: "cargo"      # Rust Cargo
package-ecosystem: "docker"     # Docker 镜像
package-ecosystem: "terraform"  # Terraform 模块
package-ecosystem: "github-actions" # GitHub Actions
```

#### 2. directory
指定配置文件所在的目录（对于 monorepo 项目）：

```yaml
directory: "/"              # 根目录
directory: "/frontend"      # 前端目录
directory: "/backend"       # 后端目录
directory: "/packages/core" # 核心包目录
```

#### 3. schedule
配置检查更新的时间计划：

```yaml
schedule:
  interval: "daily"         # 每天
  interval: "weekly"        # 每周
  interval: "monthly"       # 每月
  
  # 具体时间配置
  day: "monday"            # 周一（仅用于 weekly）
  time: "09:00"            # 上午9点
  timezone: "Asia/Shanghai" # 时区
```

#### 4. versioning-strategy
版本更新策略：

```yaml
versioning-strategy: "auto"           # 自动选择策略
versioning-strategy: "increase"       # 增加版本号
versioning-strategy: "widen"          # 扩大版本范围
versioning-strategy: "lockfile-only"  # 仅更新 lockfile
```

#### 5. ignore
忽略特定的依赖包：

```yaml
ignore:
  - dependency-name: "package-name"           # 忽略特定包
  - dependency-name: "@types/*"              # 忽略类型定义包
  - dependency-name: "eslint*"               # 忽略 ESLint 相关包
  - dependency-name: "prettier*"             # 忽略 Prettier 相关包
  - dependency-name: "test*"                 # 忽略测试相关包
  - dependency-name: "dev*"                  # 忽略开发依赖
```

#### 6. assignees
指定 PR 的负责人：

```yaml
assignees:
  - "username1"
  - "username2"
```

#### 7. reviewers
指定 PR 的审查者：

```yaml
reviewers:
  - "username1"
  - "username2"
```

#### 8. labels
为 PR 添加标签：

```yaml
labels:
  - "dependencies"
  - "automated"
  - "security"
```

#### 9. commit-message
自定义提交信息格式：

```yaml
commit-message:
  prefix: "chore"
  prefix-development: "chore"
  include: "scope"
```

#### 10. open-pull-requests-limit
限制同时打开的 PR 数量：

```yaml
open-pull-requests-limit: 10
```

## 完整配置示例

### 1. 基础 Node.js 项目配置

```yaml
version: 2
updates:
  # npm 依赖更新
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
      day: "monday"
      time: "09:00"
      timezone: "Asia/Shanghai"
    versioning-strategy: "auto"
    open-pull-requests-limit: 10
    assignees:
      - "maintainer1"
    reviewers:
      - "reviewer1"
    labels:
      - "dependencies"
      - "npm"
```

### 2. 多包管理器项目配置

```yaml
version: 2
updates:
  # npm 依赖
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
      day: "monday"
      time: "09:00"
    versioning-strategy: "auto"
    ignore:
      - dependency-name: "@types/*"
      - dependency-name: "eslint*"
      - dependency-name: "prettier*"
  
  # GitHub Actions
  - package-ecosystem: "github-actions"
    directory: "/"
    schedule:
      interval: "weekly"
      day: "monday"
      time: "09:00"
  
  # Docker 镜像
  - package-ecosystem: "docker"
    directory: "/"
    schedule:
      interval: "weekly"
      day: "monday"
      time: "09:00"
```

### 3. Monorepo 项目配置

```yaml
version: 2
updates:
  # 根目录依赖
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
      day: "monday"
      time: "09:00"
    versioning-strategy: "auto"
  
  # 前端应用
  - package-ecosystem: "npm"
    directory: "/packages/frontend"
    schedule:
      interval: "weekly"
      day: "monday"
      time: "09:00"
    versioning-strategy: "auto"
  
  # 后端应用
  - package-ecosystem: "npm"
    directory: "/packages/backend"
    schedule:
      interval: "weekly"
      day: "monday"
      time: "09:00"
    versioning-strategy: "auto"
  
  # 共享库
  - package-ecosystem: "npm"
    directory: "/packages/shared"
    schedule:
      interval: "weekly"
      day: "monday"
      time: "09:00"
    versioning-strategy: "auto"
```

### 4. 安全优先配置

```yaml
version: 2
updates:
  # 安全更新 - 每天检查
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "daily"
      time: "06:00"
      timezone: "UTC"
    versioning-strategy: "auto"
    open-pull-requests-limit: 5
    labels:
      - "security"
      - "dependencies"
    assignees:
      - "security-team"
  
  # 常规更新 - 每周检查
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
      day: "monday"
      time: "09:00"
      timezone: "Asia/Shanghai"
    versioning-strategy: "auto"
    open-pull-requests-limit: 10
    ignore:
      - dependency-name: "@types/*"
      - dependency-name: "eslint*"
      - dependency-name: "prettier*"
    labels:
      - "dependencies"
```

### 5. 企业级配置

```yaml
version: 2
updates:
  # 生产依赖 - 保守更新
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "monthly"
      day: "monday"
      time: "09:00"
      timezone: "Asia/Shanghai"
    versioning-strategy: "widen"
    open-pull-requests-limit: 3
    assignees:
      - "senior-dev"
    reviewers:
      - "tech-lead"
      - "qa-team"
    labels:
      - "dependencies"
      - "production"
      - "needs-review"
    commit-message:
      prefix: "chore"
      include: "scope"
  
  # 开发依赖 - 积极更新
  - package-ecosystem: "npm"
    directory: "/"
    schedule:
      interval: "weekly"
      day: "monday"
      time: "09:00"
      timezone: "Asia/Shanghai"
    versioning-strategy: "auto"
    open-pull-requests-limit: 5
    assignees:
      - "dev-team"
    labels:
      - "dependencies"
      - "dev-deps"
    ignore:
      - dependency-name: "@types/*"
```

## 最佳实践

### 1. 安全更新策略
- 为安全更新设置更频繁的检查间隔
- 使用不同的标签区分安全更新和常规更新
- 为安全更新分配专门的审查者

### 2. 版本控制策略
- 生产环境使用 `widen` 策略，避免破坏性更新
- 开发环境使用 `auto` 策略，及时获取新功能
- 使用 `lockfile-only` 策略更新锁定文件

### 3. 忽略策略
- 忽略类型定义包（@types/*）
- 忽略开发工具包（eslint*, prettier*）
- 忽略测试框架包（jest*, vitest*）
- 忽略构建工具包（vite*, webpack*）

### 4. 审查流程
- 为不同类型的更新分配不同的审查者
- 使用标签分类 PR
- 设置合理的 PR 数量限制

### 5. 时区考虑
- 根据团队所在时区设置检查时间
- 避免在非工作时间创建 PR

## 常见问题

### Q: 如何禁用特定包的更新？
A: 使用 `ignore` 配置项：
```yaml
ignore:
  - dependency-name: "problematic-package"
```

### Q: 如何设置不同的更新频率？
A: 为不同的包生态系统或目录配置不同的 schedule：
```yaml
updates:
  - package-ecosystem: "npm"
    schedule:
      interval: "daily"  # 每天检查
  - package-ecosystem: "github-actions"
    schedule:
      interval: "weekly"  # 每周检查
```

### Q: 如何处理破坏性更新？
A: 使用 `versioning-strategy: "widen"` 或设置更保守的更新策略：
```yaml
versioning-strategy: "widen"
open-pull-requests-limit: 1
```

### Q: 如何自定义 PR 标题和描述？
A: 使用 `commit-message` 配置：
```yaml
commit-message:
  prefix: "chore"
  include: "scope"
```

## 监控和维护

### 1. 定期检查
- 监控 Dependabot 的更新频率
- 检查被忽略的包是否仍然需要忽略
- 评估更新策略的效果

### 2. 团队协作
- 建立 PR 审查流程
- 设置自动化测试
- 配置 CI/CD 集成

### 3. 性能优化
- 合理设置 PR 数量限制
- 避免过于频繁的更新检查
- 使用适当的忽略规则

## 相关资源

- [Dependabot 官方文档](https://docs.github.com/en/code-security/dependabot)
- [Dependabot 配置参考](https://docs.github.com/en/code-security/dependabot/dependabot-version-updates/configuration-options-for-the-dependabot.yml-file)
- [GitHub 安全公告](https://github.com/advisories)
- [npm 安全审计](https://docs.npmjs.com/cli/v8/commands/npm-audit) 