<template>
  <div class="theme">
    <Header />
    <div class="continer-theme">
      <router-view />
      <template v-if="page.includes(route.name)">
        <component
          v-if="route.name === 'home'"
          :is="home"
        ></component>
        <component
          v-if="route.name === 'editor'"
          :is="editor"
        ></component>
        <component
          v-if="route.name === 'personal'"
          :is="personal"
        ></component>
      </template>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import storage from 'storejs'
import views from '@/utils/assembly.js'
import Header from './Header.vue'

import editor from '@/views/Editor/index.vue'
import home from '@/views/welcome/index.vue'
import personal from '@/views/Personal/index.vue'


const route = useRoute()
const router = useRouter()

const table = storage.get('userdata')
const page = ['home', 'personal', 'editor']

</script>

<style lang="scss" scoped>
.theme {
  width: 100%;
}
.continer-theme {
  height: calc(100vh - 86px);
  background: #f0f2f5;
  padding: 24px;
  box-sizing: border-box;
}
</style>