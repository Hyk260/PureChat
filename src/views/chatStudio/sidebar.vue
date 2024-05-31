<template>
  <div class="sidebar">
    <div>
      <div class="touxiang">
        <UserAvatar type="self" isdot :size="40" shape="square" @click="openUploadAvatarDialog" />
      </div>
      <div class="aside-item" v-for="item in outsideList" :key="item.only">
        <div
          v-show="visibile(item)"
          @click="toggle(item)"
          class="aside-list"
          :class="{ current: outside == item.only }"
        >
          <el-badge :value="unreadMsg" :hidden="item.only !== 'message' || unreadMsg == 0">
            <FontIcon v-if="item?.type == 'el-icon'" :iconName="item.icon" class="style-svg" />
            <svg-icon v-else :iconClass="item.icon" class="style-svg" />
          </el-badge>
          <div class="icon-title" :title="item.title">
            {{ item.locale ? $t(`chat.${item.locale}`) : item.title }}
          </div>
        </div>
      </div>
    </div>
    <div class="operation">
      <el-icon class="icon-hover" @click="operation"><Operation /></el-icon>
    </div>
    <!-- 上传头像弹框 -->
    <!-- <UploadAvatarDialog /> -->
    <!-- 侧边栏拖拽排序弹框 -->
    <SidebarEditDialog />
  </div>
</template>

<script setup>
import { useState } from "@/utils/hooks/useMapper";
import emitter from "@/utils/mitt-bus";
// import UploadAvatarDialog from "@/views/chatStudio/components/UploadAvatarDialog.vue";
import SidebarEditDialog from "@/views/components/MoreSidebar/index.vue";
import { useStore } from "vuex";

const { commit, dispatch } = useStore();
const { outside, unreadMsg, outsideList } = useState({
  outsideList: (state) => state.sidebar.outsideList,
  unreadMsg: (state) => state.conversation.totalUnreadMsg,
  outside: (state) => state.conversation.outside,
});

function visibile(item) {
  return item?.show == "hide" ? false : true;
}
function openUploadAvatarDialog() {
  // emitter.emit("uploadAvatarDialog", true);
}
function toggle(item) {
  if (item?.openType) {
    window.open(item?.url, "_blank");
  } else if (item?.mode == "other") {
    emitter.emit("SidebarEditDialog", true);
  } else {
    commit("TAGGLE_OUE_SIDE", item.only);
  }
}
function operation() {
  emitter.emit("openSetup", true);
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
}
.aside-item {
  @include flex-center;
  .aside-list {
    width: 54px;
    height: 54px;
    text-align: center;
    padding-top: 0.625rem;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
      background-color: var(--hover-color);
    }
  }
  .style-svg {
    color: rgb(96, 98, 102);
    font-size: 1.25rem;
  }

  .current {
    background: var(--color-aside-list-action) !important;
  }
  .icon-title {
    padding: 0 5px;
    color: var(--color-text);
    font-size: 12px;
    margin-top: 3px;
    @include text-ellipsis;
  }
}

.touxiang {
  height: 42px;
  margin: 16px 0 10px 0;
  text-align: center;
  position: relative;
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
  @include flex-center;
  .el-icon {
    cursor: pointer;
  }
}
</style>
