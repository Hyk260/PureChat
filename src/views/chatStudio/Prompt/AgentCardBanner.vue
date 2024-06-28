<template>
  <el-dialog v-model="dialog" width="500" class="agent-card-modal" :before-close="handleClose">
    <div class="agent-card-banner">
      <div class="top"></div>
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
        <div>
          <el-button @click="toTant" type="primary"> 添加助手并会话 </el-button>
        </div>
      </div>
      <div>
        {{ cardData.meta.systemRole }}
      </div>
    </div>
  </el-dialog>
</template>

<script setup>
import { ref } from "vue";
import emitter from "@/utils/mitt-bus";
import { useBoolean } from "@/utils/hooks/index";
const cardData = ref({});
const [dialog, setDialog] = useBoolean();

function toTant() {}
function handleClose() {
  setDialog(false);
}
emitter.on("openAgentCard", (data) => {
  cardData.value = data;
  setDialog(true);
});
</script>

<style lang="scss" scoped>
:global(body .agent-card-modal) {
  padding: 0;
}

:global(body .agent-card-modal .el-dialog__header) {
  display: none;
}

.agent-card-banner {
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
      background: rgba(0, 0, 0, 0.06);
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
    }
  }
}
</style>
