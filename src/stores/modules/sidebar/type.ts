import type { Component } from "vue"

export interface SidebarItem {
  id: string
  icon: Component | string
  title: string
  path?: string
  show?: string | undefined // "hide"
  mode?: "other"
  class?: string
  if_fixed?: number
}

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
