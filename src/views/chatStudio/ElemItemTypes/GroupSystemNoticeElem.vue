<template>
  <div class="message-view__item--text">
    {{ GroupSystemNotice(message) }}
  </div>
</template>

<script>
import { GroupSystemNotice } from "../utils/utils";
export default {
  name: "GroupSystemNoticeElem",
  props: {
    message: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      GroupSystemNotice,
    };
  },
};
</script>

<style lang="scss" scoped>
.message-view__item--text {
  width: fit-content;
  padding: 10px 14px;
  max-width: 360px;
  padding: 10px 14px;
  box-sizing: border-box;
  border-radius: 3px;
  background: var(--other-msg-color);
}
</style>
