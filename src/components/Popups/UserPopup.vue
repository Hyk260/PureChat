<template>
  <ElDialog v-model="open" center align-center append-to-body width="300" @close="handleClose">
    <div>
      <div class="flex-c">
        <div>
          <ElDropdown trigger="click">
            <div class="avatar">
              <span v-if="userStore.userLocalStore.native">
                {{ userStore.userLocalStore.native }}
              </span>
              <ElAvatar v-else class="w-70 h-70" :src="userStore.getUserAvatar" />
            </div>
            <template #dropdown>
              <ElDropdownMenu>
                <ElDropdownItem v-for="item in menu" :key="item.key" @click="item.onClick">
                  {{ item.label }}
                </ElDropdownItem>
              </ElDropdownMenu>
            </template>
          </ElDropdown>
        </div>
        <EmojiMart
          v-if="showEmojiPickerFlag"
          class="emoji-picker"
          @on-close="setShowEmojiPickerFlag(false)"
          @emoji-selected="handleEmojiSelect"
        />
      </div>
      <div class="py-20 flex-c">
        <ElInput v-model="userName" class="input" placeholder="Please input" @change="setUserName" />
      </div>
    </div>
  </ElDialog>
</template>

<script setup lang="ts">
import EmojiMart from "@/components/EmojiMart/index.vue"
import { useState } from "@/hooks/useState"
import { useUserStore } from "@/stores/modules/user"
import { fileToBase64 } from "@/utils/chat/index"
import { createFileInput } from "@/utils/common"

const userName = ref("")
const [open, setOpen] = useState(false)
const [showEmojiPickerFlag, setShowEmojiPickerFlag] = useState(false)

const userStore = useUserStore()

const menu = [
  {
    key: "upload",
    label: "图片上传",
    onClick: () => {
      handleUploadProfile()
    },
  },
  {
    key: "emoji",
    label: "表情选着",
    onClick: () => {
      handleEmojiClick()
    },
  },
  {
    key: "reset",
    label: "重置头像",
    onClick: () => {
      handleReset()
    },
  },
]

const show = () => {
  setOpen(true)
  userName.value = userStore.userLocalStore.userName
}

const handleClose = () => {
  setOpen(false)
}

const setUserName = (value = "") => {
  userStore.setUserLocalStore({ userName: value.trim() })
}

const handleEmojiSelect = (data) => {
  userStore.setUserLocalStore({ native: data.native, avatar: "" })
}

const handleUploadProfile = async () => {
  createFileInput({
    accept: ["image/png", "image/jpeg", "image/gif"],
    onChange: async (file) => {
      if (file && file.length > 0) {
        const base64 = await fileToBase64(file[0])
        userStore.setUserLocalStore({ avatar: base64, native: "" })
        // handleClose();
      }
    },
  })
}

const handleEmojiClick = async () => {
  setShowEmojiPickerFlag(true)
}

const handleReset = async () => {
  userStore.setUserLocalStore({ native: "", avatar: "" })
}

defineExpose({ show })
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
  top: 115px;
  z-index: 99;
  transform: translateX(-50%);
}
.input {
  width: 100%;
  :deep(.el-input__inner) {
    text-align: center;
  }
}
</style>
