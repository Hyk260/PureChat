import store from "@/store";
import { throttle } from "lodash-es";
import { msgContent } from "@/api/im-sdk-api/custom";
/**
 * 将二进制数据转换为 base64 URL 格式
 * @param {string | Buffer} data 要转换的数据，可以是一个字符串或一个 Buffer 对象
 * @param {string} type 数据类型，默认为 "jpeg"
 * @returns {string} 转换后的 base64 URL
 * @throws {Error} 如果缺少数据或数据不是字符串或缓冲区，则会抛出错误
 */
export const bufferToBase64Url = (data, type = "jpeg") => {
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
 * 将给定的图片文件转换为 base64 编码的 URL
 * @param {File} file - 要转换的图片文件
 * @returns {Promise<string>} - 返回一个 Promise，解析为图片的 base64 编码的 URL
 */
export const fileImgToBase64Url = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64Value = reader.result;
      resolve(base64Value);
    };
    reader.readAsDataURL(file);
  });
};

/**
 * 将远程图片 URL 转换为 base64 格式
 * @param {string} url 图片的 URL
 * @returns {Promise<string>} Promise 对象，resolve 后会返回转换后的 base64 数据
 * @throws {Error} 如果转换失败，则会抛出错误
 */
export const urlToBase64 = (url) => {
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
export const getImageType = (str) => {
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
 * @param {string} String - 查询字符串，例如 "https://pureadmin.cn?name=John&age=30"
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

export const fnReplyContent = (msg) => {
  const type = msg?.type;
  const reply = TypeMap[type] || "";
  if (reply) {
    return reply;
  } else {
    return msg?.payload?.text;
  }
};

export function getReplyMsgContent(reply) {
  if (!reply) return "";
  const replyMsgContent = JSON.stringify({
    messageReply: {
      messageID: reply.ID,
      messageAbstract: fnReplyContent(reply),
      messageSender: reply.nick,
      messageType: 0,
      version: "1",
    },
  });
  return replyMsgContent;
}

export function getCustomMsgContent(type) {
  return JSON.stringify(msgContent(type));
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
  const marker = 1024; // Change to 1000 if required
  const decimal = 2; // Change as required
  const kiloBytes = marker;
  const megaBytes = marker * marker;
  const gigaBytes = marker * marker * marker;
  // const lang = store.state.settings.lang;
  const lang = "zh";
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
export const scrollToDomPostion = (msgid) => {
  const dom = document.getElementById(`${msgid}`);
  if (!dom) {
    store.commit("showMessage", { message: "无法查看上下文", type: "warning" });
    return;
  }
  dom.scrollIntoView({ behavior: "smooth", block: "center" });
  dom.classList.add("shrink-style");
  setTimeout(() => {
    dom.classList.remove("shrink-style");
  }, 2000);
};

export const createProgressHandler = () => {
  let lastNum = 0;
  const handleProgressUpdate = throttle((progress, cd) => {
    if (progress.num !== lastNum) {
      lastNum = progress.num;
      if (typeof cd === "function") cd();
    }
  }, 80);
  return handleProgressUpdate;
};

// 匹配机器人账号
export const isRobot = (text) => {
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
