import TIM from "tim-js-sdk";
import TIMUploadPlugin from "tim-upload-plugin";

let options = {
  SDKAppID: 1400588310, 
};
// 创建 SDK 实例实例通常用 tim 表示
let tim = TIM.create(options);

// 设置 SDK 日志输出级别
tim.setLogLevel(process.env.VUE_APP_LOG_LEVEL);
// 0 普通级别，日志量较多，接入时建议使用
// 1 release级别，SDK 输出关键信息，生产环境时建议使用
// 2 告警级别，SDK 只输出告警和错误级别的日志
// 3 错误级别，SDK 只输出错误级别的日志
// 4 无日志级别，SDK 将不打印任何日志

// 注册 COS SDK 插件
tim.registerPlugin({ "tim-upload-plugin": TIMUploadPlugin });

export default tim;
