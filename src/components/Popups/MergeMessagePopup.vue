<template>
  <el-dialog
    v-model="dialogVisible"
    :title="mergValue?.payload?.title"
    width="55%"
    class="merge-message-dialog"
    align-center
    :lock-scroll="false"
    :before-close="handleClose"
  >
    <el-scrollbar>
      <div class="merge-message-container">
        <div v-for="item in messageList" :key="item.ID" class="message-item">
          <div v-if="isTime(item)" class="message-time-divider flex-c">
            {{ timeFormat(item.time * 1000, true) }}
          </div>
          <div v-else class="flex" :class="isSelf(item) ? 'item-self' : 'item-other'">
            <div class="message-avatar">
              <el-avatar
                shape="square"
                :size="36"
                :src="item.avatar || getAiAvatarUrl(item.from) || circleUrl"
                @error="() => true"
              >
                <img :src="circleUrl" />
              </el-avatar>
            </div>
            <div class="message-content" :class="getMessageItemClass(item.messageBody[0].type)">
              <p class="message-sender">
                <span>{{ item.nick }}</span>
                <!-- <span>{{ timeFormat(item.clientTime * 1000, true) }}</span> -->
              </p>
              <div :class="getMessageTypeClass(item.messageBody[0].type)">
                <component
                  :is="getMessageComponent(item.messageBody[0])"
                  :key="item.ID"
                  :message="getMergValue(item)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-scrollbar>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue"

import { getAiAvatarUrl } from "@/ai/utils"
import { getMessageComponent } from "@/components/MessageRenderer/utils/getMessageComponent"
import { useState } from "@/hooks/useState"
import { downloadMergerMessage } from "@/service/im-sdk-api/index"
import { useUserStore } from "@/stores/modules/user"
import { addTimeDivider, circleUrl, getMessageItemClass, getMessageTypeClass, isSelf, isTime } from "@/utils/chat/index"
import emitter from "@/utils/mitt-bus"
import { timeFormat } from "@/utils/timeFormat"

const mergValue = ref({})
const userStore = useUserStore()
const [dialogVisible, setDialogVisible] = useState(false)

const messageList = computed(() => {
  return addTimeDivider(mergValue.value.payload.messageList)
})

const getMergValue = (item) => {
  return {
    ...item?.messageBody?.[0],
    conversationType: mergValue.value?.conversationType,
    flow: userStore.userProfile.userID === item.from ? "out" : "in",
  }
}

function handleClose(done) {
  setDialogVisible(false)
  done()
}

onMounted(() => {
  emitter.on("openMergePopup", (data) => {
    downloadMergerMessage(data)
    mergValue.value = data
    setDialogVisible(true)
  })
})

onUnmounted(() => {
  emitter.off("openMergePopup")
})
</script>

<style lang="scss" scoped>
.merge-message-dialog {
  min-width: 500px;
}

.merge-message-container {
  height: 550px;
  padding: 0 10px;

  & > div {
    padding: 10px 0;
  }

  .item-self {
    flex-direction: row-reverse;

    .message-sender {
      flex-direction: row-reverse !important;
    }

    .message-avatar {
      padding: 0 0 0 12px;
    }

    .message-content {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }
  }
}

.message-item {
  padding: 10px 0;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.message-time-divider {
  text-align: center;
  font-weight: 400;
  font-size: 12px;
  color: var(--color-time-divider);
  width: 100%;
  display: flex;
  justify-content: center;
}

.message-avatar {
  padding: 0 12px 0 0;
}

.message-content {
  .message-sender {
    display: flex;
    gap: 0 5px;
    font-size: 12px;
    color: var(--color-time-divider);
    margin-bottom: 5px;
  }
  div {
    pointer-events: none;
  }
}

.message-view-item-index {
  width: 80%;
}
</style>
