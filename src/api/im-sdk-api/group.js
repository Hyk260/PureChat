import TIM from "tim-js-sdk";
import tim from "@/utils/im-sdk/tim";

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

const ModifyType = {
  GROUP_NAME: "name", // 修改群名称
  GROUP_INTRODUCTION: "introduction", // 修改群简介
  GROUP_NOTIFICATION: "notification", // 修改群公告
  GROUP_CUSTOM_FIELD: "groupCustomField", // 修改群组维度自定义字段
};

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
// 获取群成员列表
export const getGroupMemberList = async (params) => {
  const { groupID, count } = params; // offset
  const {
    code,
    data: { memberList, offset },
  } = await tim.getGroupMemberList({
    groupID,
    count: 15,
    offset: 0,
  });
  return {
    code,
    memberList,
  };
};

/**
 * 更新群组资料
 * @param {Object} params - 参数对象
 * @param {string} params.convId - 群组 ID
 * @param {string} params.modify - 待修改的属性名称，可选值为：name、introduction、notification、groupCustomField
 * @param {string} params.value - 待修改的属性值，当 modify 为 groupCustomField 时，需传入数组类型的值 [{key: "xxx", value: "xxx"}]
 * @returns {Object} - 包含状态码和群组资料的对象
 */
export const updateGroupProfile = async (params) => {
  const { convId, modify = ModifyType.GROUP_NAME, value = "" } = params;
  const parameter = {
    groupID: convId,
    [modify]: value,
  };
  const {
    code,
    data: { group },
  } = await tim.updateGroupProfile(parameter);
  return {
    code,
    group,
  };
};

// 添加群成员
export const addGroupMember = async (params) => {
  const { groupID, user } = params;
  const parameter = {
    groupID: groupID,
    userIDList: [user], // ['user1', 'user2', 'user3']
  };
  const {
    code,
    data: {
      group, // 添加后的群组信息
      existedUserIDList, // 已在群中的群成员
      failureUserIDList, // 添加失败的群成员
      overLimitUserIDList, // 超过了“单个用户可加入群组数”限制的用户列表
      successUserIDList, // 添加成功的群成员
    },
  } = tim.addGroupMember(parameter);
  return {
    code,
    group,
  };
};
// 删除群成员
export const deleteGroupMember = async (params) => {
  const { groupID, user } = params;
  const parameter = {
    groupID: groupID,
    userIDList: [user],
    // reason: '你违规了，我要踢你！'
  };
  const {
    code,
    data: { group, userIDList },
  } = tim.deleteGroupMember(parameter);
  return {
    code,
    group,
    userIDList,
  };
};
// 获取群组列表
export const getGroupList = async () => {
  const {
    code,
    data: { groupList },
  } = await tim.getGroupList();
  return {
    code,
    groupList,
  };
};
