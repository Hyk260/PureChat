import mitt, { type Emitter } from "mitt"

import type { GroupMember } from "@/stores/modules/group/type"

interface Events {
  handleImageViewer: string
  SidebarEditDialog: boolean
  updateScroll: void
  handleAt: { id: string; name: string }
  handleSetHtml: string
  handleInputKeyupHandler: KeyboardEvent
  setMentionModal: { content: GroupMember[]; type: string; searchlength: number }
}

const emitter: Emitter<Events> = mitt<Events>()

export default emitter
