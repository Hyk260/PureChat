<template>
  <div class="message_name">
    {{ message.message_sender_profile.user_profile_nick_name }}
  </div>
  <div class="message">
    <span class="message-view__item--text text right-menu-item">
      <span class="text linkUrl">
        {{ message.message_elem_array[0].text_elem_content }}
      </span>
    </span>
  </div>
</template>

<script setup>
import { computed, defineProps } from "vue";

const props = defineProps({
  message: {
    type: Array,
    default: [],
  }
});
const { message } = props

</script>

<style lang="scss" scoped>
.message_name {
  margin-bottom: 5px;
  color: rgba(0, 0, 0, 0.45);
  font-size: 12px;
}
.message {
  width: -webkit-fit-content;
  width: -moz-fit-content;
  width: fit-content;
  padding: 10px 14px;
  max-width: 360px;
  padding: 10px 14px;
  box-sizing: border-box;
  border-radius: 3px;
}
.message-view__text {
  width: fit-content;
  margin-bottom: 5px;
}
</style>
