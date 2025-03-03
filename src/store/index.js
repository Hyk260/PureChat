import { createStore } from "vuex";
import conversation from "./modules/conversation/index";

const store = createStore({
  modules: {
    conversation,
  },
});

export default store;
