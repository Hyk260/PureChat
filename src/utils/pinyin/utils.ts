import { cloneDeep } from "lodash-es"

import { match } from "pinyin-pro"

import type { GroupMemberType as GroupMember } from "@pure/database/schemas"

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
 * 根据拼音搜索当前成员列表中的匹配项，通过回调函数通知调用方搜索结果。
 *
 * @param options.searchStr - 拼音搜索关键词
 * @param options.list - 群组可提及成员列表
 * @param options.callbacks - 搜索结果回调
 * @returns "empty" 表示无结果或列表为空；"success" 表示有匹配结果
 */
export function searchPinyin(options: { searchStr: string; list: GroupMember[] }) {
  const { searchStr, list } = options

  if (!searchStr) {
    console.warn("[searchByPinyin] searchStr 为空")
    return {
      resultType: "empty",
      matchedMembers: [],
    }
  }

  // 成员列表为空时，通知调用方展示空状态
  if (!list || list.length === 0) {
    return {
      resultType: "empty",
      matchedMembers: [],
    }
  }

  const clonedList = cloneDeep(list)
  // 存储拼音匹配到的成员
  const matchedMembers: GroupMember[] = []

  clonedList.forEach((member) => {
    const pinyinMatches = match(member.nick || "", searchStr) || []
    if (pinyinMatches.length > 0) {
      matchedMembers.push(member)
    }
  })

  // 根据匹配结果数量决定结果类型
  const resultType: "empty" | "success" = matchedMembers.length === 0 ? "empty" : "success"

  return {
    resultType,
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

  const textAfterAt = inputText.substring(lastAtIndex)
  // 截掉开头的 "@" 符号，得到纯搜索文本
  return textAfterAt.substring(1)
}

/**
 * 处理编辑器输入文本，协调提及弹窗的打开、关闭与拼音搜索结果展示。
 *
 * 职责：
 * 1. 判断是否应关闭弹窗（无输入 / 无 "@"）
 * 2. 输入仅为 "@" 时不触发搜索（保持弹窗打开以便展示全部成员）
 * 3. 输入含 "@" + 关键词时，调用拼音搜索并通过 onSearchResult 回调通知调用方
 *
 * @param options.str - 编辑器当前文本内容
 * @param options.list - 群组可提及成员列表
 * @param options.callbacks - 弹窗行为回调（onCloseModal / onSearchResult）
 * @returns 无返回值（通过 callbacks 通知调用方），或 void
 */
export function handleMentionInput(options: { str: string; list: GroupMember[]; callbacks?: MentionModalCallbacks }) {
  const { str: inputText, list: memberList, callbacks } = options

  const closeModal = () => {
    try {
      callbacks?.onCloseModal?.()
    } catch (error) {
      console.error("[handleMentionInput] onCloseModal 回调执行失败:", error)
    }
  }

  if (inputText === "" || !inputText.includes("@")) {
    closeModal()
    return
  }

  const searchKeyword = extractMentionSearchText(inputText)
  if (!searchKeyword) return

  const resultType = searchPinyin({ searchStr: searchKeyword, list: memberList })

  if (resultType.resultType === "empty") callbacks?.onSearchResult?.({ content: [], type: "empty", searchLength: 0 })

  if (resultType.resultType === "success") {
    callbacks?.onSearchResult?.({
      content: resultType.matchedMembers,
      type: "success",
      searchLength: searchKeyword.length + 1,
    })
  }
}
