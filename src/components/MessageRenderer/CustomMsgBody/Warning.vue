<template>
  <div class="flex-c">
    <ElAlert type="warning" showIcon :closable="false">
      <template #icon>
        <ElIcon :size="18">
          <TriangleAlert />
        </ElIcon>
      </template>
      <template #default>
        <span>API Key 不正确或为空，请检查 API Key 后重试</span>
        <span class="cursor-pointer ml-4 text-[#0072f5]" @click="openRobotBox"> 配置 </span>
        <span class="cursor-pointer ml-4 text-[#0072f5]" @click="jumpLink"> 文档 </span>
      </template>
    </ElAlert>
  </div>
</template>

<script setup lang="ts">
import { ElAlert } from "element-plus"
import { TriangleAlert } from "lucide-vue-next"
import { modelValue } from "@/ai/constant"
import { openWindow } from "@/utils/common"
import { WarningCustomMessageBasse } from "@/config/custom"
import emitter from "@/utils/mitt-bus"

import type { CustomPayloadType } from "@/types"

defineOptions({
  name: "Warning",
})

interface Props {
  payload: CustomPayloadType
}

const props = defineProps<Props>()

const openRobotBox = () => {
  emitter.emit("onRobotBox", { apiKeyFocus: true })
}

const jumpLink = () => {
  const url = getDoubt()
  openWindow(url)
}

const getDoubt = () => {
  try {
    const payload = JSON.parse(props.payload.data) as WarningCustomMessageBasse
    const provider = payload.data.body.text.provider
    let doubt = modelValue[provider].Token.doubt
    return doubt
  } catch (error) {
    console.error("Error parsing payload:", error)
    return ""
  }
}
</script>

<style lang="scss" scoped></style>
