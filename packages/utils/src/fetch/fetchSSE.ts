// import OpenAI from "openai"
import { MESSAGE_CANCEL_FLAT } from "@pure/const"
import {
  ChatErrorType,
  ChatImageChunk,
  ChatMessageError,
  ModelReasoning,
  ModelUsage,
  ModelPerformance,
  ResponseAnimation,
  ResponseAnimationStyle,
} from "@pure/types"

import { fetchEventSource } from "../fetchEventSource"
import { getMessageError } from "./parseError"
import { nanoid } from "../uuid"

type SSEFinishType = "done" | "error" | "abort"

export interface contextParams {
  images?: ChatImageChunk[]
  reasoning?: ModelReasoning
  usage?: ModelUsage
  speed?: ModelPerformance
  type?: SSEFinishType
}

export type OnFinishHandler = (text: string, context?: contextParams) => Promise<void>

export interface MessageUsageChunk {
  type: "usage"
  usage: ModelUsage
}

export interface MessageTextChunk {
  text: string
  type: "text"
}

export interface MessageSpeedChunk {
  speed: ModelPerformance
  type: "speed"
}

export interface MessageBase64ImageChunk {
  id: string
  image: ChatImageChunk
  images: ChatImageChunk[]
  type: "base64_image"
}

export interface MessageReasoningChunk {
  signature?: string
  text?: string
  type: "reasoning"
}

export interface FetchSSEOptions {
  fetcher?: typeof fetch
  onAbort?: (text: string) => void
  onClose?: () => void
  onOpenHandle?: (response: Response) => void
  onErrorHandle?: (error: ChatMessageError) => void
  onFinish?: OnFinishHandler
  onMessageHandle?: (
    chunk: MessageTextChunk | MessageUsageChunk | MessageReasoningChunk | MessageBase64ImageChunk | MessageSpeedChunk
  ) => void
  responseAnimation?: ResponseAnimation
}

export interface FetchOptions extends FetchSSEOptions {
  historySummary?: string
  isWelcomeQuestion?: boolean
  signal?: AbortSignal | undefined
}

const START_ANIMATION_SPEED = 10 // 默认起始速度

const createSmoothMessage = (params: { onTextUpdate: (delta: string, text: string) => void; startSpeed?: number }) => {
  const { startSpeed = START_ANIMATION_SPEED } = params

  let buffer = ""
  const outputQueue: string[] = []
  let isAnimationActive = false
  let animationFrameId: number | null = null
  let lastFrameTime = 0
  let accumulatedTime = 0
  let currentSpeed = startSpeed || 200
  let lastQueueLength = 0 // 记录上一帧的队列长度

  const stopAnimation = () => {
    isAnimationActive = false
    if (animationFrameId !== null) {
      cancelAnimationFrame(animationFrameId)
      animationFrameId = null
    }
  }

  const startAnimation = (speed = startSpeed) => {
    return new Promise<void>((resolve) => {
      if (isAnimationActive) {
        resolve()
        return
      }

      isAnimationActive = true
      lastFrameTime = performance.now()
      accumulatedTime = 0
      currentSpeed = speed
      lastQueueLength = 0 // 重置上一帧队列长度

      const updateText = (timestamp: number) => {
        if (!isAnimationActive) {
          if (animationFrameId !== null) {
            cancelAnimationFrame(animationFrameId)
          }
          resolve()
          return
        }

        const frameDuration = timestamp - lastFrameTime
        lastFrameTime = timestamp
        accumulatedTime += frameDuration

        let charsToProcess = 0
        if (outputQueue.length > 0) {
          // 更平滑的速度调整
          const targetSpeed = Math.max(speed, outputQueue.length)
          // 根据队列长度变化调整速度变化率
          const speedChangeRate = Math.abs(outputQueue.length - lastQueueLength) * 0.0008 + 0.005
          currentSpeed += (targetSpeed - currentSpeed) * speedChangeRate

          charsToProcess = Math.floor((accumulatedTime * currentSpeed) / 1000)
        }

        if (charsToProcess > 0) {
          accumulatedTime -= (charsToProcess * 1000) / currentSpeed

          const actualChars = Math.min(charsToProcess, outputQueue.length)

          const charsToAdd = outputQueue.splice(0, actualChars).join("")
          buffer += charsToAdd
          params.onTextUpdate(charsToAdd, buffer)
        }

        lastQueueLength = outputQueue.length // 更新上一帧的队列长度

        if (outputQueue.length > 0 && isAnimationActive) {
          animationFrameId = requestAnimationFrame(updateText)
        } else {
          isAnimationActive = false
          animationFrameId = null
          resolve()
        }
      }

      animationFrameId = requestAnimationFrame(updateText)
    })
  }

  const pushToQueue = (text: string) => {
    outputQueue.push(...text.split(""))
  }

  return {
    isAnimationActive,
    isTokenRemain: () => outputQueue.length > 0,
    pushToQueue,
    startAnimation,
    stopAnimation,
  }
}

export const standardizeAnimationStyle = (
  animationStyle?: ResponseAnimation
): Exclude<ResponseAnimation, ResponseAnimationStyle> => {
  return typeof animationStyle === "object" ? animationStyle : { text: animationStyle }
}

export const fetchSSE = async (url: string, options: RequestInit & FetchSSEOptions = {}) => {
  let triggerOnMessageHandler = false

  let finishedType: SSEFinishType = "done"
  let response!: Response

  const { text, speed: smoothingSpeed } = standardizeAnimationStyle(options.responseAnimation ?? {})
  const shouldSkipTextProcessing = text === "none"
  /**
   * 平滑效果
   */
  const textSmoothing = text === "smooth"

  console.log("standardizeAnimation:", text)

  let textBuffer = ""
  let bufferTimer: ReturnType<typeof setTimeout> | null = null
  const BUFFER_INTERVAL = 100 // 300ms

  const flushTextBuffer = () => {
    if (textBuffer) {
      options.onMessageHandle?.({ text: textBuffer, type: "text" })
      textBuffer = ""
    }
  }

  let output = ""
  // 文本控制器，用于平滑输出文本
  const textController = createSmoothMessage({
    onTextUpdate: (delta, text) => {
      output = text
      options.onMessageHandle?.({ text: delta, type: "text" })
    },
    startSpeed: smoothingSpeed,
  })

  let thinking = ""
  let thinkingSignature: string | undefined
  // 思考控制器，用于平滑输出思考
  const thinkingController = createSmoothMessage({
    onTextUpdate: (delta, text) => {
      thinking = text
      options.onMessageHandle?.({ text: delta, type: "reasoning" })
    },
    startSpeed: smoothingSpeed,
  })

  let thinkingBuffer = ""
  let thinkingBufferTimer: ReturnType<typeof setTimeout> | null = null

  const flushThinkingBuffer = () => {
    if (thinkingBuffer) {
      options.onMessageHandle?.({ text: thinkingBuffer, type: "reasoning" })
      thinkingBuffer = ""
    }
  }

  let usage: ModelUsage | undefined = undefined
  let speed: ModelPerformance | undefined = undefined
  let images: ChatImageChunk[] = []

  await fetchEventSource(url, {
    body: options.body,
    fetch: options?.fetcher,
    headers: options.headers as Record<string, string>,
    method: options.method,
    onerror: (error) => {
      console.warn("onerror:", error)
      if (error === MESSAGE_CANCEL_FLAT || (error as TypeError).name === "AbortError") {
        finishedType = "abort"
        options?.onAbort?.(output)
        textController.stopAnimation()
      } else {
        finishedType = "error"

        const chatError = {
          body: {
            message: error.message,
            name: error.name,
            stack: error.stack,
          },
          message: error.message,
          type: ChatErrorType.UnknownChatFetchError,
        }

        options.onErrorHandle?.(error.type ? error : chatError)
        return
      }
    },
    onmessage: (ev) => {
      triggerOnMessageHandler = true
      let data: any
      try {
        data = JSON.parse(ev.data)
      } catch (e) {
        console.warn("parse error:", e)
        options.onErrorHandle?.({
          body: {
            context: {
              chunk: ev.data,
              error: { message: (e as Error).message, name: (e as Error).name },
            },
            message: "chat response streaming chunk parse error, please contact your API Provider to fix it.",
          },
          message: "parse error",
          type: "StreamChunkError",
        })

        return
      }
      console.log("onmessage: [ev]", ev)
      switch (ev.event) {
        case "text": {
          if (!data) break

          if (shouldSkipTextProcessing) {
            output += data
            options.onMessageHandle?.({ text: data, type: "text" })
          } else if (textSmoothing) {
            textController.pushToQueue(data)

            if (!textController.isAnimationActive) textController.startAnimation()
          } else {
            output += data

            textBuffer += data

            if (!bufferTimer) {
              bufferTimer = setTimeout(() => {
                flushTextBuffer()
                bufferTimer = null
              }, BUFFER_INTERVAL)
            }
          }

          break
        }

        case "reasoning": {
          if (shouldSkipTextProcessing) {
            thinking += data
            options.onMessageHandle?.({ text: data, type: "reasoning" })
          } else if (textSmoothing) {
            thinkingController.pushToQueue(data)

            if (!thinkingController.isAnimationActive) thinkingController.startAnimation()
          } else {
            thinking += data

            thinkingBuffer += data

            if (!thinkingBufferTimer) {
              thinkingBufferTimer = setTimeout(() => {
                flushThinkingBuffer()
                thinkingBufferTimer = null
              }, BUFFER_INTERVAL)
            }
          }

          break
        }

        case "usage": {
          usage = data
          options.onMessageHandle?.({ type: "usage", usage: data })
          break
        }

        case "reasoning_signature": {
          thinkingSignature = data
          break
        }

        case "base64_image": {
          const id = "tmp_img_" + nanoid()
          const item = { data, id, isBase64: true }
          images.push(item)

          options.onMessageHandle?.({ id, image: item, images, type: "base64_image" })
          break
        }
        // 速度
        case "speed": {
          speed = data
          options.onMessageHandle?.({ speed: data, type: "speed" })
          break
        }

        case "error": {
          finishedType = "error"
          options.onErrorHandle?.(data)
          break
        }
      }
    },
    onopen: async (res) => {
      options.onOpenHandle?.(res)
      response = res.clone()
      // 如果不 ok 说明有请求错误
      if (!response.ok) {
        throw await getMessageError(res)
      }
    },
    signal: options.signal,
  })
  // 仅在response可用时调用onFinish
  // 因此像abort这样的情况，不需要调用onFinish
  if (response) {
    textController.stopAnimation()

    if (bufferTimer) {
      clearTimeout(bufferTimer)
      flushTextBuffer()
    }

    if (thinkingBufferTimer) {
      clearTimeout(thinkingBufferTimer)
      flushThinkingBuffer()
    }

    if (response.ok) {
      // 如果没有消息处理器，应该先调用onHandleMessage
      if (!triggerOnMessageHandler) {
        output = await response.clone().text()
        options.onMessageHandle?.({ text: output, type: "text" })
      }

      if (textController.isTokenRemain()) {
        await textController.startAnimation(smoothingSpeed)
      }

      await options?.onFinish?.(output, {
        images: images.length > 0 ? images : undefined,
        reasoning: thinking ? { content: thinking, signature: thinkingSignature } : undefined,
        type: finishedType,
        speed,
        usage,
      })
    }
  }

  return response
}
