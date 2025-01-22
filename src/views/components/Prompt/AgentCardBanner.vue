<template>
  <el-dialog
    v-model="dialog"
    width="40%"
    align-center
    class="p-0 min-w-500"
    :show-close="false"
    :before-close="handleClose"
  >
    <div class="agent-card-banner">
      <div class="flex-c flex-col text-[50px]">
        <div>
          {{ cardData.meta.avatar }}
        </div>
      </div>
      <div class="flex-c flex-col relative p-16 pb-24 gap-16">
        <h2>
          {{ cardData.meta.title }}
        </h2>
        <div class="tags flex-c flex-wrap gap-6">
          <span v-for="item in cardData.meta.tags" :key="item">
            {{ item }}
          </span>
        </div>
        <div class="desc">
          {{ cardData.meta.description }}
        </div>
      </div>
      <Markdown class="market" :marked="cardData.meta.systemRole" />
      <div class="flex-c py-20">
        <el-button class="w-306" @click="toTant()"> 开始会话 </el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script setup>
import { Markdown, handleCopyClick } from "@/utils/markdown/index";
import { ref } from "vue";
import emitter from "@/utils/mitt-bus";
import { useBoolean } from "@/utils/hooks/index";
import { localStg } from "@/utils/storage";
import { useStore } from "vuex";
import { StoreKey, VITE_OPENAI_ID, ModelProvider } from "@/ai/constant";
import { getModelId } from "@/ai/utils";

const cardData = ref({});
const { commit, dispatch } = useStore();
const [dialog, setDialog] = useBoolean();

function toTant(item = cardData.value) {
  const { identifier, meta } = item;
  const defaultBot = localStg.get("default-assistant") || null;
  const value = defaultBot || ModelProvider.GPT;
  const prompt = {
    [value]: {
      id: identifier,
      meta,
      lang: "cn",
      prompt: [{ role: "system", content: meta.systemRole }],
    },
  };
  console.log("prompt", { ...localStg.get(StoreKey.Prompt), ...prompt });
  localStg.set(StoreKey.Prompt, { ...localStg.get(StoreKey.Prompt), ...prompt });
  const id = getModelId(defaultBot) || VITE_OPENAI_ID;
  commit("setPromptConfig", prompt[value]);
  commit("taggleOueSide", "chat");
  dispatch("addConversation", { convId: `${"C2C"}${id}` });
  setTimeout(() => {
    commit("addAiPresetPromptWords");
  }, 200);
}

function handleClose() {
  setDialog(false);
}

emitter.on("openAgentCard", (data) => {
  cardData.value = data;
  setDialog(true);
  handleCopyClick();
});
</script>

<style lang="scss" scoped>
.agent-card-banner {
  .tags {
    span {
      color: #666666;
      background: var(--tags-back);
      height: 20px;
      line-height: 20px;
      padding: 0 7px;
      display: flex;
      align-items: center;
      border-radius: 4px;
      white-space: nowrap;
      text-align: center;

      &:hover {
        background: var(--tags-back-hover);
      }
    }
    .desc {
      color: #666666;
      text-align: center;
      line-height: 22px;
    }
  }
  .market {
    max-height: 320px;
    overflow: auto;
    padding: 16px;
  }
}
</style>
