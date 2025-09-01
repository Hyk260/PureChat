import mitt, { type Emitter } from "mitt"

import type { GroupMember } from "@/stores/modules/group/type"

type FilteringType = "all" | "success" | "empty" | "updata"

interface Events {
  handleImageViewer: string
  SidebarEditDialog: boolean
  updateScroll: void
  handleAt: { id: string; name: string }
  handleSetHtml: string
  handleInputKeyupHandler: KeyboardEvent
  setMentionModal: { content?: GroupMember[]; type: FilteringType; searchlength?: number }
  handleInsertDraft: { sessionId: string }
  handleGroupDrawer: boolean
  handleShareModal: boolean
  fileUploading: { uuid: string; num: number }
}

const emitter: Emitter<Events> = mitt<Events>()

export default emitter
