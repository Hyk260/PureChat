import { LocalChatService } from "./LocalChatService"
import { TencentChatService } from "./TencentChatService"

import type { ChatSDK } from "./types/tencent-cloud-chat"

export class PureChatService {
  private static instance: PureChatService | null = null
  private readonly chatService: LocalChatService | TencentChatService
  private chatSDK: ChatSDK | null = null
  private readonly isLocalMode: boolean

  private constructor() {
    this.isLocalMode = typeof __LOCAL_MODE__ !== "undefined" ? __LOCAL_MODE__ : false

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

  async initialize(): Promise<ChatSDK> {
    if (this.chatService instanceof TencentChatService) {
      this.chatSDK = await this.chatService.initialize()
    } else {
      this.chatSDK = await this.chatService.initialize()
    }

    return this.chatSDK
  }

  /**
   * 设置开发环境调试工具
   */
  private setupDebugTools(): void {
    // window.__TIM_DEBUG__ = {
    // getInstance: () => this.chatService,
    // getMode: () => this.getMode(),
    // resetService: () => PureChatService.resetInstance(),
    // getPerformanceInfo: () => ({
    //   initStartTime: performance.now(),
    //   currentTime: performance.now(),
    //   timeSinceInit: null,
    // }),
    // }
    console.log("🔧 开发模式：聊天服务调试工具已启用")
    console.log("使用 window.__CHAT_DEBUG__ 访问调试功能")
  }

  /**
   * 获取单例实例
   */
  public static getInstance(): PureChatService {
    if (!PureChatService.instance) {
      PureChatService.instance = new PureChatService()
    }
    return PureChatService.instance
  }

  /**
   * 重置单例实例（主要用于测试）
   */
  public static resetInstance(): void {
    if (PureChatService.instance) {
      PureChatService.instance.destroy()
      PureChatService.instance = null
    }
  }

  public getMode(): "local" | "tencent" {
    return this.isLocalMode ? "local" : "tencent"
  }

  public getChatService(): LocalChatService | TencentChatService {
    return this.chatService
  }

  public getChatSDK(): ChatSDK | null {
    return this.chatSDK
  }

  destroy(): void {
    // this.chatService.destroy()
  }
}

export const pureChatService = PureChatService.getInstance()

export default PureChatService
