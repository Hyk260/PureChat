import type {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  Method} from "axios";

export type RequestMethods = Extract<
  Method,
  "get" | "post" | "put"
>;

export interface PureHttpError extends AxiosError {
  isCancelRequest?: boolean;
}

export interface PureHttpResponse extends AxiosResponse {
  config: PureHttpRequestConfig;
  _retry?: boolean;
}

export interface PureHttpRequestConfig extends AxiosRequestConfig {
  handleRequest?: (request: PureHttpRequestConfig) => void;
  handleResponse?: (response: PureHttpResponse) => void;
}

export default class PureChatHttp {
  request<T>(
    method: RequestMethods,
    url: string,
    param?: AxiosRequestConfig,
    axiosConfig?: PureHttpRequestConfig
  ): Promise<T>;
  post<T, P>(
    url: string,
    params?: P,
    config?: PureHttpRequestConfig
  ): Promise<T>;
  get<T, P>(
    url: string,
    params?: P,
    config?: PureHttpRequestConfig
  ): Promise<T>;
}
