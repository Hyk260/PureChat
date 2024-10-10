<template>
  <div>
    <div
      v-if="type === 'group'"
      :class="['user-avatar', 'default', className, shape]"
      :style="backgInfo(url)"
    >
      {{ url ? null : displayInfo(nickName) }}
    </div>
    <!-- <img
      draggable="false"
      v-else-if="type === 'single'"
      :class="['avatar', className]"
      :src="url || fnAvatar(convId) || shapeObj[shape]"
      alt="头像"
    /> -->
    <el-avatar
      v-else-if="type === 'single'"
      @error="errorHandler"
      :class="['avatar', className]"
      shape="square"
      :size="40"
      :src="url || fnAvatar(convId) || shapeObj[shape]"
    >
      <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png" />
    </el-avatar>
    <div
      v-else-if="type === 'self'"
      class="badge"
      :style="{ height: `${size}px`, width: `${size}px` }"
    >
      <el-avatar :size="size" :src="userProfile?.avatar || shapeObj['circle']" :shape="shape" />
      <sup v-if="isdot" class="is-dot"></sup>
    </div>
  </div>
</template>

<script setup>
import { fnAvatar } from "@/ai/utils";
import { useState } from "@/utils/hooks/useMapper";

defineOptions({
  name: "UserAvatar",
});

const props = defineProps({
  className: {
    type: String,
    default: "",
  },
  convId: {
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
  isdot: {
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
      return ["square", "circle"].includes(value);
    },
  },
});

const shapeObj = {
  circle: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
  square: "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
};

const { userProfile } = useState({
  userProfile: (state) => state.user.userProfile,
});

const errorHandler = () => true;

const displayInfo = (info) => {
  if (!info) return "unknown";
  return info.slice(0, props.words).toUpperCase();
};

const backgInfo = (url) => {
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
  width: 40px;
  height: 40px;
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
    cursor: pointer;
  }
}
</style>
