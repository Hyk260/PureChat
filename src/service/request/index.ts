import Axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  // type CustomParamsSerializer
} from "axios"

import { useAuthStore } from "@/stores/modules/auth"
import { localStg } from "@/utils/storage"
import type { LoginResult } from "@/stores/modules/user/type"

import type { PureHttpError, PureHttpResponse, RequestMethods, ApiResponse } from "./types"

// 状态码错误消息映射
const statusMessageMap: Record<number, string> = {
  400: "错误的请求",
  401: "未授权，请重新登录",
  404: "请求错误,未找到该资源",
  408: "请求超时",
  415: "不支持的媒体类型",
  500: "服务器端出错",
  502: "网络错误",
  504: "网络超时",
}

// 异常拦截处理器
const errorHandler = (error: AxiosError) => {
  const status = error.response?.status
  const errMessage = status ? (statusMessageMap[status] ?? `连接错误 ${status}`) : "无法连接到服务器！"

  console.warn("errMessage", errMessage)

  if (error.response?.data && typeof error.response.data === "object") {
    Object.assign(error, error.response.data)
  }
  error.message = errMessage

  return Promise.reject(error)
}

/** 请求白名单，放置一些不需要`token`的接口（通过设置请求白名单，防止`token`过期后再请求造成的死循环问题） */
const whiteList = ["/api/auth/refresh", "/api/auth/login"]

// 相关配置请参考：www.axios-js.com/zh-cn/docs/#axios-request-config-1
const defaultConfig: AxiosRequestConfig = {
  // baseURL: "https://next.purechat.cn", // 生产
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
}

// 格式化token（jwt格式）
function formatToken(token: string) {
  return "Bearer " + token
}

type RefreshTokenResult = Pick<LoginResult, "accessToken" | "refreshToken">

class PureChatHttp {
  private readonly service: AxiosInstance
  private readonly refreshService: AxiosInstance
  private isRefreshing: boolean
  private refreshSubscribers: Array<(token: string) => void>

  constructor() {
    // 主服务实例
    this.service = Axios.create(defaultConfig)
    // 专门用于刷新 Token 的实例（不走拦截器）
    this.refreshService = Axios.create(defaultConfig)
    // 防止重复刷新`token`
    this.isRefreshing = false
    // 刷新订阅队列
    this.refreshSubscribers = []

    this.initInterceptors()
  }

  initInterceptors(): void {
    this.handleRequest()
    this.handleResponse()
  }

  /** 请求拦截 */
  private handleRequest(): void {
    this.service.interceptors.request.use((config) => {
      if (config.url && !whiteList.includes(config.url)) {
        const token = localStg.get("Access-Token")
        if (token && config.headers) config.headers.Authorization = formatToken(token)
      }
      return config
    }, errorHandler)
  }

  /** 响应拦截 */
  private handleResponse() {
    this.service.interceptors.response.use(
      (response: PureHttpResponse) => {
        if (response.status >= 200 && response.status < 300) {
          const token = response.headers?.authorization
          if (token) {
            localStg.set("Access-Token", token)
          }
          return response.data
        }

        const rejectionMessage = (() => {
          if (response.data && typeof response.data === "object") {
            const payload = response.data as Record<string, unknown>
            const candidate = payload.message ?? payload.msg ?? payload.error
            return typeof candidate === "string" ? candidate : "请求失败"
          }
          return response.statusText || "请求失败"
        })()

        const rejection = new Error(rejectionMessage)
        if (response.data && typeof response.data === "object") {
          Object.assign(rejection, response.data)
        }

        return Promise.reject(rejection)
      },
      async (error: PureHttpError) => {
        const { config, response } = error
        const extendedConfig = config as PureHttpResponse

        // 非 401 错误直接抛出
        if (response?.status !== 401 || extendedConfig._retry) {
          return errorHandler(error)
        }

        // 第一个触发刷新的请求
        extendedConfig._retry = true

        // 如果正在刷新 Token，则将当前请求加入队列等待
        if (this.isRefreshing) {
          return new Promise((resolve) => {
            this.refreshSubscribers.push((token) => {
              if (extendedConfig.headers) extendedConfig.headers.Authorization = token
              resolve(this.service(extendedConfig))
            })
          })
        }

        this.isRefreshing = true

        try {
          const { data } = await this.refreshService.post<ApiResponse<RefreshTokenResult>>("/api/auth/refresh", {
            refreshToken: useAuthStore().refreshToken,
          })

          const { accessToken, refreshToken } = data.data

          useAuthStore().setTokens(accessToken, refreshToken)

          const newToken = formatToken(accessToken)

          this.refreshSubscribers.forEach((cb) => cb(newToken))
          this.refreshSubscribers = []

          if (extendedConfig.headers) extendedConfig.headers.Authorization = newToken
          return this.service(extendedConfig)
        } catch (e) {
          this.refreshSubscribers = []
          useAuthStore().logout()
          return Promise.reject(e instanceof Error ? e : new Error(String(e)))
        } finally {
          this.isRefreshing = false
        }
      }
    )
  }

  /** 通用请求工具函数 */
  public request<T = unknown, D = unknown>(config: AxiosRequestConfig<D>): Promise<T> {
    return this.service.request(config) as unknown as Promise<T>
  }

  public _request<T = unknown, D = unknown>(
    method: RequestMethods,
    url: string,
    config?: AxiosRequestConfig<D>
  ): Promise<T> {
    return this.request<T, D>({
      method,
      url,
      ...(config ?? {}),
    })
  }

  /** 单独抽离的`post`工具函数 */
  public post<T = unknown, D = unknown>(url: string, config?: AxiosRequestConfig<D>): Promise<T> {
    return this._request<T, D>("post", url, config)
  }

  /** 单独抽离的`get`工具函数 */
  public get<T = unknown, D = unknown>(url: string, config?: AxiosRequestConfig<D>): Promise<T> {
    return this._request<T, D>("get", url, config)
  }
}

export const http = new PureChatHttp()
