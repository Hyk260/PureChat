import ScreenShot from "js-web-screen-shot";

export function checkTextNotEmpty(arr) {
  return arr.some((obj) => {
    return obj.children.some((child) => {
      return child.text !== "";
    });
  });
}

export function transformData(data) {
  const inputData = data.filter(
    (item) => !item.isTimeDivider && !item.isDeleted && !item.isRevoked
  );
  return inputData
    .map((data) => {
      return {
        role: data.flow === "in" ? "assistant" : "user",
        content: data.payload.text,
      };
    })
    .reverse();
}

/**
 * 渲染文件图标
 * @param {string} fileType - 文件类型
 * @returns {string} - 图标路径
 */
export const renderFileIcon = (fileType = "") => {
  let type = "default";
  if (fileType == "xlsx" || fileType == "xls") {
    type = "form";
  } else if (fileType == "doc" || fileType == "docx") {
    type = "document";
  } else if (fileType == "pptx" || fileType == "ppt") {
    type = "ppt";
  } else if (fileType == "rar" || fileType == "zip") {
    type = "zip";
  } else if (fileType == "txt") {
    type = "txt";
  } else if (fileType == "pdf") {
    type = "pdf";
  } else if (["png", "jpg", "gif", "jpeg", "webp"].includes(fileType)) {
    type = "picture";
  } else if (fileType == "mp4") {
    type = "video";
  } else if (fileType == "mp3") {
    type = "audio";
  }
  return require(`@/assets/message/${type}.png`);
};

export function screenshot(fn) {
  new ScreenShot({
    enableWebRtc: true,
    level: 999,
    completeCallback: fn,
    closeCallback: fn,
  });
}
