<template>
  <ul class="setting w-full">
    <li>
      <span>{{ $t("settings.defaultProvider") }} </span>
      <ElSelect v-model="defaultProvider">
        <ElOption v-for="item in optionsModel" :key="item.value" :label="item.label" :value="item.value" />
      </ElSelect>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { useRobotStore } from "@/stores/modules/robot"

import { optionsModel } from "./settings"

const robotStore = useRobotStore()

const defaultProvider = computed({
  get() {
    return robotStore.defaultProvider
  },
  set(val) {
    robotStore.setDefaultProvider(val)
  },
})
</script>

<style lang="scss" scoped>
.setting li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .el-select {
    max-width: 180px;
  }
}
</style>
