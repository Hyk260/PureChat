/**
 * 文件从 https://github.com/Azure/fetch-event-source/blob/45ac3cfffd30b05b79fbf95c21e67d4ef59aa56a/src/fetch.ts 复制
 * 并调整了一些代码
 */
import { EventSourceMessage, getBytes, getLines, getMessages } from "./parse"

export const EventStreamContentType = "text/event-stream"

const LastEventId = "last-event-id"

export interface FetchEventSourceInit extends RequestInit {
  /**
   * 请求头。FetchEventSource 仅支持 Record<string,string> 格式。
   */
  headers?: Record<string, string>

  /**
   * 当接收到响应时调用。使用此函数验证响应是否与您期望的匹配（如果不匹配则抛出错误）。
   * 如果未提供，将默认进行基本验证，确保 content-type 是 text/event-stream。
   */
  onopen?: (response: Response) => Promise<void>

  /**
   * 当接收到消息时调用。注意：与默认浏览器的 EventSource.onmessage 不同，
   * 此回调会为所有事件调用，即使是带有自定义 `event` 字段的事件。
   */
  onmessage?: (ev: EventSourceMessage) => void

  /**
   * 当响应结束时调用。如果您不希望服务器终止连接，可以在此处抛出异常并使用 onerror 重试。
   */
  onclose?: () => void

  /**
   * 当请求/处理消息/处理回调等出现任何错误时调用。使用此函数控制重试策略：
   * 如果错误是致命的，在回调内部重新抛出错误以停止整个操作。否则，
   * 您可以返回一个间隔时间（以毫秒为单位），之后请求将自动重试（带有 last-event-id）。
   * 如果未指定此回调，或者它返回 undefined，fetchEventSource 将把每个错误视为可重试的，
   * 并在 1 秒后再次尝试。
   */
  onerror?: (err: any) => number | null | undefined | void

  /** 要使用的 Fetch 函数。默认为 window.fetch */
  fetch?: typeof fetch
}

export function fetchEventSource(
  input: RequestInfo,
  {
    signal: inputSignal,
    headers: inputHeaders,
    onopen: inputOnOpen,
    onmessage,
    onclose,
    onerror,
    fetch: inputFetch,
    ...rest
  }: FetchEventSourceInit
) {
  return new Promise<void>((resolve) => {
    const headers = { ...inputHeaders }
    if (!headers.accept) {
      headers.accept = EventStreamContentType
    }
    const fetch = inputFetch ?? window.fetch

    async function create() {
      try {
        const response = await fetch(input, {
          ...rest,
          headers,
          signal: inputSignal,
        })

        await inputOnOpen?.(response)

        const chunk = getLines(
          getMessages((id) => {
            if (id) {
              // 存储 id 并在下次重试时发送回去：
              headers[LastEventId] = id
            } else {
              // 不再发送 last-event-id 头部：
              delete headers[LastEventId]
            }
          }, onmessage)
        )

        await getBytes(response?.body as ReadableStream, chunk)

        onclose?.()
        resolve()
      } catch (err) {
        onerror?.(err)
        resolve()
      }
    }

    create()
  })
}
