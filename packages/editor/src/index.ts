import { Boot } from "@wangeditor/editor"

import "./style/index.css"

import ctrlEnterModule from "./plugin-ctrl-enter"
import fileModule from "./plugin-file"
import mentionModule from "./plugin-mention"

// 注册编辑器插件
Boot.registerModule(fileModule)
Boot.registerModule(mentionModule)
Boot.registerModule(ctrlEnterModule)

export { createEditorConfig, toolbarConfig } from "./config"
export {
  extractAitInfo,
  extractEmojiInfo,
  extractFilesInfo,
  extractImageInfo,
  extractVideoInfo,
  isVideoFile,
} from "./editor-utils"
export { default as ctrlEnterModule } from "./plugin-ctrl-enter"
export { setFilePluginOptions } from "./plugin-file"
export { default as fileModule } from "./plugin-file"
export { default as mentionModule } from "./plugin-mention"
export type {
  AttachmentElement,
  EditorConfigOptions,
  EmojiElement,
  FilePluginOptions,
  ImageElement,
  MentionConfig,
  MentionElement,
  MentionInfo,
} from "./types"
