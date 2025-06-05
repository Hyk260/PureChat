import { loading, warning } from '@database/custom/index';
import dayjs from "dayjs";

export function formatTime(data) {
  return dayjs(data).format("YYYY-MM-DD HH:mm:ss"); // 2022-5-7 9:17:56
}

export const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
  navigator.userAgent
);

// Male Female
export const getGender = (data, type = "") => {
  return data?.gender === `Gender_Type_${type}`;
};

export const getTime = () => {
  return parseInt(new Date().getTime() / 1000);
}

/**
 * Detects Macintosh
 */
export function isMacOS() {
  if (typeof window !== "undefined") {
    let userAgent = window.navigator.userAgent.toLocaleLowerCase();
    const macintosh = /iphone|ipad|ipod|macintosh/.test(userAgent);
    return !!macintosh;
  }
  return false;
}

/**
 * 获取图片的宽度和高度属性
 * @param {string} imageUrl - 图片地址
 * @returns {Promise<{width: number, height: number}>} - 包含图片宽度和高度的 Promise 对象
 * 'blob:http://localhost:8080/98f11c82-d402-4d7d-b49f-07a05bb75e89';
 */
export function getImageSize(imageUrl) {
  return new Promise((resolve, reject) => {
    const img = new Image();

    // 图片加载成功时返回宽高
    img.onload = () => {
      resolve({ width: img.width, height: img.height });
    };

    // 图片加载失败时进行错误处理
    img.onerror = () => {
      reject(new Error("Failed to load image"));
    };

    // 设置图片的源
    img.src = imageUrl;
  });
}

// 计算并更新图片宽高
export const updateImageSize = async (imageInput, index = 0) => {
  const { imageInfoArray } = imageInput.payload;

  // 提前进行边界检查，避免数组索引越界
  if (index < 0 || index >= imageInfoArray.length) {
    throw new Error("Invalid image index provided");
  }

  const targetImage = imageInfoArray[index];

  // 获取宽高并更新目标图片的元数据
  const { width, height } = await getImageSize(targetImage.url);
  targetImage.width = width;
  targetImage.height = height;

  // 返回更新后的对象
  return imageInput;
};

export const getEmojiAssetUrl = (url) => {
  return new URL(`../assets/emoji/${url}`, import.meta.url).href;
};

export function getOperatingSystem(userAgent = navigator.userAgent) {
  if (userAgent.includes("Windows")) {
    return "Windows";
  } else if (userAgent.includes("Macintosh")) {
    return "macOS";
  } else {
    return "";
  }
}

export const createFileInput = (options) => {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = options.accept;
  input.style.display = "none";
  const handleChange = (event) => {
    const files = event.target.files;
    cleanup();
    options.onChange(files);
  };
  const handleWindowFocus = () => {
    setTimeout(() => {
      if (document.body.contains(input)) {
        cleanup();
        options.onChange(null);
      }
    }, 300);
  };
  const cleanup = () => {
    document.body.removeChild(input);
    input.removeEventListener("change", handleChange);
    window.removeEventListener("focus", handleWindowFocus);
  };
  input.addEventListener("change", handleChange);
  window.addEventListener("focus", handleWindowFocus);
  document.body.appendChild(input);

  input.click();
};

export function hasObjectKey(obj, key) {
  if (typeof obj !== 'object' || obj === null) {
    return false
  }

  return Object.keys(obj).includes(key)
}

export const openWindow = (
  url,
  {
    target = '_blank',
    noopener = true,
    noreferrer = true
  } = {}
) => {
  const features = [
    noopener && 'noopener=yes',
    noreferrer && 'noreferrer=yes'
  ].filter(Boolean).join(',');
  return window.open(url, target, features);
};

const collection = {
  "loading": loading,
  'warning': warning,
};

export function msgContent(data, type) {
  const _data = {
    data: {
      ...collection[type],
    },
    versions: __APP_INFO__.pkg.version,
    display: 0,
    onlyID: type,
    listMessage: ""
  };
  if (type === 'warning') {
    _data.data.body.text.value = data?.value || ""
    _data.data.body.text.provider = data?.provider || ""
  }
  return JSON.stringify(_data)
}

export function getCustomMsgContent({ data = null, type }) {
  return {
    data: msgContent(data, type),
    description: type,
    extension: "",
  }
}
