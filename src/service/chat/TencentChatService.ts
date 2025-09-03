import TencentCloudChat from "@tencentcloud/chat"
import GroupModule from "@tencentcloud/chat/modules/group-module.js"
import SignalingModule from "@tencentcloud/chat/modules/signaling-module.js"
import TIMUploadPlugin from "tim-upload-plugin"

// import type TencentCloudChatModule from "./types/tencent-cloud-chat"
import type { ChatSDK } from "./types/tencent-cloud-chat"

/**
 * 腾讯云聊天服务实现
 * 使用腾讯云IM SDK
 */
export class TencentChatService {
  constructor() {
    // 初始化腾讯云聊天服务
  }
  /**
   * 初始化腾讯云聊天服务
   */
  initialize(): ChatSDK {
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

      return chat as ChatSDK
    } catch (error) {
      const failedInitTime = performance.now() - initStartTime
      console.error(`❌ 腾讯云 IM SDK 初始化失败 (耗时: ${failedInitTime.toFixed(2)}ms):`, error)
      throw new Error(`腾讯云IM SDK初始化失败: ${(error as Error).message}`)
    }
  }
}

export const tencentChatService = new TencentChatService()
