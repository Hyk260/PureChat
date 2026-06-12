import { documentExts, textExts } from "@pure/const"
import { fileToBase64, formatSize, getFileType } from "@pure/utils"
import type { IDomEditor } from "@wangeditor/editor"

import type { AttachmentElement, EmojiElement, ImageElement, MentionElement } from "./types"

/** 文本文件扩展名集合 */
export const TEXT_FILE_EXTENSIONS = new Set([...textExts, ...documentExts])

/** 判断是否为文本文件 */
export const isTextFile = (fileName: string): boolean => {
  const extension = fileName.toLowerCase()
  return TEXT_FILE_EXTENSIONS.has(`.${extension}`)
}

/** 创建媒体元素 */
export const createMediaElement = (type: string, props: Record<string, unknown> = {}) => ({
  type,
  children: [{ text: "" }],
  ...props,
})

/** 处理 AI 助手上传的文件 */
export const handleAssistantFile = async (file: File, editor: IDomEditor) => {
  if (!file || !editor) return

  const fileType = getFileType(file?.name)

  if (!isTextFile(fileType)) {
    console.warn(`暂不支持${fileType || file.name}文件`)
    return
  }

  const type = file.type.match("^image/") ? "image" : "file"
  const base64Url = await fileToBase64(file)
  if (type === "image") {
    const imageElement = createMediaElement("image", {
      src: base64Url,
      fileName: file.name,
      style: { width: "125px" },
    })
    editor.insertNode(imageElement)
  } else if (type === "file") {
    const fileElement = createMediaElement("attachment", {
      fileName: file.name,
      fileSize: formatSize(file.size),
      link: base64Url,
      path: (file as { path?: string }).path || "",
    })
    editor.insertNode(fileElement)
  }
}

/** 处理粘贴字符串 */
export const handleString = (item: DataTransferItem, editor: IDomEditor): void => {
  if (item.type === "text/plain") {
    item.getAsString((str) => {
      editor.insertText(str.trimStart())
    })
  }
}

/** 插入表情 */
export const insertEmoji = (option: { url: string; item: string }, editor: IDomEditor) => {
  if (!editor) throw new Error("editor is undefined")
  const { url, item } = option

  const emojiElement = createMediaElement("image", {
    class: "EmoticonPack",
    src: url,
    alt: item,
    style: { width: "26px" },
  })
  editor.restoreSelection()
  editor.insertNode(emojiElement)
  editor.focus(true)
}

/** 自定义警告弹窗（替换 wangeditor 默认 alert） */
export const customAlert = (s: string, t: string): void => {
  switch (t) {
    case "success":
    case "info":
    case "warning":
    case "error":
    default:
      console.log(`[editor ${t}]`, s)
      break
  }
}

export const handleEditorKeyDown = (visible: boolean): void => {
  if (!visible) return
  const container = document.querySelector(".w-e-text-container") as HTMLDivElement
  if (!container) return
  container.onkeydown = (e) => {
    // 键盘上下键
    if ([38, 40].includes(e.keyCode)) {
      return false
    }
    return true
  }
}

/**
 * 判断文件是否为视频文件
 */
export const isVideoFile = (fileName: string): boolean => {
  const video = ["mp4", "wmv", "webm"]
  const name = fileName.toLowerCase()
  const regex = new RegExp(`(${video.join("|")})$`, "i")
  return regex.test(name)
}

/**
 * 将包含表情图像的 HTML 字符串转换为对应的表情符号文本
 * @param editor 编辑器实例
 * @returns 转换后的表情文本
 *
 * 示例：
 * `<p>12<img src="*" alt="[酷]" />333</p>` → `12[酷]333`
 */
export const extractEmojiInfo = (editor: IDomEditor): string => {
  const html = editor.getHtml()
  const emojiMap = editor.getElemsByType("image") as EmojiElement[]

  if (!html || !emojiMap || !Array.isArray(emojiMap)) return ""

  const filtered = emojiMap.filter((item) => item.class === "EmoticonPack")
  if (filtered.length === 0) return ""

  const convertedData = filtered.map((item) => ({ [item.src]: item.alt }))
  const extended = Object.assign({}, ...convertedData) as Record<string, string>

  // 清除文件消息包含的字符串
  const fileRegex = /<span\s+data-w-e-type="attachment"[^>]*>(.*?)<\/span>/g
  const str = html.replace(fileRegex, "")

  // 替换表情包图片为字符串 -> '[**]'
  const imgRegex = /<img src="([^"]+)"[^>]+>/g
  const result = str.replace(imgRegex, (_match, src: string) => extended[src] || "")

  return result.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, "")
}

/**
 * 提取图片信息（过滤表情包消息）
 */
export const extractImageInfo = (editor: IDomEditor): { images: ImageElement[] } => {
  const image = editor.getElemsByType("image") as ImageElement[]
  const images = image.filter((item) => item?.class !== "EmoticonPack")
  return { images }
}

/**
 * 提取文件信息（过滤视频文件）
 */
export const extractFilesInfo = (editor: IDomEditor): { files: AttachmentElement[] } => {
  const files = editor.getElemsByType("attachment") as unknown as AttachmentElement[]
  const filtered = files.filter((t) => !isVideoFile(getFileType(t.fileName)))
  return { files: filtered }
}

/**
 * 提取视频信息
 */
export const extractVideoInfo = (editor: IDomEditor): { video: AttachmentElement[] } => {
  const files = editor.getElemsByType("attachment") as unknown as AttachmentElement[]
  const video = files.filter((t) => isVideoFile(getFileType(t.fileName)))
  return { video }
}

/**
 * 从编辑器中提取 @ 信息和纯文本内容
 * @param editor 编辑器实例
 * @returns 包含纯文本内容和 @ 用户 ID 列表的对象
 */
export const extractAitInfo = (
  editor: IDomEditor
): {
  aitStr: string
  atUserList: string[]
} => {
  const aitStr = ""
  const atUserList: string[] = []

  const html = editor.getHtml()
  const mentions = editor.getElemsByType("mention") as unknown as MentionElement[]

  if (!mentions.length) {
    return { aitStr, atUserList }
  }

  // 移除附件标签
  const fileTagRegex = /<span\s+data-w-e-type="attachment"[^>]*>.*?<\/span>/g
  // 移除HTML标签
  const htmlTagRegex = /<[^>]+>/g
  // 移除&nbsp
  const nbspRegex = /&nbsp;/gi

  const cleanedHtml = html.replace(fileTagRegex, "").replace(htmlTagRegex, "").replace(nbspRegex, "")

  const uniqueUserIds = new Set<string>()
  mentions.forEach((item) => {
    if (item?.info?.id) {
      uniqueUserIds.add(item.info.id)
    }
  })

  return {
    aitStr: cleanedHtml,
    atUserList: Array.from(uniqueUserIds),
  }
}

// ---------------------------------------------------------------------------
// 文件处理
// ---------------------------------------------------------------------------

/** 最大文件大小 (MB) */
export const MAX_FILE_SIZE_MB = 100

/** 最大文件大小 (Bytes) */
export const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024

/** 文件处理外部回调 */
export interface FileHandlerCallbacks {
  /** 警告消息回调 */
  onWarning?: (message: string) => void
  /** 错误消息回调 */
  onError?: (message: string) => void
}

/** handleFiles 选项 */
export interface HandleFilesOptions {
  /** 是否为 AI 助手模式 */
  isAssistant?: boolean
  /** 最大文件大小 (MB)，默认 MAX_FILE_SIZE_MB */
  maxFileSizeMB?: number
  /** 外部回调 */
  callbacks?: FileHandlerCallbacks
}

/**
 * 处理文件拖拽/粘贴到编辑器
 * 在 AI 助手模式下会路由到 handleAssistantFile，否则将文件转为 base64 插入编辑器
 *
 * @param file - 文件对象
 * @param editor - 编辑器实例
 * @param type - 插入类型：image 或 file，默认 file
 * @param options - 可选配置
 */
export const handleFiles = async (
  file: File | null,
  editor?: IDomEditor,
  type: "image" | "file" = "file",
  options: HandleFilesOptions = {}
): Promise<void> => {
  if (!editor || !file) throw new Error("file editor is not ready")

  const { isAssistant = false, maxFileSizeMB = MAX_FILE_SIZE_MB, callbacks } = options
  const maxFileSizeBytes = maxFileSizeMB * 1024 * 1024

  if (file.size > maxFileSizeBytes) {
    callbacks?.onWarning?.(`文件不能大于${maxFileSizeMB}MB`)
    return
  }

  if (isAssistant) {
    return handleAssistantFile(file, editor)
  }

  try {
    const base64Url = await fileToBase64(file)
    editor.restoreSelection()

    if (type === "image") {
      const imageElement = createMediaElement("image", {
        src: base64Url,
        fileName: file.name,
        style: { width: "125px" },
      })
      editor.insertNode(imageElement)
    } else if (type === "file") {
      const fileElement = createMediaElement("attachment", {
        fileName: file.name,
        fileSize: formatSize(file.size),
        link: base64Url,
        path: (file as { path?: string }).path || "",
      })
      editor.insertNode(fileElement)
    }

    editor.move(1)
  } catch (error) {
    console.error(`${type}处理错误:`, error)
    callbacks?.onError?.(`${type}处理失败`)
  }
}

/**
 * 处理编辑器粘贴事件
 *
 * @param editor - 编辑器实例
 * @param event - 剪贴板事件
 * @param onFile - 文件处理回调，接收 File 对象和类型
 * @param callback - wangeditor paste 完成回调（传 false 阻止默认行为）
 */
export const handlePaste = (
  editor: IDomEditor,
  event: ClipboardEvent,
  onFile?: (file: File, type: "image" | "file") => void,
  callback?: (continuePaste: boolean) => void
): void => {
  const clipboardItems = Array.from(event?.clipboardData?.items || [])

  clipboardItems.forEach((item) => {
    if (item.kind === "file") {
      const file = item.getAsFile()
      if (file && onFile) {
        onFile(file, item.type.match("^image/") ? "image" : "file")
      }
    } else if (item.kind === "string") {
      handleString(item, editor)
    }
  })

  event.preventDefault()
  callback?.(false)
}

/**
 * 处理编辑器文件拖放事件
 *
 * @param event - 拖放事件
 * @param onFile - 文件处理回调，接收 File 对象和类型
 */
export const handleFileDrop = (event: DragEvent, onFile?: (file: File, type: "image" | "file") => void): void => {
  // 文本拖放由浏览器默认处理
  if (event?.dataTransfer?.getData("text/plain")) return

  const droppedFiles = Array.from(event.dataTransfer?.files || [])
  droppedFiles.forEach((file) => {
    onFile?.(file, file.type.match("^image/") ? "image" : "file")
  })

  event.preventDefault()
}

/**
 * 插入 @mention 节点到编辑器
 *
 * @param options.id - 用户 ID
 * @param options.name - 显示名称
 * @param options.backward - 是否回退删除一个字符（默认 true）
 * @param options.deleteDigit - 删除指定数量的字符（优先级高于 backward）
 * @param options.editor - 编辑器实例
 */
export const insertMention = (options: {
  id: string
  name: string
  backward?: boolean
  deleteDigit?: number
  editor?: IDomEditor | null
}): void => {
  const { id, name, backward = true, deleteDigit = 0, editor = null } = options

  if (!editor) {
    console.warn("editor is null")
    return
  }

  const mentionNode = createMediaElement("mention", {
    value: `${name} `,
    info: { id },
  })

  editor.restoreSelection()
  if (deleteDigit) {
    for (let i = 0; i < deleteDigit; i++) {
      editor.deleteBackward("character")
    }
  } else if (backward) {
    editor.deleteBackward("character")
  }
  editor.insertNode(mentionNode)
  editor.move(1)
}
