<template>
  <div class="header-bar">
    <!-- 搜索 -->
    <div class="header-search">
      <el-input
        placeholder="搜索"
        v-model="appoint"
        :prefix-icon="Search"
        class="text-input"
        clearable
      >
      </el-input>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Search } from "@element-plus/icons-vue";
const appoint = ref("");
</script>

<style lang="scss" scoped>
.header-bar {
  background: #fff;
  height: 60px;
  padding: 14px;
}
</style>
