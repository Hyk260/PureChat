<template>
  <div class="sidebar-container">
    <div class="sidebar-content">
      <div class="avatar-container">
        <UserAvatar type="self" is-dot shape="square" @click="handleAvatarClick" />
      </div>

      <div v-for="item in outsideList" :key="item.id" class="sidebar-item">
        <ElTooltip :content="item.title" placement="right">
          <div class="sidebar-item-content" :class="{ active: isActiveItem(item.path) }" @click="handleItemClick(item)">
            <ElBadge :value="totalUnreadMsg" :hidden="shouldHideUnreadBadge(item.id)">
              <ElIcon class="sidebar-icon">
                <component :is="item.icon" />
              </ElIcon>
            </ElBadge>
          </div>
        </ElTooltip>
      </div>
    </div>

    <div class="sidebar-footer">
      <ElTooltip content="帮助文档" placement="right">
        <ElIcon class="icon" @click="onOpenDocs"><CircleQuestionMark /></ElIcon>
      </ElTooltip>
      <ElTooltip content="设置" placement="right">
        <ElIcon class="icon" @click="openSettings">
          <Settings />
        </ElIcon>
      </ElTooltip>
    </div>

    <!-- <SidebarEditDialog /> -->
    <CardPopover />
    <UserPopup ref="UserPopupRef" />
  </div>
</template>

<script setup lang="ts">
import { Settings, CircleQuestionMark } from "lucide-vue-next"
import { useRouter } from "vue-router"

// import SidebarEditDialog from "@/components/MoreSidebar/index.vue"
import UserPopup from "@/components/Popups/UserPopup.vue"
import { useChatStore, useSidebarStore } from "@/stores"
import { openWindow } from "@/utils/common"
import emitter from "@/utils/mitt-bus"
import CardPopover from "@/views/chat/components/CardPopover.vue"

defineOptions({
  name: "LayAside",
})

const docs = __APP_INFO__.pkg.docs

const UserPopupRef = useTemplateRef("UserPopupRef")
const router = useRouter()
const chatStore = useChatStore()
const sidebarStore = useSidebarStore()

const { totalUnreadMsg } = storeToRefs(chatStore)
const { outsideList } = storeToRefs(sidebarStore)

const handleAvatarClick = () => {
  if (__LOCAL_MODE__) {
    UserPopupRef.value?.show()
  } else {
    emitter.emit("setPopover")
  }
}

const openSettings = () => {
  emitter.emit("openSetup", { flag: true })
}

const onOpenDocs = () => {
  openWindow(docs)
}

const handleItemClick = (item) => {
  sidebarStore.toggleOutside(item)
}

const isActiveItem = (path) => {
  return router.currentRoute.value.path === path
}

const shouldHideUnreadBadge = (id: string) => {
  return id !== "chat" || chatStore.totalUnreadMsg === 0
}
</script>

<style lang="scss" scoped>
.sidebar-container {
  width: 68px;
  min-width: 68px;
  user-select: none;
  position: relative;
  z-index: 10;
  display: flex;
  height: 100%;
  // justify-content: space-between;
  flex-direction: column;
  // border-radius: 0 7px 7px 0;
  // box-shadow: 1px 0px 5px 0px rgb(0 0 0 / 10%);
  background: var(--navbar-background);
  // border-inline-end: 1px solid var(--color-border-default);
  padding: 8px 0px 12px;
}

.sidebar-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
  gap: 8px;
}

.avatar-container {
  padding: 10px 0;
  display: flex;
  justify-content: center;
}

.sidebar-item {
  display: flex;
  justify-content: center;
  width: 100%;

  &-content {
    width: 44px;
    height: 44px;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background-color: var(--icon-hover-color);
    }

    &.active {
      background: var(--color-message-active) !important;
    }
  }
}

.sidebar-icon {
  vertical-align: bottom;
  color: rgb(96, 98, 102);
  font-size: 1.25rem;
}

.sidebar-footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;

  .icon {
    cursor: pointer;
    font-size: 16px;
    color: rgb(96, 98, 102);

    &:hover {
      color: var(--color-primary);
    }
  }
}
</style>
