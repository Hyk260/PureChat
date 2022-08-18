import { createI18n } from "vue-i18n";
import elementEnLocale from "element-plus/lib/locale/lang/en";
import elementZhLocale from "element-plus/lib/locale/lang/zh-cn";

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

console.log(messages, "语言包");
export default i18n;
