import { createI18n } from "vue-i18n";
import store from "@/store";
// element-plus国际化
import elementEnLocale from "element-plus/lib/locale/lang/en";
import elementZhLocale from "element-plus/lib/locale/lang/zh-cn";
// User defined lang
import enLocale from "../../locales/en";
import zhLocale from "../../locales/zh-CN";
// function siphonI18n(prefix = "zh-cn") {
//   return Object.fromEntries(
//     Object.entries(import.meta.globEager("../../locales/*.y(a)?ml")).map(
//       ([key, value]) => {
//         const matched = key.match(/([A-Za-z0-9-_]+)\./i)[1];
//         return [matched, value.default];
//       }
//     )
//   )[prefix];
// }
// console.log(siphonI18n())
const localesConfigs = {
  en: {
    ...enLocale,
    ...elementEnLocale,
  },
  "zh-CN": {
    ...zhLocale,
    ...elementZhLocale,
  },
};
const lang = store.state.settings.lang;
// i18n.global.locale = "en";
const yuyan = lang == "zh-CN" ? "中文" : "英文";
// console.log(yuyan, "语言");
console.log(localesConfigs, "语言包");

export const i18n = createI18n({
  legacy: false,
  locale: lang,
  fallbackLocale: "en",
  messages: localesConfigs,
});

export function useI18n(app) {
  app.use(i18n);
}
