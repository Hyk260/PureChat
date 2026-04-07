---
alwaysApply: false
---
# PureChat 项目规则

## 技术栈
Vue 3 + TypeScript 5 + Vite 5 + Element Plus + Pinia + Vue Router + Axios + SCSS

## 架构规范
- 分层架构：表现层 → 应用层 → 领域层 → 基础设施层
- 目录按功能模块划分：components/pages/stores/services/utils/ai
- 数据流：组件 → composables/services → Pinia store → 组件

## 代码规范
- 命名：组件 PascalCase，函数/变量 camelCase，常量 UPPER_SNAKE_CASE
- TypeScript：禁用 any，接口定义复杂结构
- Vue：Composition API，props/emits 类型明确
- 路由：路径 kebab-case，命名 PascalCase

## 分支管理
- main：稳定版，develop：开发版
- feature/* 功能开发，bugfix/* 修复，hotfix/* 紧急修复

## 提交规范
- 格式：&lt;type&gt;[scope]: &lt;description&gt;
- 类型：feat/fix/docs/style/refactor/perf/test/build/ci/chore

## 开发流程
1. 从 develop 建分支
2. 开发 + 测试
3. PR 到 develop
4. 审查通过合并

## 测试部署
- 工具：Vitest + Vue Test Utils，核心覆盖率 ≥80%
- 配置：.env 环境变量，CI/CD 自动化部署

## 安全与 AI
- 不存储敏感信息，HTTPS，输入验证
- AI：配置集中管理，流式响应，错误重试，体验优化

更新：2026-04-7
