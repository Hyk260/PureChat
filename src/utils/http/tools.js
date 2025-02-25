import store from "@/store";
import { useAppStore } from '@/stores/modules/app';
// 异常拦截处理器
export const errorHandler = (error) => {
  let errMessage = "未知错误";
  if (error.response) {
    const { status } = error.response;
    switch (status) {
      case 400:
        errMessage = "错误的请求";
        break;
      case 401:
        errMessage = "未授权,请重新登录!";
        store.dispatch("handleUserLogout");
        break;
      case 404:
        errMessage = "请求错误,未找到该资源";
        break;
      case 408:
        errMessage = "请求超时";
        break;
      case 415:
        errMessage = "不支持的媒体类型";
        break;
      case 500:
        errMessage = "服务器端出错";
        break;
      case 502:
        errMessage = "网络错误";
        break;
      case 504:
        errMessage = "网络超时";
        break;
      default:
        errMessage = `连接错误${status}`;
    }
  } else {
    errMessage = "无法连接到服务器！";
  }
  window.NProgress?.done?.(); // 关闭加载条
  store.commit("setLoading", false);
  useAppStore().showMessage({ message: errMessage, type: "error" });
  return Promise.reject(error);
};
