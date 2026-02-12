import { ref } from "vue"

import type { Ref } from "vue"

export type SetStateAction<S> = S | ((prevState: S) => S)
export type Dispatch<A> = (value: A) => void
export type UseStateReturn<T> = [Ref<T>, Dispatch<SetStateAction<T>>]

/**
 * 自定义 Hook，用于在 Vue 3 中管理组件状态，类似于 React 的 useState。
 *
 * @template T - 状态的类型
 * @param initial - 初始状态值或返回初始状态的函数
 * @returns 返回一个元组，包含状态引用和设置状态的函数
 *
 * @example
 * ```typescript
 * // 基本用法
 * const [count, setCount] = useState(0);
 *
 * // 使用泛型明确类型
 * const [loading, setLoading] = useState<boolean>(false);
 *
 * // 使用函数初始化
 * const [user, setUser] = useState(() => ({ name: 'John', age: 25 }));
 *
 * // 函数式更新
 * setCount(prev => prev + 1);
 * ```
 */
export function useState<T>(initial: T | (() => T)): UseStateReturn<T> {
  const state = ref<T>(typeof initial === "function" ? (initial as () => T)() : initial) as Ref<T>

  const setState: Dispatch<SetStateAction<T>> = (newValue: SetStateAction<T>): void => {
    if (typeof newValue === "function") {
      state.value = (newValue as (prev: T) => T)(state.value)
    } else {
      state.value = newValue
    }
  }

  return [state, setState]
}
