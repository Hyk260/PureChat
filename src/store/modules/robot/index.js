export default {
  state: {
    model: "",
    promptTitle: "",
  },
  mutations: {
    setRobotModel(state, value) {
      state.model = value;
    },
    setPromptTitle(state, value) {
      state.promptTitle = value;
    },
  },
};
