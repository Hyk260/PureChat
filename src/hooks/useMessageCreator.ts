import {
  createFileMessage,
  createImageMessage,
  createTextAtMessage,
  createTextMessage,
  createVideoMessage,
} from "@/service/im-sdk-api"
import { base64ToFile } from "@/utils/chat"

interface MediaFile {
  link: string
  fileName: string
  path?: string
}

interface ImageFile {
  src: string
  fileName: string
}

interface MessageConfig {
  to: string
  type: string
  custom?: Record<string, any>
}

interface TextContent {
  text?: string
  aitStr?: string
  atUserList?: any[]
}

interface MessagePayload extends MessageConfig, TextContent {
  files?: MediaFile[]
  video?: MediaFile[]
  images?: ImageFile[]
}

/**
 * 消息创建器 Hook
 * @description 用于创建各类消息对象的自定义 Hook
 */
export const useMessageCreator = () => {
  /**
   * 创建图片消息
   */
  const createImageMessages = async (images: ImageFile[] = [], config: MessageConfig) => {
    const { to, type } = config

    return Promise.all(
      images.map(async (img) => {
        const file = base64ToFile(img.src, img.fileName)
        return createImageMessage({ to, type, file })
      })
    )
  }

  /**
   * 创建文件消息
   */
  const createFileMessages = (files: MediaFile[] = [], config: MessageConfig) => {
    const { to, type } = config

    return files.map((file) => {
      const fileData = base64ToFile(file.link, file.fileName)
      return createFileMessage({
        to,
        type,
        file: fileData,
        path: file.path,
      })
    })
  }

  /**
   * 创建视频消息
   */
  const createVideoMessages = (videos: MediaFile[] = [], config: MessageConfig) => {
    const { to, type } = config

    return videos.map((video) => {
      const file = base64ToFile(video.link, video.fileName)
      return createVideoMessage({ to, type, file })
    })
  }

  /**
   * 创建文本消息
   */
  const createTextMessages = (textContent: TextContent, config: MessageConfig) => {
    const { to, type, custom } = config
    const { text, aitStr, atUserList } = textContent

    if (aitStr) {
      return [createTextAtMessage({ to, type, text: aitStr, atUserList, custom })]
    }

    if (text) {
      return [createTextMessage({ to, type, text, custom })]
    }

    return []
  }

  /**
   * 创建消息列表
   */
  const createMessageList = async (payload: MessagePayload) => {
    try {
      const { to, type, custom = {}, text, aitStr, atUserList, files = [], video = [], images = [] } = payload

      const config = { to, type, custom }

      // 并行处理所有消息创建
      const [imageMessages, textMessages] = await Promise.all([
        // 处理媒体消息
        Promise.all([
          createImageMessages(images, config),
          Promise.resolve(createFileMessages(files, config)),
          Promise.resolve(createVideoMessages(video, config)),
        ]),
        // 处理文本消息
        Promise.resolve(createTextMessages({ text, aitStr, atUserList }, config)),
      ])

      // 展平并合并所有消息
      return [...imageMessages.flat(), ...textMessages]
    } catch (error) {
      console.error("创建消息列表失败:", error)
      throw new Error("创建消息列表失败")
    }
  }

  return {
    createMessageList,
    createImageMessages,
    createFileMessages,
    createVideoMessages,
    createTextMessages,
  }
}
