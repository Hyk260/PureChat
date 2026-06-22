<template>
  <Teleport to="body">
    <div
      v-if="visible && cardData"
      ref="cardRef"
      :style="{ left: left, top: top }"
      class="contact-card fade-slide-lower"
    >
      <div class="contact-card__header flex-sc">
        <img draggable="false" :src="cardData.avatar || getAiAvatarUrl(cardData.from) || squareUrl" alt="头像" />
        <div v-if="isRobot(cardData.from!)" class="flex flex-col ml-16">
          <span class="contact-card__nick">
            {{ cardData.nick || userProfile?.nick || cardData.from || "-" }}
          </span>
          <ElLink
            v-if="provider"
            :href="homepage"
            target="_blank"
            underline="never"
            type="primary"
            class="!justify-start"
          >
            {{ provider }}
          </ElLink>
        </div>
        <span v-else class="contact-card__nick ml-16">
          {{ cardData.nick || userProfile?.nick || cardData.from || "-" }}
        </span>
      </div>
      <div class="contact-card__body">
        <p class="multi-truncate-2">{{ userProfile?.selfSignature || "-" }}</p>
      </div>
      <div class="contact-card__footer">
        <ElButton class="w-full" type="primary" @click="handleSendMessage">
          {{ $t("chat.sendMessage") }}
        </ElButton>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ElLink } from "element-plus"
import { onClickOutside } from "@vueuse/core"

import { getAiAvatarUrl, isRobot, getValueKey, prefix, useState } from "@pure/utils"
import { squareUrl } from "@pure/const"
import { getUserProfile } from "@/service/im-sdk-api"
import { useChatStore } from "@/stores/modules/chat"
import emitter from "@/utils/mitt-bus"

import type { DB_Message } from "@pure/database/schemas"
import type { Profile } from "@/types/tencent-cloud-chat"

defineOptions({ name: "ContactCard" })

const cardRef = ref<HTMLElement>()
const left = ref("0px")
const top = ref("0px")
const cardData = ref<DB_Message | null>(null)
const userProfile = ref<Profile | null>(null)

const [visible, setVisible] = useState(false)
const chatStore = useChatStore()

const provider = computed(() => {
  const data = userProfile.value?.profileCustomField ?? []
  return getValueKey(data, prefix("Provider"))
})

const homepage = computed(() => {
  const data = userProfile.value?.profileCustomField ?? []
  return getValueKey(data, prefix("Homepage"))
})

const close = () => {
  userProfile.value = null
  setVisible(false)
}

const handleSendMessage = () => {
  close()
  if (cardData.value?.conversationType === "C2C") return
  chatStore.addConversation({ sessionId: `C2C${cardData.value?.from}` })
}

const fetchUserProfile = async () => {
  const userId = cardData.value?.from
  if (!userId) return
  const { code, data } = await getUserProfile([userId])
  if (code === 0 && data?.[0]) {
    userProfile.value = data[0]
  }
}

const setPosition = (pageX: number, pageY: number) => {
  const CARD_WIDTH = 320
  const CARD_HEIGHT = 220
  const OFFSET = 10

  const winW = window.innerWidth
  const winH = window.innerHeight

  let cardLeft = pageX + OFFSET
  let cardTop = pageY + OFFSET

  // 右侧超出 → 翻转到鼠标左侧
  if (cardLeft + CARD_WIDTH > winW) {
    cardLeft = pageX - CARD_WIDTH - OFFSET
  }
  // 底部超出 → 翻转到鼠标上方
  if (cardTop + CARD_HEIGHT > winH) {
    cardTop = pageY - CARD_HEIGHT - OFFSET
  }
  // 边界兜底
  if (cardLeft < 0) cardLeft = OFFSET
  if (cardTop < 0) cardTop = OFFSET

  left.value = `${cardLeft}px`
  top.value = `${cardTop}px`
}

const open = (data: { status: boolean; seat: { pageX: number; pageY: number }; cardData: DB_Message }) => {
  if (data.cardData?.conversationID === "@TIM#SYSTEM") return
  setPosition(data.seat.pageX, data.seat.pageY)
  cardData.value = data.cardData
  fetchUserProfile()
  setTimeout(() => setVisible(true), 100)
}

onClickOutside(cardRef, close)

onMounted(() => {
  emitter.on("setPopoverStatus", open)
})

onBeforeUnmount(() => {
  emitter.off("setPopoverStatus", open)
})
</script>

<style lang="scss" scoped>
.contact-card {
  position: fixed;
  z-index: 99;
  width: 320px;
  height: 220px;
  padding: 24px;
  background: #fff;
  background-size: 320px;
  border: 1px solid var(--color-border-default);
  border-radius: 4px;
  box-shadow: 0 0 12px rgb(0 0 0 / 12%);

  &__header {
    height: 54px;

    img {
      width: 54px;
      min-width: 54px;
      height: 54px;
      border-radius: 5px;
    }
  }

  &__nick {
    font-family: MicrosoftYaHei;
    font-size: 18px;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.85);
  }

  &__body {
    padding: 24px 0;

    p {
      height: 38px;
      color: var(--black);
    }
  }
}
</style>
