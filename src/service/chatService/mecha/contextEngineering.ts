import { transformContent } from "@pure/utils"
import type { OpenAIChatMessage } from "@pure/types"
import { DB_Message } from "@pure/database/schemas"

import { useRobotStore } from "@/stores"

const getPromptStore = () => {
  try {
    const prompts = useRobotStore().currentProviderPrompt?.prompt
    const validPrompts = prompts?.filter((t) => t.content) || []
    return validPrompts
  } catch (error) {
    console.error("获取提示词失败:", error)
    return []
  }
}

const processPromptMessages = (messages: OpenAIChatMessage[], params: any) => {
  let combinedMessages: OpenAIChatMessage[] = []
  const validPrompts = getPromptStore()
  const historyCount = Math.max(Number(params.historyCount) || 0, 0)
  const recentMessages = messages.slice(-historyCount)

  if (validPrompts.length > 0) {
    combinedMessages = [...validPrompts, ...recentMessages] // prompt
  } else {
    combinedMessages = recentMessages // 上下文
  }

  return combinedMessages
}

interface ContextEngineeringContext {
  groupId?: string
  historyCount?: number
  historySummary?: string
  messages: DB_Message[] | OpenAIChatMessage[]
  model: string
  /** Agent's enabled plugin/tool/skill identifiers (from agentConfig.plugins) */
  plugins?: string[]
  provider: string
  sessionId?: string
  systemRole?: string
  tools?: string[]
  /** Topic ID for plan/todo context injection */
  topicId?: string
}
export const contextEngineering = async ({
  messages: originalMessages,
  model,
  provider,
  historyCount,
}: ContextEngineeringContext): Promise<OpenAIChatMessage[]> => {
  const messages = await transformContent(originalMessages as DB_Message[])

  const combinedMessages = processPromptMessages(messages, { historyCount })

  return combinedMessages
}
