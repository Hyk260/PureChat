import { http } from "@/service/request"
import type { ApiResponse } from "@/service/request/types"
import type { LoginResult } from "@/stores/modules/user/type"

interface RegisterPayload {
  username: string
  password: string
  repeatPassword?: string
  nickname?: string
  email?: string
  phone?: string
  verifyCode?: string
}

interface loginPayload {
  username: string
  password: string
  nickname?: string
  email?: string
  phone?: string
  verifyCode?: string
}

// 登录接口
export const login = (data: loginPayload) => {
  return http.request<ApiResponse<LoginResult>>({
    url: "/api/auth/login",
    method: "post",
    data,
  })
}

// 注册接口
export const register = (data: RegisterPayload) => {
  return http.request<ApiResponse<LoginResult>>({
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
export const logout = async () => {
  // localStg.clear();
  // localStg.remove('Access-Token');
}
