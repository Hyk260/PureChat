<template>
  <div
    :class="['app-wrapper',sidebar?'':'style-wrapper']"
    :style="`margin-left:${isActive? '64px':'200px'}`"
  >
    <div>
      <Header />
      <!-- el-scrollbar -->
      <main class="app-main">
        <el-scrollbar class="continer-theme">

        <!-- <transition-group name="home">
          <template v-if="page.includes(route.name)">
            <component v-if="route.name === 'home'" :is="home"></component>
            <component v-if="route.name === 'editor'" :is="editor"></component>
            <component v-if="route.name === 'personal'" :is="personal"></component>
          </template> 
        </transition-group> -->
          <!-- <keep-alive :include="isCached"></keep-alive> -->
          <router-view v-slot="{ Component }">
            <transition
              name="fade-transform"
              mode="out-in"
            >
              <component v-if="Component" :is="Component" />
              <component v-else :is="welcome"></component>
            </transition>
          </router-view>
        </el-scrollbar>
      </main>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import store from '@/store'
import storage from 'storejs'
import views from '@/utils/assembly.js'
import Header from './Header.vue'

import editor from '@/views/Editor/index.vue'
import welcome from '@/views/welcome/index.vue'
import personal from '@/views/Personal/index.vue'

const route = useRoute()
const router = useRouter()

const table = storage.get('userdata')
const page = ['home', 'personal', 'editor']
const isActive = computed(() => {
  return store.state.data.isCollapse
})
const sidebar = computed(() => {
  return store.state.settings.sidebar
})
</script>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.28s;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

.fade-transform-enter-active {
  transition: all 0.3s;
  /* ease-out */
}

.fade-transform-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.fade-transform-enter-from,
.fade-transform-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
.home-enter-active,.home-leave-active{
  transition: opacity 0.5s ease;
}
</style>
<style lang="scss" scoped>
.style-wrapper{
  margin: 0 !important;
}
.app-wrapper {
  width: 100%;
}
.app-main {
  padding-top: 86px;
  width: 100%;
  height: 100vh;
  position: relative;
  overflow-x: hidden;
  background: #f0f2f5;
  box-sizing: border-box;
}
.continer-theme {

}
</style>
