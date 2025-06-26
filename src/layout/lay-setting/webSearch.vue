<template>
  <div>
    <div class="flex-bc gap-5">
      <span>搜索服务商</span>
      <el-select v-model="defaultProvider" placeholder="Select" class="!w-200">
        <el-option
          v-for="item in optionsProviders"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <el-divider class="my-20" />
    <div class="flex gap-5 mb-20">
      <span>{{ defaultProvider }}</span>
      <el-icon @click="toLink(officialWebsite)" class="cursor-pointer"><Promotion /></el-icon>
    </div>
    <div class="flex gap-10">
      <el-input
        v-model="searchInput"
        @input="onBlur"
        type="password"
        placeholder="API密钥"
        show-password
        clearable
      />
      <el-button @click="checkApiKey">检查</el-button>
    </div>
    <div class="mt-10">
      <el-link :href="apiKeyWebsite" target="_blank" type="primary">点击这里获取密钥</el-link>
    </div>
  </div>
</template>

<script setup>
import { useState } from "@/utils/hooks/index";
import { useAppStore, useWebSearchStore } from "@/stores/index";
import { WEB_SEARCH_PROVIDER_CONFIG } from "@/config/webSearchProviders";
import { openWindow } from "@/utils/common";
import WebSearchService from "@/ai/webSearchService";

const { DEV: isDev } = import.meta.env;

const [searchInput, setSearchInput] = useState("");

const appStore = useAppStore();
const webSearchStore = useWebSearchStore();

const { providers, defaultProvider, getProviderConfig } = storeToRefs(webSearchStore);

const webSearchProviderConfig = computed(() => {
  return WEB_SEARCH_PROVIDER_CONFIG[defaultProvider.value];
});
const apiKeyWebsite = computed(() => {
  return webSearchProviderConfig.value?.websites?.apiKey;
});
const officialWebsite = computed(() => {
  return webSearchProviderConfig.value?.websites?.official;
});

const optionsProviders = computed(() => {
  const providers = webSearchStore.providers;

  const filteredProviders = isDev ? providers : providers.filter((t) => t.id !== "test");

  return filteredProviders.map((value) => ({
    value: value.id,
    label: value.name,
  }));
});

function onBlur() {
  webSearchStore.updateWebSearchProvider({
    id: defaultProvider.value,
    apiKey: searchInput.value,
  });
}

function toLink(url) {
  if (url) openWindow(url);
}

async function checkApiKey() {
  if (!searchInput.value) {
    appStore.showMessage({ message: "请输入API密钥", type: "warning" });
    return;
  }

  const { valid, error } = await WebSearchService.checkSearch(defaultProvider.value);

  if (valid) {
    appStore.showMessage({ message: "API密钥验证通过" });
  } else {
    appStore.showMessage({ message: error || "验证失败", type: "error" });
  }
}

onMounted(() => {
  setSearchInput(getProviderConfig.value?.apiKey || "");
});

watch(defaultProvider, () => {
  setSearchInput(getProviderConfig.value?.apiKey || "");
});
</script>
