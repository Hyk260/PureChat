<template>
  <div class="citation-tooltip">
    <div class="flex-c h-36">
      <span class="font-bold">{{ hostname }}</span>
    </div>
    <div v-if="faviconUrl || isLoading" class="tooltip-header">
      <div v-if="faviconUrl" class="favicon-container">
        <img :src="faviconUrl" alt="favicon" class="favicon" @error="handleFaviconError" />
      </div>
      <div v-else-if="isLoading" class="favicon-placeholder">
        <div class="loading-spinner"></div>
      </div>
      <div class="url-info">
        <div v-if="title" class="url-title">{{ title }}</div>
        <div class="url-hostname">{{ hostname }}</div>
      </div>
    </div>
    <div class="tooltip-header-simple">
      <div class="url-hostname">{{ url }}</div>
    </div>
    <div v-if="description" class="tooltip-description" :title="description">{{ description }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue"
import { getFaviconUrl } from "@/utils/favicon"

interface Props {
  url?: string
  title?: string
  description?: string
}

const props = withDefaults(defineProps<Props>(), {
  url: "",
  title: "",
  description: "",
})

const faviconUrl = ref<string | null>(null)
const isLoading = ref(false)
const faviconError = ref(false)

const hostname = computed(() => {
  if (!props.url) return ""
  try {
    const urlObj = new URL(props.url)
    return urlObj.hostname
  } catch {
    return props.url
  }
})

const loadFavicon = async () => {
  if (!props.url || faviconError.value) return

  isLoading.value = true
  try {
    const url = await getFaviconUrl(props.url)
    if (url) {
      faviconUrl.value = url
    }
  } catch (error) {
    console.error("Failed to load favicon:", error)
  } finally {
    isLoading.value = false
  }
}

const handleFaviconError = () => {
  faviconError.value = true
  faviconUrl.value = null
}

watch(
  () => props.url,
  () => {
    faviconError.value = false
    faviconUrl.value = null
    if (props.url) {
      loadFavicon()
    }
  },
  { immediate: true }
)

onMounted(() => {
  if (props.url) {
    loadFavicon()
  }
})
</script>

<style lang="scss" scoped>
.citation-tooltip {
  max-width: 320px;
  font-size: 14px;
}

.tooltip-header {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 8px;
}

.tooltip-header-simple {
  margin-bottom: 4px;
}

.favicon-container {
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.favicon {
  width: 20px;
  height: 20px;
  border-radius: 4px;
  object-fit: contain;
}

.favicon-placeholder {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loading-spinner {
  width: 14px;
  height: 14px;
  border: 2px solid var(--el-border-color-light);
  border-top-color: var(--el-color-primary);
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.url-info {
  flex: 1;
  min-width: 0;
}

.url-title {
  font-weight: 500;
  color: var(--el-text-color-primary);
  margin-bottom: 4px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.url-hostname {
  font-size: 12px;
  color: var(--el-text-color-secondary);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.tooltip-description {
  margin-top: 8px;
  padding-top: 8px;
  border-top: 1px solid var(--el-border-color-lighter);
  font-size: 12px;
  color: var(--el-text-color-regular);
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
