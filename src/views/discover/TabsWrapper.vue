<template>
  <div class="tabs-wrapper">
    <div class="tabs-item" v-for="item in options" :key="item.value" @click="onCilck(item)">
      <el-button :class="{ active: active === item.value }">
        {{ item.label }}
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { options } from './utils.js';

defineOptions({
  name: "TabsWrapper",
});

const emit = defineEmits(["handleTabs"]);

const active = ref(options[0].value);

function onCilck(item) {
  active.value = item.value;
  emit("handleTabs", item.value);
}
</script>

<style lang="scss" scoped>
.tabs-wrapper {
  padding: 15px 16px 5px 16px;
  display: flex;
  gap: 5px;
  position: sticky;
  top: 0;
  background: var(--color-body-bg);
  .tabs-item {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #333;
    cursor: pointer;
    .el-button {
      border: none;
    }
  }
  .active {
    background-color: rgb(235.9, 245.3, 255) !important;
    border-color: rgb(197.7, 225.9, 255) !important;
    color: #409eff !important;
  }
}
</style>
