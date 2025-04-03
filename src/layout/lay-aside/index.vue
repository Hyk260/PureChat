<template>
  <div class="sidebar-container">
    <div class="sidebar-content">
      <div class="avatar-container">
        <UserAvatar type="self" isdot shape="square" @click="handleAvatarClick" />
      </div>

      <div class="sidebar-item" v-for="item in sidebarStore.filteredOutsideList" :key="item.id">
        <el-tooltip :content="item.title" placement="right">
          <div
            @click="handleItemClick(item)"
            class="sidebar-item-content"
            :class="{ active: isActiveItem(item.path) }"
          >
            <el-badge :value="chatStore.totalUnreadMsg" :hidden="shouldHideUnreadBadge(item.id)">
              <FontIcon
                v-if="item?.type === 'el-icon'"
                :iconName="item.icon"
                class="sidebar-icon"
              />
              <SvgIcon v-else :local-icon="item.icon" class="sidebar-icon" />
            </el-badge>
          </div>
        </el-tooltip>
      </div>
    </div>

    <div class="sidebar-footer">
      <el-tooltip content="帮助文档" placement="right">
        <el-icon class="icon" @click="onOpenDocs"><QuestionFilled /></el-icon>
      </el-tooltip>
      <el-tooltip content="设置" placement="right">
        <el-icon class="icon" @click="openSettings">
          <Operation />
        </el-icon>
      </el-tooltip>
    </div>

    <SidebarEditDialog />
    <CardPopover />
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { useChatStore, useSidebarStore } from "@/stores/index";
import emitter from "@/utils/mitt-bus";
import SidebarEditDialog from "@/views/components/MoreSidebar/index.vue";
import CardPopover from "@/views/chatStudio/components/CardPopover.vue";

defineOptions({
  name: "LayAside",
});

const docs = __APP_INFO__.pkg.docs;

const router = useRouter();
const chatStore = useChatStore();
const sidebarStore = useSidebarStore();

const handleAvatarClick = () => {
  emitter.emit("setPopover");
};

const openSettings = () => {
  emitter.emit("openSetup", { flag: true });
};

const onOpenDocs = () => {
  window.open(docs, "_blank");
};

const handleItemClick = (item) => {
  if (item?.openType) {
    window.open(item?.url, "_blank");
  } else if (item?.mode === "other") {
    emitter.emit("SidebarEditDialog", true);
  } else {
    sidebarStore.toggleOutside(item);
  }
};

const isActiveItem = (path) => {
  return router.currentRoute.value.path === path;
};

const shouldHideUnreadBadge = (id) => {
  return id !== "chat" || chatStore.totalUnreadMsg === 0;
};
</script>

<style lang="scss" scoped>
.sidebar-container {
  width: 68px;
  min-width: 68px;
  user-select: none;
  position: relative;
  z-index: 9;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  border-radius: 0 7px 7px 0;
  box-shadow: 1px 0px 5px 0px rgb(0 0 0 / 10%);
  background: var(--color-body-bg);
  border-inline-end: 1px solid var(--color-border-default);
  padding: 8px 0px 12px;
}

.sidebar-content {
  display: flex;
  flex-direction: column;
  align-items: center;
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
