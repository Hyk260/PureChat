// 用户基本信息
export interface UserProfile {
  userID: string;
  nick?: string;
  avatar?: string;
  email?: string;
  signature?: string;
  gender?: number;
  birthday?: number;
  location?: string;
  allowType?: string;
  language?: number;
  messageSettings?: number;
  adminForbidType?: string;
  level?: number;
  role?: number;
  lastMessageTime?: number;
  customField?: Array<{ key: string; value: string }>;
}

// 用户本地存储信息
export interface UserLocalStore {
  native: string;
  avatar: string;
  userName: string;
  localAvatar: string;
}

// API响应类型
export interface ApiResponse<T = any> {
  code: number;
  msg: string;
  result: T;
}

// 登录响应结果
export interface LoginResult {
  username: string;
  userSig: string;
  accessToken: string;
  refreshToken: string;
}

// 用户Store状态类型
export interface UserState {
  verifyCode: string;
  currentPage: number;
  userProfile: UserProfile | Record<string, any>;
  userLocalStore: UserLocalStore;
}

export interface HandleSuccessfulAuthPayload {
  code: number;
  msg: string;
  result: LoginResult;
}

export interface HandleUserLoginPayload {
  username: string;
  password: string;
  remember?: boolean;
}

export interface HandleIMLoginPayload {
  userID: string;
  userSig: string;
}
