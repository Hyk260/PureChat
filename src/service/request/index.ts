import { localStg } from "@/utils/storage";
import { useAuthStore } from "@/stores/index";
import Axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  // type CustomParamsSerializer
} from "axios";
import type {
  RequestMethods,
  PureHttpResponse,
  PureHttpError
} from "./types.d";

// 状态码错误消息映射
const statusMessageMap: Record<number, string> = {
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
const errorHandler = (error: AxiosError) => {
  const status = error.response?.status;
  const errMessage = status ? statusMessageMap[status] ?? `连接错误 ${status}` : "无法连接到服务器！";

  window.$message?.error(errMessage);

  return Promise.reject(error);
};

/** 请求白名单，放置一些不需要`token`的接口（通过设置请求白名单，防止`token`过期后再请求造成的死循环问题） */
const whiteList = ["/refresh-token", "/login"];

// 相关配置请参考：www.axios-js.com/zh-cn/docs/#axios-request-config-1
const defaultConfig: AxiosRequestConfig = {
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
  //   serialize: stringify as unknown as CustomParamsSerializer
  // }
};

// 格式化token（jwt格式）
function formatToken(token: string) {
  return "Bearer " + token;
}

class PureChatHttp {
  private service: AxiosInstance;
  private refreshService: AxiosInstance;
  private isRefreshing: boolean;
  private refreshSubscribers: Array<(token: string) => void>;

  constructor() {
    // 主服务实例
    this.service = Axios.create(defaultConfig);
    // 专门用于刷新 Token 的实例（不走拦截器）
    this.refreshService = Axios.create(defaultConfig);
    // 防止重复刷新`token`
    this.isRefreshing = false;
    // 刷新订阅队列
    this.refreshSubscribers = [];

    this.initInterceptors();
  }

  initInterceptors(): void {
    this.handleRequest()
    this.handleResponse()
  }

  /** 请求拦截 */
  private handleRequest(): void {
    this.service.interceptors.request.use((config) => {
      if (config.url && !whiteList.includes(config.url)) {
        const token = localStg.get("Access-Token");
        if (token && config.headers) config.headers.Authorization = formatToken(token);
      }
      return config;
    }, errorHandler);
  }

  /** 响应拦截 */
  private handleResponse(): void {
    this.service.interceptors.response.use(
      (response: PureHttpResponse) => {
        if (response.status >= 200 && response.status < 300) {
          const token = response.headers?.authorization;
          if (token) {
            localStg.set("Access-Token", token);
          }
          return response.data;
        }
        return Promise.reject(response.data);
      },
      async (error: PureHttpError) => {
        const { config, response } = error;
        const extendedConfig = config as PureHttpResponse;

        // 非 401 错误直接抛出
        if (response?.status !== 401 || extendedConfig._retry) {
          return errorHandler(error);
        }

        // 第一个触发刷新的请求
        extendedConfig._retry = true;

        // 如果正在刷新 Token，则将当前请求加入队列等待
        if (this.isRefreshing) {
          return new Promise((resolve) => {
            this.refreshSubscribers.push((token) => {
              if (extendedConfig.headers) extendedConfig.headers.Authorization = formatToken(token);
              resolve(this.service(extendedConfig));
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

          if (extendedConfig.headers) extendedConfig.headers.Authorization = newToken;
          return this.service(extendedConfig);
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
  public request(config: AxiosRequestConfig) {
    return this.service.request(config);
  }

  public _request<T>(
    method: RequestMethods,
    url: string,
    param?: AxiosRequestConfig,
  ): Promise<T> {
    const config = {
      method,
      url,
      ...param,
    };

    // 单独处理自定义请求/响应回调
    return new Promise((resolve, reject) => {
      this.service
        .request(config)
        .then((response) => {
          resolve(response as T);
        })
        .catch(error => {
          reject(error as Error);
        });
    });
  }

  /** 单独抽离的`post`工具函数 */
  public post<T, P>(
    url: string,
    params?: AxiosRequestConfig<P>,
  ): Promise<T> {
    return this._request<T>("post", url, params);
  }

  /** 单独抽离的`get`工具函数 */
  public get<T, P>(
    url: string,
    params?: AxiosRequestConfig<P>,
  ): Promise<T> {
    return this._request<T>("get", url, params);
  }
}

export const http = new PureChatHttp();
