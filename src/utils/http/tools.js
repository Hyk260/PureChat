import store from "@/store";
import NProgress from "@/utils/progress";
// 异常拦截处理器
export const errorHandler = (error) => {
  let errMessage = "未知错误";
  if (error.response) {
    const { data, status } = error.response;
    switch (status) {
      case 400:
        errMessage = "错误的请求";
        break;
      case 401:
        errMessage = "未授权,请重新登录!";
        store.dispatch("LOG_OUT");
        break;
      case 403:
        errMessage = "拒绝访问";
        break;
      case 404:
        errMessage = "请求错误,未找到该资源";
        break;
      case 405:
        errMessage = "请求方法未允许";
        break;
      case 408:
        errMessage = "请求超时";
        break;
      case 411:
        errMessage = "需要知道长度";
        break;
      case 413:
        errMessage = "请求的实体太大";
        break;
      case 414:
        errMessage = "请求的URL太长";
        break;
      case 415:
        errMessage = "不支持的媒体类型";
        break;
      case 500:
        errMessage = "服务器端出错";
        break;
      case 501:
        errMessage = "网络未实现";
        break;
      case 502:
        errMessage = "网络错误";
        break;
      case 503:
        errMessage = "服务不可用";
        break;
      case 504:
        errMessage = "网络超时";
        break;
      case 505:
        errMessage = "http版本不支持该请求";
        break;
      default:
        errMessage = `连接错误${status}`;
    }
  } else {
    errMessage = "无法连接到服务器！";
  }
  // 关闭进度条动画
  NProgress.done();
  return Promise.reject(error);
};
