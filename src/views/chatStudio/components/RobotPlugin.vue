<template>
  <div v-if="flag" class="robot-plugin-box" v-click-outside="onClickOutside">
    <div class="flex-bc flex-col w-220">
      <div
        class="list flex-bc w-full"
        v-for="item in pluginData"
        :key="item.identifier"
        @click="setChecked(item)"
      >
        <img class="img" :src="item.imageUrl" alt="" />
        <div class="flex-bc right">
          <div>{{ item.meta.title }}</div>
          <el-checkbox @click.stop class="h-20" v-model="item.checked" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { StoreKey } from "@/ai/constant";
import { ClickOutside as vClickOutside } from "element-plus";
import { useBoolean } from "@/utils/hooks/index";
import { useStore } from "vuex";
import { localStg } from "@/utils/storage";
import { getPlugin } from "../utils/utils";
import emitter from "@/utils/mitt-bus";

const { commit } = useStore();
const [flag, setFlag] = useBoolean();

const pluginData = ref([
  {
    checked: false,
    ...getPlugin({ key: "web_search" }),
  },
  // {
  //   id: "get_weather",
  //   checked: false,
  //   name: "实时天气",
  //   prompt: "",
  //   url: getAssetsFile("fluent-emoji.webp"),
  //   tools: [getWeather],
  // },
]);

function pluginfilter() {
  return pluginData.value.filter((item) => item.checked);
}

function onClickOutside() {
  setFlag(false);
  localStg.set(StoreKey.Tool, pluginfilter());
}

function setChecked(item) {
  item.checked = !item.checked;
  commit("setBotTools", pluginfilter());
}

function feedBack() {
  const plugin = localStg.get(StoreKey.Tool);
  if (plugin) {
    const pluginIds = new Set(plugin.map((item) => item.id));
    pluginData.value.forEach((item) => {
      if (pluginIds.has(item.id)) {
        item.checked = true;
      }
    });
  }
}

emitter.on("onPluginBox", () => {
  feedBack();
  setFlag(true);
});
</script>

<style lang="scss" scoped>
.robot-plugin-box {
  overflow-y: auto;
  position: absolute;
  padding: 4px;
  z-index: 1;
  left: 5px;
  border-radius: 5px;
  bottom: 46px;
  max-height: 500px;
  background: var(--color-robot-model);
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
  .list {
    border-radius: 5px;
    cursor: pointer;
    img {
      min-height: 22px;
      min-width: 22px;
      width: 22px;
      height: 22px;
      border-radius: 10px;
      margin-left: 12px;
    }
    &:hover {
      background-color: rgba(0, 0, 0, 0.03);
    }
  }
  .right {
    display: flex;
    flex-direction: row;
    -webkit-box-pack: justify;
    justify-content: space-between;
    width: 100%;
    padding: 8px 12px;
    gap: 40px;
  }
}
</style>
