import { z } from "zod"

export const UserSchema = {
  userID: "",
  nick: "",
  gender: "",
  birthday: 0,
  location: "",
  selfSignature: "",
  allowType: "",
  language: 0,
  avatar: "",
  messageSettings: 0,
  adminForbidType: "",
  level: 0,
  role: 0,
  lastUpdatedTime: 0,
  profileCustomField: [],
}

export const UserfileSchema = {
  ...UserSchema,
  userID: "admin",
  nick: "admin",
  avatar: "avatar",
}

export const UserProfileSchema = z
  .object({
    userID: z.string().optional(),
    nick: z.string().optional(),
    gender: z.string().optional(),
    birthday: z.number().optional(),
    location: z.string().optional(),
    selfSignature: z.string().optional(),
    allowType: z.string().optional(),
    language: z.number().optional(),
    avatar: z.string().optional(),
    messageSettings: z.number().optional(),
    adminForbidType: z.string().optional(),
    level: z.number().optional(),
    role: z.number().optional(),
    lastUpdatedTime: z.number().optional(),
    profileCustomField: z.array(z.any()).optional(),
  })
  .optional()

const settingsSchema = z.object({
  // defaultAgent: z.object({
  //   config: AgentSchema,
  //   meta: MetaDataSchema,
  // }),
  // general: generalSechma.partial().optional(),
  keyVaults: z.any().optional(),
  languageModel: z.any().optional(),
})

export const DB_UserSchema = z.object({
  uuid: z.string(),
  avatar: z.string().optional(),
  settings: settingsSchema.partial(),
})

export type DB_User = z.infer<typeof DB_UserSchema>

export type DB_Settings = z.infer<typeof settingsSchema>
