import { createI18n } from "vue-i18n";
import elementEnLocale from "element-plus/lib/locale/lang/en";
import elementZhLocale from "element-plus/lib/locale/lang/zh-cn";
import store from "@/store";
// User defined lang
import enLocale from "./en";
import zhLocale from "./zh-cn";

const messages = {
  en: {
    ...enLocale,
    ...elementEnLocale,
  },
  zh: {
    ...zhLocale,
    ...elementZhLocale,
  },
};

const i18n = createI18n({
  locale: "zh",
  messages,
});
// i18n.global.locale = "en";
const lang = store.state.settings.lang;
const yuyan = lang == "zh" ? "中文" : "英文";
// console.log(yuyan, "语言");
// console.log(messages, "语言包");
export default i18n;
