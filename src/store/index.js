import { createStore } from "vuex";

import conversation from "./modules/conversation/index";
import groupinfo from "./modules/groupinfo/index";
import robot from "./modules/robot/index";
import sidebar from "./modules/sidebar/index";
import user from "./modules/user/index";

const store = createStore({
  modules: {
    conversation,
    groupinfo,
    robot,
    sidebar,
    user,
  },
});

export default store;
