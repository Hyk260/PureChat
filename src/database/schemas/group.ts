import { z } from "zod"

export const GroupRoleSchema = z.enum(["Owner", "Admin", "Member"])

export const GroupTypeSchema = z.enum(["Private", "Public", "ChatRoom", "AVChatRoom"])

export const selfInfoSchema = z.object({
  role: GroupRoleSchema,
  joinTime: z.number(),
  muteUntil: z.number().optional(),
  messageRemindType: z.string().optional(),
})

export const GroupMemberSchema = z.object({
  userID: z.string(),
  nick: z.string().optional(),
  avatar: z.string().optional(),
  role: GroupRoleSchema,
  joinTime: z.number(),
  muteUntil: z.number().optional(),
  memberCustomField: z
    .array(
      z.object({
        key: z.string(),
        value: z.string(),
      })
    )
    .optional(),
})

export const GroupInfoSchema = z.object({
  groupID: z.string(),
  type: GroupTypeSchema,
  name: z.string(),
  avatar: z.string().optional(),
  introduction: z.string().optional(),
  notification: z.string().optional(),
  ownerID: z.string(),
  createTime: z.number(),
  memberCount: z.number(),
  maxMemberCount: z.number().optional(),
  muteAllMembers: z.boolean().optional(),
  groupCustomField: z.array(z.any()).optional(),
  selfInfo: selfInfoSchema,
  lastMessage: z.any().optional(),
  // memberList: GroupMemberSchema.array(),
})

export const GroupProfileSchema = GroupInfoSchema

export type GroupProfileSchemaType = z.infer<typeof GroupProfileSchema>

export type GroupRoleSchemaType = z.infer<typeof GroupRoleSchema>

export type GroupMemberType = z.infer<typeof GroupMemberSchema>

export type GroupTypeSchemaType = z.infer<typeof GroupTypeSchema>
