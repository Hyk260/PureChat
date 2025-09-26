<template>
  <div class="tabs-wrapper">
    <div v-for="option in tabOptions" :key="option.value" class="tab-item" @click="handleTabClick(option)">
      <el-button :class="{ 'tab-item--active': activeTab === option.value }">
        {{ option.label }}
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { options } from "./utils"

interface TabOption {
  label: string
  value: string
  icon?: string
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

const tabOptions = computed<TabOption[]>(() => options)

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
