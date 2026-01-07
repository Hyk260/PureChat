interface BlobToBase64UrlOptions {
  includeMimeType?: boolean
  errorMessage?: string
}
/**
 * Blob 转 Base64 URL
 */
export async function blobToBase64UrlEnhanced(blob: Blob, options: BlobToBase64UrlOptions = {}): Promise<string> {
  const { includeMimeType = false, errorMessage = "Failed to convert Blob to Base64 URL" } = options

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
