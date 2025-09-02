import mitt, { type Emitter } from "mitt"

import type { GroupMember } from "@/stores/modules/group/type"

export type FilteringType = "all" | "success" | "empty" | "updata"

export interface Events {
  [key: string]: unknown
  [key: symbol]: unknown
  handleImageViewer: string
  SidebarEditDialog: boolean
  updateScroll: void
  handleAt: { id: string; name: string }
  handleSetHtml: string
  handleInputKeyupHandler: any
  setMentionModal: { content?: GroupMember[]; type: FilteringType; searchlength?: number }
  handleInsertDraft: { sessionId: string }
  handleGroupDrawer: boolean
  handleShareModal: boolean
  fileUploading: { uuid: string; num: number }
  handleToBottom: boolean
}

const emitter: Emitter<Events> = mitt<Events>()

export default emitter
