import { localChat } from "@/service/IM/chat/local"

import type TencentCloudChatModule from "@/service/chat/types/tencent-cloud-chat"
import type { ChatSDK } from "@/service/chat/types/tencent-cloud-chat"

// 基础类型定义
type LogLevel = 0 | 1 | 2 | 3 | 4 // DEBUG | INFO | WARN | ERROR | NONE
interface ChatInstance extends ChatSDK {
  [key: string]: any
}

interface LocalChatInstance {
  [key: string]: any
}

interface ProxyHandler<T> {
  get(target: T, propKey: string | symbol): any
  has(target: T, propKey: string | symbol): boolean
  ownKeys(target: T): (string | symbol)[]
  getOwnPropertyDescriptor?(target: T, propKey: string | symbol): PropertyDescriptor | undefined
  defineProperty?(target: T, propKey: string | symbol, descriptor: PropertyDescriptor): boolean
  deleteProperty?(target: T, propKey: string | symbol): boolean
}

/**
 * IM SDK 全局状态管理
 */
let instance: ChatInstance | null = null // SDK 实例
let isInitializing: boolean = false // 初始化状态标识
let initPromise: Promise<ChatInstance> | null = null // 初始化 Promise，避免重复初始化
let initStartTime: number | null = null // 初始化开始时间（性能监控）

const LOCAL_MODE: boolean = __LOCAL_MODE__

async function initChat(): Promise<ChatInstance> {
  initStartTime = performance.now()

  try {
    console.log(`🚀 开始初始化 IM SDK (模式: ${LOCAL_MODE ? "本地" : "腾讯云"})`)

    // 本地模式：使用本地聊天实现
    if (LOCAL_MODE) {
      console.log("🏠 使用本地聊天模式")
      const localInstance: LocalChatInstance = localChat.create({})

      const initTime: number = performance.now() - initStartTime
      console.log(`✅ 本地聊天初始化完成 (${initTime.toFixed(2)}ms)`)

      return localInstance as ChatInstance
    }

    // 腾讯云模式：动态加载腾讯云 IM SDK
    console.log("☁️ 加载腾讯云 IM SDK 模块...")

    const moduleLoadStart: number = performance.now()

    const [
      { default: TencentCloudChat },
      { default: GroupModule },
      { default: SignalingModule },
      { default: TIMUploadPlugin },
    ] = await Promise.all([
      // @ts-expect-error
      import(/* @vite-ignore */ "@tencentcloud/chat/index.es.js") as Promise<{
        default: typeof TencentCloudChatModule
      }>,
      // @ts-expect-error
      import(/* @vite-ignore */ "@tencentcloud/chat/modules/group-module.js"),
      // @ts-expect-error
      import(/* @vite-ignore */ "@tencentcloud/chat/modules/signaling-module.js"),
      // @ts-expect-error
      import(/* @vite-ignore */ "tim-upload-plugin"),
    ])

    const moduleLoadTime: number = performance.now() - moduleLoadStart
    console.log(`📦 模块加载完成 (${moduleLoadTime.toFixed(2)}ms)`)

    const {
      VITE_IM_SDK_APPID: appid,
      VITE_LOG_LEVEL: level = "1", // 默认日志级别
    } = import.meta.env as any

    if (!appid) {
      throw new Error("缺少必需的环境变量 VITE_IM_SDK_APPID")
    }

    if (isNaN(Number(appid))) {
      throw new Error("VITE_IM_SDK_APPID 必须是有效的数字")
    }

    console.log(`⚙️ 配置信息: AppID=${appid}, LogLevel=${level}`)

    /**
     * 创建腾讯云 IM 实例
     * 注册必需的功能模块
     */
    const chat: ChatInstance = TencentCloudChat.create({
      SDKAppID: Number(appid),
      modules: {
        "group-module": GroupModule, // 群组功能
        "signaling-module": SignalingModule, // 信令功能
      },
    })

    // 设置日志级别 (0=DEBUG, 1=INFO, 2=WARN, 3=ERROR, 4=NONE)
    const logLevel: number = Number(level)
    if (!isNaN(logLevel) && logLevel >= 0 && logLevel <= 4) {
      chat.setLogLevel?.(logLevel as LogLevel)
      console.log(`📝 日志级别设置为: ${logLevel}`)
    } else {
      console.warn(`⚠️ 无效的日志级别 ${level}，使用默认值 1`)
      chat.setLogLevel?.(1 as LogLevel)
    }

    // 注册文件上传插件
    chat.registerPlugin?.({ "tim-upload-plugin": TIMUploadPlugin })
    console.log("🔌 文件上传插件注册成功")

    const totalInitTime: number = performance.now() - initStartTime
    console.log(`🎉 腾讯云 IM SDK 初始化完成 (总耗时: ${totalInitTime.toFixed(2)}ms)`)
    console.log("TencentCloudChat", TencentCloudChat)

    return chat
  } catch (error: any) {
    const failedInitTime: number = performance.now() - (initStartTime || 0)
    console.error(`❌ IM SDK 初始化失败 (耗时: ${failedInitTime.toFixed(2)}ms):`, error)

    instance = null
    isInitializing = false
    initPromise = null

    throw new Error(`IM SDK初始化失败: ${error.message}`)
  }
}

/**
 * Proxy 处理器对象
 */
const handler: ProxyHandler<Record<string, never>> = {
  /**
   * 拦截属性访问
   *
   * @param {Record<string, never>} target - 代理目标对象（空对象）
   * @param {string|symbol} propKey - 被访问的属性名
   * @returns {*} 属性值或代理函数
   *
   */
  get(target: Record<string, never>, propKey: string | symbol): any {
    if (instance && typeof propKey === "string" && propKey in instance) {
      const value: any = instance[propKey]
      return typeof value === "function" ? value.bind(instance) : value
    }

    return async (...args: any[]): Promise<any> => {
      if (!instance) {
        if (!isInitializing) {
          isInitializing = true
          initPromise = initChat()

          try {
            instance = await initPromise
          } catch (error: any) {
            isInitializing = false
            initPromise = null
            throw error
          }

          isInitializing = false
        } else {
          await initPromise
        }
      }

      // 此时 instance 已经确保不为 null
      if (!(typeof propKey === "string" && propKey in instance!)) {
        throw new Error(`方法 '${String(propKey)}' 在 IM SDK 中不存在`)
      }

      const method: any = instance![propKey]

      if (typeof method !== "function") {
        return method
      }

      try {
        return await method.apply(instance!, args)
      } catch (error: any) {
        console.error(`调用 IM SDK 方法 '${String(propKey)}' 失败:`, error)
        throw error
      }
    }
  },

  has(target: Record<string, never>, propKey: string | symbol): boolean {
    return instance ? propKey in instance : true
  },

  ownKeys(target: Record<string, never>): (string | symbol)[] {
    return instance ? Object.keys(instance) : []
  },
}

const tim: ChatInstance = new Proxy({}, handler)

export default tim
