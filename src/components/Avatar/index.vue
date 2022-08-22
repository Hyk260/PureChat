<template>
 <el-avatar :size="size" :src="portrait" />
</template>

<script setup>
import avatars from "@/assets/images/picture.jpg";
import { computed, defineProps, toRefs } from "vue";
import { useState } from "@/utils/hooks/useMapper";
const props = defineProps({
  size: {
    type: Number,
    default: 24,
  },
});
const { size } = toRefs(props);
const { userInfo } = useState({
  userInfo: (state) => state.data,
});
let portrait = ""
try {
  portrait = require(`@/assets/images/${userInfo.value.user.portrait}.jpg`)
} catch(e) {
  portrait = require("@/assets/images/picture.jpg")
  console.log(e)
}
</script>

<style lang="scss" scoped>

</style>