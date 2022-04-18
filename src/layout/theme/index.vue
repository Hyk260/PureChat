<template>
  <div class="theme">
    <Header />
    <div class="continer-theme">
      <router-view />
      <div v-if="route.name === 'personal'">
        personal
      </div>
      <div v-if="route.name === 'home'">
        home
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import storeLocal from 'storejs'
import views from '@/utils/assembly.js'
import Header from './Header.vue'

const route = useRoute()
const table = storeLocal.get('userdata')

// onMounted(() => {
//   console.log(123)
//   tree(table.Routingtable)
//   table.Routingtable.forEach((item) => {
//     useRouter().addRoute(item)
//   })
// })

//  function tree(arr) {
//   arr.forEach((item) => {
//     if (item.componentName) {
//       item.component = views[item.componentName]
//     }
//     console.log(item.children)
//     if (item?.children?.length > 0) {
//       tree(item.children)
//     }
//   })
// }
</script>

<style lang="scss" scoped>
.theme {
  width: 100%;
}
.continer-theme {
  height: calc(100vh - 86px);
  background: #f0f2f5;
  padding: 24px;
  box-sizing: border-box;
}
</style>