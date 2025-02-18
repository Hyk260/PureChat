import { createStore } from "vuex";

import conversation from "./modules/conversation/index";
import groupinfo from "./modules/groupinfo/index";
import user from "./modules/user/index";

const store = createStore({
  modules: {
    conversation,
    groupinfo,
    user,
  },
});

export default store;
