<template>
  <div class="group-details">
    <!-- v-show="groupDrawer" -->
    <!-- <div class="group-notice">
      <div class="group-view-header">
        <div class="group-chat-switch" @click="closeGroup">
          <FontIcon iconName="ArrowRight" />
        </div>
        <div class="notice-title" @click="onclick">群公告</div>
      </div>
      <div class="group-view-content" v-if="groupProfile">
        <el-scrollbar>
          <p v-for="item in 10" :key="item">
            {{ groupProfile.notification }}
          </p>
        </el-scrollbar>
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
          <span class="member-list">{{ item.nick }}</span>
          <span class="owner" v-if="groupProfile.ownerID == item.userID">
            群主
          </span>
          <span class="admin" v-if="userProfile.userID == item.userID && false">
            自己
          </span>
        </li>
      </ul>
    </div> -->
    <div class="group-base-info">
      <div class="avatar default">
        {{ displayInfo(groupProfile.groupID) }}
      </div>
      <div class="group-base-info--text">
        <div>
          <span class="group-base-info--text__name">
            {{ groupProfile.name }}
          </span>
          <span class="edit-icon"></span>
        </div>
        <span class="group-base-info--text__type">
          {{ groupProfile.type }}
        </span>
      </div>
    </div>
    <div class="divider"></div>
    <div class="group-member">
      <div class="group-member--title">
        <span> 群成员 </span>
        <span class="group-member--title__right">
          <span>{{ currentMemberList.length }}人 </span>
          <span><a>查看</a></span>
        </span>
      </div>
      <div class="group-member--avatar">
        <div
          class="avatar default"
          v-for="item in currentMemberList"
          :key="item.userID"
          @click="navigate(item)"
          :style="`background-image: url(${item.avatar})`"
        >
          {{ item.avatar ? "" : displayInfo(item.nick) }}
        </div>
        <span class="group-member--add"> </span>
      </div>
    </div>
    <div class="divider"></div>
    <div class="group-flag-message">
      <div class="group-flag-message--title">
        <span class="group-flag-message--title__text"> 消息免打扰 </span>
        <el-switch v-model="value" />
      </div>
    </div>
    <div class="divider"></div>
    <div class="group-operator">
      <el-button type="danger" @click="handleQuitGroup"> 退出群组 </el-button>
      <div class="group-operator--divider"></div>
      <el-button type="primary" plain @click="transferGroup">
        转让群组
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { UserFilled } from "@element-plus/icons-vue";
import FontIcon from "@/layout/FontIcon/indx.vue";
import { useState, useGetters } from "@/utils/hooks/useMapper";
import { useStore } from "vuex";
import { updateGroupProfile } from "@/api/im-sdk-api";
const nick = ref("");
const { state, commit, dispatch } = useStore();
const {
  user,
  conver,
  userProfile,
  groupDrawer,
  showMsgBox,
  groupProfile,
  conversationList,
  currentMemberList,
} = useState({
  user: (state) => state.data.user,
  userProfile: (state) => state.user.currentUserProfile,
  conver: (state) => state.conversation.currentConversation,
  showMsgBox: (state) => state.conversation.showMsgBox,
  groupDrawer: (state) => state.groupinfo.groupDrawer,
  groupProfile: (state) => state.groupinfo.groupProfile,
  currentMemberList: (state) => state.groupinfo.currentMemberList,
  conversationList: (state) => state.conversation.conversationList,
});
const { isOwner } = useGetters(["isOwner"]);
const value = ref(true);
const closeGroup = () => {
  // commit("setgroupDrawer", false);
};
const toggle = (item) => {
  const { userID } = item;
  nick.value = userID;
};
const onclick = () => {
  const { groupID } = groupProfile.value;
  // updateGroupProfile({
  //   convId: groupID,
  //   modify: "notification",
  //   text: "公告12",
  // });
};
const navigate = (item) => {
  dispatch("CHEC_OUT_CONVERSATION", { convId: `C2C${item.userID}` });
};
const transferGroup = () => {};
const handleQuitGroup = () => {};
const displayInfo = (info) => {
  if (!info) {
    return "unknown";
  }
  return info.slice(0, 2).toUpperCase();
};
</script>

<style lang="scss" scoped>
// .group-details {
//   width: 220px;
//   background: rgb(246, 247, 249);
//   border-left: 1px solid rgb(0 0 0 / 5%);
//   position: relative;
//   .group-notice {
//     height: 170px;
//     border-bottom: 1px solid rgba(0, 0, 0, 0.09);
//     .group-view-content {
//       position: absolute;
//       width: 100%;
//       top: 42px;
//       height: calc(170px - 42px);
//     }
//   }
//   .group-view-header {
//     position: absolute;
//     width: 100%;
//     height: 59px;
//     display: flex;
//     align-items: center;
//     .group-chat-switch {
//       left: 0;
//       justify-content: end;
//       border-radius: 0 2px 2px 0;
//     }
//     .notice-title {
//       position: absolute;
//       left: 18px;
//       font-size: 12px;
//       top: 18px;
//     }
//   }

//   .group-box {
//     li {
//       padding: 2px 5px;
//       display: flex;
//       align-items: center;
//       cursor: pointer;
//       .member-list {
//         margin-left: 5px;
//         font-size: 12px;
//       }
//       .owner,
//       .admin {
//         font-size: 12px;
//       }
//     }
//     .style-action {
//       background: rgb(229, 229, 229);
//     }
//   }
// }
.avatar {
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  background-position: 0 0;
  background-repeat: no-repeat;
  text-align: center;
  font-size: 12px;
  background-color: #5cadff;
  color: #ffffff;
  font-weight: 400;
}
.default {
  width: 40px;
  height: 40px;
  background-size: 40px 40px;
  line-height: 40px;
}
.group-base-info {
  padding-bottom: 20px;
  display: flex;
  align-items: center;
  .group-base-info--text {
    display: flex;
    flex-direction: column;
    margin-left: 8px;
    .group-base-info--text__name {
      font-size: 14px;
      font-weight: 400;
      color: #000000;
      margin-right: 8px;
    }
    .group-base-info--text__type {
      font-size: 12px;
      font-weight: 400;
      color: #999999;
    }
  }
}
.group-member {
  padding: 12px 0;
  .group-member--title {
    font-size: 14px;
    font-weight: 400;
    color: #333333;
    margin-bottom: 8px;
    display: flex;
    justify-content: space-between;
    .group-member--title__right {
      font-size: 12px;
      font-weight: 400;
      color: #999999;
      span a {
        background-color: transparent;
        text-decoration: none;
        color: #006eff;
        cursor: pointer;
      }
    }
  }
  .group-member--avatar {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    div {
      margin-right: 12px;
      margin-bottom: 12px;
    }

    .group-member--add {
      width: 38px;
      height: 38px;
      margin-right: 12px;
      margin-bottom: 12px;
      background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMzhweCIgaGVpZ2h0PSIzOHB4IiB2aWV3Qm94PSIwIDAgMzggMzgiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+5L2N5Zu+5aSH5Lu9IDY8L3RpdGxlPgogICAgPGRlZnM+CiAgICAgICAgPGNpcmNsZSBpZD0icGF0aC0xIiBjeD0iMTgiIGN5PSIxOCIgcj0iMTgiPjwvY2lyY2xlPgogICAgPC9kZWZzPgogICAgPGcgaWQ9Iumhtemdoi0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0iMDQt576k6IGKLeaJqeWxleWKn+iDvS3nvqTorr7nva4iIHRyYW5zZm9ybT0idHJhbnNsYXRlKC04MDEuMDAwMDAwLCAtMzIxLjAwMDAwMCkiPgogICAgICAgICAgICA8ZyBpZD0i5L2N5Zu+5aSH5Lu9LTYiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDgwMi4wMDAwMDAsIDMyMi4wMDAwMDApIj4KICAgICAgICAgICAgICAgIDxtYXNrIGlkPSJtYXNrLTIiIGZpbGw9IndoaXRlIj4KICAgICAgICAgICAgICAgICAgICA8dXNlIHhsaW5rOmhyZWY9IiNwYXRoLTEiPjwvdXNlPgogICAgICAgICAgICAgICAgPC9tYXNrPgogICAgICAgICAgICAgICAgPHVzZSBpZD0i6JKZ54mIIiBzdHJva2U9IiM5OTk5OTkiIGZpbGwtcnVsZT0ibm9uemVybyIgeGxpbms6aHJlZj0iI3BhdGgtMSI+PC91c2U+CiAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMTksMTEgTDE5LDE2Ljc3NyBMMjUsMTYuNzc3Nzc3OCBMMjUsMTguNzc3Nzc3OCBMMTguOTk5LDE4Ljc3NyBMMTksMjUgTDE3LDI1IEwxNi45OTksMTguNzc3IEwxMSwxOC43Nzc3Nzc4IEwxMSwxNi43Nzc3Nzc4IEwxNywxNi43NzcgTDE3LDExIEwxOSwxMSBaIiBpZD0i5b2i54q257uT5ZCIIiBmaWxsPSIjOTk5OTk5Ij48L3BhdGg+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==);
    }
  }
}
.group-flag-message {
  padding: 12px 0;
}
.group-operator {
  padding-top: 20px;
  display: flex;
  justify-content: center;
  .group-operator--divider {
    width: 12px;
  }
}

.divider {
  width: 100%;
  height: 1px;
  background: #eeeeee;
}
</style>
