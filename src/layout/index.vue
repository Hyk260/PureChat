<template>
  <main class="app-main">
    <LayAside />
    <div class="container-theme">
      <router-view v-slot="{ Component, route }">
        <transition name="fade-slide" :appear="true" mode="out-in">
          <keep-alive v-if="route.meta.keep" max="1">
            <component v-if="Component" :is="Component" :key="route.path" />
          </keep-alive>
          <template v-else>
            <component v-if="Component" :is="Component" :key="route.path" />
          </template>
        </transition>
      </router-view>
    </div>
    <LaySetting />
  </main>
</template>

<script setup>
import LaySetting from "./lay-setting/index.vue";
import LayAside from "./lay-aside/index.vue";
</script>

<style lang="scss" scoped>
.app-main {
  display: flex;
  height: 100%;
  position: relative;
  .container-theme {
    height: 100%;
    width: 100%;
    background: var(--color-body-bg);
  }
}
</style>
