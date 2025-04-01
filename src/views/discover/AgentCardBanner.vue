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
      <div class="flex-c flex-col text-50">
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
        <el-button class="w-306" @click="startConversation()"> 开始会话 </el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useState } from "@/utils/hooks/index";
import { localStg } from "@/utils/storage";
import { StoreKey, VITE_OPENAI_ID, ModelProvider } from "@/ai/constant";
import { getModelId } from "@/ai/utils";
import { useRobotStore, useSidebarStore, useChatStore } from "@/stores/index";
import emitter from "@/utils/mitt-bus";

const cardData = ref({});
const sidebarStore = useSidebarStore();
const robotStore = useRobotStore()
const chatStore = useChatStore()
const [dialog, setDialog] = useState();

function startConversation(item = cardData.value) {
  const { identifier, meta } = item;
  const defaultBot = localStg.get("model-provider") || null;
  const value = defaultBot || ModelProvider.OpenAI;
  const prompt = {
    [value]: {
      id: identifier,
      meta,
      lang: "cn",
      prompt: [{ role: "system", content: meta.systemRole }],
    },
  };
  localStg.set(StoreKey.Prompt, { ...localStg.get(StoreKey.Prompt), ...prompt });
  const id = getModelId(defaultBot) || VITE_OPENAI_ID;
  handleClose()
  sidebarStore.toggleOutside({ path: "/chat" });
  chatStore.addConversation({ convId: `${"C2C"}${id}` })
  setTimeout(() => {
    chatStore.addAiPresetPromptWords()
  }, 200);
}

function handleClose() {
  setDialog(false);
}

function setAgentCard(data) {
  cardData.value = data;
  setDialog(true);
}

onMounted(() => {
  emitter.on("openAgentCard", (data) => {
    setAgentCard(data);
  });
});

onBeforeUnmount(() => {
  emitter.off("openAgentCard");
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
