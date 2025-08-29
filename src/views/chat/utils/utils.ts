import { cloneDeep } from "lodash-es"
import { match } from "pinyin-pro"

import {
  createFileMessage,
  createImageMessage,
  createTextAtMessage,
  createTextMessage,
  createVideoMessage,
} from "@/service/im-sdk-api"
import { useChatStore } from "@/stores"
import { base64ToFile, getBlob, getFileType } from "@/utils/chat"
import emitter from "@/utils/mitt-bus"

export const validateLastMessage = (list) => {
  return list.slice().find((t) => t.ID) || ""
}

// 复制
export const handleCopyMsg = async (data) => {
  const { payload, type } = data
  // 文本
  if (type === "TIMTextElem") {
    window.copyToClipboard(payload.text)
  }
  // 图片
  if (type === "TIMImageElem") {
    const url = payload.imageInfoArray[0].imageUrl
    const imageBlob = await getBlob(url)
    // 创建一个空的 ClipboardItem 对象，并将图片添加到其中
    const clipboardItem = new ClipboardItem({ "image/png": imageBlob })
    // 将 ClipboardItem 对象添加到剪贴板
    navigator.clipboard
      .write([clipboardItem])
      .then(() => {
        window.$message?.success("图片复制成功")
      })
      .catch((error) => {
        console.error("写入剪贴板时出错:", error)
      })
  }
}

/**
 * 发送聊天消息
 */
export async function sendChatMessage(options) {
  console.log("options", options)
  const custom = options.custom || {}
  const messages = []
  const { to, type, text, aitStr, atUserList, files = [], video = [], images = [] } = options || {}
  // 处理图片消息
  for (const t of images) {
    const img = await createImageMessage({ to, type, file: base64ToFile(t.src, t.fileName) })
    messages.push(img)
  }

  // 处理文件消息
  for (const t of files) {
    const file = await createFileMessage({ to, type, file: base64ToFile(t.link, t.fileName), path: t?.path })
    messages.push(file)
  }

  // 处理视频消息
  for (const t of video) {
    const videoItem = await createVideoMessage({ to, type, file: base64ToFile(t.link, t.fileName) })
    messages.push(videoItem)
  }

  // 处理文本消息（@消息或普通文本）
  if (aitStr) {
    const atTextItem = await createTextAtMessage({ to, type, text: aitStr, atUserList, custom })
    messages.push(atTextItem)
  } else if (text) {
    const textItem = await createTextMessage({ to, type, text, custom })
    messages.push(textItem)
  }

  return messages
}

/**
 * 将包含表情图像的 HTML 字符串转换为对应的表情符号文本
 * @param {string} html - 待转换的 HTML 字符串
 * @param {Array} emojiMap - 表情符号和对应的图像数据数组
 * @returns {string} - 转换后的结果
 * <p>12<img src="*" alt="[我最美]" />333</p>
 * 12[我最美]333
 */
export function extractEmojiInfo(editor) {
  const html = editor.getHtml() // 非格式化的 html
  const emojiMap = editor.getElemsByType("image") // 所有图片
  if (!html || !emojiMap || !Array.isArray(emojiMap)) return ""
  const filtered = emojiMap.filter((item) => item.class === "EmoticonPack")
  if (filtered.length === 0) return ""
  const convertedData = filtered.map((item) => ({ [item.src]: item.alt }))
  const extended = { ...Object.assign(...convertedData) }
  // 清除文件消息包含的字符串
  const fileRegex = /<span\s+data-w-e-type="attachment"[^>]*>(.*?)<\/span>/g
  const str = html.replace(fileRegex, "")
  // 替换表情包图片为字符串 -> '[**]'
  const regex = /<img src="([^"]+)"[^>]+>/g
  const result = str.replace(regex, (match, src) => {
    const emojiText = extended[src] || ""
    return emojiText
  })
  const text = result.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, "")
  return text
}

/**
 * 提取图片信息
 */
export const extractImageInfo = (editor) => {
  let images = null
  const image = editor.getElemsByType("image")
  // 过滤表情包消息
  images = image.filter((item) => item.class !== "EmoticonPack")
  return { images }
}

function isVideoFile(fileName) {
  const video = ["mp4", "wmv", "webm"]
  const name = fileName.toLowerCase()
  const regex = new RegExp(`(${video.join("|")})$`, "i")
  return regex.test(name)
}
/**
 * 提取文件信息
 */
export const extractFilesInfo = (editor) => {
  const file = []
  const files = editor.getElemsByType("attachment")
  files.map((t) => !isVideoFile(getFileType(t.fileName)) && file.push(t))
  return { files: file }
}
/**
 * 提取视频信息
 */
export const extractVideoInfo = (editor) => {
  const video = []
  const files = editor.getElemsByType("attachment")
  files.map((t) => isVideoFile(getFileType(t.fileName)) && video.push(t))
  return { video }
}

/**
 * 从编辑器中提取@提及信息和纯文本内容
 * @param editor 编辑器实例
 * @returns 包含纯文本内容和@用户ID列表的对象
 */
export const extractAitInfo = (editor) => {
  let aitStr = ""
  const atUserList = []

  const html = editor.getHtml()
  const mentions = editor.getElemsByType("mention")

  if (!mentions.length) {
    return { aitStr, atUserList }
  }

  const fileTagRegex = /<span\s+data-w-e-type="attachment"[^>]*>.*?<\/span>/g
  const htmlTagRegex = /<[^>]+>/g
  const nbspRegex = /&nbsp;/gi

  aitStr = html
    .replace(fileTagRegex, "") // 移除附件标签
    .replace(htmlTagRegex, "") // 移除所有HTML标签
    .replace(nbspRegex, "") // 移除&nbsp;

  const uniqueUserIds = new Set()
  mentions.forEach((mention) => {
    if (mention.info?.id) {
      uniqueUserIds.add(mention.info.id)
    }
  })

  return {
    aitStr,
    atUserList: Array.from(uniqueUserIds),
  }
}

/**
 * 根据拼音搜索当前成员列表中的匹配项。
 * @param {string} searchStr - 要搜索的拼音字符串。
 * @returns {Array} - 匹配项的数组。
 */
export function searchByPinyin({ searchStr, list }) {
  if (!searchStr) {
    console.warn("searchStr is null")
    return "empty"
  }
  // 如果过滤后的列表为空，触发空结果的事件并返回
  if (!list || list.length === 0) {
    emitter.emit("setMentionModal", { type: "empty" })
    return "empty"
  }
  const memberList = cloneDeep(list)
  // 存储匹配项的索引
  const indices = []
  // 遍历过滤后的成员列表
  memberList.forEach((item) => {
    // 使用 match 函数进行拼音匹配
    const nickPinyin = match(item.nick, searchStr)
    // 如果拼音匹配结果长度大于 0，将当前项添加到索引数组中
    if (nickPinyin?.length > 0) {
      indices.push(item)
    }
  })
  // 触发相应的事件根据匹配结果触发不同的操作
  const eventType = indices.length === 0 ? "empty" : "success"

  emitter.emit("setMentionModal", {
    content: indices,
    type: eventType,
    searchlength: searchStr.length + 1, // +1 包含@长度
  })

  return eventType
}

/**
 * 根据输入的字符串过滤提及列表并触发相关操作。
 * @param {string} inputStr - 输入的字符串。
 */
export function filterMentionList({ str, list }) {
  const inputStr = str
  // 如果输入字符串为空 且没有 "@" 符号，关闭提及模态框并返回
  if (inputStr === "" || inputStr.lastIndexOf("@") == -1) {
    useChatStore().$patch({ isMentionModalVisible: false })
    return
  }
  // 如果输入字符串仅包含 "@" 符号，或则字符结尾，触发 setMentionModal 操作并返回
  if (inputStr === "@" && inputStr.endsWith("@")) {
    return "all"
  }
  emitter.emit("setMentionModal", { type: "updata" })
  // 获取最后一个 "@" 符号的索引位置
  const lastAtIndex = inputStr.lastIndexOf("@")
  // 如果找不到 "@" 符号，关闭提及模态框并返回
  if (lastAtIndex === -1) {
    useChatStore().$patch({ isMentionModalVisible: false })
    return
  }
  const text = inputStr.substring(lastAtIndex)
  const searchStr = text.substring(1)
  if (!searchStr) return
  // 执行根据拼音搜索的操作
  return searchByPinyin({ searchStr, list })
}
