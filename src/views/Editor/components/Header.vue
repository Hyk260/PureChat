<template>
  <header class="message-info-view-header" v-if="Conver">
    <div class="message-info-views">
      <p v-if="Conver">
        <span v-if="Conver.type === TIM.TYPES.CONV_C2C"
          >{{
            Conver.userProfile.userID ||
            Conver.remark ||
            Conver.userProfile.nick
          }}
        </span>
        <span v-else-if="Conver.type === TIM.TYPES.CONV_GROUP"
          >{{ Conver.groupProfile.name || Conver.groupProfile.groupID }}
        </span>
        <span v-else-if="Conver.type === TIM.TYPES.CONV_SYSTEM">系统通知 </span>
      </p>
    </div>
    <!-- <div class="message-info-setup" v-show="Conver.type == 'GROUP'">
      <FontIcon iconName="MoreFilled" class="icon-hover" />
    </div> -->
    <div
      class="message-info-add"
      v-show="Conver.type == 'GROUP'"
      title="添加成员"
    >
      <svg-icon iconClass="tianjia" class="icon-hover" />
    </div>
    <!-- 群聊开关 -->
    <div
      class="group-chat-switch"
      @click="openGroup"
      v-show="!groupDrawer"
      v-if="Conver && Conver.type == 'GROUP'"
    >
      <FontIcon iconName="ArrowLeft" />
    </div>
  </header>
</template>

<script setup>
import TIM from "tim-js-sdk";
import FontIcon from "@/layout/FontIcon/indx.vue";
import { useState } from "@/utils/hooks/useMapper";
import { GET_MESSAGE_LIST } from "@/store/mutation-types";
import { useStore } from "vuex";

const { state, commit, dispatch } = useStore();
const { Conver, groupDrawer } = useState({
  groupDrawer: (state) => state.groupinfo.groupDrawer,
  Conver: (state) => state.conversation.currentConversation,
});
const openGroup = () => {
  console.log(Conver.value.type);
  commit("setgroupDrawer", true);
};
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
  position: relative;
  // .message-info-views {}
}
</style>
