<template>
  <div
    :class="['app-wrapper', sidebar ? '' : 'style-wrapper']"
    :style="fnStyle(isActive)"
  >
    <Header />
    <main class="app-main">
      <!-- el-scrollbar -->
      <div class="continer-theme">
        <!-- <keep-alive :include="isCached"></keep-alive> -->
        <router-view v-slot="{ Component }">
          <transition name="fade-transform" mode="out-in">
            <component v-if="Component" :is="Component" />
            <component
              v-else
              :is="ComponentMap[page.type] || error"
            ></component>
          </transition>
        </router-view>
      </div>
    </main>
  </div>
</template>

<script setup>
import {
  computed,
  onMounted,
  watch,
  reactive,
  defineAsyncComponent,
} from "vue";
import { useRoute, useRouter } from "vue-router";
import storage from "storejs";
import store from "@/store";
import Header from "./Header.vue";

import error from "@/views/notfound/index.vue";
import editor from "@/views/Editor/index.vue";
import welcome from "@/views/welcome/index.vue";
import personal from "@/views/Personal/index.vue";
import about from "@/views/about/index.vue";

const route = useRoute();
const router = useRouter();

const ComponentMap = {
  home: welcome, //首页
  personal: personal, //个人中心
  editor: editor, //编辑器
  about: about, //关于
};
const page = reactive({
  type: "",
});

watch(
  () => route.name,
  (val) => {
    page.type = val;
  },
  {
    immediate: true, //立即执行
    // deep:true // 深度监听
  }
);

const isActive = computed(() => {
  return store.state.data.isCollapse;
});

const sidebar = computed(() => {
  return store.state.settings.sidebar;
});

const fnStyle = (off) => {
  return `margin-left:${off ? "64px" : "200px"}`;
};
</script>
<style lang="scss" scoped>
.style-wrapper {
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
  height: 100%;
}
</style>
