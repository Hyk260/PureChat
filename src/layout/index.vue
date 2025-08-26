<template>
  <main class="app-main">
    <LayAside />
    <LayContent />
    <LaySetting />
  </main>
</template>

<script setup lang="ts">
import LayAside from "./lay-aside/index.vue"
import LayContent from "./lay-content/index.vue"
import LaySetting from "./lay-setting/index.vue"
</script>

<style lang="scss" scoped>
.app-main {
  display: flex;
  height: 100%;
  width: 100%;
  flex: 1;
  background: var(--navbar-background);
}
</style>
