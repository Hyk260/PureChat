<template>
  <div v-click-outside="onClickOutside" ref="emojiMartRef"></div>
</template>

<script setup>
import { ref } from "vue";
import { ClickOutside as vClickOutside } from "element-plus";
import { Picker } from "emoji-mart";
import data from "@emoji-mart/data";
import zh from '@emoji-mart/data/i18n/zh.json';

defineOptions({
  name: "EmojiMart",
});

const emit = defineEmits(["onClose", "emoji-selected"]);

const emojiMartRef = ref("");

const handleEmojiSelect = (emoji) => {
  console.log("选择的表情:", emoji);
  console.log("data:", data);
  emit("emoji-selected", emoji);
};

function onClickOutside() {
  emit("onClose");
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
      locale: 'zh',
      i18n: { ...zh }
    };
    const picker = new Picker(pickerOptions);
    emojiMartRef.value.appendChild(picker);
  }
}

onMounted(() => {
  initEmojiMart();
});
</script>
