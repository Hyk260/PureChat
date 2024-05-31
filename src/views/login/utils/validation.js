import { reactive } from "vue";
import store from "@/store/index";
import storage from "@/utils/localforage/index";
import { $t } from "@/plugins/i18n";
import { ACCOUNT } from "@/constants/index";

/** 6位数字验证码正则 */
const REGEXP_SIX = /^\d{6}$/;

/** 密码正则（密码格式应为8-18位数字、字母、符号的任意两种组合） */
const REGEXP_PWD =
  /^(?![0-9]+$)(?![a-z]+$)(?![A-Z]+$)(?!([^(0-9a-zA-Z)]|[()])+$)(?!^.*[\u4E00-\u9FA5].*$)([^(0-9a-zA-Z)]|[()]|[a-z]|[A-Z]|[0-9]){8,18}$/;

const pattern = /^(?:(?:\+|00)86)?1[3-9]\d{9}$/;

const { username, password, keep } = storage.get(ACCOUNT) || {};

export const user = reactive({
  username: username || "",
  password: password || "123456",
  keep: keep || false,
  verifyCode: "",
});
export const rules = reactive({
  username: [
    {
      required: true,
      message: "用户名是必须的",
      trigger: "change",
    },
  ],
  password: [
    {
      required: true,
      message: "密码是必须的",
      trigger: "blur",
    },
  ],
  verifyCode: [
    {
      validator: (rule, value, callback) => {
        if (value === "") {
          callback(new Error("请输入验证码"));
        } else if (store.state.data.verifyCode !== value) {
          callback(new Error("请输入正确的验证码"));
        } else {
          callback();
        }
      },
      trigger: "blur",
    },
  ],
});

export const ruleForm = reactive({
  username: "",
  nickname: "",
  phone: "",
  verifyCode: "",
  password: "",
  repeatPassword: "",
});
export const updateRules = reactive({
  username: [
    {
      required: true,
      message: "账号格式应为字母、数字组合 （张爱玲）zhangal（张三） zhangsan",
      trigger: "blur",
    },
  ],
  nickname: [
    {
      required: true,
      message: "请输入昵称",
      trigger: "blur",
    },
  ],
  phone: [
    {
      validator: (rule, value, callback) => {
        if (value === "") {
          callback(new Error($t("login.phoneReg")));
        } else if (!pattern.test(value)) {
          callback(new Error($t("login.phoneCorrectReg")));
        } else {
          callback();
        }
      },
      trigger: "blur",
    },
  ],
  verifyCode: [
    {
      validator: (rule, value, callback) => {
        if (value === "") {
          callback(new Error($t("login.verifyCodeReg")));
        } else if (!REGEXP_SIX.test(value)) {
          callback(new Error($t("login.verifyCodeSixReg")));
        } else {
          callback();
        }
      },
      trigger: "blur",
    },
  ],
  password: [
    {
      validator: (rule, value, callback) => {
        if (value === "") {
          callback(new Error($t("login.passwordReg")));
        }
        // else if (!REGEXP_PWD.test(value)) {
        //   callback(new Error(t("login.passwordRuleReg")));
        // }
        else {
          callback();
        }
      },
      trigger: "blur",
    },
  ],
  repeatPassword: [
    {
      validator: (rule, value, callback) => {
        if (value === "") {
          callback(new Error($t("login.passwordSureReg")));
        } else if (ruleForm.password !== value) {
          callback(new Error($t("login.passwordDifferentReg")));
        } else {
          callback();
        }
      },
      trigger: "blur",
    },
  ],
});
