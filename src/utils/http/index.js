import { ACCESS_TOKEN } from "@/constants/index";
import { localStg } from "@/utils/storage";
import { errorHandler } from "./tools";
import axios from "axios";
import { isElectron } from "@/utils/common";
// import { stringify } from "qs";

/** 请求白名单，放置一些不需要`token`的接口（通过设置请求白名单，防止`token`过期后再请求造成的死循环问题） */
const whiteList = ["/login"];

// 相关配置请参考：www.axios-js.com/zh-cn/docs/#axios-request-config-1
const defaultConfig = {
  // baseURL: "https://apichat.fun/", // 生产
  // baseURL: "http://localhost:8081/", // 开发
  baseURL: import.meta.env.VITE_SERVICE_BASE_URL,
  // 请求超时时间
  timeout: 10000,
  // headers: {
  //   Accept: "application/json, text/plain, */*",
  //   "Content-Type": "application/json",
  //   "X-Requested-With": "XMLHttpRequest"
  // },
  // 数组格式参数序列化（https://github.com/axios/axios/issues/5142）
  // paramsSerializer: {
  //   serialize: stringify
  // }
};

function setStart({ url }) {
  if (isElectron) return;
  const isBar = whiteList.includes(url);
  // 开启进度条动画
  isBar && window.NProgress?.start?.();
}

function setxToken(response) {
  const token = response.headers["x-token"];
  if (token) {
    localStg.set(ACCESS_TOKEN, token);
  }
}

function setAuthorization(config) {
  const token = localStg.get(ACCESS_TOKEN);
  if (token) {
    // 携带自定义请求头token到服务器
    config.headers["Authorization"] = token;
  }
}

class PureHttp {
  constructor() {
    this.service = axios.create({ ...defaultConfig });
    this.httpInterceptorsRequest();
    this.httpInterceptorsResponse();
  }
  /** 请求拦截 */
  httpInterceptorsRequest() {
    this.service.interceptors.request.use((config) => {
      // setStart(config);
      setAuthorization(config);
      return config;
    }, errorHandler);
  }
  /** 响应拦截 */
  httpInterceptorsResponse() {
    this.service.interceptors.response.use((response) => {
      const { data, status } = response;
      window.NProgress?.done?.();
      if (status === 200) {
        setxToken(response);
        return data;
      }
      return Promise.reject(data); // 处理非200状态
    }, errorHandler);
  }
  /** 通用请求工具函数 */
  request(config) {
    return this.service.request(config);
  }
}

export const http = new PureHttp();
