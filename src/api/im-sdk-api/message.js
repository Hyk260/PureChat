import { throttle } from "lodash-es";
import tim from "@/utils/IM/im-sdk/tim";
import emitter from "@/utils/mitt-bus";
import { getImageSize } from "@/views/chatStudio/utils/utils";
import { getReplyMsgContent } from "@/utils/chat/index";
import { getCustomMsgContent } from '@/api/im-sdk-api/custom';

const createProgressHandler = () => {
  let lastNum = 0;
  const handleProgressUpdate = throttle((progress, cd) => {
    if (progress.num !== lastNum) {
      lastNum = progress.num;
      if (typeof cd === "function") cd();
    }
  }, 100);
  return handleProgressUpdate;
};

const handleProgressUpdate = createProgressHandler();

const fileUploading = (data, bar = 0) => {
  handleProgressUpdate({ num: bar?.toFixed(0) }, () => {
    const uuid = data?.payload?.uuid || "";
    emitter.emit("fileUploading", { uuid, num: bar?.toFixed(0) });
    console.log("[file] uploading:", bar?.toFixed(0) + "%");
  });
};

// 计算图片宽高
const fnImageSize = async (image) => {
  let num = 0;
  const { width, height } = await getImageSize(image.payload.imageInfoArray[num].url);
  image.payload.imageInfoArray[num].width = width;
  image.payload.imageInfoArray[num].height = height;
  return image;
}

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
export const createTextMessage = (params) => {
  const { convId, convType = "C2C", textMsg, reply, cache = true } = params;
  return tim.createTextMessage({
    to: convId,
    cache: cache,
    conversationType: convType,
    payload: { text: textMsg },
    cloudCustomData: getReplyMsgContent(reply),
  });
};

// 创建 @提醒功能的文本消息
export const createTextAtMsg = (params) => {
  const { convId, convType, textMsg, atUserList, reply } = params;
  return tim.createTextAtMessage({
    to: convId,
    conversationType: convType,
    payload: { text: textMsg, atUserList: atUserList },
    cloudCustomData: getReplyMsgContent(reply),
  });
};

// 创建图片消息 https://web.sdk.qcloud.com/im/doc/v3/zh-cn/SDK.html#createImageMessage
export const createImgtMsg = async (params) => {
  const { convId, convType, image } = params;
  const message = tim.createImageMessage({
    to: convId,
    conversationType: convType,
    payload: { file: image },
    onProgress: (event) => {
      console.log("file uploading:", event);
    },
  });
  const imageMessage = await fnImageSize(message);
  return imageMessage;
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
  if (message.type === "TIMRelayElem" && message.payload.downloadKey !== "") {
    try {
      await tim.downloadMergerMessage(message);
    } catch (imError) {
      console.warn("downloadMergerMessage error:", imError);
    }
  }
};
