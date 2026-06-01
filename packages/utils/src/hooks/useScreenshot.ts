import dayjs from "dayjs"
import { domToBlob, domToJpeg, domToPng, domToSvg, domToWebp } from "modern-screenshot"

import { useState } from "./useState"

export enum ImageType {
  Blob = "blob",
  JPG = "jpg",
  PNG = "png",
  SVG = "svg",
  WEBP = "webp",
}

interface ImageTypeOption {
  label: string
  value: ImageType
}

export const imageTypeOptions: ImageTypeOption[] = Object.values(ImageType)
  .map((value) => ({
    label: value.toUpperCase(),
    value,
  }))
  .filter((option) => option.value !== ImageType.Blob)

type ScreenshotFunction = (
  element: Element,
  options?: {
    features?: { removeControlCharacter: boolean }
    scale?: number
  }
) => Promise<string | Blob>

interface UseScreenshotOptions {
  target?: string | globalThis.Ref<Element | null, Element | null>
  onError?: (message: string, error?: unknown) => void
  onCopySuccess?: () => void
}

interface ScreenshotHook {
  loading: globalThis.Ref<boolean, boolean>
  onDownload: (imageType: ImageType, title?: string, callback?: () => void) => Promise<void>
}

const SCREENSHOT_FUNCTIONS: Record<ImageType, ScreenshotFunction> = {
  [ImageType.JPG]: domToJpeg,
  [ImageType.PNG]: domToPng,
  [ImageType.SVG]: domToSvg,
  [ImageType.WEBP]: domToWebp,
  [ImageType.Blob]: domToBlob,
}

const PREVIEW_SELECTOR = "#preview"
const SCREENSHOT_OPTIONS = {
  features: {
    removeControlCharacter: false,
  },
  scale: 2,
} as const

function waitForIdle() {
  return new Promise<void>((resolve) => {
    if (typeof window.requestIdleCallback === "function") {
      window.requestIdleCallback(() => resolve())
      return
    }

    window.setTimeout(resolve, 0)
  })
}

function sanitizeFileName(value: string) {
  return value.replace(/[\\/:*?"<>|]/g, "_").trim()
}

/**
 * 将图像数据URL写入系统的剪贴板
 * @param {Blob} blob - 图像Blob对象
 */
async function copyImageToClipboard(blob: Blob, onCopySuccess?: () => void) {
  try {
    if (!navigator.clipboard || typeof ClipboardItem === "undefined") {
      throw new Error("Clipboard API is not available")
    }

    const clipboardItem = new ClipboardItem({ "image/png": blob })
    await navigator.clipboard.write([clipboardItem])
    onCopySuccess?.()
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
function downloadImage(dataUrl: string, imageType: ImageType, title: string = "") {
  const link = document.createElement("a")
  const safeTitle = sanitizeFileName(title)
  const fileName = `${"PureChat"}_${safeTitle ? `${safeTitle}_` : ""}${dayjs().format("YYYY-MM-DD")}.${imageType}`

  link.download = fileName
  link.href = dataUrl

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

function getTargetElement(target: UseScreenshotOptions["target"]) {
  if (typeof target === "string") {
    const element = document.querySelector(target)
    if (!element) {
      throw new Error(`Screenshot target not found: ${target}`)
    }
    return element
  }

  if (target?.value) {
    return target.value
  }

  if (target) {
    throw new Error("Screenshot target is not mounted")
  }

  const element = document.querySelector(PREVIEW_SELECTOR)
  if (!element) {
    throw new Error(`Screenshot target not found: ${PREVIEW_SELECTOR}`)
  }
  return element
}

export const useScreenshot = (options: UseScreenshotOptions = {}): ScreenshotHook => {
  const { target, onError, onCopySuccess } = options
  const [loading, setLoading] = useState(false)

  const handleDownload = async (imageType = ImageType.JPG, title = "", callback?: () => void) => {
    if (loading.value) return

    setLoading(true)

    try {
      if (imageType !== ImageType.Blob) {
        await waitForIdle()
      }

      const screenshotFn = SCREENSHOT_FUNCTIONS[imageType]
      if (!screenshotFn) {
        throw new Error(`Unsupported image type: ${imageType}`)
      }

      const element = getTargetElement(target)

      const dataUrl = await screenshotFn(element, SCREENSHOT_OPTIONS)

      if (imageType === ImageType.Blob) {
        if (!(dataUrl instanceof Blob)) {
          throw new TypeError("Expected Blob data for clipboard operation")
        }
        await copyImageToClipboard(dataUrl, onCopySuccess)
      } else {
        if (typeof dataUrl !== "string") {
          throw new TypeError("Expected string data URL for download operation")
        }
        downloadImage(dataUrl, imageType, title)
      }

      callback?.()
    } catch (error) {
      console.error("Failed to capture image", error)
      onError?.("截图失败", error)
    } finally {
      setLoading(false)
    }
  }

  return {
    loading: loading,
    onDownload: handleDownload,
  }
}
