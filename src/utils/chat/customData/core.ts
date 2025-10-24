import { isEmpty } from "lodash-es"
import { DB_Message } from "@/database/schemas/message"
import { messageUtils } from "@/utils/messageUtils"

export type CustomDataType = "webSearch" | "deepThinking" | "messageReply" | "messagePrompt"

import type { WebSearchParams, DeepThinkingParams, PromptMessageParams } from "./types"

export function getCloudCustomDataTyped(data: DB_Message, type: CustomDataType, params?: any): string {
  if (isEmpty(data)) return ""

  const baseData = {
    messageAbstract: messageUtils.getMessageDisplayText(data) || data?.payload?.text || "",
    version: __APP_INFO__.pkg.version || "",
  }

  let customData = {}

  switch (type) {
    case "webSearch":
      customData = {
        webSearch: {
          ...baseData,
          webSearchResult: (params as WebSearchParams)?.webSearchResult,
        },
      }
      break

    case "deepThinking":
      customData = {
        deepThinking: {
          ...baseData,
          thinking: (params as DeepThinkingParams)?.thinking || "思考中...",
          deeplyThought: (params as DeepThinkingParams)?.deeplyThought || "已深度思考",
        },
      }
      break

    case "messageReply":
      customData = {
        messageReply: {
          ...baseData,
          messageID: data.ID,
          messageSender: data.nick,
        },
      }
      break

    case "messagePrompt":
      customData = {
        messagePrompt: {
          ...baseData,
          recQuestion: (params as PromptMessageParams)?.recQuestion || [],
        },
      }
      break

    default:
      throw new Error(`不支持的自定义数据类型: ${type as string}`)
  }

  return JSON.stringify(customData)
}
