import { ChatDotSquare, MoreFilled, UserFilled } from "@element-plus/icons-vue"
import { Compass, LayoutGrid } from "lucide-vue-next"
import { defineStore } from "pinia"
import { markRaw } from "vue"

import router from "@/router"
import { SetupStoreId } from "@/stores/enum"
import { useChatStore } from "@/stores/modules/chat"
import { openWindow } from "@/utils/common"
import emitter from "@/utils/mitt-bus"

import type { MoreListItem, SidebarItem, SidebarState } from "./type"

const {
  // docs,
  homepage,
  giteeHomepage,
} = __APP_INFO__.pkg
const {
  DEV: isDev
} = import.meta.env

const defaultOutsideList: SidebarItem[] = [
  {
    id: "chat",
    icon: markRaw(ChatDotSquare),
    title: "会话",
    // class: "fix-ed",
    // if_fixed: 1,
    path: "/chat",
    type: "el-icon",
  },
  {
    id: "friends",
    icon: markRaw(UserFilled),
    title: "联系人",
    path: "/friends",
    type: "el-icon",
    show: __LOCAL_MODE__ ? "hide" : "",
  },
  {
    id: "discover",
    icon: markRaw(Compass),
    title: "发现",
    type: "el-icon",
    path: "/discover",
  },
  {
    id: "apps",
    icon: markRaw(LayoutGrid),
    title: "小程序",
    path: "/apps",
    type: "el-icon",
    show: __IS_ELECTRON__ ? "" : "hide",
  },
  {
    id: "more",
    icon: markRaw(MoreFilled),
    title: "更多",
    mode: "other",
    type: "el-icon",
  },
]

const defaultMoreList: MoreListItem[] = [
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
]

export const useSidebarStore = defineStore(SetupStoreId.Sidebar, {
  state: (): SidebarState => ({
    outsideList: [...defaultOutsideList],
    moreList: [...defaultMoreList],
  }),
  getters: {
    filteredOutsideList: (state): SidebarItem[] => state.outsideList.filter((item) => item?.show !== "hide"),
  },
  actions: {
    setOutsideList(list: SidebarItem[]): void {
      const data = this.outsideList.filter((t) => t.id === "more")
      this.outsideList = [...list, ...data]
    },
    toggleOutside(item: SidebarItem | MoreListItem): void {
      if ("path" in item && item.path) {
        router.push(item.path)
        useChatStore().toggleMultiSelectMode(false)
      } else if ("openType" in item && item.openType === "outside" && item.url) {
        openWindow(item.url)
      } else if ("mode" in item && item.mode === "other") {
        emitter.emit("SidebarEditDialog", true)
      }
    },
    setMoreList(list: MoreListItem[]): void {
      this.moreList = list
    },
  },
  // persist: {
  //   pick: ["outsideList", "moreList"],
  // },
})
