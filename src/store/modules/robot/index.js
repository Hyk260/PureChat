import { localStg } from "@/utils/storage";
import { StoreKey } from "@/ai/constant";

export default {
  state: {
    model: "",
    botTools: localStg.get(StoreKey.Tool) || null,
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
    setBotTools(state, value) {
      state.botTools = value;
    }
  },
};
