import { loading, warning } from "@database/custom/index"

/**
 * 检测是否为移动设备
 */
export const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)

/**
 * 延迟执行函数
 * @param ms 延迟的毫秒数，默认为200毫秒
 * @returns Promise对象，在指定时间后resolve
 */
export const delay = (ms: number = 200): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms))

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
 * 检测是否为 macOS 或 iOS 设备
 * @returns 是否为 Apple 系统
 */
export function isMacOS(): boolean {
  if (typeof window !== "undefined") {
    const userAgent = window.navigator.userAgent.toLowerCase()
    return /iphone|ipad|ipod|macintosh/.test(userAgent)
  }
  return false
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
 * 获取操作系统类型
 * @param userAgent 用户代理字符串，默认为navigator.userAgent
 * @returns 操作系统名称（"Windows"、"macOS"或空字符串）
 */
export function getOperatingSystem(userAgent: string = navigator.userAgent): string {
  if (userAgent.includes("Windows")) {
    return "Windows"
  } else if (userAgent.includes("Macintosh")) {
    return "macOS"
  } else {
    return ""
  }
}

/**
 * 创建文件输入对话框的配置选项
 */
export interface CreateFileInputOptions {
  /** 可接受的文件类型数组 */
  accept: string[]
  /** 文件选择变化时的回调函数 */
  onChange: (files: FileList | null) => void
}

/**
 * 创建并触发文件选择对话框
 * @param options 配置选项
 */
export const createFileInput = (options: CreateFileInputOptions): void => {
  if (!options || !Array.isArray(options.accept) || typeof options.onChange !== "function") {
    throw new Error("Invalid options provided to createFileInput")
  }

  const input = document.createElement("input")
  input.type = "file"
  input.accept = options.accept.join(",")
  input.style.display = "none"

  const handleChange = (event: Event) => {
    const target = event.target as HTMLInputElement
    const files = target?.files ?? null
    cleanup()
    options.onChange(files)
  }

  const handleWindowFocus = () => {
    setTimeout(() => {
      if (document.body.contains(input)) {
        cleanup()
        options.onChange(null)
      }
    }, 300)
  }

  const cleanup = () => {
    if (document.body.contains(input)) {
      document.body.removeChild(input)
    }
    input.removeEventListener("change", handleChange)
    window.removeEventListener("focus", handleWindowFocus)
  }

  try {
    // 添加事件监听器
    input.addEventListener("change", handleChange)
    window.addEventListener("focus", handleWindowFocus)

    // 添加到DOM并触发点击
    document.body.appendChild(input)
    input.click()
  } catch (error) {
    // 出错时确保清理资源
    cleanup()
    throw new Error(`Failed to create file input: ${error instanceof Error ? error.message : String(error)}`)
  }
}

/**
 * 检查对象是否包含指定的键
 * @param obj 要检查的对象
 * @param key 要查找的键名
 * @returns 对象是否包含该键
 */
export function hasObjectKey(obj: unknown, key: string): boolean {
  return typeof obj === "object" && obj !== null && Object.prototype.hasOwnProperty.call(obj, key)
}

/**
 * 打开新窗口
 * @param url 要打开的URL
 * @param options 打开窗口的选项
 * @param options.target 目标窗口，默认为"_blank"
 * @param options.noopener 是否设置noopener属性，默认为true
 * @param options.noreferrer 是否设置noreferrer属性，默认为true
 * @returns 新打开的窗口对象
 */
export const openWindow = (
  url: string,
  { target = "_blank", noopener = true, noreferrer = true } = {}
): Window | null => {
  const features = [noopener && "noopener=yes", noreferrer && "noreferrer=yes"].filter(Boolean).join(",")

  return window.open(url, target, features)
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

/**
 * HTML实体映射
 */
const htmlEntities: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&apos;",
}

/**
 * 将字符串中的特殊字符进行 HTML 转义
 * @param str 需要转义的字符串
 * @returns 转义后的字符串
 */
export const encodeHTML = (str: string): string => {
  if (typeof str !== "string") {
    throw new Error("encodeHTML expects a string parameter")
  }

  return str.replace(/[&<>"']/g, (match) => htmlEntities[match] ?? match)
}
