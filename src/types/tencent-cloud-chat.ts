import type { DB_Message } from "@/database/schemas/message"
import type { DB_Session } from "@/database/schemas/session"

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

export interface GET_MESSAGE_LIST_OPTIONS {
  /**
   * Conversation ID. Supported formats are as follows:
   * - C2C${userID} (one-to-one chat)
   * - GROUP${groupID} (group chat)
   * - @TIM#SYSTEM (system notification conversation)
   */
  conversationID: string
  /**
   * Message ID, which is used to continue pulling messages by page. This parameter can be left unspecified the first time messages are pulled. Every time the API is called, this parameter is returned, and you need to specify it for the next pulling.
   */
  nextReqMessageID?: string
}

export interface GET_MESSAGE_LIST_HOPPING_OPTIONS {
  /**
   * 会话 ID。会话 ID 组成方式：
   * - C2C${userID} 单聊
   * - GROUP${groupID} 群聊
   * - GROUP${topicID} 话题
   */
  conversationID: string
  /**
   * 用于拉群组会话漫游消息的起始 sequence。
   */
  sequence?: number
  /**
   * 消息的服务端时间，用于拉 C2C 会话漫游消息的起始时间。
   */
  time?: number
  /**
   * 消息拉取方向，默认 0。
   * 0 向上拉，拉更旧的消息
   * 1 向下拉，拉更新的消息
   */
  direction?: number
  /**
   * 需要拉取的消息数量，默认值和最大值为15。
   */
  count?: number
}

export interface GET_CONVERSATION_LIST_OPTIONS {
  type?: "C2C" | "GROUP" | "@TIM#SYSTEM"
  groupName?: string
  markType?: number
  hasUnreadCount?: boolean
  hasGroupAtInfo?: boolean
}

export interface DELETE_CONVERSATION_OPTIONS {
  /**
   * conversation ID list
   */
  conversationIDList: Array<string>
  /**
   * - true, By default, clears chat history with a user or clears chat history from a group from local and the cloud.
   * - false, delete conversations only, keep the chat history.
   */
  clearHistoryMessage?: boolean
}

export interface GET_GROUP_PROFILE_OPTIONS {
  groupID: string
  /**
   * Group-specific custom field filter, which specifies the group custom fields to pull.
   */
  groupCustomFieldFilter?: Array<string>
}

export interface CREATE_GROUP_OPTIONS {
  /**
   * Group name. The maximum length is 30 bytes. This parameter is required.
   */
  name: string
  /**
   * Group type. Supported group types are as follows:
   * - TencentCloudChat.TYPES.GRP_WORK (default value): work group
   * - TencentCloudChat.TYPES.GRP_PUBLIC: public group
   * - TencentCloudChat.TYPES.GRP_MEETING: meeting group
   * - TencentCloudChat.TYPES.GRP_AVCHATROOM: audio-video group
   */
  type: "GRP_WORK" | "GRP_PUBLIC" | "GRP_MEETING" | "GRP_AVCHATROOM"
  /**
   * Group ID. If no value is specified, the SDK automatically creates a unique group ID.
   */
  groupID?: string
  /**
   * Group ID. If no value is specified, the SDK automatically creates a unique group ID.
   */
  introduction?: string
  /**
   * Group notice. The maximum length is 300 bytes.
   */
  notification?: string
  /**
   * Group profile photo URL. The maximum length is 100 bytes.
   */
  avatar?: string
  /**
   * Maximum number of group members. Default value: 200 for a work group, 2000 for a public group, 10000 for a meeting group, and no limit for an audio-video group
   */
  maxMemberNum?: number
  /**
   * Method for handling requests to join the group
   * - TencentCloudChat.TYPES.JOIN_OPTIONS_FREE_ACCESS: allow free group joining
   * - TencentCloudChat.TYPES.JOIN_OPTIONS_NEED_PERMISSION: require approval for group joining
   * - TencentCloudChat.TYPES.JOIN_OPTIONS_DISABLE_APPLY: forbid group joining
   */
  joinOption?: ""
  /**
   * Initial group member list, which can contain up to 500 members. Members cannot be added when you create an audio-video group.
   */
  memberList?: Array<any>
  /**
   * Group custom field. By default, this parameter is not available and needs to be enabled.
   */
  groupCustomField?: Array<any>
  /**
   * - true, create a community group that supports topic
   * - false, create a community group that not support topic
   */
  isSupportTopic?: boolean
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
 * 消息发送选项配置
 */
export interface MESSAGE_OPTIONS {
  /**
   * 消息接收者的用户ID或群组ID
   */
  to: string
  /**
   * 会话类型。有效值：
   * - TencentCloudChat.TYPES.CONV_C2C (一对一聊天)
   * - TencentCloudChat.TYPES.CONV_GROUP (群聊)
   */
  conversationType: "C2C" | "GROUP"

  cache?: boolean
  /**
   * 消息优先级
   */
  priority?: ""
  /**
   * 消息内容容器
   */
  payload: any
  /**
   * 消息自定义数据（保存在云端，会发送给对端，应用卸载重装后仍可拉取
   */
  cloudCustomData?: string
  /**
   * 是否需要已读回执。
   * - 群聊和一对一聊天均需要购买旗舰版才能使用此功能
   * - 您需要前往Chat控制台为特定群组类型启用此功能。
   */
  needReadReceipt?: boolean
  /**
   * 消息接收者列表
   */
  receiverList?: Array<string>
  /**
   * 是否支持消息扩展
   */
  isSupportExtension?: boolean
  /**
   * 用于查询上传进度的回调函数
   */
  onProgress?: (progress: number) => void
  /**
   * 消息自定义审核配置（仅在v3.3.0及更高版本支持）
   * 仅在[云端审核]功能激活后有效。
   * 您可以前往[控制台](https://console.cloud.tencent.com/im)（云端审核 -> 审核配置 -> 自定义配置 -> 添加自定义配置）获取配置ID。
   * [自定义审核]请参考文档[云端审核功能](https://cloud.tencent.com/document/product/269/78633#a5efc9e8-a7ec-40e3-9b18-8ed1910f589c)
   * 此字段需要在发送消息前设置。仅用于控制发送消息时的消息审核，其值不会存储在云端和本地。
   * @property(nonatomic,strong) NSString *customModerationConfigurationID;
   */
  customModerationConfigurationID?: string
}

export interface TRANSLATE_TEXT_OPTIONS {
  /**
   * 待翻译文本数组
   */
  sourceTextList: Array<string>
  /**
   * 源语言 可以设置为特定语言或 "auto" "auto" 表示自动识别源语言
   */
  sourceLanguage: string
  /**
   * 目标语言 支持的目标语言有多种，例如：英语-"en"，简体中文-"zh"，法语-"fr"，德语-"de"等
   */
  targetLanguage: string
}

/**
 * TencentCloudChat SDK supports Internet Explorer 9+, Chrome, WeChat, Mobile QQ, QQ Browser, Firefox, Opera, and Safari.
 */
export declare class ChatSDK {
  /**
   * 初始化 SDK 实例
   * __LOCAL_MODE__ 为 true 时，使用本地聊天模式
   */
  initialize(): void
  /**
   * Log in to the Chat SDK using userID and userSig. The login process contains several steps that are executed asynchronously, and the returned Promise object is used to process login success or failure.
   * - After successful login, to call APIs that require authentication, such as sendMessage, you must wait until the SDK enters the ready state (you can obtain the status of the SDK by listening to the TencentCloudChat.EVENT.SDK_READY event).<br/>
   * - By default, multi-instance login is not supported. If you use an account that has been logged in on another page to log in on the current page, the account may be forcibly logged out on the other page, which will trigger the TencentCloudChat.EVENT.KICKED_OUT event. You can proceed accordingly after detecting the event through listening.
   * To support multi-instance login (allowing the use of the same account to log in concurrently on multiple pages), log in to the Chat console, locate the corresponding SDKAppID, and go to App Configuration > Feature Configuration > Online Web Instances to configure the number of instances. The configuration will take effect within 50 minutes.
   */
  login(options: LOGIN_OPTIONS): Promise<{ code: number; data: any }>

  /**
   * This API is used to log out of the Chat SDK. It is usually called when you switch between accounts. This API clears the login status of the current account and all the data in the memory.
   * - When calling this API, the instance publishes the SDK_NOT_READY event. In this case, the instance is automatically logged out and cannot receive or send messages.
   * - Assume that the value of the Online Web Instances configured in the Chat console is greater than 1, and the same account has been used to log in to instances a1 and a2 (including a Mini Program instance). After a1.logout() is executed, a1 is automatically logged out and cannot receive or send messages, whereas a2 is not affected.
   * - Assume that the Online Web Instances is set to 2, and your account has been used to log in to instances a1 and a2. When you use this account to log in to instance a3, either a1 or a2 will be forcibly logged out. In most cases, the instance that first entered the login state is forcibly logged out. This is called kicked offline due to multi-instance login. If a1 is forcibly logged out, a logout process is executed within a1 and the KICKED_OUT event is triggered. The access side can listen for this event and redirect it to the login page when the event is triggered. At this time, a1 is forcibly logged out, whereas instances a2 and a3 can continue to run properly.
   */
  logout(): Promise<{ code: number; data: object }>

  /**
   * Get the userID of the logged-in user. If the user is not logged in, it returns an empty string ('').
   */
  getLoginUser(): string

  /**
   * Get server time.
   */
  getServerTime(): number

  /**
   * Get ready status of the SDK. When the SDK is ready, developers can call APIs that require authentication, such as sendMessage
   */
  isReady(): boolean

  /**
   * Terminate the SDK instance. The SDK will log out, disconnect the WebSocket persistent connection, and then release resources.
   */
  destroy(): Promise<void>

  /**
   * Listen for events.
   * - Please call the API to listen for events before calling the login API to avoid missing events distributed by the SDK.
   * @param eventName - Event name. All event names are stored in the TencentCloudChat.EVENT variable.
   * @param handler - Event processing method. When an event is triggered, this handler is called to process the event.
   * @param context - Context in which the handler is expected to execute.
   */
  on(eventName: string, handler: (...args: any[]) => void, context?: any): void

  /**
   * Cancel event listening.
   * @param eventName - Event name. All event names are stored in the TencentCloudChat.EVENT variable.
   * @param handler - Event processing method. When an event is triggered, this handler is called to process the event.
   * @param context - Context in which the handler is expected to execute.
   */
  off(eventName: string, handler: (...args: any[]) => void, context?: any): void

  /**
   * Register a plugin.
   * Before sending messages, such as image, audio, video, and file messages, the Chat SDK needs to use the upload plugin to upload files to Tencent COS.
   */
  registerPlugin(options: object): void

  /**
   * Set the log level. Logs below this level will not be printed.
   * @param level -
   * - 0: common level. You are advised to use this level during connection as it covers more logs.
   * - 1: release level, at which the SDK outputs important information. We recommend that you use this log level in a production environment.
   * - 2: alarm level. The SDK prints only alarm and error logs.
   * - 3: error level. The SDK prints only error logs.
   * - 4: no log level. The SDK does not print any logs.
   */
  setLogLevel(level: number): void

  // ----------- Message -----------

  /**
   * Create a text message. This API returns a message instance. If you need to send a text message, call the sendMessage API to send this message instance.
   */
  createTextMessage(options: MESSAGE_OPTIONS): DB_Message

  /**
   * Create a text message with the @ notification feature. This API returns a message instance. If you need to send a text message, call the sendMessage API to send this message instance.
   * - This API applies only to group chats.
   */
  createTextAtMessage(options: MESSAGE_OPTIONS): DB_Message

  /**
   * Create an image message. This API returns a message instance. If you need to send an image message, call the sendMessage API to send this message instance.
   */
  createImageMessage(options: MESSAGE_OPTIONS): DB_Message

  /**
   * Create an audio message. This API returns a message instance. If you need to send an audio message, call the sendMessage API.
   */
  createAudioMessage(options: MESSAGE_OPTIONS): DB_Message

  /**
   * Create a video message. This API returns a message instance. If you need to send a video message, call the sendMessage API to send this message instance.
   */
  createVideoMessage(options: MESSAGE_OPTIONS): DB_Message

  /**
   * Create a custom message. This API returns a message instance. If you need to send a custom message, call the sendMessage API to send this message instance.
   * If the SDK does not provide the capability you need, use custom messages to customize features, for example, the dice rolling feature.
   */
  createCustomMessage(options: MESSAGE_OPTIONS): DB_Message

  /**
   * Create an emoji message. This API returns a message instance. If you need to send an emoji message, call the sendMessage API to send this message instance.
   */
  createFaceMessage(options: MESSAGE_OPTIONS): DB_Message

  /**
   * Create a file message. This API returns a message instance. If you need to send a file message, call the sendMessage API to send this message instance.
   */
  createFileMessage(options: MESSAGE_OPTIONS): DB_Message

  /**
   * Create a location message. This API returns a message instance. If you need to send a file message, call the sendMessage API to send this message instance.
   */
  createLocationMessage(options: MESSAGE_OPTIONS): DB_Message

  /**
   * Create a combined message. This API returns a message instance. If you need to send a combined message, call the sendMessage API to send this message instance.
   */
  createMergerMessage(options: MESSAGE_OPTIONS): DB_Message

  /**
   * Download a combined message. If the combined message sent by the sender is large in size, the SDK will store it on the cloud, and the message recipient needs to download it from the cloud to the local host before viewing the message.
   */
  downloadMergerMessage(options: MESSAGE_OPTIONS): Promise<any>

  /**
   * Create a forward message. This API returns a message instance. If you need to send a forward message, call the sendMessage API to send this message instance.
   */
  createForwardMessage(options: MESSAGE_OPTIONS): DB_Message

  /**
   * Send a message
   * - The SDK must be in the ready state to call this API to send message instances successfully. The SDK status can be obtained by listening for the following events:
   * TencentCloudChat.EVENT.SDK_READY: triggered when the SDK is in the ready state
   * TencentCloudChat.EVENT.SDK_NOT_READY: triggered when the SDK is in the not ready state
   * - To receive a newly pushed one-to-one message, group message, group notification, or group system message, you need to listen for the TencentCloudChat.EVENT.MESSAGE_RECEIVED event.
   * - Messages sent by this API do not trigger the TencentCloudChat.EVENT.MESSAGE_RECEIVED event. Messages sent by the same account from other clients (or through the RESTful API) trigger the TencentCloudChat.EVENT.MESSAGE_RECEIVED event.
   * - Offline push is applicable only to Android or iOS terminals, and is not supported by web apps or WeChat Mini Programs.
   */
  sendMessage(message: DB_Message, options?: any): Promise<{ code: number; data: { message: any } }>

  /**
   * Recall a one-to-one message or a group message. If the recall is successful, the value of isRevoked for the recalled message is set to true.
   */
  revokeMessage(message: DB_Message): Promise<any>

  /**
   * Resend a message. When a message fails to be sent, call this API to resend it.
   */
  resendMessage(message: DB_Message, options?: any): Promise<any>

  /**
   * Delete messages. After successful deletion, the isDeleted property value of a deleted message is true.
   * For a one-to-one chat, deleted messages cannot be pulled upon the next login of the current user, but the message pulling on the peer end is not affected.
   * For a group chat, deleted messages cannot be pulled upon the next login of the current user, but the message pulling of other members in the group is not affected.
   */
  deleteMessage(messageList: Array<DB_Message>): Promise<any>

  /**
   * 翻译文本。
   */
  translateText(options: TRANSLATE_TEXT_OPTIONS): Promise<any>

  /**
   * 修改消息。
   */
  modifyMessage(message: DB_Message): Promise<{ code: number; data: { message: DB_Message } }>

  // ----------- 会话 -----------

  /**
   * 逐页提取指定对话的消息列表。当用户进入对话后首次呈现消息列表时，或者当用户下拉列表以查看更多消息时，会调用此API。
   */
  getMessageList(
    options: GET_MESSAGE_LIST_OPTIONS
  ): Promise<{ code: number; data: { nextReqMessageID: string; isCompleted: boolean; messageList: DB_Message[] } }>

  /**
   * 按顺序拉取群聊消息或按时间拉取一对一聊天消息。
   */
  getMessageListHopping(options: GET_MESSAGE_LIST_HOPPING_OPTIONS): Promise<any>

  /**
   * Set the unread messages of a conversation to the read state. Messages set to the read state are not counted as unread messages. This API is called when you open or switch a conversation. If this API is not called when you open or switch a conversation, the corresponding messages remain in the unread state.
   */
  setMessageRead(options: { conversationID: string }): Promise<any>

  /**
   * Send read receipts to the message sender for message which have been received.
   * - To send a read receipt to a group message, you need to go to the console and turn on the corresponding switch.
   * - After the API is called successfully, the conversation unread count will not change, and the message sender will receive the TencentCloudChat.TYPES.MESSAGE_READ_RECEIPT_RECEIVED callback, which will carry the latest read information of the message.
   */
  sendMessageReadReceipt(messageList: Array<DB_Message>): Promise<any>

  /**
   * Get read receipts for messages which have been sent by myself
   * - To obtain the read receipt of group message, you need to go to the console and turn on the corresponding switch.
   * - The messages in messageList must be in the same conversation.
   */
  getMessageReadReceiptList(messageList: Array<DB_Message>): Promise<any>

  /**
   * Query local messages in a specified conversation by messageID
   */
  findMessage(messageID: string): DB_Message | null

  /**
   * Get the conversation list.
   * - The profile in the conversation list obtained by this API is incomplete. It contains only the information, such as profile photo and nickname, which is sufficient to meet the rendering requirements of the conversation list. To query the detailed conversation profile, call getConversationProfile.
   * - The conversation retention time is consistent with the storage time of the last message, which is 7 days by default. That is, the conversations will be stored for 7 days by default.
   * - If the options parameter is not provided, it means to get all the conversations.
   * - If the options parameter is provided as an array, it means to get the specified multiple conversations, and if an empty array is passed in, the interface will not return any data.
   * - If the options parameter is provided as an object with properties like type, markType, groupName, hasUnreadCount, and hasGroupAtInfo, it means to filter the conversation list based on these conditions.
   */
  getConversationList(options?: Array<string> | GET_CONVERSATION_LIST_OPTIONS): Promise<any>

  /**
   * Get a conversation profile. When you click a conversation in the conversation list, this API is called to get the detailed information of the conversation.
   */
  getConversationProfile(conversationID: string): Promise<{ code: number; data: { conversation: DB_Session } }>

  /**
   * Delete a conversation or conversations. At the same time, you can choose whether to delete chat history.
   */
  deleteConversation(options: string | DELETE_CONVERSATION_OPTIONS): Promise<any>

  /**
   * Set draft of the conversation.
   */
  // setConversationDraft(options: SET_CONVERSATION_DRAFT_OPTIONS): Promise<any>

  /**
   * Clears chat history with a user or clears chat history from a group from local and the cloud.
   */
  clearHistoryMessage(conversationID: string): Promise<any>

  /**
   * Pin/Unpin a conversation to/from top. After this API is called successfully, the conversation list will be sorted again, and the SDK will distribute the TencentCloudChat.EVENT.CONVERSATION_LIST_UPDATED event.
   */
  pinConversation(options: PIN_CONVERSATION_OPTIONS): Promise<any>

  /**
   * Mark all messages as read
   */
  // setAllMessageRead(options: SET_ALL_MESSAGE_READ_OPTIONS): Promise<any>

  /**
   * You can use this API to mute notifications or enable new message alerts.
   */
  setMessageRemindType(options: SET_MESSAGE_REMIND_TYPE_OPTIONS): Promise<any>

  /**
   * You can use this API to get notification configuration for all receiving messages.
   */
  getAllReceiveMessageOpt(): Promise<any>

  /**
   * Get the total message unread count in conversations.
   * - The total unread message count excludes the unread message count of Do-Not-Disturb conversations.
   */
  getTotalUnreadMessageCount(): number

  // ----------- Conversation Group -----------

  /**
   * Get a list of conversation groups.
   */
  getConversationGroupList(): Promise<any>

  /**
   * Delete a conversation group.
   */
  deleteConversationGroup(groupName: string): Promise<any>

  /**
   * Rename a conversation group. The SDK will trigger TencentCloudChat.EVENT.CONVERSATION_LIST_UPDATED and TencentCloudChat.EVENT.CONVERSATION_GROUP_LIST_UPDATED.
   */
  // renameConversationGroup(options: RENAME_CONVERSATION_GROUP_OPTIONS): Promise<any>

  /**
   * Add conversation list to a group.
   */
  // addConversationsToGroup(options: ADD_CONVERSATIONS_TO_GROUP_OPTIONS): Promise<any>

  /**
   * Delete conversation list from a group.
   */
  // deleteConversationsFromGroup(options: DELETE_CONVERSATIONS_FROM_GROUP_OPTIONS): Promise<any>

  // ----------- Profile -----------
  /**
   * Get your personal profile.
   */
  getMyProfile(): Promise<{ code: number; data: Profile }>

  /**
   * Get other users' profiles. This API will get both standard profile fields and custom profile fields at the same time.
   */
  getUserProfile(options: { userIDList: Array<string> }): Promise<{ code: number; data: Profile[] }>

  /**
   * Update your personal profile.
   */
  updateMyProfile(options: UPDATE_YOUR_PROFILE_OPTIONS): Promise<{ code: number; data: Profile }>

  // ----------- Relationship chain -----------

  /**
   * Get the friend list in the SDK cache. When a friend list is updated, the SDK distributes the TencentCloudChat.EVENT.FRIEND_LIST_UPDATED event.
   */
  getFriendList(): Promise<any>

  /**
   * Get the friend request list in the SDK cache. When a friend request list is updated, the SDK distributes the TencentCloudChat.EVENT.FRIEND_APPLICATION_LIST_UPDATED event.
   */
  getFriendApplicationList(): Promise<any>

  /**
   * Set all friend requests as read.
   */
  setFriendApplicationRead(): Promise<any>

  /**
   * Get the list of friend lists in the SDK cache. When the list of friend lists is updated, the SDK distributes the TencentCloudChat.EVENT.FRIEND_GROUP_LIST_UPDATED event.
   */
  getFriendGroupList(): Promise<any>

  // ----------- GROUP -----------

  /**
   * Get your group list when you need to render or refresh **My Groups**.
   */
  getGroupList(): Promise<{ code: number; data: { groupList: any[] } }>

  /**
   * Get a group profile.
   */
  getGroupProfile(options: GET_GROUP_PROFILE_OPTIONS): Promise<{ code: number; data: { group: any } }>

  /**
   * Create a group.
   * - After creating an audio-video group (TencentCloudChat.TYPES.GRP_AVCHATROOM) via this API, you need to call the joinGroup API to join the group to enable the messaging process.
   */
  createGroup(options: CREATE_GROUP_OPTIONS): Promise<{ code: number; data: { group: any } }>

  /**
   * This API is used by a group owner to delete a group.
   */
  dismissGroup(groupID: string): Promise<{ code: number; data: { groupID: string } }>

  /**
   * Modify a group profile.
   */
  updateGroupProfile(options: any): Promise<{ code: number; data: { group: any } }>

  /**
   * Request to join a specific group.
   * - Users cannot request to join a work group. They can only be added to a work group via addGroupMember.
   * - A user can only join one audio-video group at a time. For example, if a user is already in audio-video group A and attempts to join audio-video group B, the SDK will remove the user from audio-video group A first and then add the user to audio-video group B.
   */
  joinGroup(options: any): Promise<any>

  /**
   * Leave a group.
   * - A group owner can only leave work groups. After the group owner leaves a work group, the work group has no group owner.
   */
  quitGroup(groupID: string): Promise<{ code: number; data: any }>

  /**
   * Search for a group by groupID.
   * Work groups (TencentCloudChat.TYPES.GRP_WORK) cannot be searched.
   */
  searchGroupByID(groupID: string): Promise<any>

  /**
   * Get the number of online users.
   * - This API applies to all types of groups from v3.2.0
   * - It's recommended that you call this API for no more than one time per 5-10 seconds in an audio-video group. In other types of groups, the frequency is limited once every 60 seconds.
   */
  getGroupOnlineMemberCount(groupID: string): Promise<any>

  /**
   * Transfer a group. Only group owners have the permission to transfer groups. Audio-video groups (TencentCloudChat.TYPES.GRP_AVCHATROOM) cannot be transferred.
   */
  // changeGroupOwner(options: CHANGE_GROUP_OWNER_OPTIONS): Promise<any>

  /**
   * Get group joining request list.
   */
  getGroupApplicationList(): Promise<any>

  /**
   * Process (approve or reject) a group joining request.
   * - If a group has more than one admin, all online admins will receive a group system message about the group joining request when someone requests to join the group. If one admin processes the request (accepts or rejects it), the other admins cannot process the request again (that is, cannot modify the processing result).
   */
  // handleGroupApplication(options: HANDLE_GROUP_APPLICATION_OPTIONS): Promise<any>

  /**
   * Initialize group attributes. The business side needs to control the operation permission of this API based on application scenarios.
   * - This API applies only to audio-video groups. If you call this API for other types of groups, this API returns the 2641 error code.
   * - Before using this API, you must call the joinGroup API to join an audio-video group. Otherwise, this API returns the 2642 error code.
   * - Up to 16 group attribute keys are supported, with a length limit of 32 bytes. The size of each group attribute value can be up to 4 KB, and the total size of all group attributes (including keys and values) can be up to 16 KB.
   */
  // initGroupAttributes(options: INIT_GROUP_ATTRIBUTE_OPTIONS): Promise<any>

  /**
   * Set group attributes.
   * - This API applies only to audio-video groups. If you call this API for other types of groups, this API returns the 2641 error code.
   * - Before using this API, you must call the joinGroup API to join an audio-video group. Otherwise, this API returns the 2642 error code.
   */
  // setGroupAttributes(options: SET_GROUP_ATTRIBUTE_OPTIONS): Promise<any>

  // ----------- GROUP MEMBER -----------

  /**
   * Get the group member list.
   * - This API is used to pull paginated list of group members and not the complete list. To get the complete list of group members (memberNum), use getGroupProfile.
   */
  getGroupMemberList(options: any): Promise<{ code: number; data: { memberList: any[]; offset: number } }>

  /**
   * Get group member profiles, including muting durations.
   * - The maximum number of users in each query is 50. If the length of the array passed in is greater than 50, only the first 50 users will be queried and the rest will be discarded.
   */
  getGroupMemberProfile(options: any): Promise<any>

  /**
   * Add group members.
   * - TencentCloudChat.TYPES.GRP_PRIVATE (work group): any group member can invite users to the group and approval by the invitee is not required.
   * - TencentCloudChat.TYPES.GRP_PUBLIC (public group)/TencentCloudChat.TYPES.GRP_MEETING (meeting group): only the app admin can invite users to the group and approval by the invitee is not required.
   * - TencentCloudChat.TYPES.GRP_AVCHATROOM (audio-video chat room): no member (including the app admin) is allowed to invite any user to the group.
   */
  addGroupMember(options: any): Promise<{ code: number; data: any }>

  /**
   * Delete group members. Only the group owner can delete group members.
   */
  deleteGroupMember(options: any): Promise<{ code: number; data: any }>
}

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
