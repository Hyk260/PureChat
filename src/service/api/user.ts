import { http } from "@/service/request"
import type { ApiResponse } from "@/service/request/types"
import type { LoginResult } from "@/stores/modules/user/type"

interface UserAuthBase {
  userId: string
  password: string
  nickname?: string
  email?: string
  phone?: string
  verifyCode?: string
}

interface RegisterPayload extends UserAuthBase {
  repeatPassword?: string
}

type LoginPayload = UserAuthBase

export const login = (data: LoginPayload) => {
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
