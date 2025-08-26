<template>
  <div>
    <QrCode class="qr-code" />
  </div>
  <el-divider>
    <p>{{ $t("login.tip") }}</p>
  </el-divider>
  <el-button class="w-full" @click="onBack">
    {{ $t("login.back") }}
  </el-button>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/modules/user"

const userStore = useUserStore()

const onBack = () => {
  userStore.setCurrentPage(0)
}
</script>

<style lang="scss" scoped>
.qr-code {
  animation: anima_tada 1s linear;
}
@keyframes anima_tada {
  0% {
    -webkit-transform: scale(1);
  }
  5%,
  10% {
    -webkit-transform: scale(0.8) rotate(-5deg);
  }
  15%,
  25%,
  35%,
  45% {
    -webkit-transform: scale(1.1) rotate(3deg);
  }
  20%,
  30%,
  40% {
    -webkit-transform: scale(1.1) rotate(-3deg);
  }
  50%,
  100% {
    -webkit-transform: scale(1);
  }
}
</style>
