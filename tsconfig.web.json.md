# TypeScript 配置文件说明

## 文件概述
`tsconfig.web.json` 是 PureChat 项目的 TypeScript 配置文件，用于配置 TypeScript 编译器的行为和类型检查规则。

## 配置选项详解

### 基础编译选项

#### `target: "ESNext"`
- **作用**: 指定编译后的 JavaScript 版本
- **值**: "ESNext" 表示使用最新的 ECMAScript 特性
- **官方文档**: https://www.typescriptlang.org/tsconfig#target

#### `useDefineForClassFields: true`
- **作用**: 使用 `Object.defineProperty` 来定义类字段，而不是赋值
- **官方文档**: https://www.typescriptlang.org/tsconfig#useDefineForClassFields

#### `lib: ["ESNext", "DOM", "DOM.Iterable"]`
- **作用**: 指定要包含的库文件
- **ESNext**: 最新的 ECMAScript 特性
- **DOM**: 浏览器 DOM API
- **DOM.Iterable**: DOM 迭代器接口
- **官方文档**: https://www.typescriptlang.org/tsconfig#lib

#### `module: "ESNext"`
- **作用**: 指定模块系统
- **值**: "ESNext" 使用最新的 ES 模块语法
- **官方文档**: https://www.typescriptlang.org/tsconfig#module

### 类型检查选项

#### `skipLibCheck: true`
- **作用**: 跳过对声明文件的类型检查，提高编译速度
- **官方文档**: https://www.typescriptlang.org/tsconfig#skipLibCheck

#### `allowJs: true`
- **作用**: 允许编译 JavaScript 文件
- **官方文档**: https://www.typescriptlang.org/tsconfig#allowJs

#### `checkJs: false`
- **作用**: 不对 JavaScript 文件进行类型检查
- **官方文档**: https://www.typescriptlang.org/tsconfig#checkJs

#### `strict: false`
- **作用**: 禁用所有严格类型检查选项
- **官方文档**: https://www.typescriptlang.org/tsconfig#strict

### 模块解析选项

#### `esModuleInterop: true`
- **作用**: 启用 ES 模块互操作性
- **官方文档**: https://www.typescriptlang.org/tsconfig#esModuleInterop

#### `allowSyntheticDefaultImports: true`
- **作用**: 允许从没有默认导出的模块中默认导入
- **官方文档**: https://www.typescriptlang.org/tsconfig#allowSyntheticDefaultImports

#### `moduleResolution: "bundler"`
- **作用**: 使用打包器友好的模块解析策略
- **官方文档**: https://www.typescriptlang.org/tsconfig#moduleResolution

#### `resolveJsonModule: true`
- **作用**: 允许导入 JSON 文件
- **官方文档**: https://www.typescriptlang.org/tsconfig#resolveJsonModule

#### `isolatedModules: true`
- **作用**: 确保每个文件都可以独立编译
- **官方文档**: https://www.typescriptlang.org/tsconfig#isolatedModules

### 输出控制选项

#### `declaration: false`
- **作用**: 不生成声明文件 (.d.ts)
- **官方文档**: https://www.typescriptlang.org/tsconfig#declaration

#### `noEmit: true`
- **作用**: 不生成输出文件，只进行类型检查
- **官方文档**: https://www.typescriptlang.org/tsconfig#noEmit

### 路径映射

#### `baseUrl: "."`
- **作用**: 设置模块解析的基础目录
- **官方文档**: https://www.typescriptlang.org/tsconfig#baseUrl

#### `paths`
- **作用**: 配置模块路径映射
- **配置**:
  - `"@/*": ["./src/*"]` - src 目录别名
  - `"~/*": ["./*"]` - 根目录别名
  - `"@shared/*": ["./packages/shared/*"]` - shared 包别名
  - `"@database/*": ["./packages/database/*"]` - database 包别名
- **官方文档**: https://www.typescriptlang.org/tsconfig#paths

### 类型定义

#### `types: ["vite/client"]`
- **作用**: 包含 Vite 客户端的类型定义
- **官方文档**: https://www.typescriptlang.org/tsconfig#types

### 文件包含/排除

#### `include`
- **作用**: 指定要包含的文件
- **配置**: 
  - `"build/**/*.ts"` - build 目录下的 TypeScript 文件
  - `"src/**/*.ts"` - src 目录下的 TypeScript 文件
  - `"src/**/*.vue"` - Vue 单文件组件
  - `"packages/**/*.ts"` - packages 目录下的 TypeScript 文件
  - `"vite.config.ts"` - Vite 配置文件
  - `"package.json"` - 包配置文件
- **官方文档**: https://www.typescriptlang.org/tsconfig#include

#### `exclude`
- **作用**: 指定要排除的文件
- **配置**:
  - `"node_modules"` - 依赖包目录
  - `"**/*.js"` - 所有 JavaScript 文件
  - `"dist"` - 构建输出目录
  - `"*.d.ts"` - 声明文件
  - `"packages/**/*.js"` - packages 目录下的 JavaScript 文件
- **官方文档**: https://www.typescriptlang.org/tsconfig#exclude

## 官方资源

- **TypeScript 官方文档**: https://www.typescriptlang.org/
- **tsconfig.json 完整参考**: https://www.typescriptlang.org/tsconfig
- **TypeScript 编译器选项**: https://www.typescriptlang.org/docs/handbook/compiler-options.html
- **TypeScript 模块解析**: https://www.typescriptlang.org/docs/handbook/module-resolution.html

## 项目特定说明

此配置文件针对 PureChat 项目进行了优化：

1. **混合项目支持**: 支持 JavaScript 和 TypeScript 混合开发
2. **路径别名**: 配置了便捷的模块导入路径
3. **类型检查**: 只进行类型检查，不生成输出文件
4. **Vue 支持**: 包含 Vue 单文件组件的支持
5. **打包器友好**: 使用适合现代打包工具的配置 