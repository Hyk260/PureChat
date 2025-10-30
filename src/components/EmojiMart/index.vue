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

const fetchCdnData = async (url: string): Promise<any> => {
  const response = await fetch(url)
  if (!response.ok) throw new Error(`HTTP ${response.status}`)
  return response.json()
}

const loadCdnData = async (sources: string[]): Promise<any> => {
  const errors: Error[] = []

  for (const url of sources) {
    try {
      const data = await fetchCdnData(url)
      const zh = await import("@/assets/emoji-mart/langs/zh.json")
      return { data, i18n: zh.default || zh }
    } catch (error) {
      errors.push(error as Error)
    }
  }

  throw new AggregateError(errors, "所有CDN源加载失败")
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
