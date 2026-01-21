import { loading, warning } from "@/config/custom"

/**
 * 检查用户性别
 * @param data 包含性别信息的对象
 * @param type 性别类型（"Male"或"Female"）
 * @returns 是否为指定性别
 */
export const getGender = (data: { gender?: string }, type: string = ""): boolean => {
  return data?.gender === `Gender_Type_${type}`
}

/**
 * 消息内容类型
 */
type MessageContentType = "loading" | "warning"

/**
 * 消息内容集合
 */
const messageCollection = {
  loading,
  warning,
}

/**
 * 构建消息内容
 * @param data 消息数据
 * @param type 消息类型
 * @returns JSON字符串形式的消息内容
 */
export function msgContent(data: any, type: MessageContentType): string {
  const msgTemplate = messageCollection[type]

  if (!msgTemplate) {
    throw new Error(`Unknown message type: ${type}`)
  }

  const _data = {
    data: {
      ...msgTemplate,
    },
    versions: __APP_INFO__.pkg.version,
    display: 0,
    onlyID: type,
    listMessage: "",
  }

  // 处理警告类型的特殊数据
  if (type === "warning" && _data.data.body?.text) {
    _data.data.body.text.value = data?.value || ""
    if (data && typeof data === "object" && "provider" in data) {
      _data.data.body.text.provider = data?.provider || ""
    }
  }

  return JSON.stringify(_data)
}

/**
 * 自定义消息内容参数
 */
interface CustomMsgParams {
  data?: any
  type: MessageContentType
}

/**
 * 获取自定义消息内容
 * @param params 参数对象
 * @returns 格式化的自定义消息对象
 */
export function getCustomMsgContent(params: CustomMsgParams) {
  const { data = null, type } = params

  return {
    data: msgContent(data, type),
    description: type,
    extension: "",
  }
}
