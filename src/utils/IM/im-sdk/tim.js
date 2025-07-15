import tim from "./tim-proxy";
// import { localChat } from "@/utils/IM/chat/local";

// let instance = null;
// let isInitializing = false;
// let initPromise;

// async function initChat() {
//   try {
//     if (__LOCAL_MODE__) {
//       return localChat.create({});
//     }

//     const [
//       { default: TencentCloudChat },
//       { default: GroupModule },
//       { default: SignalingModule },
//       { default: TIMUploadPlugin },
//     ] = await Promise.all([
//       import("@tencentcloud/chat/index.es.js"),
//       import("@tencentcloud/chat/modules/group-module.js"),
//       import("@tencentcloud/chat/modules/signaling-module.js"),
//       import("tim-upload-plugin"),
//     ]);

//     const {
//       VITE_IM_SDK_APPID: appid,
//       VITE_LOG_LEVEL: level
//     } = import.meta.env;

//     const chat = TencentCloudChat.create({
//       SDKAppID: Number(appid),
//       modules: {
//         "group-module": GroupModule,
//         "signaling-module": SignalingModule,
//       },
//     });

//     chat.setLogLevel(Number(level));
//     chat.registerPlugin({"tim-upload-plugin": TIMUploadPlugin });

//     return chat;
//   } catch (error) {
//     console.error("IM SDK初始化失败:", error);
//     throw new Error("IM SDK初始化失败");
//   }
// }

// const handler = {
//   get(target, propKey) {
//     if (instance && propKey in instance) {
//       const value = instance[propKey];
//       return typeof value === 'function' ? value.bind(instance) : value;
//     }

//     return async (...args) => {
//       if (!instance) {
//         if (!isInitializing) {
//           isInitializing = true;
//           initPromise = initChat();
//           instance = await initPromise;
//           isInitializing = false;
//         } else {
//           await initPromise;
//         }
//       }
//       return instance[propKey](...args);
//     };
//   }
// };

// const tim = new Proxy({}, handler);

export default tim;
