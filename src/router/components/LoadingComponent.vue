<template>
  <div class="loading-component">
    <div class="loading-content">
      <el-icon class="loading-icon" :size="48">
        <div class="iconify-icon svg-spinners"></div>
      </el-icon>
      <p class="loading-text">{{ loadingText }}</p>
      <div class="loading-progress">
        <el-progress :percentage="progress" :show-text="false" :stroke-width="4" color="#409eff" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue"
import { ElIcon, ElProgress } from "element-plus"

interface Props {
  loadingText?: string
}

const { loadingText } = withDefaults(defineProps<Props>(), {
  loadingText: "正在加载组件...",
})

const progress = ref(0)
let progressTimer: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  progressTimer = setInterval(() => {
    if (progress.value < 90) {
      progress.value += Math.random() * 10
    }
  }, 200)
})

onUnmounted(() => {
  if (progressTimer) {
    clearInterval(progressTimer)
  }
})
</script>

<style scoped>
.loading-component {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  height: 100%;
  padding: 20px;
}

.loading-content {
  text-align: center;
  max-width: 300px;
}

.loading-icon {
  color: #409eff;
  margin-bottom: 16px;
  animation: rotate 2s linear infinite;
}

.loading-text {
  margin: 0 0 16px 0;
  color: #606266;
  font-size: 14px;
}

.loading-progress {
  width: 200px;
  margin: 0 auto;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
