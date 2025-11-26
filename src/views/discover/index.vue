<template>
  <div class="discover-container">
    <DiscoverHeader @search="handleSearch" />
    <ElScrollbar class="discover-scrollbar">
      <div class="discover-content">
        <div class="discover-layout">
          <TabsWrapper :activeTab="activeTab" @tab-change="handleTabChange" />
          <AgentList
            :agents="filteredAgents"
            :marketData="marketData"
            :searchKeyword="searchKeyword"
            :activeTab="activeTab"
            :isLoading="isLoading"
            @agent-click="handleAgentClick"
          />
          <StarMessage v-if="filteredAgents.length > 0" />
        </div>
      </div>
    </ElScrollbar>
    <AgentCardBanner />
  </div>
</template>

<script setup lang="ts">
import { marketJson } from "@database/market"
import { debounce } from "lodash-es"

import { getPrompt } from "@/service/api"

import AgentCardBanner from "./AgentCardBanner.vue"
import AgentList from "./AgentList.vue"
import { useCache } from "./composables/useCache"
import DiscoverHeader from "./DiscoverHeader.vue"
import StarMessage from "./StarMessage.vue"
import TabsWrapper from "./TabsWrapper.vue"
import { options } from "./utils"

interface Agent {
  identifier: string
  meta: {
    title: string
    description: string
    tags: string[]
    avatar: string
    systemRole: string
  }
}

interface MarketData {
  agents: Agent[]
  tags?: string[]
}

defineOptions({ name: "Discover" })

const marketData = ref<MarketData>({ agents: [] })
const searchKeyword = ref("")
const activeTab = ref(options[0]?.value || "assistant")
const isLoading = ref(false)
const error = ref<string | null>(null)

const { set: setCache, get: getCache } = useCache<MarketData>()

const filteredAgents = computed(() => {
  if (!marketData.value?.agents) return []

  let agents = marketData.value.agents

  if (searchKeyword.value.trim()) {
    const keyword = searchKeyword.value.toLowerCase()
    agents = agents.filter(
      (agent) =>
        agent.meta.title.toLowerCase().includes(keyword) ||
        agent.meta.description.toLowerCase().includes(keyword) ||
        agent.meta.tags.some((tag) => tag.toLowerCase().includes(keyword))
    )
  }

  return agents
})

const handleTabChange = (tabValue: string) => {
  activeTab.value = tabValue
}

const handleSearch = debounce((keyword: string) => {
  searchKeyword.value = keyword
}, 300)

const handleAgentClick = (agent: Agent) => {
  console.log("Agent clicked:", agent)
}

const setMarketData = (data: MarketData) => {
  marketData.value = data
  error.value = null
}

const loadMarketData = async () => {
  isLoading.value = true
  error.value = null

  try {
    const cachedData = getCache("marketData")
    if (cachedData) {
      setMarketData(cachedData)
    }

    const localData = window.localStg.get("marketJson")
    if (localData && !__LOCAL_MODE__) {
      setMarketData(localData)
      setCache("marketData", localData)
      isLoading.value = false
    }

    // Load from API
    if (!__LOCAL_MODE__) {
      const data = await getPrompt()
      setMarketData(data)
      setCache("marketData", data)
      window.localStg.set("marketJson", data)
    } else {
      setMarketData(marketJson)
      setCache("marketData", marketJson)
    }
  } catch (err) {
    console.error("Failed to load market data:", err)
    error.value = "Failed to load market data"
    // Fallback to local data
    setMarketData(marketJson)
    setCache("marketData", marketJson)
    window.localStg.set("marketJson", marketJson)
  } finally {
    isLoading.value = false
  }
}

onBeforeMount(loadMarketData)

watch(activeTab, (newTab) => {
  console.log("Active tab changed to:", newTab)
})
</script>

<style lang="scss" scoped>
.discover-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: var(--color-body-bg);
}

.discover-scrollbar {
  flex: 1;
  overflow: hidden;
}

.discover-content {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
}

.discover-layout {
  display: flex;
  flex-direction: column;
  width: 100%;
  // max-width: 1024px;
}
</style>
