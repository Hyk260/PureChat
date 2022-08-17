<template>
  <div class="flex-box height-full flex_j_c-flex-end">
    <!-- 侧边栏 -->
    <SideBar />
    <!-- 主体 -->
    <Theme />
    <!-- 设置 -->
    <Setup />
  </div>
</template>

<script setup>
import Theme from "@/layout/theme/index.vue";
import SideBar from "@/layout/SideBar/index.vue";
import Setup from "@/layout/components/setup.vue";
</script>
