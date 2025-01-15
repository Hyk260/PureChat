import TencentCloudChat from "@/utils/IM/chat/index";
import GroupModule from "@tencentcloud/chat/modules/group-module.js";
import SignalingModule from "@tencentcloud/chat/modules/signaling-module.js";
import TIMUploadPlugin from "tim-upload-plugin";

import LocalChat from "@/utils/IM/chat/local";

let chat = {}

if (__LOCAL_MODE__) {
  chat = LocalChat.create({})
} else {
  const appid = import.meta.env.VITE_IM_SDK_APPID;
  const level = import.meta.env.VITE_LOG_LEVEL;
  
  const options = {
    SDKAppID: Number(appid),
    modules: {
      "group-module": GroupModule, // 群和群成员
      "signaling-module": SignalingModule, // 信令
    },
  };
  // 创建 SDK
  chat = TencentCloudChat.create(options);
  // 设置 SDK 日志输出级别
  chat.setLogLevel(level);
  // 0 普通级别，日志量较多，接入时建议使用
  // 1 release级别，SDK 输出关键信息，生产环境时建议使用
  // 2 告警级别，SDK 只输出告警和错误级别的日志
  // 3 错误级别，SDK 只输出错误级别的日志
  // 4 无日志级别，SDK 将不打印任何日志

  // 注册 COS SDK 插件
  chat.registerPlugin({ "tim-upload-plugin": TIMUploadPlugin });
}

export default chat;
