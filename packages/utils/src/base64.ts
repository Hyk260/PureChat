/**
 * 跨平台 base64 编码工具
 * 在浏览器和 Node.js 环境中都能工作
 */

/**
 * 将字符串编码为 base64
 * @param input - 要编码的字符串
 * @returns Base64 编码后的字符串
 */
export const encodeToBase64 = (input: string): string => {
  if (typeof btoa === "function") {
    // 浏览器环境
    return btoa(input)
  } else {
    // Node.js 环境
    return Buffer.from(input, "utf8").toString("base64")
  }
}

/**
 * 解码 base64 字符串
 * @param input - 要解码的 base64 字符串
 * @returns 解码后的字符串
 */
export const decodeFromBase64 = (input: string): string => {
  if (typeof atob === "function") {
    // 浏览器环境
    return atob(input)
  } else {
    // Node.js 环境
    return Buffer.from(input, "base64").toString("utf8")
  }
}

/**
 * 创建 Basic 认证头部值
 * @param username - 认证用户名
 * @param password - 认证密码
 * @returns Basic 认证的 Base64 编码凭证
 */
export const createBasicAuthCredentials = (username: string, password: string): string => {
  return encodeToBase64(`${username}:${password}`)
}

/**
 * 将二进制数据转换为 base64 URL 格式
 */
export const bufferToBase64Url = (data: string | Buffer, type = "jpeg") => {
  if (!data) {
    throw new Error("data is required")
  }
  if (typeof data === "string") {
    data = Buffer.from(data, "binary")
  } else if (!(data instanceof Buffer)) {
    throw new Error("string or Buffer expected")
  }
  return `data:image/${type};base64,${data.toString("base64")}`
}

/**
 * 从 base64 字符串中提取 MIME 类型
 */
const extractMimeTypeFromBase64 = (base64: string) => {
  const mimeTypeMatch = base64.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,/)
  return mimeTypeMatch?.[1]
}

/**
 * 将 Base64 字符串转换为 File 对象
 */
export const base64ToFile = (base64: string, filename: string = "image.png", mimeType: string = "image/png"): File => {
  if (!base64.startsWith("data:")) {
    throw new Error("Invalid base64 string format")
  }

  const detectedMimeType = mimeType || extractMimeTypeFromBase64(base64)
  if (!detectedMimeType) {
    throw new Error("Could not determine MIME type from base64 string")
  }

  const base64Data = base64.split(",")[1]
  if (!base64Data) throw new Error("Invalid base64 data")

  const binaryString = atob(base64Data)
  const bytes = new Uint8Array(binaryString.length)

  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i)
  }

  const blob = new Blob([bytes], { type: mimeType })
  return new File([blob], filename, { type: mimeType })
}
