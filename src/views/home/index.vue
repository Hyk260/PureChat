<template>
  <div class="content">
    <!-- 侧边栏 -->
    <SideBar class="side-bar" :tree="RoutingTable"></SideBar>
    <!-- 主体 -->
    <Theme/>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import storeLocal from 'storejs'
import Theme from "@/layout/theme/index.vue"
import SideBar from "@/layout/SideBar/index.vue"

export default {
  components:{ Theme,SideBar },
  setup () {
    const RoutingTable = storeLocal.get("menu")
    return {
      RoutingTable
      // ...toRefs(state),
    }
  }
}
</script>

<style lang="scss" scoped>
.content{
  display: flex;
  height: 100vh;
  .side-bar{

  }
}
</style>