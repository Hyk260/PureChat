import axios from "axios";
import pkg from "~/package.json";

let config = {};
const { version } = pkg;
const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;

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
 * @returns {Promise<Object>} - 返回包含项目配置的 Promise 对象
 */
export const getServerConfig = async (app) => {
  try {
    const { data: configData } = await axios.get(`${VITE_BASE_URL}serverConfig.json`);
    let $config = getConfig();
    // 自动注入项目配置
    if (app && $config && typeof configData === "object") {
      $config = { ...$config, ...configData, Version: version };
      app.config.globalProperties.$config = $config;
      // 设置全局配置
      setConfig($config);
    }
    return $config;
  } catch (error) {
    throw "请在public文件夹下添加serverConfig.json配置文件";
  }
};

export { getConfig, setConfig };
