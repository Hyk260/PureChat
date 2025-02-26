import { createStore } from "vuex";
import conversation from "./modules/conversation/index";
import groupinfo from "./modules/groupinfo/index";

const store = createStore({
  modules: {
    conversation,
    groupinfo,
  },
});

export default store;
