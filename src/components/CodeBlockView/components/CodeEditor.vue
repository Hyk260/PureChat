<template>
  <div class="code-only-view">
    <div class="code-editor">
      <textarea :value="modelValue" class="html-editor" placeholder="HTML 代码..." @input="handleInput" />
    </div>
    <div class="code-toolbar">
      <el-button type="primary" @click="$emit('save')">
        {{ saved ? "已保存" : "保存" }}
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: string
  saved: boolean
}

defineProps<Props>()

const emit = defineEmits<{
  "update:modelValue": [value: string]
  change: []
  save: []
}>()

const handleInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement
  emit("update:modelValue", target.value)
  emit("change")
}
</script>

<style lang="scss" scoped>
.code-only-view {
  height: 100%;
  display: flex;
  flex-direction: column;
  background: var(--el-bg-color);

  .code-editor {
    flex: 1;
    position: relative;

    .html-editor {
      width: 100%;
      height: 100%;
      border: none;
      outline: none;
      padding: 16px;
      font-family: "Monaco", "Menlo", "Ubuntu Mono", monospace;
      font-size: 14px;
      line-height: 1.5;
      background: var(--el-bg-color);
      color: var(--el-text-color-primary);
      resize: none;
      box-sizing: border-box;
    }
  }

  .code-toolbar {
    padding: 12px 16px;
    border-top: 1px solid var(--el-border-color);
    background: var(--el-bg-color-page);
    display: flex;
    justify-content: flex-end;
  }
}
</style>
