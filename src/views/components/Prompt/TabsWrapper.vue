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

defineOptions({
  name: "TabsWrapper",
});
const active = ref("home");

function onCilck(item) {
  console.log(item.value);
  active.value = item.value;
}

const options = [
  // {
  //   label: "首页",
  //   value: "home",
  //   icon: "home_icon",
  // },
  {
    label: "助手",
    value: "assistant",
    icon: "assistant_icon",
  },
  // {
  //   label: "插件",
  //   value: "plugin",
  //   icon: "plugin_icon",
  // },
  // {
  //   label: "模型",
  //   value: "model",
  //   icon: "model_icon",
  // },
  {
    label: "模型服务商",
    value: "model_provider",
    icon: "model_provider_icon",
  },
];
</script>

<style lang="scss" scoped>
.tabs-wrapper {
  padding: 15px 0 5px 0;
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
