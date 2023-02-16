<template>
  <el-avatar
    :size="size"
    :src="userProfile.avatar || circleUrl"
    :shape="shape"
  />
</template>

<script setup>
import { computed, toRefs } from "vue";
import { useState } from "@/utils/hooks/useMapper";
// <Portrait />
const props = defineProps({
  size: {
    type: Number,
    default: 24,
  },
  shape: {
    type: String,
    default: "circle", // 'circle' | 'square'
  },
});
const circleUrl =
  "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png";
const { size, shape } = toRefs(props);
const { userInfo, userProfile } = useState({
  userProfile: (state) => state.user.currentUserProfile,
  userInfo: (state) => state.data.user,
});
</script>

<style lang="scss" scoped></style>
