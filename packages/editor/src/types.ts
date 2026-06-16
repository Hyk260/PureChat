import type { IDomEditor } from "@wangeditor/editor"

/** 提及用户信息 */
export interface MentionInfo {
  id: string
  [key: string]: unknown
}

/** 文本元素 */
export interface TextElement {
  type: "text"
  children: [{ text: string }]
}

/** 提及元素 */
export interface MentionElement {
  type: "mention"
  value: string
  info: MentionInfo
  children: [{ text: string }]
}

/** 附件元素 */
export interface AttachmentElement {
  type: "attachment"
  link: string
  fileName: string
  fileSize?: string
  children: [{ text: string }]
}

/** 提及插件配置 */
export interface MentionConfig {
  showModal?: (editor: IDomEditor) => void
  hideModal?: (editor: IDomEditor) => void
  pinyinSearch?: boolean
}

/** 文件附件插件配置 */
export interface FilePluginOptions {
  /** 附件点击回调 */
  onFileClick?: (elem: AttachmentElement) => void
}

/** 编辑器配置选项 */
export interface EditorConfigOptions {
  /** 占位文本 */
  placeholder?: string
  /** 提及配置 */
  mentionConfig?: Partial<MentionConfig>
}

/** 图片元素 */
export interface ImageElement {
  type: "image"
  fileName?: string
  id: string
  src: string
  class: string
  children: [{ text: string }]
}

/** 表情图片元素 */
export interface EmojiElement extends ImageElement {
  alt: string
  class: "EmoticonPack"
}

export type DraftChild = Array<{
  text: string
  type?: string
  alt?: string
  value?: string
  class?: string
  children?: DraftChild
}>
// | AttachmentElement
// | MentionElement
// | EmojiElement
// | ImageElement

export type DraftData = Array<{
  type: "paragraph"
  children: DraftChild
}>

// [
//   {
//     type: "paragraph",
//     children: [
//       {
//         text: "",
//       },
//       {
//         type: "attachment",
//         children: [
//           {
//             text: "",
//           },
//         ],
//         fileName: "eslint.config.js",
//         fileSize: "10.2 KB",
//         link: "data:text/javascript;base64,...",
//         path: "",
//       },
//       {
//         text: "",
//       },
//     ],
//   },
// ]
