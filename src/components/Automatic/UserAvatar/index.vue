<template>
  <div>
    <div
      v-if="type === 'group'"
      :class="['user-avatar', 'default', className, shape]"
      :style="backInfo(url)"
    >
      {{ url ? null : displayInfo(nickName) }}
    </div>
    <el-avatar
      v-else-if="type === 'single'"
      @error="() => true"
      :class="['avatar', className]"
      shape="square"
      :size="size"
      :src="url || getAiAvatarUrl(sessionId) || shapeObj[shape]"
    >
      <img :src="emptyUrl" />
    </el-avatar>
    <!-- 自己 -->
    <div
      v-else-if="type === 'self'"
      class="badge"
      :style="{ height: `${size}px`, width: `${size}px` }"
    >
      <span
        v-if="isLocal && userLocalStore?.native"
        :style="{ fontSize: `${size-8}px` }"
        class="cursor-pointer flex-c font-size-32"
      >
        {{ userLocalStore?.native }}
      </span>
      <el-avatar
        v-else-if="userProfile?.avatar"
        :size="size"
        :src="fnAvatar(userProfile.avatar)"
        :shape="shape"
      />
      <div v-else :class="['user-avatar', 'default', className, shape]" :style="backInfo(url)">
        {{ url ? null : displayInfo(userProfile.nick || userProfile.userID) }}
      </div>
      <!-- <sup v-if="isDot" class="is-dot"></sup> -->
    </div>
  </div>
</template>

<script setup>
import { getAiAvatarUrl } from "@/ai/utils";
import { circleUrl, squareUrl, emptyUrl } from "@/views/chatStudio/utils/menu";
import { useUserStore } from "@/stores/index";

defineOptions({
  name: "UserAvatar",
});

const props = defineProps({
  className: {
    type: String,
    default: "",
  },
  sessionId: {
    type: String,
    default: "",
  },
  url: {
    type: String,
    default: "",
  },
  nickName: {
    type: String,
    default: "",
  },
  words: {
    type: String || Number,
    default: "2",
  },
  size: {
    type: Number,
    default: 40,
  },
  isDot: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: "group",
    validator: (value) => {
      return ["single", "group", "self"].includes(value);
    },
  },
  shape: {
    type: String,
    default: "circle",
    validator: (value) => {
      // 圆形 方形
      return ["square", "circle"].includes(value);
    },
  },
});

const shapeObj = {
  circle: circleUrl,
  square: squareUrl,
};

const isLocal = __LOCAL_MODE__;
const userStore = useUserStore();

const { userProfile, userLocalStore } = storeToRefs(userStore);

const displayInfo = (info) => {
  if (!info) return "unknown";
  return info.slice(0, props.words).toUpperCase();
};

const fnAvatar = (url) => {
  if (isLocal) {
    return userStore.getUserAvatar;
  } else {
    return url;
  }
};

const backInfo = (url) => {
  return { backgroundImage: url ? `url(${url})` : "" };
};
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
  width: var(--el-avatar-size);
  height: var(--el-avatar-size);
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
