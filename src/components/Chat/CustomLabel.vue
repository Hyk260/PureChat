<template>
  <span class="label" :class="`label--${variant}`">
    <!-- 普通身份标签：全员 / 群 / 作者 -->
    <ElTag v-if="variantText" type="info" size="small" class="ml-5">
      {{ variantText }}
    </ElTag>
  </span>
</template>

<script setup lang="ts">
import { getValueKey, isFullStaffGroup, prefix } from "@pure/utils"

import type { DB_Session } from "@pure/database/schemas"

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

  const role = getValueKey(props.item?.groupProfile?.groupCustomField || [], prefix("Role"))

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
