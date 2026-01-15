import { getCloudCustomDataTyped } from "./core"

import { DB_Message } from "@pure/database/schemas"

/**
 * Web 搜索自定义数据生成器
 */
export function createWebSearchCustomData(data: Partial<DB_Message>, webSearchResult?: any): string {
  return getCloudCustomDataTyped(data, "webSearch", { webSearchResult })
}

/**
 * 深度思考自定义数据生成器
 */
export function createThinkingCustomData(data: Partial<DB_Message>, reasoning?: any): string {
  return getCloudCustomDataTyped(data, "thinking", reasoning)
}

/**
 * 回复消息自定义数据生成器
 */
export function createReplyMessageCustomData(data: Partial<DB_Message>): string {
  return getCloudCustomDataTyped(data, "messageReply")
}

/**
 * ai助手推荐问消息自定义数据生成器
 */
export function createPromptMessageCustomData(data: Partial<DB_Message>, recQuestion?: string[]): string {
  return getCloudCustomDataTyped(data, "messagePrompt", { recQuestion: recQuestion || [] })
}
