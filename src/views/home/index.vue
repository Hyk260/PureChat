<template>
  <div class="content">
    <!-- 侧边栏 -->
    <SideBar />
    <!-- 主体 -->
    <Theme />
  </div>
</template>

<script setup>
import { reactive, toRefs, computed, ref } from "vue";
import storage from "storejs";
import Theme from "@/layout/theme/index.vue";
import SideBar from "@/layout/SideBar/index.vue";
import { useStore } from "vuex";
const store = useStore();
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  height: 100%;
}
</style>
