import { defineStore } from "pinia";
import { SetupStoreId } from '../../plugins/index';
import { useChatStore } from "../chat/index";
import { openWindow } from "@/utils/common";
import emitter from "@/utils/mitt-bus";
import router from "@/router";

const { docs, homepage, giteeHomepage } = __APP_INFO__.pkg;
const { DEV: isDev } = import.meta.env;

const defaultOutsideList = [
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
  {
    id: "apps",
    icon: "Menu",
    title: "小程序",
    path: "/apps",
    type: "el-icon",
    show: __IS_ELECTRON__ ? "" : "hide",
  },
  {
    id: "more",
    icon: "MoreFilled",
    title: "更多",
    mode: "other",
    type: "el-icon",
  },
];

const defaultMoreList = [
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
    outsideList: [...defaultOutsideList],
    moreList: [...defaultMoreList],
  }),
  getters: {
    filteredOutsideList: (state) => state.outsideList.filter((item) => item?.show !== "hide"),
  },
  actions: {
    setOutsideList(list) {
      const data = this.outsideList.filter((t) => t.id === "more");
      this.outsideList = [...list, ...data];
    },
    toggleOutside(item) {
      if (item?.path) {
        router.push(item.path);
        useChatStore().$patch({ showCheckbox: false });
      } else if (item?.openType === 'outside' && item?.url) {
        openWindow(item.url);
      } else if (item?.mode === "other") {
        emitter.emit("SidebarEditDialog", true);
      }
    },
    setMoreList(list) {
      this.moreList = list;
    },
  },
});