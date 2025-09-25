<template>
  <label v-show="shouldShowCheckbox" class="message-checkbox fade-slide-fade-in">
    <input type="checkbox" class="checkbox-input" :checked="isMessageChecked" aria-label="选择消息" />
    <div class="checkbox-indicator"></div>
    <div v-show="chatStore.isFwdDataMaxed" class="disabled-mask"></div>
  </label>
</template>

<script setup lang="ts">
import { computed } from "vue"

import { useChatStore } from "@/stores/modules/chat"

import type { DB_Message } from "@/types"

defineOptions({
  name: "Checkbox",
})

interface Props {
  item: DB_Message
  isRevoked?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isRevoked: false,
})

const UNSUPPORTED_CHECKBOX_TYPES = ["TIMGroupTipElem"]

const chatStore = useChatStore()

const shouldShowCheckbox = computed(() => {
  const { item, isRevoked } = props

  if (!item || isRevoked || !chatStore.isMultiSelectMode) {
    return false
  }

  return !UNSUPPORTED_CHECKBOX_TYPES.includes(item.type)
})

const isMessageChecked = computed(() => {
  return props.item ? chatStore.isMessageSelected(props.item.ID) : false
})
</script>

<style lang="scss" scoped>
$checkbox-size: 1.3em;
$checkbox-bg-color: #ccc;
$checkbox-active-color: #22c55e;
$checkbox-border-radius: 50%;
$transition-duration: 0.15s;
$checkmark-border-width: 0.15em;
.message-checkbox {
  position: absolute;
  left: 0;
  height: 100%;
  padding: 0 10px;
  font-size: 12px;
  user-select: none;

  &:focus-within {
    outline: 2px solid var(--color-primary, #007bff);
    outline-offset: 2px;
  }
}
.disabled-mask {
  position: absolute;
  inset: 0;
}
.checkbox-indicator {
  position: relative;
  width: $checkbox-size;
  height: $checkbox-size;
  background-color: $checkbox-bg-color;
  border-radius: $checkbox-border-radius;
  cursor: pointer;
  transition: background-color $transition-duration ease;

  &::after {
    content: "";
    position: absolute;
    left: 0.45em;
    top: 0.25em;
    width: 0.25em;
    height: 0.5em;
    border: solid white;
    border-width: 0 $checkmark-border-width $checkmark-border-width 0;
    transform: rotate(45deg);
    display: none;
    transition: display $transition-duration ease;
  }
}
.checkbox-input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  cursor: pointer;

  &:checked ~ .checkbox-indicator {
    background-color: $checkbox-active-color;

    &::after {
      display: block;
    }
  }

  &:hover ~ .checkbox-indicator {
    background-color: $checkbox-bg-color;
  }

  &:checked:hover ~ .checkbox-indicator {
    background-color: $checkbox-active-color;
  }
}
</style>
