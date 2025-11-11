<template>
  <div ref="emojiMartRef" v-click-outside="onClickOutside">
    <div v-if="isLoading" class="loading-container">
      <span class="loading-icon el-icon-loading" />
      <span>加载中...</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from "vue"
import { ClickOutside as vClickOutside } from "element-plus"
import { Picker } from "emoji-mart"
import { delay } from "@/utils/common"

type EmojiDataSource = "local" | "cdn" | string | string[]
type EmojiSelectEvent = { native: string }

interface Props {
  dataSource?: EmojiDataSource
  theme?: "light" | "dark" | "auto"
}

interface EmitEvents {
  (e: "onClose"): void
  (e: "emoji-selected", emoji: EmojiSelectEvent): void
}

const DEFAULT_CDN_SOURCES = [
  "https://cdn.jsdelivr.net/npm/@emoji-mart/data", // jsDelivr
  "https://unpkg.com/@emoji-mart/data", // UNPKG
  "https://cdn.bootcdn.net/ajax/libs/emoji-mart/data", // BootCDN
]

const EMOJI_DATA_CACHE_KEY = "emoji_mart_data_cache"
const EMOJI_I18N_CACHE_KEY = "emoji_mart_i18n_cache"

const PICKER_OPTIONS = {
  noCountryFlags: true,
  skinTonePosition: "none" as const,
  previewPosition: "none" as const,
  locale: "zh" as const,
}

const props = withDefaults(defineProps<Props>(), {
  dataSource: "cdn", // "local"
  theme: "light",
})

const emit = defineEmits<EmitEvents>()

const isLoading = ref(true)
const emojiMartRef = useTemplateRef("emojiMartRef")
const currentPicker = ref<Picker | null>()

const handleEmojiSelect = (emoji: EmojiSelectEvent) => {
  emit("emoji-selected", emoji)
}

const onClickOutside = () => {
  emit("onClose")
}

const loadLocalData = async () => {
  // const [data, zh] = await Promise.all([
  //   import("@/assets/emoji-mart/data/native.json"),
  //   import("@/assets/emoji-mart/langs/zh.json"),
  // ])
  // return { data: data.default || data, i18n: zh.default || zh }
  return { data: "", i18n: "" }
}

/**
 * 从 localStorage 获取缓存的 emoji 数据
 */
const getCachedEmojiData = (): { data: any; i18n: any } | null => {
  try {
    const cachedData = localStorage.getItem(EMOJI_DATA_CACHE_KEY)
    const cachedI18n = localStorage.getItem(EMOJI_I18N_CACHE_KEY)

    if (cachedData && cachedI18n) {
      return {
        data: JSON.parse(cachedData),
        i18n: JSON.parse(cachedI18n),
      }
    }
  } catch (error) {
    console.warn("读取 emoji 缓存失败:", error)
    // 清除可能损坏的缓存
    localStorage.removeItem(EMOJI_DATA_CACHE_KEY)
    localStorage.removeItem(EMOJI_I18N_CACHE_KEY)
  }
  return null
}

/**
 * 将 emoji 数据保存到 localStorage
 */
const setCachedEmojiData = (data: any, i18n: any): void => {
  try {
    localStorage.setItem(EMOJI_DATA_CACHE_KEY, JSON.stringify(data))
    localStorage.setItem(EMOJI_I18N_CACHE_KEY, JSON.stringify(i18n))
  } catch (error) {
    console.warn("保存 emoji 缓存失败:", error)
    // 如果存储空间不足，尝试清除旧缓存
    try {
      localStorage.removeItem(EMOJI_DATA_CACHE_KEY)
      localStorage.removeItem(EMOJI_I18N_CACHE_KEY)
      localStorage.setItem(EMOJI_DATA_CACHE_KEY, JSON.stringify(data))
      localStorage.setItem(EMOJI_I18N_CACHE_KEY, JSON.stringify(i18n))
    } catch (retryError) {
      console.error("重试保存 emoji 缓存失败:", retryError)
    }
  }
}

/**
 * 从单个 CDN 源获取数据
 */
const fetchCdnData = async (url: string): Promise<any> => {
  const response = await fetch(url)
  if (!response.ok) throw new Error(`HTTP ${response.status}`)
  return response.json()
}

/**
 * 并行从多个 CDN 源加载数据，使用最先成功的响应
 * 支持缓存机制，优先使用 localStorage 中的缓存
 */
const loadCdnData = async (sources: string[]): Promise<any> => {
  // 优先检查缓存
  const cachedData = getCachedEmojiData()
  if (cachedData) {
    return cachedData
  }

  // 加载 i18n 数据（本地资源）
  const zh = await import("@/assets/emoji-mart/langs/zh.json")
  const i18n = zh.default || zh

  // 创建一个 Promise，它会在第一个成功的请求完成时 resolve
  // 如果所有请求都失败，则 reject
  return new Promise((resolve, reject) => {
    let completedCount = 0
    const errors: Array<{ url: string; error: any }> = []
    let hasResolved = false

    // 为每个 CDN 源创建一个请求
    sources.forEach((url) => {
      fetchCdnData(url)
        .then((data) => {
          // 如果还没有成功的结果，使用这个数据
          if (!hasResolved) {
            hasResolved = true
            // 保存到缓存
            setCachedEmojiData(data, i18n)
            resolve({ data, i18n })
          }
        })
        .catch((error) => {
          // 收集错误信息
          errors.push({ url, error })
          completedCount++

          // 如果所有请求都完成了且没有成功的，则 reject
          if (completedCount === sources.length && !hasResolved) {
            const errorMessages = errors.map(
              ({ url, error }) => new Error(`CDN源 ${url} 加载失败: ${error?.message || error || "未知错误"}`)
            )
            reject(new AggregateError(errorMessages, "所有CDN源加载失败"))
          }
        })
    })
  })
}

const loadEmojiData = async (): Promise<{ data: any; i18n: any }> => {
  const { dataSource } = props

  if (dataSource === "local") {
    return loadLocalData()
  } else if (dataSource === "cdn") {
    return loadCdnData(DEFAULT_CDN_SOURCES)
  }

  const sources = Array.isArray(dataSource) ? dataSource : [dataSource]
  const validSources = sources.length > 0 ? sources : DEFAULT_CDN_SOURCES

  return loadCdnData(validSources)
}

const cleanupPicker = () => {
  if (currentPicker.value) {
    // currentPicker.value?.destroy?.()
    currentPicker.value = null
  }

  if (emojiMartRef.value) {
    emojiMartRef.value.innerHTML = ""
  }
}

const initPicker = async () => {
  try {
    isLoading.value = true

    const { data, i18n } = await loadEmojiData()

    await nextTick()
    // await delay(1000)
    if (!emojiMartRef.value) return

    const picker = new Picker({
      ...PICKER_OPTIONS,
      data,
      theme: props.theme,
      onEmojiSelect: handleEmojiSelect,
      i18n,
    }) as Picker
    cleanupPicker()
    emojiMartRef.value.appendChild(picker as unknown as Node)
    currentPicker.value = picker
  } catch (error) {
    console.error("Emoji picker initialization failed:", error)
    throw error
  } finally {
    isLoading.value = false
  }
}

onMounted(initPicker)

watch(
  () => [props.dataSource, props.theme],
  () => initPicker(),
  { deep: true }
)
</script>

<style scoped lang="scss">
.loading-container {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  width: 352px;
  background: aliceblue;
  height: 350px;
  border-radius: 5px;

  .loading-icon {
    font-size: 24px;
    color: var(--el-color-primary);
    animation: rotating 2s linear infinite;
  }
}

@keyframes rotating {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
