import dayjs from "dayjs";
import { localStg } from "@/utils/storage";
import { localStgThemeScheme } from "@/theme/settings";
import manifest from "@/database/manifest/index";

const title = import.meta.env.VITE_APP_NAME;

function toggleHtmlClass(theme) {
  document.body.setAttribute("data-theme", theme);
  document.documentElement.classList[theme === "dark" ? "add" : "remove"]("dark");
}
/**
 * 切换主题风格
 * @param {string}  themeScheme light || dark || auto
 */
export function setTheme(themeScheme = "light") {
  localStgThemeScheme(themeScheme);
  const isAuto = themeScheme === "auto";
  const systemThemeQuery = window.matchMedia("(prefers-color-scheme: light)");

  const theme = isAuto ? (systemThemeQuery.matches ? "light" : "dark") : themeScheme;
  toggleHtmlClass(theme);

  // 监听系统主题变化，仅在自动模式下生效
  if (isAuto) {
    systemThemeQuery.addEventListener("change", (e) => {
      if (localStg.get("themeSettings") === "auto") {
        toggleHtmlClass(e.matches ? "light" : "dark");
      }
    });
  }
}

export const isElectron = !!window?.electron; // 是否是electron环境

export function setPageTitle(routerTitle) {
  if (isElectron) return;
  document.title = routerTitle ? `${routerTitle} | ${title}` || title : title;
}

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

export const getAssetsFile = (url) => {
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


/**
 * 根据指定的 Key 和 Type 获取插件数据
 * @param params.key 搜索的键值
 * @param params.type 搜索的键名 (默认值: 'identifier')
 * @returns 匹配的插件对象，包含 `imageUrl` 属性
 */
export function getPlugin({
  key = "",
  type = "identifier",
} = {}) {
  // 从 plugins 中搜索匹配项
  const plugin = manifest.plugins.find(
    (item) => item[type] === key
  );

  if (!plugin) {
    console.error(`Plugin with ${type} = "${key}" not found.`);
    return null;
  }

  return {
    ...plugin,
    imageUrl: new URL(`../../../assets/images/plugin/${plugin.meta?.avatar}`, import.meta.url).href
  };
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