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
 * 获取当前Unix时间戳（秒级）
 * @returns 当前Unix时间戳（秒级）
 */
export const getUnixTimestampSec = (): number => {
  return Math.floor(Date.now() / 1000)
}

/**
 * 获取当前Unix时间戳（毫秒级）
 * @returns 当前Unix时间戳（毫秒级）
 */
export const getUnixTimestampMs = (): number => {
  return Date.now()
}

/**
 * 获取比当前实际时间快1秒的Unix时间戳（秒级）
 * @returns 超前1秒的秒级Unix时间戳
 */
export const getUnixTimestampSecPlusOne = (): number => {
  return getUnixTimestampSec() + 1
}

/**
 * 图片信息接口
 */
export interface ImageInfo {
  url: string
  width?: number
  height?: number
}

/**
 * 图片输入数据接口
 */
export interface ImageInputData {
  payload: {
    imageInfoArray: ImageInfo[]
  }
}

/**
 * 获取图片的宽度和高度属性
 * @param imageUrl 图片地址
 * @returns 包含图片宽度和高度的 Promise 对象
 */
export function getImageSize(imageUrl: string): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image()

    // 防止跨域问题
    if (imageUrl.startsWith("http")) {
      img.crossOrigin = "anonymous"
    }

    // 图片加载成功时返回宽高
    img.onload = () => resolve({ width: img.width, height: img.height })

    // 图片加载失败时进行错误处理
    img.onerror = () => reject(new Error(`Failed to load image: ${imageUrl}`))

    // 超时处理
    setTimeout(() => {
      reject(new Error(`Image loading timeout: ${imageUrl}`))
    }, 10000)

    // 设置图片的源
    img.src = imageUrl
  })
}

/**
 * 计算并更新图片宽高
 * @param imageInput 包含图片信息的输入对象
 * @param index 需要更新的图片索引
 * @returns 更新后的图片输入对象
 */
export const updateImageSize = async (imageInput: ImageInputData, index: number = 0): Promise<ImageInputData> => {
  if (!imageInput?.payload?.imageInfoArray) {
    throw new Error("Invalid imageInput structure")
  }

  const { imageInfoArray } = imageInput.payload

  // 提前进行边界检查，避免数组索引越界
  if (index < 0 || index >= imageInfoArray.length) {
    throw new Error(`Invalid image index: ${index}, array length: ${imageInfoArray.length}`)
  }

  const targetImage = imageInfoArray[index]

  if (!targetImage?.url) {
    throw new Error("Target image missing URL property")
  }

  // 获取宽高并更新目标图片的元数据
  const { width, height } = await getImageSize(targetImage.url)
  targetImage.width = width
  targetImage.height = height

  // 返回更新后的对象
  return imageInput
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
