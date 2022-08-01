import http from "@/utils/http";

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
 * 聊天记录
 */
export const sendMsg = (data) => {
  return http({
    url: "/chat/sendMsg",
    method: "get",
    params: data,
  });
};
