// import ScreenShot from "js-web-screen-shot";
import { isEmpty } from "lodash-es";
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

export function transformCustomElement(item) {
  // 检查 description 是否符合期待的值
  if (item?.payload?.description !== "tool_call") {
    return {};
  }

  try {
    // JSON 解析，解析失败将抛出错误
    const input = JSON.parse(item.payload.data);

    // 安全提取工具调用数据 (tool_call)
    const toolCall = input.data.message.choices[0]?.message?.tool_calls;
    if (!toolCall) {
      throw new Error("Tool call data is missing in the input payload");
    }

    // 构建返回格式化数据
    const data = [
      {
        content: "",
        role: "assistant",
        tool_calls: toolCall,
      },
      {
        role: "tool",
        name: toolCall[0].function?.name,
        content: item.payload.extension,
        tool_call_id: toolCall[0].id,
      },
    ];

    return data;
  } catch (error) {
    console.warn("transformCustomElement error", error);
    return {}
  }
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
  if (!data || !Array.isArray(data)) {
    console.warn("data is undefined, null, or not an array");
    return [];
  }

  try {
    const relevantData = data.filter((item) => {
      return (
        !item.isTimeDivider &&
        !item.isDeleted &&
        !item.isRevoked
      );
    });

    // 定义处理逻辑的 map，把 type 与对应的处理方法映射起来
    const transformMap = {
      TIMTextElem: transformTextElement,
      TIMCustomElem: transformCustomElement,
      TIMImageElem: transformImageElement,
    };

    // 处理批量异步任务
    const transformedData = await Promise.all(
      relevantData.map(async (item) => {
        const transformFn = transformMap[item.type];
        return transformFn ? transformFn(item) : null;
      })
    );

    // 过滤非空元素并返回一维展平数组
    return transformedData.reverse().filter((t) => !isEmpty(t)).flat();
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