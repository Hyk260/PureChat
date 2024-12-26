<template>
  <div v-if="flag" class="robot-plugin-box" v-click-outside="onClickOutside">
    <div class="flex-bc flex-col w-220">
      <div
        class="list flex-bc w-full"
        v-for="item in pluginData"
        :key="item.id"
        @click="setChecked(item)"
      >
        <img class="img" :src="item.url" alt="" />
        <div class="flex-bc right">
          <div>{{ item.name }}</div>
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
import emitter from "@/utils/mitt-bus";
import { useStore } from "vuex";
import { localStg } from "@/utils/storage";

const { commit } = useStore();
const [flag, setFlag] = useBoolean();

const getAssetsFile = (url) => {
  return new URL(`../../../assets/images/plugin/${url}`, import.meta.url).href;
};

const pluginData = ref([
  {
    id: 0,
    name: "网络搜索",
    checked: false,
    prompt:
      "## Tools\n\nYou can use these tools below:\n\n### Web Search\n\nSearch for information from the internet\n\nThe APIs you can use:\n\n#### web_search____searchGoogle\n\nSearch Google and return top 10 results",
    url: getAssetsFile("web-search.png"),
    tools: [],
  },
  // {
  //   id: 1,
  //   name: "实时天气",
  //   checked: false,
  //   prompt: "",
  //   url: getAssetsFile("fluent-emoji.webp"),
  //   tools: [],
  // },
  {
    id: 2,
    name: "DALL·E 3",
    checked: false,
    prompt: "",
    url: getAssetsFile("1f389.webp"),
    tools: [
      {
        type: "function",
        function: {
          name: "Dalle3",
          description: "openai's dall-e image generator.",
          parameters: {
            type: "object",
            required: ["model", "n", "prompt", "size", "quality", "style"],
            properties: {
              model: {
                type: "string",
                description: "model name, required and value is `dall-e-3`.",
              },
              n: {
                type: "number",
                description: "value is `1`",
              },
              prompt: {
                type: "string",
                description:
                  "A text description of the desired image(s). input must be a english prompt.",
              },
              size: {
                type: "string",
                description:
                  "images size, can be `1024x1024`, `1024x1792`, `1792x1024`. default value is `1024x1024`",
              },
              quality: {
                type: "string",
                description: "images quality, can be `standard`, `hd`. default value is `hd`",
              },
              style: {
                type: "string",
                description: "images style, can be `vivid`, `natural`. default value is `vivid`",
              },
            },
          },
        },
      },
    ],
  },
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
    const pluginIds = new Set(plugin.map(item => item.id));
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
