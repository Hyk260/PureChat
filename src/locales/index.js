import { createI18n } from 'vue-i18n';
import { localStg } from "@/utils/storage";
import messages from './locale';

const i18n = createI18n({
  locale: localStg.get('lang') || "zh-CN",
  fallbackLocale: 'en',
  messages,
  legacy: false,
  globalInjection: true,
});

export function setupI18n(app) {
  app.use(i18n);
}

export const $t = i18n.global.t;

export function setLocale(locale) {
  localStg.set('lang', locale);
  i18n.global.locale.value = locale;
}