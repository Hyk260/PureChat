import { localStg } from "@/utils/storage";

export default {
  state: {
    model: "",
    promptTitle: localStg.get("promptTitle") || "",
  },
  mutations: {
    setRobotModel(state, value) {
      state.model = value;
    },
    setPromptTitle(state, value) {
      localStg.set('promptTitle', value);
      state.promptTitle = value;
    },
  },
};
