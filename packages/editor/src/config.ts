import type { IEditorConfig, IToolbarConfig } from "@wangeditor/editor"
import type { EditorConfigOptions, MentionConfig } from "./types"

/** 工具栏配置 */
export const toolbarConfig: Partial<IToolbarConfig> = {}

/**
 * 创建编辑器配置
 * @param options 配置选项（placeholder、mentionConfig 等）
 * @returns 编辑器配置对象
 */
export const createEditorConfig = (
  options: EditorConfigOptions = {}
): { editorConfig: Partial<IEditorConfig>; toolbarConfig: Partial<IToolbarConfig> } => {
  const { placeholder = "", mentionConfig } = options

  const editorConfig: Partial<IEditorConfig> = {
    placeholder,
    MENU_CONF: {
      codeSelectLang: {},
    },
    EXTEND_CONF: {
      mentionConfig: {
        pinyinSearch: true,
        ...mentionConfig,
      } as MentionConfig,
    },
    hoverbarKeys: {
      link: {
        menuKeys: ["editLink", "unLink", "viewLink"],
      },
      image: {
        menuKeys: [],
      },
    },
  }

  return { editorConfig, toolbarConfig }
}
