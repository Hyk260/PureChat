<template>
  <span class="label" :class="labelClass">
    <span v-if="isFull" class="all">全员</span>
    <span v-else-if="item?.type === 'GROUP'" class="group">群</span>
    <span v-else-if="isAuthor" class="author">作者</span>
    <span v-if="showModel" class="model">
      <svg-icon v-if="model?.icon" :local-icon="model.icon" />
      <svg-icon v-else :local-icon="modelIcon" />
      <span>{{ model?.id }}</span>
    </span>
  </span>
</template>

<script setup lang="ts">
import { computed } from "vue"

import { getModelSvg, getValueByKey, isFullStaffGroup, prefix } from "@/ai/utils"
import { isRobot } from "@/utils/chat"

import type { DB_Session } from "@/database/schemas/session"

defineOptions({
  name: "CustomLabel",
})

interface Props {
  userID?: string | undefined
  item?: DB_Session | null
  model?: Record<string, any> | null
}

const props = withDefaults(defineProps<Props>(), {
  item: null,
  model: null,
  userID: "",
})

const isFull = computed(() => isFullStaffGroup(props.item))

const isAuthor = computed(() => {
  return getValueByKey(props.item?.groupProfile?.groupCustomField, prefix("Role")) === "author"
})

const showModel = computed(() => isRobot(props.userID) && Boolean(props.model?.id))
const modelIcon = computed(() => {
  if (props.model?.icon) return props.model.icon
  return getModelSvg((props.userID || "").replace("C2C", ""))
})

const labelClass = computed(() => {
  if (isFull.value) return "label--all"
  if (isAuthor.value) return "label--author"
  if (showModel.value) return "label--model"
  return ""
})
</script>

<style lang="scss" scoped>
.label {
  text-align: center;
  border-radius: 2px;
  font-size: 10px;
  font-weight: 400;
  display: flex;
  align-items: center;

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
    flex-direction: row;
    align-items: center;
    gap: 4px;
  }
}
</style>
