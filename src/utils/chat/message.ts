
import { localStg } from "@/utils/storage";

export const isTime = (item) => {
  return item?.isTimeDivider && item.time !== undefined;
};

export const isSelf = (item) => {
  return item.from === localStg.get("timProxy")?.userProfile?.userID;
};

export const msgOne = (item) => {
  const { isRevoked, type, payload } = item;
  if (isRevoked || type === "TIMGroupTipElem") {
    return "message-view-tips-elem";
  } else {
    return "message-view-item-index";
  }
};

export const msgType = (elem_type) => {
  let resp = "";
  switch (elem_type) {
    case "TIMTextElem":
      resp = "message-view__text"; // 文本
      break;
    case "TIMGroupTipElem":
      resp = "message-view-tips-elem"; // 群消息提示
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

/**
 * 根据图片的宽度和高度计算展示图片的样式
 * @param {number} width - 图片宽度
 * @param {number} height - 图片高度
 * @returns {Object} - 包含展示图片的宽度和高度的样式对象
 */
export const showIMPic = (width = 0, height = 0) => {
  // 确保高度不小于40px
  const minHeight = 40;
  // 限制高度不超过360px
  const maxHeight = 360;

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

  computedHeight = Math.min(computedHeight, maxHeight);

  const imageStyle = {
    width: `${computedWidth}px`,
    height: `${computedHeight}px`,
  };

  return imageStyle;
};

export const formatContent = (data) => {
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