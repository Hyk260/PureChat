import { z } from "zod"
import { payloadSchema } from "./message"
import { GroupProfileSchema } from "./group"
import { UserProfileSchema } from "./user"
import { TypeSchema } from "../types"

export const messageRemindType = z.enum(["AcceptAndNotify", "AcceptNotNotify", "Discard"])

export const LastMessageSchema = z
  .object({
    /**
     *  当前会话最新消息的时间戳，单位：秒
     */
    lastTime: z.number().optional(),
    lastSequence: z.number().optional(),
    fromAccount: z.string().optional(),
    type: z.string().optional(),
    payload: payloadSchema,
    cloudCustomData: z.string().optional(),
    isRevoked: z.boolean().optional(),
    onlineOnlyFlag: z.boolean().optional(),
    nick: z.string().optional(),
    nameCard: z.string().optional(),
    version: z.number().optional(),
    isPeerRead: z.boolean().optional(),
    revoker: z.string().optional(),
    messageForShow: z.string().optional(),
  })
  .optional()

export const DB_SessionSchema = z.object({
  conversationID: z.string(),
  // toAccount: z.string().optional(),
  type: TypeSchema,
  subType: z.string().optional(),
  lastMessage: LastMessageSchema,
  unreadCount: z.number().int().min(0).optional(),
  // peerReadTime: z.number().optional(),
  groupAtInfoList: z.array(z.any()).optional(),
  groupProfile: GroupProfileSchema,
  userProfile: UserProfileSchema,
  remark: z.string().optional(),
  isPinned: z.boolean(),
  /**
   * AcceptAndNotify: 接受并提醒 (默认)
   * AcceptNotNotify: 接受不提醒
   * Discard: 拒绝
   */
  messageRemindType: messageRemindType.optional(),
  markList: z.array(z.any()).optional(),
  customData: z.string().optional(),
  conversationGroupList: z.array(z.any()).optional(),
  draftText: z.string().optional(),
  // **************** Custom *************** //
  topicId: z.string().nullable().optional(),
  pinned: z.number().int().min(0).max(1).optional(),
  // **************** Base *************** //
  id: z.string().optional(),
  createdAt: z.number().optional(),
  updatedAt: z.number().optional(),
})

export type DB_Session = z.infer<typeof DB_SessionSchema>

export type TypeSchemaType = z.infer<typeof TypeSchema>

export type ChatSchemaType = Exclude<TypeSchemaType, "@TIM#SYSTEM">
