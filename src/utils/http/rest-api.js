import axios from "axios";
import storage from "storejs";
import { ACCESS_TOKEN } from "@/store/mutation-types";
import config from "@/config/defaultSettings";
const { REST_API } = config;
// console.log(REST_API, "REST_API");
const service = axios.create({
  baseURL: REST_API, // 公共地址
  timeout: 6000, // 请求超时时间
});
// 异常拦截处理器
const errorHandler = (error) => {
  // console.log(error)
  if (error.response) {
    const { data, status } = error.response;
  }
  return Promise.reject(error);
};
// 请求拦截器
service.interceptors.request.use((config) => {
  return config;
}, errorHandler);

// 响应拦截器
service.interceptors.response.use((response) => {
  const { data, config, status } = response;
  const { code, msg } = data;
  // console.log(response, "response");
  if (status === 200) return data;
}, errorHandler);

export default service;
