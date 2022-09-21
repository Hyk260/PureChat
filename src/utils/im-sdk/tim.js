// 在项目脚本里引入模块，并初始化
import TIM from "tim-js-sdk";
import TIMUploadPlugin from "tim-upload-plugin";

let options = {
  SDKAppID: 1400588310, // 接入时需要将0替换为您的云通信应用的 SDKAppID，类型为 Number
};
// 创建 SDK 实例，`TIM.create()`方法对于同一个 `SDKAppID` 只会返回同一份实例
let tim = TIM.create(options); // SDK 实例通常用 tim 表示

// 设置 SDK 日志输出级别，详细分级请参见 setLogLevel 接口的说明
tim.setLogLevel(0); // 普通级别，日志量较多，接入时建议使用
// tim.setLogLevel(1); // release级别，SDK 输出关键信息，生产环境时建议使用

// 注册 COS SDK 插件
tim.registerPlugin({ "tim-upload-plugin": TIMUploadPlugin });

export default tim
  

