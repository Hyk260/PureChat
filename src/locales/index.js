import { createI18n } from 'vue-i18n';
import storage from "@/utils/localforage/index";
import messages from './locale';

const lang = storage.get('User-Setup')?.lang || "zh-CN";

const i18n = createI18n({
  locale: lang,
  fallbackLocale: 'en',
  messages,
  legacy: false
});

export function setupI18n(app) {
  app.use(i18n);
}

export const $t = i18n.global.t;

export function setLocale(locale) {
  i18n.global.locale.value = locale;
}
