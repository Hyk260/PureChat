import type { GroupMemberType as GroupMember } from "@pure/database/schemas"

import { matchPinyin } from "./pinyin"

/**
 * 提及弹窗回调接口，统一管理弹窗的关闭、状态更新与搜索结果展示行为。
 */
export interface MentionModalCallbacks {
  /** 关闭提及弹窗 */
  onCloseModal?: () => void
  /** 通知弹窗进入搜索更新状态（开始进行成员搜索时触发） */
  onUpdateModal?: () => void
  /** 搜索结果回调：content 为匹配成员列表，type 为 "success" 或 "empty"，searchLength 为搜索关键词长度+1（含 @ 符号） */
  onSearchResult?: (data: { content: GroupMember[]; type: "empty" | "success"; searchLength: number }) => void
}

/**
 * 根据拼音在当前成员列表中执行匹配搜索。
 *
 * @param options.searchStr - 拼音搜索关键词
 * @param options.list - 群组可提及成员列表
 * @returns resultType 为 "empty" | "success"；matchedMembers 为匹配到的成员数组
 */
export async function searchPinyin(options: { searchStr: string; list: GroupMember[] }) {
  const { searchStr, list } = options

  if (!searchStr || !list?.length) {
    if (!searchStr) {
      console.warn("[searchPinyin] searchStr 为空")
    }
    return { resultType: "empty" as const, matchedMembers: [] as GroupMember[] }
  }

  const results = await Promise.all(
    list.map(async (member) => {
      const pinyinMatches = await matchPinyin(member.nick || "", searchStr)
      return pinyinMatches?.length > 0 ? member : null
    })
  )

  const matchedMembers = results.filter((m): m is GroupMember => m !== null)

  return {
    resultType: matchedMembers.length > 0 ? "success" : "empty",
    matchedMembers,
  }
}

/**
 * 从输入文本中截取最后一个 "@" 符号之后的内容，并去除 "@" 前缀，
 * 返回实际用于拼音搜索的关键词。
 *
 * @param inputText - 编辑器原始文本
 * @returns "@" 之后的搜索关键词；若文本中无 "@" 符号则返回空字符串
 */
function extractMentionSearchText(inputText: string): string {
  const lastAtIndex = inputText.lastIndexOf("@")
  if (lastAtIndex === -1) return ""

  return inputText.substring(lastAtIndex + 1)
}

/**
 * 处理编辑器输入文本，协调提及弹窗的打开、关闭与拼音搜索结果展示。
 *
 * @param options.str - 编辑器当前文本内容
 * @param options.list - 群组可提及成员列表
 * @param options.callbacks - 弹窗行为回调（onCloseModal / onSearchResult）
 */
export async function handleMentionInput(options: {
  str: string
  list: GroupMember[]
  callbacks?: MentionModalCallbacks
}) {
  const { str: inputText, list: memberList, callbacks } = options

  // 无输入或无 @ 符号时关闭弹窗
  if (!inputText?.includes("@")) {
    tryCall(callbacks?.onCloseModal)
    return
  }

  const searchKeyword = extractMentionSearchText(inputText)
  // 仅输入 @ 或 @ 后无有效关键词时，不触发搜索
  if (!searchKeyword) return

  const { resultType, matchedMembers } = await searchPinyin({ searchStr: searchKeyword, list: memberList })

  if (resultType === "empty") {
    callbacks?.onSearchResult?.({ content: [], type: "empty", searchLength: 0 })
  } else {
    callbacks?.onSearchResult?.({
      content: matchedMembers,
      type: "success",
      searchLength: searchKeyword.length + 1,
    })
  }
}

/** 安全调用可选回调函数，捕获异常并输出日志 */
function tryCall(fn?: () => void, context?: string): void {
  if (!fn) return
  try {
    fn()
  } catch (error) {
    console.error(`[mentionInput]${context ? ` ${context}` : ""} 回调执行失败:`, error)
  }
}
