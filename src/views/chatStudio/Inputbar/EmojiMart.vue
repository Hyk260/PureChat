<template>
  <div v-click-outside="onClickOutside" ref="emojiMartRef"></div>
</template>

<script setup>
import { ref } from "vue";
import { ClickOutside as vClickOutside } from "element-plus";
import data from "@emoji-mart/data";
import "emoji-mart/dist/browser.js";

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
  if (emojiMartRef.value && EmojiMart) {
    const pickerOptions = {
      onEmojiSelect: handleEmojiSelect,
    };
    const picker = new EmojiMart.Picker(pickerOptions);
    emojiMartRef.value.appendChild(picker);
  }
}

onMounted(() => {
  initEmojiMart();
});
</script>
