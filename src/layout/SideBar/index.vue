<template>
  <div :class="['sidebar-container', showLogo ? 'has-logo' : '']">
    <!-- <Logo v-if="showLogo"  /> -->
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu 
        :default-active="route.path" 
        class="el-menu-vertical-demo" 
        :collapse-transition="true"
        :unique-opened="true"
        :collapse="isCollapse"
        router
        @open="handleOpen"
        @close="handleClose">
        <SideItem :tree="RoutingTable"/>
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup>
  import { ref,computed } from 'vue'
  import storage from 'storejs'
  import { useRoute, useRouter } from "vue-router"
  import { useStore } from 'vuex'
  
  const route = useRoute();
  const showLogo = ref(true)
  const store = useStore();

  const isCollapse = computed(() => {
    return store.state.data.isCollapse
  })
  const RoutingTable = computed(()=>{
    return store.state.data.Routingtable
  })

  const handleOpen = (key, keyPath) => {
    // console.log(key, keyPath)
  }
  const handleClose = (key, keyPath) => {
    // console.log(key, keyPath)
  }
</script>

<style style="scss" scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-menu-vertical-demo {
    height: 100vh;
  }
  /*隐藏文字*/
  .el-menu--collapse ::v-deep .el-sub-menu__title span {
    display: none;
  }
  /*隐藏 > */
  .el-menu--collapse ::v-deep .el-sub-menu__title .el-sub-menu__icon-arrow {
    display: none;
  }
</style>