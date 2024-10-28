<template>
  <AnalysisUrl :text="text" />
</template>

<script setup>
import { h } from "vue";
import { html2Escape } from "../utils/utils";
import linkifyUrls from "@/utils/linkifyUrls";
import { useState } from "@/utils/hooks/useMapper";

const { atUserList } = defineProps({
  text: {
    type: String,
    default: "",
  },
  atUserList: {
    type: Array,
    default: () => [],
  },
});

const { currentMemberList } = useState({
  currentMemberList: (state) => state.groupinfo.currentMemberList,
});

function filterMember() {
  return currentMemberList.value.filter((item) => {
    return atUserList.includes(item.userID);
  });
}

function AnalysisUrl(props) {
  const { text } = props;
  const escapedUrl = html2Escape(text);
  const linkStr = linkifyUrls(escapedUrl);
  return h("span", {
    innerHTML: linkStr,
    onClick: () => {
      // console.log("atUserList:", filterMember());
      console.log("onClick");
    },
  });
}
</script>

<style lang="scss" scoped>
:deep(.linkUrl) {
  cursor: pointer;
  text-decoration: underline;
  word-wrap: break-word;
  color: var(--el-color-primary);
}
</style>
