import tim from "@/service/IM/im-sdk/tim";

const GroupType = {
  GRP_WORK: "Private", // 好友工作群，默认
  GRP_PUBLIC: "Public", // 陌生人社交群
  GRP_MEETING: "ChatRoom", // 临时会议群
  GRP_AVCHATROOM: "AVChatRoom", // 直播群
} as const;

export const GroupTypeMap = {
  Private: "好友工作群(Work)",
  Public: "陌生人社交群(Public)",
  ChatRoom: "临时会议群(Meeting)",
  AVChatRoom: "直播群(AVChatRoom)",
} as const;

const ModifyType = {
  GROUP_NAME: "name", // 修改群名称
  GROUP_AVATAR: "avatar", // 修改群头像
  GROUP_INTRODUCTION: "introduction", // 修改群简介
  GROUP_NOTIFICATION: "notification", // 修改群公告
  GROUP_CUSTOM_FIELD: "groupCustomField", // 修改群组维度自定义字段
  GROUP_MUTE_ALL_MEMBERS: "muteAllMembers", // 修改群禁言
} as const;

// 类型定义
export type GroupTypeValue = typeof GroupType[keyof typeof GroupType];
export type ModifyTypeValue = typeof ModifyType[keyof typeof ModifyType];

// 创建群组参数类型
export interface CreateGroupParams {
  groupName: string;
  memberList?: string[];
  introduction?: string;
  notification?: string;
  avatar?: string;
}

// 创建群组响应类型
export interface CreateGroupResponse {
  code: number;
  group: any; // 可以根据实际需要定义更具体的类型
}

// 退出群组参数类型
export interface QuitGroupParams {
  groupId: string;
}

// 退出群组响应类型
export interface QuitGroupResponse {
  code: number;
  data: any;
}

// 获取群成员列表参数类型
export interface GetGroupMemberListParams {
  groupID: string;
  count?: number;
  offset?: number;
}

// 获取群成员列表响应类型
export interface GetGroupMemberListResponse {
  code: number;
  memberList: any[];
}

// 更新群组资料参数类型
export interface UpdateGroupProfileParams {
  groupID: string;
  modify?: ModifyTypeValue;
  value?: string | Array<{ key: string; value: string }>;
}

// 更新群组资料响应类型
export interface UpdateGroupProfileResponse {
  code: number;
  group: any;
}

// 添加群成员参数类型
export interface AddGroupMemberParams {
  groupID: string;
  user: string | string[];
}

// 添加群成员响应类型
export interface AddGroupMemberResponse {
  code: number;
  data: any;
}

// 删除群成员参数类型
export interface DeleteGroupMemberParams {
  groupID: string;
  user: string | string[];
}

// 删除群成员响应类型
export interface DeleteGroupMemberResponse {
  code: number;
  data: any;
}

// 获取群组列表响应类型
export interface GetGroupListResponse {
  code: number;
  groupList: any[];
}

// 获取群组资料参数类型
export interface GetGroupProfileParams {
  groupID: string;
}

// 获取群组资料响应类型
export interface GetGroupProfileResponse {
  code: number;
  data: any;
}

// 解散群
export const dismissGroup = async (groupId: string): Promise<{ code: number; groupID: string }> => {
  const {
    code,
    data: { groupID },
  } = await tim.dismissGroup(groupId);
  return { code, groupID };
};

// 创建群
// https://web.sdk.qcloud.com/im/doc/v3/zh-cn/SDK.html#createGroup
export const createGroup = async (params: CreateGroupParams, type: GroupTypeValue = GroupType.GRP_PUBLIC): Promise<CreateGroupResponse> => {
  const { groupName } = params;
  const {
    code,
    data: { group },
  } = await tim.createGroup({
    type,
    name: groupName,
    // inviteOption: "NeedPermission",
    // memberList: [
    // {
    //   userID: "user1",
    //   // 群成员维度的自定义字段，默认情况是没有的，需要开通，详情请参阅自定义字段
    //   memberCustomField: [{ key: "group_member_test", value: "test" }],
    // },
    // {
    //   userID: "user2",
    // },
    // ], // 如果填写了 memberList，则必须填写 userID
  });
  return { code, group };
};

// 退出群
export const quitGroup = async (params: QuitGroupParams): Promise<QuitGroupResponse> => {
  const { groupId } = params;
  const { code, data } = await tim.quitGroup(groupId);
  return {
    code,
    data,
  };
};

// 获取群成员列表
export const getGroupMemberList = async (params: GetGroupMemberListParams): Promise<GetGroupMemberListResponse> => {
  const { groupID, count = 20 } = params; // offset
  const {
    code,
    data: { memberList, offset },
  } = await tim.getGroupMemberList({
    groupID,
    count,
    offset: 0,
  });
  return { code, memberList };
};

/**
 * 更新群组资料
 * @param {UpdateGroupProfileParams} params - 参数对象
 * @param {string} params.groupID - 群组 ID
 * @param {ModifyTypeValue} params.modify - 待修改的属性名称，可选值为：name、introduction、notification、groupCustomField
 * @param {string | Array<{key: string, value: string}>} params.value - 待修改的属性值，当 modify 为 groupCustomField 时，需传入数组类型的值 [{key: "xxx", value: "xxx"}]
 * @returns {Promise<UpdateGroupProfileResponse>} - 包含状态码和群组资料的对象
 */
export const updateGroupProfile = async (params: UpdateGroupProfileParams): Promise<UpdateGroupProfileResponse> => {
  const { groupID, modify = ModifyType.GROUP_NAME, value = "" } = params;
  const parameter = {
    groupID,
    [modify]: value,
    // groupCustomField: [{ key: 'custom_info', value: 'all_staff' }] // 自定义字段 app管理员可写
  };
  try {
    const {
      code,
      data: { group },
    } = await tim.updateGroupProfile(parameter);
    return { code, group };
  } catch (error) {
    return { code: -1, group: error };
  }
};

// 添加群成员
export const addGroupMember = async (params: AddGroupMemberParams): Promise<AddGroupMemberResponse> => {
  const { groupID, user } = params;
  const parameter = {
    groupID: groupID,
    userIDList: Array.isArray(user) ? user : [user], // ['user1', 'user2', 'user3']
  };
  const { code, data } = await tim.addGroupMember(parameter);
  return {
    code,
    data,
  };
};

// 删除群成员
export const deleteGroupMember = async (params: DeleteGroupMemberParams): Promise<DeleteGroupMemberResponse> => {
  const { groupID, user } = params;
  const parameter = {
    groupID: groupID,
    userIDList: Array.isArray(user) ? user : [user],
    // reason: '你违规了，我要踢你！'
  };
  try {
    const { code, data } = await tim.deleteGroupMember(parameter);
    return { code, data };
  } catch (error) {
    return {
      code: -1,
      data: error,
    };
  }
};

// 获取群组列表
export const getGroupList = async (): Promise<GetGroupListResponse> => {
  const {
    code,
    data: { groupList },
  } = await tim.getGroupList();
  return { code, groupList };
};

// 获取群详细资料
export const getGroupProfile = async (params: GetGroupProfileParams): Promise<GetGroupProfileResponse> => {
  try {
    const { groupID } = params;
    const {
      data: { group },
      code,
    } = await tim.getGroupProfile({
      groupID: groupID,
    });
    return { code, data: group };
  } catch (error) {
    return {
      code: -1,
      data: error,
    };
  }
};
