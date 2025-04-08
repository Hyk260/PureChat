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
  let content = data.payload.text

  if (!isEmpty(data.cloudCustomData)) {
    try {
      const customData = JSON.parse(data.cloudCustomData);
      if (customData?.webSearch) {
        content = customData.webSearch?.messageAbstract;
      }
    } catch (error) {
      console.warn("transformTextElement error", error);
    }
  }

  return {
    role: data.flow === "in" ? "assistant" : "user",
    content,
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
    return transformedData.filter((t) => !isEmpty(t)).flat();
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
  // 统一转换为小写，避免大小写问题
  const lowerCaseFileType = fileType.toLowerCase();

  // 文件类型与图标类型的映射
  const fileTypeToIconMap = {
    xlsx: "form",
    xls: "form",
    doc: "document",
    docx: "document",
    pptx: "ppt",
    ppt: "ppt",
    rar: "zip",
    zip: "zip",
    txt: "txt",
    log: "txt",
    pdf: "pdf",
    png: "picture",
    jpg: "picture",
    gif: "picture",
    jpeg: "picture",
    webp: "picture",
    svg: "picture",
    mp4: "video",
    mp3: "audio",
    exe: "exe",
    json: "json",
    js: "js",
    // env: "dotenv", // 如果需要启用 dotenv 图标，取消注释
  };

  // 获取图标类型，默认为 "default"
  const type = fileTypeToIconMap[lowerCaseFileType] || "default";

  // 返回图标路径
  return new URL(`../../assets/message/${type}.png`, import.meta.url).href;
};