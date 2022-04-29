<template>
  <div class="theme">
    <Header />
    <div class="continer-theme">
      <transition-group name="fade-transform" mode="out-in">
        <template v-if="page.includes(route.name)">
          <component v-if="route.name === 'home'" :is="home"></component>
          <!-- <component v-if="route.name === 'editor'" :is="editor"></component> -->
          <component v-if="route.name === 'personal'" :is="personal"></component>
        </template> 
      </transition-group>
      
      <router-view v-slot="{ Component }">
        <transition name="fade-transform" mode="out-in">
          <!-- <keep-alive :include="isCached"> -->
          <component :is="Component" />
          <!-- </keep-alive> -->
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import storage from "storejs";
import views from "@/utils/assembly.js";
import Header from "./Header.vue";

import editor from "@/views/Editor/index.vue";
import home from "@/views/welcome/index.vue";
import personal from "@/views/Personal/index.vue";

const route = useRoute();
const router = useRouter();

const table = storage.get("userdata");
const page = ["home", "personal", "editor"];
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
</style>
<style lang="scss" scoped>
.theme {
  width: 100%;
}
.continer-theme {
  height: calc(100vh - 86px);
  background: #f0f2f5;
  padding: 24px;
  box-sizing: border-box;
  overflow: hidden;
}
</style>
