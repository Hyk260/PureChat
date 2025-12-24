<template>
  <ElDialog
    v-model="isDialogVisible"
    width="40%"
    alignCenter
    class="p-0 min-w-500"
    :showClose="false"
    :lockScroll="false"
  >
    <div class="agent-card-banner">
      <div class="flex-c flex-col text-50">
        <div>
          {{ agentData.meta.avatar }}
        </div>
      </div>
      <div class="flex-c flex-col relative p-16 pb-24 gap-16">
        <h2>
          {{ agentData.meta.title }}
        </h2>
        <div class="tags flex-c flex-wrap gap-6">
          <span v-for="item in agentData.meta.tags" :key="item">
            {{ item }}
          </span>
        </div>
        <div class="desc">
          {{ agentData.meta.description }}
        </div>
      </div>
      <Markdown class="market" :content="agentData.meta.systemRole" />
      <div class="flex-c py-20">
        <ElButton class="w-306" @click="startConversation()"> 开始会话 </ElButton>
      </div>
    </div>
  </ElDialog>
</template>

<script setup lang="ts">
import Markdown from "@/components/Markdown/index.vue"
import { ModelID } from "model-bank"

import { getModelId } from "@/ai/utils"
import { usePrepareMessageData } from "@/hooks/useMessageOperations"
import { useState } from "@/hooks/useState"
import { useChatStore, useRobotStore, useRouteStore } from "@/stores"
import emitter from "@/utils/mitt-bus"

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
  name: "AgentCardBanner",
})

const agentData = ref<Agent>({} as Agent)
const [isDialogVisible, setIsDialogVisible] = useState(false)
const { createAssistantPromptMessage } = usePrepareMessageData()

const routeStore = useRouteStore()
const robotStore = useRobotStore()
const chatStore = useChatStore()

const startConversation = () => {
  const { identifier, meta } = agentData.value
  const defaultBot = robotStore.defaultProvider

  const prompt = {
    id: identifier,
    meta,
    lang: "cn",
    prompt: [{ role: "system", content: meta.systemRole }],
  }

  robotStore.setPromptStore([prompt], defaultBot)
  const modelId = getModelId(defaultBot) || ModelID.OpenAI

  setIsDialogVisible(false)
  routeStore.routerPush("/chat")
  chatStore.addConversation({ sessionId: `C2C${modelId}` })

  setTimeout(() => {
    const data = createAssistantPromptMessage()
    chatStore.addAiPresetPromptWords(data)
  }, 200)
}

const openAgentCard = (agent: Agent) => {
  agentData.value = agent
  setIsDialogVisible(true)
}

onMounted(() => {
  emitter.on("openAgentCard", openAgentCard)
})

onBeforeUnmount(() => {
  emitter.off("openAgentCard", openAgentCard)
})
</script>

<style lang="scss" scoped>
.agent-card-banner {
  .tags {
    span {
      color: #666666;
      background: var(--tags-back);
      height: 20px;
      line-height: 20px;
      padding: 0 7px;
      display: flex;
      align-items: center;
      border-radius: 4px;
      white-space: nowrap;
      text-align: center;

      &:hover {
        background: var(--tags-back-hover);
      }
    }
    .desc {
      color: #666666;
      text-align: center;
      line-height: 22px;
    }
  }
  .market {
    max-height: 320px;
    overflow: auto;
    padding: 16px;
  }
}
</style>
