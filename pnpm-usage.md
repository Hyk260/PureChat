# pnpm 使用指南

> PureChat 项目专用 pnpm 使用指南 - 基于 pnpm workspace 的 monorepo 项目

## 📋 目录

- [快速开始](#快速开始)
- [基础命令](#基础命令)
- [工作区管理](#工作区管理)
- [依赖管理](#依赖管理)
- [缓存与性能](#缓存与性能)
- [镜像源配置](#镜像源配置)
- [脚本执行](#脚本执行)
- [依赖分析](#依赖分析)
- [发布与部署](#发布与部署)
- [故障排除](#故障排除)
- [PureChat 项目专用](#purechat-项目专用)
- [最佳实践](#最佳实践)

## 🚀 快速开始

### 环境要求
```bash
# 检查 pnpm 版本（推荐 8.x+）
pnpm --version

# 全局安装 pnpm（如果未安装）
npm install -g pnpm
```

### 项目初始化
```bash
# 克隆项目
git clone <repository-url>
cd PureChat

# 安装所有依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建项目
pnpm build
```

## 📦 基础命令

### 版本查看
```bash
# 查看 pnpm 版本
pnpm --version

# 查看全局安装包
pnpm list -g

# 查看项目依赖版本
pnpm list --depth=0
```

### 安装依赖
```bash
# 安装所有依赖
pnpm install
pnpm i

# 安装生产依赖
pnpm add <package-name>

# 安装开发依赖
pnpm add -D <package-name>

# 安装全局包
pnpm add -g <package-name>

# 安装指定版本
pnpm add <package-name>@<version>
```

### 移除依赖
```bash
# 移除依赖
pnpm remove <package-name>
pnpm rm <package-name>

# 移除全局包
pnpm remove -g <package-name>
```

### 升级依赖
```bash
# 升级所有依赖
pnpm update
pnpm up

# 升级特定依赖
pnpm update <package-name>

# 升级到最新版本
pnpm update --latest <package-name>

# 查看可升级的依赖
pnpm outdated
```

## 🏢 工作区管理

### 工作区基础
```bash
# 查看工作区结构
pnpm list --recursive

# 在所有工作区安装依赖
pnpm install --recursive

# 在特定工作区运行命令
pnpm --filter <workspace-name> <command>

# 在所有工作区运行命令
pnpm -r <command>
```

### 过滤器使用
```bash
# 按包名过滤
pnpm --filter @pure/ui add lodash

# 按路径过滤
pnpm --filter ./packages/ui <command>

# 按依赖关系过滤
pnpm --filter @pure/ui --filter @pure/utils <command>

# 包含依赖该包的工作区
pnpm --filter ...@pure/utils <command>
```

### 工作区脚本
```bash
# 在所有工作区构建
pnpm -r build

# 在特定工作区测试
pnpm --filter @pure/utils test

# 并行执行
pnpm -r --parallel build
```

## 📚 依赖管理

### 依赖分析
```bash
# 查看依赖树
pnpm list

# 查看为什么安装了某个包
pnpm why <package-name>

# 查看重复依赖
pnpm list --duplicate

# 查看过时的依赖
pnpm outdated

# 查看依赖大小
pnpm list --depth=0 --json | jq '.[] | {name: .name, version: .version, size: .size}'
```

### 依赖清理
```bash
# 清理未使用的依赖
pnpm prune

# 清理缓存
pnpm store prune

# 清理并重新安装
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

## ⚡ 缓存与性能

### 缓存管理
```bash
# 查看缓存路径
pnpm store path

# 查看缓存状态
pnpm store status

# 清理缓存
pnpm store prune

# 强制清理所有缓存
pnpm store prune --force
```

### 性能优化
```bash
# 使用硬链接提升性能
pnpm install --shamefully-hoist

# 禁用严格的对等依赖检查
pnpm install --strict-peer-dependencies=false

# 并行安装
pnpm install --parallel

# 增加网络超时
pnpm install --fetch-timeout 600000
```

## 🌐 镜像源配置

### 常用镜像源
```bash
# 官方源
pnpm config set registry https://registry.npmjs.org

# 淘宝镜像
pnpm config set registry https://registry.npmmirror.com

# 腾讯镜像
pnpm config set registry https://mirrors.cloud.tencent.com/npm/

# 华为镜像
pnpm config set registry https://repo.huaweicloud.com/repository/npm/
```

### 镜像源管理
```bash
# 查看当前镜像源
pnpm config get registry

# 查看所有配置
pnpm config list

# 临时使用镜像源
pnpm install --registry https://registry.npmmirror.com

# 设置全局镜像源
pnpm config set registry https://registry.npmmirror.com --global
```

## ▶️ 脚本执行

### 基本脚本运行
```bash
# 运行 package.json 中的脚本
pnpm run <script-name>
pnpm <script-name>

# 例如
pnpm dev
pnpm build
pnpm test
```

### 工作区脚本
```bash
# 在所有工作区运行脚本
pnpm -r <script-name>

# 在特定工作区运行
pnpm --filter <workspace> <script-name>

# 并行执行
pnpm -r --parallel <script-name>
```

## 🔍 依赖分析

### 依赖查询
```bash
# 查看依赖树
pnpm list --depth=1

# 查看包信息
pnpm info <package-name>

# 查看包的依赖
pnpm info <package-name> dependencies

# 查看包的 peer dependencies
pnpm info <package-name> peerDependencies
```

### 依赖关系图
```bash
# 生成依赖关系图（需要额外工具）
pnpm list --json --depth=2 | jq '.[] | {name: .name, dependencies: .dependencies | keys}'
```

## 📤 发布与部署

### 包发布
```bash
# 发布到 npm
pnpm publish

# 发布到特定 registry
pnpm publish --registry <registry-url>

# 发布前检查
pnpm publish --dry-run

# 发布指定标签
pnpm publish --tag beta
```

### 版本管理
```bash
# 查看当前版本
pnpm version

# 升级版本
pnpm version patch  # 1.0.0 -> 1.0.1
pnpm version minor  # 1.0.0 -> 1.1.0
pnpm version major  # 1.0.0 -> 2.0.0

# 预发布版本
pnpm version prerelease
```

## 🔧 故障排除

### 常见问题

#### 1. 依赖安装失败
```bash
# 清理缓存重试
pnpm store prune
pnpm install

# 使用不同镜像源
pnpm install --registry https://registry.npmmirror.com

# 增加超时时间
pnpm install --fetch-timeout 600000
```

#### 2. 工作区依赖问题
```bash
# 重新安装工作区依赖
pnpm install --recursive

# 检查工作区配置
cat pnpm-workspace.yaml

# 清理工作区缓存
pnpm -r exec rm -rf node_modules
pnpm install
```

#### 3. 权限问题
```bash
# 修复权限
sudo chown -R $(whoami) ~/.pnpm-store

# 或重新设置存储路径
pnpm config set store-dir ~/.pnpm-store
```

#### 4. 网络问题
```bash
# 设置代理
pnpm config set http-proxy http://proxy.company.com:8080
pnpm config set https-proxy http://proxy.company.com:8080

# 或使用 VPN
```

#### 5. 锁文件冲突
```bash
# 删除锁文件重新生成
rm pnpm-lock.yaml
pnpm install
```

### 调试命令
```bash
# 详细日志
pnpm install --loglevel verbose

# 调试模式
pnpm install --reporter=default

# 查看安装过程
pnpm install --progress
```

## 🎯 PureChat 项目专用

### 项目结构
```
PureChat/
├── packages/          # 工作区包
│   ├── ui/           # UI 组件库
│   ├── utils/        # 工具函数
│   ├── database/     # 数据库相关
│   ├── model-runtime/# AI 模型运行时
│   └── ...
├── src/              # 主应用源码
└── pnpm-workspace.yaml
```

### 常用开发命令
```bash
# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 构建 GitHub Pages 版本
pnpm build:github

# 构建 CDN 版本
pnpm build:cdn

# 代码检查
pnpm lint
pnpm type:check
pnpm check

# 清理构建产物
pnpm clean
```

### 工作区开发
```bash
# 在所有包中运行 lint
pnpm -r lint

# 在特定包中安装依赖
pnpm --filter @pure/ui add lodash

# 构建所有包
pnpm -r build

# 测试特定包
pnpm --filter @pure/utils test
```

### 环境配置
```bash
# 检查环境配置
pnpm run check

# 同步技能配置
pnpm skills:sync

# 检查技能配置
pnpm skills:check
```

## 📊 快速参考表

| 命令 | 说明 | 工作区支持 |
|------|------|-----------|
| `pnpm i` | 安装依赖 | ✅ |
| `pnpm add` | 添加依赖 | ✅ (使用 --filter) |
| `pnpm rm` | 移除依赖 | ✅ (使用 --filter) |
| `pnpm up` | 升级依赖 | ✅ (使用 --filter) |
| `pnpm run` | 运行脚本 | ✅ (使用 -r/--filter) |
| `pnpm build` | 构建项目 | ✅ |
| `pnpm test` | 运行测试 | ✅ |

## ⚙️ 配置管理

### 配置文件
```bash
# 查看配置
pnpm config list

# 设置配置
pnpm config set <key> <value>

# 删除配置
pnpm config delete <key>

# 编辑配置文件
pnpm config edit
```

### .npmrc 配置
```ini
# .npmrc
registry=https://registry.npmmirror.com
shamefully-hoist=true
strict-peer-dependencies=false
store-dir=~/.pnpm-store
fetch-timeout=600000
```

## 🚀 最佳实践

### 1. 工作区开发
- 使用 `--filter` 精确控制影响范围
- 定期运行 `pnpm -r lint` 和 `pnpm -r type:check`
- 使用 `--parallel` 提升构建速度

### 2. 依赖管理
- 定期运行 `pnpm outdated` 检查更新
- 使用 `pnpm why` 理解依赖关系
- 避免循环依赖

### 3. 性能优化
- 启用 `shamefully-hoist` 提升安装速度
- 定期清理缓存 `pnpm store prune`
- 使用国内镜像源加速下载

### 4. CI/CD 配置
```yaml
# .github/workflows/ci.yml
- name: Setup pnpm
  uses: pnpm/action-setup@v2
  with:
    version: 8

- name: Install dependencies
  run: pnpm install --frozen-lockfile

- name: Build
  run: pnpm build
```

### 5. 团队协作
- 提交 `pnpm-lock.yaml` 到版本控制
- 使用相同版本的 pnpm
- 统一镜像源配置

## 📚 进阶阅读

- [pnpm 官方文档](https://pnpm.io/)
- [pnpm workspace 指南](https://pnpm.io/workspaces)
- [PureChat 贡献指南](./CONTRIBUTING.md)

---

*最后更新: 2024年* | *适用于 PureChat v1.0.0+* 
