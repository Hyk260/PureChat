<template>
  <div>
    <QrCode class="qr-code" />
  </div>
  <ElDivider>
    <p>{{ $t("login.tip") }}</p>
  </ElDivider>
  <ElButton class="w-full" @click="onBack">
    {{ $t("login.back") }}
  </ElButton>
</template>

<script setup lang="ts">
import QrCode from "@/components/QrCode/index.vue"
import { useUserStore } from "@/stores/modules/user"

defineOptions({ name: "LoginQrCode" })

const userStore = useUserStore()

const onBack = () => {
  userStore.setCurrentPage(0)
}
</script>

<style lang="scss" scoped></style>
