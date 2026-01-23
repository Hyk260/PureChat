import { toFile } from "openai"

/**
 * Convert image URL (data URL or HTTP URL) to File object for OpenAI API
 */
export const convertImageUrlToFile = async (imageUrl: string) => {
  let buffer: Buffer
  let mimeType: string

  if (imageUrl.startsWith("data:")) {
    // a base64 image
    const [mimeTypePart, base64Data] = imageUrl.split(",")
    mimeType = mimeTypePart.split(":")[1].split(";")[0]
    buffer = Buffer.from(base64Data, "base64")
  } else {
    // a http url
    const response = await fetch(imageUrl)
    if (!response.ok) {
      throw new Error(`Failed to fetch image from ${imageUrl}: ${response.statusText}`)
    }
    buffer = Buffer.from(await response.arrayBuffer())
    mimeType = response.headers.get("content-type") || "image/png"
  }

  return toFile(buffer, `image.${mimeType.split("/")[1]}`, { type: mimeType })
}
