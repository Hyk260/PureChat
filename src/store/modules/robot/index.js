import { localStg } from "@/utils/storage";
import { StoreKey } from "@/ai/constant";

export default {
  state: {
    model: null,
    botTools: localStg.get(StoreKey.Tool) || null,
    promptConfig: "",
  },
  mutations: {
    setRobotModel(state, value) {
      state.model = value;
    },
    setPromptConfig(state, value) {
      state.promptConfig = value;
    },
    setBotTools(state, value) {
      state.botTools = value;
    }
  },
};
