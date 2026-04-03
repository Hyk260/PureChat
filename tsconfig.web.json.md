# TypeScript 配置文件说明

## 文件概述
`tsconfig.web.json` 是 PureChat 前端项目的 TypeScript 配置文件，用于设置编译器行为、模块解析和类型检查规则。

## 配置选项详解

### 基础编译选项

- `target: "ESNext"`
  - 目标输出为最新 ECMAScript 特性。
- `useDefineForClassFields: true`
  - 使用 `Object.defineProperty` 来初始化类字段，契合 ES 标准。
- `lib: ["ESNext", "DOM", "DOM.Iterable"]`
  - 引入浏览器与现代 ECMAScript API 类型。
- `module: "ESNext"`
  - 采用 ES 模块语法输出。

### 类型检查选项

- `skipLibCheck: true`
  - 仅检查项目代码类型，跳过外部声明文件以提升速度。
- `allowJs: true` / `checkJs: false`
  - 允许 JS 文件参与项目，但默认不进行类型检查。
- `strict: false` + 精细开启：
  - `strictNullChecks: true`
  - `noImplicitReturns: true`
  - `noImplicitThis: true`
  - `noUnusedLocals: true`
  - `noUnusedParameters: true`
  - `noFallthroughCasesInSwitch: true`
  - `noUncheckedIndexedAccess: true`
- `noImplicitAny: false`
  - 当前允许隐式 `any`，便于迁移中逐步提升类型覆盖。
- `forceConsistentCasingInFileNames: true`
  - 保证跨平台文件名大小写一致性。

### 模块解析选项

- `esModuleInterop: true`
- `allowSyntheticDefaultImports: true`
- `moduleResolution: "bundler"`
- `resolveJsonModule: true`
- `isolatedModules: true`

### 输出控制选项

- `declaration: false`
- `noEmit: true`
  - 仅进行类型检查，不生成编译产物。

### 路径映射

- `baseUrl: "."`
- `paths`:
  - `"@/*": ["./src/*"]`
  - `"~/*": ["./*"]`

### 类型定义

- `types: ["vite/client", "node", "element-plus/global"]`

### 包含/排除

- `include`:
  - `src/**/*.ts`, `src/**/*.vue`, `src/typings/*.ts`, `src/types/*.ts`, `build/**/*.ts`, `vite.config.ts`
- `exclude`:
  - `node_modules`, `dist`

## 优化建议

1. 若时间允许，可以将 `strict` 打开并配合 `noImplicitAny: true` 逐步修复类型错误，以长期维护性为主。
2. 当前 `paths` 只定义 `@/*` 和 `~/*`，若后续需要跨包统一路径（例如 `@shared`），建议与 `pnpm workspace` alias 同步维护。

## 官方资源

- https://www.typescriptlang.org/tsconfig
- https://www.typescriptlang.org/docs/handbook/compiler-options.html
- https://www.typescriptlang.org/docs/handbook/module-resolution.html 