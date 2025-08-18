import { nextTick } from "vue";
import { isEmpty, throttle } from 'lodash-es';
import { useAppStore } from "@/stores/index";
import emitter from "@/utils/mitt-bus";

/**
 * 将二进制数据转换为 base64 URL 格式
 */
export const bufferToBase64Url = (data: string | Buffer, type = "jpeg") => {
  if (!data) {
    throw new Error("缺少数据");
  }
  if (typeof data === "string") {
    data = Buffer.from(data, "binary");
  } else if (!(data instanceof Buffer)) {
    throw new Error("数据必须是字符串或缓冲区");
  }
  return `data:image/${type};base64,${data.toString("base64")}`;
};

/**
 * 将 File 对象转换为 Base64 字符串
 */
export const fileToBase64 = (file: File) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(file);
  });
};

// 使用 fetch API 来获取 Blob 对象
// 'blob:http://localhost:8080/d5d25c...' => 'data:image/...'
export async function convertBlobUrlToDataUrl(blobUrl: string) {
  try {
    const response = await fetch(blobUrl);
    const blob = await response.blob();
    const dataUrl = await fileToBase64(blob as File);
    return dataUrl;
  } catch (error) {
    console.error("Error converting blob to data URL:", error);
    return "";
  }
}

/**
 * @description: base64 to blob
 */
export const dataURLtoBlob = (base64Buf: string) => {
  const arr = base64Buf.split(',')
  const typeItem = arr[0]
  const mime = typeItem.match(/:(.*?);/)?.[1]
  const bstr = window.atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], { type: mime })
}

/**
 * 将远程图片 URL 转换为 base64 格式
 * @param {string} url 图片的 URL
 * @returns {Promise<string>} Promise 对象，resolve 后会返回转换后的 base64 数据
 * @throws {Error} 如果转换失败，则会抛出错误
 */
export const urlToBase64 = (url: string) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = function () {
      const canvas = document.createElement("canvas");
      canvas.width = this.naturalWidth;
      canvas.height = this.naturalHeight;
      canvas.getContext("2d").drawImage(image, 0, 0);
      const result = canvas.toDataURL("image/png");
      resolve(result);
    };
    image.setAttribute("crossOrigin", "Anonymous");
    image.src = url;
    image.onerror = () => {
      reject(new Error("转换失败"));
    };
  });
};

/**
 * 获取图片的类型
 * @param {string} str 图片的 URL 或文件名
 * @returns {string} 图片的类型（不包括前缀点号），例如 "png"、"jpg"、"gif" 等
 * @throws {Error} 如果无法从输入字符串中提取图像类型，则会抛出错误
 */
export const getImageType = (str: string) => {
  const reg = /\.(png|jpg|gif|jpeg|webp)$/;
  const match = str.match(reg);
  if (!match) {
    throw new Error("无法从输入字符串中提取图像类型");
  }
  return match[1];
};

/**
 * 返回给定文件名的类型，即文件的扩展名。
 * @param {string} filename - 包括扩展名的文件名。
 * @returns {string} 文件的扩展名，如果没有扩展名则返回空字符串。
 */
export const getFileType = (filename) => {
  if (!filename) return "";
  const lastPart = filename.split("/").pop();
  if (lastPart === ".") return "";
  const parts = lastPart.split(".");
  if (parts.length > 1) return parts.pop();
  return "";
};

/**
 * 将 base64 格式的数据转换为文件对象
 * @param {string} dataUrl base64 格式的数据，例如 "data:image/png;base64,iVBORw0KGg..."
 * @param {string} fileName 文件名，例如 "image.png"
 * @returns {File} 文件对象
 */
export const dataURLtoFile = (dataUrl, fileName = "image.png") => {
  var arr = dataUrl.split(","),
    mime = arr[0].match(/:(.*?);/)?.[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], fileName, { type: mime });
};

/**
 * 从 base64 字符串中提取 MIME 类型
 * @param base64 - 完整的 base64 字符串（包含 data: 前缀）
 * @returns 提取的 MIME 类型，如果无法提取则返回 undefined
 */
function extractMimeTypeFromBase64(base64) {
  const mimeTypeMatch = base64.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,/);
  return mimeTypeMatch?.[1];
}

/**
 * 将 Base64 字符串转换为 File 对象
 * @param base64 - Base64 字符串
 * @param filename - 生成的 File 对象的文件名
 * @param mimeType - 文件的 MIME 类型
 * @returns 转换后的 File 对象
 */
export function base64ToFile(base64, filename = "image.png", mimeType) {
  // 检查 base64 字符串格式
  if (!base64.startsWith('data:')) {
    throw new Error('Invalid base64 string format');
  }
  // 提取 MIME 类型（如果未显式提供）
  const detectedMimeType = mimeType || extractMimeTypeFromBase64(base64);
  if (!detectedMimeType) {
    throw new Error('Could not determine MIME type from base64 string');
  }
  // 从 base64 字符串中提取实际数据部分
  const base64Data = base64.split(',')[1];
  if (!base64Data) {
    throw new Error('Invalid base64 data');
  }
  // 将 base64 转换为二进制数据
  const binaryString = atob(base64Data);
  const bytes = new Uint8Array(binaryString.length);

  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  // 创建 Blob 并转换为 File
  const blob = new Blob([bytes], { type: mimeType });
  return new File([blob], filename, { type: mimeType });
}

/**
 * 获取文件 URL 的 Blob 对象
 * @param {string} url 文件 URL
 * @returns {Promise<Blob>} 文件 Blob 对象的 Promise
 */
export function getBlob(url) {
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.responseType = "blob";
    xhr.onload = () => {
      if (xhr.status === 200) {
        const blob = xhr.response;
        const image = new Image();
        image.onload = function () {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          canvas.width = image.width;
          canvas.height = image.height;
          ctx.drawImage(image, 0, 0);
          canvas.toBlob((convertedBlob) => {
            resolve(convertedBlob);
          }, "image/png");
        };
        image.src = URL.createObjectURL(blob);
      }
    };
    xhr.send();
  });
}

/**
 * 下载指定 url 的文件，并设置文件名
 * @param  {String} url - 文件地址
 * @param  {String} filename - 文件名
 */
export function download(url, filename) {
  fetch(url)
    .then((response) => response.blob())
    .then((blob) => {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
}

/**
 * 将查询字符串转换为对象
 * @param {string} String - 查询字符串，例如 "https://purechat.cn?name=John&age=30"
 * @return {object} - 转换后的对象，例如 { name: "John", age: "30" }
 */
export function queryStringToObject(queryString) {
  const str = queryString.split("?")[1];
  const params = new URLSearchParams(str);
  const obj = {};
  for (const [key, value] of params) {
    obj[key] = value;
  }
  return obj;
}

const TypeMap = {
  TIMImageElem: "[图片]",
  TIMFileElem: "[文件]",
  TIMRelayElem: "[合并消息]",
};

export const getAbstractContent = (data) => {
  const type = data?.type;
  const reply = TypeMap[type] || "";
  if (reply) {
    return reply;
  } else {
    return data?.payload?.text;
  }
};

export function getCloudCustomData(data, params) {
  if (isEmpty(data)) return "";
  const key = data?.key || "messageReply";
  const cloudCustomContent = JSON.stringify({
    [key]: {
      messageID: data?.ID || undefined,
      messageAbstract: getAbstractContent(data),
      messageSender: data?.nick || undefined,
      messageType: 0,
      version: __APP_INFO__.pkg.version || "",
      model: data?.model || "",
      ...params
    },
  });
  return cloudCustomContent;
}

/**
 * 匹配不包含 <img src= 的字符串
 * @param {string[]} arr - 包含字符串和图片链接的数组
 * @returns {string} - 返回第一个匹配到的不含图片链接的字符串，如果都含有图片链接则返回 undefined
 * ['<img src="image.png">', "some string", '<img src="image3.png">']
 * "some string"
 */
export function findNonImageString(arr) {
  const regex = /^((?!<img src=).)*$/;
  const result = arr.find((element) => regex.test(element));
  return result;
}

/**
 * 将字节数转换为可读性更强的单位
 * @param {number} bytes - 需要转换的字节数值
 * @returns {string} - 转换后的字符串，表示合适的单位和对应的数值
 */
export function bytesToSize(bytes) {
  const marker = 1024;
  const decimal = 2;
  const kiloBytes = marker;
  const megaBytes = marker * marker;
  const gigaBytes = marker * marker * marker;
  const lang = "en";

  if (bytes < kiloBytes) {
    return bytes + (lang === "en" ? " Bytes" : "字节");
  } else if (bytes < megaBytes) {
    return (bytes / kiloBytes).toFixed(decimal) + " KB";
  } else if (bytes < gigaBytes) {
    return (bytes / megaBytes).toFixed(decimal) + " MB";
  } else {
    return (bytes / gigaBytes).toFixed(decimal) + " GB";
  }
}

/**
 * 滚动到指定消息ID对应的DOM位置，并添加动画效果
 * @param {string} msgid - 消息的唯一标识符，用于查找对应的DOM元素
 */
export const scrollToDomPosition = (msgid) => {
  const dom = document.getElementById(`${msgid}`);
  if (!dom) {
    useAppStore().showMessage({ message: "无法查看上下文", type: "warning" });
    return;
  }
  dom.scrollIntoView({ behavior: "smooth", block: "center" });
  dom.classList.add("shrink-style");
  setTimeout(() => {
    dom.classList.remove("shrink-style");
  }, 2000);
};

export function scrollToMessage(id, delay = 300) {
  nextTick(() => {
    setTimeout(() => {
      const dom = document.getElementById(id);
      if (!dom) return;
      dom.scrollIntoView({ behavior: "smooth", block: "center" });
    }, delay);
  });
}

// 匹配机器人账号
export const isRobot = (text: string) => {
  return /@RBT#/.test(text);
};

export function readFromFile() {
  return new Promise((res, rej) => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "application/json";

    fileInput.onchange = (event) => {
      const file = event.target.files[0];
      const fileReader = new FileReader();
      fileReader.onload = (e) => {
        res(e.target.result);
      };
      fileReader.onerror = (e) => rej(e);
      fileReader.readAsText(file);
    };

    fileInput.click();
  });
}

const createProgressHandler = () => {
  let lastProgress = 0;
  const handleProgressUpdate = throttle((progress, callback) => {
    if (progress.num !== lastProgress) {
      lastProgress = progress.num;
      callback?.();
    }
  }, 50);
  return handleProgressUpdate;
};

const handleProgressUpdate = createProgressHandler();

export const fileUploading = (message, rawProgress = 0) => {
  const num = Math.round(rawProgress);

  handleProgressUpdate({ num }, () => {
    const uuid = message?.payload?.uuid || "";
    emitter.emit("fileUploading", { uuid, num });
    console.log("[file] uploading:", `${num}%`);
  });
};
