import type { ChatStreamCallbacks, StreamProtocolChunk, StreamContext } from "@pure/types"

/**
 * 一个异步生成器函数，用于从给定的流中逐步获取响应。
 */
export const chatStreamable = async function* <T>(stream: AsyncIterable<T>) {
  for await (const response of stream) {
    yield response
  }
}

const ERROR_CHUNK_PREFIX = "%FIRST_CHUNK_ERROR%: "

export const convertIterableToStream = <T>(stream: AsyncIterable<T>) => {
  const iterable = chatStreamable(stream)

  // copy from https://github.com/vercel/ai/blob/d3aa5486529e3d1a38b30e3972b4f4c63ea4ae9a/packages/ai/streams/ai-stream.ts#L284
  const it = iterable[Symbol.asyncIterator]()

  return new ReadableStream({
    async cancel(reason) {
      await it.return?.(reason)
    },
    async pull(controller) {
      const { done, value } = await it.next()
      if (done) {
        controller.close()
      } else {
        controller.enqueue(value)
      }
    },
    async start(controller) {
      try {
        const { done, value } = await it.next()
        if (done) controller.close()
        else controller.enqueue(value)
      } catch (e) {
        const error = e

        controller.enqueue(
          ERROR_CHUNK_PREFIX + JSON.stringify({ message: error.message, name: error.name, stack: error.stack })
        )

        controller.close()
      }
    },
  })
}

export const createSSEProtocolTransformer = (
  transformer: (chunk: any, stack: StreamContext) => StreamProtocolChunk | StreamProtocolChunk[],
  streamStack?: StreamContext
) => {
  return new TransformStream({
    transform: (chunk, controller) => {
      const result = transformer(chunk, streamStack || { id: "" })

      const buffers = Array.isArray(result) ? result : [result]

      buffers.forEach(({ type, id, data }) => {
        controller.enqueue(`id: ${id}\n`)
        controller.enqueue(`event: ${type}\n`)
        controller.enqueue(`data: ${JSON.stringify(data)}\n\n`)
      })
    },
  })
}

export const createCallbacksTransformer = (cb: ChatStreamCallbacks | undefined) => {
  const textEncoder = new TextEncoder()
  const aggregatedText = ""

  let currentType = "" as unknown as StreamProtocolChunk["type"]
  const callbacks = cb || {}

  return new TransformStream({
    async flush(): Promise<void> {
      const data = {
        text: aggregatedText,
      }

      if (callbacks.onCompletion) {
        await callbacks.onCompletion(data)
      }

      if (callbacks.onFinal) {
        await callbacks.onFinal(data)
      }
    },

    async start(): Promise<void> {
      if (callbacks.onStart) await callbacks.onStart()
    },

    async transform(chunk: string, controller): Promise<void> {
      controller.enqueue(textEncoder.encode(chunk))

      if (chunk.startsWith("event:")) {
        currentType = chunk?.split("event:")?.[1]?.trim() as unknown as StreamProtocolChunk["type"]
      } else if (chunk.startsWith("data:")) {
        const content = chunk?.split("data:")?.[1]?.trim() ?? ""

        switch (currentType) {
          case "text": {
            await callbacks.onText?.(content)
            break
          }
        }
      }
    },
  })
}

interface UriParserResult {
  base64: string | null
  mimeType: string | null
  type: "url" | "base64" | null
}

export const parseDataUri = (dataUri: string): UriParserResult => {
  const dataUriMatch = dataUri.match(/^data:([^;]+);base64,(.+)$/)

  if (dataUriMatch) {
    return { base64: dataUriMatch[2] ?? null, mimeType: dataUriMatch[1] ?? null, type: "base64" }
  }

  try {
    new URL(dataUri)
    return { base64: null, mimeType: null, type: "url" }
  } catch {
    return { base64: null, mimeType: null, type: null }
  }
}

export const FIRST_CHUNK_ERROR_KEY = "_isFirstChunkError"

export const createFirstErrorHandleTransformer = (errorHandler?: (errorJson: any) => any, provider?: string) => {
  return new TransformStream({
    transform(chunk, controller) {
      if (chunk.toString().startsWith(ERROR_CHUNK_PREFIX)) {
        const errorData = JSON.parse(chunk.toString().replace(ERROR_CHUNK_PREFIX, ""))

        controller.enqueue({
          ...errorData,
          [FIRST_CHUNK_ERROR_KEY]: true,
          errorType: errorHandler?.(errorData) || "unknown",
          provider,
        })
      } else {
        controller.enqueue(chunk)
      }
    },
  })
}

export const TOKEN_SPEED_CHUNK_ID = "output_speed"

/**
 * Create a middleware to calculate the token generate speed
 * @requires createSSEProtocolTransformer
 */
export const createTokenSpeedCalculator = (
  transformer: (chunk: any, stack: StreamContext) => StreamProtocolChunk | StreamProtocolChunk[],
  {
    inputStartAt,
    streamStack,
    enableStreaming = true, // 选择 TPS 计算方式（非流式时传 false）
  }: { enableStreaming?: boolean; inputStartAt?: number; streamStack?: StreamContext } = {}
) => {
  let outputStartAt: number | undefined

  const process = (chunk: StreamProtocolChunk) => {
    const result = [chunk]
    // if the chunk is the first text or reasoning chunk, set as output start
    if (!outputStartAt && (chunk.type === "text" || chunk.type === "reasoning")) {
      outputStartAt = Date.now()
    }

    // if the chunk is the stop chunk, set as output finish
    if (inputStartAt && outputStartAt && chunk.type === "usage") {
      // TPS should always include all generated tokens (including reasoning tokens)
      // because it measures generation speed, not just visible content
      const usage = chunk.data
      const outputTokens = usage?.totalOutputTokens ?? 0
      const now = Date.now()
      const elapsed = now - (enableStreaming ? outputStartAt : inputStartAt)
      const duration = now - outputStartAt
      const latency = now - inputStartAt
      const ttft = outputStartAt - inputStartAt
      const tps = elapsed === 0 ? undefined : (outputTokens / elapsed) * 1000

      result.push({
        data: {
          duration,
          latency,
          tps,
          ttft,
        },
        id: TOKEN_SPEED_CHUNK_ID,
        type: "speed",
      })
    }
    return result
  }

  return new TransformStream({
    transform(chunk, controller) {
      let result = transformer(chunk, streamStack || { id: "" })
      if (!Array.isArray(result)) result = [result]
      result.forEach((r) => {
        const processed = process(r)
        if (processed) processed.forEach((p) => controller.enqueue(p))
      })
    },
  })
}
