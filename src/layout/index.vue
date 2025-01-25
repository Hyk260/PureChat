<template>
  <main class="app-main">
    <div class="continer-theme">
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
import LaySetting from './components/lay-setting/index.vue';
</script>

<style lang="scss" scoped>
.continer-theme {
  height: 100%;
  background: var(--color-body-bg);
}
.app-main {
  height: 100%;
  position: relative;
}
</style>
