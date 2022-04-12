<template>
  <div class="theme">
    <Header/>
    <h1>主体</h1>
      <span>当前路由{{ route.name }}</span>
      <div v-if="route.name === 'personal'">
        personal
      </div>
      <router-view/>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router"
import Header from "./Header.vue"

  const route = useRoute();   

  console.log(route)

</script>

<style lang="scss" scoped>
.theme{
  width:100%
}
</style>