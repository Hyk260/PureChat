# 异步组件加载配置

本项目已配置使用 `defineAsyncComponent` 异步加载路由组件，并包含完善的错误处理和加载状态管理。

## 功能特性

### 1. 自动错误处理
- 组件加载失败时自动显示错误组件
- 路由级别的错误捕获和处理
- 友好的错误提示信息

### 2. 加载状态显示
- 自定义加载组件
- 加载进度条动画
- 可配置延迟显示时间

### 3. 超时处理
- 可配置加载超时时间（默认10秒）
- 超时后自动显示错误组件

## 配置说明

### 路由配置示例

```typescript
import { defineAsyncComponent } from "vue"

export default [
  {
    path: "/chat",
    name: "chat",
    component: defineAsyncComponent({
      loader: () => import("@/views/chat/index.vue"),
      loadingComponent: defineAsyncComponent(() => import("../components/LoadingComponent.vue")),
      errorComponent: defineAsyncComponent(() => import("../components/ErrorComponent.vue")),
      delay: 200,
      timeout: 10000,
    }),
    meta: {
      title: "chat",
      keepAlive: true,
    },
  },
]
```

### 配置参数

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `loader` | Function | - | 组件加载函数 |
| `loadingComponent` | Component | LoadingComponent | 加载时显示的组件 |
| `errorComponent` | Component | ErrorComponent | 错误时显示的组件 |
| `delay` | number | 200 | 延迟显示加载组件的时间（毫秒） |
| `timeout` | number | 10000 | 加载超时时间（毫秒） |

## 组件说明

### 错误组件 (ErrorComponent.vue)
- 显示加载失败信息
- 提供重新加载按钮
- 提供返回上一页按钮
- 支持自定义错误信息

### 加载组件 (LoadingComponent.vue)
- 旋转加载图标
- 加载进度条
- 可自定义加载文本
- 平滑的动画效果

## 错误处理机制

### 路由级错误处理
项目配置了路由守卫来捕获和处理路由错误：

```typescript
// 自动捕获以下类型的错误：
// - Failed to resolve module specifier
// - Loading chunk failed
// - Loading CSS chunk failed
```

### 组件级错误处理
每个异步组件都配置了错误组件，当组件加载失败时会自动显示。

## 使用建议

### 1. 超时时间设置
- 首页组件：8-10秒
- 普通页面：10-15秒
- 复杂组件：15-20秒

### 2. 延迟时间设置
- 快速网络：100-200毫秒
- 慢速网络：200-500毫秒

### 3. 错误处理
- 重要页面：提供重试机制
- 普通页面：提供返回功能
- 可选功能：提供刷新选项

## 注意事项

1. **路径别名**：使用 `@` 别名路径，Vite 会自动处理
2. **组件大小**：大型组件建议增加超时时间
3. **用户体验**：避免频繁的加载状态切换
4. **错误处理**：确保错误组件能正常显示

## 扩展功能

如需自定义错误或加载组件，可以：

1. 创建自定义组件
2. 在路由配置中指定组件
3. 确保组件支持相应的 props

```typescript
component: defineAsyncComponent({
  loader: () => import("@/views/example.vue"),
  loadingComponent: defineAsyncComponent(() => import("@/components/CustomLoading.vue")),
  errorComponent: defineAsyncComponent(() => import("@/components/CustomError.vue")),
  delay: 200,
  timeout: 10000,
})
```
