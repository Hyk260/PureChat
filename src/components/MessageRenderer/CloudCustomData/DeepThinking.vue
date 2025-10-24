<template>
  <div v-if="hasReplyContent" class="think-content">
    <!-- 思考状态内容 -->
    <div v-if="showThinkingContent">
      {{ thinkingContent }}
    </div>

    <!-- 深度思考内容 -->
    <div v-else-if="deeplyThoughtContent" class="flex gap-8">
      <Atom :size="16" color="#bd54c6" />
      {{ deeplyThoughtContent }}
    </div>

    <!-- 内容 -->
    <template v-if="messageAbstract">
      <div class="think-content__content">
        <DynamicContent :text="messageAbstract" />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { Atom } from "lucide-vue-next"

import DynamicContent from "@/components/Chat/DynamicContent.vue"
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

const messageThink = computed(() => props.originalMsg?.deepThinking || null)
const hasReplyContent = computed(() => !!messageThink.value)
const thinkingContent = computed(() => messageThink.value.thinking)
const deeplyThoughtContent = computed(() => messageThink.value.deeplyThought)
const messageAbstract = computed(() => messageThink.value.messageAbstract)
const showThinkingContent = computed(() => thinkingContent.value && props.status === "sending")
</script>

<style lang="scss" scoped>
.think-content {
  border-left: 3px solid #ccc;
  padding-left: 10px;
  color: #666;
  margin-bottom: 10px;
  position: relative;
}
</style>
