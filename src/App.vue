<template>
    <router-view />
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "app",
});


</script>

<style lang="scss" scoped>
main {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  overflow: auto;
  padding: 64px 10vw 96px 10vw;
  box-sizing: border-box;
}

@media (max-width: 1336px) {
  main {
    padding: 64px 5vw 96px 5vw;
  }
}

main::-webkit-scrollbar {
  width: 0px;
}

.app {
  width: 100%;
  transition: all 0.4s;
}
</style>
