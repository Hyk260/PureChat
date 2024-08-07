<template>
  <div v-show="flag" class="robot-model-box" v-click-outside="onClickOutside">
    <div class="item-group-title">
      <svg-icon :iconClass="robotIcon" />
      {{ model.name }}
    </div>
    <div
      class="model flex"
      v-for="item in model.chatModels"
      :key="item"
      @click="storeRobotModel(item.id)"
    >
      <div :class="['icon', robotIcon]">
        <div class="tongyi icon" v-if="model.id === 'ollama'">
          <svg-icon iconClass="tongyi" /> 
        </div>
        <span v-else>
          <svg-icon :iconClass="robotIcon" />
        </span>
      </div>
      <span>{{ item.id }}</span>
    </div>
  </div>
</template>

<script setup>
import { useBoolean } from "@/utils/hooks/index";
import emitter from "@/utils/mitt-bus";
import { ClickOutside as vClickOutside } from "element-plus";
import { ref } from "vue";
import { getModelType, getModelSvg, useAccessStore } from "@/ai/utils";
import { StoreKey, modelValue } from "@/ai/constant";
import { useGetters } from "@/utils/hooks/useMapper";
import storage from "@/utils/localforage/index";
import { useStore } from "vuex";

const robotIcon = ref("");
const model = ref({});
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
  model.value = modelValue[getModelType(toAccount.value)].Model.options;
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
  // max-width: 250px;
  max-height: 300px;
  background: var(--color-robot-model);
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
