import TencentCloudChat from "@tencentcloud/chat"
import GroupModule from "@tencentcloud/chat/modules/group-module.js"
import SignalingModule from "@tencentcloud/chat/modules/signaling-module.js"
import TIMUploadPlugin from "tim-upload-plugin"

// import type TencentCloudChatModule from "./types/tencent-cloud-chat"
import type { ChatSDK } from "./types/tencent-cloud-chat"

interface ChatConfig {
  appId: number
  logLevel?: number
  plugins?: Record<string, unknown>
}

/**
 * 腾讯云聊天服务实现
 * 使用腾讯云IM SDK
 */
export class TencentChatService {
  private static instance: TencentChatService
  private chat: ChatSDK | null = null
  private readonly defaultLogLevel = 1
  private readonly validLogLevels = [0, 1, 2, 3, 4]

  private constructor() {
    // 私有构造函数，防止外部直接实例化
  }

  public static getInstance(): TencentChatService {
    if (!TencentChatService.instance) {
      TencentChatService.instance = new TencentChatService()
    }
    return TencentChatService.instance
  }

  public initializeCopy(): ChatSDK {
    if (this.chat) {
      console.warn("Chat SDK已经初始化，将返回现有实例")
      return this.chat
    }
    const initStartTime = performance.now()

    try {
      console.log("☁️ 开始初始化腾讯云 IM SDK")

      // 动态加载腾讯云模块
      const moduleLoadStart = performance.now()
      // const [
      //   { default: TencentCloudChat },
      //   // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      //   { default: GroupModule },
      //   // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      //   { default: SignalingModule },
      //   { default: TIMUploadPlugin },
      // ] = await Promise.all([
      //   import(/* @vite-ignore */ "@tencentcloud/chat/index.es.js") as Promise<{
      //     default: typeof TencentCloudChatModule
      //   }>,
      //   import(/* @vite-ignore */ "@tencentcloud/chat/modules/group-module.js"),
      //   import(/* @vite-ignore */ "@tencentcloud/chat/modules/signaling-module.js"),
      //   import(/* @vite-ignore */ "tim-upload-plugin"),
      // ])

      const moduleLoadTime = performance.now() - moduleLoadStart
      console.log(`📦 腾讯云模块加载完成 (${moduleLoadTime.toFixed(2)}ms)`)

      // 获取环境变量
      const { VITE_IM_SDK_APPID: appid, VITE_LOG_LEVEL: level = "1" } = import.meta.env

      if (!appid) {
        throw new Error("缺少必需的环境变量 VITE_IM_SDK_APPID")
      }

      if (isNaN(Number(appid))) {
        throw new Error("VITE_IM_SDK_APPID 必须是有效的数字")
      }

      console.log(`⚙️ 腾讯云配置: AppID=${appid}, LogLevel=${level}`)

      // 创建腾讯云IM实例
      const chat = TencentCloudChat.create({
        SDKAppID: Number(appid),
        modules: {
          "group-module": GroupModule,
          "signaling-module": SignalingModule,
        },
      })

      // 设置日志级别
      const logLevel = Number(level)
      if (!isNaN(logLevel) && logLevel >= 0 && logLevel <= 4) {
        chat.setLogLevel(logLevel)
        console.log(`📝 日志级别设置为: ${logLevel}`)
      } else {
        console.warn(`⚠️ 无效的日志级别 ${level}，使用默认值 1`)
        chat.setLogLevel(1)
      }

      // 注册文件上传插件
      chat.registerPlugin({ "tim-upload-plugin": TIMUploadPlugin })
      console.log("🔌 文件上传插件注册成功")

      const totalInitTime = performance.now() - initStartTime
      console.log(`🎉 腾讯云 IM SDK 初始化完成 (总耗时: ${totalInitTime.toFixed(2)}ms)`)
      this.chat = chat
      return chat as unknown as ChatSDK
    } catch (error) {
      const failedInitTime = performance.now() - initStartTime
      console.error(`❌ 腾讯云 IM SDK 初始化失败 (耗时: ${failedInitTime.toFixed(2)}ms):`, error)
      throw new Error(`腾讯云IM SDK初始化失败: ${(error as Error).message}`)
    }
  }

  /**
   * 初始化腾讯云聊天服务
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
      this.configureLogging(config.logLevel)
      this.registerPlugins()
      timer.end("腾讯云 IM SDK 初始化")
      return this.chat
    } catch (error) {
      timer.end("腾讯云 IM SDK 初始化失败")
      this.handleInitializationError(error)
      throw error
    }
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
   * 创建聊天实例
   */
  private createChatInstance(config: ChatConfig): ChatSDK {
    // const [
    //   { default: TencentCloudChat },
    //   // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    //   { default: GroupModule },
    //   // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    //   { default: SignalingModule },
    //   { default: TIMUploadPlugin },
    // ] = await Promise.all([
    //   import(/* @vite-ignore */ "@tencentcloud/chat/index.es.js") as Promise<{
    //     default: typeof TencentCloudChatModule
    //   }>,
    //   import(/* @vite-ignore */ "@tencentcloud/chat/modules/group-module.js"),
    //   import(/* @vite-ignore */ "@tencentcloud/chat/modules/signaling-module.js"),
    //   import(/* @vite-ignore */ "tim-upload-plugin"),
    // ])
    return TencentCloudChat.create({
      SDKAppID: config.appId,
      modules: {
        "group-module": GroupModule,
        "signaling-module": SignalingModule,
      },
    }) as unknown as ChatSDK
  }

  /**
   * 配置日志级别
   */
  private configureLogging(logLevel: number = this.defaultLogLevel) {
    if (this.chat) {
      const level = this.validLogLevels.includes(logLevel) ? logLevel : this.defaultLogLevel
      this.chat.setLogLevel(level)
      console.log(`📝 日志级别设置为: ${level}`)
    }
  }

  /**
   * 注册插件
   */
  private registerPlugins() {
    if (this.chat) {
      this.chat.registerPlugin({ "tim-upload-plugin": TIMUploadPlugin })
      console.log("🔌 文件上传插件注册成功")
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
