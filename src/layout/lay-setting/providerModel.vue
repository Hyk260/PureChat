<template>
  <ul class="setting w-full">
    <li>
      <span>{{ $t("settings.defaultProvider") }} </span>
      <el-select v-model="defaultProvider">
        <el-option
          v-for="item in optionsModel"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </li>
  </ul>
</template>

<script setup>
import { useRobotStore } from "@/stores/index";
import { optionsModel } from "./enums";

const robotStore = useRobotStore();

const defaultProvider = computed({
  get() {
    return robotStore.defaultProvider;
  },
  set(val) {
    robotStore.setDefaultProvider(val);
  },
});
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
