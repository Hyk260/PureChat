<template>
  <div v-if="hasReplyContent" class="think-content">
    <!-- 思考状态内容 -->
    <div v-if="showThinkingContent">
      <!-- {{ thinkingContent }} -->
    </div>

    <!-- 深度思考内容 -->
    <div v-else-if="deeplyThoughtContent" class="flex gap-8">
      <!-- <Atom :size="16" color="#bd54c6" /> -->
      <!-- {{ deeplyThoughtContent }} -->
    </div>

    <ElCollapse v-model="activeNames">
      <ElCollapseItem name="1">
        <template #title>
          <div class="px-5 flex items-center gap-8">
            <Atom :size="16" color="#bd54c6" />
            <span>深度思考</span>
            <!-- （用时 36.1 秒） -->
          </div>
        </template>
        <template #icon="{ isActive }">
          <div class="header">
            <ElTooltip
              v-if="isActive"
              content="复制代码"
              placement="top"
              :show-arrow="false"
              :offset="8"
              transition="slide-fade"
            >
              <div class="handle-button flex-c" @click.stop="handleCopyCode(messageAbstract)">
                <Check v-if="isCopied" :size="14" />
                <Copy v-else :size="14" />
              </div>
            </ElTooltip>

            <div class="handle-button flex-c" @click.stop="setActive(!isActive)">
              <ChevronRight v-if="!isActive" :size="14" />
              <ChevronDown v-else :size="14" />
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
import { MessageStatus, MessageStatusSchema } from "@/database/schemas/message"

defineOptions({
  name: "DeepThinking",
})

const props = defineProps({
  originalMsg: {
    type: Object,
    default: () => ({}),
  },
  status: {
    type: String as PropType<MessageStatus>,
    default: "unSend",
    validator: (value: string) => MessageStatusSchema.options.includes(value as MessageStatus),
  },
})

const isCopied = ref(false)
const activeNames = ref(["0"])

const messageThink = computed(() => props.originalMsg?.deepThinking || null)
const hasReplyContent = computed(() => !!messageThink.value)
const thinkingContent = computed(() => messageThink.value.thinking)
const deeplyThoughtContent = computed(() => messageThink.value.deeplyThought)
const messageAbstract = computed(() => messageThink.value.messageAbstract)
const showThinkingContent = computed(() => thinkingContent.value && props.status === "sending")

const setActive = (bol: boolean) => {
  activeNames.value = [bol ? "1" : "0"]
}

const handleCopyCode = (code: string) => {
  isCopied.value = true
  window.copyToClipboard(code)
  setTimeout(() => {
    isCopied.value = false
  }, 2000)
}

watch(
  () => props.status,
  (newVal) => {
    if (newVal === "sending") {
      if (activeNames.value?.[0] === "1") return
      setActive(true)
    }
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
