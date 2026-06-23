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
  /** Content update */
  onContentUpdate: (
    content: string,
    reasoning?: ReasoningState,
    contentMetadata?: { isMultimodal: boolean; tempDisplayContent: string }
  ) => void
  /** Search grounding update */
  // onGroundingUpdate?: (grounding: GroundingData) => void
  /** Image list update */
  onImagesUpdate?: (images: ChatImageItem[]) => void
  /** Complete reasoning operation */
  onReasoningComplete?: (operationId: string) => void
  /** Start reasoning operation */
  onReasoningStart?: () => string | undefined
  /** Reasoning state update */
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
