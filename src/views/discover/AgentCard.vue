<template>
  <div class="card">
    <div class="top">
      <span class="title">
        {{ agents.meta.title }}
      </span>
      <span class="avatar">
        {{ agents.meta.avatar }}
      </span>
    </div>
    <div class="desc multi-truncate-3">
      {{ agents.meta.description }}
    </div>
    <div class="tags">
      <span v-for="(tag, index) in agents.meta.tags" :key="index">
        {{ tag }}
      </span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  agents: {
    type: [Array, Object],
    default: () => [],
  },
});
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
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
    .title {
      font-weight: 600;
    }
    .avatar {
      display: inline-block;
      width: 40px;
      height: 40px;
      font-size: 28px;
      text-align: center;
      line-height: 40px;
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
