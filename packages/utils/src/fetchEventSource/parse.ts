/**
 * 表示在事件流中发送的消息
 * https://developer.mozilla.org/zh-CN/docs/Web/API/Server-sent_events/Using_server-sent_events#Event_stream_format
 */
export interface EventSourceMessage {
  /** 设置 EventSource 对象的 last event ID 值的事件 ID。 */
  id: string
  /** 标识所描述事件类型的字符串。 */
  event: string
  /** 事件数据 */
  data: string
  /** 重试连接前等待的重新连接间隔（以毫秒为单位） */
  retry?: number
}

/**
 * 将 ReadableStream 转换为回调模式。
 * @param stream 输入的 ReadableStream。
 * @param onChunk 当流中有新的字节块时将被调用的函数。
 * @returns {Promise<void>} 当流关闭时将被解析的 Promise。
 */
export async function getBytes(stream: ReadableStream<Uint8Array>, onChunk: (arr: Uint8Array) => void) {
  const reader = stream.getReader()
  // let result: ReadableStreamDefaultReadResult<Uint8Array>
  let result: ReadableStreamReadResult<Uint8Array>
  while (!(result = await reader.read()).done) {
    onChunk(result.value)
  }
}

const enum ControlChars {
  NewLine = 10,
  CarriageReturn = 13,
  Space = 32,
  Colon = 58,
}

/**
 * 将任意字节块解析为 EventSource 行缓冲区。
 * 每行应采用 "field: value" 格式，并以 \r、\n 或 \r\n 结尾。
 * @param onLine 当有新的 EventSource 行时将被调用的函数。
 * @returns 应对每个传入字节块调用的函数。
 */
export function getLines(onLine: (line: Uint8Array, fieldLength: number) => void) {
  let buffer: Uint8Array | undefined
  let position: number // 当前读取位置
  let fieldLength: number // 行中 `field` 部分的长度
  let discardTrailingNewline = false

  // 返回一个可以处理每个传入字节块的函数：
  return function onChunk(arr: Uint8Array) {
    if (buffer === undefined) {
      buffer = arr
      position = 0
      fieldLength = -1
    } else {
      // 我们仍在解析旧行。将新字节追加到缓冲区：
      buffer = concat(buffer, arr)
    }

    const bufLength = buffer.length
    let lineStart = 0 // 当前行开始的索引
    while (position < bufLength) {
      if (discardTrailingNewline) {
        if (buffer[position] === ControlChars.NewLine) {
          lineStart = ++position // 跳转到下一个字符
        }

        discardTrailingNewline = false
      }

      // 开始向前查找直到行尾：
      let lineEnd = -1 // \r 或 \n 字符的索引
      for (; position < bufLength && lineEnd === -1; ++position) {
        switch (buffer[position]) {
          case ControlChars.Colon:
            if (fieldLength === -1) {
              // 行中的第一个冒号
              fieldLength = position - lineStart
            }
            break
          case ControlChars.NewLine:
            lineEnd = position
            break
          case ControlChars.CarriageReturn:
            discardTrailingNewline = true
            break
        }
      }

      if (lineEnd === -1) {
        // 我们到达了缓冲区的末尾，但行还没有结束。
        // 等待下一个 arr 然后继续解析：
        break
      }

      // 我们已经到达行尾，发送出去：
      onLine(buffer.subarray(lineStart, lineEnd), fieldLength)
      lineStart = position // 我们现在在下一行
      fieldLength = -1
    }

    if (lineStart === bufLength) {
      buffer = undefined // 我们已经完成了读取
    } else if (lineStart !== 0) {
      // 从 lineStart 开始创建一个新的缓冲区视图，这样我们就不会
      // 在获取新 arr 时需要复制之前的行：
      buffer = buffer.subarray(lineStart)
      position -= lineStart
    }
  }
}

/**
 * 将行缓冲区解析为 EventSourceMessages。
 * @param onId 对每个 `id` 字段将被调用的函数。
 * @param onRetry 对每个 `retry` 字段将被调用的函数。
 * @param onMessage 对每个消息将被调用的函数。
 * @returns 应对每个传入行缓冲区调用的函数。
 */
export function getMessages(
  onId: (id: string) => void,
  onRetry: (retry: number) => void,
  onMessage?: (msg: EventSourceMessage) => void
) {
  let message = newMessage()
  const decoder = new TextDecoder()

  // 返回一个可以处理每个传入行缓冲区的函数：
  return function onLine(line: Uint8Array, fieldLength: number) {
    if (line.length === 0) {
      // 空行表示消息结束。触发回调并开始新消息：
      onMessage?.(message)
      message = newMessage()
    } else if (fieldLength > 0) {
      // 排除注释和没有值的行
      // 行的格式为 "<field>:<value>" 或 "<field>: <value>"
      // https://html.spec.whatwg.org/multipage/server-sent-events.html#event-stream-interpretation
      const field = decoder.decode(line.subarray(0, fieldLength))
      const valueOffset = fieldLength + (line[fieldLength + 1] === ControlChars.Space ? 2 : 1)
      const value = decoder.decode(line.subarray(valueOffset))

      switch (field) {
        case "data":
          // 如果此消息已有数据，将新值追加到旧值。
          // 否则，只需设置为新值：
          message.data = message.data ? message.data + "\n" + value : value // otherwise,
          break
        case "event":
          message.event = value
          break
        case "id":
          onId((message.id = value))
          break
        case "retry": {
          const retry = parseInt(value, 10)
          if (!isNaN(retry)) {
            // 根据规范，忽略非整数
            onRetry((message.retry = retry))
          }
          break
        }
      }
    }
  }
}

function concat(a: Uint8Array, b: Uint8Array) {
  const res = new Uint8Array(a.length + b.length)
  res.set(a)
  res.set(b, a.length)
  return res
}

function newMessage(): EventSourceMessage {
  // data、event 和 id 必须初始化为空字符串：
  // https://html.spec.whatwg.org/multipage/server-sent-events.html#event-stream-interpretation
  // retry 应初始化为 undefined，以便我们始终向 js 引擎返回一致的形状：
  // https://mathiasbynens.be/notes/shapes-ics#takeaways
  return {
    data: "",
    event: "",
    id: "",
    retry: undefined,
  }
}
