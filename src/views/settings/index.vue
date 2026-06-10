<template>
  <div class="settings-page">
    <List ref="listRef" @active="active" />
    <ItemGrid :item="item" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue"
import { useRoute } from "vue-router"

import { list } from "./settings"
import ItemGrid from "./itemGrid.vue"
import List from "./list.vue"

const route = useRoute()
const listRef = ref()
const item = ref(list.value[0])

function setItem(data = list.value[0]) {
  listRef.value?.handleItemClick(data)
}

function active(t) {
  item.value = t
}

watch(
  () => route.query.tab,
  (tab) => {
    if (tab) {
      const matched = list.value.find((v) => v.id === tab)
      if (matched) {
        setItem(matched)
      }
    }
  },
  { immediate: true }
)
</script>

<style lang="scss" scoped>
.settings-page {
  height: 100%;
  display: flex;
}
</style>
