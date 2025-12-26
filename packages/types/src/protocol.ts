export interface StreamProtocolChunk {
  data: any
  id?: string
  type: // pure text
  | "text"
    // base64 format image
    | "base64_image"
    // Model Thinking
    | "reasoning"
    // use for reasoning signature, maybe only anthropic
    | "reasoning_signature"
    // stop signal
    | "stop"
    // Error
    | "error"
    // token usage
    | "usage"
    // performance monitor
    | "speed"
    // unknown data result
    | "data"
}

export interface StreamContext {
  id: string
  returnedCitation?: boolean
  startReasoning?: boolean
  thinking?: {
    id: string
    name: string
  }
  thinkingInContent?: boolean
  tool?: {
    id: string
    index: number
    name: string
  }
  toolIndex?: number
}
