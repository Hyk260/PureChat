<template>
  <div class="group-details" v-show="groupDrawer">
    <div class="group-notice">
      <div class="group-view-header">
        <div class="group-chat-switch" @click="closeGroup">
          <FontIcon iconName="ArrowRight" />
        </div>
      </div>
    </div>
    <div class="group-box">
      <ul>
        <li
          v-for="item in currentMemberList"
          :key="item.userID"
          :class="nick == item.userID ? 'style-action' : ''"
          @click="toggle(item)"
          @dblclick="navigate(item)"
        >
          <el-avatar :size="25" :icon="UserFilled" :src="item.avatar" />
          <span class="member-list">{{ item.userID }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { UserFilled } from "@element-plus/icons-vue";
import FontIcon from "@/layout/FontIcon/indx.vue";
import { useState, useGetters } from "@/utils/hooks/useMapper";
import { useStore } from "vuex";

const nick = ref("");
const { state, commit, dispatch } = useStore();
const {
  user,
  conver,
  groupDrawer,
  showMsgBox,
  conversationList,
  currentMemberList,
} = useState({
  user: (state) => state.data.user,
  conver: (state) => state.conversation.currentConversation,
  showMsgBox: (state) => state.conversation.showMsgBox,
  groupDrawer: (state) => state.groupinfo.groupDrawer,
  currentMemberList: (state) => state.groupinfo.currentMemberList,
  conversationList: (state) => state.conversation.conversationList,
});
const closeGroup = () => {
  commit("setgroupDrawer", false);
};
const toggle = (item) => {
  const { userID } = item;
  nick.value = userID;
};
const navigate = (item) => {
  const { userID } = item;
  dispatch("checkoutConversation", { convId: `C2C${userID}` });
};
</script>

<style lang="scss" scoped>
.group-details {
  width: 220px;
  background: rgb(246, 247, 249);
  border-left: 1px solid rgb(0 0 0 / 5%);
  .group-notice {
    height: 170px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.09);
  }
  .group-view-header {
    position: relative;
    height: 59px;
    display: flex;
    align-items: center;
    .group-chat-switch {
      left: 0;
      justify-content: end;
      border-radius: 0 2px 2px 0;
    }
  }

  .group-box {
    li {
      padding: 2px 5px;
      display: flex;
      align-items: center;
      cursor: pointer;
      .member-list {
        margin-left: 5px;
        font-size: 12px;
      }
    }
    .style-action {
      background: rgb(229, 229, 229);
    }
  }
}
</style>
