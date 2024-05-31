<template>
  <el-dialog
    v-model="dialogVisible"
    :append-to-body="true"
    title="上传头像"
    width="560px"
    :before-close="handleClose"
    draggable
  >
    <div class="upload-avatar">
      <div class="upload-top">
        <span class="title"> 建议不超过1M，头像将在详情页面、会话中同步 </span>
      </div>
      <div class="upload-content flex">
        <div class="avatar">
          <!-- <div class="status-label">
          </div> -->
          <img v-if="option.url" :src="option.url" alt="头像" />
          <FontIcon class="plus" iconName="Plus" @click="imageClick" />
        </div>
        <!-- <div class="preview"></div> -->
      </div>
      <div class="upload-footer">
        <el-button @click="imageClick" type="primary">头像上传</el-button>
      </div>
    </div>
    <input
      type="file"
      id="imagePicker"
      ref="imagePicker"
      accept=".jpg, .jpeg, .png, .gif, .bmp"
      @change="sendImage"
      hidden
    />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose"> 取消 </el-button>
        <el-button type="primary" @click="handleConfirm"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
import { updateMyProfile } from "@/api/im-sdk-api/index";
import { uploadFiles } from "@/api/node-admin-api/index";
import emitter from "@/utils/mitt-bus";
import { reactive, ref } from "vue";
import { useStore } from "vuex";

const { commit } = useStore();
const imagePicker = ref();
const dialogVisible = ref(false);
const option = reactive({
  url: "",
  files: null,
});

emitter.on("uploadAvatarDialog", (val) => {
  dialogVisible.value = val;
});

const imageClick = () => {
  let $el = imagePicker.value;
  $el.value = null;
  $el.click();
};

async function sendImage(e) {
  option.url = URL.createObjectURL(e.target.files[0]);
  option.files = e.target.files[0];
}
async function uploadAvatar() {
  const { code, data } = await uploadFiles({ files: option.files });
  if (code === 0) {
    await modifyMyProfile(data.file_url);
  } else {
    console.log("上传失败");
  }
}
// 修改头像
async function modifyMyProfile(file_url) {
  const { code, data } = await updateMyProfile({ avatar: file_url });
  if (code === 0) {
    // commit("updateCurrentUserProfile", cloneDeep(data));
  } else {
    console.log("修改失败");
  }
}
function closeUrl() {
  option.url = "";
}
function handleConfirm() {
  dialogVisible.value = false;
  closeUrl();
  uploadAvatar();
}
function handleClose() {
  dialogVisible.value = false;
  closeUrl();
}
</script>

<style lang="scss" scoped>
.upload-avatar {
  .upload-top {
    bottom: 1px;
  }
  .upload-content {
    margin: 20px 0;

    .avatar {
      height: 200px;
      width: 200px;
      background-color: var(--el-fill-color-lighter);
      border: 1px dashed var(--el-border-color-darker);
      border-radius: 6px;
      box-sizing: border-box;
      cursor: pointer;
      vertical-align: top;
      display: inline-flex;
      justify-content: center;
      align-items: center;
      position: relative;
      .status-label {
        position: absolute;
        right: -17px;
        top: -7px;
        width: 46px;
        height: 26px;
        background: var(--el-color-success);
        text-align: center;
        transform: rotate(45deg);
        .upload-success {
          font-size: 12px;
          margin-top: 12px;
          transform: rotate(-45deg);
        }
      }

      img {
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: 1;
      }
      &:hover {
        border-color: var(--el-color-primary);
        color: var(--el-color-primary);
      }
    }
    .plus {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      text-align: center;
    }
  }
}
</style>
