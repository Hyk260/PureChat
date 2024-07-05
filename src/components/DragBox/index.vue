<template>
  <div v-if="isWindows" class="dragBox">
    <span class="exit" @click="onClick">
      <svg-icon iconClass="exit" />
    </span>
  </div>
</template>

<script>
export default {
  name: "DragBox",
  data() {
    return {
      isWindows: window.api.isWindows,
    };
  },
  methods: {
    onClick() {
      window.electron.ipcRenderer.send("win:invoke", "close");
    },
  },
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
  .exit {
    :hover {
      color: var(--color-icon-hover) !important;
    }
  }
  .svg-icon {
    -webkit-app-region: no-drag;
    margin-right: 16px;
    .svg-icon {
      color: #303133;
    }
  }
}
</style>
