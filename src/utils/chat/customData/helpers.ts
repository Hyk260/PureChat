import { getCloudCustomDataTyped } from "./core"

import { DB_Message } from "@/database/schemas/message"

/**
 * Web 搜索自定义数据生成器
 */
export function createWebSearchCustomData(data: DB_Message, webSearchResult?: any): string {
  return getCloudCustomDataTyped(data, "webSearch", { webSearchResult })
}

/**
 * 深度思考自定义数据生成器
 */
export function createDeepThinkingCustomData(data: DB_Message, thinking?: string, deeplyThought?: string): string {
  return getCloudCustomDataTyped(data, "deepThinking", {
    thinking: thinking,
    deeplyThought: deeplyThought,
  })
}

/**
 * 回复消息自定义数据生成器
 */
export function createReplyMessageCustomData(data: DB_Message): string {
  return getCloudCustomDataTyped(data, "messageReply")
}

/**
 * ai助手推荐问消息自定义数据生成器
 */
export function createPromptMessageCustomData(data: DB_Message, recQuestion?: string[]): string {
  return getCloudCustomDataTyped(data, "messagePrompt", { recQuestion: recQuestion || [] })
}
