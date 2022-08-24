<template>
  <el-avatar
    :size="size"
    :src="portrait"
    :shape="shape"
  />
</template>

<script setup>
import avatars from "@/assets/images/picture.jpg";
import { computed, defineProps, toRefs } from "vue";
import { useState } from "@/utils/hooks/useMapper";
// <Avatar />
const props = defineProps({
  size: {
    type: Number,
    default: 24,
  },
  shape: {
    type: String,
    default: 'circle', // 'circle' | 'square'
  }
});
const { size, shape } = toRefs(props);
const { userInfo } = useState({
  userInfo: (state) => state.data.user,
});
let portrait = ""
try {
  portrait = require(`@/assets/images/${userInfo.value.portrait}.jpg`)
} catch(e) {
  portrait = require("@/assets/images/picture.jpg")
  console.log(e)
}
</script>

<style lang="scss" scoped>

</style>