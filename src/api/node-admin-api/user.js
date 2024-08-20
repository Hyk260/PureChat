import { StoreKey } from "@/ai/constant";
import { ACCESS_TOKEN, USER_MODEL, USER_SETUP } from "@/constants/index";
import { http } from "@/utils/http/index";
import { localStg } from "@/utils/storage";

// 登录接口
export const login = (data) => {
  return http.request({
    url: "/login",
    method: "post",
    data,
  });
};

// 注册接口
export const register = (data) => {
  return http.request({
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
  localStg.clear();
  // localStg.remove(USER_SETUP);
  // localStg.remove(USER_MODEL);
  // localStg.remove(ACCESS_TOKEN);
  // localStg.remove(StoreKey.Access);
};
