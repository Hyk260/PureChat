<template>
  <el-skeleton class="skeleton" v-for="item in 9" :key="item">
    <template #template>
      <el-skeleton-item variant="image" class="h-40 w-40 ml-auto" />
      <div>
        <el-skeleton-item variant="p" />
        <el-skeleton-item variant="p" />
        <div>
          <el-skeleton-item variant="text" style="margin-right: 16px" />
          <el-skeleton-item variant="text" style="width: 30%" />
        </div>
      </div>
    </template>
  </el-skeleton>
</template>

<style lang="scss" scoped>
.skeleton {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
}
</style>