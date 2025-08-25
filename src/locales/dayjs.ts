import { locale } from "dayjs"

import { localStg } from "@/utils/storage"

import "dayjs/locale/zh-cn"
import "dayjs/locale/en"

/**
 * Set dayjs locale
 *
 * @param lang
 */
export function setDayjsLocale(lang: App.I18n.LangType = "zh-CN") {
  const localMap = {
    "zh-CN": "zh-cn",
    en: "en",
  } satisfies Record<App.I18n.LangType, string>

  const l = lang || localStg.get("lang") || "zh-CN"

  locale(localMap[l])
}
