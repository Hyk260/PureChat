import { reactive } from "vue";
import store from "@/store/index";

// 账号
export const user = reactive({
  username: "",
  password: "123456",
  verifyCode: "",
});

// 表单校验
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
