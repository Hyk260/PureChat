import { updateImageSize, getCustomMsgContent } from "@/utils/common";
import { getCloudCustomData, fileUploading } from "@/utils/chat/index";
import tim from "@/utils/IM/im-sdk/tim";

// 发送消息
export const sendMessage = async (params) => {
  try {
    const {
      code,
      data: { message },
    } = await tim.sendMessage(params);
    return { code, message };
  } catch (error) {
    console.log(error);
  }
};
// 创建自定义消息
export const createCustomMessage = (params) => {
  const { to, type = "C2C", customType } = params || {};
  return tim.createCustomMessage({
    to,
    conversationType: type,
    payload: getCustomMsgContent({ data: null, type: customType })
  });
};

// 创建文本消息
export const createTextMessage = async (params) => {
  const { to, type = "C2C", text, custom = {}, cache = true } = params;
  return await tim.createTextMessage({
    to,
    cache: cache,
    conversationType: type,
    payload: { text },
    cloudCustomData: getCloudCustomData(custom),
  });
};

// 创建 @提醒功能的文本消息
export const createTextAtMessage = async (params) => {
  const { to, type = "C2C", text, atUserList, custom } = params;
  return await tim.createTextAtMessage({
    to,
    conversationType: type,
    payload: { text, atUserList },
    cloudCustomData: getCloudCustomData(custom),
  });
};

// 创建图片消息 https://web.sdk.qcloud.com/im/doc/v3/zh-cn/SDK.html#createImageMessage
export const createImageMessage = async (params) => {
  const { to, type, file } = params;
  const message = await tim.createImageMessage({
    to,
    conversationType: type,
    payload: { file },
    onProgress: (event) => {
      console.log("file uploading:", event);
    },
  });
  const imageMessage = await updateImageSize(message);
  return imageMessage;
};
// 创建文件消息
export const createFileMessage = async (params) => {
  const { to, type, file, path = "" } = params;
  const message = await tim.createFileMessage({
    to,
    conversationType: type,
    payload: { file, path },
    onProgress: (event) => {
      fileUploading(message, event * 100);
    },
  });
  return message;
};
// 创建视频消息
export const createVideoMessage = async (params) => {
  const { to, type, file } = params;
  const message = await tim.createVideoMessage({
    to,
    conversationType: type,
    payload: { file },
    onProgress: (event) => {
      console.log("file uploading:", event);
    },
  });
  return message;
};
// 创建合并消息
export const createMergerMessage = async (params) => {
  const { to, type, messageList = [], title = "聊天记录", abstractList } = params;
  return tim.createMergerMessage({
    to,
    conversationType: type,
    payload: {
      title,
      messageList,
      abstractList: abstractList || ["allen: 666", "iris: [图片]"],
      compatibleText: "当前版本不支持",
    },
  });
};
// 创建转发消息
export const createForwardMessage = async (params) => {
  const { to, type, message } = params;
  return await tim.createForwardMessage({
    to,
    conversationType: type,
    payload: message,
  });
};
// 下载合并消息
export const downloadMergerMessage = async (message) => {
  if (message.type === "TIMRelayElem" && message.payload.downloadKey !== "") {
    try {
      await tim.downloadMergerMessage(message);
    } catch (imError) {
      console.warn("downloadMergerMessage error:", imError);
    }
  }
};
