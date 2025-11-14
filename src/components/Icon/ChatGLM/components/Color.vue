<template>
  <svg
    :height="props.size"
    :style="{ flex: 'none', lineHeight: 1, ...props.style }"
    viewBox="0 0 24 24"
    :width="props.size"
    xmlns="http://www.w3.org/2000/svg"
    v-bind="$attrs"
  >
    <title>{{ TITLE }}</title>
    <path
      d="M6.897 4h-.024l-.031 2.615h.022c1.715 0 3.046 1.357 5.94 6.246l.175.297.012.02 1.62-2.438-.012-.019a48.763 48.763 0 00-1.098-1.716 28.01 28.01 0 00-1.175-1.629C10.413 4.932 8.812 4 6.896 4z"
      :fill="fill"
    />
  </svg>
</template>

<script setup lang="ts">
import { useFillId } from "@/hooks/useFillId"
import { TITLE } from "../style"

interface Props {
  size?: string | number
  style?: Record<string, any>
}

const props = withDefaults(defineProps<Props>(), {
  size: "1em",
  style: () => ({}),
})

const { id, fill } = useFillId(TITLE)
</script>
