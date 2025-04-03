<template>
  <el-dialog class="setup-modal" v-model="drawer" :show-close="false" width="700">
    <div class="ui-modal-body">
      <List @active="active" ref="listRef" />
      <ItemGrid :item="item" @onClose="setDrawer(false)" @onItem="setItem" />
    </div>
  </el-dialog>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { list } from "./enums";
import { useState } from "@/utils/hooks/index";
import emitter from "@/utils/mitt-bus";
import ItemGrid from "./itemGrid.vue";
import List from "./list.vue";

const listRef = ref();
const item = ref({});
const [drawer, setDrawer] = useState();

function setItem(data = list.value[0]) {
  listRef.value?.onClick(data);
}

function active(t) {
  item.value = t;
}

onMounted(() => {
  emitter.on("openSetup", ({ flag, id }) => {
    if (flag) {
      setDrawer(true);
      if (id) {
        setItem(list.value.find((v) => v.id === id));
      } else {
        setItem();
      }
    }
  });
});

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
.ui-modal-body {
  height: 500px;
  display: flex;
}
</style>
