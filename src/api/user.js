import { ACCESS_TOKEN } from "@/store/mutation-types";
import http from "@/utils/http/index";
import storage from "storejs";

/**
 * 登录接口
 */
export const login = (params) => {
  return http({
    url: "/login",
    method: "get",
    params,
  });
};

/**
 * 退出登录
 */
export const logout = () => {
  storage.remove(ACCESS_TOKEN);
};
