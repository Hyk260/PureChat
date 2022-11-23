/* eslint-disable no-irregular-whitespace */
import url from "url";
import path from "path";
import os from "os";

// buffer to Base64
export const bufferToBase64Url = (data, type) => {
  const buffer = new Buffer(data, "binary");
  return `data:image/${type};base64,` + buffer.toString("base64");
};
// File to base64
export const fileImgToBase64Url = async (file) => {
  return new Promise((res) => {
    const reader = new FileReader();
    reader.onload = function (e) {
      const base64Value = e.target.result;
      // target.result 该属性表示目标对象的DataURL
      res(base64Value);
    };
    reader.readAsDataURL(file);
  });
};
// 网络地址 to base64
export const urlToBase64 = (url) => {
  return new Promise((resolve, reject) => {
    let image = new Image();
    image.onload = function () {
      let canvas = document.createElement("canvas");
      canvas.width = this.naturalWidth;
      canvas.height = this.naturalHeight;
      canvas.getContext("2d").drawImage(image, 0, 0);
      let result = canvas.toDataURL("image/png");
      resolve(result);
    };
    image.setAttribute("crossOrigin", "Anonymous");
    image.src = url;
    image.onerror = () => {
      reject(new Error("转换失败"));
    };
  });
};
// 图片类型
export const getImageType = (str) => {
  const reg = /\.(png|jpg|gif|jpeg|webp)$/;
  return str.match(reg)[1];
};
// base64 to File
export const dataURLtoFile = (dataUrl, fileName) => {
  var arr = dataUrl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], fileName, { type: mime });
};
