<template>
  <div v-show="flag" class="robot-model-box" v-click-outside="onClickOutside">
    <div class="item-group-title">
      <svg-icon :iconClass="robotIcon" />
      <span>{{ robotTitle }}</span>
    </div>
    <div class="model flex" v-for="item in model" :key="item" @click="storeRobotModel(item)">
      <div :class="['icon', robotIcon]">
        <svg-icon :iconClass="robotIcon" />
      </div>
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script setup>
import { useBoolean } from "@/utils/hooks/index";
import emitter from "@/utils/mitt-bus";
import { ClickOutside as vClickOutside } from "element-plus";
import { ref, reactive, toRefs, computed, watch, nextTick } from "vue";
import { getModelType, getModelSvg, useAccessStore } from "@/ai/utils";
import { DEFAULT_MODELS, StoreKey, RobotModel } from "@/ai/constant";
import { useGetters } from "@/utils/hooks/useMapper";
import storage from "@/utils/localforage/index";
import { useStore } from "vuex";

const title = ref({
  GPT: "OpenAI",
  ChatGLM: "ZhiPu",
  ZeroOne: "01.AI",
  Qwen: "通义千问",
});

const robotTitle = ref("");
const robotIcon = ref("");
const model = ref([]);
const [flag, setFlag] = useBoolean();
const { commit } = useStore();
const { toAccount } = useGetters(["toAccount"]);

function onClickOutside() {
  setFlag(false);
}

function storeRobotModel(model) {
  const access = storage.get(StoreKey.Access);
  const account = getModelType(toAccount.value);
  const config = useAccessStore(account);
  const modelConfig = { ...config, model };
  if (access) {
    storage.set(StoreKey.Access, { ...access, [account]: { ...modelConfig } });
  } else {
    storage.set(StoreKey.Access, { [account]: { ...modelConfig } });
  }
  commit("setRobotModel", model);
  setFlag(false);
}

emitter.on("openModeList", () => {
  robotIcon.value = getModelSvg(toAccount.value);
  robotTitle.value = title.value[getModelType(toAccount.value)];
  model.value = RobotModel[getModelType(toAccount.value)];
  setFlag(true);
});
</script>

<style lang="scss" scoped>
.robot-model-box {
  overflow-y: auto;
  position: absolute;
  padding: 4px;
  z-index: 1;
  border-radius: 5px;
  bottom: 46px;
  max-width: 250px;
  max-height: 300px;
  background: #fff;
  box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.12);
}
.model {
  padding: 7px 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.03);
  }
}
.icon {
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  color: rgb(255, 255, 255);
  height: 20px;
  width: 20px;
}
.openai {
  background: rgb(25, 195, 125);
}
.zhipu {
  background: linear-gradient(-45deg, rgb(52, 133, 255), rgb(80, 74, 244));
}
.tongyi {
  background: rgb(97, 92, 237);
}
.zeroone {
  background: rgb(0, 52, 37);
}
.item-group-title {
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 7px 12px;
  color: #999999;
  transition: all 0.2s;
}
</style>
