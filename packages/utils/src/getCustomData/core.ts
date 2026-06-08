
import { getAbstractContent } from "../chat"

import type { DeepThinkingParams } from "./types"
import type { DB_Message } from "@pure/database/schemas"

/** 提取消息摘要的公共数据 */
const getBaseData = (data: Partial<DB_Message>) => ({
  messageAbstract: getAbstractContent(data),
})

/**
 * Web 搜索自定义数据生成器
 */
export function createWebSearchCustomData(data: Partial<DB_Message>, webSearchResult?: unknown): string {
  return JSON.stringify({
    webSearch: {
      ...getBaseData(data),
      webSearchResult,
    },
  })
}

/**
 * 深度思考自定义数据生成器
 */
export function createThinkingCustomData(data: Partial<DB_Message>, reasoning?: DeepThinkingParams): string {
  return JSON.stringify({
    thinking: {
      content: reasoning?.content,
      reasoningType: reasoning?.reasoningType,
      duration: reasoning?.duration,
    },
  })
}

/**
 * 回复消息自定义数据生成器
 */
export function createReplyMessageCustomData(data: Partial<DB_Message>): string {
  return JSON.stringify({
    messageReply: {
      ...getBaseData(data),
      messageID: data.ID,
      messageSender: data.nick,
    },
  })
}

/**
 * AI 助手推荐问消息自定义数据生成器
 */
export function createPromptMessageCustomData(data: Partial<DB_Message>, recQuestion?: string[]): string {
  return JSON.stringify({
    messagePrompt: {
      ...getBaseData(data),
      recQuestion: recQuestion ?? [],
    },
  })
}
