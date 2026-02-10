<template>
  <div ref="codeContainerRef" class="code-container" :class="{ collapsed: isCollapsed, 'shiki-scroller': !isChevrons }">
    <template v-if="!showHeader">
      <span class="hljs-language">{{ language }}</span>
      <button class="copy-code-button" title="copy" @click.stop="$emit('copy')">
        <div class="icon-copy"></div>
      </button>
    </template>
    <template v-if="highlightedCode">
      <ElScrollbar>
        <div ref="codeBlockRef" class="code-block" v-html="highlightedCode"></div>
      </ElScrollbar>
    </template>
    <div v-else ref="codeBlockRef" class="code-block code-skeleton-wrapper">
      <!-- 骨架屏占位，在代码未高亮时显示 -->
      <div class="code-skeleton">
        <div class="skeleton-line"></div>
        <div class="skeleton-line skeleton-line-short"></div>
        <div class="skeleton-line"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineEmits(["copy"])

interface Props {
  showHeader: boolean
  language: string
  highlightedCode: string
  isChevrons: boolean
  isCollapsed: boolean
}

defineProps<Props>()

const codeContainerRef = useTemplateRef("codeContainerRef")
const codeBlockRef = useTemplateRef("codeBlockRef")

defineExpose({
  codeContainerRef,
  codeBlockRef,
})
</script>

<style lang="scss" scoped>
.code-block-wrapper {
  position: relative;
  overflow: hidden;
  width: 100%;
  min-width: 200px;
  min-height: 32px;
  -webkit-transition: background-color 100ms cubic-bezier(0.215, 0.61, 0.355, 1);
  transition: background-color 100ms cubic-bezier(0.215, 0.61, 0.355, 1);
  background: rgba(0, 0, 0, 0.03);
  margin-block: calc(var(--markdown-margin-multiple) * 0.5em);
  border-radius: calc(var(--markdown-border-radius) * 1px);
  box-shadow: 0 0 0 1px var(--markdown-border-color) inset;

  .code-header {
    background: rgba(0, 0, 0, 0.015);
    position: relative;
    padding: 4px;
    display: flex;
    flex-direction: row;
    -webkit-box-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    align-items: center;
    width: 100%;
    min-height: 32px;
    height: 32px;
    // .icon-slot {
    //   display: inline-flex;
    //   align-items: center;
    //   justify-content: center;
    // }
    .header-left,
    .header-right {
      min-width: 72px;
      & > div {
        cursor: pointer;
        border-radius: 4px;
        width: 24px;
        height: 24px;
      }
    }

    .copy-button,
    .code-action-btn,
    .download-button,
    .chevrons-button,
    .maximize-button,
    .collapse-button {
      cursor: pointer;
      &:hover {
        background: rgba(0, 0, 0, 0.03);
      }
    }
  }

  .code-container {
    position: relative;
    background: transparent !important;
    // min-height: 40px;
    transition:
      height 180ms ease,
      max-height 180ms ease;
  }

  .code-block {
    max-height: 350px;
    overflow: unset;
    :deep(pre) {
      overflow: unset !important;
    }
  }

  .collapsed {
    height: 0px;
    // display: none;
  }
}

.hljs-language {
  z-index: 2;
  user-select: none;
  color: #929295;
  font-size: 12px;
  font-weight: 500;
  position: absolute;
  top: 2px;
  right: 8px;
  transition:
    color 0.4s,
    opacity 0.4s;
}

.code-block-wrapper :hover .copy-code-button {
  pointer-events: all;
  transform: translateX(0);
  opacity: 0.5;
  background-color: var(--black);
}

.copy-code-button {
  display: flex;
  align-items: center;
  position: absolute;
  right: 10px;
  top: 1em;
  cursor: pointer;
  padding: 0 5px;
  z-index: 10;
  color: var(--white);
  border: var(--color-border-in-light);
  transform: translateX(10px);
  pointer-events: none;
  opacity: 0;
  transition: all 0.3s ease;
  border-radius: 5px;
  height: 24px;
  width: 24px;
}

/* 代码块骨架屏 */
.code-skeleton-wrapper {
  min-height: 60px;
}

.code-skeleton {
  padding: 12px;
  min-height: 60px;

  .skeleton-line {
    height: 14px;
    background: linear-gradient(90deg, rgba(0, 0, 0, 0.06) 25%, rgba(0, 0, 0, 0.03) 50%, rgba(0, 0, 0, 0.06) 75%);
    background-size: 200% 100%;
    border-radius: 2px;
    margin-bottom: 8px;
    animation: skeleton-loading 1.5s ease-in-out infinite;

    &.skeleton-line-short {
      width: 60%;
    }
  }
}

@keyframes skeleton-loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

/* 优化：移除 content-visibility 以减少 CLS */
/* .code-block-container {
  contain: content;
  content-visibility: auto;
  contain-intrinsic-size: 320px 180px;
} */
</style>
