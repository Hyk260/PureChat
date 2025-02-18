<template>
  <div class="header">
    <div>Discover</div>
    <el-input
      v-if="false"
      v-model="input"
      @input="emit('handleClick', input)"
      placeholder="搜索名称介绍或关键词..."
      clearable
    >
      <template #prefix>
        <el-icon class="el-input__icon">
          <search />
        </el-icon>
      </template>
    </el-input>
    <div class="w-64"></div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const emit = defineEmits(["handleClick"]);

const input = ref("");
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 16px;
  height: 60px;
  border-block-end: 1px solid var(--color-border-default);
  .el-input {
    width: 60%;
  }
}
</style>
