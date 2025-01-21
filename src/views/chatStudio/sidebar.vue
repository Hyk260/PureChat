<template>
  <div class="sidebar">
    <div>
      <div class="touxiang">
        <UserAvatar type="self" isdot shape="square" @click="openUploadAvatarDialog" />
      </div>
      <div class="aside-item flex-c" v-for="item in outsideList" :key="item.id">
        <el-tooltip :content="item.title" placement="right">
          <div
            @click="toggle(item)"
            class="aside-list flex-c flex-col gap-3"
            :class="{ current: outside === item.id }"
          >
            <el-badge :value="unreadMsg" :hidden="item.id !== 'message' || unreadMsg == 0">
              <FontIcon v-if="item?.type == 'el-icon'" :iconName="item.icon" class="style-svg" />
              <svg-icon v-else :iconClass="item.icon" class="style-svg" />
            </el-badge>
          </div>
        </el-tooltip>
      </div>
    </div>
    <div class="operation flex-c">
      <el-icon class="icon-hover" @click="operation"><Operation /></el-icon>
    </div>
    <!-- 上传头像弹框 -->
    <!-- <UploadAvatarDialog /> -->
    <!-- 侧边栏拖拽排序弹框 -->
    <SidebarEditDialog />
    <CardPopover />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useState } from "@/utils/hooks/useMapper";
import emitter from "@/utils/mitt-bus";
// import UploadAvatarDialog from "@/views/chatStudio/components/UploadAvatarDialog.vue";
import SidebarEditDialog from "@/views/components/MoreSidebar/index.vue";
import CardPopover from "./components/CardPopover.vue";
import { useStore } from "vuex";

const { commit } = useStore();
const { outside, unreadMsg, outsideList } = useState({
  outsideList: (state) => state.sidebar.outsideList.filter((item) => item?.show !== "hide"),
  unreadMsg: (state) => state.conversation.totalUnreadMsg,
  outside: (state) => state.conversation.outside,
});

function openUploadAvatarDialog() {
  emitter.emit("setPopover");
}

function operation() {
  emitter.emit("openSetup", true);
}

function toggle(item) {
  if (item?.openType) {
    window.open(item?.url, "_blank");
  } else if (item?.mode === "other") {
    emitter.emit("SidebarEditDialog", true);
  } else {
    commit("taggleOueSide", item.id);
  }
}
</script>

<style lang="scss" scoped>
.sidebar {
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
  border-inline-end: 1px solid var(--color-border-default);
}
.aside-item {
  .aside-list {
    width: 44px;
    height: 44px;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
      background-color: var(--pure-hover-color);
    }
  }
  .style-svg {
    color: rgb(96, 98, 102);
    font-size: 1.25rem;
  }

  .current {
    background: var(--color-message-active) !important;
  }
  .icon-title {
    color: var(--color-text);
    font-size: 12px;
    @include text-ellipsis;
  }
}
.touxiang {
  display: flex;
  justify-content: center;
  padding: 10px 0;
  .mask-out {
    display: flex;
    justify-content: center;
    position: absolute;
    left: 14px;
    bottom: 3px;
    border-radius: 4px;
    height: 14px;
    width: 40px;
    color: #fff;
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.4);
    span {
      display: inline-block;
      transform: scale(0.5);
      white-space: nowrap;
    }
  }
}
.operation {
  height: 54px;
  .el-icon {
    cursor: pointer;
  }
}
</style>
