# pnpm 使用指南

## 基础命令

### 1. 查看 pnpm 版本
```bash
pnpm --version
# 或
pnpm -v
```

### 2. 查看指定依赖的版本
```bash
# 查看特定包的版本
pnpm list <package-name>
# 例如：pnpm list react

# 查看全局安装的包版本
pnpm list -g <package-name>

# 查看所有依赖的版本信息
pnpm list --depth=0
```

### 3. 查看所有已安装依赖
```bash
# 查看当前项目的所有依赖
pnpm list

# 查看依赖树结构
pnpm list --depth=1

# 查看全局安装的包
pnpm list -g

# 查看过时的依赖
pnpm outdated
```

### 4. 安装依赖
```bash
# 安装所有依赖（根据 package.json）
pnpm install
# 或简写
pnpm i

# 安装特定依赖
pnpm install <package-name>

# 安装开发依赖
pnpm install -D <package-name>
# 或
pnpm install --save-dev <package-name>

# 安装生产依赖
pnpm install -P <package-name>
# 或
pnpm install --save-prod <package-name>

# 全局安装
pnpm install -g <package-name>
# 或
pnpm install --global <package-name>
```

### 5. 添加依赖
```bash
# 添加生产依赖
pnpm add <package-name>

# 添加开发依赖
pnpm add -D <package-name>
# 或
pnpm add --save-dev <package-name>

# 添加全局依赖
pnpm add -g <package-name>

# 添加多个依赖
pnpm add react react-dom typescript

# 添加指定版本的依赖
pnpm add <package-name>@<version>
# 例如：pnpm add react@18.2.0
```

### 6. 移除依赖
```bash
# 移除依赖
pnpm remove <package-name>
# 或简写
pnpm rm <package-name>

# 移除全局依赖
pnpm remove -g <package-name>

# 移除多个依赖
pnpm remove react react-dom
```

### 7. 升级依赖
```bash
# 升级所有依赖
pnpm update
# 或简写
pnpm up

# 升级特定依赖
pnpm update <package-name>

# 升级到最新版本（忽略 semver）
pnpm update --latest <package-name>

# 升级全局依赖
pnpm update -g <package-name>

# 检查可升级的依赖
pnpm outdated
```

## 缓存管理

### 8. 清理缓存
```bash
# 清理 pnpm 缓存
pnpm store prune

# 查看缓存大小
pnpm store path

# 清理所有缓存
pnpm store prune --force
```

## 镜像源管理

### 9. 查看当前镜像源
```bash
# 查看当前配置的镜像源
pnpm config get registry

# 查看所有配置
pnpm config list
```

### 10. 切换镜像源
```bash
# 设置淘宝镜像
pnpm config set registry https://registry.npmmirror.com

# 设置官方镜像
pnpm config set registry https://registry.npmjs.org

# 设置腾讯镜像
pnpm config set registry https://mirrors.cloud.tencent.com/npm/

# 设置华为镜像
pnpm config set registry https://repo.huaweicloud.com/repository/npm/

# 临时使用镜像源（单次安装）
pnpm install --registry https://registry.npmmirror.com
```

## 脚本执行

### 11. 运行脚本
```bash
# 运行 package.json 中定义的脚本
pnpm run <script-name>
# 或简写
pnpm <script-name>

# 例如：
pnpm run dev
pnpm run build
pnpm run test

# 运行多个脚本
pnpm run build && pnpm run test
```

## 工作区管理

### 12. 工作区操作
```bash
# 查看工作区信息
pnpm list --recursive

# 在工作区中安装依赖
pnpm install --recursive

# 在特定工作区中运行脚本
pnpm --filter <workspace-name> run <script>

# 在根目录运行脚本
pnpm -r run <script>
```

## 依赖分析

### 13. 依赖分析
```bash
# 查看依赖树
pnpm list --depth=0

# 查看依赖的依赖
pnpm list --depth=1

# 查看为什么安装了某个包
pnpm why <package-name>

# 查看重复的依赖
pnpm list --duplicate
```

## 发布相关

### 14. 发布包
```bash
# 发布包到 npm
pnpm publish

# 发布到特定 registry
pnpm publish --registry <registry-url>

# 发布前检查
pnpm publish --dry-run
```

## 其他实用命令

### 15. 环境管理
```bash
# 查看 pnpm 配置
pnpm config list

# 设置配置
pnpm config set <key> <value>

# 删除配置
pnpm config delete <key>

# 查看 pnpm 存储路径
pnpm store path
```

### 16. 性能优化
```bash
# 使用硬链接（默认启用）
pnpm install --shamefully-hoist

# 禁用严格的对等依赖检查
pnpm install --shamefully-hoist --strict-peer-dependencies=false
```

### 17. 调试和日志
```bash
# 启用详细日志
pnpm install --loglevel verbose

# 查看安装日志
pnpm install --reporter=default

# 静默安装
pnpm install --silent
```

### 18. 清理和重置
```bash
# 清理 node_modules
rm -rf node_modules
pnpm install

# 清理 pnpm 锁文件
rm pnpm-lock.yaml
pnpm install

# 重置所有配置
pnpm config delete registry
```

## 常用组合命令

### 19. 项目初始化
```bash
# 创建新项目
mkdir my-project && cd my-project
pnpm init
pnpm add react react-dom typescript
pnpm add -D @types/react @types/react-dom vite
```

### 20. 依赖迁移
```bash
# 从 npm 迁移到 pnpm
rm package-lock.json
rm -rf node_modules
pnpm install

# 从 yarn 迁移到 pnpm
rm yarn.lock
rm -rf node_modules
pnpm install
```

## 配置文件

### 21. .npmrc 配置
```bash
# 创建 .npmrc 文件
echo "registry=https://registry.npmmirror.com" > .npmrc
echo "shamefully-hoist=true" >> .npmrc
echo "strict-peer-dependencies=false" >> .npmrc
```

## 故障排除

### 22. 常见问题解决
```bash
# 权限问题
pnpm config set store-dir ~/.pnpm-store

# 网络问题
pnpm config set registry https://registry.npmmirror.com
pnpm config set fetch-timeout 600000
pnpm config set fetch-retries 5

# 清理并重新安装
pnpm store prune
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

## 性能对比

### 23. pnpm vs npm vs yarn
```bash
# 安装速度对比
time pnpm install
time npm install
time yarn install

# 磁盘空间使用
du -sh node_modules  # npm/yarn
du -sh ~/.pnpm-store # pnpm
```

## 最佳实践

### 24. 推荐配置
```bash
# 设置全局配置
pnpm config set registry https://registry.npmmirror.com
pnpm config set store-dir ~/.pnpm-store
pnpm config set verify-store-integrity false
```

### 25. 团队协作
```bash
# 确保使用相同版本
pnpm config set engine-strict true

# 锁定 pnpm 版本
echo "packageManager": "pnpm@8.0.0" >> package.json
```
