<template>
  <el-dialog v-model="dialog" width="520" class="agent-card-modal" :before-close="handleClose">
    <div class="agent-card-banner">
      <!-- <div class="top">
        <div class="back"></div>
        <div class="avatar-square">
          {{ cardData.meta.avatar }}
        </div>
      </div> -->
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
        <div class="button">
          <el-button @click="toTant()"> 开始会话 </el-button>
        </div>
      </div>
      <Markdown class="market" :marked="cardData.meta.systemRole" />
    </div>
  </el-dialog>
</template>

<script setup>
import { Markdown, handleCopyClick } from "@/utils/markdown/index";
import { ref } from "vue";
import emitter from "@/utils/mitt-bus";
import { useBoolean } from "@/utils/hooks/index";
import storage from "@/utils/localforage/index";
import { useStore } from "vuex";
import { StoreKey, CHATGPT_ROBOT, ModelProvider } from "@/ai/constant";
import { forIn } from "lodash-es";

const cardData = ref({});
const { commit, dispatch } = useStore();
const [dialog, setDialog] = useBoolean();

function toTant(item = cardData.value) {
  const { identifier, meta } = item;
  forIn(ModelProvider, (value, key) => {
    storage.set(StoreKey.Prompt, {
      ...storage.get(StoreKey.Prompt),
      [value]: {
        id: identifier,
        lang: "cn",
        prompt: [{ role: "system", content: meta.systemRole }],
      },
    });
  });

  commit("TAGGLE_OUE_SIDE", "message");
  dispatch("CHEC_OUT_CONVERSATION", { convId: `${"C2C"}${CHATGPT_ROBOT}` });
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
}

:global(body .agent-card-modal .el-dialog__header) {
  display: none;
}

:global(body .agent-card-modal p) {
  // margin: revert;
  // color: rgb(8, 8, 8);
}

.agent-card-banner {
  .top {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 180px;
    .back {
      height: 120px;
      margin-bottom: -60px;
      position: relative;
      overflow: hidden;
      height: 64px;
      margin-block-end: -56px;
      background: rgba(0, 0, 0, 0.06);
    }
    .avatar-square {
      font-size: 80px;
      height: 120px;
      display: flex;
      flex: none;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 120px;
      height: 120px;
    }
    // height: 60px;
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
        color: #333333;
        border-color: #333333;
        background: rgba(0, 0, 0, 0.12);
      }
    }
    .desc {
      color: #666666;
      text-align: center;
      line-height: 22px;
    }
  }
  .market {
    max-height: 350px;
    overflow: auto;
    padding: 16px;
  }
}
.el-button {
  width: 306px;
}
</style>
