import type { ChatSDK } from "@/types/tencent-cloud-chat"
import type TencentCloudChatModule from "@/types/tencent-cloud-chat"

interface ChatConfig {
  appId: number
  logLevel?: LogLevel
  plugins?: Record<string, unknown>
}

interface QueuedCall {
  method: string
  args: unknown[]
  resolve?: (value: unknown) => void
  reject?: (error: Error) => void
}

type LogLevel = 0 | 1 | 2 | 3 | 4

interface SDKModules {
  TencentCloudChat: TencentCloudChatModule
  GroupModule: any
  SignalingModule: any
  TIMUploadPlugin: any
}

export class TencentChatService {
  private static instance: TencentChatService
  private chatProxy: ChatSDK | null = null
  private realChatSDK: ChatSDK | null = null
  private readyPromise: Promise<ChatSDK> | null = null

  private readonly defaultLogLevel = 1
  private readonly validLogLevels: ReadonlyArray<LogLevel> = [0, 1, 2, 3, 4]

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
    if (this.chatProxy) {
      return this.chatProxy
    }

    const timer = this.createPerformanceTimer()
    try {
      const config = this.loadConfiguration()
      this.validateConfiguration(config)

      // this.chatProxy = this.createChatInstance(config)
      this.chatProxy = this.createChatProxy(config)
      timer.end("腾讯云 IM SDK 初始化")
      return this.chatProxy
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
    if (this.realChatSDK) {
      return Promise.resolve(this.realChatSDK)
    }

    if (!this.readyPromise) {
      this.readyPromise = new Promise<ChatSDK>((resolve) => {
        if (this.realChatSDK) {
          resolve(this.realChatSDK)
        } else {
          const checkInterval = setInterval(() => {
            if (this.realChatSDK) {
              clearInterval(checkInterval)
              resolve(this.realChatSDK)
            }
          }, 50)
        }
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
      logLevel: Number(logLevel) as LogLevel,
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

  private async loadSDKModules(): Promise<SDKModules> {
    const [
      { default: TencentCloudChat },
      { default: GroupModule },
      { default: SignalingModule },
      { default: TIMUploadPlugin },
    ] = await Promise.all([
      import(/* @vite-ignore */ "@tencentcloud/chat/index.es.js") as Promise<{
        default: TencentCloudChatModule
      }>,
      import(/* @vite-ignore */ "@tencentcloud/chat/modules/group-module.js"),
      import(/* @vite-ignore */ "@tencentcloud/chat/modules/signaling-module.js"),
      import(/* @vite-ignore */ "tim-upload-plugin"),
    ])

    return { TencentCloudChat, GroupModule, SignalingModule, TIMUploadPlugin }
  }

  private initializeRealSDK(config: ChatConfig, modules: SDKModules): ChatSDK {
    const chat = modules.TencentCloudChat.create({
      SDKAppID: config.appId,
      modules: {
        "group-module": modules.GroupModule,
        "signaling-module": modules.SignalingModule,
      },
    })

    this.configureLogging(config.logLevel, chat)

    chat.registerPlugin({ "tim-upload-plugin": modules.TIMUploadPlugin })
    console.log("🔌 文件上传插件注册成功")

    return chat
  }

  private executeQueuedCalls(chat: ChatSDK, callQueue: QueuedCall[]): void {
    while (callQueue.length > 0) {
      const call = callQueue.shift()
      if (!call) continue

      try {
        const result = (chat as any)[call.method](...call.args)
        call.resolve?.(result)
      } catch (error) {
        console.error(`❌ 执行队列方法 ${call.method} 失败:`, error)
        call.reject?.(error instanceof Error ? error : new Error(String(error)))
      }
    }
  }

  /**
   * 创建聊天代理实例（返回 Proxy）
   */
  private createChatProxy(config: ChatConfig): ChatSDK {
    const callQueue: QueuedCall[] = []

    this.loadSDKModules()
      .then((modules) => {
        this.realChatSDK = this.initializeRealSDK(config, modules)
        this.executeQueuedCalls(this.realChatSDK, callQueue)
        console.log("✅ Tencent IM SDK 加载完成")
      })
      .catch((err) => {
        console.error("❌ 动态加载 IM SDK 失败", err)
        while (callQueue.length > 0) {
          const call = callQueue.shift()
          call?.reject?.(new Error("SDK 加载失败"))
        }
      })

    const proxy = new Proxy({} as ChatSDK, {
      get: (_, prop: string | symbol) => {
        if (typeof prop !== "string") {
          return undefined
        }

        return (...args: unknown[]) => {
          if (this.realChatSDK) {
            return (this.realChatSDK as any)[prop](...args)
          }

          console.warn(`⚠️ SDK 尚未加载完成，方法 ${prop} 已加入队列`)

          return new Promise((resolve, reject) => {
            callQueue.push({
              method: prop,
              args,
              resolve,
              reject,
            })
          })
        }
      },
    })

    return proxy
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
            default: TencentCloudChatModule
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
        })

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
    const target = chat ?? this.chatProxy
    if (target) {
      const level = this.isValidLogLevel(logLevel) ? logLevel : this.defaultLogLevel
      target.setLogLevel(level)
      console.log(`📝 日志级别设置为: ${level}`)
    }
  }

  private isValidLogLevel(level: number): level is LogLevel {
    return this.validLogLevels.includes(level as LogLevel)
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
