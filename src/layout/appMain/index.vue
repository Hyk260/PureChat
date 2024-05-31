<template>
  <div class="app-wrapper">
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
    </main>
  </div>
</template>

<script setup></script>
<style lang="scss" scoped>
.app-wrapper {
  width: 100%;
}
.continer-theme {
  height: 100%;
  background: var(--color-body-bg);
}
.app-main {
  height: 100vh;
  width: 100%;
  position: relative;
  box-sizing: border-box;
}
</style>
