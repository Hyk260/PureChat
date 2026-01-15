<template>
  <div v-if="hasReplyContent" class="think-content">
    <ElCollapse v-model="activeNames" accordion>
      <ElCollapseItem name="1">
        <template #title>
          <div class="px-5 flex items-center gap-8">
            <Atom :size="16" :color="activeNames === '1' ? '#bd54c6' : 'currentColor'" />
            <span v-if="isThinking">深度思考中...</span>
            <span v-else>
              {{ duration ? `已深度思考（用时 ${((duration || 0) / 1000).toFixed(1)} 秒）` : "已深度思考" }}
            </span>
          </div>
        </template>
        <template #icon="{ isActive }">
          <div class="header">
            <ElTooltip
              v-if="isActive"
              content="复制"
              placement="top"
              :showArrow="false"
              :offset="8"
              transition="slide-fade"
            >
              <div class="handle-button flex-c" @click.stop="onCopy(messageAbstract)">
                <Component :is="isCopied ? Check : Copy" :size="14" />
              </div>
            </ElTooltip>
            <div class="handle-button flex-c" @click.stop="toggleCollapse(!isActive)">
              <Component :is="isActive ? ChevronDown : ChevronRight" :size="14" />
            </div>
          </div>
        </template>
        <template v-if="messageAbstract">
          <div class="think-content__content">
            {{ messageAbstract }}
            <!-- <Markdown :content="messageAbstract" /> -->
          </div>
        </template>
      </ElCollapseItem>
    </ElCollapse>
  </div>
</template>

<script setup lang="ts">
import { ElCollapse, ElCollapseItem } from "element-plus"
import { Check, Copy, Atom, ChevronDown, ChevronRight } from "lucide-vue-next"
// import Markdown from "@/components/Markdown/index.vue"
import { MessageStatus, customDataThinking } from "@pure/database/schemas"

defineOptions({
  name: "Thinking",
})

interface Props {
  originalMsg: customDataThinking
  status?: MessageStatus
}

const props = withDefaults(defineProps<Props>(), {
  status: "unSend",
})

const COLLAPSE_OPEN = "1"
const COLLAPSE_CLOSE = "0"

const isCopied = ref(false)
const activeNames = ref(COLLAPSE_CLOSE)

const thinking = computed(() => props.originalMsg?.thinking)
const hasReplyContent = computed(() => !!thinking.value)
const messageAbstract = computed(() => thinking.value.content)
const duration = computed(() => thinking.value.duration)
const isThinking = computed(() => thinking.value?.reasoningType === "thinking")

const toggleCollapse = (bol?: boolean) => {
  activeNames.value = bol ? COLLAPSE_OPEN : COLLAPSE_CLOSE
}

const onCopy = (code: string) => {
  isCopied.value = true
  window.copyToClipboard(code)
  setTimeout(() => {
    isCopied.value = false
  }, 2000)
}

watch(
  () => isThinking.value,
  (val) => {
    toggleCollapse(val)
  },
  { immediate: true }
)
</script>

<style lang="scss" scoped>
:deep(.el-collapse-item__content) {
  padding-bottom: 0 !important;
}
:deep(.el-collapse-item__header) {
  border-bottom: none;
}
.el-collapse-item__wrap {
  background-color: inherit;
  border-bottom: none;
}
.el-collapse {
  border: none;
  border-radius: 5px;
  --el-collapse-header-height: 32px;
  --el-collapse-header-bg-color: inherit;
  --el-collapse-content-bg-color: inherit;
}
.think-content {
  color: #666;
  margin-bottom: 10px;
  position: relative;
  &__content {
    padding-inline: 10px;
    color: #999999;
  }
}

.header {
  display: flex;
  & > div {
    cursor: pointer;
    border-radius: 4px;
    width: 24px;
    height: 24px;
  }
}

.handle-button {
  cursor: pointer;
  &:hover {
    background: rgba(0, 0, 0, 0.03);
  }
}
</style>
