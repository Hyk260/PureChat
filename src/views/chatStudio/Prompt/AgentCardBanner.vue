<template>
  <el-dialog
    v-model="dialog"
    width="40%"
    align-center
    class="agent-card-modal"
    :before-close="handleClose"
  >
    <div class="agent-card-banner">
      <div class="top">
        <div class="avatar-square">
          {{ cardData.meta.avatar }}
        </div>
      </div>
      <div class="content">
        <h2>
          {{ cardData.meta.title }}
        </h2>
        <div class="tags">
          <span v-for="item in cardData.meta.tags" :key="item">
            {{ item }}
          </span>
        </div>
        <div class="desc">
          {{ cardData.meta.description }}
        </div>
      </div>
      <Markdown class="market" :marked="cardData.meta.systemRole" />
      <div class="button flex-c py-20">
        <el-button @click="toTant()"> 开始会话 </el-button>
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
import { StoreKey, CHATGPT_ROBOT, ModelProvider } from "@/ai/constant";
import { getModelId } from "@/ai/utils";
import { forIn } from "lodash-es";

const cardData = ref({});
const { commit, dispatch } = useStore();
const [dialog, setDialog] = useBoolean();

function toTant(item = cardData.value) {
  const { identifier, meta } = item;
  forIn(ModelProvider, (value, key) => {
    localStg.set(StoreKey.Prompt, {
      ...localStg.get(StoreKey.Prompt),
      [value]: {
        id: identifier,
        meta: {
          tags: meta.tags,
          avatar: meta.avatar,
          title: meta.title,
        },
        lang: "cn",
        prompt: [{ role: "system", content: meta.systemRole }],
      },
    });
  });
  const id = getModelId(localStg.get("default-assistant")) || CHATGPT_ROBOT;
  commit("taggleOueSide", "message");
  dispatch("addConversation", { convId: `${"C2C"}${id}` });
  setTimeout(() => {
    emitter.emit("updataScroll");
  }, 50);
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
:global(body .agent-card-modal) {
  padding: 0;
  min-width: 500px;
}

:global(body .agent-card-modal .el-dialog__header) {
  display: none;
}

.agent-card-banner {
  .top {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 20px;
    .avatar-square {
      font-size: 50px;
      display: flex;
      flex: none;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
  }
  .content {
    position: relative;
    padding: 16px 16px 24px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;
  }
  .tags {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 6px;
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
.el-button {
  width: 306px;
}
</style>
