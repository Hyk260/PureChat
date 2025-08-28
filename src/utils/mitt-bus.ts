import mitt, { type Emitter } from "mitt"

interface Events {
  handleImageViewer: string
  SidebarEditDialog: boolean
  updateScroll: void
  handleAt: { id: string; name: string }
  handleSetHtml: string
}

const emitter: Emitter<Events> = mitt<Events>()

export default emitter
