import debug from "debug"
import type {
  FinishData,
  ReasoningState,
  StreamChunk,
  StreamingCallbacks,
  StreamingContext,
  StreamingResult,
} from "./types/streaming"

const log = debug("store:streaming-handler")

/**
 * Streaming message handler
 *
 * Encapsulates all state and logic for streaming message processing, including:
 * - Text content accumulation
 * - Reasoning content processing
 * - Multimodal content processing
 * - Tool calls processing
 * - Image upload management
 *
 * @example
 * ```typescript
 * const handler = new StreamingHandler(context, callbacks);
 *
 * // During streaming
 * handler.handleChunk(chunk);
 *
 * // When streaming completes
 * const result = await handler.handleFinish(finishData);
 * ```
 */
export class StreamingHandler {
  // ========== Text state ==========
  private output = ""

  // ========== Reasoning state ==========
  private thinkingContent = ""
  private thinkingStartAt?: number
  private thinkingDuration?: number
  private reasoningOperationId?: string
  // private reasoningParts: MessageContentPart[] = []

  // ========== Tool call state ==========
  private isFunctionCall = false

  // ========== Other state ==========
  private msgTraceId?: string
  private finishType?: string

  constructor(
    private context: StreamingContext,
    private callbacks: StreamingCallbacks
  ) {}

  // ==================== Public API ====================

  /**
   * Handle streaming chunk
   */
  handleChunk(chunk: StreamChunk): void {
    switch (chunk.type) {
      case "text": {
        this.handleTextChunk(chunk)
        break
      }
      case "reasoning": {
        this.handleReasoningChunk(chunk)
        break
      }
      case "base64_image": {
        this.handleBase64ImageChunk(chunk)
        break
      }
      case "stop": {
        this.handleStopChunk()
        break
      }
    }
  }

  /**
   * Handle streaming finish
   */
  async handleFinish(text: string, finishData: FinishData): Promise<StreamingResult> {
    // Update traceId
    return this.buildFinalResult(finishData)
  }

  /**
   * Get current output content
   */
  getOutput(): string {
    return this.output
  }

  /**
   * Get reasoning duration
   */
  getThinkingDuration(): number | undefined {
    return this.thinkingDuration
  }

  /**
   * Check if this is a function call
   */
  getIsFunctionCall(): boolean {
    return this.isFunctionCall
  }

  /**
   * Get trace ID
   */
  getTraceId(): string | undefined {
    return this.msgTraceId
  }

  /**
   * Get finish type
   */
  getFinishType(): string | undefined {
    return this.finishType
  }

  // ==================== Chunk handling methods ====================

  private handleTextChunk(chunk: { text: string; type: "text" }): void {
    log("[text stream] text chunk: %s", chunk.text)
    this.output += chunk.text

    // log("[text stream] messageId=%s, output=%s", this.context.messageId, this.output)

    this.callbacks.onContentUpdate(this.output, this.buildDoneReasoningState())
  }

  private handleReasoningChunk(chunk: { text: string; type: "reasoning" }): void {
    log("[reasoning stream] reasoning chunk: %s", chunk.text)
    this.startReasoningIfNeeded()
    this.thinkingContent += chunk.text

    // log("[reasoning stream] messageId=%s, thinking=%s", this.context.messageId, this.thinkingContent)

    this.callbacks.onReasoningUpdate?.(this.buildThinkingReasoningState())
  }

  private buildDoneReasoningState(): ReasoningState | undefined {
    if (!this.thinkingContent || !this.thinkingDuration) return undefined
    return {
      content: this.thinkingContent,
      duration: this.thinkingDuration,
      reasoningType: "done",
    }
  }

  private buildThinkingReasoningState(): ReasoningState {
    return {
      content: this.thinkingContent,
      duration: this.thinkingDuration,
      reasoningType: "thinking",
    }
  }

  private handleBase64ImageChunk(chunk: {
    image: { data: string; id: string }
    images: { data: string; id: string }[]
    type: "base64_image"
  }): void {
    // Immediately display images
    this.callbacks?.onImagesUpdate?.(chunk.images.map((i) => ({ alt: i.id, id: i.id, url: i.data })))
  }

  private handleStopChunk(): void {
    this.endReasoningIfNeeded()
  }

  // ==================== Helper methods ====================

  private startReasoningIfNeeded(): void {
    if (!this.thinkingStartAt) {
      this.thinkingStartAt = Date.now()
      this.reasoningOperationId = this.callbacks?.onReasoningStart?.()
    }

    if (this.thinkingStartAt) {
      this.thinkingDuration = Date.now() - this.thinkingStartAt
    }
  }

  private endReasoningIfNeeded(): void {
    if (this.thinkingStartAt && !this.thinkingDuration) {
      this.thinkingDuration = Date.now() - this.thinkingStartAt

      if (this.reasoningOperationId) {
        this.callbacks?.onReasoningComplete?.(this.reasoningOperationId)
        this.reasoningOperationId = undefined
      }
    }
  }

  private buildFinalResult(finishData: FinishData): StreamingResult {
    const finalContent = this.output

    this.finishType = finishData.type

    // Determine final reasoning content
    const finalDuration = this.thinkingDuration && !isNaN(this.thinkingDuration) ? this.thinkingDuration : undefined

    // Get signature from finishData.reasoning (provided by backend in onFinish)
    const reasoningSignature = finishData.reasoning?.signature

    let finalReasoning: ReasoningState | undefined
    if (this.thinkingContent) {
      finalReasoning = {
        content: this.thinkingContent,
        duration: finalDuration,
        signature: reasoningSignature,
      }
    } else if (finishData.reasoning?.content) {
      finalReasoning = {
        ...finishData.reasoning,
        duration: finalDuration,
      }
    }

    return {
      content: finalContent,
      finishType: finishData.type,
      isFunctionCall: this.isFunctionCall,
      metadata: {
        finishType: finishData.type,
        imageList: undefined,
        reasoning: finalReasoning,
      },
      // toolCalls: undefined,
      // tools: undefined,
      // traceId: this.msgTraceId,
      // usage: finishData.usage,
    }
  }
}
