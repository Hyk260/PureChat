/**
 * 项目默认配置项
 *
 *
 */

const config = {
  menu: {
    locale: false,
  },
  iconfontUrl: "",
  REST_API: process.env.VUE_APP_PROXY_REST_API,
  BASE_API: process.env.VUE_APP_PROXY_DOMAIN_REAL,
};
export default config;
