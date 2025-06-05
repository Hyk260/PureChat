<template>
  <el-dialog v-model="open" center align-center width="300" :before-close="handleClose">
    <div>
      <div class="flex-c">
        <div>
          <el-dropdown trigger="click">
            <div class="avatar">
              <span v-if="userStore.userLocalStore.native">
                {{ userStore.userLocalStore.native }}
              </span>
              <el-avatar v-else class="w-70 h-70" :src="userAvatar" />
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item v-for="item in menu" :key="item.key" @click="item.onClick">
                  {{ item.label }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
        <EmojiMart
          v-if="showEmojiPickerFlag"
          class="emoji-picker"
          @onClose="setShowEmojiPickerFlag(false)"
          @emoji-selected="handleEmojiSelect"
        />
      </div>
      <div class="py-20 flex-c">
        <el-input v-model="userName" @Change="setUserName" class="input" placeholder="Please input" />
      </div>
    </div>
  </el-dialog>
</template>

<script setup>
import { useState } from "@/utils/hooks/index";
import { createFileInput } from "@/utils/common";
import { useUserStore } from "@/stores/index";
import { fileToBase64 } from "@/utils/chat/index";
import EmojiMart from "@/components/EmojiMart/index.vue";

const userName = ref("");
const [open, setOpen] = useState(false);
const [showEmojiPickerFlag, setShowEmojiPickerFlag] = useState(false);

const userStore = useUserStore();

const userAvatar = computed(() => {
  return userStore.getUserAvatar;
});

const menu = [
  {
    key: "upload",
    label: "图片上传",
    onClick: () => {
      handleUploadProfile();
    },
  },
  {
    key: "emoji",
    label: "表情选着",
    onClick: () => {
      handleEmojiClick();
    },
  },
  {
    key: "reset",
    label: "重置头像",
    onClick: () => {
      handleReset();
    },
  },
];

const show = () => {
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
};

const setUserName = (value = "") => {
  userStore.setUserLocalStore({ userName: value.trim() });
}

const handleEmojiSelect = (emoji) => {
  console.log("handleEmojiSelect", emoji);
  userStore.setUserLocalStore({ native: emoji.native, avatar: "" });
};

const handleUploadProfile = async () => {
  try {
    createFileInput({
      accept: ["image/png", "image/jpeg", "image/gif"],
      onChange: async (file) => {
        const base64 = await fileToBase64(file[0])
        userStore.setUserLocalStore({ avatar: base64, native: "" });
        // handleClose();
      },
    });
  } catch (error) {
    console.error("Error uploading profile image:", error);
  }
};

const handleEmojiClick = async () => {
  try {
    setShowEmojiPickerFlag(true);
  } catch (error) {}
};

const handleReset = async () => {
  try {
    userStore.setUserLocalStore({ native: "", avatar: "" });
  } catch (error) {}
};

defineExpose({ show });
</script>

<style lang="scss" scoped>
.avatar {
  --color-border: #00000019;
  --color-background-soft: rgba(0, 0, 0, 0.04);
  cursor: pointer;
  width: 80px;
  height: 80px;
  border-radius: 20%;
  background-color: var(--color-background-soft);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  transition: opacity 0.3s ease 0s;
  border: 0.5px solid var(--color-border);
}
.emoji-picker {
  position: absolute;
  bottom: 100px;
  left: 50%;
  top: 170px;
  transform: translateX(-50%);
}
.input {
  width: 100%;
  :deep(.el-input__inner) {
    text-align: center;
  }
}
</style>
