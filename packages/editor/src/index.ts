import { Boot, IModuleConf } from "@wangeditor/editor"

import "./style/index.css"

import ctrlEnterModule from "./plugin-ctrl-enter"
import fileModule from "./plugin-file"
import mentionModule from "./plugin-mention"

// 注册编辑器插件
Boot.registerModule(fileModule as unknown as Partial<IModuleConf>)
Boot.registerModule(mentionModule as unknown as Partial<IModuleConf>)
Boot.registerModule(ctrlEnterModule as unknown as Partial<IModuleConf>)

export { createEditorConfig, toolbarConfig } from "./config"
export * from "./editor-utils"
export { setFilePluginOptions } from "./plugin-file"
export * from "./types"
