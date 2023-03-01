import TIM from "tim-js-sdk";
import tim from "@/utils/im-sdk/tim";

// 解散群组
export const dismissGroup = async (params) => {
  const groupId = params;
  const {
    code,
    data: { groupID },
  } = await tim.dismissGroup(groupId);
  return {
    code,
    groupID,
  };
};

/**
 * 群组类型
 * @readonly
 * @enum {string}
 */
const GroupType = {
  GRP_WORK: TIM.TYPES.GRP_WORK, // 好友工作群，默认
  GRP_PUBLIC: TIM.TYPES.GRP_PUBLIC, // 陌生人社交群
  GRP_MEETING: TIM.TYPES.GRP_MEETING, // 临时会议群
  GRP_AVCHATROOM: TIM.TYPES.GRP_AVCHATROOM, // 直播群
};

/**
 * 创建群组
 * @param {CreateGroupParams} params - 创建群组的参数
 * @param {GroupType} type - 群组类型
 * @returns {Promise<{ code: number, group: any }>} - 返回一个 Promise，包含创建结果和群组对象
 */
export const createGroup = async (params, type = GroupType.GRP_MEETING) => {
  const { groupName } = params;
  const {
    code,
    data: { group, overLimitUserIDList },
  } = await tim.createGroup({
    type,
    name: groupName,
  });
  return {
    code,
    group,
  };
};
// 退出群
export const quitGroup = async (params) => {
  const { groupId } = params;
  const { code, data } = await tim.quitGroup(groupId);
  return {
    code,
    data,
  };
};
