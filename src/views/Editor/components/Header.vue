<template>
  <header class="message-info-view-header">
    <div class="message-info-views">
      <p v-if="Conver">
        {{ Conver.roleName }}
      </p>
    </div>
    <div class="message-info-setup">
      <FontIcon iconName="MoreFilled" />
    </div>
  </header>
</template>

<script setup>
import FontIcon from "@/layout/FontIcon/indx.vue";
import { useState } from "@/utils/hooks/useMapper";

const { Conver } = useState({
  Conver: (state) => state.conversation.currentConversation,
});
</script>

<style lang="scss" scoped>
.message-info-view-header {
  height: 60px;
  background: #fff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.09);
  padding: 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  // .message-info-views {}
}
</style>
