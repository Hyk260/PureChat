import { ChatResponse } from "ollama/browser"
import { nanoid } from "@pure/utils"

import { createCallbacksTransformer, createSSEProtocolTransformer } from "./protocol"

import type { StreamProtocolChunk, StreamContext, ChatStreamCallbacks } from "@pure/types"

export const transformOllamaStream = (chunk: ChatResponse, stack: StreamContext): StreamProtocolChunk => {
  if (chunk.done && !chunk.message.content) {
    return { data: "finished", id: stack.id, type: "stop" }
  }

  if (chunk.message.thinking) {
    return { data: chunk.message.thinking, id: stack.id, type: "reasoning" }
  }

  // 判断是否有 <think> 或 </think> 标签，更新 thinkingInContent 状态
  if (chunk.message.content.includes("<think>")) {
    stack.thinkingInContent = true
  } else if (chunk.message.content.includes("</think>")) {
    stack.thinkingInContent = false
  }

  // 清除 <think> 及 </think> 标签，并根据当前思考模式确定返回类型
  return {
    data: chunk.message.content.replaceAll(/<\/?think>/g, ""),
    id: stack.id,
    type: stack?.thinkingInContent ? "reasoning" : "text",
  }
}

export const OllamaStream = (response: ReadableStream<ChatResponse>, callback?: ChatStreamCallbacks): ReadableStream<string> => {
  const streamStack = { id: `chat_${nanoid()}` }

  return response
    .pipeThrough(createSSEProtocolTransformer(transformOllamaStream, streamStack))
    .pipeThrough(createCallbacksTransformer(callback))
}
