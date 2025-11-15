<template>
  <span class="label" :class="`label--${variant}`">
    <!-- 普通身份标签：全员 / 群 / 作者 -->
    <!-- <span v-if="variantText" :class="variant">{{ variantText }}</span> -->

    <ElTag v-if="variantText" type="info" size="small" class="ml-5">
      {{ variantText }}
    </ElTag>

    <!-- 机器人模型标签 -->
    <span v-if="modelInfo.visible" class="model">
      <SvgIcon :local-icon="modelInfo.icon" />
      <span>{{ modelInfo.id }}</span>
    </span>
  </span>
</template>

<script setup lang="ts">
import { getModelIcon, getValueByKey, isFullStaffGroup, prefix } from "@/ai/utils"
import { isRobot } from "@/utils/chat"
import { getBaseModelName } from "@/ai/reasoning"

import type { DB_Session } from "@/database/schemas/session"

defineOptions({ name: "CustomLabel" })

interface Props {
  userID?: string
  item?: DB_Session | null
  model?: Record<string, any> | null
}

const props = withDefaults(defineProps<Props>(), {
  userID: "",
  item: null,
  model: null,
})

/**
 * 当前标签类型：all | group | author | default
 */
const variant = computed(() => {
  if (isFullStaffGroup(props.item)) return "all"
  if (props.item?.type === "GROUP") return "group"

  const role = getValueByKey(props.item?.groupProfile?.groupCustomField, prefix("Role"))

  return role === "author" ? "author" : "default"
})

const variantText = computed(() => {
  const map: Record<string, string> = {
    all: "全员",
    group: "群",
    author: "作者",
  }
  return map[variant.value] || ""
})

/**
 * ai模型相关信息
 */
const modelInfo = computed(() => {
  const isVisible = isRobot(props.userID) && Boolean(props.model?.id)

  return {
    visible: isVisible,
    id: getBaseModelName(props.model?.id ?? ""),
    icon: props.model?.icon ? props.model?.icon : getModelIcon(props.userID || ""),
  }
})
</script>

<style lang="scss" scoped>
.label {
  display: flex;
  align-items: center;
  text-align: center;
  font-size: 10px;
  font-weight: 400;
  border-radius: 2px;

  svg {
    stroke: unset;
  }

  .model {
    margin-left: 5px;
  }

  .all,
  .group,
  .model,
  .author,
  .role-title {
    white-space: nowrap;
    background: #e6f7ff;
    border: 0.64px solid rgb(145, 213, 255);
    color: #1890ff;
    border-radius: 2px;
    font-size: 12px;
    padding: 0 5px;
    height: 18px;
    display: flex;
    align-items: center;
    gap: 4px;
  }
}
</style>
