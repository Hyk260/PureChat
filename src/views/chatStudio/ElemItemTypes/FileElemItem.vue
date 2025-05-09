<template>
  <div
    class="file-elem-item"
    @click="handleOpen(payload)"
    :id="payload.uuid"
    :style="{ background: backgroundStyle }"
  >
    <div class="flex">
      <div class="min-w-45 h-45">
        <img draggable="false" class="h-full" :src="icon" alt="" />
      </div>
      <div class="file-content">
        <el-tooltip
          effect="dark"
          placement="top"
          :content="payload.fileName"
          :disabled="payload.fileName.length < 24"
        >
          <div class="file-name truncate">
            {{ payload.fileName }}
          </div>
        </el-tooltip>
        <div class="file-size">
          <span>
            {{ bytesToSize(payload.fileSize) }}
          </span>
          <span class="upload_progress" v-show="!isStatus('success')"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { getFileType, renderFileIcon, bytesToSize } from "@/utils/chat/index";
import emitter from "@/utils/mitt-bus";

defineOptions({
  name: "FileElemItem"
});

const props = defineProps({
  message: {
    type: Object,
    default: null,
  },
  status: {
    type: String,
    default: "success",
  },
  self: {
    type: Boolean,
    default: false,
  },
});

const { payload } = props.message;
const backgroundStyle = ref("");
const fileType = getFileType(payload?.fileName);
const icon = renderFileIcon(fileType);

const isStatus = (value) => {
  return props.status === value;
};

function handleOpen({ fileName }) {
  if (__IS_ELECTRON__) {
    console.log("Open electron:");
  } else {
    console.log("Open web:");
  }
}

const backstyle = (status = 0, percentage = 0) => {
  if (percentage === 100) return "";
  return status === 1
    ? `linear-gradient(to right, rgba(24, 144, 255, 0.09) ${percentage}%, white 0%, white 100%)`
    : "";
};

const uploading = ({ uuid, num, type = "up" }) => {
  try {
    const dom = document.getElementById(`${uuid}`);
    if(!dom) {
      console.warn("dom not found");
      return;
    }
    dom.style.background = backstyle(1, num);
    if (type === "up") {
      const upProgress = dom.querySelector(".upload_progress");
      upProgress.innerText = num + "%";
    }
    if (type === "dow") {
      const downProgress = dom.querySelector(".download_progress");
      downProgress.innerText = num + "%";
    }
  } catch (error) {
    console.error("[upload]:", error);
  }
};

onMounted(() => {
  emitter.on("fileUploading", (data) => {
    uploading(data);
  });
  backgroundStyle.value = backstyle();
});

onBeforeUnmount(() => {
  emitter.off("fileUploading");
});
</script>

<style lang="scss" scoped>
.file-elem-item {
  display: flex;
  height: 70px;
  padding: 12px;
  width: 248px;
  background: #ffffff;
  border-radius: 3px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  user-select: none;
  cursor: pointer;
  .file-content {
    position: relative;
    margin-left: 12px;
    display: flex;
    flex-wrap: wrap;
    align-content: space-around;
    .file-name {
      color: #000000ad;
      font-size: 14px;
      height: 18px;
      width: 160px;
    }
    .file-size {
      font-weight: 400;
      color: #999999;
      line-height: 18px;
      font-size: 12px;
    }
  }
}

.upload_progress {
  display: inline-block;
  width: 30px;
  padding: 0 5px;
  color: #409eff;
}
</style>
