<template>
  <div>
    <button @click="showPicker = true">打开表情符号选择器</button>
    <emoji-picker v-if="showPicker" @emoji-click="onEmojiClick"></emoji-picker>
    <p>你选择的表情符号: {{ selectedEmoji }}</p>
  </div>
</template>

<script setup>
import 'emoji-picker-element';

const showPicker = ref(true);
const selectedEmoji = ref('');

const onEmojiClick = (event) => {
  selectedEmoji.value = event.detail.unicode;
  showPicker.value = false;
};
</script>    