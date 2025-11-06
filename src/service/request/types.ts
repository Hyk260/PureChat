import type { AxiosError, AxiosRequestConfig, AxiosResponse, Method } from "axios"

export type RequestMethods = Extract<Method, "get" | "post" | "put">

export interface PureHttpError extends AxiosError {
  isCancelRequest?: boolean
}

export interface PureHttpResponse extends AxiosResponse {
  config: PureHttpRequestConfig
  _retry?: boolean
}

export interface PureHttpRequestConfig extends AxiosRequestConfig {
  handleRequest?: (request: PureHttpRequestConfig) => void
  handleResponse?: (response: PureHttpResponse) => void
}
