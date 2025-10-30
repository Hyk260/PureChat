<template>
  <div class="tabs-wrapper">
    <div v-for="option in tabOptions" :key="option.value" class="tab-item" @click="handleTabClick(option)">
      <ElButton :class="{ 'tab-item--active': activeTab === option.value }">
        <ElIcon><component :is="option.icon"></component></ElIcon>
        <span> {{ option.label }}</span>
      </ElButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { options as tabOptions } from "./utils"

interface TabOption {
  label: string
  value: string
  icon?: any
}

defineOptions({
  name: "TabsWrapper",
})

defineProps<{
  activeTab: string
}>()

const emit = defineEmits<{
  tabChange: [value: string]
}>()

const handleTabClick = (option: TabOption) => {
  emit("tabChange", option.value)
}
</script>

<style lang="scss" scoped>
.tabs-wrapper {
  padding: 15px 15px 0px 15px;
  display: flex;
  gap: 5px;
  position: sticky;
  top: 0;
  background: var(--color-body-bg);
  .tab-item {
    display: flex;
    align-items: center;
    font-size: 14px;
    color: #333;
    cursor: pointer;
    .el-button {
      border: none;
    }
    &--active {
      background-color: rgb(235.9, 245.3, 255) !important;
      border-color: rgb(197.7, 225.9, 255) !important;
      color: #409eff !important;
    }
  }
}
</style>
