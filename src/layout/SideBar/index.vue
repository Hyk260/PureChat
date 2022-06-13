<template>
  <div :class="['sidebar-container', showLogo ? 'has-logo' : '']" v-show="sidebar">
    <Logo class="logo-icon" v-show="showLogo && false"/>
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
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import storage from 'storejs'
import Logo from "../components/Logo.vue"

const route = useRoute()
const store = useStore()

const isCollapse = computed(() => {
  return store.state.data.isCollapse
})
// 侧边栏数据
const routing = computed(() => {
  return store.state.data.Routingtable
})
const sidebar = computed(() => {
  return store.state.settings.sidebar
})
const showLogo = computed(() => {
  return store.state.settings.logoIcon
})

const handleOpen = (key, keyPath) => {
  // console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
  // console.log(key, keyPath)
}
</script>

<style lang="scss" scoped>
.el-menu-vertical:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
  /* height: 100%; */
}
.el-menu-vertical {
  height: 100vh;
}
.sidebar-container {
  z-index: 10;
  height: 100%;
  position: fixed;
  font-size: 0;
  top: 0;
  bottom: 0;
  left: 0;
}
/*隐藏文字*/
.el-menu--collapse ::v-deep .el-sub-menu__title span {
  display: none;
}
/*隐藏 > */
.el-menu--collapse ::v-deep .el-sub-menu__title .el-sub-menu__icon-arrow {
  display: none;
}
/* 卡頓bug */
.el-menu-vertical ::v-deep .el-icon {
  width: auto;
}
</style>