# useState Hook

这是一个受 React 启发的 Vue 3 状态管理 Hook，提供了类型安全和直观的 API。

## 特性

- 🚀 **类型安全**: 完整的 TypeScript 支持
- 🔄 **响应式**: 基于 Vue 3 的 `ref` 系统
- 🎯 **直观 API**: 类似 React 的 `useState` 语法
- ⚡ **高性能**: 支持函数式更新，避免不必要的重新计算
- 📚 **完整文档**: 详细的 JSDoc 注释和示例

## 安装

```bash
# 确保你的项目使用 Vue 3 和 TypeScript
npm install vue@^3.0.0
npm install -D typescript
```

## 基本用法

### 导入

```typescript
import { useState } from '@/hooks/useState';
```

### 基本状态管理

```typescript
// 数字状态
const [count, setCount] = useState(0);

// 布尔状态
const [loading, setLoading] = useState(false);

// 字符串状态
const [name, setName] = useState('');

// 对象状态
const [user, setUser] = useState({ name: 'John', age: 25 });

// 数组状态
const [items, setItems] = useState<string[]>([]);
```

### 使用泛型明确类型

```typescript
// 明确指定类型
const [loading, setLoading] = useState<boolean>(false);
const [user, setUser] = useState<User | null>(null);
const [items, setItems] = useState<string[]>([]);
```

### 函数式初始化

```typescript
// 使用函数进行昂贵的初始化
const [expensive, setExpensive] = useState(() => {
  // 这里可以进行复杂的计算
  return computeExpensiveValue();
});
```

### 函数式更新

```typescript
// 基于之前的状态进行更新
setCount(prev => prev + 1);
setUser(prev => ({ ...prev, age: prev.age + 1 }));
setItems(prev => [...prev, 'new item']);
```

## 类型定义

```typescript
// 核心类型
type SetStateAction<S> = S | ((prevState: S) => S);
type Dispatch<A> = (value: A) => void;
type UseStateReturn<T> = [Ref<T>, Dispatch<SetStateAction<T>>];

// Hook 函数签名
function useState<T>(
  initial: T | (() => T)
): UseStateReturn<T>
```

## 完整示例

```vue
<template>
  <div>
    <h2>计数器: {{ count }}</h2>
    <button @click="increment">增加</button>
    <button @click="decrement">减少</button>
    <button @click="reset">重置</button>
    
    <div v-if="loading">加载中...</div>
    <div v-else>
      <h3>用户信息</h3>
      <p>姓名: {{ user.name }}</p>
      <p>年龄: {{ user.age }}</p>
      <button @click="updateAge">增加年龄</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useState } from '@/hooks/useState';

interface User {
  name: string;
  age: number;
}

// 状态管理
const [count, setCount] = useState(0);
const [loading, setLoading] = useState(false);
const [user, setUser] = useState<User>({ name: 'John', age: 25 });

// 方法
const increment = () => setCount(prev => prev + 1);
const decrement = () => setCount(prev => prev - 1);
const reset = () => setCount(0);

const updateAge = () => {
  setUser(prev => ({ ...prev, age: prev.age + 1 }));
};

// 模拟异步操作
const fetchUser = async () => {
  setLoading(true);
  try {
    // 模拟 API 调用
    await new Promise(resolve => setTimeout(resolve, 1000));
    setUser({ name: 'Jane', age: 30 });
  } finally {
    setLoading(false);
  }
};

// 组件挂载时获取用户数据
onMounted(() => {
  fetchUser();
});
</script>
```

## 与 React useState 的区别

| 特性 | React useState | Vue useState |
|------|----------------|--------------|
| 返回值 | `[state, setState]` | `[ref, setState]` |
| 状态访问 | `state` | `state.value` |
| 响应式 | 需要重新渲染 | 自动响应式更新 |
| 类型支持 | 完整 TypeScript | 完整 TypeScript |

## 最佳实践

1. **使用泛型**: 当类型推断不够明确时，使用泛型参数
2. **函数式更新**: 当新状态依赖于旧状态时，使用函数式更新
3. **避免对象突变**: 总是创建新的对象/数组，而不是修改现有的
4. **合理初始化**: 对于昂贵的计算，使用函数式初始化

## 注意事项

- 状态访问需要使用 `.value` 属性
- 在模板中，Vue 会自动解包 `ref`，所以不需要 `.value`
- 函数式更新是异步的，确保在更新后立即访问状态

## 测试

运行测试以确保 Hook 正常工作：

```bash
npm run test
```

## 许可证

MIT License
