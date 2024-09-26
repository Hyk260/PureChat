import {
  createFiletMsg,
  createImgtMsg,
  createTextAtMsg,
  createTextMsg,
  createVideoMsg,
} from "@/api/im-sdk-api/index";
import store from "@/store/index";
import { TIM_PROXY } from "@/constants/index";
import { localStg } from "@/utils/storage";
import { dataURLtoFile, getBlob, getFileType } from "@/utils/chat/index";
import emitter from "@/utils/mitt-bus";
import { useClipboard } from "@vueuse/core";
import { match } from "pinyin-pro";
import { nextTick } from "vue";
import { placeholderMap } from "./configure";

import CustomElemItem from "../ElemItemTypes/CustomElemItem.vue";
import FileElemItem from "../ElemItemTypes/FileElemItem.vue";
import GroupSystemNoticeElem from "../ElemItemTypes/GroupSystemNoticeElem.vue";
import ImageElemItem from "../ElemItemTypes/ImageElemItem.vue";
import RelayElemItem from "../ElemItemTypes/RelayElemItem.vue";
import TextElemItem from "../ElemItemTypes/TextElemItem.vue";
import TipsElemItem from "../ElemItemTypes/TipsElemItem.vue";
import VideoElemItem from "../ElemItemTypes/VideoElemItem.vue";
import groupTipElement from "../ElemItemTypes/groupTipElement.vue";

export const dragControllerDiv = (node) => {
  let dragElement = document.getElementById("drag"); //滑块
  let chatBox = document.getElementById("chat-box"); //聊天框
  let editor = document.getElementById("editor"); //编辑器
  let container = document.getElementById("container"); //整个盒子
  // 按下鼠标执行
  dragElement.onmousedown = (e) => {
    let startY = e.clientY; //鼠标按下 起始Y
    let startTop = dragElement.offsetTop;
    // 鼠标移到时
    document.onmousemove = (e) => {
      let endY = e.clientY; //鼠标移动 结束的y
      // 移动距离 = 原来高度+（结束y-开始y）
      let moveLen = startTop + (endY - startY);
      let boxHeight = container.clientHeight;
      // 最大移动距离 = 整个盒子高度
      let maxT = boxHeight;
      // 控制移动最小
      if (moveLen < 200) moveLen = 200;
      // 控制移动最大
      if (moveLen > maxT - 200) moveLen = maxT - 200;
      chatBox.style.height = `${moveLen - 60}px`;
      editor.style.height = `${boxHeight - moveLen}px`;
    };
    // 鼠标松开时
    document.onmouseup = () => {
      document.onmousemove = null;
      document.onmouseup = null;
      // 手动更新滚动条高度
      node.updateScrollbar();
    };
    return false;
  };
};

export const validatelastMessage = (list) => {
  return (
    list
      .slice()
      .reverse()
      .find((msg) => msg.ID) || null
  );
};

// 复制
export const handleCopyMsg = async (data) => {
  const { elements } = data;
  const { content, type } = elements[0];
  // 文本
  if (type === "TIMTextElem") {
    const { text, copy, isSupported } = useClipboard({ source: content.text });
    if (isSupported) {
      copy(content.text);
      store.commit("showMessage", { message: "复制成功" });
    } else {
      store.commit("showMessage", { message: "您的浏览器不支持剪贴板API" });
    }
  }
  // 图片
  if (type === "TIMImageElem") {
    const url = content.imageInfoArray[0].imageUrl;
    const imageBlob = await getBlob(url);
    // 创建一个空的 ClipboardItem 对象，并将图片添加到其中
    const clipboardItem = new ClipboardItem({ "image/png": imageBlob });
    // 将 ClipboardItem 对象添加到剪贴板
    navigator.clipboard
      .write([clipboardItem])
      .then(() => {
        store.commit("showMessage", { message: "图片复制成功" });
      })
      .catch((error) => {
        console.error("写入剪贴板时出错:", error);
      });
  }
};

export const GroupSystemNotice = (message) => {
  console.log("GroupSystemNotice", message);
  const groupName = message.payload.groupProfile.name || message.payload.groupProfile.groupID;
  switch (message.payload.operationType) {
    case 1:
      return `${message.payload.operatorID} 申请加入群组：${groupName}`;
    case 2:
      return `成功加入群组：${groupName}`;
    case 3:
      return `申请加入群组：${groupName}被拒绝`;
    case 4:
      return `你被管理员${message.payload.operatorID}踢出群组：${groupName}`;
    case 5:
      // ${message.payload.operatorID}
      return `群：${groupName} 已被管理员解散`;
    case 6:
      return `${message.payload.operatorID}创建群：${groupName}`;
    case 7:
      // ${message.payload.operatorID}
      return `管理员邀请你加群：${groupName}`;
    case 8:
      return `你退出群组：${groupName}`;
    case 9:
      return `你被${message.payload.operatorID}设置为群：${groupName}的管理员`;
    case 10:
      return `你被${message.payload.operatorID}撤销群：${groupName}的管理员身份`;
    case 12:
      return `${message.payload.operatorID}邀请你加群：${groupName}`;
    case 13:
      return `${message.payload.operatorID}同意加群：${groupName}`;
    case 14:
      return `${message.payload.operatorID}拒接加群：${groupName}`;
    case 255:
      return "自定义群系统通知: " + message.payload.userDefinedField;
    default:
      return "待开发";
  }
};

// 动态class
export const msgType = (elem_type) => {
  let resp = "";
  switch (elem_type) {
    case "TIMTextElem":
      resp = "message-view__text"; // 文本
      break;
    case "TIMGroupTipElem":
      resp = "message-view__tips-elem"; // 群消息提示
      break;
    case "TIMImageElem":
      resp = "message-view__img"; // 图片消息
      break;
    case "TIMFileElem":
      resp = "message-view__file"; // 文件消息
      break;
    case "TIMGroupSystemNoticeElem":
      resp = "message-view__system"; // 系统通知
      break;
    case "TIMCustomElem":
      resp = "message-view__text message-view__custom"; // 自定义消息
      break;
    default:
      resp = "";
      break;
  }
  return resp;
};

export const msgOne = (item) => {
  const { isRevoked, type, payload } = item;
  if (isRevoked || type === "TIMGroupTipElem" || payload?.description === "dithering") {
    return "message-view__tips-elem";
  } else {
    return "message-view__item--index";
  }
};
// 动态组件
export const loadMsgModule = (item) => {
  const { type, isRevoked, payload } = item;
  const messageComponentMap = {
    TIMTextElem: TextElemItem, //文本消息
    TIMRelayElem: RelayElemItem, // 合并转发消息
    TIMImageElem: ImageElemItem, // 图片消息
    TIMFileElem: FileElemItem, // 文件消息
    TIMVideoFileElem: VideoElemItem, // 视频消息
    TIMCustomElem: CustomElemItem, // 自定义消息
    TIMGroupTipElem: groupTipElement, // 群消息提示
    TIMGroupSystemNoticeElem: GroupSystemNoticeElem, // 系统通知
  };
  if (isRevoked) return TipsElemItem;
  if (type === "TIMCustomElem" && payload?.description === "dithering") {
    return TipsElemItem;
  }
  return messageComponentMap[type] || null;
};

/**
 * 将字符串中的特殊字符进行 HTML 转义
 * @param {string} str - 待转义的字符串
 * @returns {string} - 转义后的字符串
 */
export const html2Escape = (str) => {
  const map = { "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;" };
  return str.replace(/[<>&"]/g, (c) => map[c]);
};

/**
 * 发送聊天消息
 */
export async function sendChatMessage(options) {
  console.log("options", options);
  const Message = [];
  const {
    convId,
    convType,
    textMsg,
    aitStr,
    aitlist,
    files = [],
    video = [],
    image = [],
    reply,
  } = options;

  // @消息
  if (aitStr) {
    Message.push(
      createTextAtMsg({ convId, convType, textMsg: aitStr, atUserList: aitlist, reply })
    );
  }
  // 文本消息
  else if (textMsg) {
    Message.push(createTextMsg({ convId, convType, textMsg, reply }));
  }

  // 处理图片消息
  for (const t of image) {
    const img = await createImgtMsg({ convId, convType, image: dataURLtoFile(t.src) });
    Message.push(img);
  }

  // 处理文件消息
  for (const t of files) {
    const file = createFiletMsg({ convId, convType, files: dataURLtoFile(t.link, t.fileName) });
    Message.push(file);
  }

  // 处理视频消息
  for (const t of video) {
    const vid = createVideoMsg({ convId, convType, video: dataURLtoFile(t.link, t.fileName) });
    Message.push(vid);
  }

  return Message;
}

export const customAlert = (s, t) => {
  switch (t) {
    case "success":
      console.log("success");
      break;
    case "info":
      console.log("info");
      break;
    case "warning":
      console.log("warning");
      break;
    case "error":
      console.log("error");
      break;
    default:
      console.log("default");
      break;
  }
};

export const chatName = (item) => {
  switch (item.type) {
    case "C2C":
      return item.userProfile.nick || item.userProfile.userID;
    case "GROUP":
      return item.groupProfile.name;
    case "@TIM#SYSTEM":
      return "系统通知";
    default:
      return "";
  }
};
// 是否全员群
export const isallStaff = (item, field = "all_staff") => {
  return item?.groupProfile?.groupCustomField?.[0]?.value == field;
};

/**
 * 将包含表情图像的 HTML 字符串转换为对应的表情符号文本
 * @param {string} html - 待转换的 HTML 字符串
 * @param {Array} emojiMap - 表情符号和对应的图像数据数组
 * @returns {string} - 转换后的结果
 * <p>12<img src="*" alt="[我最美]" />333</p>
 * 12[我最美]333
 */
export function convertEmoji(editor) {
  const html = editor.getHtml(); // 非格式化的 html
  const emojiMap = editor.getElemsByType("image"); // 所有图片
  if (!html || !emojiMap || !Array.isArray(emojiMap)) return "";
  const filtered = emojiMap.filter((item) => item.class === "EmoticonPack");
  if (filtered.length == 0) return "";
  const convertedData = filtered.map((item) => ({ [item.src]: item.alt }));
  const extended = { ...Object.assign(...convertedData) };
  // 清除文件消息包含的字符串
  const fileRegex = /<span\s+data-w-e-type="attachment"[^>]*>(.*?)<\/span>/g;
  let str = html.replace(fileRegex, "");
  // 替换表情包图片为字符串 -> '[**]'
  const regex = /<img src="([^"]+)"[^>]+>/g;
  const result = str.replace(regex, (match, src) => {
    const emojiText = extended[src] || "";
    return emojiText;
  });
  const text = result.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, "");
  return text;
}

/**
 * 提取图片信息
 */
export const extractImageInfo = (editor) => {
  let images = null;
  const image = editor.getElemsByType("image");
  // 过滤表情包消息
  images = image.filter((item) => item.class !== "EmoticonPack");
  return { images };
};
function isVideoFile(fileName) {
  const video = ["mp4", "wmv", "webm"];
  const name = fileName.toLowerCase();
  const regex = new RegExp(`(${video.join("|")})$`, "i");
  return regex.test(name);
}
/**
 * 提取文件信息
 */
export const extractFilesInfo = (editor) => {
  const file = [];
  const files = editor.getElemsByType("attachment");
  files.map((t) => !isVideoFile(getFileType(t.fileName)) && file.push(t));
  return { files: file };
};
/**
 * 提取视频信息
 */
export const extractVideoInfo = (editor) => {
  const video = [];
  const files = editor.getElemsByType("attachment");
  files.map((t) => isVideoFile(getFileType(t.fileName)) && video.push(t));
  return { video };
};

/**
 * 从编辑器中提取 Ait 信息
 * @param {Object} editor - 编辑器对象，包含编辑器的内容和方法
 * @returns {Object} - 包含提及字符串和提及的 id 列表的对象
 */
export const extractAitInfo = (editor) => {
  let aitStr = "";
  let aitlist = [];
  const html = editor.getHtml();
  const mention = editor.getElemsByType("mention");
  if (mention.length) {
    // 清除文件消息包含的字符串
    const fileRegex = /<span\s+data-w-e-type="attachment"[^>]*>(.*?)<\/span>/g;
    let str = html.replace(fileRegex, "");
    // 清除 HTML 标签和 &nbsp
    aitStr = str.replace(/<[^>]+>/g, "").replace(/&nbsp;/gi, "");
    mention.forEach((t) => aitlist.push(t.info.id));
    aitlist = Array.from(new Set(aitlist));
  }
  return { aitStr, aitlist };
};

/**
 * 比较两个用户的 userID，用于排序 机器人排在首位
 * @param {Object} a - 第一个用户对象
 * @param {Object} b - 第二个用户对象
 * @returns {number} - 返回比较结果，-1 表示 a 在 b 前面，1 表示 b 在 a 前面，0 表示相等
 */
export const compareUserID = (a, b) => {
  const aHasRBT = a.userID.includes("@RBT#");
  const bHasRBT = b.userID.includes("@RBT#");
  return aHasRBT && !bHasRBT ? -1 : bHasRBT && !aHasRBT ? 1 : 0;
};

/**
 * 根据拼音搜索当前成员列表中的匹配项。
 * @param {string} searchStr - 要搜索的拼音字符串。
 * @returns {Array} - 匹配项的数组。
 */
export function searchByPinyin(searchStr) {
  // debugger;
  // 获取当前成员列表
  const memberList = store.state?.groupinfo?.currentMemberList;
  // 过滤掉当前用户的信息
  const filteredList = memberList.filter(
    (member) => member.userID !== store.state?.user.userProfile.userID
  );
  // 如果过滤后的列表为空，触发空结果的事件并返回
  if (!filteredList || filteredList.length === 0) {
    emitter.emit("setMentionModal", { type: "empty" });
    return "empty";
  }
  // 存储匹配项的索引
  const indices = [];
  // 遍历过滤后的成员列表
  filteredList.forEach((item) => {
    // 使用 match 函数进行拼音匹配
    const nickPinyin = match(item.nick, searchStr);
    // 如果拼音匹配结果长度大于 0，将当前项添加到索引数组中
    if (nickPinyin?.length > 0) {
      indices.push(item);
    }
  });
  const isShowModal = store.state?.conversation.isShowModal;
  // 触发相应的事件根据匹配结果触发不同的操作
  const eventType = indices.length === 0 ? "empty" : "success";
  if (!isShowModal && eventType === "success") {
    // store.commit("SET_MENTION_MODAL", true);
  }
  emitter.emit("setMentionModal", {
    content: indices,
    type: eventType,
    searchlength: searchStr.length + 1, // +1 包含@长度
  });
  return eventType;
}

/**
 * 根据输入的字符串过滤提及列表并触发相关操作。
 * @param {string} inputStr - 输入的字符串。
 */
export function filterMentionList(Str, Html) {
  // debugger;
  // 如果当前类型不是群聊
  if (store.getters.currentType !== "GROUP") return;
  const inputStr = Str;
  // 如果输入字符串为空，关闭提及模态框并返回
  if (inputStr === "") {
    store.commit("SET_MENTION_MODAL", false);
    return;
  }
  // 如果输入字符串中没有 "@" 符号，直接返回
  if (inputStr.lastIndexOf("@") == -1) {
    store.commit("SET_MENTION_MODAL", false);
    return;
  }
  // 如果输入字符串仅包含 "@" 符号，或则字符结尾，触发 setMentionModal 操作并返回
  if (inputStr === "@" && inputStr.endsWith("@")) {
    return "all";
  }
  emitter.emit("setMentionModal", { type: "updata" });
  // 获取最后一个 "@" 符号的索引位置
  const lastAtIndex = inputStr.lastIndexOf("@");
  // 如果找不到 "@" 符号，关闭提及模态框并返回
  if (lastAtIndex === -1) {
    store.commit("SET_MENTION_MODAL", false);
    return;
  }
  const text = inputStr.substring(lastAtIndex);
  const searchValue = text.substring(1);
  if (!searchValue) return;
  // 执行根据拼音搜索的操作
  return searchByPinyin(searchValue);
}

/**
 * 根据图片的宽度和高度计算展示图片的样式
 * @param {number} width - 图片宽度
 * @param {number} height - 图片高度
 * @returns {Object} - 包含展示图片的宽度和高度的样式对象
 */
export const showIMPic = (width = 0, height = 0) => {
  // 确保高度不小于40px
  const minHeight = 40;

  // 计算宽度和高度的逻辑
  let computedWidth;
  let computedHeight;

  if (width >= 140) {
    computedWidth = 140;
    computedHeight = Math.max(Math.round((140 / width) * height), minHeight);
  } else if (width <= 35) {
    computedWidth = 45;
    computedHeight = Math.max(Math.round((45 / width) * height), minHeight);
  } else {
    computedWidth = width;
    computedHeight = Math.max(height, minHeight);
  }

  const imageStyle = {
    width: `${computedWidth}px`,
    height: `${computedHeight}px`,
  };

  return imageStyle;
};

/**
 * 获取图片的宽度和高度属性
 * @param {string} imageUrl - 图片地址
 * @returns {Promise<{width: number, height: number}>} - 包含图片宽度和高度的 Promise 对象
 * 'blob:http://localhost:8080/98f11c82-d402-4d7d-b49f-07a05bb75e89';
 */
export function getImageSize(imageUrl) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = function () {
      const width = this.width;
      const height = this.height;
      resolve({ width, height });
    };
    img.onerror = function () {
      reject(new Error("Failed to load image"));
    };
    img.src = imageUrl;
  });
}

export function getOperatingSystem(userAgent = navigator.userAgent) {
  if (userAgent.includes("Windows")) {
    return "Windows";
  } else if (userAgent.includes("Macintosh")) {
    return "macOS";
  } else {
    return "";
  }
}

export const handleToggleLanguage = () => {
  const placeholder = document.querySelector(".w-e-text-placeholder");
  if (placeholder) placeholder.innerHTML = placeholderMap.value["input"];
};

export const handleEditorKeyDown = async () => {
  await nextTick();
  // 解决@好友上键切换光标移动问题
  const container = document.querySelector(".w-e-text-container");
  if (!container) return;
  container.onkeydown = (e) => {
    // 键盘上下键
    if (store.state?.conversation.isShowModal) {
      if ([38, 40].includes(e.keyCode)) {
        return false;
      }
    }
  };
};

export const getAssetsFile = (url) => {
  return new URL(`../../../assets/emoji/${url}`, import.meta.url).href;
};

export const isSelf = (item) => {
  return item.from === localStg.get(TIM_PROXY)?.userProfile?.userID;
};

export const formatContent = (data) => {
// console.log("formatContent:", data);
 return data
   .filter((item) => item.type === "paragraph")
   .map(({ children }) => {
     return (
       children
         ?.map((t) => {
           if (t.type === "image" && t?.alt && t?.class === "EmoticonPack") return t.alt;
           if (t.type === "image") return "[图片]";
           if (t.type === "attachment") return "[文件]";
           if (t.type === "mention") return `@${t.value}`;
           return t.text || ""; // 处理文本
         })
         .join("") || "" // 确保返回字符串
     );
   })
   .join("");
};
