import { StoreKey } from "@/ai/constant";
import { ACCESS_TOKEN, USER_MODEL, USER_SETUP } from "@/constants/index";
import http from "@/utils/http/index";
import storage from "@/utils/localforage/index";

// 登录接口
export const login = (data) => {
  return http({
    url: "/login",
    method: "post",
    data,
  });
};

// 注册接口
export const register = (data) => {
  return http({
    url: "/register",
    method: "post",
    data,
  });
};

// 账号列表
export const getuser = async () => {
  return {
    loadAll: [
      { value: "admin", link: "" },
      { value: "zhangal", link: "" },
      { value: "jinwx", link: "" },
    ],
  };
};

// 退出登录
export const logout = () => {
  // storage.clear();
  storage.remove(USER_SETUP);
  storage.remove(USER_MODEL);
  storage.remove(ACCESS_TOKEN);
  storage.remove(StoreKey.Access);
};
