<template>
  <div class="card">
    <div class="top">
      <span class="avatar">
        <img loading="lazy" class="w-40 h-40" :src="getAiAvatarUrl(agents.userID)" alt="" />
      </span>
      <span class="title">
        {{ agents.nick }}
      </span>
    </div>
    <div class="desc multi-truncate-2">
      {{ agents.selfSignature }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { getAiAvatarUrl } from "@/ai/utils"

defineOptions({
  name: "ModelProviderCard",
})

defineProps({
  agents: {
    type: Object,
    default: () => {},
  },
})
</script>

<style lang="scss" scoped>
.card {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  cursor: pointer;
  background: var(--color-text-tags);
  border-radius: 8px;
  transition: box-shadow 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  &:hover {
    box-shadow: 0 0 1px 1px var(--color-card);
  }
  .top {
    display: flex;
    align-items: center;
    gap: 8px;
    .title {
      font-weight: 600;
    }
    .avatar {
      img {
        border-radius: 5px;
      }
    }
  }
  .desc {
    min-height: 44px;
    line-height: 1.5;
  }
  .tags {
    display: flex;
    flex-direction: row;
    gap: 6px;
    flex-wrap: wrap;
    span {
      cursor: pointer;
      line-height: 20px;
      font-size: 12px;
      border-radius: 3px;
      color: #666;
      border: 5px;
      height: auto;
      display: inline-block;
      padding: 0 7px;
      text-align: start;
      transform: all 0.2s;
      background: var(--tags-back);
      &:hover {
        background: var(--tags-back-hover);
      }
    }
  }
}
</style>
