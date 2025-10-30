<template>
  <div>
    <div class="flex-bc gap-5">
      <span>搜索服务商</span>
      <ElSelect v-model="defaultProvider" placeholder="Select" class="!w-200">
        <ElOption
          v-for="item in optionsProviders"
          :key="item.value"
          :label="item.label + item.description"
          :value="item.value"
        />
      </ElSelect>
    </div>
    <div v-if="localSearch">
      <ElDivider class="my-20" />
      <div class="flex gap-5 mb-20">
        <span>{{ defaultProvider }}</span>
        <ElIcon class="cursor-pointer" @click="toLink(officialWebsite)"><ExternalLink /></ElIcon>
      </div>
      <div class="flex gap-10">
        <ElInput v-model="searchInput" type="password" placeholder="API密钥" show-password clearable @input="onBlur" />
        <ElButton @click="checkApiKey">检查</ElButton>
      </div>
      <div class="mt-10">
        <ElLink :href="apiKeyWebsite" target="_blank" type="primary">点击这里获取密钥</ElLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from "vue"
import { ElLink } from "element-plus"
import { ExternalLink } from "lucide-vue-next"

import { storeToRefs } from "pinia"

import { WEB_SEARCH_PROVIDER_CONFIG } from "@/config/webSearchProviders"
import { useState } from "@/hooks/useState"
import WebSearchService from "@/service/WebSearchService"
import { useWebSearchStore } from "@/stores/index"
import { hasObjectKey, openWindow } from "@/utils/common"

const { DEV: isDev } = import.meta.env

const [searchInput, setSearchInput] = useState("")

const webSearchStore = useWebSearchStore()

const { defaultProvider, getProviderConfig } = storeToRefs(webSearchStore)

const webSearchProviderConfig = computed(() => {
  return WEB_SEARCH_PROVIDER_CONFIG[defaultProvider.value]
})

const localSearch = computed(() => {
  return !defaultProvider.value?.startsWith("local-")
})

const apiKeyWebsite = computed(() => {
  return webSearchProviderConfig.value?.websites?.apiKey
})
const officialWebsite = computed(() => {
  return webSearchProviderConfig.value?.websites?.official
})

const optionsProviders = computed(() => {
  const providers = webSearchStore.providers

  const filteredProviders = isDev ? providers : providers.filter((t) => t.id !== "test")

  return filteredProviders.map((value) => ({
    value: value.id,
    label: value.name,
    description: hasObjectKey(value, "apiKey") ? " (API 密钥)" : " (免费)",
  }))
})

function onBlur() {
  webSearchStore.updateWebSearchProvider({
    id: defaultProvider.value,
    apiKey: searchInput.value,
  })
}

function toLink(url: string) {
  if (url) openWindow(url)
}

async function checkApiKey() {
  if (!searchInput.value) {
    window.$message?.warning("请输入API密钥")
    return
  }

  const { valid, error } = await WebSearchService.checkSearch(defaultProvider.value)

  if (valid) {
    window.$message?.success("API密钥验证通过")
  } else {
    window.$message?.error(error || "验证失败")
  }
}

onMounted(() => {
  setSearchInput(getProviderConfig.value?.apiKey || "")
})

watch(defaultProvider, () => {
  setSearchInput(getProviderConfig.value?.apiKey || "")
})
</script>
