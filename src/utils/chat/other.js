// import ScreenShot from "js-web-screen-shot";
import { convertBlobUrlToDataUrl } from "@/utils/chat/index";

export function checkTextNotEmpty(arr) {
  return arr.some((obj) => {
    return obj.children.some((child) => {
      return child.text !== "";
    });
  });
}

// 处理文本类型的消息
function transformTextElement(data) {
  return {
    role: data.flow === "in" ? "assistant" : "user",
    content: data.payload.text,
  };
}

// 处理图像类型的消息
async function transformImageElement(data) {
  const imageUrl = await convertBlobUrlToDataUrl(data.elements[0]._imageMemoryURL);
  return {
    role: data.flow === "in" ? "assistant" : "user",
    content: [
      // {
      //   text: "",
      //   type: "text",
      // },
      {
        image_url: {
          detail: "auto",
          url: imageUrl,
        },
        type: "image_url",
      },
    ],
  };
}

export async function transformData(data) {
  try {
    const relevantData = data.filter((item) => {
      return (
        !item.isTimeDivider && !item.isDeleted && !item.isRevoked && item.type !== "TIMCustomElem"
      );
    });

    const transformedData = await Promise.all(
      relevantData.map(async (item) => {
        if (item.type === "TIMTextElem") {
          return transformTextElement(item);
        } else if (item.type === "TIMImageElem") {
          return await transformImageElement(item);
        }
      })
    );

    return transformedData.reverse();
  } catch (error) {
    console.error("Error transforming data:", error);
    return [];
  }
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
  } else if (fileType == "txt" || fileType == "log") {
    type = "txt";
  } else if (fileType == "pdf") {
    type = "pdf";
  } else if (["png", "jpg", "gif", "jpeg", "webp", "svg"].includes(fileType)) {
    type = "picture";
  } else if (fileType == "mp4") {
    type = "video";
  } else if (fileType == "mp3") {
    type = "audio";
  } else if (fileType == "exe") {
    type = "exe";
  } else if (fileType == "json") {
    type = "json";
  } else if (fileType == "js") {
    type = "js";
  } 
  // else if (fileType == "env") {
  //   type = "dotenv";
  // }
  return new URL(`../../assets/message/${type}.png`, import.meta.url).href;
};

export function screenshot(fn) {
  // new ScreenShot({
  //   enableWebRtc: true,
  //   level: 999,
  //   completeCallback: fn,
  //   closeCallback: fn,
  // });
}
