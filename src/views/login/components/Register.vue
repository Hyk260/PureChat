<template>
  <el-form ref="ruleFormRef" :model="ruleForm" :rules="updateRules" size="large">
    <el-form-item prop="username">
      <el-input
        clearable
        v-model="ruleForm.username"
        :placeholder="$t('login.username')"
        :prefix-icon="User"
      />
    </el-form-item>
    <el-form-item prop="nickname">
      <el-input
        clearable
        v-model="ruleForm.nickname"
        :placeholder="$t('login.nickname')"
        :prefix-icon="User"
      />
    </el-form-item>
    <el-form-item prop="phone">
      <el-input
        clearable
        v-model="ruleForm.phone"
        :placeholder="$t('login.phone')"
        :prefix-icon="Iphone"
      />
    </el-form-item>
    <!-- <el-form-item prop="verifyCode">
      <div class="w-full flex justify-between">
        <el-input
          clearable
          v-model="ruleForm.verifyCode"
          :placeholder="$t('login.smsVerifyCode')"
        />
        <el-button :disabled="isDisabled" class="ml-2">
          {{ true ? $t("login.info") : $t("login.getVerifyCode") }}
        </el-button>
      </div>
    </el-form-item> -->
    <el-form-item prop="password">
      <el-input
        clearable
        show-password
        v-model="ruleForm.password"
        :placeholder="$t('login.password')"
        :prefix-icon="Lock"
      />
    </el-form-item>
    <el-form-item prop="repeatPassword">
      <el-input
        clearable
        show-password
        v-model="ruleForm.repeatPassword"
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
import { useStore } from "vuex";
import { ruleForm, updateRules } from "../utils/validation";
import { Lock, User, Key, Iphone } from "@element-plus/icons-vue";

const checked = ref(false);
const loading = ref(false);
const ruleFormRef = ref();
const { commit } = useStore();

const onBack = () => {
  commit("setCurrentPage", 0);
};
const onUpdate = async (formEl) => {
  loading.value = true;
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      // if (checked.value) {
      // } else {
      //   loading.value = false;
      // }
      // setTimeout(() => {
      //   loading.value = false;
      //   console.log(ruleForm);
      // }, 2000);
      // dispatch("REGISTER", ruleForm);
    } else {
      loading.value = false;
      return fields;
    }
  });
};
</script>

<style lang="scss" scoped></style>
