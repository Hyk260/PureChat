# 拼音工具模块

这个模块提供了对 `pinyin-pro` 的动态导入支持，并包含兜底方案以确保功能的可靠性。

## 功能特性

- ✅ 动态导入 `pinyin-pro` 模块
- ✅ 自动兜底方案（文本字符串匹配）
- ✅ 模块缓存机制
- ✅ 预加载功能
- ✅ 状态监控
- ✅ TypeScript 支持

## 使用方法

### 1. 异步使用（推荐）

```typescript
import { matchPinyin } from '@/utils/pinyin'

const result = await matchPinyin("张三", "zs")
console.log(result) // 匹配结果数组
```

### 2. 同步使用（使用缓存）

```typescript
import { matchPinyinSync } from '@/utils/pinyin'

const result = matchPinyinSync("张三", "zs")
console.log(result) // 匹配结果数组
```

### 3. 预加载模块

```typescript
import { preloadPinyinPro } from '@/utils/pinyin'

// 在应用启动时预加载
await preloadPinyinPro()
```

### 4. 检查模块状态

```typescript
import { getPinyinProStatus } from '@/utils/pinyin'

const status = getPinyinProStatus()
console.log(status) // { isLoaded: boolean, isLoading: boolean, hasModule: boolean }
```

## 兜底方案

当 `pinyin-pro` 模块加载失败时，系统会自动使用兜底方案：

1. **直接字符串匹配**：检查文本是否包含搜索字符串
2. **首字母匹配**：使用简化的拼音首字母映射进行匹配
3. **大小写不敏感**：所有匹配都忽略大小写

## 性能优化

- **模块缓存**：成功加载的模块会被缓存，避免重复加载
- **并发控制**：防止多个请求同时加载模块
- **预加载**：可以在应用启动时预加载模块，提升用户体验

## 错误处理

所有函数都包含完善的错误处理机制：

- 模块加载失败时自动降级到兜底方案
- 详细的错误日志记录
- 不会因为模块问题导致应用崩溃

## 集成示例

在现有的聊天工具中使用：

```typescript
// src/views/chat/utils/utils.ts
import { matchPinyinSync, preloadPinyinPro } from "@/utils/pinyin"

// 预加载模块
export function initPinyinUtils() {
  preloadPinyinPro()
}

// 使用新的匹配函数
export function searchByPinyin(options: { searchStr: string; list: GroupMember[] }) {
  // ... 其他逻辑
  const nickPinyin = matchPinyinSync(item.nick || "", searchStr) || []
  // ... 其他逻辑
}
```

## 注意事项

1. 首次使用异步函数时可能会有短暂的加载延迟
2. 建议在应用启动时调用 `preloadPinyinPro()` 预加载模块
3. 兜底方案的匹配精度可能不如 `pinyin-pro` 模块
4. 所有函数都是纯函数，不会产生副作用
