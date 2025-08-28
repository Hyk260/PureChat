<template>
  <div @click="onClick(payload)">
    <div v-if="payload.data">
      <h4>函数调用:</h4>
      <div class="tool-call-content">{{ getArguments(payload) }}</div>
    </div>
    <div v-if="payload.extension">
      <h4>返回结果:</h4>
      <div class="tool-call-content">{{ getToolResult(payload) }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"

import { prettyObject } from "@/ai/utils"
import { transformCustomElement } from "@/utils/chat/index"

defineOptions({
  name: "ToolCall",
})

const props = defineProps({
  payload: {
    type: Object,
    default: null,
  },
})

// 缓存解析结果
const parsedCache = ref(new Map())

function onClick(payload) {
  try {
    const result = transformCustomElement({ payload })
    console.log(result)
  } catch (error) {
    console.error("转换自定义元素失败:", error)
  }
}

function getToolResult(payload) {
  try {
    const cacheKey = `tool_result_${payload.extension}`

    if (parsedCache.value.has(cacheKey)) {
      return parsedCache.value.get(cacheKey)
    }

    const data = JSON.parse(payload.extension)
    const result = prettyObject(data)

    parsedCache.value.set(cacheKey, result)
    return result
  } catch (error) {
    console.warn("解析工具结果失败:", error)
    return "解析失败"
  }
}

function getArguments(payload) {
  try {
    const cacheKey = `tool_args_${payload.data}`

    if (parsedCache.value.has(cacheKey)) {
      return parsedCache.value.get(cacheKey)
    }

    const data = JSON.parse(payload.data)
    const toolCalls = data.data?.message?.choices?.[0]?.message?.tool_calls

    if (!toolCalls) {
      return "无效的工具调用数据"
    }

    const result = prettyObject(toolCalls)
    parsedCache.value.set(cacheKey, result)
    return result
  } catch (error) {
    console.warn("解析工具参数失败:", error)
    return "解析失败"
  }
}

// 清理缓存
const clearCache = () => {
  parsedCache.value.clear()
}

defineExpose({ clearCache })
</script>

<style lang="scss" scoped>
.tool-call-content {
  background: #f5f5f5;
  padding: 8px;
  border-radius: 4px;
  font-family: monospace;
  font-size: 12px;
  white-space: pre-wrap;
  word-break: break-all;
  max-height: 200px;
  overflow-y: auto;
}
</style>
