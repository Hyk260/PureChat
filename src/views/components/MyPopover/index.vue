<template>
  <div
    v-if="card && cardData"
    ref="cardRef"
    :style="{ left: left, top: top }"
    :class="{
      'robot-box': true,
      'is-robot': isRobot(cardData?.from),
      'fade-slide-lower': true,
    }"
  >
    <div class="title flex-sc">
      <img
        draggable="false"
        @click="clickCard(cardData.avatar)"
        :src="cardData.avatar || getAiAvatarUrl(cardData?.from) || squareUrl"
        alt="头像"
      />
      <div v-if="isRobot(cardData?.from)" class="flex flex-col ml-16">
        <div class="nick flex gap-5">
          <span> {{ cardData.nick || userProfile.nick || cardData.from || "-" }}</span>
          <Label :userID="cardData?.from" />
        </div>
        <el-link
          v-if="getProvider()"
          :href="getHomepage()"
          target="_blank"
          :underline="false"
          type="primary"
          class="!justify-start"
        >
          {{ getProvider() }}
        </el-link>
      </div>
      <div v-else class="flex ml-16">
        <span class="nick">{{ cardData.nick || userProfile.nick || cardData.from || "-" }}</span>
        <div v-if="getGender(userProfile, 'Male')" class="i-mdi:gender-male text-[#5A9CF8]"></div>
        <div
          v-else-if="getGender(userProfile, 'Female')"
          class="i-mdi:gender-female text-[#5A9CF8]"
        ></div>
      </div>
    </div>
    <div class="content">
      <div class="characters">
        <span>{{ userProfile?.selfSignature || "-" }} </span>
      </div>
    </div>
    <div class="footer">
      <el-button class="w-full" type="primary" @click="define">
        {{ $t("chat.sendMessage") }}
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { getUserProfile } from "@/api/im-sdk-api/index";
import { isRobot } from "@/utils/chat/index";
import { useBoolean } from "@/utils/hooks/index";
import { onClickOutside } from "@vueuse/core";
import { onBeforeUnmount, onMounted, ref } from "vue";
import { getAiAvatarUrl } from "@/ai/utils";
import { squareUrl } from "../../chatStudio/utils/menu";
import { getGender } from "@/utils/common";
import { getValueByKey, prefix } from "@/ai/utils";
import Label from "@/views/chatStudio/components/Label.vue";
import store from "@/store/index";
import emitter from "@/utils/mitt-bus";

const cardRef = ref();
const left = ref("");
const top = ref("");
const cardData = ref(null);
const userProfile = ref(null);

const [card, setCard] = useBoolean();

const closeModal = () => {
  userProfile.value = null;
  setCard(false);
};

const clickCard = (url) => {
  if (url) {
    closeModal();
    emitter.emit("handleImageViewer", url);
  }
};

const getProvider = (data = userProfile.value.profileCustomField) => {
  const provider = getValueByKey(data, prefix("Provider"));
  return provider;
};

const getHomepage = (data = userProfile.value.profileCustomField) => {
  const homepage = getValueByKey(data, prefix("Homepage"));
  return homepage;
};

const define = () => {
  closeModal();
  if (cardData.value?.conversationType === "C2C") return;
  store.dispatch("addConversation", { convId: `C2C${cardData.value.from}` });
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
  const { from: _from } = cardData.value || {};
  const { code, data } = await getUserProfile([_from]);
  if (code === 0) {
    console.log("获取用户信息", data);
    if (data?.[0]) userProfile.value = data?.[0];
  } else {
    console.log("获取用户信息失败", data);
  }
};

const setCardData = (data) => {
  if (data?.conversationID === "@TIM#SYSTEM") {
    cardData.value = null;
  } else {
    cardData.value = data;
  }
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

.robot-box {
  background: #fff;
  box-shadow: 0px 0px 12px rgb(0 0 0 / 12%);
  position: fixed;
  z-index: 99;
  border-radius: 4px;
  width: 320px;
  height: 220px;
  padding: 24px;
  background-size: 320px;
  border: 1px solid var(--color-border-default);
  .title {
    height: 54px;
    img {
      cursor: pointer;
      border-radius: 5px;
      height: 54px;
    }
    .nick,
    .label {
      font-family: MicrosoftYaHei;
      font-size: 18px;
      color: rgba(0, 0, 0, 0.85);
      font-weight: 400;
    }
    .iconify {
      vertical-align: text-bottom;
      margin-left: 5px;
      display: inline-block;
      width: 1.2em;
      height: 1.2em;
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
  }
  .content {
    padding: 24px 0;
    .characters {
      height: 38px;
      color: var(--black);
      span {
        @include ellipsisBasic(2);
      }
    }
  }
}
</style>
