<template>
  <router-view />
</template>

<script setup>
  import { computed, onMounted } from "vue";
  import { useStore } from 'vuex';
  import views from "@/utils/assembly"
  import { useRouter } from "vue-router";
  import storeLocal from 'storejs'

  const table = storeLocal.get('userdata')

  onMounted(() => {
    if(!table?.Routingtable) return
    tree(table.Routingtable)
    table.Routingtable.forEach((item) => {
      useRouter().addRoute(item)
    })
  })

  function tree(arr) {
    arr.forEach((item) => {
      if (item.componentName) {
        item.component = views[item.componentName]
      }
      if (item?.children?.length > 0) {
        tree(item.children)
      }
    })
  }
</script>

<style lang="scss">
.content-wrap{
  padding: 24px;
  height: calc(100vh - 86px);
}
</style>