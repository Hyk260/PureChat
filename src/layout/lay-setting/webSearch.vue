<template>
  <div>
    <div class="flex-bc gap-5">
      <span>搜索服务商</span>
      <el-select v-model="defaultProvider" placeholder="Select" class="!w-200">
        <el-option
          v-for="item in optionsProviders"
          :key="item.value"
          :label="item.label + item.description"
          :value="item.value"
        />
      </el-select>
    </div>
    <div v-if="localSearch">
      <el-divider class="my-20" />
      <div class="flex gap-5 mb-20">
        <span>{{ defaultProvider }}</span>
        <el-icon class="cursor-pointer" @click="toLink(officialWebsite)"><Promotion /></el-icon>
      </div>
      <div class="flex gap-10">
        <el-input v-model="searchInput" type="password" placeholder="API密钥" show-password clearable @input="onBlur" />
        <el-button @click="checkApiKey">检查</el-button>
      </div>
      <div class="mt-10">
        <el-link :href="apiKeyWebsite" target="_blank" type="primary">点击这里获取密钥</el-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Promotion } from "@element-plus/icons-vue"
import { storeToRefs } from "pinia"
import { computed, onMounted, watch } from "vue"

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
