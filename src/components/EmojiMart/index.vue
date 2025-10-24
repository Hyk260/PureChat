<template>
  <div ref="emojiMartRef" v-click-outside="onClickOutside"></div>
</template>

<script setup lang="ts">
import data from "@emoji-mart/data"
import zh from "@emoji-mart/data/i18n/zh.json"
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

function initEmojiMart() {
  if (emojiMartRef.value) {
    const pickerOptions = {
      data: data,
      noCountryFlags: true,
      theme: "light", // auto, light, dark
      skinTonePosition: "none",
      previewPosition: "none",
      onEmojiSelect: handleEmojiSelect,
      locale: "zh",
      i18n: { ...zh },
    }
    const picker = new Picker(pickerOptions)
    emojiMartRef.value?.appendChild(picker)
  }
}

onMounted(() => {
  initEmojiMart()
})
</script>
