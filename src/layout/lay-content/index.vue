<template>
  <div class="home-page">
    <div class="container-theme">
      <RouterView v-slot="{ Component, route }">
        <Transition
          :name="transitionName"
          :appear="true"
          mode="out-in"
          @before-leave="appStore.setContentXScrollable(true)"
          @after-leave="resetScroll"
          @after-enter="appStore.setContentXScrollable(false)"
        >
          <!-- <KeepAlive :include="routeStore.cacheRoutes" :exclude="routeStore.excludeCacheRoutes" :max="3">
            <component :is="Component" v-if="routeStore.reloadFlag" :key="routeStore.getTabIdByRoute(route)" />
          </KeepAlive> -->
          <KeepAlive v-if="route.meta?.keepAlive">
            <component :is="Component" v-if="Component" :key="route.path" />
          </KeepAlive>
          <template v-else>
            <component :is="Component" v-if="Component" :key="route.path" />
          </template>
        </Transition>
      </RouterView>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"

import { useAppStore, useRouteStore, useThemeStore } from "@/stores"

const appStore = useAppStore()
const themeStore = useThemeStore()
const routeStore = useRouteStore()

const transitionName = computed(() => (themeStore.page.animate ? themeStore.page.animateMode : ""))

function resetScroll() {
  const el = document.querySelector(`#${"__SCROLL_EL_ID__"}`)

  el?.scrollTo({ left: 0, top: 0 })
}
</script>

<style lang="scss" scoped>
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
