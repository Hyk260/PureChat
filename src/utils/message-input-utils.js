/* eslint-disable no-irregular-whitespace */
import url from "url";
import path from "path";
import os from "os";

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
      // reader.result 表示文件的数据 URL
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
    // 使用 setAttribute 方法设置 crossOrigin 属性为 "Anonymous"，以便跨域加载图片。
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
  // 获取文件名的最后一个部分
  const lastPart = filename.split("/").pop();
  // 如果文件名只有一个点号，则返回空字符串
  if (lastPart === ".") return "";
  // 如果文件名包含多个点号，则返回最后一个点号之后的部分作为扩展名
  const parts = lastPart.split(".");
  if (parts.length > 1) return parts.pop();
  // 文件名中只有一个部分，没有扩展名
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
