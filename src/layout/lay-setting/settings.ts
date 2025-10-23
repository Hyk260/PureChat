import { computed } from "vue"
import { Cloud, Globe, Settings2 as Settings, CircleAlert, Sun, Moon, Monitor } from "lucide-vue-next"

import { ModelProvider } from "@/ai/types"
import { $t } from "@/locales"

export const list = computed(() => {
  return [
    {
      id: "currency",
      title: "通用设置",
      icon: Settings,
    },
    {
      id: "webSearch",
      title: $t("settings.webSearch.title"),
      icon: Globe,
      hide: !__LOCAL_MODE__,
    },
    {
      id: "provider",
      title: $t("settings.provider.title"),
      icon: Cloud,
    },
    {
      id: "about",
      title: $t("common.about"),
      icon: CircleAlert,
    },
  ].filter((item) => !item.hide)
})

export const options = computed(() => {
  return [
    {
      value: "auto",
      icon: Monitor,
      label: $t("common.auto"),
    },
    {
      value: "light",
      icon: Sun,
      label: $t("common.light"),
    },
    {
      value: "dark",
      icon: Moon,
      label: $t("common.dark"),
    },
  ]
})

export const optionsModel = computed(() => {
  return Object.entries(ModelProvider).map(([_, value]) => {
    return {
      value,
      label: value,
    }
  })
})

export const languages = [
  {
    value: "zh-CN",
    label: "简体中文",
  },
  {
    value: "en",
    label: "English",
  },
]
