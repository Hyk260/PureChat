<template>
  <ElTable :data="tableData" class="w-full" :fit="true">
    <ElTableColumn
      v-for="(item, idx) in columnsComputed"
      :key="item.prop || idx"
      :prop="item.prop"
      :label="item.label"
    />
  </ElTable>
</template>

<script setup lang="ts">
import { ElTable, ElTableColumn } from "element-plus"

interface Column {
  prop: string
  label?: string | undefined
  width?: number | string | undefined
}

interface Props {
  data?: Array<Record<string, any>>
  columns?: Array<Column>
}

const props = withDefaults(defineProps<Props>(), {
  data: () => [],
  columns: () => [],
})

const sampleData = [
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-02",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
]

const tableData = computed(() => {
  return props.data && props.data.length ? props.data : sampleData
})

const columnsComputed = computed(() => {
  if (props.columns && props.columns.length) return props.columns
  const first = tableData.value && tableData.value[0]
  if (!first) return []
  return Object.keys(first).map((key) => ({
    prop: key,
    label: String(key).charAt(0).toUpperCase() + String(key).slice(1),
    width: undefined,
  }))
})
</script>

<style lang="scss" scoped></style>
