<template>
  <div class="code-block-view">
    <div class="code-header">
      <span class="language-tag">{{ `<${language.toUpperCase()}>` }}</span>
    </div>
    <div class="code-content">
      <pre class="code-block">
        <code :class="`language-${language}`">
          {{ code }}
        </code>
      </pre>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  code: string
  language: string
}

defineProps<Props>()
</script>

<style lang="scss" scoped>
.code-block-view {
  position: relative;
  width: 100%;
  min-width: 45ch;
  background: var(--el-bg-color);
  border: 1px solid var(--el-border-color);
  border-radius: 8px;
  overflow: hidden;

  .code-header {
    display: flex;
    align-items: center;
    color: var(--el-text-color-primary);
    font-size: 14px;
    line-height: 1;
    font-weight: bold;
    padding: 0 10px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    height: 34px;
    background-color: var(--el-bg-color-page);
    border-bottom: 1px solid var(--el-border-color);

    .language-tag {
      color: var(--el-text-color-primary);
    }
  }

  .code-content {
    .code-block {
      margin: 0;
      padding: 16px;
      background: var(--el-bg-color);
      color: var(--el-text-color-primary);
      font-family: var(--el-font-family-mono);
      font-size: 14px;
      line-height: 1.6;
      overflow-x: auto;
      white-space: pre-wrap;
      word-break: break-word;

      code {
        background: transparent;
        color: inherit;
        font-family: inherit;
        font-size: inherit;
        line-height: inherit;
      }
    }
  }
}
</style>
