// 在项目脚本里引入模块，并初始化
import TIM from "tim-js-sdk";
import TIMUploadPlugin from "tim-upload-plugin";

let options = {
  SDKAppID: 1400588310, // 接入时需要将0替换为您的云通信应用的 SDKAppID，类型为 Number
};
// 创建 SDK 实例，`TIM.create()`方法对于同一个 `SDKAppID` 只会返回同一份实例
let tim = TIM.create(options); // SDK 实例通常用 tim 表示

// 设置 SDK 日志输出级别，详细分级请参见 setLogLevel 接口的说明
tim.setLogLevel(3);
// 0 普通级别，日志量较多，接入时建议使用
// 1 release级别，SDK 输出关键信息，生产环境时建议使用
// 2 告警级别，SDK 只输出告警和错误级别的日志
// 3 错误级别，SDK 只输出错误级别的日志
// 4 无日志级别，SDK 将不打印任何日志

// 注册 COS SDK 插件
tim.registerPlugin({ "tim-upload-plugin": TIMUploadPlugin });

// // 监听事件，如：
// tim.on(TIM.EVENT.SDK_READY, function (event) {
//   console.log(event)
//   // 收到离线消息和会话列表同步完毕通知，接入侧可以调用 sendMessage 等需要鉴权的接口
//   // event.name - TIM.EVENT.SDK_READY
// });

export default tim;
