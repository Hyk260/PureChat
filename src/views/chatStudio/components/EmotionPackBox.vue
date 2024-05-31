<template>
  <div v-show="flag" class="emjio-tion" v-click-outside="onClickOutside">
    <div class="emojis">
      <el-scrollbar wrap-class="custom-scrollbar-wrap" always>
        <!-- QQ表情包 -->
        <div :class="['emoji_QQ', systemOs]" v-show="table == 'QQ'">
          <p class="title" v-show="recentlyUsed.length">最近使用</p>
          <span v-for="item in recentlyUsed" class="emoji" :key="item" @click="setEmoji(item)">
            <img :src="require('@/assets/emoji/' + emojiQq.emojiMap[item])" :title="item" />
          </span>
          <p class="title">小黄脸表情</p>
          <template v-if="!rolling">
            <span
              v-for="item in emojiQq.emojiName"
              class="emoji"
              :key="item"
              @click="setEmoji(item, 'QQ')"
            >
              <img :src="require('@/assets/emoji/' + emojiQq.emojiMap[item])" :title="item" />
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
                <img :src="require('@/assets/emoji/' + emojiQq.emojiMap[item])" :title="item" />
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
            <img :src="require('@/assets/emoji/' + emojiDouyin.emojiMap[item])" :title="item" />
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
        <svg-icon :iconClass="item.icon" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useBoolean } from "@/utils/hooks/index";
import { useState } from "@/utils/hooks/useMapper";
import { ClickOutside as vClickOutside } from "element-plus";
import { chunk } from "lodash-es";
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import { getOperatingSystem } from "../utils/utils";

const emojiQq = require("@/utils/emoji/emoji-map-qq");
const emojiDouyin = require("@/utils/emoji/emoji-map-douyin");

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

const [flag, setFlag] = useBoolean();
const { commit } = useStore();
const emit = defineEmits(["setEmoji"]);
const { recently } = useState({
  recently: (state) => state.conversation.recently,
});

const setClose = () => {
  setFlag(false);
  recentlyUsed.value = [...recently.value].reverse();
};

const initEmotion = () => {
  EmotionPackGroup.value = chunk(emojiQq.emojiName, 12 * 6);
};

const getParser = () => {
  systemOs.value = getOperatingSystem();
};

const setEmoji = (item, type = "") => {
  emit("setEmoji", item, table.value);
  if (type == "QQ") {
    commit("setRecently", { data: item, type: "add" });
  }
  setClose();
};

const onClickOutside = () => {
  setClose();
};

onMounted(() => {
  getParser();
  initEmotion();
  commit("setRecently", { type: "revert" });
});

defineExpose({ setFlag });
</script>

<style lang="scss" scoped>
.emjio-tion {
  position: absolute;
  z-index: 1;
  border-radius: 5px;
  bottom: 46px;
  background: #fff;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
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
  background: #fff;
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
      background: #e6e6e6a8;
    }
  }
}
.isHover {
  background: #e6e6e6a8 !important;
  // color: var(--color-icon-hover) !important;
}
.scroll-snap {
  // scroll-snap-align: start;
  height: 180px;
}
</style>
