import { defineStore, acceptHMRUpdate } from "pinia";
import { SetupStoreId } from '../plugins/index';

const { docs, homepage, giteeHomepage } = __APP_INFO__.pkg;
const { DEV: isDev } = import.meta.env;

const outsideList = [
  {
    id: "chat",
    icon: "ChatDotSquare",
    title: "会话",
    // class: "fix-ed",
    // if_fixed: 1,
    path: "/chat",
    type: "el-icon",
  },
  {
    id: "friends",
    icon: "UserFilled",
    title: "联系人",
    path: "/friends",
    type: "el-icon",
    show: __LOCAL_MODE__ ? "hide" : "",
  },
  {
    id: "discover",
    icon: "Discover",
    title: "发现",
    path: "/discover",
    svgIcon: "Discover",
  },
  // {
  //   id: "document",
  //   icon: "Document",
  //   title: "文档",
  //   type: "el-icon",
  //   openType: "outside",
  //   url: docs,
  // },
  // {
  //   id: "test",
  //   icon: "SwitchFilled",
  //   title: "web",
  //   show: isDev ? "" : "hide",
  //   type: "el-icon",
  // },
  {
    id: "more",
    icon: "MoreFilled",
    title: "更多",
    mode: "other",
    type: "el-icon",
  },
];

const moreList = [
  {
    id: "github",
    icon: "github",
    title: "github",
    openType: "outside",
    url: homepage, 
  },
  {
    id: "gitee",
    icon: "gitee",
    title: "gitee",
    openType: "outside",
    url: giteeHomepage,
  },
];

export const useSidebarStore = defineStore(SetupStoreId.Sidebar, {
  state: () => ({
    outsideList,
    moreList,
  }),
  getters: {
    filteredOutsideList: (state) => state.outsideList.filter((item) => item?.show !== "hide"),
  },
  actions: {
    setOutsideList(list) {
      const data = this.outsideList.filter((t) => t.id === "more");
      this.outsideList = [...list, ...data];
    },
    setMoreList(list) {
      this.moreList = list;
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useSidebarStore, import.meta.hot))
}