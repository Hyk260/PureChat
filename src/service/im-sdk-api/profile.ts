import tim from "@/service/chat/PureChatService"

import type { Profile, UPDATE_YOUR_PROFILE_OPTIONS } from "@/types/tencent-cloud-chat"

/**
 * 获取用户资料
 */
export const getUserProfile = async (userID: string[]) => {
  try {
    const { code, data } = await tim.getUserProfile({ userIDList: userID })
    return { code, data }
  } catch {
    return { code: -1, data: [] }
  }
}

/**
 * 更新个人资料
 */
export const updateMyProfile = async (profile: UPDATE_YOUR_PROFILE_OPTIONS) => {
  try {
    const { code, data } = await tim.updateMyProfile({ ...profile })
    return { code, data }
  } catch {
    return { code: -1, data: {} as Profile }
  }
}
