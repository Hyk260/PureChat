<template>
  <header class="discover-header">
    <h1 class="header-title">Discover</h1>
    <el-input
      v-model="searchInput"
      placeholder="搜索名称介绍或关键词..."
      clearable
      class="search-input"
      @input="handleSearchInput"
    >
      <template #prefix>
        <el-icon class="search-icon">
          <Search />
        </el-icon>
      </template>
    </el-input>
    <div class="header-spacer"></div>
  </header>
</template>

<script setup lang="ts">
import { Search } from "lucide-vue-next"

defineOptions({
  name: "DiscoverHeader",
})

const emit = defineEmits<{
  search: [keyword: string]
}>()

const searchInput = ref("")

const handleSearchInput = (value: string) => {
  emit("search", value)
}
</script>

<style lang="scss" scoped>
.discover-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 0 16px;
  height: 60px;
  min-height: 60px;
  border-bottom: 1px solid var(--color-border-default);
  background: var(--color-body-bg);
}

.header-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--color-text);
  margin: 0;
}

.search-input {
  width: 60%;
  max-width: 600px;
}

.search-icon {
  color: var(--color-text-secondary);
}

.header-spacer {
  width: 64px;
}
</style>
