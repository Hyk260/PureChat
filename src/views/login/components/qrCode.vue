<template>
  <div class="flex justify-center">
    <QrCode class="QrCode" />
  </div>
  <el-divider>
    <p class="m-0">{{ $t("login.tip") }}</p>
  </el-divider>
  <el-button class="w-full mt-4">
    {{ $t("login.back") }}
  </el-button>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.QrCode {
  position: absolute;
  // animation: anima_tada 1s linear;
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
