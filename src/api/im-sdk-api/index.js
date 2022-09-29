import TIM from "tim-js-sdk";
import tim from "@/utils/im-sdk/tim";

export const getMsgList = async (params) => {
  const { conversationID, count } = params;
  const { code, data } = await tim.getMessageList({
    conversationID: conversationID,
    count: count || 15,
  });
  if (code == 0) {
    return data
  };
  return {}
};

// 获取个人资料
export const getMyProfile = async () => {
  try {
    const { code, data } = await tim.getMyProfile()
    if (code == 0) return data  
  } catch (e) {
    console.log(e)
  }
};

export const logout = async () => {
  try {
    const { code, data } = await tim.logout();
    // tim.destroy();
    if (code == 0) return data  
  } catch (e) {
    console.log(e)
  }
};
