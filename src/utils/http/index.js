import { ACCESS_TOKEN } from "@/constants/index";
import storage from "@/utils/localforage/index";
import axios from "axios";
import { errorHandler } from "./tools";

const service = axios.create({
  // baseURL: "https://apichat.fun/", // 生产
  // baseURL: "http://localhost:8081/", // 开发
  baseURL: import.meta.env.VITE_SERVICE_BASE_URL, // 公共地址
  timeout: 50000, // 请求超时时间
});

// 请求拦截器
service.interceptors.request.use((config) => {
  const token = storage.get(ACCESS_TOKEN);
  // 携带自定义请求头token到后台
  if (token) config.headers["authorization"] = token;
  return config;
}, errorHandler);

// 响应拦截器
service.interceptors.response.use((response) => {
  const { data, config, status } = response;
  const { code, msg } = data;
  if (status === 200) {
    const ToKen = response.headers["x-token"];
    if (ToKen) {
      storage.set(ACCESS_TOKEN, ToKen);
    }
    return data;
  }
}, errorHandler);

export default service;
