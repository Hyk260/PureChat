interface BlobToBase64UrlOptions {
  includeMimeType?: boolean
  errorMessage?: string
}
/**
 * Blob 转 Base64 URL
 */
export async function blobToBase64UrlEnhanced(blob: Blob, options: BlobToBase64UrlOptions = {}): Promise<string> {
  const { includeMimeType = true, errorMessage = "Failed to convert Blob to Base64 URL" } = options

  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onloadend = () => {
      try {
        const result = reader.result as string

        if (includeMimeType) {
          // 包含 MIME 类型的完整 Data URL
          const base64Url = result
            .replace(/^data:.*?;base64,/, "data:image/*;base64,")
            .replace(/\+/g, "-")
            .replace(/\//g, "_")
            .replace(/=+$/, "")
          resolve(base64Url)
        } else {
          // 仅 Base64 URL 部分
          const base64 = result.split(",")[1]
          const base64Url = base64?.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "") ?? ""
          resolve(base64Url)
        }
      } catch (error) {
        console.error("blobToBase64UrlEnhanced error:", error)
        reject(new Error(errorMessage))
      }
    }

    reader.onerror = () => reject(new Error("Failed to read Blob data"))

    reader.readAsDataURL(blob)
  })
}

/**
 * 将 Blob 转换为 ArrayBuffer
 * @param blob Blob 对象
 * @returns ArrayBuffer
 */
export async function blobToArrayBuffer(blob: Blob): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as ArrayBuffer)
    reader.onerror = () => reject(new Error("读取 Blob 失败"))
    reader.readAsArrayBuffer(blob)
  })
}

export function readFromFile() {
  return new Promise((res, rej) => {
    const fileInput = document.createElement("input")
    fileInput.type = "file"
    fileInput.accept = "application/json"

    fileInput.onchange = (event) => {
      const file = (event.target as HTMLInputElement).files?.[0]
      const fileReader = new FileReader()
      fileReader.onload = (e) => {
        res(e.target?.result)
      }
      fileReader.onerror = () => rej(new Error("文件读取失败"))
      fileReader.readAsText(file as File)
    }

    fileInput.click()
  })
}

/**
 * 将 File 对象转换为 Base64 字符串
 */
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result as string))
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

// 'blob:http://localhost:8080/d5d25c...' => 'data:image/...'
export const convertBlobUrlToDataUrl = async (blobUrl: string) => {
  try {
    const response = await fetch(blobUrl)
    const blob = await response.blob()
    const dataUrl = await fileToBase64(blob as File)
    return dataUrl
  } catch (error) {
    console.error("Error converting blob to data URL:", error)
    return ""
  }
}

/**
 * 返回给定文件名的类型，即文件的扩展名。
 * 例如，对于文件名 "example.txt"，它将返回 "txt"。
 */
export const getFileType = (filename: string) => {
  if (!filename) return ""
  const lastPart = filename.split("/").pop()
  if (lastPart === ".") return ""
  const parts = lastPart?.split(".")
  if (parts?.length && parts.length > 1) return parts.pop() || ""
  return ""
}

/**
 * 获取图片的类型
 */
export const getImageType = (str: string) => {
  const reg = /\.(png|jpg|gif|jpeg|webp)$/
  const match = str.match(reg)
  if (!match) {
    throw new Error("无法从输入字符串中提取图像类型")
  }
  return match[1]
}
