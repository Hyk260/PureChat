<template>
  <div class="message_name">
    <span v-if="message.from == '@TIM#SYSTEM'">
      系统
    </span>
    <span v-else>
      {{message.from}}
    </span>
  </div>
  <div class="message">
    <span class="message-view__item--text text right-menu-item">
      <span class="text" v-if="message.conversationType == '@TIM#SYSTEM'">
        {{ GroupSystemNotice(message) }}
      </span>
      <span v-else class="text linkUrl">
        {{message.payload.text}}
      </span>
    </span>
  </div>
</template>

<script setup>
import  { GroupSystemNotice } from '../utils/utils';
const props = defineProps({
  message: {
    type: Object,
    default: null,
  },
});
const { message } = props;
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
