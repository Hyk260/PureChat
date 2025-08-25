import mitt, { type Emitter } from "mitt"

interface Events {
  handleImageViewer: string
  SidebarEditDialog: boolean
  updateScroll: void
}

const emitter: Emitter<Events> = mitt<Events>()

export default emitter
