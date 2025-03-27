<template>
  <div v-show="userInfo.userID || userInfo.groupID" class="profile-card">
    <!-- 头部信息 -->
    <div class="header">
      <div class="avatar">
        <!-- <el-avatar :size="80" :src="userInfo.avatar" /> -->
        <UserAvatar
          words="3"
          shape="circle"
          :size="80"
          :convId="userInfo.userID"
          :nickName="userInfo.avatar || userInfo.name || userInfo.nick"
          :url="userInfo.avatar || ''"
          :type="userInfo.groupID ? 'group' : 'single'"
        />
        <div class="status">
          <!-- <span class="dot"></span> -->
          <!-- {{ userInfo.status }} -->
          <!-- 在线 -->
        </div>
      </div>
    </div>
    <!-- 用户基本信息 -->
    <div class="info">
      <h2 class="nickname">
        <span> {{ userInfo.nick || userInfo.name || "-" }} </span>
        <span v-if="userInfo?.memberCount"> ({{ userInfo?.memberCount }}) </span>
      </h2>
      <div class="qq-number">ID {{ userInfo.userID || userInfo.groupID.replace("@TGS", "") }}</div>

      <div class="basic-info">
        <span>
          <!-- {{ getGender(userInfo, "Male") }} -->
        </span>

        <!-- <span>{{ userInfo.age || "-" }} 岁</span>
        <span>{{ userInfo.constellation }}</span>
        <span>现居 {{ userInfo.location || "-" }}</span> -->
      </div>
    </div>
    <!-- 操作按钮 -->
    <div class="actions">
      <el-button type="primary" @click="sendMessage(userInfo)">发消息</el-button>
      <!-- <el-button @click="editProfile">编辑资料</el-button> -->
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { getGender } from "@/utils/common";
import { useSidebarStore, useChatStore } from "@/stores/index";
import { scrollToMessage } from "@/utils/chat/index";
import emitter from "@/utils/mitt-bus";
import store from "@/store/index";

const sidebarStore = useSidebarStore();
const chatStore = useChatStore();

// 用户信息
const userInfo = ref({
  groupID: "",
  userID: "",
  nick: "_",
  avatar: "",
});

const handleConversation = ({ id, type }) => {
  sidebarStore.toggleOutside({ path: "/chat" });
  chatStore.addConversation({ convId: `${type}${id}` })
  scrollToMessage(`message_${type}${id}`);
};

const sendMessage = (data) => {
  // 发送消息逻辑
  const convInfo = {
    id: data.groupID || data.userID,
    type: data.groupID ? "GROUP" : "C2C",
  };
  handleConversation(convInfo);
};

const editProfile = () => {
  // 编辑资料逻辑
};

onMounted(() => {
  emitter.on("handleProfile", (data) => {
    console.log(data);
    userInfo.value = data;
  });
});

onUnmounted(() => {
  emitter.off("handleProfile");
});
</script>

<style lang="scss" scoped>
.profile-card {
  width: 380px;
  background: #fff;
  border-radius: 8px;
  // box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin: auto;
  .header {
    display: flex;
    gap: 10px;
    align-items: flex-start;
    margin-bottom: 20px;

    .avatar {
      position: relative;
      :deep(.user-avatar) {
        width: 80px;
        height: 80px;
        font-size: 26px;
        background-size: 80px 80px;
        line-height: 80px;
      }
      .status {
        display: flex;
        align-items: center;
        font-size: 14px;
        margin-top: 8px;
        color: #666;

        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #67c23a;
          margin-right: 6px;
        }
      }
    }

    .like {
      display: flex;
      align-items: center;
      color: #666;
      font-size: 14px;

      .el-icon {
        margin-right: 4px;
        font-size: 16px;
      }
    }
  }

  .info {
    .nickname {
      font-size: 24px;
      font-weight: 500;
      margin: 0 0 8px;
    }

    .qq-number {
      color: #666;
      font-size: 14px;
      margin-bottom: 16px;
    }

    .basic-info {
      display: flex;
      gap: 12px;
      color: #666;
      font-size: 14px;
    }
  }

  .actions {
    margin-top: 20px;
    display: flex;
    gap: 12px;

    .el-button {
      flex: 1;
    }
  }
}
</style>
