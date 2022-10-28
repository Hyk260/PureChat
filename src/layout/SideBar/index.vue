<template>
  <div
    :class="['sidebar-container', logoVal ? 'has-logo' : '']"
    v-show="sidebar"
  >
    <Logo class="logo-icon" :show="logoVal" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        class="el-menu-vertical"
        :default-active="route.path"
        :collapse-transition="false"
        :unique-opened="false"
        :collapse="isCollapse"
        router
        @open="handleOpen"
        @close="handleClose"
      >
        <SideItem :tree="routing" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup>
import storage from "storejs";
import { useStore } from "vuex";
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useState } from "@/utils/hooks/useMapper";
import Logo from "../components/Logo.vue";

const route = useRoute();
const store = useStore();

const { isCollapse, sidebar, routing, logoVal } = useState({
  isCollapse: (state) => state.settings.isCollapse,
  sidebar: (state) => state.settings.sidebar,
  logoVal: (state) => state.settings.logoIcon,
  routing: (state) => state.data.Routingtable,
});

const handleOpen = (key, keyPath) => {
  // console.log(key, keyPath)
};
const handleClose = (key, keyPath) => {
  // console.log(key, keyPath)
};
</script>

<style lang="scss" scoped>
.el-menu-vertical:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
  height: 100%;
}
.el-menu-vertical {
  border: none;
  height: 100%;
}
.sidebar-container {
  background: #fff;
  // background: var(--color-body-bg);
  border-right: 1px solid #e6e6e6;
  z-index: 10;
  height: 100%;
  position: fixed;
  font-size: 0;
  top: 0;
  bottom: 0;
  left: 0;
}
/*隐藏文字*/
.el-menu--collapse :deep(.el-sub-menu__title span) {
  display: none;
}
/*隐藏 > */
.el-menu--collapse :deep(.el-sub-menu__title .el-sub-menu__icon-arrow) {
  display: none;
}
/* 卡頓bug */
.el-menu-vertical :deep(.el-icon) {
  width: auto;
}
</style>
