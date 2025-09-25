<template>
  <el-skeleton v-for="item in 12" :key="item" class="flex gap-12 p-16 flex-col" animated>
    <template #template>
      <el-skeleton-item variant="image" class="h-40 w-40 ml-auto" />
      <div>
        <el-skeleton-item variant="p" />
        <el-skeleton-item variant="p" />
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
