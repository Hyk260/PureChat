import type { UPDATE_YOUR_PROFILE_OPTIONS } from "@/service/chat/types/tencent-cloud-chat";
import tim from "@/service/IM/im-sdk/tim";

/**
 * 获取用户资料
 */
export const getUserProfile = async (userID: string[]) => {
  const { code, data } = await tim.getUserProfile({ userIDList: userID });
  return { code, data };
};

/**
 * 更新个人资料
 */
export const updateMyProfile = async (profile: UPDATE_YOUR_PROFILE_OPTIONS) => {
  const { code, data } = await tim.updateMyProfile({ ...profile });
  return { code, data };
};
