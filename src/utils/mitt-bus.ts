import type { Emitter } from "mitt";
import mitt from "mitt";

type Events = {
  handleImageViewer: string;
};

const emitter: Emitter<Events> = mitt<Events>();

export default emitter;
