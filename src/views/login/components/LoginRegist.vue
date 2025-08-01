<template>
  <el-form ref="ruleFormRef" :model="ruleForm" :rules="updateRules" size="large">
    <el-form-item prop="username">
      <el-input
        v-model="ruleForm.username"
        clearable
        :placeholder="$t('login.username')"
        :prefix-icon="User"
      />
    </el-form-item>
    <el-form-item prop="nickname">
      <el-input
        v-model="ruleForm.nickname"
        clearable
        :placeholder="$t('login.nickname')"
        :prefix-icon="User"
      />
    </el-form-item>
    <el-form-item prop="phone">
      <el-input
        v-model="ruleForm.phone"
        clearable
        :placeholder="$t('login.phone')"
        :prefix-icon="Iphone"
      />
    </el-form-item>
    <el-form-item prop="verifyCode">
      <div class="w-full flex">
        <el-input
          v-model="ruleForm.verifyCode"
          clearable
          :placeholder="$t('login.smsVerifyCode')"
        />
        <el-button
          class="ml-5"
          :disabled="isDisabled"
          @click="useVerifyCode().start(ruleFormRef, 'phone')"
        >
          {{ text.length > 0 ? text + $t("login.info") : $t("login.getVerifyCode") }}
        </el-button>
      </div>
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        v-model="ruleForm.password"
        clearable
        show-password
        :placeholder="$t('login.password')"
        :prefix-icon="Lock"
      />
    </el-form-item>
    <el-form-item prop="repeatPassword">
      <el-input
        v-model="ruleForm.repeatPassword"
        clearable
        show-password
        :placeholder="$t('login.sure')"
        :prefix-icon="Lock"
      />
    </el-form-item>
    <el-form-item>
      <el-checkbox v-model="checked">
        {{ $t("login.readAccept") }}
      </el-checkbox>
      <el-button link type="primary">
        {{ $t("login.privacyPolicy") }}
      </el-button>
    </el-form-item>
    <el-form-item>
      <el-button
        class="w-full"
        size="default"
        type="primary"
        :loading="loading"
        @click="onUpdate(ruleFormRef)"
      >
        <template #loading>
          <div class="iconify-icon svg-spinners mr-8"></div>
        </template>
        {{ $t("login.definite") }}
      </el-button>
    </el-form-item>
    <el-form-item>
      <el-button class="w-full" size="default" @click="onBack">
        {{ $t("login.back") }}
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref } from "vue";
import { Lock, User, Key, Iphone } from "@element-plus/icons-vue";
import { useAppStore, useUserStore } from "@/stores/index";
import { ruleForm, updateRules } from "../utils/validation";
import { useVerifyCode } from "../utils/verifyCode";

const checked = ref(false);
const loading = ref(false);
const ruleFormRef = ref();

const { isDisabled, text } = useVerifyCode();
const userStore = useUserStore();
const appStore = useAppStore();

const onBack = () => {
  useVerifyCode().end();
  userStore.setCurrentPage(0);
};

const onUpdate = async (formEl) => {
  loading.value = true;
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      if (checked.value) {
        setTimeout(() => {
          loading.value = false;
          appStore.showMessage({ message: "注册成功" });
        }, 2000);
      } else {
        loading.value = false;
        appStore.showMessage({ message: "请勾选隐私政策", type: "warning" });
      }
    } else {
      loading.value = false;
    }
  });
};
</script>

<style lang="scss" scoped></style>
