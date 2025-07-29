<template>
  <!-- 消息选择工具栏容器 -->
  <div class="message-toolbar">
    <!-- 主工具栏 -->
    <div class="toolbar-content">
      <!-- 选中消息数量显示 -->
      <span class="selected-count">选中 {{ selectedCount }} 条消息</span>
      
      <!-- 操作按钮组 -->
      <div class="action-buttons">
        <!-- 归档按钮 -->
        <el-tooltip content="归档" placement="top">
          <button class="action-btn" @click="handleArchive">
            <Archive :size="16" />
          </button>
        </el-tooltip>
        
        <!-- 复制按钮 -->
        <el-tooltip content="复制" placement="top">
          <button class="action-btn" @click="handleCopy">
            <Copy :size="16" />
          </button>
        </el-tooltip>
        
        <!-- 删除按钮 -->
        <el-tooltip content="删除" placement="top">
          <button class="action-btn delete-btn" @click="handleDelete">
            <Trash2 :size="16" />
          </button>
        </el-tooltip>
        
        <!-- 关闭按钮 -->
        <el-tooltip content="关闭" placement="top">
          <button class="action-btn close-btn" @click="handleClose">
            <X :size="16" />
          </button>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElTooltip } from 'element-plus'
import { Archive, Copy, Trash2, X } from 'lucide-vue-next'

// 响应式数据
const selectedCount = ref(0) // 选中的消息数量

// 事件处理函数
const handleArchive = () => {
  console.log('归档操作')
  // 这里添加归档逻辑
}

const handleCopy = () => {
  console.log('复制操作')
  // 这里添加复制逻辑
}

const handleDelete = () => {
  console.log('删除操作')
  // 这里添加删除逻辑
}

const handleClose = () => {
  console.log('关闭工具栏')
  // 这里添加关闭逻辑
}
</script>

<style lang="scss" scoped>
.message-toolbar {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background-color: #f8f9fa;
  
  .toolbar-content {
    display: flex;
    align-items: center;
    background-color: white;
    border: 1px solid #e1e5e9;
    border-radius: 8px;
    padding: 12px 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    gap: 16px;
    
    .selected-count {
      font-size: 14px;
      color: #333;
      margin-right: 8px;
    }
    
    .action-buttons {
      display: flex;
      align-items: center;
      gap: 8px;
      
      .action-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        border: none;
        background-color: transparent;
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.2s ease;
        color: #666;
        
        &:hover {
          background-color: #f5f5f5;
          color: #333;
        }
        
        &.delete-btn {
          color: #ff4757;
          
          &:hover {
            background-color: #fff5f5;
            color: #ff3742;
          }
        }
        
        &.close-btn {
          &:hover {
            background-color: #f5f5f5;
          }
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .message-toolbar {
    padding: 16px;
    
    .toolbar-content {
      padding: 10px 12px;
      gap: 12px;
      
      .selected-count {
        font-size: 13px;
      }
      
      .action-buttons {
        gap: 6px;
        
        .action-btn {
          width: 28px;
          height: 28px;
        }
      }
    }
  }
}

:deep(.el-tooltip__trigger) {
  display: inline-flex;
}
</style>