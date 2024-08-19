import { createStore } from "vuex";
// import { importModules } from "./importModules";

import conversation from "./modules/conversation/index";
import groupinfo from "./modules/groupinfo";
import robot from "./modules/robot";
import sidebar from "./modules/sidebar";
import user from "./modules/user";

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
