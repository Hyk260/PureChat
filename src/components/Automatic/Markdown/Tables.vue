<template>
  <el-table :data="tableData" style="width: 100%" :fit="true">
    <el-table-column v-for="(col, idx) in columnsComputed" :key="col.prop || idx" :prop="col.prop" :label="col.label" />
  </el-table>
</template>

<script setup lang="ts">
import { computed } from "vue"

interface Column {
  prop: string
  label?: string | undefined
  width?: number | string | undefined
}

interface Props {
  data?: Array<Record<string, any>>
  columns?: Array<Column>
}

const props = withDefaults(defineProps<Props>(), { data: () => [], columns: () => [] })

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

const tableData = computed<Array<Record<string, any>>>(() => {
  return props.data && props.data.length ? (props.data as Array<Record<string, any>>) : sampleData
})

const columnsComputed = computed<Column[]>(() => {
  if (props.columns && props.columns.length) return props.columns as Column[]
  const first = tableData.value && tableData.value[0]
  if (!first) return []
  return Object.keys(first).map((k) => ({
    prop: k,
    label: String(k).charAt(0).toUpperCase() + String(k).slice(1),
    width: undefined,
  })) as Column[]
})
</script>

<style lang="scss" scoped></style>
