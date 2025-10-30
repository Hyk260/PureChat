<template>
  <ElForm ref="ruleFormRef" :model="ruleForm" :rules="updateRules" size="large">
    <ElFormItem prop="username">
      <ElInput v-model="ruleForm.username" clearable :placeholder="$t('login.username')" :prefix-icon="User" />
    </ElFormItem>
    <ElFormItem prop="nickname">
      <ElInput v-model="ruleForm.nickname" clearable :placeholder="$t('login.nickname')" :prefix-icon="User" />
    </ElFormItem>
    <ElFormItem prop="phone">
      <ElInput v-model="ruleForm.phone" clearable :placeholder="$t('login.phone')" :prefix-icon="Iphone" />
    </ElFormItem>
    <ElFormItem prop="verifyCode">
      <div class="w-full flex">
        <ElInput v-model="ruleForm.verifyCode" clearable :placeholder="$t('login.smsVerifyCode')" />
        <ElButton class="ml-5" :disabled="isDisabled" @click="useVerifyCode().start(ruleFormRef, 'phone')">
          {{ text.length > 0 ? text + $t("login.info") : $t("login.getVerifyCode") }}
        </ElButton>
      </div>
    </ElFormItem>
    <ElFormItem prop="password">
      <ElInput
        v-model="ruleForm.password"
        clearable
        show-password
        :placeholder="$t('login.password')"
        :prefix-icon="Lock"
      />
    </ElFormItem>
    <ElFormItem prop="repeatPassword">
      <ElInput
        v-model="ruleForm.repeatPassword"
        clearable
        show-password
        :placeholder="$t('login.sure')"
        :prefix-icon="Lock"
      />
    </ElFormItem>
    <ElFormItem>
      <ElCheckbox v-model="checked">
        {{ $t("login.readAccept") }}
      </ElCheckbox>
      <ElButton link type="primary">
        {{ $t("login.privacyPolicy") }}
      </ElButton>
    </ElFormItem>
    <ElFormItem>
      <ElButton class="w-full" size="default" type="primary" :loading="loading" @click="onUpdate(ruleFormRef)">
        <template #loading>
          <div class="iconify-icon svg-spinners mr-8"></div>
        </template>
        {{ $t("login.definite") }}
      </ElButton>
    </ElFormItem>
    <ElFormItem>
      <ElButton class="w-full" size="default" @click="onBack">
        {{ $t("login.back") }}
      </ElButton>
    </ElFormItem>
  </ElForm>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { Iphone, Lock, User } from "@element-plus/icons-vue"

import { useUserStore } from "@/stores/modules/user"

import { ruleForm, updateRules } from "../utils/validation"
import { useVerifyCode } from "../utils/verifyCode"

import type { FormInstance } from "element-plus"

defineOptions({ name: "LoginRegist" })

const checked = ref(false)
const loading = ref(false)
const ruleFormRef = ref<FormInstance>()

const { isDisabled, text } = useVerifyCode()
const userStore = useUserStore()

const onBack = () => {
  useVerifyCode().end()
  userStore.setCurrentPage(0)
}

const onUpdate = async (formEl: FormInstance | undefined) => {
  loading.value = true
  if (!formEl) return
  await formEl.validate((valid) => {
    if (valid) {
      if (checked.value) {
        setTimeout(() => {
          loading.value = false
          window.$message?.success("注册成功")
        }, 2000)
      } else {
        loading.value = false
        window.$message?.warning("请勾选隐私政策")
      }
    } else {
      loading.value = false
    }
  })
}
</script>

<style lang="scss" scoped></style>
