/**
 * 拼音工具使用示例
 * 展示如何使用动态导入的 pinyin-pro 功能
 */

import { matchPinyin, matchPinyinSync, preloadPinyinPro, getPinyinProStatus } from "@/utils/pinyin"

// 示例1: 异步使用（推荐）
export async function exampleAsyncUsage() {
  const text = "张三"
  const searchStr = "zs"

  try {
    const result = await matchPinyin(text, searchStr)
    console.log("异步匹配结果:", result)
    return result
  } catch (error) {
    console.error("拼音匹配失败:", error)
    return []
  }
}

// 示例2: 同步使用（使用缓存）
export function exampleSyncUsage() {
  const text = "李四"
  const searchStr = "ls"

  const result = matchPinyinSync(text, searchStr)
  console.log("同步匹配结果:", result)
  return result
}

// 示例3: 预加载模块
export async function examplePreload() {
  console.log("预加载前的状态:", getPinyinProStatus())

  await preloadPinyinPro()

  console.log("预加载后的状态:", getPinyinProStatus())
}

// 示例4: 批量匹配
export async function exampleBatchMatch() {
  const names = ["张三", "李四", "王五", "赵六"]
  const searchStr = "z"

  const results = await Promise.all(names.map((name) => matchPinyin(name, searchStr)))

  console.log("批量匹配结果:", results)
  return results
}

// 示例5: 检查模块状态
export function exampleCheckStatus() {
  const status = getPinyinProStatus()
  console.log("pinyin-pro 模块状态:", status)

  if (status.isLoaded) {
    console.log("模块已加载，可以使用同步函数")
  } else if (status.isLoading) {
    console.log("模块正在加载中...")
  } else {
    console.log("模块未加载，将使用兜底方案")
  }

  return status
}
