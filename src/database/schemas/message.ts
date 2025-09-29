import { z } from "zod"

// https://web.sdk.qcloud.com/im/doc/zh-cn/Message.html
export const MessageSchema = {
  ID: "",
  conversationID: "",
  conversationType: "C2C",
  time: 0,
  sequence: 0,
  clientSequence: 0,
  random: 0,
  priority: "Normal",
  nick: "",
  avatar: "",
  isPeerRead: false,
  nameCard: "",
  hasRiskContent: false,
  isPlaceMessage: 0,
  isRevoked: false,
  from: "",
  to: "",
  flow: "out",
  isSystemMessage: false,
  protocol: "JSON",
  isResend: false,
  isRead: true,
  status: "success",
  atUserList: [],
  cloudCustomData: "",
  isDeleted: false,
  isModified: false,
  clientTime: 0,
  senderTinyID: "",
  needReadReceipt: false,
  version: "0.8.4",
  isBroadcastMessage: false,
  isSupportExtension: false,
  revoker: "",
  // revokerInfo: {},
  revokeReason: "",
  payload: {
    text: "",
  },
  type: "TIMTextElem",
  // id: "",
  // createdAt: 0,
  // updatedAt: 0,
}

export const BasePayload = z.object({
  text: z.string().optional(),
})

export const TextPayload = BasePayload.extend({
  text: z.string(),
})

export const ImagePayload = BasePayload.extend({
  uuid: z.string(),
  // 图片格式类型，JPG/JPEG = 1，GIF = 2，PNG = 3，BMP = 4，其他 = 255
  imageFormat: z.number(),
  imageInfoArray: z.array(
    z
      .object({
        width: z.number(),
        height: z.number(),
        url: z.string(),
        size: z.number(),
        type: z.number(),
      })
      .optional()
  ),
})

export const FilePayload = BasePayload.extend({
  uuid: z.string(),
  fileName: z.string(),
  fileUrl: z.string(),
  fileSize: z.number(),
})

export const MergerPayload = BasePayload.extend({
  title: z.string(),
  messageList: z.array(z.any()),
  abstractList: z.array(z.string()),
})

export const GroupSystemNoticePayload = BasePayload.extend({
  operationType: z.number(),
})

export const customDataWebSearchSchema = z.object({
  webSearch: z.object({
    messageAbstract: z.string(),
    version: z.string(),
  }),
})

// export const cloudCustomDataSchema = cloudCustomDataSchemaWebSearch

export const MessageStatusSchema = z.enum(["unSend", "fail", "success", "sending", "searching", "paused", "timeout"])

export const RevokerInfoSchema = z
  .object({
    userID: z.string(),
    nick: z.string(),
    avatar: z.string(),
  })
  .optional()

export const MessageTypeSchema = z.enum([
  "TIMTextElem",
  "TIMRelayElem",
  "TIMImageElem",
  "TIMFileElem",
  "TIMCustomElem",
  "TIMGroupTipElem",
  "TIMGroupSystemNoticeElem",
])

export const DB_MessageSchema = z.object({
  ID: z.string().uuid(),
  conversationID: z.string(),
  /**
   *  消息所属会话的类型
   *  C2C: 单聊
   *  GROUP: 群聊
   *  SYSTEM: 系统通知
   */
  conversationType: z.enum(["C2C", "GROUP", "SYSTEM"]),
  time: z.number(),
  sequence: z.number().int().min(0),
  clientSequence: z.number().int().min(0),
  random: z.number().int(),
  priority: z.string(),
  nick: z.string(),
  avatar: z.string(),
  isPeerRead: z.boolean(),
  nameCard: z.string(),
  hasRiskContent: z.boolean(),
  isPlaceMessage: z.number().int(),
  isRevoked: z.boolean(),
  /**
   * 发送方的 userID
   */
  from: z.string(),
  /**
   *  接收方的 userID
   */
  to: z.string(),
  /**
   * 消息流向
   * in: 收到
   * out: 发出
   */
  flow: z.enum(["in", "out"]),
  isSystemMessage: z.boolean(),
  protocol: z.enum(["JSON", "XML", "Binary"]),
  isResend: z.boolean(),
  isRead: z.boolean(),
  status: MessageStatusSchema,
  atUserList: z.array(z.string()),
  cloudCustomData: z.string(),
  isDeleted: z.boolean(),
  isModified: z.boolean(),
  clientTime: z.number(),
  senderTinyID: z.string(),
  needReadReceipt: z.boolean(),
  version: z.string(),
  isBroadcastMessage: z.boolean(),
  isSupportExtension: z.boolean(),
  /**
   * 消息撤回者的 userID
   */
  revoker: z.string().optional(),
  revokerInfo: RevokerInfoSchema,
  revokeReason: z.string(),
  /**
   * @description 消息内容
   * 文本 图片 文件 自定义 群提示消息 群系统通知 合并
   * ImagePayload
   */
  payload: TextPayload,
  // payload: z.union([TextPayload, ImagePayload]).optional(),
  isTimeDivider: z.boolean().optional(),
  /**
   * @description 消息类型
   */
  type: MessageTypeSchema,
  // **************** Base *************** //
  id: z.string().optional(),
  createdAt: z.number().optional(),
  updatedAt: z.number().optional(),
})

export type DB_Message = z.infer<typeof DB_MessageSchema>

/**
 * @description 消息状态
 * unSend(未发送) fail(失败) success(成功) sending(发送中) timeout(超时) paused(暂停) searching(搜索中)
 */
export type MessageStatus = z.infer<typeof MessageStatusSchema>

/**
 * @description 消息类型
 * TIMTextElem(文本) TIMRelayElem(转发) TIMImageElem(图片) TIMFileElem(文件) TIMCustomElem(自定义) TIMGroupTipElem(群提示) TIMGroupSystemNoticeElem(群系统提示)
 */
export type MessageType = z.infer<typeof MessageTypeSchema>

export type customDataWebSearch = z.infer<typeof customDataWebSearchSchema>

export type ImagePayloadType = z.infer<typeof ImagePayload>

export type FilePayloadType = z.infer<typeof FilePayload>

export type MergerPayloadType = z.infer<typeof MergerPayload>

export type GroupSystemNoticePayloadType = z.infer<typeof GroupSystemNoticePayload>
