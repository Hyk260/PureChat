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
        // https://cos.ap-shanghai.myqcloud.com/70721.gif?imageMogr2
        imageUrl: z.string(),
        width: z.number(),
        height: z.number(),
        // blob:http://localhost:8080/6beefb1f-b30b-439e-9f1d-1b05d5ebbf0f
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

/**
 * 群系统通知的 payload 结构
 * @see https://web.sdk.qcloud.com/im/doc/zh-cn/Message.html#.GroupSystemNoticePayload
 */
export const GroupSystemNoticePayload = BasePayload.extend({
  operationType: z.number(),
})

/**
 * 群提示消息操作类型常量
 * 对应 TIM.TYPES 中的群提示类型
 */
export const GROUP_TIP_OPERATION_TYPE = {
  /** 有成员加群 */
  GRP_TIP_MBR_JOIN: 1,
  /** 有群成员退群 */
  GRP_TIP_MBR_QUIT: 2,
  /** 有群成员被踢出群 */
  GRP_TIP_MBR_KICKED_OUT: 3,
  /** 有群成员被设为管理员 */
  GRP_TIP_MBR_SET_ADMIN: 4,
  /** 有群成员被撤销管理员 */
  GRP_TIP_MBR_CANCELED_ADMIN: 5,
  /** 群组资料变更 */
  GRP_TIP_GRP_PROFILE_UPDATED: 6,
  /** 群成员资料变更，例如：群成员被禁言 */
  GRP_TIP_MBR_PROFILE_UPDATED: 7,
  /** 封禁直播群群成员 */
  GRP_TIP_BAN_AVCHATROOM_MEMBER: 10,
  /** 解封直播群群成员 */
  GRP_TIP_UNBAN_AVCHATROOM_MEMBER: 11,
}

export const GroupTipPayload = BasePayload.extend({
  operatorID: z.string(),
  /**
   * 0	默认值
   * 1	申请加群
   * 2	邀请加群
   */
  groupJoinType: z.number(),
  /**
   * 操作类型
   * @see GROUP_TIP_OPERATION_TYPE
   */
  operationType: z.number(),
  memberList: z.array(
    z.object({
      userID: z.string(),
      muteTime: z.number(),
    })
  ),
  userIDList: z.array(z.string()),
  operatorInfo: z.object({
    userID: z.string(),
    role: z.number(),
    nick: z.string(),
    avatar: z.string(),
  }),
})

export const CustomPayload = BasePayload.extend({
  data: z.string(),
  description: z.string(),
  extension: z.string(),
})

export const customDataWebSearchSchema = z.object({
  webSearch: z.object({
    messageAbstract: z.string(),
    version: z.string().optional(),
    webSearchResult: z.any().optional(),
  }),
})

export const customDataDeepThinkingSchema = z.object({
  deepThinking: z.object({
    messageAbstract: z.string(),
    version: z.string().optional(),
    model: z.string().optional(),
    thinking: z.string().optional(),
    deeplyThought: z.string().optional(),
  }),
})

export const customDataReplyMessageSchema = z.object({
  messageReply: z.object({
    messageAbstract: z.string(),
    messageSender: z.string(),
    version: z.string(),
    messageID: z.string(),
    thinking: z.string(),
    deeplyThought: z.string(),
  }),
})

export const customDataPromptMessageSchema = z.object({
  messagePrompt: z.object({
    messageAbstract: z.string(),
    version: z.string(),
    recQuestion: z.array(z.string()),
  }),
})

export const MessageStatusSchema = z.enum([
  /**
   *  unSend(未发送)
   */
  "unSend",
  "fail",
  "success",
  "sending",
  "searching",
  "paused",
  "timeout",
])

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

export const payloadSchema = z
  .union([TextPayload, ImagePayload, TextPayload, GroupTipPayload, CustomPayload])
  .optional()

export const DB_MessageSchema = z.object({
  // ***************** TIMMessage ***************** //
  ID: z.string().uuid(),
  conversationID: z.string(),
  /**
   *  消息所属会话的类型
   *  C2C: 单聊
   *  GROUP: 群聊
   *  SYSTEM: 系统通知
   */
  conversationType: z.enum(["C2C", "GROUP", "SYSTEM"]),
  /**
   *  消息时间戳。单位：秒
   */
  time: z.number(),
  /**
   * 消息序列号
   */
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
  /**
   * 是否被撤回的消息
   */
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
  /**
   * 消息自定义数据 该字段为 JSON 格式字符串
   *
   * web搜索 customDataWebSearchSchema
   * 深度思考 customDataDeepThinkingSchema
   * 回复消息 customDataReplyMessageSchema
   */
  cloudCustomData: z.string(),
  /**
   *  是否被删除的消息
   */
  isDeleted: z.boolean(),
  isModified: z.boolean(),
  /**
   *  消息时间戳。单位：秒
   */
  clientTime: z.number(),
  senderTinyID: z.string(),
  needReadReceipt: z.boolean(),
  version: z.union([z.number(), z.string()]),
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
   * 文本 TextPayload
   * 图片 ImagePayload
   * 自定义 CustomPayload
   * 群提示消息 GroupTipPayload
   */
  // payload: TextPayload,
  payload: payloadSchema,
  /**
   * @description 消息类型
   */
  type: MessageTypeSchema,
  // **************** Time *************** //
  isTimeDivider: z.boolean().optional(),
  // **************** Base *************** //
  id: z.string().optional(),
  /**
   * 初始化后不修改 消息时间戳。单位：毫秒
   */
  createdAt: z.number().optional(),
  /**
   * 消息更新时间戳。单位：毫秒
   */
  updatedAt: z.number().optional(),
})

export type DB_Message = z.infer<typeof DB_MessageSchema>

/**
 * @description 消息状态
 * unSend(未发送)
 * fail(失败)
 * success(成功)
 * sending(发送中)
 * timeout(超时)
 * paused(暂停)
 * searching(搜索中)
 */
export type MessageStatus = z.infer<typeof MessageStatusSchema>

/**
 * @description 消息类型
 * TIMTextElem(文本) TIMRelayElem(转发) TIMImageElem(图片) TIMFileElem(文件) TIMCustomElem(自定义) TIMGroupTipElem(群提示) TIMGroupSystemNoticeElem(群系统提示)
 */
export type MessageType = z.infer<typeof MessageTypeSchema>

export type customDataWebSearch = z.infer<typeof customDataWebSearchSchema>

export type customDataPromptMessage = z.infer<typeof customDataPromptMessageSchema>

export type ImagePayloadType = z.infer<typeof ImagePayload>

export type FilePayloadType = z.infer<typeof FilePayload>

export type GroupTipPayloadType = z.infer<typeof GroupTipPayload>

export type MergerPayloadType = z.infer<typeof MergerPayload>

export type GroupSystemNoticePayloadType = z.infer<typeof GroupSystemNoticePayload>

/**
 * 群提示消息操作类型
 */
export type GroupTipOperationType = (typeof GROUP_TIP_OPERATION_TYPE)[keyof typeof GROUP_TIP_OPERATION_TYPE]
