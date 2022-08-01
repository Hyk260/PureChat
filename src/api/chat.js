import http from "@/utils/http";
import { randomNum } from "@/utils/index";

/**
 * 聊天记录
 */
export const getChat = () => {
  return http({
    url: "/chat/record",
    method: "get",
  });
};

/**
 * 发送消息
 */
export const sendMsg = (data) => {
  return http({
    url: "/chat/sendMsg",
    method: "get",
    params: data,
  });
};

/**
 * 加载更多消息
 */
export const getMsgList = (data) => {
  let off = randomNum() > 30; // 70%
  // return http({
  //   url: "/chat/msglist",
  //   method: "get",
  //   params: data,
  // });
  return new Promise((resolve, reject) => {
    if (off) {
      resolve([]);
    } else {
      reject(false);
    }
  });
  // return new Promise((resolve) => setTimeout(resolve([]), 1500));
};
