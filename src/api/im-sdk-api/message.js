import tim from "@/utils/IM/im-sdk/tim";
import TIM from "@/utils/IM/chat/index";
import emitter from "@/utils/mitt-bus";
import { createProgressHandler } from "@/utils/chat/index";
import { getReplyMsgContent, getCustomMsgContent } from "@/utils/chat/index";
const handleProgressUpdate = createProgressHandler();

const fileUploading = (data, bar = 0) => {
  handleProgressUpdate({ num: bar?.toFixed(0) }, () => {
    const uuid = data?.payload?.uuid || "";
    emitter.emit("fileUploading", { uuid, num: bar?.toFixed(0) });
    console.log("[file] uploading:", bar?.toFixed(0) + "%");
  });
};
// 发送消息
export const sendMsg = async (params) => {
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
export const createCustomMsg = (params) => {
  const { convId, convType = "C2C", customType } = params;
  const customData = getCustomMsgContent(customType);
  return tim.createCustomMessage({
    to: convId,
    conversationType: convType,
    payload: {
      data: customData,
      description: customType,
      extension: "",
    },
  });
};
// 创建文本消息
export const createTextMsg = (params) => {
  const { convId, convType = "C2C", textMsg, reply } = params;
  let replyMsgContent = "";
  if (reply) replyMsgContent = getReplyMsgContent(reply);
  return tim.createTextMessage({
    to: convId,
    conversationType: convType,
    payload: { text: textMsg },
    cloudCustomData: replyMsgContent,
  });
};
// 创建 @提醒功能的文本消息
export const createTextAtMsg = (params) => {
  const { convId, convType, textMsg, atUserList, reply } = params;
  const replyMsgContent = getReplyMsgContent(reply);
  return tim.createTextAtMessage({
    to: convId,
    conversationType: convType,
    payload: { text: textMsg, atUserList: atUserList },
    cloudCustomData: replyMsgContent,
  });
};
// 创建图片消息
export const createImgtMsg = (params) => {
  const { convId, convType, image } = params;
  return tim.createImageMessage({
    to: convId,
    conversationType: convType,
    payload: { file: image },
    onProgress: (event) => {
      console.log("file uploading:", event);
    },
  });
};
// 创建文件消息
export const createFiletMsg = (params) => {
  const { convId, convType, files } = params;
  const message = tim.createFileMessage({
    to: convId,
    conversationType: convType,
    payload: { file: files },
    onProgress: (event) => {
      fileUploading(message, event * 100);
    },
  });
  return message;
};
// 创建视频消息
export const createVideoMsg = (params) => {
  const { convId, convType, video } = params;
  const message = tim.createVideoMessage({
    to: convId,
    conversationType: convType,
    payload: { file: video },
    onProgress: (event) => {
      console.log("file uploading:", event);
    },
  });
  return message;
};
// 创建合并消息
export const createMergerMsg = async (params) => {
  const { convId, convType, List, title = "", abstractList } = params;
  return tim.createMergerMessage({
    to: convId,
    conversationType: convType,
    payload: {
      messageList: List,
      title: title || "聊天记录",
      abstractList: abstractList || ["allen: 666", "iris: [图片]"],
      compatibleText: "当前版本不支持",
    },
  });
};
// 创建转发消息
export const createForwardMsg = async (params) => {
  const { convId, convType, message } = params;
  return await tim.createForwardMessage({
    to: convId,
    conversationType: convType,
    payload: message,
  });
};
// 下载合并消息
export const downloadMergerMessage = async (message) => {
  if (message.type === TIM.TYPES.MSG_MERGER && message.payload.downloadKey !== "") {
    try {
      await tim.downloadMergerMessage(message);
    } catch (imError) {
      console.warn("downloadMergerMessage error:", imError);
    }
  }
};
