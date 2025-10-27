import { debounce } from "lodash-es"
import mitt, { type Emitter } from "mitt"

import type { GroupMember } from "@/stores/modules/group/type"

export type FilteringType = "all" | "success" | "empty" | "updata"

export interface Events {
  handleImageViewer: string
  SidebarEditDialog: boolean
  handleAt: { id: string; name: string }
  handleSetHtml: string
  handleInputKeyupHandler: any
  setMentionModal: { content?: GroupMember[]; type: FilteringType; searchlength?: number }
  handleInsertDraft: { sessionId: string }
  handleGroupDrawer: boolean
  handleShareModal: boolean
  fileUploading: { uuid: string; num: number }
  handleToBottom: boolean
  updateScroll: string | undefined
  handleFileDrop: File
}

const emitter: Emitter<Events> = mitt<Events>()

export const emitUpdateScroll = debounce((type?: string) => {
  try {
    emitter.emit("updateScroll", type)
  } catch {
    /* ignore */
  }
}, 5)

export const emitUpdateScrollImmediate = (type?: string) => {
  try {
    emitUpdateScroll.cancel?.()
  } catch {
    /* ignore */
  }
  try {
    emitter.emit("updateScroll", type)
  } catch {
    /* ignore */
  }
}

export default emitter
