import mitt, { type Emitter } from "mitt";

type Events = {
  handleImageViewer: string;
  SidebarEditDialog: boolean;
  updateScroll: void;
};

const emitter: Emitter<Events> = mitt<Events>();

export default emitter;
