<template>
  <header class="header" v-if="isWindows">
    <div class="has-custom-titlebar">
      <div class="log">
        <img class="log-img" :src="logSrc" alt="log" />
        <span>{{ $config.Title }}</span>
      </div>
      <div class="flex items-center">
        <div class="setting flex">
          <div class="item" v-for="item in button" :key="item.type" @click="onClick(item)">
            <span :title="item.title">
              <svg-icon :iconClass="item.type" />
            </span>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import logSrc from "@/assets/images/log.png";
import { showConfirmationBox } from "@/utils/message";

const button = [
  {
    type: "minimize",
    title: "最小化",
    name: "minMainWindow",
  },
  {
    type: "maximize",
    title: "最大化",
    name: "maxMainWindow",
  },
  {
    type: "exit",
    title: "关闭",
    name: "quitApp",
  },
];
export default {
  name: "Navbar",
  data() {
    return {
      logSrc,
      isWindows: window.api.isWindows,
      button,
    };
  },
  mounted() {
    electron.ipcRenderer.on("toggleSize", (e, { type }) => {
      this.toggleSize(type);
    });
  },
  methods: {
    toggleSize(type) {
      if (type === "maximize") {
        this.showRestoreIcon();
      } else {
        this.showMaximizeIcon();
      }
    },
    showRestoreIcon() {
      this.button[1].title = "向下还原";
      this.button[1].type = "restored";
    },
    showMaximizeIcon() {
      this.button[1].title = "最大化";
      this.button[1].type = "maximize";
    },
    async onClick({ name }) {
      if (name === "quitApp") {
        const result = await showConfirmationBox({
          message: "确定退出程序吗?",
          iconType: "warning",
        });
        if (result === "cancel") return;
        window.electron.ipcRenderer.send("win:invoke", "close");
      } else if (name === "minMainWindow") {
        window.electron.ipcRenderer.send("win:invoke", "min");
      } else {
        window.electron.ipcRenderer.send("win:invoke", "max");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  height: 42px;
}
.has-custom-titlebar {
  position: relative;
  width: 100%;
  min-width: 500px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 42px;
  backdrop-filter: saturate(180%) blur(20px);
  background: var(--has-custom-titlebar);
  z-index: 100;
  padding: 0 16px;
  -webkit-app-region: drag;
}
.log {
  display: flex;
  img {
    width: 15px;
  }
  span {
    vertical-align: baseline;
    display: inline-block;
    font-size: 14px;
    margin-left: 4px;
    color: rgb(80 83 90);
  }
}
.setting {
  -webkit-app-region: no-drag;
  .item {
    margin-left: 16px;
    .svg-icon {
      color: #303133;
    }
    :hover {
      color: var(--color-icon-hover) !important;
    }
  }
}
</style>
