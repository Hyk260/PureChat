<template>
  <el-avatar :size="size" :src="userProfile.avatar" :shape="shape" />
</template>

<script setup>
import { computed, toRefs } from "vue";
import { useState } from "@/utils/hooks/useMapper";
// <Portrait />
// eslint-disable-next-line no-undef
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
const { size, shape } = toRefs(props);
const { userInfo, userProfile } = useState({
  userProfile: (state) => state.user.currentUserProfile,
  userInfo: (state) => state.data.user,
});
</script>

<style lang="scss" scoped></style>
