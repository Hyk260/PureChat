<template>
  <div class="home-page">
    <div class="container-theme">
      <RouterView v-slot="{ Component, route }">
        <Transition :name="transitionName" :appear="true" mode="out-in">
          <KeepAlive :include="routeStore.cacheRoutes" :exclude="routeStore.excludeCacheRoutes">
            <component :is="Component" v-if="Component" :key="route.path" />
          </KeepAlive>
        </Transition>
      </RouterView>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouteStore, useThemeStore } from '@/stores/index';

const themeStore = useThemeStore();
const routeStore = useRouteStore();

const transitionName = computed(() => (themeStore.page.animate ? themeStore.page.animateMode : ''));

</script>

<style lang='scss' scoped>
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
</style>
