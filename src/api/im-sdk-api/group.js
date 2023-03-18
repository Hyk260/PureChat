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
// 获取群成员列表
export const getGroupMemberList = async (params) => {
  try {
    const { groupID, count, offset } = params;
    const { code, data } = await tim.getGroupMemberList({
      groupID,
      count: 15,
      offset: 0,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

// 修改群消息
export const updateGroupProfile = async (params) => {
  const { convId, modify = "", text = "" } = params;
  let parameter = {
    groupID: convId,
    [modify]: text,
    // name: "", // 修改群名称
    // introduction: "", // 修改群简介
    // notification: " ", // 修改群公告
    // groupCustomField: [{ key: "group_level", value: "high" }], // 修改群组维度自定义字段
  };
  let promise = tim.updateGroupProfile(parameter);
  promise
    .then(function (imResponse) {
      console.log(imResponse.data.group); // 修改成功后的群组详细资料
    })
    .catch(function (imError) {
      console.warn("updateGroupProfile error:", imError); // 修改群组资料失败的相关信息
    });
};

// 添加群成员
export const addGroupMember = async (params) => {
  const { groupID, user } = params;
  const parameter = {
    groupID: groupID,
    userIDList: [user],
    // ['user1', 'user2', 'user3']
  };
  let promise = tim.addGroupMember(parameter);
  promise
    .then(function (imResponse) {
      console.log(imResponse.data.successUserIDList); // 添加成功的群成员 userIDList
      console.log(imResponse.data.failureUserIDList); // 添加失败的群成员 userIDList
      console.log(imResponse.data.existedUserIDList); // 已在群中的群成员 userIDList
      // 一个用户 userX 最多允许加入 N 个群，如果已经加入了 N 个群，此时再尝试添加 userX 为群成员，则 userX 不能正常加群
      // SDK 将 userX 的信息放入 overLimitUserIDList，供接入侧处理
      console.log(imResponse.data.overLimitUserIDList); // 超过了“单个用户可加入群组数”限制的用户列表，v2.10.2起支持
      console.log(imResponse.data.group); // 添加后的群组信息
    })
    .catch(function (imError) {
      console.warn("addGroupMember error:", imError); // 错误信息
    });
};
// 删除群成员
export const deleteGroupMember = async (params) => {
  const { groupID, user } = params;
  const parameter = {
    groupID: groupID,
    userIDList: [user],
    // reason: '你违规了，我要踢你！'
  };
  let promise = tim.deleteGroupMember(parameter);
  promise
    .then(function (imResponse) {
      console.log(imResponse.data.group); // 删除后的群组信息
      console.log(imResponse.data.userIDList); // 被删除的群成员的 userID 列表
    })
    .catch(function (imError) {
      console.warn("deleteGroupMember error:", imError); // 错误信息
    });
};
