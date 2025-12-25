/**
 * 文件从 https://github.com/Azure/fetch-event-source/blob/45ac3cfffd30b05b79fbf95c21e67d4ef59aa56a/src/fetch.ts 复制
 * 并移除了一些代码
 */
import { EventSourceMessage, getBytes, getLines, getMessages } from "./parse"

export const EventStreamContentType = "text/event-stream"

const DefaultRetryInterval = 1000
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

  /**
   * 如果为 true，即使文档隐藏也会保持请求打开。
   * 默认情况下，fetchEventSource 会关闭请求，并在文档再次可见时自动重新打开。
   */
  openWhenHidden?: boolean

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
    openWhenHidden,
    fetch: inputFetch,
    ...rest
  }: FetchEventSourceInit
) {
  return new Promise<void>((resolve, reject) => {
    // 复制输入的 headers，因为我们可能会在下面修改它：
    const headers = { ...inputHeaders }
    if (!headers.accept) {
      headers.accept = EventStreamContentType
    }

    let curRequestController: AbortController
    function onVisibilityChange() {
      curRequestController.abort() // close existing request on every visibility change
      if (!document.hidden) {
        create() // page is now visible again, recreate request.
      }
    }

    if (!openWhenHidden) {
      document.addEventListener("visibilitychange", onVisibilityChange)
    }

    let retryInterval = DefaultRetryInterval
    let retryTimer = 0
    function dispose() {
      document.removeEventListener("visibilitychange", onVisibilityChange)
      window.clearTimeout(retryTimer)
      curRequestController.abort()
    }

    // 如果传入的信号中止，释放资源并解决 Promise：
    inputSignal?.addEventListener("abort", () => {
      dispose()
      resolve() // 不浪费时间构建/记录错误
    })

    const fetch = inputFetch ?? window.fetch
    const onopen = inputOnOpen ?? defaultOnOpen
    async function create() {
      curRequestController = new AbortController()
      try {
        const response = await fetch(input, {
          ...rest,
          headers,
          signal: curRequestController.signal,
        })

        await onopen(response)

        await getBytes(
          response.body,
          getLines(
            getMessages(
              (id) => {
                if (id) {
                  // 存储 id 并在下次重试时发送回去：
                  headers[LastEventId] = id
                } else {
                  // 不再发送 last-event-id 头部：
                  delete headers[LastEventId]
                }
              },
              (retry) => {
                retryInterval = retry
              },
              onmessage
            )
          )
        )

        onclose?.()
        dispose()
        resolve()
      } catch (err) {
        if (!curRequestController.signal.aborted) {
          // 如果我们自己没有中止请求：
          try {
            // 检查是否需要重试：
            const interval: any = onerror?.(err) ?? retryInterval
            window.clearTimeout(retryTimer)
            retryTimer = window.setTimeout(create, interval)
          } catch (innerErr) {
            // 我们不应该再重试了：
            dispose()
            reject(innerErr)
          }
        }
      }
    }

    create()
  })
}

function defaultOnOpen(response: Response) {
  const contentType = response.headers.get("content-type")
  if (!contentType?.startsWith(EventStreamContentType)) {
    throw new Error(`期望的 content-type 是 ${EventStreamContentType}，实际值: ${contentType}`)
  }
}
