import type { ChatImageItem } from "@pure/types"

/**
 * Streaming context - immutable configuration
 */
export interface StreamingContext {
  // agentId?: string
  // groupId?: string
  messageId?: string
  // operationId?: string
  // topicId?: string | null
}

/**
 * Reasoning state
 */
export interface ReasoningState {
  content?: string
  duration?: number
  isMultimodal?: boolean
  reasoningType?: "thinking" | "done"
  signature?: string
}

/**
 * Streaming callbacks - for notifying external state changes
 */
export interface StreamingCallbacks {
  /** 内容更新 */
  onContentUpdate: (
    content: string,
    reasoning?: ReasoningState,
    contentMetadata?: { isMultimodal: boolean; tempDisplayContent: string }
  ) => void
  /** Search grounding update */
  // onGroundingUpdate?: (grounding: GroundingData) => void
  /** Image list update */
  onImagesUpdate?: (images: ChatImageItem[]) => void
  /** 推理完成 */
  onReasoningComplete?: (operationId: string) => void
  /** 开始推理 */
  onReasoningStart?: () => string | undefined
  /** 推理状态更新 */
  onReasoningUpdate?: (reasoning: ReasoningState) => void
  /** Upload base64 image */
  uploadBase64Image?: (base64Data: string) => Promise<{ id?: string; url?: string }>
}

/**
 * Finish callback data
 */
export interface FinishData {
  reasoning?: { content?: string; signature?: string }
  traceId?: string | null
  type?: string
}

/**
 * Final streaming result
 */
export interface StreamingResult {
  content: string
  finishType?: string
  isFunctionCall: boolean
  metadata: {
    finishType?: string
    imageList?: ChatImageItem[]
    isMultimodal?: boolean
    reasoning?: ReasoningState
  }
}

/**
 * Stream chunk types
 */
export type StreamChunk =
  | { text: string; type: "text" }
  | { text: string; type: "reasoning" }
  | {
      isAnimationActives?: boolean[]
      tool_calls: any[]
      type: "tool_calls"
    }
  | {
      image: { data: string; id: string }
      images: { data: string; id: string }[]
      type: "base64_image"
    }
  | { type: "stop" }
