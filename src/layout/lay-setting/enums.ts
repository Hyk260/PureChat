import { computed } from "vue"
import { Operation, Warning } from "@element-plus/icons-vue"
import { Cloud } from "lucide-vue-next"

import { ModelProvider } from "@/ai/types"
import { $t } from "@/locales"

export const list = computed(() => {
  return [
    {
      id: "currency",
      title: "常规设置",
      icon: Operation,
    },
    {
      id: "webSearch",
      title: $t("settings.webSearch.title"),
      svg_icon: "internet",
    },
    {
      id: "provider",
      title: $t("settings.provider.title"),
      icon: Cloud,
    },
    {
      id: "about",
      title: $t("common.about"),
      icon: Warning,
    },
  ]
})

export const options = computed(() => {
  return [
    {
      value: "auto",
      label: $t("common.auto"),
    },
    {
      value: "light",
      label: $t("common.light"),
    },
    {
      value: "dark",
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
