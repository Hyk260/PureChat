<template>
  <div
    class="robot-box"
    :class="{ 'is-robot': isRobot(cardData?.from) }"
    :style="{ left: left, top: top }"
    v-if="card && cardData"
    ref="cardRef"
  >
    <div class="title">
      <img @click="clickCard(cardData.avatar)" :src="cardData.avatar || fnAvatar(cardData?.from) || squareUrl" alt="头像" />
      <span>{{ cardData.nick }}</span>
      <Label :userID="cardData?.from" />
    </div>
    <div class="content">
      <div class="characters">
        <span>{{ userProfile?.selfSignature || "" }} </span>
      </div>
    </div>
    <div class="footer">
      <el-button @click="define" type="primary"> {{ $t("chat.sendMessage") }} </el-button>
    </div>
  </div>
</template>

<script setup>
import { getUserProfile } from "@/api/im-sdk-api/index";
import { isRobot } from "@/utils/chat/index";
import { useBoolean } from "@/utils/hooks/index";
import { useState } from "@/utils/hooks/useMapper";
import emitter from "@/utils/mitt-bus";
import Label from "@/views/chatStudio/components/Label.vue";
import { onClickOutside } from "@vueuse/core";
import { onBeforeUnmount, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { fnAvatar } from "@/ai/utils";
import { squareUrl } from "../../chatStudio/utils/menu";
const [card, setCard] = useBoolean();

const cardRef = ref();
const left = ref("");
const top = ref("");
const cardData = ref(null);
const userProfile = ref(null);

const { dispatch, commit } = useStore();

const { chat } = useState({
  chat: (state) => state.conversation.currentConversation,
});

const closeModal = () => {
  userProfile.value = null;
  setCard(false);
};

const clickCard = (url) => {
  url && emitter.emit("handleImageViewer", url);
}

const define = () => {
  closeModal();
  if (cardData.value?.conversationType === "C2C") return;
  dispatch("CHEC_OUT_CONVERSATION", { convId: `C2C${cardData.value.from}` });
};

onClickOutside(cardRef, () => {
  closeModal();
});

const setPosition = (data) => {
  if (!data) return;
  let offsetLeft = 30;
  let offsetTop = 60;
  let cardWidth = 220;
  let cardHeight = 320;
  try {
    const { pageX, pageY, clientY } = data;
    let cardLeft = pageX + offsetLeft;
    let cardTop = pageY - offsetTop;
    let windowHeight = window.innerHeight; // 获取窗口的高度
    const bottomSpace = windowHeight - clientY;
    // 判断卡片是否超出屏幕
    // if (bottomSpace < cardHeight - offsetTop) {
    //   cardTop = pageY - (cardHeight - offsetTop);
    // }
    left.value = cardLeft + "px";
    top.value = cardTop + "px";
  } catch (error) {
    console.log(error);
  }
};
const setUserProfile = async () => {
  if (chat.value?.userProfile) {
    userProfile.value = chat.value.userProfile;
  }
  const userID = cardData.value?.from;
  const { code, data } = await getUserProfile([userID]);
  if (code == 0) {
    userProfile.value = data?.[0];
    console.log(userProfile.value);
  }
};
const setCardData = (data) => {
  if (data?.conversationID === "@TIM#SYSTEM") {
    cardData.value = null;
    return;
  }
  cardData.value = data;
};
const openCard = (data) => {
  setPosition(data.seat);
  setCardData(data.cardData);
  setUserProfile();
  setTimeout(() => {
    setCard(true);
  }, 100);
};

onMounted(() => {
  emitter.on("setPopoverStatus", (data) => {
    openCard(data);
  });
});
onBeforeUnmount(() => {
  emitter.off("setPopoverStatus");
});
</script>

<style lang="scss" scoped>
.is-robot {
  background-image: url(../../../assets/images/gptBack.png) !important;
}
.my-popover__avatar {
  cursor: pointer;
}
.robot-box {
  background: #fff;
  box-shadow: 0px 0px 12px rgb(0 0 0 / 12%);
  z-index: 99;
  border-radius: 4px;
  position: fixed;
  width: 320px;
  height: 220px;
  padding: 24px;
  background-size: 320px;
  .title {
    height: 54px;
    display: flex;
    align-items: center;
    img {
      cursor: pointer;
      border-radius: 5px;
      height: 54px;
    }
    span {
      margin-left: 16px;
      font-family: MicrosoftYaHei;
      font-size: 18px;
      color: rgba(0, 0, 0, 0.85);
      font-weight: 400;
    }
  }
  .content {
    padding: 24px 0;
    .characters {
      height: 38px;
      span {
        @include ellipsisBasic(3);
      }
    }
  }
  .footer {
    :deep(.el-button) {
      width: 100%;
    }
  }
}
</style>
