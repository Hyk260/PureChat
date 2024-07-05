import pkg from "~/package.json";
export const noService = import.meta.env.VITE_NO_SERVICE === "Y"

const { version, description } = pkg;
let config = {
  Version: "",
  Title: description,
};

/**
 * 设置配置项
 * @param {Object} cfg - 需要设置的配置对象
 */
const setConfig = (cfg) => {
  config = { ...config, ...cfg };
};

/**
 * 获取配置项或整个配置对象
 * @param {string} key - 可选，如果提供，获取指定键的配置项
 * @returns {Object} - 返回配置对象或指定键的配置项
 */
const getConfig = (key) => {
  if (typeof key === "string") {
    const arr = key.split(".");
    if (arr && arr.length) {
      let data = config;
      arr.forEach((v) => {
        if (data && typeof data[v] !== "undefined") {
          data = data[v];
        } else {
          data = null;
        }
      });
      return data;
    }
  }
  return config;
};

/**
 * 获取项目动态全局配置
 * @param {Object} app - Vue app 对象
 */
export const getServerConfig = (app) => {
  try {
    let $config = getConfig();
    // 自动注入项目配置
    if (app && $config) {
      $config = { ...$config, Version: version };
      app.config.globalProperties.$config = $config;
      // 设置全局配置
      setConfig($config);
    }
    return $config;
  } catch (error) {
    throw error;
  }
};

export { getConfig, setConfig };
