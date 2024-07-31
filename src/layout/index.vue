<template>
  <div class="w-full">
    <div class="flex h-full w-full relative">
      <!-- 主体 -->
      <AppMain />
      <!-- 设置 -->
      <Setup />
    </div>
  </div>
</template>

<script setup>
import AppMain from "./appMain/index.vue";
import Setup from "./setup/index.vue";
</script>
