<template>
  <main class="app-main">
    <LayAside />
    <div class="home-page">
      <div class="container-theme">
        <router-view v-slot="{ Component, route }">
          <transition name="fade-slide" :appear="true" mode="out-in">
            <keep-alive v-if="route.meta.keep" max="1">
              <component :is="Component" v-if="Component" :key="route.path" />
            </keep-alive>
            <template v-else>
              <component :is="Component" v-if="Component" :key="route.path" />
            </template>
          </transition>
        </router-view>
      </div>
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
  width: 100%;
  flex: 1;
  background: var(--navbar-background);
  .home-page {
    width: 100%;
  }
  .container-theme {
    height: 100%;
    width: 100%;
    overflow: hidden;
    background: var(--color-body-bg);
    border-top-left-radius: 10px;
    border-top: 0.5px solid var(--color-border-default);
    border-left: 0.5px solid var(--color-border-default);
  }
}
</style>
