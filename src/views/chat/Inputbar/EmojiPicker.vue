<template>
  <div v-click-outside="onClickOutside" class="emoji-section">
    <div class="emojis">
      <ElScrollbar wrapClass="custom-scrollbar-wrap" always>
        <!-- QQ表情包 -->
        <div v-show="table === 'QQ'" class="emoji_QQ" :class="[systemOs]">
          <p v-show="recentlyUsed.length" class="title">最近使用</p>
          <span v-for="item in recentlyUsed" :key="item" class="emoji" @click="handleEmojiSelect(item, table)">
            <img loading="lazy" :src="getEmojiAssetUrlSync(emojiQq?.emojiMap?.[item] || '')" :title="item" />
          </span>
          <p class="title">小黄脸表情</p>
          <template v-if="!loading && emojiQq?.emojiName">
            <template v-if="!rolling">
              <span v-for="item in emojiQq.emojiName" :key="item" class="emoji" @click="handleEmojiSelect(item, table)">
                <img loading="lazy" :src="getEmojiAssetUrlSync(emojiQq.emojiMap[item] || '')" :title="item" />
              </span>
            </template>
            <!-- 二维数组 scroll-snap 滚动贴合 -->
            <template v-else>
              <div v-for="(emoji, index) in emojiPackGroup" :key="index" class="scroll-snap">
                <span
                  v-for="item in emoji"
                  :key="item"
                  class="emoji scroll-content"
                  @click="handleEmojiSelect(item, table)"
                >
                  <img loading="lazy" :src="getEmojiAssetUrlSync(emojiQq.emojiMap[item] || '')" :title="item" />
                </span>
              </div>
            </template>
          </template>
          <div v-else-if="loading" class="loading-placeholder">加载中...</div>
        </div>
        <!-- 抖音表情包 -->
        <div v-show="table === 'Douyin'" class="emoji_douyin">
          <p class="title">抖音表情</p>
          <template v-if="!loading && emojiDouyin?.emojiName">
            <span
              v-for="item in emojiDouyin.emojiName"
              :key="item"
              class="emoji scroll-content"
              @click="handleEmojiSelect(item, table)"
            >
              <img loading="lazy" :src="getEmojiAssetUrlSync(emojiDouyin.emojiMap[item] || '')" :title="item" />
            </span>
          </template>
          <div v-else-if="loading" class="loading-placeholder">加载中...</div>
        </div>
        <div v-if="table === 'Mart'" class="emoji_mart">
          <p class="title">emoji表情</p>
          <template v-if="!loading && emojiArray.length > 0">
            <span
              v-for="key in emojiArray"
              :key="key"
              class="emoji emoji_mart_item"
              @click="handleEmojiSelect(key, table)"
            >
              {{ key }}
            </span>
          </template>
          <div v-else-if="loading" class="loading-placeholder">加载中...</div>
        </div>
      </ElScrollbar>
    </div>
    <div class="toolbar-section">
      <div
        v-for="item in toolbarItems"
        :key="item.id"
        :class="{ 'is-active': item.type === table }"
        @click="table = item.type"
      >
        <SvgIcon v-if="item.svgIcon" :localIcon="item.svgIcon" />
        <component :is="item.icon" v-else-if="item.icon" :size="16" />
        <span v-else>{{ item.content }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue"
import { Smile } from "lucide-vue-next"

import { ClickOutside as vClickOutside } from "element-plus"
import { chunk } from "lodash-es"

import { useChatStore } from "@/stores/modules/chat"
import { getOperatingSystem } from "@/utils/common"
import { getEmojiAssetUrlSync, getEmojiData } from "@/utils/emoji"
import emitter from "@/utils/mitt-bus"

defineOptions({
  name: "EmojiPicker",
})

const emit = defineEmits(["onClose"])

const rolling = true
const toolbarItems = [
  {
    id: "QQ",
    title: "默认表情",
    icon: Smile,
    type: "QQ",
  },
  {
    id: "Douyin",
    title: "抖音",
    svgIcon: "tiktok",
    type: "Douyin",
  },
  {
    id: "Mart",
    title: "mart",
    type: "Mart",
    content: "😀",
  },
]

const EMOJI_GROUP_SIZE = 12 * 6 // 每组表情数量
const recentlyUsed = ref<string[]>([])
const systemOs = ref("")
const table = ref("QQ")
const chatStore = useChatStore()

// 表情包数据响应式状态
const emojiQq = ref<{ emojiMap: Record<string, string>; emojiName: string[] } | null>(null)
const emojiDouyin = ref<{ emojiMap: Record<string, string>; emojiName: string[] } | null>(null)
const emojiArray = ref<string[]>([])

// 加载状态
const loading = ref(false)

// 计算属性 - 表情包分组
const emojiPackGroup = computed(() => {
  if (!emojiQq.value?.emojiName) return []
  return chunk(emojiQq.value.emojiName, EMOJI_GROUP_SIZE)
})

const setClose = () => {
  emit("onClose")
  recentlyUsed.value = [...chatStore.recently].reverse()
}

const getParser = () => {
  systemOs.value = getOperatingSystem()
}

// 按需加载表情包数据
const loadEmojiData = async (type: string) => {
  if (loading.value) return

  loading.value = true
  try {
    const data = await getEmojiData(type)

    switch (type) {
      case "QQ":
        emojiQq.value = data
        break
      case "Douyin":
        emojiDouyin.value = data
        break
      case "Mart":
        emojiArray.value = data.emojiArray
        break
    }
  } catch (error) {
    console.error(`Failed to load emoji data for ${type}:`, error)
  } finally {
    loading.value = false
  }
}

// 监听表情包类型切换，按需加载数据
watch(
  table,
  (newType) => {
    if (newType === "QQ" && !emojiQq.value) {
      loadEmojiData("QQ")
    } else if (newType === "Douyin" && !emojiDouyin.value) {
      loadEmojiData("Douyin")
    } else if (newType === "Mart" && emojiArray.value.length === 0) {
      loadEmojiData("Mart")
    }
  },
  { immediate: true }
)

const handleEmojiSelect = async (item: string, type = "") => {
  let url = ""
  if (type === "QQ") {
    chatStore.setRecently({ data: item, type: "add" })
    url = getEmojiAssetUrlSync(emojiQq.value?.emojiMap?.[item] || "")
  } else if (type === "Douyin") {
    url = getEmojiAssetUrlSync(emojiDouyin.value?.emojiMap?.[item] || "")
  } else {
    emitter.emit("handleToolbar", { data: item, key: "setEditHtml" })
    setClose()
    return
  }
  emitter.emit("handleToolbar", { data: { url, item }, key: "setEmoji" })
  setClose()
}

const onClickOutside = () => {
  setClose()
}

onMounted(() => {
  getParser()
  chatStore.setRecently({ data: "", type: "revert" })
})
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

.loading-placeholder {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  color: var(--color-text-secondary);
  font-size: 14px;
}
</style>
