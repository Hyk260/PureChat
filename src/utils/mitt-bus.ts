import type { Emitter } from "mitt";
import mitt from "mitt";

type Events = {
  handleImageViewer: string;
  SidebarEditDialog: boolean;
  updateScroll: void;
};

const emitter: Emitter<Events> = mitt<Events>();

export default emitter;
