<template>
  <div v-if="hasReplyContent" class="web-search-content">
    <!-- 内容 -->
    <template v-if="messageAbstract">
      <div class="web-search-content__content">
        <DynamicContent :text="messageAbstract" />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import DynamicContent from "@/components/Chat/DynamicContent.vue"

defineOptions({
  name: "WebSearch",
})

interface Props {
  originalMsg: any
}

const props = withDefaults(defineProps<Props>(), {})

const webSearch = computed(() => props.originalMsg?.webSearch || null)
const hasReplyContent = computed(() => !!webSearch.value)
const messageAbstract = computed(() => webSearch.value.messageAbstract)
</script>

<style lang="scss" scoped>
.web-search-content {
  border-left: 3px solid #ccc;
  padding-left: 10px;
  color: #666;
  margin-bottom: 10px;
  position: relative;
}
</style>
