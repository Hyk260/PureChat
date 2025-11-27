import tim from "@/service/chat/PureChatService"

export const GroupType = {
  GRP_WORK: "Private", // 好友工作群，默认
  GRP_PUBLIC: "Public", // 陌生人社交群
  GRP_MEETING: "ChatRoom", // 临时会议群
  GRP_AVCHATROOM: "AVChatRoom", // 直播群
} as const

export const GroupTypeMap = {
  Private: "好友工作群(Work)",
  Public: "陌生人社交群(Public)",
  ChatRoom: "临时会议群(Meeting)",
  AVChatRoom: "直播群(AVChatRoom)",
} as const

const ModifyType = {
  GROUP_NAME: "name", // 修改群名称
  GROUP_AVATAR: "avatar", // 修改群头像
  GROUP_INTRODUCTION: "introduction", // 修改群简介
  GROUP_NOTIFICATION: "notification", // 修改群公告
  GROUP_CUSTOM_FIELD: "groupCustomField", // 修改群组维度自定义字段
  GROUP_MUTE_ALL_MEMBERS: "muteAllMembers", // 修改群禁言
} as const

export type ModifyTypeValue = (typeof ModifyType)[keyof typeof ModifyType]

export interface CreateGroupParams {
  groupName: string
  memberList?: string[]
  introduction?: string
  notification?: string
  avatar?: string
}

export interface UpdateGroupProfileParams {
  groupID: string
  modify?: ModifyTypeValue
  value?: string
}

// 解散群
export const dismissGroup = async (groupId: string) => {
  const {
    code,
    data: { groupID },
  } = await tim.dismissGroup(groupId)
  return { code, groupID }
}

// 创建群
// https://web.sdk.qcloud.com/im/doc/v3/zh-cn/SDK.html#createGroup
export const createGroup = async (params: CreateGroupParams, type = GroupType.GRP_PUBLIC) => {
  const { groupName } = params
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
  })
  return { code, group }
}

// 退出群
export const quitGroup = async (params: { groupId: string }) => {
  const { groupId } = params
  const { code, data } = await tim.quitGroup(groupId)
  return {
    code,
    data,
  }
}

// 获取群成员列表
export const getGroupMemberList = async (params: { groupID: string; count?: number; offset?: number }) => {
  const { groupID, count = 20 } = params
  const {
    code,
    data: { memberList, offset },
  } = await tim.getGroupMemberList({
    groupID,
    count,
    offset: 0,
  })
  return { code, memberList, offset }
}

/**
 * 更新群组资料
 */
export const updateGroupProfile = async (params: UpdateGroupProfileParams) => {
  const { groupID, modify = ModifyType.GROUP_NAME, value = "" } = params
  const parameter = {
    groupID,
    [modify]: value,
    // groupCustomField: [{ key: 'custom_info', value: 'all_staff' }] // 自定义字段 app管理员可写
  }
  try {
    const {
      code,
      data: { group },
    } = await tim.updateGroupProfile(parameter)
    return { code, group }
  } catch (error) {
    return { code: -1, group: error }
  }
}

// 添加群成员
export const addGroupMember = async (params: { groupID: string; user: string | string[] }) => {
  const { groupID, user } = params
  const parameter = {
    groupID: groupID,
    userIDList: Array.isArray(user) ? user : [user], // ['user1', 'user2', 'user3']
  }
  const { code, data } = await tim.addGroupMember(parameter)
  return {
    code,
    data,
  }
}

/**
 * 删除群成员
 */
export const deleteGroupMember = async (params: { groupID: string; user: string | string[] }) => {
  const { groupID, user } = params
  const parameter = {
    groupID: groupID,
    userIDList: Array.isArray(user) ? user : [user],
    // reason: '你违规了，我要踢你！'
  }
  try {
    const { code, data } = await tim.deleteGroupMember(parameter)
    return { code, data }
  } catch (error) {
    return {
      code: -1,
      data: error,
    }
  }
}

/**
 * 获取群组列表
 */
export const getGroupList = async () => {
  const {
    code,
    data: { groupList },
  } = await tim.getGroupList()
  return { code, groupList }
}

/**
 * 获取群组资料
 */
export const getGroupProfile = async (params: { groupID: string }) => {
  try {
    const { groupID } = params
    const {
      data: { group },
      code,
    } = await tim.getGroupProfile({
      groupID: groupID,
    })
    return { code, data: group }
  } catch (error) {
    return {
      code: -1,
      data: error,
    }
  }
}
