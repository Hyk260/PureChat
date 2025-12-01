<template>
  <article class="agent-card" @click="handleCardClick">
    <header class="card-header">
      <h3 class="agent-title">{{ agent.meta.title }}</h3>
      <div class="agent-avatar">{{ agent.meta.avatar }}</div>
    </header>
    <p class="agent-description">{{ agent.meta.description }}</p>
    <div class="agent-tags">
      <span v-for="tag in agent.meta.tags" :key="tag" class="tag" @click.stop="handleTagClick(tag)">
        {{ tag }}
      </span>
    </div>
  </article>
</template>

<script setup lang="ts">
interface AgentMeta {
  title: string
  description: string
  tags: string[]
  avatar: string
  systemRole: string
}

interface Agent {
  identifier: string
  meta: AgentMeta
}

defineOptions({
  name: "AgentCard",
})

interface Props {
  agent: Agent
}

const props = defineProps<Props>()

interface Emits {
  (e: "click", agent: Agent): void
  (e: "tagClick", tag: string): void
}

const emit = defineEmits<Emits>()

const handleCardClick = () => {
  emit("click", props.agent)
}

const handleTagClick = (tag: string) => {
  emit("tagClick", tag)
}
</script>

<style lang="scss" scoped>
.agent-card {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  cursor: pointer;
  background: var(--color-text-tags);
  border-radius: 8px;
  border: 1px solid var(--color-border-light);
  transition: all 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);

  &:hover {
    box-shadow: 0 0 1px 1px var(--color-card);
  }
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
}

.agent-title {
  font-weight: 600;
  font-size: 16px;
  color: var(--color-text);
  margin: 0;
  line-height: 1.4;
  flex: 1;
}

.agent-avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  font-size: 20px;
  background: var(--color-primary-light);
  border-radius: 8px;
  flex-shrink: 0;
}

.agent-description {
  min-height: 44px;
  line-height: 1.5;
  color: var(--color-text-secondary);
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.agent-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tag {
  padding: 4px 8px;
  font-size: 12px;
  line-height: 1.2;
  border-radius: 4px;
  color: var(--color-text-secondary);
  background: var(--tags-back);
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    background: var(--tags-back-hover);
    color: var(--color-primary);
  }
}
</style>
