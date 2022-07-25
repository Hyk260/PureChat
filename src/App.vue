<template>
  <router-view />
</template>

<script setup>
import { onMounted } from "vue";
import { tree } from "@/utils/ToTree";
import { useRouter } from "vue-router";
import storage from "storejs";

const table = storage.get("userdata");

onMounted(() => {
  if (!table?.Routingtable) return;
  tree(table.Routingtable);
  table.Routingtable.forEach((item) => {
    useRouter().addRoute(item);
  });
});
</script>

<style lang="scss">
// @import "./styles/mixin.scss";
#app {
  height: 100%;
  // @include clearfix;
}
.content-wrap {
  padding: 24px;
  height: calc(100vh - 86px);
}
</style>
