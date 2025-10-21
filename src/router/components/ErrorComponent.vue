<template>
  <div class="error-component">
    <div class="error-content">
      <el-icon class="error-icon" :size="64">
        <WarningFilled />
      </el-icon>
      <h3 class="error-title">组件加载失败</h3>
      <p class="error-message">{{ errorMessage }}</p>
      <div class="error-actions">
        <el-button type="primary" @click="handleRetry">
          <el-icon><Refresh /></el-icon>
          重新加载
        </el-button>
        <el-button @click="handleGoBack">
          <el-icon><Back /></el-icon>
          返回上一页
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue"
import { useRouter } from "vue-router"
import { ElIcon, ElButton } from "element-plus"
import { WarningFilled, Refresh, Back } from "@element-plus/icons-vue"

interface Props {
  error?: Error
}

const props = defineProps<Props>()
const router = useRouter()

const errorMessage = computed(() => {
  if (props.error?.message) {
    return props.error.message
  }
  return "页面加载失败，请检查网络连接或稍后重试"
})

const handleRetry = () => {
  window.location.reload()
}

const handleGoBack = () => {
  if (window.history.length > 1) {
    router.go(-1)
  } else {
    router.push("/")
  }
}
</script>

<style scoped>
.error-component {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 20px;
}

.error-content {
  text-align: center;
  max-width: 400px;
}

.error-icon {
  color: #f56c6c;
  margin-bottom: 16px;
}

.error-title {
  margin: 0 0 12px 0;
  color: #303133;
  font-size: 20px;
  font-weight: 500;
}

.error-message {
  margin: 0 0 24px 0;
  color: #606266;
  font-size: 14px;
  line-height: 1.5;
}

.error-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
}
</style>
