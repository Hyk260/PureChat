import { ACCESS_TOKEN } from "@/constants/index";
import { localStg } from "@/utils/storage";
import { useAuthStore } from '@/stores/index';
import { useUserStore, useAppStore } from "@/stores/index";
import axios from "axios";
// import { stringify } from "qs";

// 状态码错误消息映射
const statusMessageMap = {
  400: "错误的请求",
  401: "未授权，请重新登录",
  404: "请求错误,未找到该资源",
  408: "请求超时",
  415: "不支持的媒体类型",
  500: "服务器端出错",
  502: "网络错误",
  504: "网络超时"
};

// 异常拦截处理器 
const errorHandler = (error) => {
  const status = error.response?.status;
  const errMessage = status ? statusMessageMap[status] || `连接错误 ${status}` : "无法连接到服务器！";

  useAppStore().showMessage({ message: errMessage, type: "error" });
  return Promise.reject(error);
};

/** 请求白名单，放置一些不需要`token`的接口（通过设置请求白名单，防止`token`过期后再请求造成的死循环问题） */
const whiteList = ["/refresh-token", "/login"];

// 相关配置请参考：www.axios-js.com/zh-cn/docs/#axios-request-config-1
const defaultConfig = {
  // baseURL: "https://api.purechat.cn", // 生产
  // baseURL: "http://localhost:8081", // 开发
  baseURL: import.meta.env.VITE_SERVICE_BASE_URL,
  // 请求超时时间
  timeout: 15000,
  headers: {
    // Accept: "application/json, text/plain, */*",
    "Content-Type": "application/json",
    // "X-Requested-With": "XMLHttpRequest"
  },
  // 数组格式参数序列化（https://github.com/axios/axios/issues/5142）
  // paramsSerializer: {
  //   serialize: stringify
  // }
};

// 格式化token（jwt格式） 
function formatToken(token) {
  return "Bearer " + token;
};

class PureChatHttp {
  constructor() {
    // 主服务实例
    this.service = axios.create(defaultConfig);
    // 专门用于刷新 Token 的实例（不走拦截器）
    this.refreshService = axios.create(defaultConfig);
    // 防止重复刷新`token`
    this.isRefreshing = false;
    // 刷新订阅队列
    this.refreshSubscribers = [];

    this.initInterceptors();
  }
  initInterceptors() {
    this.handleRequest()
    this.handleResponse()
  }
  /** 请求拦截 */
  handleRequest() {
    this.service.interceptors.request.use((config) => {
      if (!whiteList.includes(config.url)) {
        const token = localStg.get(ACCESS_TOKEN);
        if (token) config.headers.Authorization = formatToken(token);
      }
      return config;
    }, errorHandler);
  }
  /** 响应拦截 */
  handleResponse() {
    this.service.interceptors.response.use(
      (response) => {
        if (response.status >= 200 && response.status < 300) {
          const token = response.headers?.authorization;
          if (token) {
            localStg.set(ACCESS_TOKEN, token);
          }
          return response.data;
        }
        return Promise.reject(response.data);
      },
      async (error) => {
        const { config, response } = error;

        // 非 401 错误直接抛出
        if (response?.status !== 401 || config._retry) {
          return errorHandler(error);
        }

        // 第一个触发刷新的请求
        config._retry = true;

        // 如果正在刷新 Token，则将当前请求加入队列等待
        if (this.isRefreshing) {
          return new Promise((resolve) => {
            this.refreshSubscribers.push((token) => {
              config.headers.Authorization = formatToken(token);
              resolve(this.service(config));
            });
          });
        }

        this.isRefreshing = true;

        try {
          const { data } = await this.refreshService.post("/refresh-token", {
            refreshToken: useAuthStore().refreshToken,
          });

          useAuthStore().setTokens(data.accessToken, data.refreshToken);

          const newToken = formatToken(data.accessToken);

          this.refreshSubscribers.forEach((cb) => cb(newToken));
          this.refreshSubscribers = [];

          config.headers.Authorization = newToken;
          return this.service(config);
        } catch (e) {
          this.refreshSubscribers = [];
          useAuthStore().logout();
          return Promise.reject(e);
        } finally {
          this.isRefreshing = false;
        }
      });
  }
  /** 通用请求工具函数 */
  request(config) {
    return this.service.request(config);
  }
}

export const http = new PureChatHttp();
