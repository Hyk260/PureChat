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

import { fetchEventSource, nanoid } from "@pure/utils"
import { getMessageError } from "./parseError"

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

export interface MessageStopChunk {
  reason: string
  type: "stop"
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
    chunk:
      | MessageTextChunk
      | MessageUsageChunk
      | MessageReasoningChunk
      | MessageBase64ImageChunk
      | MessageSpeedChunk
      | MessageStopChunk
  ) => void
  responseAnimation?: ResponseAnimation
}

export interface FetchOptions extends FetchSSEOptions {
  historySummary?: string
  isWelcomeQuestion?: boolean
  signal?: AbortSignal | undefined
}

const START_ANIMATION_SPEED = 10 // 默认起始速度
const MAX_TARGET_SPEED = 100 // 自适应速度上限，防止队列突增时动画大幅加速
const MAX_CHARS_PER_FRAME = 5 // 单帧最大消费字符数，防止一次性大量输出

/**
 * 平滑消息控制器。
 * 内部维护 reasoning 和 text 两条独立队列，在单动画循环中强制 reasoning 优先输出，
 * 确保 reasoning 消息完全输出完毕后才开始输出 text 消息
 */
const createSmoothMessage = (params: {
  onReasoningUpdate: (delta: string, fullText: string) => void
  onTextUpdate: (delta: string, fullText: string) => void
  startSpeed?: number
}) => {
  const { startSpeed = START_ANIMATION_SPEED } = params

  const reasoningQueue: string[] = []
  const textQueue: string[] = []
  let reasoningBuffer = ""
  let textBuffer = ""
  let isAnimationActive = false
  let animationFrameId: number | null = null
  let lastFrameTime = 0
  let accumulatedTime = 0
  let currentSpeed = startSpeed
  let lastReasoningQueueLength = 0
  let lastTextQueueLength = 0
  /** 跟踪当前动画 Promise，用于外部 await 等待动画自然完成 */
  let animationPromise: Promise<void> | null = null

  const cleanupAnimation = () => {
    isAnimationActive = false
    animationPromise = null
    if (animationFrameId !== null) {
      cancelAnimationFrame(animationFrameId)
      animationFrameId = null
    }
  }

  /**
   * 强制终止动画（仅用于 abort/error 场景）。
   * stopAnimation 之后已有的 animationPromise 会因为 isAnimationActive=false 而 resolve。
   */
  const stopAnimation = () => {
    isAnimationActive = false
    if (animationFrameId !== null) {
      cancelAnimationFrame(animationFrameId)
      animationFrameId = null
    }
  }

  /** 在当前活跃队列中消费 charsToProcess 个字符；返回该队列是否还有剩余。 */
  const consumeActiveQueue = (charsToProcess: number): boolean => {
    if (reasoningQueue.length > 0) {
      const actual = Math.min(charsToProcess, reasoningQueue.length)
      const chars = reasoningQueue.splice(0, actual).join("")
      reasoningBuffer += chars
      params.onReasoningUpdate(chars, reasoningBuffer)
      return reasoningQueue.length > 0
    }
    if (textQueue.length > 0) {
      const actual = Math.min(charsToProcess, textQueue.length)
      const chars = textQueue.splice(0, actual).join("")
      textBuffer += chars
      params.onTextUpdate(chars, textBuffer)
      return textQueue.length > 0
    }
    return false
  }

  /** 当前活跃队列的长度（reasoning 优先） */
  const activeQueueLength = (): number => {
    if (reasoningQueue.length > 0) return reasoningQueue.length
    return textQueue.length
  }

  /**
   * 启动动画循环。如果动画已在运行，返回已有的 Promise 等待其自然完成；
   * 否则创建新动画并返回 Promise，在队列清空时 resolve。
   */
  const startAnimation = (speed = startSpeed): Promise<void> => {
    if (animationPromise) {
      return animationPromise
    }

    animationPromise = new Promise<void>((resolve) => {
      isAnimationActive = true
      lastFrameTime = performance.now()
      accumulatedTime = 0
      currentSpeed = speed
      lastReasoningQueueLength = 0
      lastTextQueueLength = 0

      const updateText = (timestamp: number) => {
        if (!isAnimationActive) {
          if (animationFrameId !== null) {
            cancelAnimationFrame(animationFrameId)
          }
          animationPromise = null
          animationFrameId = null
          resolve()
          return
        }

        const frameDuration = timestamp - lastFrameTime
        lastFrameTime = timestamp
        accumulatedTime += frameDuration

        let charsToProcess = 0
        const queueLen = activeQueueLength()
        if (queueLen > 0) {
          const targetSpeed = Math.min(Math.max(speed, queueLen), MAX_TARGET_SPEED)
          const activeDelta = Math.abs(
            reasoningQueue.length > 0
              ? reasoningQueue.length - lastReasoningQueueLength
              : textQueue.length - lastTextQueueLength
          )
          const speedChangeRate = activeDelta * 0.0008 + 0.005
          currentSpeed += (targetSpeed - currentSpeed) * speedChangeRate

          charsToProcess = Math.min(Math.floor((accumulatedTime * currentSpeed) / 1000), MAX_CHARS_PER_FRAME)
        }

        if (charsToProcess > 0) {
          accumulatedTime -= (charsToProcess * 1000) / currentSpeed
          consumeActiveQueue(charsToProcess)
        }

        lastReasoningQueueLength = reasoningQueue.length
        lastTextQueueLength = textQueue.length

        if (activeQueueLength() > 0 && isAnimationActive) {
          animationFrameId = requestAnimationFrame(updateText)
        } else {
          cleanupAnimation()
          resolve()
        }
      }

      animationFrameId = requestAnimationFrame(updateText)
    })

    return animationPromise
  }

  const pushReasoning = (text: string) => {
    reasoningQueue.push(...text.split(""))
  }

  const pushText = (text: string) => {
    textQueue.push(...text.split(""))
  }

  /** 清空所有队列，reasoning 优先确保顺序（仅作为动画未正常完成的兜底） */
  const flushQueue = () => {
    if (reasoningQueue.length > 0) {
      const chars = reasoningQueue.splice(0).join("")
      reasoningBuffer += chars
      params.onReasoningUpdate(chars, reasoningBuffer)
    }
    if (textQueue.length > 0) {
      const chars = textQueue.splice(0).join("")
      textBuffer += chars
      params.onTextUpdate(chars, textBuffer)
    }
  }

  return {
    flushQueue,
    isAnimationActive,
    isTokenRemain: () => reasoningQueue.length > 0 || textQueue.length > 0,
    pushReasoning,
    pushText,
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
  const fetchStartTime = Date.now()

  const { text, speed: smoothingSpeed } = standardizeAnimationStyle(options.responseAnimation ?? {})
  /**
   * 平滑效果
   */
  const textSmoothing = text === "smooth"
  const shouldSkipTextProcessing = text === "none"

  let textBuffer = ""
  let bufferTimer: ReturnType<typeof setTimeout> | null = null
  const BUFFER_INTERVAL = 50 // ms

  const flushTextBuffer = () => {
    if (textBuffer) {
      options.onMessageHandle?.({ text: textBuffer, type: "text" })
      textBuffer = ""
    }
  }

  let output = ""
  let thinking = ""
  let thinkingSignature: string | undefined

  const smoothController = createSmoothMessage({
    onReasoningUpdate: (delta, fullText) => {
      thinking = fullText
      options.onMessageHandle?.({ text: delta, type: "reasoning" })
    },
    onTextUpdate: (delta, fullText) => {
      output = fullText
      options.onMessageHandle?.({ text: delta, type: "text" })
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
        smoothController.stopAnimation()
      } else {
        finishedType = "error"

        const elapsedMs = Date.now() - fetchStartTime
        const networkStatus = typeof navigator !== "undefined" ? navigator.onLine : undefined

        const contextBody = {
          elapsedMs,
          networkStatus,
        }

        const chatError = {
          body: {
            message: error.message,
            name: error.name,
            stack: error.stack,
            ...contextBody,
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

        const chatError = {
          context: {
            chunk: ev.data,
            error: { message: (e as Error).message, name: (e as Error).name },
          },
          message: "chat response streaming chunk parse error, please contact your API Provider to fix it.",
        }

        options.onErrorHandle?.({
          body: chatError,
          message: "parse error",
          type: "StreamChunkError",
        })

        return
      }
      // console.log("onmessage: [ev]", ev)
      switch (ev.event) {
        case "text": {
          if (!data) break
          // console.log("onmessage text:", data)

          if (shouldSkipTextProcessing) {
            output += data
            options.onMessageHandle?.({ text: data, type: "text" })
          } else if (textSmoothing) {
            smoothController.pushText(data)

            if (!smoothController.isAnimationActive) smoothController.startAnimation()
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
        // 推理
        case "reasoning": {
          if (!data) break
          // console.log("onmessage reasoning:", data)
          // if (shouldSkipTextProcessing) {
          //   thinking += data
          //   options.onMessageHandle?.({ text: data, type: "reasoning" })
          // } else
          if (textSmoothing) {
            smoothController.pushReasoning(data)

            if (!smoothController.isAnimationActive) smoothController.startAnimation()
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

        case "stop": {
          options.onMessageHandle?.({ reason: data, type: "stop" })
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
      if (!response.ok) {
        throw await getMessageError(res)
      }
    },
    signal: options.signal,
  })

  if (response) {
    if (bufferTimer) {
      clearTimeout(bufferTimer)
      flushTextBuffer()
    }

    if (thinkingBufferTimer) {
      clearTimeout(thinkingBufferTimer)
      flushThinkingBuffer()
    }

    if (response.ok) {
      if (textSmoothing) {
        await smoothController.startAnimation()
      } else {
        smoothController.stopAnimation()
      }

      if (!triggerOnMessageHandler) {
        output = await response.clone().text()
        options.onMessageHandle?.({ text: output, type: "text" })
      }

      smoothController.flushQueue()

      const data = {
        images: images.length > 0 ? images : undefined,
        reasoning: thinking ? { content: thinking, signature: thinkingSignature } : undefined,
        type: finishedType,
        speed,
        usage,
      }

      await options?.onFinish?.(output, data)
    } else {
      smoothController.stopAnimation()
    }
  }

  return response
}
