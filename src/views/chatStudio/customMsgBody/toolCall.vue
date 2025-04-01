<template>
  <div @click="onClick(payload)">
    <div v-if="payload.data">
      <h4>函数调用:</h4>
      <Markdown :marked="getArguments(payload)" />
    </div>
    <div v-if="payload.extension">
      <h4>返回结果:</h4>
      <Markdown :marked="getToolResult(payload)" />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { prettyObject } from "@/ai/utils";
import { transformCustomElement } from "@/utils/chat/index";

defineOptions({
  name: "ToolCall",
});

const props = defineProps({
  payload: {
    type: Object,
    default: null,
  },
});

function onClick(payload) {
  console.log(transformCustomElement({ payload }));
}

function getToolResult(payload) {
  try {
    const data = JSON.parse(payload.extension);
    return prettyObject(data);
  } catch (error) {
    console.log(error);
    return "";
  }
}

function getArguments(payload) {
  try {
    const data = JSON.parse(payload.data).data.message.choices[0].message.tool_calls;
    return prettyObject(data);
  } catch (error) {
    console.log(error);
    return "";
  }
}
</script>

<style lang="scss" scoped></style>
