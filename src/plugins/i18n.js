import { createI18n } from "vue-i18n";
import store from "@/store";
// User defined lang
import enLocale from "../../locales/en";
import zhLocale from "../../locales/zh-CN";

// function siphonI18n(prefix = "zh-CN") {
//   return Object.fromEntries(
//     Object.entries(import.meta.globEager("../../locales/*.js")).map(
//       ([key, value]) => {
//         // const matched = key.match(/([A-Za-z0-9-_]+)\./i)[1];
//         // return [matched, value.default];
//       }
//     )
//   )[prefix];
// }
// console.log(siphonI18n())
const localesConfigs = {
  en: {
    ...enLocale,
  },
  "zh-CN": {
    ...zhLocale,
  },
};
const lang = store.state.settings.lang;
const yuyan = lang == "zh-CN" ? "中文" : "英文";
// console.log(yuyan, "语言");
console.log(localesConfigs, "语言包");

export const i18n = createI18n({
  legacy: false,
  locale: lang,
  fallbackLocale: "en",
  messages: localesConfigs,
});
/**
 * 可以在全局模版语法直接使用 
 * $t("common.setup")
 * $t("el.messagebox.confirm")
 */
export const i18nPlugin = {
  install: app => {
    app.config.globalProperties.$t = i18n.global.t;
  },
};

export function useI18n(app) {
  app.use(i18n);
}
