import dayjs from "dayjs"
import { domToBlob, domToJpeg, domToPng, domToSvg, domToWebp } from "modern-screenshot"

import { useState } from "@/hooks/useState"

export const ImageType = {
  Blob: "blob",
  JPG: "jpg",
  PNG: "png",
  SVG: "svg",
  WEBP: "webp",
}

export const imageTypeOptions = Object.values(ImageType).map((value) => ({
  label: value.toUpperCase(),
  value,
}))

const SCREENSHOT_FUNCTIONS = {
  [ImageType.JPG]: domToJpeg,
  [ImageType.PNG]: domToPng,
  [ImageType.SVG]: domToSvg,
  [ImageType.WEBP]: domToWebp,
  [ImageType.Blob]: domToBlob,
}

/**
 * 将图像数据URL写入系统的剪贴板
 * @param {Blob} blob - 图像Blob对象
 */
async function copyImageToClipboard(blob: Blob) {
  try {
    const clipboardItem = new ClipboardItem({ "image/png": blob })
    await navigator.clipboard.write([clipboardItem])
    window.$message?.success("图片复制成功")
  } catch (error) {
    console.error("写入剪贴板时出错:", error)
    throw error
  }
}

/**
 * 下载图像文件
 * @param {string} dataUrl - 图像数据URL
 * @param {ImageType} imageType - 图像类型
 * @param {string} [title] - 可选标题
 */
function downloadImage(dataUrl: string, imageType: string, title: string) {
  const link = document.createElement("a")
  const name = `${"PureChat"}_${title ? `${title}_` : ""}${dayjs().format("YYYY-MM-DD")}.${imageType}`
  link.download = name
  link.href = dataUrl
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export const useScreenshot = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const handleDownload = async (imageType = ImageType.JPG, title = "", callback: () => void) => {
    setLoading(true)

    try {
      await new Promise((resolve) => requestIdleCallback(resolve))

      const screenshotFn = SCREENSHOT_FUNCTIONS[imageType]
      if (!screenshotFn) {
        throw new Error(`Unsupported image type: ${imageType}`)
      }

      const element = document.querySelector("#preview")
      if (!element) throw new Error("Preview element not found")

      const dataUrl = await screenshotFn(element, {
        features: {
          removeControlCharacter: false,
        },
        scale: 2,
      })

      if (imageType === ImageType.Blob) {
        await copyImageToClipboard(dataUrl)
      } else {
        downloadImage(dataUrl, imageType, title)
      }

      callback?.()
    } catch (error) {
      console.error("Failed to capture image", error)
      window.$message?.error("截图失败")
    } finally {
      setLoading(false)
    }
  }

  return {
    loading,
    onDownload: handleDownload,
  }
}
