import { LocalChatService } from "./LocalChatService"
import { TencentChatService } from "./TencentChatService"

import type { ChatSDK } from "./types/tencent-cloud-chat"

export class PureChatService {
  private static instance: PureChatService | null = null
  private readonly chatService: LocalChatService | TencentChatService
  private chatSDK: ChatSDK | null = null
  private readonly isLocalMode: boolean = __LOCAL_MODE__

  private constructor() {
    if (this.isLocalMode) {
      console.log("🏠 PureChatService: 使用本地聊天模式")
      this.chatService = new LocalChatService()
    } else {
      console.log("☁️ PureChatService: 使用腾讯云聊天模式")
      this.chatService = new TencentChatService()
    }

    this.initialize()

    if (import.meta.env.DEV) {
      this.setupDebugTools()
    }
  }

  initialize(): ChatSDK {
    if (this.chatService instanceof TencentChatService) {
      this.chatSDK = this.chatService.initialize()
    } else {
      this.chatSDK = this.chatService.initialize()
    }

    return this.chatSDK as ChatSDK
  }

  /**
   * 设置开发环境调试工具
   */
  private setupDebugTools() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    window.__TIM_DEBUG__ = {
      getInstance: () => this.chatService,
      getMode: () => this.getMode(),
      resetService: () => PureChatService.resetInstance(),
      getPerformanceInfo: () => ({
        initStartTime: performance.now(),
        currentTime: performance.now(),
        timeSinceInit: null,
      }),
    }
    console.log("🔧 开发模式：聊天服务调试工具已启用")
    console.log("使用 window.__TIM_DEBUG__ 访问调试功能")
  }

  public static getInstance(): PureChatService {
    if (!PureChatService.instance) {
      PureChatService.instance = new PureChatService()
    }
    return PureChatService.instance
  }

  public static resetInstance() {
    if (PureChatService.instance) {
      PureChatService.instance.destroy()
      PureChatService.instance = null
    }
  }

  public getMode() {
    return this.isLocalMode ? "local" : "tencent"
  }

  public getChatService() {
    return this.chatService
  }

  public getChatSDK() {
    return this.chatSDK
  }

  public destroy() {
    this.chatSDK?.destroy()
  }
}

export const pureChatService = PureChatService.getInstance()
