<template>
  <span class="download_progress" v-show="!isExist && isStatus"></span>
  <span class="ml-5" v-show="isStatus && self && isExist">
    <img src="@/assets/message/check.png" alt="√" />
  </span>
  <FontIcon
    v-show="!isExist && isStatus"
    @click.stop="handleDownload"
    class="download"
    iconName="Download"
    title="下载文件"
  />
  <FontIcon
    v-show="isExist"
    @click.stop="handleOpenFolder()"
    class="opened"
    iconName="FolderOpened"
    title="打开文件夹"
  />
</template>

<script setup>
import emitter from "@/utils/mitt-bus";
import { ref, toRefs, onMounted, onBeforeUnmount } from "vue";

defineOptions({
  name: "HandleFolder",
});

const emit = defineEmits(["loadProgress"]);

const props = defineProps({
  folder: {
    type: Object,
    default: null,
  },
  self: {
    type: Boolean,
    default: false,
  },
  isStatus: {
    type: Boolean,
    default: false,
  },
});

const { folder } = toRefs(props);
const isExist = ref(false); //文件是否存在
const ipcRenderer = window.electron.ipcRenderer;

function handleOpenPath(type, fileName) {
  // showItemInFolder openPath
  window.api.fileOpenFolder({ type, fileName });
}

// 下载文件
function handleDownload() {
  console.log("download");
  const { fileName, fileUrl, fileSize, uuid } = folder.value;
  window.api.fileDownloadFolder({ fileName, fileUrl, fileSize, uuid });
}

// 打开文件夹
async function handleOpenFolder() {
  console.log("打开文件夹:", folder.value);
  const { fileName } = folder.value;
  const result = await window.api.fileCheckExist(fileName) 
  if (!result) return;
  handleOpenPath("showItemInFolder", fileName);
}

async function updateFileState() {
  const { fileName } = folder.value;
  isExist.value = await window.api.fileCheckExist(fileName) 
}

onMounted(() => {
  updateFileState();
  ipcRenderer.on("downloadProgress", (e, { uuid, progress }) => {
    if (uuid !== folder.value.uuid) return;
    console.log("downloadProgress:", progress);
    emitter.emit("fileUploading", { uuid, num: progress, type: "dow" });
  });
  ipcRenderer.on("downloadFinish", (e, { uuid, file_path }) => {
    if (uuid !== folder.value.uuid) return;
    console.log("downloadFinish:", file_path);
    updateFileState();
  });
});

onBeforeUnmount(() => {});
</script>

<style lang="scss" scoped>
.opened,
.download {
  position: absolute;
  right: 0;
  bottom: 0;
  opacity: 0.7;
  font-size: 17px;
}

.download_progress {
  display: inline-block;
  width: 30px;
  padding: 0 5px;
  color: #409eff;
}
</style>
