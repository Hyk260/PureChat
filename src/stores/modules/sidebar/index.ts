import { markRaw } from "vue"
import { Compass, LayoutGrid, MessageSquareMore, User } from "lucide-vue-next"

import { defineStore } from "pinia"

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
const { DEV: isDev } = import.meta.env

const defaultOutsideList: SidebarItem[] = [
  {
    id: "chat",
    icon: markRaw(MessageSquareMore),
    title: "会话",
    // class: "fix-ed",
    // if_fixed: 1,
    path: "/chat",
  },
  {
    id: "friends",
    icon: markRaw(User),
    title: "联系人",
    path: "/friends",
    show: __LOCAL_MODE__ ? "hide" : "",
  },
  {
    id: "discover",
    icon: markRaw(Compass),
    title: "发现",
    path: "/discover",
  },
  {
    id: "apps",
    icon: markRaw(LayoutGrid),
    title: "小程序",
    path: "/apps",
    show: __IS_ELECTRON__ ? "" : "hide",
  },
  // {
  //   id: "more",
  //   icon: markRaw(Ellipsis),
  //   title: "更多",
  //   mode: "other",
  // },
].filter((item) => item?.show !== "hide")

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
    outsideList: defaultOutsideList,
    moreList: defaultMoreList,
  }),
  getters: {},
  actions: {
    setOutsideList(list: SidebarItem[]) {
      const data = this.outsideList.filter((t) => t.id === "more")
      this.outsideList = [...list, ...data]
    },
    toggleOutside(item: SidebarItem | MoreListItem) {
      debugger
      if ("path" in item && item.path) {
        router.push(item.path)
        useChatStore().toggleMultiSelectMode(false)
      } else if ("openType" in item && item.openType === "outside" && item.url) {
        openWindow(item.url)
      } else if ("mode" in item && item.mode === "other") {
        emitter.emit("SidebarEditDialog", true)
      }
    },
    setMoreList(list: MoreListItem[]) {
      this.moreList = list
    },
  },
  // persist: {
  //   pick: ["outsideList", "moreList"],
  // },
})
