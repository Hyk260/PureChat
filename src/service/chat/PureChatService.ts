import { LocalChatService, localChatService } from "./LocalChatService"
import { TencentChatService, tencentChatService } from "./TencentChatService"

import type { ChatSDK } from "@/types/tencent-cloud-chat"

type ChatMode = "local" | "tencent"

export interface PerformanceInfo {
  initStartTime: number
  currentTime: number
  timeSinceInit: number
}

export interface DebugTools {
  getInstance: () => LocalChatService | TencentChatService
  getMode: () => ChatMode
  resetService: () => void
  getPerformanceInfo: () => PerformanceInfo
}

export class PureChatService {
  private static instance: PureChatService | null = null
  private readonly chatService: LocalChatService | TencentChatService
  private readonly isLocalMode: boolean = __LOCAL_MODE__
  private readonly initStartTime: number = performance.now()
  private chatSDK: ChatSDK | null = null

  private constructor() {
    this.chatService = this.isLocalMode ? localChatService : tencentChatService

    console.log(this.isLocalMode ? "🏠 PureChatService: 使用本地聊天模式" : "☁️ PureChatService: 使用腾讯云聊天模式")

    this.initialize()

    if (import.meta.env.DEV) {
      this.setupDebugTools()
    }
  }

  initialize(): ChatSDK {
    this.chatSDK = this.chatService.initialize()

    return this.chatSDK
  }

  /**
   * 设置开发环境调试工具
   */
  private setupDebugTools() {
    window.__TIM_DEBUG__ = {
      getInstance: () => this.chatService,
      getMode: () => this.getMode(),
      resetService: () => PureChatService.resetInstance(),
      getPerformanceInfo: () => this.getPerformanceInfo(),
    }
    console.log("🔧 开发模式：聊天服务调试工具已启用")
    console.log("使用 window.__TIM_DEBUG__ 访问调试功能")
  }

  private getPerformanceInfo(): PerformanceInfo {
    const currentTime = performance.now()
    return {
      initStartTime: this.initStartTime,
      currentTime,
      timeSinceInit: currentTime - this.initStartTime,
    }
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
    this.chatSDK = null

    if (import.meta.env.DEV && window.__TIM_DEBUG__) {
      delete window.__TIM_DEBUG__
    }
  }
}

export const pureChatService = PureChatService.getInstance()

export const chatInstance = pureChatService.initialize()

export default chatInstance
