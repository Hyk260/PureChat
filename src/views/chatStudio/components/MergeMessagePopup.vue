<template>
  <el-dialog
    v-model="dialogVisible"
    :title="mergValue?.payload?.title"
    width="680px"
    align-center
    :before-close="handleClose"
  >
    <el-scrollbar>
      <div class="merg-dialog">
        <div
          class="flex"
          :class="ISown(item) ? 'is-self' : 'is-other'"
          v-for="item in mergValue.payload.messageList"
          :key="item.ID"
        >
          <div class="avatar">
            <el-avatar
              :size="36"
              shape="square"
              :src="item.avatar || circleUrl"
              @error="() => true"
            >
              <img :src="circleUrl" />
            </el-avatar>
          </div>
          <div class="item" :class="msgOne(item.messageBody[0].type)">
            <p class="nick">
              <span>{{ item.nick }}</span>
              <span>{{ timeFormat(item.clientTime * 1000, true) }}</span>
            </p>
            <div :class="msgType(item.messageBody[0].type)">
              <component
                :key="mergValue.ID"
                :is="loadMsgModule(item.messageBody[0])"
                :msgType="mergValue.conversationType"
                :message="item.messageBody[0]"
                :self="ISown(item)"
              >
              </component>
            </div>
          </div>
        </div>
      </div>
    </el-scrollbar>
  </el-dialog>
</template>

<script setup>
import { downloadMergerMessage } from "@/api/im-sdk-api/index";
import { useBoolean } from "@/utils/hooks/index";
import emitter from "@/utils/mitt-bus";
import { timeFormat } from "pure-tools";
import { ref } from "vue";
import { circleUrl } from "../utils/menu";
import { loadMsgModule, msgOne, msgType } from "../utils/utils";

const [dialogVisible, setDialogVisible] = useBoolean();
const mergValue = ref({});

const ISown = (item) => {
  return item.from == window.TIMProxy.userProfile.userID;
};

function handleClose(done) {
  setDialogVisible(false);
  done();
}
emitter.on("openMergePopup", (data) => {
  downloadMergerMessage(data);
  mergValue.value = data;
  setDialogVisible(true);
});
</script>

<style lang="scss" scoped>
.merg-dialog {
  height: 550px;
  & > div {
    padding: 10px 0 10px 0;
  }
  .avatar {
    padding: 0 12px 0 0;
  }
  .item {
    .nick {
      display: flex;
      gap: 0 5px;
      font-size: 12px;
      color: var(--color-time-divider);
    }
  }
}

.is-self {
  flex-direction: row-reverse;
  display: flex;
  .nick {
    flex-direction: row-reverse !important;
  }
  .avatar {
    padding: 0 0 0 12px;
  }
  .item {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
}
</style>
