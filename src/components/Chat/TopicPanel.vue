<template>
  <div class="topic-panel">
    <div v-if="false" class="layout-topic">
      <div @click="portalStore.togglePortal">
        <ElIcon v-if="showPortal"><ChevronRight /></ElIcon>
        <ElIcon v-else><ChevronLeft /></ElIcon>
      </div>
    </div>
    <div v-if="showPortal && IS_LOCAL_MODE && currentConversation" class="topic-panel-container">
      <div class="resize-container">
        <div class="role-section">
          <div class="section-header">
            <h3 class="section-title">角色设定</h3>
            <ElButton v-if="!isEditingRole" class="edit-btn" text size="small" @click="startEditRole">
              <Pencil :size="16" />
            </ElButton>
            <div v-else class="edit-actions">
              <ElButton class="cancel-btn" text size="small" @click="cancelEditRole">
                <X :size="16" />
              </ElButton>
              <ElButton class="save-btn" text size="small" @click="saveRolePrompt">
                <Check :size="16" />
              </ElButton>
            </div>
          </div>
          <div v-if="!isEditingRole" class="role-content" @click="startEditRole">
            <p v-if="rolePrompt" class="role-text">{{ rolePrompt }}</p>
            <p v-else class="role-placeholder">点击编辑角色设定...</p>
          </div>
          <ElInput
            v-else
            ref="roleInputRef"
            v-model="editingRolePrompt"
            type="textarea"
            :autosize="{ minRows: 4, maxRows: 8 }"
            class="role-input"
            placeholder="输入角色设定 prompt..."
            @blur="saveRolePrompt"
          />
        </div>
        <!-- 话题列表 -->
        <div class="topic-section">
          <div class="section-header">
            <h3 class="section-title">
              <span>话题</span>
              <span v-if="filteredTopics.length" class="ml-4">{{ filteredTopics.length }}</span>
            </h3>
            <div class="header-actions">
              <ElButton class="search-btn w-24 h-24" text size="small" @click="toggleSearch">
                <Search :size="16" />
              </ElButton>
              <Dropdown :trigger="['click']">
                <ElButton class="more-btn w-24 h-24" text size="small">
                  <MoreHorizontal :size="16" />
                </ElButton>
                <template #overlay>
                  <Menu>
                    <MenuItem danger>
                      <div class="flex-c gap-5">
                        <ElIcon><Trash /></ElIcon>
                        <span>删除全部会话</span>
                      </div>
                    </MenuItem>
                  </Menu>
                </template>
              </Dropdown>
            </div>
          </div>

          <!-- 搜索框 -->
          <div v-if="showSearch" class="search-box">
            <ElInput v-model="searchKeyword" placeholder="搜索话题..." clearable class="h-32" @input="handleSearch">
              <template #prefix>
                <Search :size="14" />
              </template>
            </ElInput>
          </div>

          <!-- 默认话题 -->
          <div v-if="defaultTopic" class="default-topic">
            <span class="topic-label">{{ defaultTopic.title }}</span>
            <span v-if="defaultTopic.isTemporary" class="temp-badge">临时</span>
          </div>

          <!-- 话题列表（按时间分组） -->
          <ElScrollbar class="topic-list-scrollbar">
            <div class="topic-list">
              <template v-for="(topics, year) in groupedTopicsByTime" :key="year">
                <div class="year-group">
                  <div class="year-title">{{ year }}</div>
                  <div
                    v-for="topic in topics"
                    :key="topic.id"
                    class="topic-item"
                    :class="{ favorite: topic.isFavorite, default: topic.isDefault || topic.isTemporary }"
                    @click="selectTopic(topic)"
                  >
                    <ElButton
                      class="favorite-btn w-24 h-24"
                      :class="{ 'is-favorite': topic.isFavorite }"
                      text
                      size="small"
                      @click.stop="toggleFavorite(topic.id)"
                    >
                      <Star :size="16" />
                    </ElButton>
                    <span class="topic-title">{{ topic.title }}</span>
                    <Dropdown :trigger="['click']" :overlayStyle="{ width: '120px' }">
                      <ElButton class="more-btn w-24 h-24" text size="small">
                        <EllipsisVertical :size="16" />
                      </ElButton>
                      <template #overlay>
                        <Menu>
                          <MenuItem>
                            <div class="flex-sc gap-5">
                              <ElIcon><Pencil /></ElIcon>
                              <span>重命名</span>
                            </div>
                          </MenuItem>
                          <MenuItem danger @click="deleteTopic(topic)">
                            <div class="flex-sc gap-5">
                              <ElIcon><Trash /></ElIcon>
                              <span>删除</span>
                            </div>
                          </MenuItem>
                        </Menu>
                      </template>
                    </Dropdown>
                  </div>
                </div>
              </template>
              <div v-if="filteredTopics.length === 0" class="empty-topic">
                <p>暂无话题</p>
              </div>
            </div>
          </ElScrollbar>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  EllipsisVertical,
  Pencil,
  Check,
  X,
  Search,
  Trash,
  MoreHorizontal,
  Star,
  ChevronLeft,
  ChevronRight,
} from "lucide-vue-next"
import { Dropdown, Menu, MenuItem } from "ant-design-vue"
import { storeToRefs } from "pinia"

import { useChatStore, usePortalStore, useTopicStore } from "@/stores"
import type { Topic } from "@/stores/modules/topic/types"

const portalStore = usePortalStore()
const chatStore = useChatStore()
const topicStore = useTopicStore()

const { showPortal } = storeToRefs(portalStore)
const { currentConversation, currentSessionId } = storeToRefs(chatStore)

const { rolePrompt, filteredTopics, groupedTopicsByTime, defaultTopic, searchKeyword } = storeToRefs(topicStore)

const isEditingRole = ref(false)
const editingRolePrompt = ref("")
const roleInputRef = ref()
const showSearch = ref(false)

watch(
  () => currentSessionId.value,
  (sessionId) => {
    if (!sessionId) return
    topicStore.initDefaultTopic(sessionId)
  },
  { immediate: true }
)

watch(
  () => rolePrompt.value,
  (val) => {
    editingRolePrompt.value = val
  },
  { immediate: true }
)

const deleteTopic = (topic: Topic) => {
  topicStore.removeTopic(topic.id)
}

const startEditRole = () => {
  isEditingRole.value = true
  editingRolePrompt.value = rolePrompt.value || ""
  nextTick(() => {
    roleInputRef.value?.focus()
  })
}

const saveRolePrompt = () => {
  topicStore.setRolePrompt(editingRolePrompt.value)
  isEditingRole.value = false
}

const cancelEditRole = () => {
  editingRolePrompt.value = rolePrompt.value || ""
  isEditingRole.value = false
}

const toggleSearch = () => {
  showSearch.value = !showSearch.value
  if (!showSearch.value) {
    topicStore.setSearchKeyword("")
  }
}

const handleSearch = () => {
  topicStore.setSearchKeyword(searchKeyword.value)
}

const toggleFavorite = (topicId: string) => {
  topicStore.toggleFavorite(topicId)
}

const selectTopic = (topic: Topic) => {
  console.log("选择话题:", topic)
}

onUnmounted(() => {})
</script>

<style lang="scss" scoped>
:deep(.el-button) {
  margin-left: 0;
}

.layout-topic {
  pointer-events: all;
  position: absolute;
  z-index: 1;
  top: 0;
  bottom: 0;
  left: -16px;
  display: flex;
  align-items: center;
  width: 16px;
  height: calc(100% - 200px);
  & > div {
    display: flex;
    align-items: center;
    width: 16px;
    height: 40px;
    border-radius: 4px 0 0 4px;
    cursor: pointer;
    color: #999999;
    background: rgba(0, 0, 0, 0.03);
    border: 1px solid var(--color-border-default);
    border-right-width: 0;
    display: none;
  }
  &:hover > div {
    display: flex !important;
  }
}

.topic-panel {
  border-left: 1px solid var(--color-border-default);
  background: var(--color-body-bg);
  position: relative;
  display: flex;
  flex-direction: column;
}

.topic-panel-container {
  flex: 0 0 auto;
  height: 100%;
  max-height: 100vh;
  width: 200px;
  min-width: 280px;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.panel-header {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 4px;
  padding: 8px 12px;
  border-bottom: 1px solid var(--color-border-default);

  .header-btn {
    padding: 4px;
  }
}

.resize-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-height: 0;
}

.role-section {
  flex: 0 0 200px;
  min-height: 100px;
  max-height: 50%;
  display: flex;
  flex-direction: column;
  padding: 12px;
  border-bottom: 1px solid var(--color-border-default);
  overflow: hidden;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;

  .section-title {
    font-size: 14px;
    font-weight: 600;
    color: var(--color-text-default);
    margin: 0;
    .header-actions {
      // height: 36px;
      .search-btn,
      .more-btn {
        height: 36px;
        width: 36px;
      }
    }
  }

  .edit-btn,
  .save-btn,
  .cancel-btn {
    padding: 4px;
    color: var(--color-text-default);
  }

  .edit-actions {
    display: flex;
    gap: 4px;
  }
}

.role-content {
  flex: 1;
  overflow-y: auto;
  cursor: pointer;
  padding: 8px;
  border-radius: 4px;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--color-message-active);
  }

  .role-text {
    font-size: 13px;
    line-height: 1.6;
    color: var(--color-text-default);
    white-space: pre-wrap;
    word-break: break-word;
    margin: 0;
  }

  .role-placeholder {
    font-size: 13px;
    color: var(--color-time-divider);
    margin: 0;
  }
}

.role-input {
  flex: 1;
  min-height: 0;

  :deep(.el-textarea__inner) {
    font-size: 13px;
    line-height: 1.6;
    resize: none;
  }
}

.resize-handle {
  height: 8px;
  background: var(--color-border-default);
  cursor: ns-resize;
  position: relative;
  flex-shrink: 0;

  &:hover {
    background: var(--color-icon-hover);
  }

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 40px;
    height: 4px;
    background: var(--color-border-default);
    border-radius: 2px;
  }
}

.topic-section {
  flex: 1;
  min-height: 100px;
  display: flex;
  flex-direction: column;
  padding: 12px;
  overflow: hidden;
}

.search-box {
  margin-bottom: 12px;
  :deep(.el-input__wrapper) {
    padding: 6px 12px;
  }
}

.default-topic {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  margin-bottom: 12px;
  background: var(--color-message-active);
  border-radius: 6px;

  .topic-label {
    font-size: 13px;
    color: var(--color-text-default);
  }

  .temp-badge {
    font-size: 11px;
    padding: 2px 6px;
    background: var(--color-tags-back);
    color: var(--color-time-divider);
    border-radius: 4px;
  }
}

.topic-list-scrollbar {
  flex: 1;
  min-height: 0;
}

.topic-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.year-group {
  display: flex;
  flex-direction: column;
  gap: 4px;

  .year-title {
    font-size: 12px;
    font-weight: 600;
    color: var(--color-time-divider);
    padding: 4px 0;
    margin-bottom: 4px;
  }
}

.topic-item {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
  &:hover {
    background-color: rgba(0, 0, 0, 0.03);
  }

  &.favorite {
    .topic-title {
      font-weight: 500;
    }
  }

  &.default {
    opacity: 0.7;
  }

  .favorite-btn {
    padding: 2px;
    color: var(--color-time-divider);
    flex-shrink: 0;

    &:hover {
      color: var(--color-icon-hover);
    }

    &.is-favorite {
      color: var(--color-icon-hover);

      :deep(svg) {
        fill: currentColor;
      }
    }

    :deep(svg) {
      transition:
        fill 0.2s,
        color 0.2s;
    }
  }

  .topic-title {
    flex: 1;
    font-size: 13px;
    color: var(--color-text-default);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

.empty-topic {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  color: var(--color-time-divider);
  font-size: 13px;
}
</style>
