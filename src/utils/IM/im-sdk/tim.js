import LocalChat from "@/utils/IM/chat/local";

// 聊天实例
let chat = {}

// 初始化聊天实例
async function initChat() {
  // 本地模式
  if (__LOCAL_MODE__) {
    chat = LocalChat.create({});
  } else {
    // 动态导入腾讯云IM SDK相关模块
    const [
      { default: TencentCloudChat },
      { default: GroupModule },
      { default: SignalingModule }, 
      { default: TIMUploadPlugin }
    ] = await Promise.all([
      import("@/utils/IM/chat/index"),
      import("@tencentcloud/chat/modules/group-module.js"),
      import("@tencentcloud/chat/modules/signaling-module.js"),
      import("tim-upload-plugin")
    ]);

    // 获取环境变量配置
    const appid = import.meta.env.VITE_IM_SDK_APPID;
    const level = import.meta.env.VITE_LOG_LEVEL;
    
    // SDK初始化配置
    const options = {
      SDKAppID: Number(appid),
      modules: {
        "group-module": GroupModule, // 群组模块
        "signaling-module": SignalingModule, // 信令模块
      },
    };

    // 创建腾讯云IM SDK实例
    chat = TencentCloudChat.create(options);
    // 设置SDK日志级别
    chat.setLogLevel(level);
    // 0: 普通级别，日志量较多，接入时建议使用
    // 1: release级别，SDK输出关键信息，生产环境建议使用
    // 2: 告警级别，SDK只输出告警和错误级别的日志
    // 3: 错误级别，SDK只输出错误级别的日志
    // 4: 无日志级别，SDK将不打印任何日志

    // 注册文件上传插件
    chat.registerPlugin({ "tim-upload-plugin": TIMUploadPlugin });
  }
  return chat;
}

// 导出初始化后的聊天实例
export default await initChat();
