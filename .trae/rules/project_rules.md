---
alwaysApply: false
---
# PureChat 项目规则文档

## 1. 项目概述
PureChat 是基于 Vue.js 的聊天应用，集成 AI 功能，支持多平台部署。

## 2. 技术栈
- **前端**: Vue 3.x + TypeScript 5.x
- **构建**: Vite 5.x
- **UI**: Element Plus 2.x
- **状态**: Pinia 2.x
- **路由**: Vue Router 4.x
- **HTTP**: Axios 1.x
- **样式**: SCSS

## 3. 架构规范
- **分层架构**: 表现层 → 应用层 → 领域层 → 基础设施层
- **目录结构**: src/ 下按功能模块划分（components、pages、stores、services 等）
- **数据流**: 组件 → composables/services → Pinia store → 组件

## 4. 代码规范
- **命名**: 组件 PascalCase，工具 camelCase，常量全大写
- **TypeScript**: 避免 any，使用接口定义复杂结构
- **Vue**: 使用 Composition API，props/ emits 类型明确
- **状态管理**: Pinia，按模块划分 store
- **路由**: 路径 kebab-case，名称 PascalCase

## 5. 分支管理
- **main**: 稳定版本
- **develop**: 开发分支
- **feature/***: 功能开发
- **bugfix/***: 修复 bug
- **hotfix/***: 紧急修复

## 6. 提交规范
- **格式**: <type>[scope]: <description>
- **类型**: feat/fix/docs/style/refactor/perf/test/build/ci/chore

## 7. 开发流程
1. 从 develop 创建功能分支
2. 完成开发并编写测试
3. 提交 PR 到 develop
4. 代码审查通过后合并

## 8. 测试规范
- **覆盖率**: 核心功能 ≥80%
- **工具**: Vitest + Vue Test Utils
- **执行**: 提交前运行所有测试

## 9. 部署规范
- **环境**: 开发/测试/生产
- **配置**: 使用 .env 文件管理
- **流程**: CI/CD 自动化构建部署

## 10. 安全规范
- 避免前端存储敏感信息
- 使用 HTTPS
- 对输入进行验证
- 保护 AI API 密钥

## 11. AI 功能规范
- 配置集中管理
- 支持流式响应
- 处理错误和重试
- 优化用户体验

**最后更新**: 2026-01-21