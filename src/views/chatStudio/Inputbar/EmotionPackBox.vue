<template>
  <div class="emjio-tion" v-click-outside="onClickOutside">
    <div class="emojis">
      <el-scrollbar wrap-class="custom-scrollbar-wrap" always>
        <!-- QQ表情包 -->
        <div :class="['emoji_QQ', systemOs]" v-show="table == 'QQ'">
          <p class="title" v-show="recentlyUsed.length">最近使用</p>
          <span v-for="item in recentlyUsed" class="emoji" :key="item" @click="setEmoji(item)">
            <img :src="getAssetsFile(emojiQq.emojiMap[item])" :title="item" />
          </span>
          <p class="title">小黄脸表情</p>
          <template v-if="!rolling">
            <span
              v-for="item in emojiQq.emojiName"
              class="emoji"
              :key="item"
              @click="setEmoji(item, 'QQ')"
            >
              <img :src="getAssetsFile(emojiQq.emojiMap[item])" :title="item" />
            </span>
          </template>
          <!-- 二维数组 css 滚动贴合 -->
          <template v-else>
            <div class="scroll-snap" v-for="emoji in EmotionPackGroup" :key="emoji">
              <span
                v-for="item in emoji"
                class="emoji scroll-content"
                :key="item"
                @click="setEmoji(item)"
              >
                <img :src="getAssetsFile(emojiQq.emojiMap[item])" :title="item" />
              </span>
            </div>
          </template>
        </div>
        <!-- 抖音表情包 -->
        <div class="emoji_Tiktok" v-show="table == 'Tiktok'">
          <p class="title">抖音表情</p>
          <span
            v-for="item in emojiDouyin.emojiName"
            class="emoji scroll-content"
            :key="item"
            @click="setEmoji(item)"
          >
            <img :src="getAssetsFile(emojiDouyin.emojiMap[item])" :title="item" />
          </span>
        </div>
      </el-scrollbar>
    </div>
    <div class="tool">
      <div
        :class="item.type == table ? 'isHover' : ''"
        v-for="item in toolDate"
        :key="item.icon"
        @click="table = item.type"
      >
        <svg-icon :local-icon="item.icon" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { chunk } from "lodash-es";
import { ClickOutside as vClickOutside } from "element-plus";
import { useChatStore } from "@/stores/modules/chat/index";
import { getAssetsFile, getOperatingSystem } from "@/utils/common";
import emitter from "@/utils/mitt-bus";
import emojiQq from "@/utils/emoji/emoji-map-qq";
import emojiDouyin from "@/utils/emoji/emoji-map-douyin";

defineOptions({
  name: "EmotionPackBox",
});

const emit = defineEmits(["onClose"]);

const rolling = false;
const toolDate = [
  {
    title: "默认表情",
    icon: "iconxiaolian",
    type: "QQ",
  },
  {
    title: "抖音",
    icon: "tiktok",
    type: "Tiktok",
  },
  // {
  //   title: "我的收藏",
  //   icon: "collect",
  //   type: "Like",
  // },
];

const recentlyUsed = ref([]);
const systemOs = ref("");
const table = ref("QQ");
const EmotionPackGroup = ref([]);

const chatStore = useChatStore();

const setClose = () => {
  emit("onClose");
  recentlyUsed.value = [...chatStore.recently].reverse();
};

const initEmotion = () => {
  EmotionPackGroup.value = chunk(emojiQq.emojiName, 12 * 6);
};

const getParser = () => {
  systemOs.value = getOperatingSystem();
};

const setEmoji = (item, type = "") => {
  let url = "";
  if (type === "QQ") {
    url = getAssetsFile(emojiQq.emojiMap[item])
  } else {
    url = getAssetsFile(emojiDouyin.emojiMap[item])
  }
  emitter.emit("handleToolbar", { data: { url, item }, key: "setEmoj" });
  if (type === "QQ") chatStore.setRecently({ data: item, type: "add" });
  setClose();
};

const onClickOutside = () => {
  setClose();
};

onMounted(() => {
  getParser();
  initEmotion();
  chatStore.setRecently({ type: "revert" });
});
</script>

<style lang="scss" scoped>
.emjio-tion {
  position: absolute;
  z-index: 1;
  border-radius: 5px;
  bottom: 46px;
  background: var(--color-body-bg);
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
  border: 1px solid var(--color-border-default);
  :deep(.custom-scrollbar-wrap) {
    scroll-snap-type: y mandatory;
  }
}
.emojis {
  width: 400px;
  height: 152px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  .title {
    font-size: 12px;
    padding: 12px 0 6px;
  }
  .emoji_QQ,
  .emoji_Tiktok {
    padding: 0 10px 0 15px;
  }

  .emoji {
    cursor: pointer;
    display: inline-block;
    img {
      width: 30px;
      height: 30px;
    }
  }
}
.tool {
  height: 40px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  background: var(--color-body-bg);
  border-radius: 0 0 5px 5px;
  border-top: 1px solid #cccccc4a;
  div:not(:nth-child(1)) {
    margin-left: 10px;
  }
  div {
    border-radius: 5px;
    width: 35px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &:hover {
      background: var(--color-message-active);
    }
  }
}
.isHover {
  background: var(--color-message-active) !important;
}
.scroll-snap {
  // scroll-snap-align: start;
  height: 180px;
}
</style>
