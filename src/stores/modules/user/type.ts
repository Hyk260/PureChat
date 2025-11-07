import { Profile } from "@/types/tencent-cloud-chat"
import { ApiResponse } from "@/service/request/types"

// 用户基本信息
export type UserProfile = Profile

// 用户本地存储信息
export interface UserLocalStore {
  native: string
  avatar: string
  userName: string
  localAvatar: string
}

// 登录响应结果
export interface LoginResult {
  username: string
  userSig: string
  accessToken: string
  refreshToken: string
}

// 用户Store状态类型
export interface UserState {
  verifyCode: string
  currentPage: number
  userProfile: UserProfile | null
  userLocalStore: UserLocalStore
}

export type HandleSuccessfulAuthPayload = ApiResponse<LoginResult>

export interface HandleUserLoginPayload {
  username: string
  password: string
}

export interface HandleIMLoginPayload {
  userID: string
  userSig: string
}
