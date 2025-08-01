<template>
  <div
    :id="payload.uuid"
    class="file-elem-item"
    :style="{ background: backgroundStyle }"
    @click="handleOpen(payload)"
  >
    <div class="flex">
      <div class="min-w-45 h-45">
        <img draggable="false" class="h-full" :src="icon" :alt="payload.fileName" />
      </div>
      <div class="file-content">
        <el-tooltip placement="top" :content="payload.fileName" :disabled="!shouldShowTooltip">
          <div ref="fileNameRef" class="file-name truncate">
            {{ payload.fileName }}
          </div>
        </el-tooltip>
        <div class="file-size">
          <span>{{ formattedFileSize }} </span>
          <span v-show="!isSuccess" class="upload-progress"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { getFileType, renderFileIcon, bytesToSize } from "@/utils/chat/index";
import emitter from "@/utils/mitt-bus";

defineOptions({
  name: "FileElemItem",
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

const fileNameRef = ref(null);
const backgroundStyle = ref("");
const shouldShowTooltip = ref(false);

const fileType = computed(() => getFileType(payload?.fileName));
const icon = computed(() => renderFileIcon(fileType.value));
const formattedFileSize = computed(() => bytesToSize(payload.fileSize));
const isSuccess = computed(() => props.status === "success");

const checkTextOverflow = () => {
  if (!fileNameRef.value) return;
  const element = fileNameRef.value;
  shouldShowTooltip.value = element.scrollWidth > element.offsetWidth;
}

const handleOpen = async (data) => {
  if (__IS_ELECTRON__) {
    console.log("Open electron:");
  } else {
    console.log("Open web:");
  }
}

const getBackgroundStyle = (status = 0, percentage = 0) => {
  if (percentage === 100) return "";
  return status === 1
    ? `linear-gradient(to right, rgba(24, 144, 255, 0.09) ${percentage}%, white 0%, white 100%)`
    : "";
};

const handleProgressUpdate = ({ uuid, num, type = "up" }) => {
  try {
    const dom = document.getElementById(`${uuid}`);
    if (!dom) {
      console.warn("DOM element not found");
      return;
    }
    dom.style.background = getBackgroundStyle(1, num);
    if (type === "up") {
      const upProgress = dom.querySelector(".upload-progress");
      upProgress.innerText = num + "%";
    } else if (type === "dow") {
      const downProgress = dom.querySelector(".download-progress");
      downProgress.innerText = num + "%";
    }
  } catch (error) {
    console.error("[upload]:", error);
  }
};

onUpdated(() => {
  checkTextOverflow();
});

onMounted(() => {
  checkTextOverflow();
  emitter.on("fileUploading", handleProgressUpdate);
  backgroundStyle.value = getBackgroundStyle();
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
  width: 250px;
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

.upload-progress {
  display: inline-block;
  width: 30px;
  padding: 0 5px;
  color: #409eff;
}
</style>
