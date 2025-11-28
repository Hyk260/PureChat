<template>
  <div class="avatar-container">
    <div v-if="type === 'group'" class="user-avatar default" :class="[className, shape]" :style="backInfo(url)">
      {{ url ? null : displayInfo(nickName) }}
    </div>
    <!-- <img
      v-else-if="type === 'single'"
      v-lazy="url || getAiAvatarUrl(sessionId) || shapeObj[shape]"
      class="lazy avatar"
      :size="size"
      :src="url || getAiAvatarUrl(sessionId) || shapeObj[shape]"
      alt=""
    /> -->
    <ElAvatar
      v-else-if="type === 'single'"
      class="avatar"
      :class="[className]"
      shape="square"
      :size="size"
      :src="url || getAiAvatarUrl(sessionId) || shapeObj[shape]"
      @error="() => true"
    >
      <img :src="emptyUrl" loading="lazy" />
    </ElAvatar>
    <!-- 自己 -->
    <div v-else-if="type === 'self'" class="badge" :style="{ height: `${size}px`, width: `${size}px` }">
      <span
        v-if="IS_LOCAL_MODE && userLocalStore?.native"
        :style="{ fontSize: `${size - 8}px` }"
        class="cursor-pointer flex-c font-size-32"
      >
        {{ userLocalStore?.native }}
      </span>
      <ElAvatar v-else-if="userProfile?.avatar" :size="size" :src="fnAvatar(userProfile.avatar)" :shape="shape" />
      <div v-else class="user-avatar default" :class="[className, shape]" :style="backInfo(url)">
        {{ url ? null : displayInfo(userProfile?.nick || userProfile?.userID || "") }}
      </div>
      <!-- <sup v-if="isDot" class="is-dot"></sup> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { getAiAvatarUrl } from "@/ai/getAiAvatarUrl"
import { useUserStore } from "@/stores/modules/user"
import { circleUrl, emptyUrl, squareUrl } from "@/utils/chat"

defineOptions({
  name: "UserAvatar",
})

interface Props {
  className?: string
  sessionId?: string
  url?: string
  nickName?: string
  words?: string | number
  size?: number
  isDot?: boolean
  type?: "group" | "single" | "self"
  shape?: "circle" | "square"
}

const props = withDefaults(defineProps<Props>(), {
  className: "",
  sessionId: "",
  url: "",
  nickName: "",
  words: "2",
  size: 40,
  isDot: false,
  type: "group",
  shape: "circle",
})

const shapeObj = {
  circle: circleUrl,
  square: squareUrl,
}

const userStore = useUserStore()

const { userProfile, userLocalStore } = storeToRefs(userStore)

const displayInfo = (info: string) => {
  if (!info) return "unknown"
  return info.slice(0, Number(props.words)).toUpperCase()
}

const fnAvatar = (url: string) => {
  if (__LOCAL_MODE__) {
    return userStore.getUserAvatar
  } else {
    return url
  }
}

const backInfo = (url: string) => {
  return { backgroundImage: url ? `url(${url})` : "" }
}
</script>

<style lang="scss" scoped>
.user-avatar {
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  background-position: 0 0;
  background-repeat: no-repeat;
  text-align: center;
  font-size: 12px;
  background-color: #5cadff;
  color: #ffffff;
  font-weight: 400;
}
.avatar {
  --el-text-color-disabled: #ffffff00;
  width: var(--el-avatar-size, 40px);
  height: var(--el-avatar-size, 40px);
  border-radius: 3px;
}
.default {
  width: 40px;
  height: 40px;
  background-size: 40px 40px;
  line-height: 40px;
}
.mention-avatar {
  width: 18px;
  height: 18px;
  background-size: 18px 18px;
  line-height: 18px;
  vertical-align: bottom;
}
.square {
  border-radius: 3px;
}
.badge {
  -webkit-user-drag: none;
  user-select: none;
  position: relative;
  .is-dot {
    position: absolute;
    height: 8px;
    width: 8px;
    right: -4px;
    top: 36px;
    border-radius: 50%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    white-space: nowrap;
    border: 1px solid var(--el-bg-color);
    background-color: #31da84;
  }
  .el-avatar {
    background: rgb(255 255 255 / 0%);
    cursor: pointer;
  }
}
</style>
