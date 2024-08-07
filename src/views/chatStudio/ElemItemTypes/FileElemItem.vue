<template>
  <div
    class="file-box"
    @click="handleOpen(payload)"
    :id="payload.uuid"
    :style="{ background: backgroundStyle }"
  >
    <div class="file-data">
      <div class="w-45 h-45">
        <img class="h-full" :src="renderFileIcon(FileType)" alt="" />
      </div>
      <div class="file-box__content">
        <div class="file-name">
          {{ payload.fileName }}
        </div>
        <div class="file-box__size">
          <span class="file-box__size-label">
            {{ bytesToSize(payload.fileSize) }}
          </span>
          <span class="upload_progress" v-show="!isStatus('success')"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { isElectron } from "@/utils/common";
import { ref, toRefs, onMounted, onBeforeUnmount } from "vue";
import { getFileType, renderFileIcon, bytesToSize } from "@/utils/chat/index";
import emitter from "@/utils/mitt-bus";

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
const { message, status } = toRefs(props);
const { payload } = message.value;

const backgroundStyle = ref("");
const FileType = getFileType(payload?.fileName);

const isStatus = (value) => {
  return status.value == value;
};

function handleOpen({ fileName }) { 
  if (isElectron) {
    console.log('Open electron:')
  } else {
    console.log('Open web:')
  }
}

const backstyle = (status = 0, percentage = 0) => {
  if (percentage === 100) return "";
  return status === 1
    ? `linear-gradient(to right, rgba(24, 144, 255, 0.09) ${percentage}%, white 0%, white 100%)`
    : "";
};

backgroundStyle.value = backstyle();

const uploading = ({ uuid, num, type = "up" }) => {
  try {
    const dom = document.getElementById(`${uuid}`);
    dom.style.background = backstyle(1, num);
    if (type == "up") {
      const upProgress = dom.querySelector(".upload_progress");
      upProgress.innerText = num + "%";
    }
    if (type == "dow") {
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
});

onBeforeUnmount(() => {
  emitter.off("fileUploading");
});
</script>

<style lang="scss" scoped>
.file-box {
  display: flex;
  height: 70px;
  padding: 12px;
  width: 248px;
  background: #ffffff;
  border-radius: 3px;
  border: 1px solid rgba(0, 0, 0, 0.12);
  user-select: none;
  cursor: pointer;
}
.file-data {
  display: flex;
  .file-box__content {
    position: relative;
    margin-left: 12px;
    display: flex;
    flex-wrap: wrap;
    align-content: space-around;
    .file-name {
      color: #000000ad;
      font-size: 14px;
      width: 160px;
      @include text-ellipsis;
    }
    .file-box__size {
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
