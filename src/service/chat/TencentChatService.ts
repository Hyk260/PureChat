import type TencentCloudChatModule from "./types/tencent-cloud-chat"
import type { ChatSDK } from "./types/tencent-cloud-chat"

interface ChatConfig {
  appId: number
  logLevel?: number
  plugins?: Record<string, unknown>
}

export class TencentChatService {
  private static instance: TencentChatService
  private chat: ChatSDK | null = null
  private readonly defaultLogLevel = 1
  private readonly validLogLevels = [0, 1, 2, 3, 4]

  private realChat: ChatSDK | null = null
  private readyPromise: Promise<ChatSDK> | null = null
  private resolveReady: ((chat: ChatSDK) => void) | null = null

  private constructor() {}

  public static getInstance(): TencentChatService {
    if (!TencentChatService.instance) {
      TencentChatService.instance = new TencentChatService()
    }
    return TencentChatService.instance
  }

  /**
   * 初始化腾讯云聊天服务（同步返回 Proxy）
   */
  public initialize(): ChatSDK {
    if (this.chat) {
      return this.chat
    }

    const timer = this.createPerformanceTimer()
    try {
      const config = this.loadConfiguration()
      this.validateConfiguration(config)

      this.chat = this.createChatInstance(config)
      timer.end("腾讯云 IM SDK 初始化")
      return this.chat
    } catch (error) {
      timer.end("腾讯云 IM SDK 初始化失败")
      this.handleInitializationError(error)
      throw error
    }
  }

  /**
   * 等待 SDK 真正加载完成
   */
  public ready(): Promise<ChatSDK> {
    if (this.realChat) {
      return Promise.resolve(this.realChat)
    }
    if (!this.readyPromise) {
      this.readyPromise = new Promise<ChatSDK>((resolve) => {
        this.resolveReady = resolve
      })
    }
    return this.readyPromise
  }

  /**
   * 加载配置信息
   */
  private loadConfiguration(): ChatConfig {
    const { VITE_IM_SDK_APPID: appId, VITE_LOG_LEVEL: logLevel = "1" } = import.meta.env
    return {
      appId: Number(appId),
      logLevel: Number(logLevel),
    }
  }

  /**
   * 验证配置信息
   */
  private validateConfiguration(config: ChatConfig): void {
    if (!config.appId || isNaN(config.appId)) {
      throw new Error("无效的 VITE_IM_SDK_APPID: 必须提供有效的数字")
    }
  }

  /**
   * 创建聊天实例（返回 Proxy）
   */
  private createChatInstance(config: ChatConfig): ChatSDK {
    let realChat: ChatSDK | null = null
    const callQueue: Array<{ method: string; args: any[] }> = []

    // 异步加载 SDK 模块
    ;(async () => {
      try {
        const [
          { default: TencentCloudChat },
          { default: GroupModule },
          { default: SignalingModule },
          { default: TIMUploadPlugin },
        ] = await Promise.all([
          import(/* @vite-ignore */ "@tencentcloud/chat/index.es.js") as Promise<{
            default: typeof TencentCloudChatModule
          }>,
          import(/* @vite-ignore */ "@tencentcloud/chat/modules/group-module.js"),
          import(/* @vite-ignore */ "@tencentcloud/chat/modules/signaling-module.js"),
          import(/* @vite-ignore */ "tim-upload-plugin"),
        ])

        realChat = TencentCloudChat.create({
          SDKAppID: config.appId,
          modules: {
            "group-module": GroupModule,
            "signaling-module": SignalingModule,
          },
        }) as unknown as ChatSDK

        // 配置日志
        this.configureLogging(config.logLevel, realChat)

        // 注册插件
        realChat.registerPlugin({ "tim-upload-plugin": TIMUploadPlugin })
        console.log("🔌 文件上传插件注册成功")

        // 回放之前缓存的调用
        for (const { method, args } of callQueue) {
          ;(realChat as any)[method](...args)
        }
        callQueue.length = 0

        console.log("✅ Tencent IM SDK 加载完成")
      } catch (err) {
        console.error("❌ 动态加载 IM SDK 失败", err)
      }
    })()

    // Proxy 返回，先缓存调用，后续透传
    const proxy = new Proxy(
      {},
      {
        get(_, prop: string) {
          return (...args: any[]) => {
            if (realChat) {
              return (realChat as any)[prop](...args)
            }
            console.warn(`⚠️ SDK 尚未加载完成，方法 ${String(prop)} 已加入队列`)
            callQueue.push({ method: String(prop), args })
          }
        },
      }
    )

    return proxy as ChatSDK
  }

  /**
   * 配置日志级别
   */
  private configureLogging(logLevel: number = this.defaultLogLevel, chat?: ChatSDK) {
    const target = chat ?? this.chat
    if (target) {
      const level = this.validLogLevels.includes(logLevel) ? logLevel : this.defaultLogLevel
      target.setLogLevel(level)
      console.log(`📝 日志级别设置为: ${level}`)
    }
  }

  /**
   * 创建性能计时器
   */
  private createPerformanceTimer() {
    const startTime = performance.now()
    return {
      end: (message: string) => {
        const duration = performance.now() - startTime
        console.log(`🕒 ${message} (耗时: ${duration.toFixed(2)}ms)`)
      },
    }
  }

  /**
   * 处理初始化错误
   */
  private handleInitializationError(error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "未知错误"
    console.error("❌ 腾讯云 IM SDK 初始化失败:", errorMessage)
    throw new Error(`腾讯云 IM SDK 初始化失败: ${errorMessage}`)
  }
}

export const tencentChatService = TencentChatService.getInstance()
