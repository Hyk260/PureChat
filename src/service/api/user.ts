import { http } from "@/service/request"

// 登录接口
export const login = (data) => {
  return http.request({
    url: "/api/auth/login",
    method: "post",
    data,
  })
}

// 注册接口
export const register = (data) => {
  return http.request({
    url: "/api/auth/register",
    method: "post",
    data,
  })
}

// 账号列表
export const getUserList = (): { value: string }[] => {
  return [{ value: "admin" }, { value: "zhangal" }, { value: "jinwx" }]
}

// 退出登录
export const logout = () => {
  // localStg.clear();
  // localStg.remove('Access-Token');
}
