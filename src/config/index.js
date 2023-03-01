import axios from "axios";

let config = {};
const VUE_APP_PUBLIC_PATH = process.env.VUE_APP_PUBLIC_PATH;

const setConfig = (cfg) => {
  config = Object.assign(config, cfg);
};

const getConfig = (key) => {
  if (typeof key === "string") {
    const arr = key.split(".");
    if (arr && arr.length) {
      let data = config;
      arr.forEach(v => {
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

/** 获取项目动态全局配置 */
export const getServerConfig = async (app) => {
  app.config.globalProperties.$config = getConfig();
  return axios({
    method: "get",
    url: `${VUE_APP_PUBLIC_PATH}serverConfig.json`
  })
    .then(({ data: config }) => {
      let $config = app.config.globalProperties.$config;
      // 自动注入项目配置
      if (app && $config && typeof config === "object") {
        $config = Object.assign($config, config);
        app.config.globalProperties.$config = $config;
        // 设置全局配置
        setConfig($config);
      }
      return $config;
    })
    .catch(() => {
      throw "请在public文件夹下添加serverConfig.json配置文件";
    });
};

export { getConfig, setConfig };
