<template>
  <ElDialog
    v-model="drawer"
    center
    align-center
    class="setup-modal"
    append-to-body
    :lock-scroll="false"
    :show-close="false"
    width="70%"
  >
    <div class="ui-modal-body">
      <List ref="listRef" @active="active" />
      <ItemGrid :item="item" @on-close="setDrawer(false)" />
    </div>
  </ElDialog>
</template>

<script setup lang="ts">
import { useState } from "@/hooks/useState"
import emitter from "@/utils/mitt-bus"

import { list } from "./settings"
import ItemGrid from "./itemGrid.vue"
import List from "./list.vue"

const listRef = ref()
const item = ref(list.value[0])
const [drawer, setDrawer] = useState(false)

function setItem(data = list.value[0]) {
  listRef.value?.handleItemClick(data)
}

function active(t) {
  item.value = t
}

onMounted(() => {
  emitter.on("openSetup", ({ flag, id }) => {
    if (flag) {
      setDrawer(true)
      if (id) {
        setItem(list.value.find((v) => v.id === id))
      } else {
        setItem()
      }
    }
  })
})

onUnmounted(() => {
  emitter.off("openSetup")
})
</script>

<style lang="scss" scoped>
:global(body .setup-modal) {
  padding: 0;
}
:global(body .setup-modal .el-dialog__header) {
  display: none;
}
:global(body .setup-modal) {
  min-width: 650px;
}
.ui-modal-body {
  height: 80vh;
  display: flex;
}
</style>
