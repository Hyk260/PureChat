<template>
  <div class="agent-list-container">
    <!-- Assistant Tab Content -->
    <div v-if="activeTab === 'assistant'" class="agent-list">
      <AgentSkeleton v-if="isLoading" />
      <AgentCard
        v-for="agent in agents"
        v-else
        :key="agent.identifier"
        :agent="agent"
        @click="handleAgentClick"
        @tag-click="handleTagClick"
      />
    </div>

    <!-- Model Provider Tab Content -->
    <div v-if="activeTab === 'model_provider'" class="agent-list model-provider-grid">
      <ModelProviderCard
        v-for="provider in providersList"
        :key="provider.userID"
        :agents="provider"
        @click="handleProviderClick(provider)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"

import { ProvidersList } from "@database/config"

import { useChatStore, useRouteStore } from "@/stores"
import emitter from "@/utils/mitt-bus"

import AgentCard from "./AgentCard.vue"
import AgentSkeleton from "./AgentSkeleton.vue"
import ModelProviderCard from "./ModelProviderCard.vue"

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

interface MarketData {
  agents: Agent[]
  tags?: string[]
}

interface Provider {
  userID: string
  nick: string
  selfSignature: string
}

defineOptions({
  name: "AgentList",
})

interface Props {
  item: Agent[]
  marketData: MarketData
  searchKeyword: string
  activeTab: string
  isLoading: boolean
}

const props = defineProps<Props>()

interface Emits {
  (e: "agentClick", agent: Agent): void
  (e: "tagClick", tag: string): void
}

const emit = defineEmits<Emits>()

const routeStore = useRouteStore()
const chatStore = useChatStore()

const providersList = computed<Provider[]>(() => ProvidersList)

const handleAgentClick = (agent: Agent) => {
  emitter.emit("openAgentCard", agent)
  emit("agentClick", agent)
}

const handleTagClick = (tag: string) => {
  emit("tagClick", tag)
}

const handleProviderClick = (provider: Provider) => {
  routeStore.routerPush("/chat")
  chatStore.addConversation({ sessionId: `C2C${provider.userID}` })
}
</script>

<style lang="scss" scoped>
.agent-list-container {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.agent-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
  padding: 16px;

  &.model-provider-grid {
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  }
}

@media (max-width: 768px) {
  .agent-list {
    grid-template-columns: 1fr;
    padding: 12px;
    gap: 12px;
  }
}

@media (min-width: 1200px) {
  .agent-list {
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  }
}
</style>
