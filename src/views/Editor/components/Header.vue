<template>
  <header class="message-info-view-header">
    <div class="message-info-views">
      <p v-if="Conver">
        <!-- {{ Conver.roleName }} -->
        群聊
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
import { GET_MESSAGE_LIST } from "@/store/mutation-types";
import { useStore } from "vuex";

const { dispatch } = useStore();
const { Conver } = useState({
  Conver: (state) => state.conversation.currentConversation,
});
dispatch(GET_MESSAGE_LIST);
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
