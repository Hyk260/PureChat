<template>
  <div class="content">
    <!-- 侧边栏 -->
    <SideBar class="side-bar" :tree="RoutingTable"></SideBar>
    <!-- 主体 -->
    <Theme/>
  </div>
</template>

<script>
import { reactive, toRefs, computed } from 'vue'
import storeLocal from 'storejs'
import Theme from "@/layout/theme/index.vue"
import SideBar from "@/layout/SideBar/index.vue"
import { useStore } from 'vuex'

export default {
  components:{ Theme,SideBar },
  setup () {
    const store = useStore();

    const RoutingTable = computed(()=>{
      return store.state.data.Routingtable
    })
    // const userdata = storeLocal.get('userdata')
    // userdata && store.dispatch('updateRoute',userdata)

    return {
      RoutingTable
      // ...toRefs(RoutingTable),
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