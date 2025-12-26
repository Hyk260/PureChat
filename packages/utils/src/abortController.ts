// 存储中断函数的映射表
// 键: 唯一标识id (用于分组管理中断函数)
// 值: 中断函数数组 (每个函数用于中断特定的异步操作)
export const abortMap = new Map<string, (() => void)[]>()

/**
 * 为指定id添加中断回调函数
 * 用于将多个中断函数关联到同一个id，便于批量管理
 * @param id 唯一标识，用于分组中断函数
 * @param abortFn 中断回调函数，执行时会中断对应的异步操作
 */
export const addAbortController = (id: string, abortFn: () => void) => {
  abortMap.set(id, [...(abortMap.get(id) || []), abortFn])
}

/**
 * 从指定id中移除中断回调函数
 * 支持移除单个函数或清空整个id的所有函数
 * @param id 唯一标识，对应需要操作的中断函数组
 * @param abortFn 可选，要移除的特定中断函数；若不提供，则删除整个id对应的函数组
 */
export const removeAbortController = (id: string, abortFn?: () => void) => {
  const callbackArr = abortMap.get(id)
  if (abortFn && callbackArr) {
    const index = callbackArr.indexOf(abortFn)
    if (index !== -1) {
      callbackArr.splice(index, 1)
    }
    // 如果移除后数组为空，则删除整个id对应的函数组
    if (callbackArr.length === 0) {
      abortMap.delete(id)
    }
  } else {
    abortMap.delete(id)
  }
}

/**
 * 执行指定id下的所有中断函数并移除它们
 * 用于触发某一组异步操作的中断逻辑
 * @param id 唯一标识，对应需要中断的函数组
 */
export const abortCompletion = (id: string) => {
  const abortFns = abortMap.get(id)
  if (abortFns?.length) {
    for (const fn of [...abortFns]) {
      fn()
      removeAbortController(id, fn)
    }
  }
}

export function createAbortPromise(signal: AbortSignal, finallyPromise: Promise<string>) {
  return new Promise<string>((_, reject) => {
    if (signal.aborted) {
      reject(new DOMException("Operation aborted", "AbortError"))
      return
    }

    const abortHandler = (e: Event) => {
      console.debug("abortHandler", e)
      reject(new DOMException("Operation aborted", "AbortError"))
    }

    signal.addEventListener("abort", abortHandler, { once: true })

    finallyPromise.finally(() => {
      signal.removeEventListener("abort", abortHandler)
    })
  })
}
