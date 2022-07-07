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