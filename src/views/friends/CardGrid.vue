<template>
  <div class="items-box">
    <div class="left-item">
      <UserAvatar
        words="3"
        shape="square"
        :session-id="item.userID"
        :nick-name="item.name || item.nick"
        :url="item.avatar || ''"
        :type="isGroup ? 'group' : 'single'"
      />
    </div>
    <div class="right-item">
      <p>{{ item.Name || item.name || item.nick }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"

const props = defineProps({
  item: {
    type: Object,
    default: () => ({}),
  },
  type: {
    type: String,
    default: "GROUP", // C2C  GROUP
  },
})

const isGroup = computed(() => props.type === "GROUP")
</script>

<style lang="scss" scoped>
.items-box {
  display: flex;
  border-radius: 6px;
  cursor: pointer;
  width: 100%;
  .left-item {
    img {
      width: 40px;
      height: 40px;
    }
  }
  .right-item {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    padding-left: 10px;
    width: 100%;
    .el-icon {
      cursor: pointer;
    }
  }
}
</style>
