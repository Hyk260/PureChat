/**
 * 登录选项
 */
export interface LOGIN_OPTIONS {
  /**
   * 用户ID
   */
  userID: string
  /**
   * 用户签名
   */
  userSig: string
}

/**
 * 个人资料基础接口，包含 Profile 和 UPDATE_YOUR_PROFILE_OPTIONS 共有的字段
 */
export interface ProfileBase {
  /**
   * 昵称，长度不超过500字节
   */
  nick: string
  /**
   * 性别：
   * - TencentCloudChat.TYPES.GENDER_UNKNOWN: 未指定
   * - TencentCloudChat.TYPES.GENDER_FEMALE: 女
   * - TencentCloudChat.TYPES.GENDER_MALE: 男
   */
  gender: "female" | "male" | "unspecified"
  /**
   * 生日，值为uint32类型。推荐用法：20000101
   */
  birthday: number
  /**
   * 所在地，长度不超过16字节。我们建议应用在本地定义一套数字和地点名称的映射关系，后端实际存储4个uint32_t类型的数字：
   * - 第1个数字：表示国家
   * - 第2个数字：表示省份
   * - 第3个数字：表示城市
   * - 第4个数字：表示区县
   */
  location: string
  /**
   * 个性签名，长度不超过500字节
   */
  selfSignature: string
  /**
   * 好友请求验证方式：
   * - TencentCloudChat.TYPES.ALLOW_TYPE_ALLOW_ANY: 自动接受所有好友请求
   * - TencentCloudChat.TYPES.ALLOW_TYPE_NEED_CONFIRM: 手动接受好友请求
   * - TencentCloudChat.TYPES.ALLOW_TYPE_DENY_ANY: 自动拒绝所有好友请求
   */
  allowType: "ALLOW_TYPE_ALLOW_ANY" | "ALLOW_TYPE_NEED_CONFIRM" | "ALLOW_TYPE_DENY_ANY"
  /**
   * 语言，值为uint32类型
   */
  language: number
  /**
   * 头像URL，长度不超过500字节
   */
  avatar: string
  /**
   * 消息设置，值为uint32类型。标志位：bit 0（设为0接收消息，设为1屏蔽消息）
   */
  messageSettings: number
  /**
   * 管理员是否禁止用户发起好友请求
   * - TencentCloudChat.TYPES.FORBID_TYPE_NONE: 允许用户发起好友请求（默认值）
   * - TencentCloudChat.TYPES.FORBID_TYPE_SEND_OUT: 禁止用户发起好友请求
   */
  adminForbidType: "FORBID_TYPE_NONE" | "FORBID_TYPE_SEND_OUT"
  /**
   * 等级，值为uint32类型。我们建议拆分等级来存储多个角色的等级信息
   */
  level: number
  /**
   * 角色，值为uint32类型。我们建议拆分角色来存储多个角色的信息
   */
  role: number
  /**
   * 自定义资料键值对集合，可根据需要使用
   */
  profileCustomField: Array<any>
}

/**
 * 用户资料接口
 */
export interface Profile extends ProfileBase {
  /**
   * 用户账号
   */
  userID: string
  /**
   * 最后更新时间，采用用户本地时间
   */
  lastUpdatedNumber: number
}

export interface PIN_CONVERSATION_OPTIONS {
  /**
   * 会话ID。支持的格式如下：
   * - C2C${userID}（一对一聊天）
   * - GROUP${groupID}（群聊）
   */
  conversationID: string
  /**
   * true: 将会话置顶；false: 取消会话置顶
   */
  isPinned: boolean
}

export interface SET_MESSAGE_REMIND_TYPE_OPTIONS {
  /**
   * 群组ID或话题ID
   */
  groupID?: string
  /**
   * 一对一聊天的用户ID列表，最多支持30个
   */
  userIDList?: Array<string>
  /**
   * 消息提醒类型：
   * - TencentCloudChat.TYPES.MSG_REMIND_ACPT_AND_NOTE：SDK接收消息并抛出MESSAGE_RECEIVED事件通知接入方，接入方发送通知
   * - TencentCloudChat.TYPES.MSG_REMIND_ACPT_NOT_NOTE：SDK接收消息并抛出MESSAGE_RECEIVED事件通知接入方，接入方不发送通知
   * - TencentCloudChat.TYPES.MSG_REMIND_DISCARD：SDK拒绝接收消息
   * - TencentCloudChat.TYPES.NOT_RECEIVE_OFFLINE_PUSH_EXCEPT_AT：SDK在线时接收消息，离线时仅接收@消息的离线推送
   */
  messageRemindType: "AcceptAndNotify" | "AcceptNotNotify" | "Discard" | "NotReceiveOfflinePushExceptAt"
}

/**
 * 更新个人资料选项
 * 继承自 ProfileBase 接口的所有字段，并将它们设为可选
 */
export type UPDATE_YOUR_PROFILE_OPTIONS = Partial<ProfileBase>

/**
 * 创建Chat实例的选项配置
 */
export interface CREATE_OPTIONS {
  /**
   * 聊天应用的SDKAppID
   */
  SDKAppID: number
  /**
   * WebSocket服务器代理地址
   */
  proxyServer?: string | undefined
  /**
   * 图片、视频、文件上传代理地址
   */
  fileUploadProxy?: string | undefined
  /**
   * 图片、视频、文件下载代理地址
   */
  fileDownloadProxy?: string | undefined
  /**
   * 聊天UI组件的场景
   */
  scene?: string | undefined
  /**
   * Chat Web SDK的模块配置
   */
  modules?: Record<string, any>
}

export interface TencentCloudChat {
  create(options: CREATE_OPTIONS): any
}

export default TencentCloudChat
