<template>
  <div v-if="isMac" class="dragBox"></div>
</template>

<script>
export default {
  name: "DragBox",
  data() {
    return {
      isMac: window.api?.isMac,
    };
  }
};
</script>

<style lang="scss" scoped>
.dragBox {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;
  height: 42px;
  z-index: 100;
  -webkit-app-region: drag;
}
</style>
