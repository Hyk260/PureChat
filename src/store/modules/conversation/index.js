import {
  addTimeDivider,
  getBaseTime,
} from "@/utils/chat/index";
import { useChatStore } from "@/stores/index";
import { cloneDeep } from "lodash-es";
import { createAiPromptMsg } from "@/ai/utils";
import { MessageModel } from "@/database/models/message";
import emitter from "@/utils/mitt-bus";

const conversation = {
  mutations: {
    updateHistoryMessageCache(state, payload) {
      console.log("[chat] 更新历史消息缓存 updateHistoryMessageCache:", payload);
      const { convId, message } = payload;
      const history = useChatStore().historyMessageList.get(convId);
      if (!history) return;
      let baseTime = getBaseTime(history);
      let timeDivider = addTimeDivider(message, baseTime).reverse();
      history.unshift(...timeDivider);
      useChatStore().historyMessageList.set(convId, history);
      if (useChatStore().currentConversation.conversationID === convId) {
        useChatStore().$patch({ currentMessageList: history })
        emitter.emit("updataScroll");
      }
    },
  }
};

export default conversation;
