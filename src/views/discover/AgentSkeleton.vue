<template>
  <ElSkeleton v-for="item in 12" :key="item" class="flex gap-12 p-16 flex-col" animated>
    <template #template>
      <ElSkeletonItem variant="image" class="h-40 w-40 ml-auto" />
      <div>
        <ElSkeletonItem variant="p" />
        <ElSkeletonItem variant="p" />
        <ElSkeletonItem variant="p" />
        <ElSkeletonItem variant="p" />
        <div>
          <ElSkeletonItem variant="text" style="margin-right: 16px" />
          <ElSkeletonItem variant="text" style="width: 30%" />
        </div>
      </div>
    </template>
  </ElSkeleton>
</template>

<script setup lang="ts">
import { ElSkeleton, ElSkeletonItem } from "element-plus"
</script>
