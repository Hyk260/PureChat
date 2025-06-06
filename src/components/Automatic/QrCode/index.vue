<template>
  <div v-if="qrCodeUrl" class="flex justify-center">
    <img :src="qrCodeUrl" alt="QR Code" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import QRCode from "qrcode";

defineOptions({ name: "QrCode" });

const props = defineProps({
  text: {
    type: String,
    default: "https://purechat.cn",
  },
});

const qrCodeUrl = ref("");
const opts = {
  errorCorrectionLevel: "H",
  width: 185,
  height: 185,
  margin: 0,
};

const generateQRCode = async () => {
  try {
    const canvas = await QRCode.toCanvas(props.text, opts);
    qrCodeUrl.value = canvas.toDataURL();
  } catch (error) {
    console.error("生成二维码失败：", error);
  }
};

onMounted(() => {
  generateQRCode();
});
</script>
