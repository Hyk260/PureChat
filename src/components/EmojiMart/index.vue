<template>
  <div ref="emojiMartRef" v-click-outside="onClickOutside"></div>
</template>

<script setup lang="ts">
import { ClickOutside as vClickOutside } from "element-plus"
import { Picker } from "emoji-mart"

defineOptions({
  name: "EmojiMart",
})

const emit = defineEmits(["onClose", "emoji-selected"])

const emojiMartRef = ref<HTMLElement>()

const handleEmojiSelect = (emoji) => {
  emit("emoji-selected", emoji)
}

function onClickOutside() {
  emit("onClose")
}

async function initEmojiMart() {
  try {
    const [
      zh,
      // data
    ] = await Promise.all([
      import("@/assets/emoji-mart/langs/zh.json"),
      // import("@/assets/emoji-mart/data/native.json"),
    ])
    if (emojiMartRef.value) {
      const pickerOptions = {
        // data: data.default || data,
        data: async () => {
          const response = await fetch("https://cdn.jsdelivr.net/npm/@emoji-mart/data")
          return response.json()
        },
        noCountryFlags: true,
        theme: "light", // auto, light, dark
        skinTonePosition: "none",
        previewPosition: "none",
        onEmojiSelect: handleEmojiSelect,
        locale: "zh",
        i18n: { ...(zh.default || zh) },
      }
      const picker = new Picker(pickerOptions)
      emojiMartRef.value?.appendChild(picker)
    }
  } catch (error) {
    console.error("Failed to load emoji-mart resources:", error)
  }
}

onMounted(() => {
  initEmojiMart()
})
</script>

<style scoped lang="scss">
.loading-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;

  .loading-icon {
    font-size: 24px;
    color: var(--el-color-primary);
    animation: rotating 2s linear infinite;
  }
}

@keyframes rotating {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
