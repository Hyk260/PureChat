<template>
  <el-dialog
    v-model="drawer"
    class="setup-modal"
    :lock-scroll="false"
    :show-close="false"
    :fullscreen="false"
    width="60%"
  >
    <div class="ui-modal-body">
      <List ref="listRef" @active="active" />
      <ItemGrid :item="item" @on-close="setDrawer(false)" />
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue"

import { useState } from "@/hooks/useState"
import emitter from "@/utils/mitt-bus"

import { list } from "./enums"
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
// :global(body .setup-modal .el-dialog__body) {
//   height: 100%;
// }

.ui-modal-body {
  height: 600px;
  display: flex;
}
</style>
