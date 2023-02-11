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
      <div class="header-search-add">
        <el-icon>
          <Plus />
        </el-icon>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import { Search } from "@element-plus/icons-vue";
import { useDebouncedRef } from "@/utils";
const appoint = ref("");
// const appoint = useDebouncedRef("");
watch(appoint, (value) => {
  console.log(value);
});
</script>

<style lang="scss" scoped>
.header-bar {
  background: #fff;
  height: 60px;
  padding: 14px;
  .header-search {
    :deep(.el-input) {
      width: 210px;
    }
    display: flex;
    justify-content: space-between;
  }
}
.header-search-add {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  background: #409eff80;
  border-radius: 2px;
  font-size: 24px;
  color: #fff;
  cursor: pointer;
}
</style>
