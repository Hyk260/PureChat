<template>
  <div class="emoji-section" v-click-outside="onClickOutside">
    <div class="emojis">
      <el-scrollbar wrap-class="custom-scrollbar-wrap" always>
        <!-- QQ表情包 -->
        <div :class="['emoji_QQ', systemOs]" v-show="table === 'QQ'">
          <p class="title" v-show="recentlyUsed.length">最近使用</p>
          <span
            v-for="item in recentlyUsed"
            class="emoji"
            :key="item"
            @click="handleEmojiSelect(item, table)"
          >
            <img :src="getAssetsFile(emojiQq.emojiMap[item])" :title="item" />
          </span>
          <p class="title">小黄脸表情</p>
          <template v-if="!rolling">
            <span
              v-for="item in emojiQq.emojiName"
              class="emoji"
              :key="item"
              @click="handleEmojiSelect(item, table)"
            >
              <img :src="getAssetsFile(emojiQq.emojiMap[item])" :title="item" />
            </span>
          </template>
          <!-- 二维数组 css 滚动贴合 -->
          <template v-else>
            <div class="scroll-snap" v-for="emoji in emojiPackGroup" :key="emoji">
              <span
                v-for="item in emoji"
                class="emoji scroll-content"
                :key="item"
                @click="handleEmojiSelect(item, table)"
              >
                <img :src="getAssetsFile(emojiQq.emojiMap[item])" :title="item" />
              </span>
            </div>
          </template>
        </div>
        <!-- 抖音表情包 -->
        <div class="emoji_douyin" v-show="table === 'Douyin'">
          <p class="title">抖音表情</p>
          <span
            v-for="item in emojiDouyin.emojiName"
            class="emoji scroll-content"
            :key="item"
            @click="handleEmojiSelect(item, table)"
          >
            <img :src="getAssetsFile(emojiDouyin.emojiMap[item])" :title="item" />
          </span>
        </div>
        <div class="emoji_mart" v-if="table === 'Mart'">
          <p class="title">emoji</p>
          <span
            v-for="key in emojiArray"
            class="emoji emoji_mart_item"
            :key="key"
            @click="handleEmojiSelect(key, table)"
          >
            {{ key }}
          </span>
        </div>
      </el-scrollbar>
    </div>
    <div class="toolbar-section">
      <div
        v-for="item in toolbarItems"
        :key="item.icon"
        :class="{ 'is-active': item.type === table }"
        @click="table = item.type"
      >
        <SvgIcon v-if="item.icon" :local-icon="item.icon" />
        <span v-else>{{ item.content }}</span>
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
// import emojiMartData from "@emoji-mart/data";
import { emojiArray } from '@/utils/emoji/emoji-map';
import emitter from "@/utils/mitt-bus";
import emojiQq from "@/utils/emoji/emoji-map-qq";
import emojiDouyin from "@/utils/emoji/emoji-map-douyin";

defineOptions({
  name: "EmojiPicker",
});

const emit = defineEmits(["onClose"]);

const rolling = true;
const toolbarItems = [
  {
    title: "默认表情",
    icon: "iconxiaolian",
    type: "QQ",
  },
  {
    title: "抖音",
    icon: "tiktok",
    type: "Douyin",
  },
  {
    title: "mart",
    type: "Mart",
    content: "😀",
  },
];

const EMOJI_GROUP_SIZE = 12 * 6; // 每组表情数量
const recentlyUsed = ref([]);
const systemOs = ref("");
const table = ref("QQ");
const chatStore = useChatStore();

const emojiPackGroup = computed(() => chunk(emojiQq.emojiName, EMOJI_GROUP_SIZE));

const setClose = () => {
  emit("onClose");
  recentlyUsed.value = [...chatStore.recently].reverse();
};

const getParser = () => {
  systemOs.value = getOperatingSystem();
};

const handleEmojiSelect = (item, type = "") => {
  let url = "";
  if (type === "QQ") {
    chatStore.setRecently({ data: item, type: "add" });
    url = getAssetsFile(emojiQq.emojiMap[item]);
  } else if (type === "Douyin") {
    url = getAssetsFile(emojiDouyin.emojiMap[item]);
  } else {
    emitter.emit("handleToolbar", { data: item, key: "setEditHtml" });
    setClose();
    return;
  }
  emitter.emit("handleToolbar", { data: { url, item }, key: "setEmoji" });
  setClose();
};

const onClickOutside = () => {
  setClose();
};

onMounted(() => {
  getParser();
  chatStore.setRecently({ type: "revert" });
});
</script>

<style lang="scss" scoped>
.emoji-section {
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
  .emoji_douyin,
  .emoji_mart {
    width: 100%;
    padding: 0 10px 0 15px;
  }
  .emoji_mart_item {
    text-align: center;
    width: 30px;
    height: 30px;
    font-size: 25px;
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

.toolbar-section {
  height: 40px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  gap: 10px;
  background: var(--color-body-bg);
  border-radius: 0 0 5px 5px;
  border-top: 1px solid #cccccc4a;
  & > div {
    border-radius: 5px;
    width: 35px;
    height: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    &:hover,
    &.is-active {
      background: var(--color-message-active);
    }
  }
}

.scroll-snap {
  // scroll-snap-align: start;
  height: 180px;
}
</style>
