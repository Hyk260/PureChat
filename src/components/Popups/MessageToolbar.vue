<template>
  <div v-if="chatStore.isMultiSelectMode" class="message-toolbar">
    <div class="toolbar-content">
      <span class="selected-count">选中 {{ getForwardCount }} 条消息</span>
      <div class="action-buttons">
        <el-tooltip content="分享" placement="top">
          <button class="action-btn" @click="handleShare">
            <Share2 :size="16" />
          </button>
        </el-tooltip>
        
        <el-tooltip v-if="!IS_LOCAL_MODE" content="合并转发" placement="top">
          <button class="action-btn">
            <SvgIcon local-icon="mergeForward" />
          </button>
        </el-tooltip>

        <el-tooltip v-if="!IS_LOCAL_MODE" content="逐条转发" placement="top">
          <button class="action-btn">
            <SvgIcon local-icon="aQuickForward" />
          </button>
        </el-tooltip>

        <el-tooltip v-if="false" content="保存" placement="top">
          <button class="action-btn" @click="handleSave">
            <Save :size="16" />
          </button>
        </el-tooltip>

        <el-tooltip v-if="false" content="复制" placement="top">
          <button class="action-btn" @click="handleCopy">
            <Copy :size="16" />
          </button>
        </el-tooltip>

        <el-tooltip content="删除" placement="top">
          <button class="action-btn delete-btn" @click="handleDelete">
            <Trash2 :size="16" />
          </button>
        </el-tooltip>

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
import { ref } from "vue";
import { useChatStore } from "@/stores/index";
import { ElTooltip } from "element-plus";
import { Share2, Save, Copy, Trash2, X } from "lucide-vue-next";

const selectedCount = ref(0);

const chatStore = useChatStore();

const { getForwardCount } = storeToRefs(chatStore);

const handleSave = () => {};

const handleCopy = () => {};

const handleDelete = () => {};

const handleClose = () => {};

const handleShare = () => {};
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
