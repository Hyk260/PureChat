// 群组类型枚举
export type GroupType = "Private" | "Public" | "ChatRoom" | "AVChatRoom";

// 群组角色枚举
export type GroupRole = "Owner" | "Admin" | "Member";

// 群组成员信息
export interface GroupMember {
  userID: string;
  nick?: string;
  avatar?: string;
  role?: GroupRole;
  joinTime?: number;
  muteUntil?: number;
  memberCustomField?: Array<{ key: string; value: string }>;
}

// 群组基本信息
export interface GroupInfo {
  groupID: string;
  type: GroupType;
  name: string;
  avatar?: string;
  introduction?: string;
  notification?: string;
  ownerID: string;
  createTime: number;
  memberCount: number;
  maxMemberCount: number;
  muteAllMembers?: boolean;
  groupCustomField?: Array<{ key: string; value: string }>;
}

// 群组详细资料（包含当前用户信息）
export interface GroupProfile extends GroupInfo {
  selfInfo: {
    role: GroupRole;
    joinTime: number;
    messageRemindType: string;
    muteUntil: number;
  };
  memberList?: GroupMember[];
}

// 群组列表项
export interface GroupListItem extends GroupInfo {
  lastMessage?: {
    lastMessageTime: number;
    lastMessageUserID: string;
    lastMessagePayload: any;
  };
  unreadCount?: number;
}

// API 响应基础类型
export interface ApiResponse<T = any> {
  code: number;
  data?: T;
  message?: string;
}

// 群组列表响应
export interface GroupListResponse extends ApiResponse {
  groupList: GroupListItem[];
}

// 群组成员列表响应
export interface GroupMemberListResponse extends ApiResponse {
  memberList: GroupMember[];
  offset: number;
}

// 群组资料响应
export interface GroupProfileResponse extends ApiResponse {
  data: GroupProfile;
}

// 创建群组参数
export interface CreateGroupParams {
  groupName: string;
  type?: GroupType;
  memberList?: string[];
  introduction?: string;
  notification?: string;
  avatar?: string;
}

// 创建群组响应
export interface CreateGroupResponse extends ApiResponse {
  group: GroupInfo;
}

// 退出群组参数
export interface QuitGroupParams {
  groupId: string;
}

// 解散群组参数
export interface DismissGroupParams {
  groupId: string;
}

// 解散群组响应
export interface DismissGroupResponse extends ApiResponse {
  groupID: string;
}

// 获取群组成员列表参数
export interface GetGroupMemberListParams {
  groupID: string;
  count?: number;
  offset?: number;
}

// 获取群组资料参数
export interface GetGroupProfileParams {
  groupID: string;
}

// 群组Store状态类型
export interface GroupState {
  groupList: GroupListItem[];
  groupProfile: GroupProfile | Record<string, any>;
  currentMemberList: GroupMember[];
}

// 群组Store Actions参数类型
export interface SetGroupProfilePayload {
  groupProfile: GroupProfile;
}

export interface HandleGroupMemberListPayload {
  isSort?: boolean;
  groupID?: string;
}

export interface HandleQuitGroupPayload {
  sessionId: string;
  groupId: string;
}

export interface HandleCreateGroupPayload {
  groupName: string;
  positioning?: boolean;
}

export interface HandleDismissGroupPayload {
  sessionId: string;
  groupId: string;
}

export interface HandleGroupProfilePayload {
  type: string;
  groupProfile: {
    groupID: string;
  };
}
