<template>
  <div
    class="robot-box"
    v-if="cardData"
    :class="{
      'is-robot': isRobot(cardData),
    }"
    v-show="drawer"
    ref="popoverRef"
  >
    <div class="title">
      <img :src="cardData.avatar" alt="头像" />
      <span>{{ cardData.nick }}</span>
    </div>
    <div class="content">
      <div class="characters">
        <span> 测试 </span>
      </div>
    </div>
    <div class="footer">
      <el-button @click="define" type="primary"> 查看详情 </el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, toRefs, computed, onMounted, onUnmounted } from "vue";
import { useStore } from "vuex";
import { useState } from "@/utils/hooks/useMapper";
import { onClickOutside } from "@vueuse/core";
import config from "@/config/defaultSettings";

// eslint-disable-next-line no-undef
const props = defineProps({
  cardData: {
    type: Object,
    require: true,
    default: () => {},
  },
  // seat: {
  //   type: PointerEvent,
  //   require: true,
  //   default: () => {},
  // },
});
const popoverRef = ref();
const state = reactive({
  sculpture: require("@/assets/images/ChatGPT.png"),
  back: require("@/assets/images/gptBack.png"),
});
const {
  // seat,
  cardData,
} = toRefs(props);
const { sculpture, back } = toRefs(state);

const { dispatch, commit } = useStore();
const { popover, seat } = useState({
  seat: (state) => state.groupinfo.seat,
  popover: (state) => state.groupinfo.popover,
});

const closeModal = () => {
  commit("setPopoverStatus", {
    status: false,
  });
};

const isRobot = (item) => {
  const ID = item.from || "";
  return ID == "R00001";
};

const define = () => {
  closeModal();
};

onClickOutside(popoverRef, (event) => {
  if (!popover.value) return;
  const { avatar, nick } = cardData.value;
  console.log(avatar, nick);
  closeModal();
});

const setPosition = (popover) => {
  if (!popover) return;
  try {
    const avatar = document.querySelector(".robot-box");
    const { x, y } = popover;
    const l = x + 30;
    const t = y - 80;
    avatar.style.left = l + "px";
    avatar.style.top = t + "px";
  } catch (error) {
    console.log(error);
  }
};

const drawer = computed({
  get() {
    setPosition(seat.value);
    return popover.value;
  },
  set(val) {
    closeModal();
  },
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
    img {
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
    }
  }
  .footer {
    :deep(.el-button) {
      width: 100%;
    }
  }
}
</style>
