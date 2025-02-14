<template>
  <div class="w-full py-16 flex-c text-12">
    喜欢{{ VITE_APP_NAME }}？
    <a class="text-amber-600" :href="homepage" target="_blank">在 GitHub 给添加星标 </a>
    并
    <a class="text-amber-600" :href="bugs.url" target="_blank">分享您宝贵的建议 !</a>
  </div>
</template>

<script setup>
const { VITE_APP_NAME } = import.meta.env;
const { homepage, bugs } = __APP_INFO__.pkg;
</script>
