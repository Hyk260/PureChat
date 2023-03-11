"use strict";
import qs from "qs";
import axios from "axios";
import storage from "storejs";
import router from "@/router";
import { ElMessage } from "element-plus";
import NProgress from "@/utils/progress";
import store from "@/store";
import { ACCESS_TOKEN } from "@/store/mutation-types";
import config from "@/config/defaultSettings";
import { setCookies } from "@/utils/Cookies";
const { BASE_API } = config;

console.log(BASE_API, "BASE_API");
const { formats, parse, stringify } = qs;

const service = axios.create({
  baseURL: BASE_API, // 公共地址
  timeout: 6000, // 请求超时时间
  // headers: {
  //   Accept: "application/json, text/plain, */*",
  //   "Content-Type": "application/json",
  //   "X-Requested-With": "XMLHttpRequest"
  // },
  // 数组格式参数序列化
  // paramsSerializer: (params) => {
  //   console.log(params,"params")
  //   return stringify(params, { indices: false })
  // }
  // onUploadProgress: (progressEvent) => {
  //   let persent = ((progressEvent.loaded / progressEvent.total) * 100) | 0; //上传进度百分比
  //   console.log(persent);
  // },
});

// 异常拦截处理器
const errorHandler = (error) => {
  // console.log(error)
  if (error.response) {
    const { data, status } = error.response;
    switch (status) {
      case 400:
        console.log("错误请求");
        break;
      case 401:
        ElMessage("未授权,请重新登录!");
        store.dispatch("LOG_OUT");
        store.dispatch("TIM_LOG_OUT");
        break;
      case 403:
        console.log("拒绝访问");
        break;
      case 404:
        console.log("请求错误,未找到该资源");
        break;
      case 405:
        console.log("请求方法未允许");
        break;
      case 408:
        console.log("请求超时");
        break;
      case 411:
        console.log("需要知道长度");
        break;
      case 413:
        console.log("请求的实体太大");
        break;
      case 414:
        console.log("请求的URL太长");
        break;
      case 415:
        console.log("不支持的媒体类型");
        break;
      case 500:
        console.log("服务器端出错");
        break;
      case 501:
        console.log("网络未实现");
        break;
      case 502:
        console.log("网络错误");
        break;
      case 503:
        console.log("服务不可用");
        break;
      case 504:
        console.log("网络超时");
        break;
      case 505:
        console.log("http版本不支持该请求");
        break;
      default:
        console.log(`连接错误${status}`);
    }
    // 关闭进度条动画
    NProgress.done();
  }
  return Promise.reject(error);
};

// 请求拦截器
service.interceptors.request.use((config) => {
  // console.log(config)
  // 开启进度条动画
  NProgress.start();
  const token = storage.get(ACCESS_TOKEN);
  // 携带自定义请求头token到后台
  if (token) config.headers["authorization"] = token;
  return config;
}, errorHandler);

// 响应拦截器
service.interceptors.response.use((response) => {
  const { data, config, status } = response;
  const { code, msg } = data;
  // 关闭进度条动画
  NProgress.done();
  // console.log(response, "response");
  if (status === 200) {
    const ToKen = response.headers["x-token"];
    if (ToKen) {
      storage.set(ACCESS_TOKEN, ToKen);
      setCookies(ACCESS_TOKEN, ToKen);
    }
    return data;
  }
}, errorHandler);

export default service;
