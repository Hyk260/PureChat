import { z } from 'zod';

export const SessionSchema = {
  id: "",
  conversationID: "",
  toAccount: "",
  type: "",
  subType: "",
  lastMessage: {},
  unreadCount: 0,
  peerReadTime: 0,
  groupAtInfoList: [],
  groupProfile: {},
  userProfile: {},
  remark: "",
  isPinned: false,
  pinned: 0,
  messageRemindType: "",
  markList: [],
  customData: "",
  conversationGroupList: [],
  draftText: "",
  createdAt: 0,
  updatedAt: 0,
}

export const DB_SessionSchema = z.object({
  // 基础字段
  id: z.string().optional(),
  
  // 会话标识字段
  conversationID: z.string(),
  toAccount: z.string().optional(),
  type: z.string(),
  subType: z.string().optional(),
  
  // 消息相关字段
  lastMessage: z.object({}).optional(),
  
  // 未读消息相关
  unreadCount: z.number().int().min(0).optional(),
  peerReadTime: z.number().optional(),
  
  // 群组相关字段
  groupAtInfoList: z.array(z.any()).optional(),
  groupProfile: z.object({}).optional(),
  
  // 用户资料字段
  userProfile: z.object({}).optional(),
  
  // 会话设置字段
  remark: z.string().optional(),
  isPinned: z.boolean().optional(),
  pinned: z.number().int().min(0).max(1).optional(),
  messageRemindType: z.string().optional(),
  
  // 其他字段
  markList: z.array(z.any()).optional(),
  customData: z.string().optional(),
  conversationGroupList: z.array(z.any()).optional(),
  draftText: z.string().optional(),

  createdAt: z.number().optional(),
  updatedAt: z.number().optional(),
});

export type DB_Session = z.infer<typeof DB_SessionSchema>;
