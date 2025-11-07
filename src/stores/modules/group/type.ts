// 群组类型枚举
export type GroupType = "Private" | "Public" | "ChatRoom" | "AVChatRoom"

// 群组角色枚举
export type GroupRole = "Owner" | "Admin" | "Member"

// 群组成员信息
export interface GroupMember {
  userID: string
  nick?: string
  avatar?: string
  role?: GroupRole
  joinTime: number
  muteUntil?: number
  memberCustomField?: Array<{ key: string; value: string }>
}

// 群组基本信息
export interface GroupInfo {
  groupID: string
  type: GroupType
  name: string
  avatar?: string
  introduction?: string
  notification?: string
  ownerID: string
  createTime: number
  memberCount: number
  maxMemberCount: number
  muteAllMembers?: boolean
  groupCustomField?: Array<{ key: string; value: string }>
}

// 群组详细资料（包含当前用户信息）
export interface GroupProfile extends GroupInfo {
  selfInfo: {
    role: GroupRole
    joinTime: number
    messageRemindType: string
    muteUntil: number
  }
  memberList?: GroupMember[]
}

// 群组列表项
export interface GroupListItem extends GroupInfo {
  lastMessage?: {
    lastMessageTime: number
    lastMessageUserID: string
    lastMessagePayload: any
  }
  unreadCount?: number
}

// API 响应基础类型
export interface ApiResponse<T = any> {
  code: number
  data?: T
  message?: string
}

// 群组Store状态类型
export interface GroupState {
  groupList: GroupListItem[]
  groupProfile: GroupProfile | Record<string, any>
  currentMemberList: GroupMember[]
}

// 群组Store Actions参数类型
export interface SetGroupProfilePayload {
  groupProfile: GroupProfile
}

export interface HandleGroupMemberListPayload {
  isSort?: boolean
  groupID?: string
}

export interface HandleQuitGroupPayload {
  sessionId: string
  groupId: string
}

export interface HandleCreateGroupPayload {
  groupName: string
  positioning?: boolean
}

export interface HandleDismissGroupPayload {
  sessionId: string
  groupId: string
}

export interface HandleGroupProfilePayload {
  type: string
  groupProfile?: {
    groupID: string
  }
}
