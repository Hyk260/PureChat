<template>
  <div v-if="flag" v-click-outside="onClickOutside" class="robot-plugin-box">
    <div class="flex-bc flex-col">
      <div v-for="item in pluginData" :key="item.identifier" class="list flex-bc w-full" @click="setChecked(item)">
        <img class="img" :src="item.imageUrl" alt="" />
        <div class="flex-bc right">
          <div>{{ item.meta.title }}</div>
          <el-checkbox v-model="item.checked" class="h-20" @click.stop />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ClickOutside as vClickOutside } from "element-plus"

import { useState } from "@/hooks/useState"
import { useToolsStore } from "@/stores/modules/tools"
import emitter from "@/utils/mitt-bus"

defineOptions({
  name: "RobotPlugin",
})

const pluginData = ref([
  {
    checked: false,
    // ...getPlugin({ key: "search-engine-serper" }),
  },
  // {
  //   id: "get_weather",
  //   checked: false,
  //   name: "实时天气",
  //   prompt: "",
  //   tools: [getWeather],
  // },
])

const [flag, setFlag] = useState()

const toolsStore = useToolsStore()

function pluginfilter() {
  return pluginData.value.filter((item) => item.checked)
}

function onClickOutside() {
  setFlag(false)
  toolsStore.setTools(pluginfilter())
}

function setChecked(item) {
  item.checked = !item.checked
  toolsStore.setTools(pluginfilter())
}

function feedBack() {
  const plugin = toolsStore.tools
  if (plugin) {
    const pluginIds = new Set(plugin.map((item) => item.id))
    pluginData.value.forEach((item) => {
      if (pluginIds.has(item.id)) {
        item.checked = true
      }
    })
  }
}

emitter.on("onPluginBox", () => {
  feedBack()
  setFlag(true)
})
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
