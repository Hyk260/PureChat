import { cloneDeep } from "lodash-es"

import { useChatStore } from "@/stores"
import emitter from "@/utils/mitt-bus"
import { matchPinyinSync } from "@/utils/pinyin"

import type { GroupMember } from "@/stores/modules/group/type"

/**
 * 根据拼音搜索当前成员列表中的匹配项。
 */
export function searchByPinyin(options: { searchStr: string; list: GroupMember[] }) {
  const { searchStr, list } = options
  if (!searchStr) {
    console.warn("searchStr is null")
    return "empty"
  }
  // 如果过滤后的列表为空，触发空结果的事件并返回
  if (!list || list.length === 0) {
    emitter.emit("setMentionModal", { type: "empty" })
    return "empty"
  }
  const memberList = cloneDeep(list)
  // 存储匹配项的索引
  const indices: GroupMember[] = []
  // 遍历过滤后的成员列表
  memberList.forEach((item) => {
    // 使用动态导入的拼音匹配函数进行匹配
    const nickPinyin = matchPinyinSync(item.nick || "", searchStr) || []
    // 如果拼音匹配结果长度大于 0，将当前项添加到索引数组中
    if (nickPinyin?.length > 0) {
      indices.push(item)
    }
  })
  // 触发相应的事件根据匹配结果触发不同的操作
  const eventType = indices.length === 0 ? "empty" : "success"

  emitter.emit("setMentionModal", {
    content: indices,
    type: eventType,
    searchlength: searchStr.length + 1, // +1 包含@长度
  })

  return eventType
}

/**
 * 根据输入的字符串过滤提及列表并触发相关操作。
 */
export function filterMentionList(options: { str: string; list: GroupMember[] }) {
  const { str, list } = options
  const inputStr = str
  // 如果输入字符串为空 且没有 "@" 符号，关闭提及模态框并返回
  if (inputStr === "" || inputStr.lastIndexOf("@") === -1) {
    useChatStore().$patch({ isMentionModalVisible: false })
    return
  }
  // 如果输入字符串仅包含 "@" 符号，或则字符结尾，触发 setMentionModal 操作并返回
  if (inputStr === "@" && inputStr.endsWith("@")) {
    return "all"
  }
  emitter.emit("setMentionModal", { type: "updata" })
  // 获取最后一个 "@" 符号的索引位置
  const lastAtIndex = inputStr.lastIndexOf("@")
  // 如果找不到 "@" 符号，关闭提及模态框并返回
  if (lastAtIndex === -1) {
    useChatStore().$patch({ isMentionModalVisible: false })
    return
  }
  const text = inputStr.substring(lastAtIndex)
  const searchStr = text.substring(1)
  if (!searchStr) return
  // 执行根据拼音搜索的操作
  return searchByPinyin({ searchStr, list })
}
