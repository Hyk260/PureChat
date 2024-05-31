<template>
  <div v-if="qrCodeUrl" class="qrCode flex justify-center">
    <img :src="qrCodeUrl" alt="QR Code" />
  </div>
</template>

<script>
import QRCode from "qrcode";

export default {
  data() {
    return {
      text: "https://pureadmin.cn",
      qrCodeUrl: "",
      opts: {
        errorCorrectionLevel: "H",
        width: 185,
        height: 185,
        margin: 0,
      },
    };
  },
  mounted() {
    this.generateQRCode();
  },
  methods: {
    async generateQRCode() {
      try {
        const canvas = await QRCode.toCanvas(this.text, this.opts);
        this.qrCodeUrl = canvas.toDataURL();
      } catch (error) {
        console.error("生成二维码失败：", error);
      }
    },
  },
};
</script>
<style scoped></style>
