import type { Component } from "vue"

// 侧边栏项目类型
export interface SidebarItem {
  id: string
  icon: Component | string
  title: string
  path?: string
  type: "el-icon" | "svg-icon"
  show?: "hide" | ""
  mode?: "other"
  class?: string
  if_fixed?: number
}

// 更多列表项目类型
export interface MoreListItem {
  id: string
  icon: string
  title: string
  openType: "outside"
  url: string
}

// 侧边栏状态类型
export interface SidebarState {
  outsideList: SidebarItem[]
  moreList: MoreListItem[]
}

// 侧边栏Store类型
export interface SidebarStore extends SidebarState {
  // Getters
  filteredOutsideList: SidebarItem[]

  // Actions
  setOutsideList: (list: SidebarItem[]) => void
  toggleOutside: (item: SidebarItem | MoreListItem) => void
  setMoreList: (list: MoreListItem[]) => void
}
